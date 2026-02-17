import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavbar } from '../contexts/NavbarContext'
import BatteryLifecycleLoader from './BatteryLifecycleLoader'
import VoltageCard from './cards/VoltageCard'
import InternalResistanceCard from './cards/InternalResistanceCard'
import HealthGaugeCard from './cards/HealthGaugeCard'
import SulphationCard from './cards/SulphationCard'
import SulphationDetectedCard from './cards/SulphationDetectedCard'
import DecisionCard from './cards/DecisionCard'
import BarcodeCard from './cards/BarcodeCard'
import SystemRecordCard from './cards/SystemRecordCard'
import RouteCard from './cards/RouteCard'
import SealCard from './cards/SealCard'
import RecordLockCard from './cards/RecordLockCard'
import VoltageTrendCard from './cards/VoltageTrendCard'
import ElectrochemicalCorrectionCard from './cards/ElectrochemicalCorrectionCard'
import PlateConditionCard from './cards/PlateConditionCard'
import PerformanceRestoredCard from './cards/PerformanceRestoredCard'
import WarrantyCard from './cards/WarrantyCard'
import LeadCard from './cards/LeadCard'
import PolymerCard from './cards/PolymerCard'
import ComplianceRecordCard from './cards/ComplianceRecordCard'
import RecoveryCertifiedCard from './cards/RecoveryCertifiedCard'
import LoggedCard from './cards/LoggedCard'
import ControlledCard from './cards/ControlledCard'
import CertifiedCard from './cards/CertifiedCard'
import VerifiedCard from './cards/VerifiedCard'

import { sceneConfig, sceneTimings, SCENE_FRAME_COUNTS, type CardData } from './batteryLifecycle/sceneConfig'
import { frameCache } from './batteryLifecycle/frameCache'
import { drawFrame } from './batteryLifecycle/frameRenderer'
import { preloadCriticalFrames, preloadRemainingFrames, preloadNextFrames } from './batteryLifecycle/framePreloader'
import { shouldCardBeVisible, getActiveSceneIndexFromCards } from './batteryLifecycle/cardVisibility'
import { getCardPosition, getMobileScale } from './batteryLifecycle/cardPositions'
import { intersectionPreloader } from '../utils/intersectionPreloader'

gsap.registerPlugin(ScrollTrigger)


