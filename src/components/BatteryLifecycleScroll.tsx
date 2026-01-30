import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Import all card components
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

gsap.registerPlugin(ScrollTrigger)

interface CardData {
  cardType: string
  value: string
  status: string
  position: 'left' | 'right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'center-bottom'
}

interface SceneConfig {
  id: number
  title: string
  cards: CardData[]
}

const sceneConfig: SceneConfig[] = [
  // Scene 1: Initial Diagnostics
  {
    id: 1,
    title: 'INITIAL DIAGNOSTICS',
    cards: [
      {
        cardType: 'voltage',
        value: '12.4V',
        status: 'STABLE',
        position: 'left'
      },
      {
        cardType: 'internal-resistance',
        value: '4.2mΩ',
        status: 'LOW',
        position: 'right'
      },
      {
        cardType: 'health-gauge',
        value: '99%',
        status: '',
        position: 'bottom-left'
      },
      {
        cardType: 'sulphation',
        value: 'NEGLIGIBLE',
        status: '',
        position: 'bottom-right'
      }
    ]
  },
  // Scene 2: Sulphation Detection
  {
    id: 2,
    title: 'SULPHATION DETECTION',
    cards: [
      {
        cardType: 'voltage',
        value: '11.8V',
        status: 'DEGRADED',
        position: 'left'
      },
      {
        cardType: 'internal-resistance',
        value: '8.7mΩ',
        status: 'HIGH',
        position: 'right'
      },
      {
        cardType: 'sulphation-detected',
        value: 'DETECTED',
        status: '',
        position: 'bottom-left'
      },
      {
        cardType: 'decision',
        value: 'MAINTENANCE',
        status: 'RECOMMENDED',
        position: 'bottom-right'
      }
    ]
  },
  // Scene 3: Logistics & Tracking
  {
    id: 3,
    title: 'LOGISTICS & TRACKING',
    cards: [
      {
        cardType: 'barcode',
        value: 'SNV-A12-4587',
        status: '',
        position: 'left'
      },
      {
        cardType: 'system-record',
        value: 'SYSTEM RECORD CREATED',
        status: '',
        position: 'bottom-left'
      },
      {
        cardType: 'route',
        value: '',
        status: '',
        position: 'bottom-right'
      },
      {
        cardType: 'seal',
        value: 'SEALED & LOGGED',
        status: '',
        position: 'right'
      }
    ]
  },
  // Scene 4: Diagnostic Lock
  {
    id: 4,
    title: 'DIAGNOSTIC LOCK',
    cards: [
      {
        cardType: 'voltage',
        value: '11.8V',
        status: 'LOCKED',
        position: 'left'
      },
      {
        cardType: 'internal-resistance',
        value: '8.7mΩ',
        status: 'LOCKED',
        position: 'right'
      },
      {
        cardType: 'sulphation',
        value: 'DETECTED',
        status: '',
        position: 'bottom-left'
      },
      {
        cardType: 'record-lock',
        value: 'DIAGNOSTIC',
        status: 'RECORD LOCKED',
        position: 'bottom-right'
      }
    ]
  },
  // Scene 5: Recovery Process
  {
    id: 5,
    title: 'RECOVERY PROCESS',
    cards: [
      {
        cardType: 'voltage-trend',
        value: '12.4V',
        status: 'RISING',
        position: 'left'
      },
      {
        cardType: 'internal-resistance',
        value: '4.2mΩ',
        status: 'FALLING',
        position: 'right'
      },
      {
        cardType: 'electrochemical-correction',
        value: '',
        status: '',
        position: 'bottom-left'
      },
      {
        cardType: 'plate-condition',
        value: 'PLATE RESTORED',
        status: '',
        position: 'bottom-right'
      }
    ]
  },
  // Scene 6: Performance Verification
  {
    id: 6,
    title: 'PERFORMANCE VERIFICATION',
    cards: [
      {
        cardType: 'performance-restored',
        value: '',
        status: '',
        position: 'top'
      },
      {
        cardType: 'health-gauge',
        value: '98%',
        status: '',
        position: 'left'
      },
      {
        cardType: 'warranty',
        value: 'WARRANTY ACTIVE',
        status: 'EXTENDED COVERAGE ENABLED',
        position: 'right'
      },
      {
        cardType: 'record-lock',
        value: 'RECOVERY',
        status: 'VERIFIED',
        position: 'bottom'
      }
    ]
  },
  // Scene 7: Final Summary
  {
    id: 7,
    title: 'DIAGNOSTIC SUMMARY',
    cards: [
      {
        cardType: 'lead',
        value: '98%',
        status: 'RECOVERED',
        position: 'left'
      },
      {
        cardType: 'polymer',
        value: '92%',
        status: 'RECOVERED',
        position: 'right'
      },
      {
        cardType: 'compliance-record',
        value: 'COMPLIANCE RECORD GENERATED',
        status: '',
        position: 'bottom-left'
      },
      {
        cardType: 'recovery-certified',
        value: 'RECOVERY CERTIFIED',
        status: '',
        position: 'bottom-right'
      }
    ]
  }
]