export default function BatteryLifecycleScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyContainerRef = useRef<HTMLDivElement>(null)
  const [activeSceneIndex, setActiveSceneIndex] = useState<number | null>(null)
  const [currentFrame, setCurrentFrame] = useState(1)
  const [currentSceneForFrame, setCurrentSceneForFrame] = useState(0)
  const [isPreloading, setIsPreloading] = useState(true)
  const [preloadProgress, setPreloadProgress] = useState(0)
  const [shouldShowUI, setShouldShowUI] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const { setNavbarVisible } = useNavbar()
  const hasPreloadedRef = useRef(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentCanvasFrameRef = useRef({ scene: 0, frame: 1 })
  const rafRef = useRef<number | null>(null)
  const cardVisibilityState = useRef<{ [key: string]: boolean }>({})
  const activeAnimations = useRef<{ [key: string]: gsap.core.Tween | null }>({})
  const scrollUpdateTimeoutRef = useRef<number | null>(null)
  const pendingFrameUpdate = useRef<{ frame: number; scene: number } | null>(null)
  const lastFrameUpdateTime = useRef<number>(0)
  const frameUpdateThrottle = 16 
  const pendingDrawRef = useRef<{ frame: number; scene: number } | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const shouldCardBeVisibleMemo = useCallback((sceneIndex: number, currentScene: number, currentFrame: number): boolean => {
    return shouldCardBeVisible(sceneIndex, currentScene, currentFrame)
  }, [])

  const getActiveSceneIndexFromCardsMemo = useCallback((currentScene: number, currentFrame: number): number | null => {
    return getActiveSceneIndexFromCards(sceneConfig, currentScene, currentFrame)
  }, [])

  const drawFrameLocal = (sceneIndex: number, frameNumber: number) => {
    if (!canvasRef.current) return
    
    const now = performance.now()
    const timeSinceLastUpdate = now - lastFrameUpdateTime.current
    
    if (timeSinceLastUpdate < frameUpdateThrottle && pendingDrawRef.current) {
      pendingDrawRef.current = { frame: frameNumber, scene: sceneIndex }
      return
    }
    
    const drawn = drawFrame(canvasRef.current, sceneIndex, frameNumber, currentCanvasFrameRef)
    
    if (drawn) {
      lastFrameUpdateTime.current = now
      pendingDrawRef.current = null
    } else {
      pendingDrawRef.current = { frame: frameNumber, scene: sceneIndex }
    }
  }
  
  useEffect(() => {
    if (!pendingDrawRef.current || isPreloading) return
    
    const retryInterval = setInterval(() => {
      if (pendingDrawRef.current && canvasRef.current) {
        const { frame, scene } = pendingDrawRef.current
        const drawn = drawFrame(canvasRef.current, scene, frame, currentCanvasFrameRef)
        
        if (drawn) {
          pendingDrawRef.current = null
          lastFrameUpdateTime.current = performance.now()
        }
      } else {
        clearInterval(retryInterval)
      }
    }, 50)
    
    return () => clearInterval(retryInterval)
  }, [isPreloading])

  const renderCard = (cardType: string, cardData: CardData, sceneIndex: number, cardIndex: number) => {
    const cardKey = `scene-${sceneIndex}-card-${cardIndex}`
    const positionClasses = getCardPosition(cardData, sceneIndex, isMobile)
    const scaleClasses = getMobileScale(cardType, sceneIndex, isMobile)

    switch (cardType) {
      case 'voltage':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10 max-lg:scale-[0.55] sm:max-lg:scale-[0.70] md:max-lg:scale-[0.75]`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <VoltageCard value={cardData.value} status={cardData.status} />
            </div>
          </div>
        )
      case 'internal-resistance':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <InternalResistanceCard value={cardData.value} status={cardData.status} />
            </div>
          </div>
        )
      case 'health-gauge':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <HealthGaugeCard 
                value={cardData.value} 
                video={sceneIndex === 5 ? '98.mp4' : '99.mp4'}
                width={sceneIndex === 5 ? '200px' : '420px'}
                compactLaptop={sceneIndex === 0}
              />
            </div>
          </div>
        )
      case 'sulphation':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <SulphationCard value={cardData.value} status={cardData.status} compactLaptop={sceneIndex === 0} />
            </div>
          </div>
        )
      case 'sulphation-detected':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10 ${sceneIndex === 1 ? 'w-full md:w-auto lg:w-[26.25rem] lg:h-[13rem] [&>*]:lg:w-full [&>*]:lg:max-w-full [&>*]:lg:h-full [&>*]:lg:min-h-0' : ''}`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <SulphationDetectedCard value={cardData.value} />
            </div>
          </div>
        )
      case 'decision':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10 ${sceneIndex === 1 ? 'w-full md:w-auto lg:w-[26.25rem] lg:h-[13rem] [&>*]:lg:w-full [&>*]:lg:max-w-full [&>*]:lg:h-full [&>*]:lg:min-h-0' : ''}`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <DecisionCard value={cardData.value} status={cardData.status} />
            </div>
          </div>
        )
      case 'barcode':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <BarcodeCard value={cardData.value} />
            </div>
          </div>
        )
      case 'system-record':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <SystemRecordCard value={cardData.value} />
            </div>
          </div>
        )
      case 'route':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <RouteCard />
            </div>
          </div>
        )
      case 'seal':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <SealCard value={cardData.value} />
            </div>
          </div>
        )
      case 'record-lock':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <RecordLockCard value={cardData.value} status={cardData.status} />
            </div>
          </div>
        )
      case 'voltage-trend':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <VoltageTrendCard value={cardData.value} status={cardData.status} />
            </div>
          </div>
        )
      case 'electrochemical-correction':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <ElectrochemicalCorrectionCard />
            </div>
          </div>
        )
      case 'plate-condition':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <PlateConditionCard value={cardData.value} />
            </div>
          </div>
        )
      case 'performance-restored':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <PerformanceRestoredCard
                voltageFrom="11.8V"
                voltageTo="12.4V"
                resistanceFrom="8.7mΩ"
                resistanceTo="4.2mΩ"
              />
            </div>
          </div>
        )
      case 'warranty':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <WarrantyCard status={cardData.value} coverage={cardData.status} />
            </div>
          </div>
        )
      case 'lead':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <LeadCard value={cardData.value} status={cardData.status} />
            </div>
          </div>
        )
      case 'polymer':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <PolymerCard value={cardData.value} status={cardData.status} />
            </div>
          </div>
        )
      case 'compliance-record':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <ComplianceRecordCard value={cardData.value} />
            </div>
          </div>
        )
      case 'recovery-certified':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <RecoveryCertifiedCard />
            </div>
          </div>
        )
      case 'logged':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <LoggedCard />
            </div>
          </div>
        )
      case 'controlled':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <ControlledCard />
            </div>
          </div>
        )
      case 'certified':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <CertifiedCard />
            </div>
          </div>
        )
      case 'verified':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${positionClasses} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={scaleClasses}>
              <VerifiedCard />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  useEffect(() => {
    if (hasPreloadedRef.current) return
    hasPreloadedRef.current = true

    preloadCriticalFrames((progress) => {
      setPreloadProgress(progress.percentage)
    }).then(() => {
      setIsPreloading(false)
    }).catch(() => {
      setIsPreloading(false)
    })
  }, [])

  useEffect(() => {
    if (isPreloading) return

    const timeoutId = setTimeout(() => {
      preloadRemainingFrames()
      
      if (containerRef.current) {
        const allFrames: string[] = []
        for (let scene = 0; scene < SCENE_FRAME_COUNTS.length; scene++) {
          const frameCount = SCENE_FRAME_COUNTS[scene]
          for (let i = 1; i <= frameCount; i += Math.max(1, Math.floor(frameCount / 20))) {
            allFrames.push(`/lifecycle/frames/scene-${scene + 1}/frame_${String(i).padStart(4, '0')}.webp`)
          }
        }
        
        intersectionPreloader.register({
          element: containerRef.current,
          assets: allFrames,
          assetType: 'frame',
          priority: 'medium',
          rootMargin: '500px'
        })
      }
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [isPreloading])

  useEffect(() => {
    const container = containerRef.current

    if (!container || isPreloading) return
    
    gsap.set(container, { minHeight: window.innerHeight * 30 })
    
    const initTimeout = setTimeout(() => {
      const scrollSections = sceneTimings.map((scene, index) => {
        const isChargingPhase = index === 5
        const isFinalScene = index === 6
        
        return {
          ...scene,
          scrollMultiplier: isChargingPhase ? 8 : isFinalScene ? 6 : 4
        }
      })

      const totalScrollMultiplier = scrollSections.reduce((sum, s) => sum + s.scrollMultiplier, 0)
      const scrollHeight = window.innerHeight * totalScrollMultiplier

      gsap.set(container, { height: scrollHeight })

      setCurrentFrame(1)
      setCurrentSceneForFrame(0)
      setActiveSceneIndex(null)
      
      drawFrameLocal(0, 1)

      ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: stickyContainerRef.current,
      pinSpacing: true,
      scrub: true,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      refreshPriority: -1,
      anticipatePin: 1,
      onEnter: () => {
        setNavbarVisible(false)
        drawFrameLocal(0, 1)
        const canvas = canvasRef.current
        if (canvas) {
          canvas.style.opacity = '1'
          canvas.style.visibility = 'visible'
        }
      },
      onLeave: () => {
        setNavbarVisible(true)
      },
      onEnterBack: () => {
        setNavbarVisible(false)
      },
      onLeaveBack: () => {
        setNavbarVisible(true)
        setCurrentFrame(1)
        setCurrentSceneForFrame(0)
        drawFrameLocal(0, 1)
      },
      onUpdate: (self) => {
        const progress = self.progress
        
        const clampedProgress = Math.max(0, Math.min(progress, 1))
        let accumulatedProgress = 0

        for (let i = 0; i < scrollSections.length; i++) {
          const scene = scrollSections[i]
          const sceneProgressShare = scene.scrollMultiplier / totalScrollMultiplier
          const sceneStart = accumulatedProgress
          const sceneEnd = accumulatedProgress + sceneProgressShare
          const isLastScene = i === scrollSections.length - 1

          const isInScene = isLastScene 
            ? (clampedProgress >= sceneStart && clampedProgress <= sceneEnd)
            : (clampedProgress >= sceneStart && clampedProgress < sceneEnd)

          if (isInScene) {
            const sceneProgress = Math.min((clampedProgress - sceneStart) / sceneProgressShare, 1)
            
            const frameCount = SCENE_FRAME_COUNTS[scene.sceneIndex]
            const frameIndex = Math.floor(sceneProgress * (frameCount - 1))
            const clampedFrameIndex = Math.max(0, Math.min(frameIndex, frameCount - 1))
            
            const newFrame = clampedFrameIndex + 1
            const newScene = scene.sceneIndex
            
            preloadNextFrames(newScene, newFrame)

            const now = performance.now()
            const shouldUpdate = now - lastFrameUpdateTime.current >= frameUpdateThrottle ||
                                pendingFrameUpdate.current === null ||
                                pendingFrameUpdate.current.frame !== newFrame ||
                                pendingFrameUpdate.current.scene !== newScene

            if (shouldUpdate) {
              pendingFrameUpdate.current = { frame: newFrame, scene: newScene }

              if (scrollUpdateTimeoutRef.current === null) {
                scrollUpdateTimeoutRef.current = requestAnimationFrame(() => {
                  if (pendingFrameUpdate.current) {
                    setCurrentFrame(pendingFrameUpdate.current.frame)
                    setCurrentSceneForFrame(pendingFrameUpdate.current.scene)
                    pendingFrameUpdate.current = null
                  }
                  scrollUpdateTimeoutRef.current = null
                })
              }
            }

            break
          }

          accumulatedProgress = sceneEnd
        }
      }
    })

      sceneConfig.forEach((scene, sceneIndex) => {
        scene.cards.forEach((_cardData, cardIndex) => {
          const cardKey = `scene-${sceneIndex}-card-${cardIndex}`
          const card = cardRefs.current[cardKey]
          if (card) {
            gsap.set(card, { x: -400, opacity: 0 })
          }
        })
      })

      ScrollTrigger.refresh()
    }, 100)

    return () => {
      clearTimeout(initTimeout)
      if (scrollUpdateTimeoutRef.current !== null) {
        cancelAnimationFrame(scrollUpdateTimeoutRef.current)
        scrollUpdateTimeoutRef.current = null
      }
      Object.values(activeAnimations.current).forEach(anim => {
        if (anim) anim.kill()
      })
      activeAnimations.current = {}
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      setNavbarVisible(true)
    }
  }, [setNavbarVisible, isPreloading])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || isPreloading) return

    canvas.width = 1920
    canvas.height = 1080

    const ctx = canvas.getContext('2d', { 
      alpha: false,
      desynchronized: true 
    })
    if (ctx) {
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    setCurrentFrame(1)
    setCurrentSceneForFrame(0)
    setActiveSceneIndex(null)

    let attempts = 0
    const maxAttempts = 100
    
    const drawInitialFrame = () => {
      const firstFrameSrc = '/lifecycle/frames/scene-1/frame_0001.webp'
      const cachedImage = frameCache.get(firstFrameSrc)
      
      if (cachedImage && cachedImage.complete && cachedImage.naturalWidth > 0) {
        drawFrameLocal(0, 1)
        
        if (canvas) {
          canvas.style.opacity = '1'
          canvas.style.visibility = 'visible'
        }
        
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 100)
      } else {
        attempts++
        if (attempts < maxAttempts) {
          setTimeout(drawInitialFrame, 50)
        } else {
          if (canvas) {
            canvas.style.opacity = '1'
            canvas.style.visibility = 'visible'
          }
        }
      }
    }

    drawInitialFrame()

    const fallbackTimeout = setTimeout(() => {
      if (canvas && canvas.style.opacity === '0') {
        canvas.style.opacity = '1'
        canvas.style.visibility = 'visible'
        drawFrameLocal(0, 1)
      }
    }, 2000)

    return () => {
      clearTimeout(fallbackTimeout)
    }
  }, [isPreloading])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              ScrollTrigger.refresh()
            }, 100)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isPreloading) return
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    const now = performance.now()
    const timeSinceLastUpdate = now - lastFrameUpdateTime.current
    
    if (timeSinceLastUpdate < frameUpdateThrottle) {
      rafRef.current = requestAnimationFrame(() => {
        drawFrameLocal(currentSceneForFrame, currentFrame)
      })
    } else {
      drawFrameLocal(currentSceneForFrame, currentFrame)
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [currentFrame, currentSceneForFrame, isPreloading])

  useEffect(() => {
    if (isPreloading) return

    const newActiveSceneIndex = getActiveSceneIndexFromCardsMemo(currentSceneForFrame, currentFrame)
    setActiveSceneIndex(newActiveSceneIndex)

    if (!shouldShowUI && newActiveSceneIndex === 0) {
      setShouldShowUI(true)
    }

    const animationsToRun: Array<{ card: HTMLElement; key: string; visible: boolean }> = []

    sceneConfig.forEach((scene, sceneIndex) => {
      const shouldBeVisible = shouldCardBeVisibleMemo(sceneIndex, currentSceneForFrame, currentFrame)
      
      scene.cards.forEach((_cardData: CardData, cardIndex: number) => {
        const cardKey = `scene-${sceneIndex}-card-${cardIndex}`
        const card = cardRefs.current[cardKey]
        
        if (card) {
          const currentVisibility = cardVisibilityState.current[cardKey] || false
          
          if (shouldBeVisible !== currentVisibility) {
            animationsToRun.push({ card, key: cardKey, visible: shouldBeVisible })
            cardVisibilityState.current[cardKey] = shouldBeVisible
          }
        }
      })
    })

    if (animationsToRun.length > 0) {
      requestAnimationFrame(() => {
        animationsToRun.forEach(({ card, key, visible }) => {
          if (activeAnimations.current[key]) {
            activeAnimations.current[key]?.kill()
            activeAnimations.current[key] = null
          }

          if (visible) {
            const tween = gsap.to(card, {
              x: 0,
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
              force3D: true,
              overwrite: true,
              onComplete: () => {
                activeAnimations.current[key] = null
              }
            })
            activeAnimations.current[key] = tween
          } else {
            const tween = gsap.to(card, {
              x: -400,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
              force3D: true,
              overwrite: true,
              onComplete: () => {
                activeAnimations.current[key] = null
              }
            })
            activeAnimations.current[key] = tween
          }
        })
      })
    }

    return () => {
    }
  }, [currentFrame, currentSceneForFrame, isPreloading, shouldShowUI, isMobile, getActiveSceneIndexFromCardsMemo, shouldCardBeVisibleMemo])

  useEffect(() => {
    if (!isMobile || activeSceneIndex !== 0) return

    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    const healthGaugeKey = 'scene-0-card-2'
    const healthGaugeElement = cardRefs.current[healthGaugeKey]
    
    if (healthGaugeElement) {
      const cardElement = findCardElement(healthGaugeElement)
      if (cardElement) {
        cardElement.style.height = '12rem'
        cardElement.style.minHeight = '12rem'
        cardElement.style.maxHeight = '12rem'
      }
    }

    const sulphationKey = 'scene-0-card-3'
    const sulphationElement = cardRefs.current[sulphationKey]
    
    if (sulphationElement) {
      const sulphationCardElement = findCardElement(sulphationElement)
      if (sulphationCardElement) {
        sulphationCardElement.style.width = '22rem'
        sulphationCardElement.style.minWidth = '22rem'
      }
    }
  }, [isMobile, activeSceneIndex, currentFrame])

  useEffect(() => {
    if (!isMobile || activeSceneIndex !== 1) return

    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    const sulphationDetectedKey = 'scene-1-card-2'
    const sulphationDetectedElement = cardRefs.current[sulphationDetectedKey]
    
    if (sulphationDetectedElement) {
      const cardElement = findCardElement(sulphationDetectedElement)
      if (cardElement) {
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
        cardElement.style.width = isTablet ? '24rem' : '18rem'
        cardElement.style.maxWidth = isTablet ? '24rem' : '18rem'
        cardElement.style.minWidth = isTablet ? '24rem' : '18rem'
        if (isTablet) {
          cardElement.style.height = '14rem'
          cardElement.style.maxHeight = '14rem'
          cardElement.style.minHeight = '14rem'
        }
      }
    }

    const decisionKey = 'scene-1-card-3'
    const decisionElement = cardRefs.current[decisionKey]
    
    if (decisionElement) {
      const cardElement = findCardElement(decisionElement)
      if (cardElement) {
        cardElement.style.width = '24rem'
        cardElement.style.maxWidth = '24rem'
        cardElement.style.minWidth = '24rem'
        cardElement.style.height = '14rem'
        cardElement.style.maxHeight = '14rem'
        cardElement.style.minHeight = '14rem'
        
        const imageContainer = Array.from(cardElement.querySelectorAll('div')).find(
          div => {
            const img = div.querySelector('img[src="/cards/decision.png"]')
            return img !== null
          }
        ) as HTMLElement
        if (imageContainer) {
          imageContainer.style.marginTop = '2rem'
          imageContainer.style.paddingTop = '1rem'
        }
        
        const textOverlay = Array.from(cardElement.querySelectorAll('div')).find(
          div => {
            const hasText = div.textContent?.includes('MAINTENANCE') || div.textContent?.includes('RECOMMENDED')
            const isAbsolute = window.getComputedStyle(div).position === 'absolute'
            return hasText && isAbsolute
          }
        ) as HTMLElement
        if (textOverlay) {
          textOverlay.style.top = '1.5rem'
        }
      }
    }
  }, [isMobile, activeSceneIndex, currentFrame])

  useEffect(() => {
    if (!isMobile || activeSceneIndex !== 3) return

    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    const sulphationKey = 'scene-3-card-2'
    const sulphationElement = cardRefs.current[sulphationKey]
    
    if (sulphationElement) {
      const cardElement = findCardElement(sulphationElement)
      if (cardElement) {
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
        cardElement.style.width = isTablet ? '24rem' : '18rem'
        cardElement.style.maxWidth = isTablet ? '24rem' : '18rem'
        cardElement.style.minWidth = isTablet ? '24rem' : '18rem'
        if (isTablet) {
          cardElement.style.height = '14rem'
          cardElement.style.maxHeight = '14rem'
          cardElement.style.minHeight = '14rem'
        }
      }
    }

    const recordLockKey = 'scene-3-card-3'
    const recordLockElement = cardRefs.current[recordLockKey]
    
    if (recordLockElement) {
      const cardElement = findCardElement(recordLockElement)
      if (cardElement) {
        cardElement.style.width = '24rem'
        cardElement.style.maxWidth = '24rem'
        cardElement.style.minWidth = '24rem'
        cardElement.style.height = '14rem'
        cardElement.style.maxHeight = '14rem'
        cardElement.style.minHeight = '14rem'
        
        const imageContainer = Array.from(cardElement.querySelectorAll('div')).find(
          div => {
            const img = div.querySelector('img[src="/cards/decision.png"]')
            return img !== null
          }
        ) as HTMLElement
        if (imageContainer) {
          imageContainer.style.marginTop = '2rem'
          imageContainer.style.paddingTop = '1rem'
        }
        
        const textOverlay = Array.from(cardElement.querySelectorAll('div')).find(
          div => {
            const hasText = div.textContent?.includes('DIAGNOSTIC') || div.textContent?.includes('LOCKED')
            const isAbsolute = window.getComputedStyle(div).position === 'absolute'
            return hasText && isAbsolute
          }
        ) as HTMLElement
        if (textOverlay) {
          textOverlay.style.top = '1.5rem'
        }
      }
    }
  }, [isMobile, activeSceneIndex, currentFrame])

  useEffect(() => {
    if (isMobile || activeSceneIndex !== 1) return

    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    const decisionKey = 'scene-1-card-3'
    const decisionElement = cardRefs.current[decisionKey]
    
    if (decisionElement) {
      const cardElement = findCardElement(decisionElement)
      if (cardElement) {
        cardElement.style.width = '26.25rem'
        cardElement.style.height = '13rem'
        cardElement.style.maxWidth = '26.25rem'
        cardElement.style.minWidth = '26.25rem'
        cardElement.style.maxHeight = '13rem'
        cardElement.style.minHeight = '13rem'
      }
    }
  }, [isMobile, activeSceneIndex, currentFrame])

  useEffect(() => {
    if (isMobile || activeSceneIndex !== 3) return

    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    const recordLockKey = 'scene-3-card-3'
    const recordLockElement = cardRefs.current[recordLockKey]
    
    if (recordLockElement) {
      const cardElement = findCardElement(recordLockElement)
      if (cardElement) {
        cardElement.style.width = '26.25rem'
        cardElement.style.height = '13rem'
        cardElement.style.maxWidth = '26.25rem'
        cardElement.style.minWidth = '26.25rem'
        cardElement.style.maxHeight = '13rem'
        cardElement.style.minHeight = '13rem'
      }
    }
  }, [isMobile, activeSceneIndex, currentFrame])

  useEffect(() => {
    if (!isMobile || activeSceneIndex !== 4) return

    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    const electrochemicalKey = 'scene-4-card-2'
    const electrochemicalElement = cardRefs.current[electrochemicalKey]
    
    if (electrochemicalElement) {
      const cardElement = findCardElement(electrochemicalElement)
      if (cardElement) {
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
        cardElement.style.width = '18rem'
        cardElement.style.maxWidth = '18rem'
        cardElement.style.minWidth = '18rem'
        if (isTablet) {
          cardElement.style.height = '12.5rem'
          cardElement.style.maxHeight = '12.5rem'
          cardElement.style.minHeight = '12.5rem'
        }
        cardElement.style.overflow = 'hidden'
      }
    }

    const plateConditionKey = 'scene-4-card-3'
    const plateConditionElement = cardRefs.current[plateConditionKey]
    
    if (plateConditionElement) {
      const cardElement = findCardElement(plateConditionElement)
      if (cardElement) {
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
        if (isTablet) {
          cardElement.style.width = '30rem'
          cardElement.style.maxWidth = '30rem'
          cardElement.style.minWidth = '30rem'
          cardElement.style.height = '13rem'
          cardElement.style.maxHeight = '13rem'
          cardElement.style.minHeight = '13rem'
        } else {
          cardElement.style.width = '25rem'
          cardElement.style.maxWidth = '25rem'
          cardElement.style.minWidth = '25rem'
          cardElement.style.height = '10rem'
          cardElement.style.maxHeight = '10rem'
          cardElement.style.minHeight = '10rem'
        }
        
        cardElement.style.overflow = 'hidden'
        
        const textElement = Array.from(cardElement.querySelectorAll('div')).find(
          div => {
            const text = div.textContent?.includes('PLATE') || div.textContent?.includes('RESTORED')
            const hasGemunuFont = div.className.includes('Gemunu_Libre')
            return text && hasGemunuFont
          }
        ) as HTMLElement
        if (textElement) {
          textElement.style.marginTop = '0'
          textElement.style.paddingTop = '0'
          textElement.style.whiteSpace = 'nowrap'
          textElement.style.display = 'inline-block'
          textElement.style.maxWidth = '100%'
          textElement.style.overflow = 'visible'
        }
        
        const flexContainer = Array.from(cardElement.querySelectorAll('div')).find(
          div => {
            const hasFlex = div.className.includes('flex') && div.className.includes('items-center')
            return hasFlex
          }
        ) as HTMLElement
        if (flexContainer) {
          flexContainer.style.alignItems = 'center'
          flexContainer.style.overflow = 'visible'
          flexContainer.style.maxWidth = '100%'
        }
        
        const imageElement = cardElement.querySelector('img[src="/cards/platecondition.png"]') as HTMLImageElement
        if (imageElement) {
          if (isTablet) {
            imageElement.style.width = '15rem'
            imageElement.style.height = '10rem'
            imageElement.style.maxWidth = '15rem'
            imageElement.style.maxHeight = '10rem'
            imageElement.style.marginLeft = '2rem'
          } else {
            imageElement.style.width = '14rem'
            imageElement.style.height = '10rem'
            imageElement.style.maxWidth = '14rem'
            imageElement.style.maxHeight = '10rem'
            imageElement.style.marginLeft = '3rem'
          }
          imageElement.style.objectFit = 'contain'
          imageElement.style.visibility = 'visible'
          imageElement.style.display = 'block'
        }
        
        const imageContainer = imageElement?.parentElement as HTMLElement
        if (imageContainer) {
          imageContainer.style.marginLeft = 'auto'
          imageContainer.style.marginRight = '0'
        }
      }
    }
  }, [isMobile, activeSceneIndex, currentFrame])

  useEffect(() => {
    if (!isMobile || activeSceneIndex !== 5) return

    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    const performanceRestoredKey = 'scene-5-card-0'
    const performanceRestoredElement = cardRefs.current[performanceRestoredKey]
    
    if (performanceRestoredElement) {
      const cardElement = findCardElement(performanceRestoredElement)
      if (cardElement) {
        cardElement.style.width = '16rem'
        cardElement.style.maxWidth = '16rem'
        cardElement.style.minWidth = '16rem'
      }
    }
  }, [isMobile, activeSceneIndex, currentFrame])

  useEffect(() => {
    if (!isMobile || activeSceneIndex !== 5) return

    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    const recordLockKey = 'scene-5-card-3'
    const recordLockElement = cardRefs.current[recordLockKey]
    
    if (recordLockElement) {
      const cardElement = findCardElement(recordLockElement)
      if (cardElement) {
        cardElement.style.width = '24rem'
        cardElement.style.maxWidth = '24rem'
        cardElement.style.minWidth = '24rem'
        cardElement.style.height = '14rem'
        cardElement.style.maxHeight = '14rem'
        cardElement.style.minHeight = '14rem'
        
        const imageContainer = Array.from(cardElement.querySelectorAll('div')).find(
          div => {
            const img = div.querySelector('img[src="/cards/decision.png"]')
            return img !== null
          }
        ) as HTMLElement
        if (imageContainer) {
          imageContainer.style.marginTop = '2rem'
          imageContainer.style.paddingTop = '1rem'
        }
        
        const textOverlay = Array.from(cardElement.querySelectorAll('div')).find(
          div => {
            const hasText = div.textContent?.includes('DIAGNOSTIC') || div.textContent?.includes('LOCKED')
            const isAbsolute = window.getComputedStyle(div).position === 'absolute'
            return hasText && isAbsolute
          }
        ) as HTMLElement
        if (textOverlay) {
          textOverlay.style.top = '1.5rem'
        }
      }
    }
  }, [isMobile, activeSceneIndex, currentFrame])

  useEffect(() => {
    if (isMobile || activeSceneIndex !== 5) return

    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    const recordLockKey = 'scene-5-card-3'
    const recordLockElement = cardRefs.current[recordLockKey]
    
    if (recordLockElement) {
      const cardElement = findCardElement(recordLockElement)
      if (cardElement) {
        cardElement.style.width = '26.25rem'
        cardElement.style.height = '13rem'
        cardElement.style.maxWidth = '26.25rem'
        cardElement.style.minWidth = '26.25rem'
        cardElement.style.maxHeight = '13rem'
        cardElement.style.minHeight = '13rem'
      }
    }
  }, [isMobile, activeSceneIndex, currentFrame])

  useEffect(() => {
    if (!isMobile || activeSceneIndex !== 6) return

    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    const recoveryCertifiedKey = 'scene-6-card-3'
    const recoveryCertifiedElement = cardRefs.current[recoveryCertifiedKey]
    
    if (recoveryCertifiedElement) {
      const cardElement = findCardElement(recoveryCertifiedElement)
      if (cardElement) {
        cardElement.style.width = '20rem'
        cardElement.style.maxWidth = '20rem'
        cardElement.style.minWidth = '20rem'
        cardElement.style.height = '10rem'
        cardElement.style.maxHeight = '10rem'
        cardElement.style.minHeight = '10rem'
      }
    }

    const complianceRecordKey = 'scene-6-card-2'
    const complianceRecordElement = cardRefs.current[complianceRecordKey]
    
    if (complianceRecordElement) {
      const cardElement = findCardElement(complianceRecordElement)
      if (cardElement) {
        cardElement.style.width = '24rem'
        cardElement.style.maxWidth = '24rem'
        cardElement.style.minWidth = '24rem'
        cardElement.style.height = '10rem'
        cardElement.style.maxHeight = '10rem'
        cardElement.style.minHeight = '10rem'
      }
    }
  }, [isMobile, activeSceneIndex, currentFrame])

  useEffect(() => {
    if (isPreloading) return
    preloadNextFrames(currentSceneForFrame, currentFrame)
  }, [currentFrame, currentSceneForFrame, isPreloading])

  if (isPreloading) {
    return <BatteryLifecycleLoader progress={preloadProgress} />
  }

  return (
    <section className="relative w-full bg-black" style={{ minHeight: '100vh' }}>
      {/* Scroll Container */}
      <div ref={containerRef} className="relative w-full bg-black" style={{ position: 'relative' }}>
        {/* Sticky Frame Container */}
        <div 
          ref={stickyContainerRef} 
          className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black" 
          style={{ 
            position: 'sticky',
            transform: 'translate3d(0, 0, 0)', 
            contain: 'layout style paint',
            backgroundColor: '#000'
          }}
        >
          {/* Canvas renderer */}
          <div 
            className={`absolute w-full bg-black ${
              isMobile ? 'h-[35vh] sm:h-[40vh] md:h-[42vh] top-1/2 -translate-y-1/2' : 'inset-0 h-full'
            }`}
            style={{ 
              backfaceVisibility: 'hidden',
              transform: isMobile ? 'translateZ(0) translateY(-50%)' : 'translateZ(0)',
              opacity: 1
            }}
          >
            <canvas
              ref={canvasRef}
              className={`absolute w-full pointer-events-none bg-black ${
                isMobile ? 'h-full' : 'inset-0 h-full'
              }`}
              style={{ 
                objectFit: isMobile ? 'contain' : 'cover',
                imageRendering: 'crisp-edges',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                willChange: 'transform',
                opacity: 1,
                visibility: 'visible'
              }}
            />
          </div>

          {/* Scene Progress Indicator*/}
          {shouldShowUI && activeSceneIndex !== null && (
            <>
              {/* Progress Boxes Container */}
              <div className={`absolute z-20 ${isMobile
                ? 'top-[calc(50%+17.5vh-2rem)] sm:top-[calc(50%+22vh-2rem)] md:top-[calc(50%+24vh-2rem)] left-4 sm:left-5 md:left-6'
                : 'top-4 lg:top-8 left-5 sm:left-4 lg:left-[32rem] xl:left-[38rem]'
                }`}>
                <div 
                  className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 backdrop-blur-sm h-[1.875rem] sm:h-[2.25rem] md:h-[2.75rem] lg:h-[4.688rem] rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl px-1.5 sm:px-2 md:px-3 lg:px-5"
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.10)',
                    background: 'rgba(0, 0, 0, 0.4)',
                    willChange: 'transform'
                    
                  }}
                >
                  {sceneTimings.map((_, index) => (
                    <div
                      key={index}
                      className={`relative transition-all duration-300 ${
                        activeSceneIndex === index ? 'w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-7 lg:h-7' : 'w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-6 lg:h-6'
                      }`}
                    >
                      {/* Box Background */}
                      <div
                        className={`w-full h-full rounded-lg transition-all duration-300 ${
                          activeSceneIndex === index
                            ? 'bg-[#ff7700] shadow-[0_0_20px_rgba(255,119,0,0.9)]'
                            : activeSceneIndex !== null && index < activeSceneIndex
                            ? 'bg-[#ff7700]/40 border border-[#ff7700]/60'
                            : 'bg-white/10 border border-white/20'
                        }`}
                      >
                        {/* Inner glow for active box */}
                        {activeSceneIndex === index && (
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/30 to-transparent"></div>
                        )}
                      </div>

                      {/* Active indicator pulse */}
                      {activeSceneIndex === index && (
                        <div className="absolute inset-0 rounded-lg animate-pulse">
                          <div className="w-full h-full rounded-lg border-2 border-[#ff7700]/50"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Scene Title Label */}
              {activeSceneIndex !== null && (
                <div className={`absolute z-20 ${isMobile
                  ? 'top-[calc(50%+17.5vh-2rem)] sm:top-[calc(50%+22vh-2rem)] md:top-[calc(50%+24vh-2rem)] right-4 sm:right-5 md:right-6 max-w-[calc(100%-8rem)] sm:max-w-[calc(100%-9rem)] md:max-w-[calc(100%-10rem)]'
                  : 'top-4 lg:top-8 right-2 sm:right-4 lg:right-8 xl:right-16 max-w-[calc(100%-1rem)] sm:max-w-[calc(100%-2rem)] lg:max-w-[600px] xl:max-w-none'
                  }`}>
                  <div
                    className="flex flex-col items-center justify-center backdrop-blur-sm min-h-[1.875rem] sm:min-h-[2.188rem] md:min-h-[2.5rem] lg:min-h-[4.688rem] rounded-lg sm:rounded-xl md:rounded-xl lg:rounded-2xl px-3 sm:px-4 md:px-5 lg:px-6 xl:px-12 2xl:px-24 w-auto lg:w-[600px] xl:w-[46.88rem] py-1 sm:py-1.5 md:py-2 lg:py-3"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.10)',
                      background: 'rgba(0, 0, 0, 0.4)',
                      willChange: 'transform'
                    }}
                  >
                    <p className="text-[0.375rem] xs:text-[0.4375rem] sm:text-[0.5625rem] md:text-[0.625rem] lg:text-sm xl:!text-base 2xl:!text-lg font-['Arial',sans-serif] tracking-wide uppercase text-center px-1" style={{ color: '#9F9F9F', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      {sceneConfig[activeSceneIndex]?.headline}
                    </p>
                    <p className="text-[0.3125rem] xs:text-[0.375rem] sm:text-[0.4375rem] md:text-[0.5rem] lg:text-xs xl:!text-sm 2xl:!text-base font-['Arial',sans-serif] tracking-normal normal-case text-center px-1 mt-0.5 sm:mt-1 md:mt-1.5" style={{ color: '#9F9F9F', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      {sceneConfig[activeSceneIndex]?.subline}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Diagnostic Cards Container */}
          <div className="absolute inset-0 z-10">
            {sceneConfig.map((scene, sceneIndex) => (
              <div key={scene.id} className={activeSceneIndex === sceneIndex ? '' : 'pointer-events-none'}>
                {scene.cards.map((cardData, cardIndex) => 
                  renderCard(cardData.cardType, cardData, sceneIndex, cardIndex)
                )}
              </div>
            ))}
          </div>

          {/* End of Life Warning - appears in Scene 7 from 59s to 61.2s */}
          {activeSceneIndex === 6 && currentFrame >= 60 && currentFrame <= 93 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 px-4">
              <div
                className="backdrop-blur-md animate-pulse rounded-2xl md:rounded-3xl p-6 md:p-8"
                style={{
                  border: '2px solid rgba(255, 107, 26, 0.8)',
                  background: 'rgba(255, 107, 26, 0.15)',
                  boxShadow: '0 0 40px rgba(255, 107, 26, 0.6), inset 0 0 20px rgba(255, 107, 26, 0.2)',
                }}
              >
                <div className="flex flex-col items-center gap-3">
                  {/* Warning Icon */}
                  <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#ff6b1a]/30 border-2 border-[#ff6b1a]">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-[#ff6b1a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  {/* Warning Text */}
                  <div className="text-center">
                    <h2 className="text-xl md:text-3xl font-bold text-[#ff6b1a] font-['Arial',sans-serif] tracking-wider mb-1 md:mb-2">
                      END OF LIFE
                    </h2>
                    <p className="text-sm md:text-xl text-white/90 font-['Arial',sans-serif] tracking-wide">
                      NEXT STAGE: RECYCLE
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Scroll Indicator (only visible in active scene) */}
          {activeSceneIndex !== null && activeSceneIndex < 6 && (
            <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-[40%] md:left-[45%] lg:left-1/2 z-10 flex flex-col items-center gap-1 md:gap-1.5 lg:gap-2 animate-bounce md:-translate-x-1/2 lg:-translate-x-1/2">
              <p className="text-white/60 text-xs md:text-sm lg:text-sm font-['Arial',sans-serif]">Scroll to explore</p>
              <svg className="w-5 h-5 md:w-[1.375rem] md:h-[1.375rem] lg:w-6 lg:h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}