// Scene timings in seconds
const sceneTimings = [
  { start: 0, pause: 4, sceneIndex: 0 },      // Scene 1: 0-4s
  { start: 4, pause: 7, sceneIndex: 1 },      // Scene 2: 4-7s
  { start: 7, pause: 25, sceneIndex: 2 },     // Scene 3: 7-25s
  { start: 25, pause: 40, sceneIndex: 3 },    // Scene 4: 25-40s
  { start: 40, pause: 42, sceneIndex: 4 },    // Scene 5: 40-42s
  { start: 42, pause: 55, sceneIndex: 5 },    // Scene 6: 42-55s
  { start: 55, pause: 67, sceneIndex: 6 }     // Scene 7: 55-67s (1:07)
]

export default function BatteryLifecycleScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const stickyContainerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeSceneIndex, setActiveSceneIndex] = useState<number | null>(null)
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Function to render specific card type
  const renderCard = (cardType: string, cardData: CardData, sceneIndex: number, cardIndex: number) => {
    const getCardPosition = () => {
      // Scene-specific positioning
      if (sceneIndex === 0) {
        // Scene 1 positions
        if (cardData.position === 'right') return 'left-[16rem] top-32'
        if (cardData.position === 'left') return 'left-8 top-32'
        if (cardData.position === 'bottom-left') return 'left-8 top-[22rem]'
        if (cardData.position === 'bottom-right') return 'left-[2rem] top-[40rem]'
      } else if (sceneIndex === 1) {
        // Scene 2 positions
        if (cardData.position === 'right') return 'left-[16rem] top-32'
        if (cardData.position === 'left') return 'left-8 top-32'
        if (cardData.position === 'bottom-left') return 'left-8 top-[22rem]'
        if (cardData.position === 'bottom-right') return 'left-[2rem] top-[40rem]'
      } else if (sceneIndex === 2) {
        // Scene 3 positions
        if (cardData.position === 'right') return 'left-[2rem] top-[44rem]'
        if (cardData.position === 'left') return 'left-8 top-32'
        if (cardData.position === 'bottom-left') return 'left-8 top-[18rem]'
        if (cardData.position === 'bottom-right') return 'left-[2rem] top-[30rem]'
      } else if (sceneIndex === 3) {
        // Scene 4 positions
        if (cardData.position === 'right') return 'left-[16rem] top-32'
        if (cardData.position === 'left') return 'left-8 top-32'
        if (cardData.position === 'bottom-left') return 'left-8 top-[22rem]'
        if (cardData.position === 'bottom-right') return 'left-[2rem] top-[40rem]'
      } else if (sceneIndex === 4) {
        // Scene 5 positions
        if (cardData.position === 'right') return 'left-[16rem] top-32'
        if (cardData.position === 'left') return 'left-8 top-32'
        if (cardData.position === 'bottom-left') return 'left-8 top-[22rem]'
        if (cardData.position === 'bottom-right') return 'left-[2rem] top-[40rem]'
      } else if (sceneIndex === 5) {
        // Scene 6 positions
        if (cardData.position === 'top') return 'left-8 top-32'
        if (cardData.position === 'left') return 'left-8 top-[26rem]'
        if (cardData.position === 'right') return 'left-[16rem] top-[26rem]'
        if (cardData.position === 'bottom') return 'left-8 top-[42rem]'
      } else if (sceneIndex === 6) {
        // Scene 7 positions
        if (cardData.position === 'left') return 'left-8 top-32'
        if (cardData.position === 'right') return 'left-[16rem] top-32'
        if (cardData.position === 'bottom-left') return 'left-8 top-[26rem]'
        if (cardData.position === 'bottom-right') return 'left-[2rem] top-[40rem]'
      }
      // Default positions
      if (cardData.position === 'right') return 'left-[16rem] top-32'
      if (cardData.position === 'left') return 'left-8 top-32'
      if (cardData.position === 'bottom-left') return 'left-8 top-[22rem]'
      if (cardData.position === 'bottom-right') return 'left-[16rem] top-[28rem]'
      
      return 'left-8 top-1/2 -translate-y-1/2'
    }

    const cardKey = `scene-${sceneIndex}-card-${cardIndex}`

    switch (cardType) {
      case 'voltage':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: cardData.position === 'right' ? 'translateX(400px)' : 'translateX(-400px)' }}
          >
            <VoltageCard value={cardData.value} status={cardData.status} />
          </div>
        )
      case 'internal-resistance':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: cardData.position === 'right' ? 'translateX(400px)' : 'translateX(-400px)' }}
          >
            <InternalResistanceCard value={cardData.value} status={cardData.status} />
          </div>
        )
      case 'health-gauge':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px)' }}
          >
            <HealthGaugeCard 
              value={cardData.value} 
              video={sceneIndex === 5 ? '98.mp4' : '99.mp4'}
              width={sceneIndex === 5 ? '200px' : '420px'}
            />
          </div>
        )
      case 'sulphation':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px)' }}
          >
            <SulphationCard value={cardData.value} status={cardData.status} />
          </div>
        )
      case 'sulphation-detected':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px)' }}
          >
            <SulphationDetectedCard value={cardData.value} />
          </div>
        )
      case 'decision':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px)' }}
          >
            <DecisionCard value={cardData.value} status={cardData.status} />
          </div>
        )
      case 'barcode':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px)' }}
          >
            <BarcodeCard value={cardData.value} />
          </div>
        )
      case 'system-record':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px)' }}
          >
            <SystemRecordCard value={cardData.value} />
          </div>
        )
      case 'route':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px)' }}
          >
            <RouteCard />
          </div>
        )
      case 'seal':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(400px)' }}
          >
            <SealCard value={cardData.value} />
          </div>
        )
      case 'record-lock':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px)' }}
          >
            <RecordLockCard value={cardData.value} status={cardData.status} />
          </div>
        )
      case 'voltage-trend':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px)' }}
          >
            <VoltageTrendCard value={cardData.value} status={cardData.status} />
          </div>
        )
      case 'electrochemical-correction':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px)' }}
          >
            <ElectrochemicalCorrectionCard />
          </div>
        )
      case 'plate-condition':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px)' }}
          >
            <PlateConditionCard value={cardData.value} />
          </div>
        )
      case 'performance-restored':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px)' }}
          >
            <PerformanceRestoredCard
              voltageFrom="11.8V"
              voltageTo="12.4V"
              resistanceFrom="8.7mΩ"
              resistanceTo="4.2mΩ"
            />
          </div>
        )
      case 'warranty':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(400px)' }}
          >
            <WarrantyCard status={cardData.value} coverage={cardData.status} />
          </div>
        )
      case 'lead':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px)' }}
          >
            <LeadCard value={cardData.value} status={cardData.status} />
          </div>
        )
      case 'polymer':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(400px)' }}
          >
            <PolymerCard value={cardData.value} status={cardData.status} />
          </div>
        )
      case 'compliance-record':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px)' }}
          >
            <ComplianceRecordCard value={cardData.value} />
          </div>
        )
      case 'recovery-certified':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(400px)' }}
          >
            <RecoveryCertifiedCard />
          </div>
        )
      default:
        return null
    }
  }

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current

    if (!video || !container) return

    const videoDuration = 67 // Total duration: 1:07 (67 seconds)
    
    // Create scroll sections for each scene
    const scrollSections = sceneTimings.map((scene, index) => {
      const isChargingPhase = index === 5 // Scene 6 (charging phase)
      const isFinalScene = index === 6 // Scene 7 (final dashboard)
      
      return {
        ...scene,
        // Longer scroll distance for special scenes
        scrollMultiplier: isChargingPhase ? 8 : isFinalScene ? 6 : 4
      }
    })

    // Calculate total scroll height
    const totalScrollMultiplier = scrollSections.reduce((sum, s) => sum + s.scrollMultiplier, 0)
    const scrollHeight = window.innerHeight * totalScrollMultiplier

    // Set container height to enable scrolling
    gsap.set(container, { height: scrollHeight })

    // Main ScrollTrigger for video scrubbing
    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: true,
      pinSpacing: false,
      scrub: 5,
      invalidateOnRefresh: true,
      onLeave: () => {
        // Completely hide all cards and video when leaving the section (scrolling down past it)
        setActiveSceneIndex(null)
        
        // Hide the sticky video container
        if (stickyContainerRef.current) {
          gsap.set(stickyContainerRef.current, { opacity: 0, visibility: 'hidden', pointerEvents: 'none' })
        }
        
        // Collapse the container height to remove empty space
        if (container) {
          gsap.set(container, { height: '100vh' })
        }
        
        sceneConfig.forEach((scene, sceneIndex) => {
          scene.cards.forEach((_: CardData, cardIndex: number) => {
            const cardKey = `scene-${sceneIndex}-card-${cardIndex}`
            const card = cardRefs.current[cardKey]
            if (card) {
              gsap.set(card, { opacity: 0, visibility: 'hidden' })
            }
          })
        })
      },
      onEnterBack: () => {
        // Re-enable visibility when scrolling back into the section from below
        
        // Show the sticky video container
        if (stickyContainerRef.current) {
          gsap.set(stickyContainerRef.current, { opacity: 1, visibility: 'visible', pointerEvents: 'auto' })
        }
        
        // Restore the container height for scrolling
        if (container) {
          gsap.set(container, { height: scrollHeight })
        }
        
        sceneConfig.forEach((scene, sceneIndex) => {
          scene.cards.forEach((_: CardData, cardIndex: number) => {
            const cardKey = `scene-${sceneIndex}-card-${cardIndex}`
            const card = cardRefs.current[cardKey]
            if (card) {
              gsap.set(card, { visibility: 'visible' })
            }
          })
        })
      },
      onUpdate: (self) => {
        const progress = self.progress
        
        // If scrolled past the end (progress >= 1), hide everything and keep it hidden
        if (progress >= 1) {
          if (activeSceneIndex !== null) {
            setActiveSceneIndex(null)
            
            // Hide sticky container
            if (stickyContainerRef.current) {
              gsap.set(stickyContainerRef.current, { opacity: 0, visibility: 'hidden', pointerEvents: 'none' })
            }
            
            // Collapse container height
            if (container) {
              gsap.set(container, { height: '100vh' })
            }
            
            sceneConfig.forEach((scene, sceneIndex) => {
              scene.cards.forEach((_: CardData, cardIndex: number) => {
                const cardKey = `scene-${sceneIndex}-card-${cardIndex}`
                const card = cardRefs.current[cardKey]
                if (card) {
                  const cardData = scene.cards[cardIndex]
                  const exitX = cardData.position === 'right' || cardData.position === 'bottom-right' ? 400 : -400
                  gsap.set(card, {
                    x: exitX,
                    opacity: 0
                  })
                }
              })
            })
          }
          return // Exit early - don't process scenes
        }
        
        // Only re-enable scenes if we're scrolling BACK into the lifecycle section
        // This prevents cards from showing when scrolling through sections AFTER lifecycle
        if (progress < 0.95 && activeSceneIndex === null) {
          // User scrolled back up into the lifecycle section
          
          // Show sticky container
          if (stickyContainerRef.current) {
            gsap.set(stickyContainerRef.current, { opacity: 1, visibility: 'visible', pointerEvents: 'auto' })
          }
          
          // Restore container height
          if (container) {
            gsap.set(container, { height: scrollHeight })
          }
          
          setActiveSceneIndex(6) // Show last scene when coming back
        }
        
        const clampedProgress = Math.min(progress, 1)
        let currentTime = 0
        let accumulatedProgress = 0

        // Find which scene we're in based on scroll progress
        for (let i = 0; i < scrollSections.length; i++) {
          const scene = scrollSections[i]
          const sceneProgressShare = scene.scrollMultiplier / totalScrollMultiplier
          const sceneStart = accumulatedProgress
          const sceneEnd = accumulatedProgress + sceneProgressShare
          const isLastScene = i === scrollSections.length - 1

          // For the last scene, include the end boundary (<=), otherwise use (<)
          const isInScene = isLastScene 
            ? (clampedProgress >= sceneStart && clampedProgress <= sceneEnd)
            : (clampedProgress >= sceneStart && clampedProgress < sceneEnd)

          if (isInScene) {
            const sceneProgress = (clampedProgress - sceneStart) / sceneProgressShare
            const sceneDuration = scene.pause - scene.start
            
            // Clamp currentTime to not exceed video duration
            currentTime = Math.min(
              scene.start + (sceneProgress * sceneDuration),
              videoDuration - 0.05
            )

            // Show/hide cards based on scene
            setActiveSceneIndex(scene.sceneIndex)

            // Hide cards from all other scenes
            sceneConfig.forEach((otherScene, otherSceneIndex) => {
              if (otherSceneIndex !== scene.sceneIndex) {
                otherScene.cards.forEach((otherCardData: CardData, cardIndex: number) => {
                  const cardKey = `scene-${otherSceneIndex}-card-${cardIndex}`
                  const card = cardRefs.current[cardKey]
                  if (card) {
                    // Animate out to the side based on position
                    const exitX = otherCardData.position === 'right' || otherCardData.position === 'bottom-right' ? 400 : -400
                    gsap.to(card, {
                      x: exitX,
                      opacity: 0,
                      duration: 0.3,
                      ease: 'power2.in'
                    })
                  }
                })
              }
            })

            // Animate cards in when entering scene
            if (sceneProgress > 0.1) {
              const currentScene = sceneConfig[scene.sceneIndex]
              currentScene.cards.forEach((_: CardData, cardIndex: number) => {
                const cardKey = `scene-${scene.sceneIndex}-card-${cardIndex}`
                const card = cardRefs.current[cardKey]
                if (card) {
                  gsap.to(card, {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power3.out'
                  })
                }
              })
            }

            break
          }

          accumulatedProgress = sceneEnd
        }

        // Update video time and prevent seeking beyond duration
        if (video && !isNaN(currentTime)) {
          const clampedTime = Math.max(0, Math.min(currentTime, videoDuration - 0.033))
          if (Math.abs(video.currentTime - clampedTime) > 0.01) {
            video.currentTime = clampedTime
          }
        }
      }
    })

    // Initial setup: hide all cards and reset their positions
    sceneConfig.forEach((scene, sceneIndex) => {
      scene.cards.forEach((cardData, cardIndex) => {
        const cardKey = `scene-${sceneIndex}-card-${cardIndex}`
        const card = cardRefs.current[cardKey]
        if (card) {
          // Set initial position based on card position
          const initialX = cardData.position === 'right' || cardData.position === 'bottom-right' ? 400 : -400
          gsap.set(card, { x: initialX, opacity: 0 })
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [isLoading])

  const handleVideoReady = () => {
    // Remove loading screen immediately when video metadata is available
    setIsLoading(false)
  }

  // Also try to remove loading after a timeout as fallback
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Remove loading screen after 2 seconds max

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="relative w-full bg-black">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#ff6b1a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg font-['Arial',sans-serif]">Loading Battery Lifecycle...</p>
          </div>
        </div>
      )}

      {/* Scroll Container */}
      <div ref={containerRef} className="relative w-full">
        {/* Sticky Video Container */}
        <div ref={stickyContainerRef} className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
            loop={false}
            onLoadedMetadata={handleVideoReady}
            onTimeUpdate={(e) => {
              // Safety: prevent video from reaching the very end
              const video = e.currentTarget
              if (video.currentTime > video.duration - 0.033) {
                video.currentTime = video.duration - 0.033
              }
            }}
            onEnded={(e) => {
              // Prevent video from resetting - lock to final frame
              const video = e.currentTarget
              video.currentTime = video.duration - 0.033
              video.pause()
            }}
          >
            <source src="/lifecycle/fullscene.webm" type="video/webm" />
          </video>

          {/* Scene Progress Indicator - Separate Containers */}
          {!isLoading && (
            <>
              {/* Progress Boxes Container */}
              <div className="absolute top-32 left-[30rem] z-20">
                <div 
                  className="flex items-center gap-2 backdrop-blur-md"
                  style={{
                    height: '75px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.10)',
                    background: 'rgba(20, 20, 20, 0.70)',
                    padding: '0 20px'
                    
                  }}
                >
                  {sceneTimings.map((_, index) => (
                    <div
                      key={index}
                      className={`relative transition-all duration-300 ${
                        activeSceneIndex === index ? 'w-7 h-7' : 'w-6 h-6'
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

              {/* Scene Title Label - Separate Container */}
              {activeSceneIndex !== null && (
                <div className="absolute top-32 right-64 z-20">
                  <div
                    className="flex items-center backdrop-blur-md"
                    style={{
                      height: '75px',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.10)',
                      background: 'rgba(20, 20, 20, 0.70)',
                      padding: '0 32px'
                    }}
                  >
                    <p className="text-white/90 text-base font-['Arial',sans-serif] tracking-wide uppercase whitespace-nowrap">
                      Scene {activeSceneIndex + 1} — {sceneConfig[activeSceneIndex]?.title}
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

          {/* Scroll Indicator (only visible when not loading and in active scene) */}
          {!isLoading && activeSceneIndex !== null && activeSceneIndex < 6 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
              <p className="text-white/60 text-sm font-['Arial',sans-serif]">Scroll to explore</p>
              <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}