import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavbar } from '../contexts/NavbarContext'

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

// Frame counts per scene (Variable FPS for optimized performance)
const SCENE_FRAME_COUNTS = [
  60,   // Scene 1: 0-4s (15 FPS - Smooth intro)
  60,   // Scene 2: 4-8s (15 FPS - Clear change)
  180,  // Scene 3: 8-26s (10 FPS - Long scene, light)
  160,  // Scene 4: 26-42s (10 FPS - Stable)
  36,   // Scene 5: 42-45s (12 FPS - Short + fluid)
  100,  // Scene 6: 45-55s (10 FPS - Verification)
  96    // Scene 7: 55-67s (8 FPS - Calm ending)
]

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
    title: 'OPERATING WITHIN OPTIMAL RANGE',
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
    title: 'EARLY PERFORMANCE DRIFT DETECTED',
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
    title: 'EARLY PERFORMANCE DRIFT DETECTED',
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
    title: 'REVIVAL ELIGIBLE',
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
    title: 'REVIVAL PROCESS IN PROGRESS',
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
    title: 'PERFORMANCE RESTORED FOR EXTENDED USE',
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
        value: 'DIAGNOSTIC',
        status: 'RECORD LOCKED',
        position: 'bottom'
      }
    ]
  },
  // Scene 7: Final Summary
  {
    id: 7,
    title: 'MATERIAL RECOVERY INITIATED',
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
  { start: 4, pause: 8, sceneIndex: 1 },      // Scene 2: 4-8s
  { start: 8, pause: 26, sceneIndex: 2 },     // Scene 3: 8-26s
  { start: 26, pause: 42, sceneIndex: 3 },    // Scene 4: 26-42s
  { start: 42, pause: 45, sceneIndex: 4 },    // Scene 5: 42-45s
  { start: 45, pause: 55, sceneIndex: 5 },    // Scene 6: 45-55s
  { start: 55, pause: 67, sceneIndex: 6 }     // Scene 7: 55-67s 
]

export default function BatteryLifecycleScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyContainerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeSceneIndex, setActiveSceneIndex] = useState<number | null>(null)
  const [currentFrame, setCurrentFrame] = useState(1) // Current frame to display (1-based)
  const [currentSceneForFrame, setCurrentSceneForFrame] = useState(0) // Scene index for frame rendering (0-based)
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const { setNavbarVisible } = useNavbar()

  // Function to render specific card type
  const renderCard = (cardType: string, cardData: CardData, sceneIndex: number, cardIndex: number) => {
    const getCardPosition = () => {
      // Scene-specific positioning
      if (sceneIndex === 0) {
        // Scene 1 positions
        if (cardData.position === 'right') return 'left-[19em] top-12'
        if (cardData.position === 'left') return 'left-12 top-12'
        if (cardData.position === 'bottom-left') return 'left-[4rem] top-[24rem]'
        if (cardData.position === 'bottom-right') return 'left-[4rem] top-[45rem]'
      } else if (sceneIndex === 1) {
        // Scene 2 positions
        if (cardData.position === 'right') return 'left-[19em] top-12'
        if (cardData.position === 'left') return 'left-12 top-12'
        if (cardData.position === 'bottom-left') return 'left-16 top-[24rem]'
        if (cardData.position === 'bottom-right') return 'left-16 top-[44rem]'
      } else if (sceneIndex === 2) {
        // Scene 3 positions
        if (cardData.position === 'right') return 'left-20 top-[48rem]'
        if (cardData.position === 'left') return 'left-20 top-14'
        if (cardData.position === 'bottom-left') return 'left-20 top-[16rem]'
        if (cardData.position === 'bottom-right') return 'left-20 top-[30rem]'
      } else if (sceneIndex === 3) {
        // Scene 4 positions
        if (cardData.position === 'right') return 'left-[19em] top-12'
        if (cardData.position === 'left') return 'left-12 top-12'
        if (cardData.position === 'bottom-left') return 'left-16 top-[24rem]'
        if (cardData.position === 'bottom-right') return 'left-16 top-[44rem]'
      } else if (sceneIndex === 4) {
        // Scene 5 positions
        if (cardData.position === 'right') return 'left-[19em] top-12'
        if (cardData.position === 'left') return 'left-12 top-12'
        if (cardData.position === 'bottom-left') return 'left-16 top-[24rem]'
        if (cardData.position === 'bottom-right') return 'left-16 top-[46rem]'
      } else if (sceneIndex === 5) {
        // Scene 6 positions
        if (cardData.position === 'top') return 'left-20 top-16'
        if (cardData.position === 'left') return 'left-16 top-[25rem]'
        if (cardData.position === 'right') return 'left-[20rem] top-[25rem]'
        if (cardData.position === 'bottom') return 'left-20 top-[44rem]'
      } else if (sceneIndex === 6) {
        // Scene 7 positions
        if (cardData.position === 'left') return 'left-12 top-16'
        if (cardData.position === 'right') return 'left-[19em] top-16'
        if (cardData.position === 'bottom-left') return 'left-16 top-[24rem]'
        if (cardData.position === 'bottom-right') return 'left-16 top-[40rem]'
      }
      // Default positions
      if (cardData.position === 'right') return 'left-[16rem] top-20'
      if (cardData.position === 'left') return 'left-8 top-20'
      if (cardData.position === 'bottom-left') return 'left-8 top-[20rem]'
      if (cardData.position === 'bottom-right') return 'left-[16rem] top-[22rem]'
      
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
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
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <RecoveryCertifiedCard />
          </div>
        )
      default:
        return null
    }
  }

  useEffect(() => {
    const container = containerRef.current

    if (!container) return
    
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

    // Main ScrollTrigger for frame scrubbing
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
        // Hide navbar when entering the section
        setNavbarVisible(false)
      },
      onLeave: () => {
        // Show navbar when leaving the section (scrolling down past it)
        setNavbarVisible(true)
      },
      onEnterBack: () => {
        // Hide navbar when scrolling back into the section from below
        setNavbarVisible(false)
      },
      onLeaveBack: () => {
        // Show navbar when scrolling back up above the section
        setNavbarVisible(true)
      },
      onUpdate: (self) => {
        const progress = self.progress
        
        // Clamp progress to ensure we stay within bounds
        const clampedProgress = Math.max(0, Math.min(progress, 1))
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
            // Calculate scene progress, ensuring it doesn't exceed 1
            const sceneProgress = Math.min((clampedProgress - sceneStart) / sceneProgressShare, 1)
            
            // Calculate frame index based on scene progress
            const frameCount = SCENE_FRAME_COUNTS[scene.sceneIndex]
            const frameIndex = Math.floor(sceneProgress * (frameCount - 1))
            const clampedFrameIndex = Math.max(0, Math.min(frameIndex, frameCount - 1))
            
            // Update frame state (convert to 1-based for file naming)
            setCurrentFrame(clampedFrameIndex + 1)
            setCurrentSceneForFrame(scene.sceneIndex)

            // Show/hide cards based on scene
            setActiveSceneIndex(scene.sceneIndex)

            // Hide cards from all other scenes - smooth exit
            sceneConfig.forEach((otherScene, otherSceneIndex) => {
              if (otherSceneIndex !== scene.sceneIndex) {
                otherScene.cards.forEach((_otherCardData: CardData, cardIndex: number) => {
                  const cardKey = `scene-${otherSceneIndex}-card-${cardIndex}`
                  const card = cardRefs.current[cardKey]
                  if (card) {
                    gsap.to(card, {
                      x: -400,
                      opacity: 0,
                      duration: 0.2,
                      ease: 'power2.inOut',
                      force3D: true,
                      overwrite: 'auto'
                    })
                  }
                })
              }
            })

            // Animate cards in - smooth entrance
            // For the last scene, show cards earlier to ensure they're visible
            const showThreshold = isLastScene ? 0.05 : 0.15
            if (sceneProgress > showThreshold) {
              const currentScene = sceneConfig[scene.sceneIndex]
              currentScene.cards.forEach((_: CardData, cardIndex: number) => {
                const cardKey = `scene-${scene.sceneIndex}-card-${cardIndex}`
                const card = cardRefs.current[cardKey]
                if (card) {
                  gsap.to(card, {
                    x: 0,
                    opacity: 1,
                    duration: 0.25,
                    ease: 'power2.out',
                    force3D: true,
                    overwrite: 'auto'
                  })
                }
              })
            }

            break
          }

          accumulatedProgress = sceneEnd
        }

        // Frame rendering is handled via state updates above
        // No video seeking required
      }
    })

    // Initial setup: hide all cards and reset their positions
    sceneConfig.forEach((scene, sceneIndex) => {
      scene.cards.forEach((_cardData, cardIndex) => {
        const cardKey = `scene-${sceneIndex}-card-${cardIndex}`
        const card = cardRefs.current[cardKey]
        if (card) {
          // All cards start from the left
          gsap.set(card, { x: -400, opacity: 0 })
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      // Show navbar when component unmounts
      setNavbarVisible(true)
    }
  }, [isLoading, setNavbarVisible])

  // Remove loading screen after frames are ready
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 500) // Remove loading screen after brief delay

    return () => clearTimeout(timeout)
  }, [])

  // Preload next frames for smooth scrolling
  useEffect(() => {
    if (isLoading) return

    const preloadCount = 10 // Preload next 10 frames
    const frameCount = SCENE_FRAME_COUNTS[currentSceneForFrame]
    
    for (let i = 1; i <= preloadCount; i++) {
      const nextFrame = currentFrame + i
      
      // Preload frames within current scene
      if (nextFrame <= frameCount) {
        const img = new Image()
        img.src = `/lifecycle/frames/scene-${currentSceneForFrame + 1}/frame_${String(nextFrame).padStart(4, '0')}.webp`
      } else if (currentSceneForFrame < SCENE_FRAME_COUNTS.length - 1) {
        // Preload first frames of next scene
        const nextSceneIndex = currentSceneForFrame + 1
        const nextSceneFrame = nextFrame - frameCount
        if (nextSceneFrame <= SCENE_FRAME_COUNTS[nextSceneIndex]) {
          const img = new Image()
          img.src = `/lifecycle/frames/scene-${nextSceneIndex + 1}/frame_${String(nextSceneFrame).padStart(4, '0')}.webp`
        }
      }
    }
  }, [currentFrame, currentSceneForFrame, isLoading])

  return (
    <div className="relative w-full bg-black">
      {/* Loading Overlay */}
      {/* {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#ff6b1a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg font-['Arial',sans-serif]">Loading Battery Lifecycle...</p>
          </div>
        </div>
      )} */}

      {/* Scroll Container */}
      <div ref={containerRef} className="relative w-full">
        {/* Sticky Frame Container */}
        <div ref={stickyContainerRef} className="sticky top-0 left-0 w-full h-screen overflow-hidden" style={{ transform: 'translate3d(0, 0, 0)', contain: 'layout style paint' }}>
          {/* Frame-by-frame renderer */}
          <img
            src={`/lifecycle/frames/scene-${currentSceneForFrame + 1}/frame_${String(currentFrame).padStart(4, '0')}.webp`}
            alt="Battery lifecycle animation"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ willChange: 'transform', imageRendering: 'crisp-edges' }}
          />

          {/* Scene Progress Indicator - Separate Containers */}
          {!isLoading && (
            <>
              {/* Progress Boxes Container */}
              <div className="absolute top-8 left-[38rem] z-20">
                <div 
                  className="flex items-center gap-2 backdrop-blur-sm"
                  style={{
                    height: '75px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.10)',
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '0 20px',
                    willChange: 'transform'
                    
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
                <div className="absolute top-8 right-16 z-20">
                  <div
                    className="flex items-center justify-center backdrop-blur-sm"
                    style={{
                      height: '75px',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.10)',
                      background: 'rgba(0, 0, 0, 0.4)',
                      padding: '0 48px',
                      width: '750px',
                      willChange: 'transform'
                    }}
                  >
                    <p className="text-white/90 text-base font-['Arial',sans-serif] tracking-wide uppercase whitespace-nowrap">
                      {sceneConfig[activeSceneIndex]?.title}
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
          {!isLoading && activeSceneIndex === 6 && currentFrame >= 60 && currentFrame <= 93 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <div
                className="backdrop-blur-md animate-pulse"
                style={{
                  borderRadius: '20px',
                  border: '2px solid rgba(255, 107, 26, 0.8)',
                  background: 'rgba(255, 107, 26, 0.15)',
                  padding: '32px 64px',
                  boxShadow: '0 0 40px rgba(255, 107, 26, 0.6), inset 0 0 20px rgba(255, 107, 26, 0.2)',
                }}
              >
                <div className="flex flex-col items-center gap-3">
                  {/* Warning Icon */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#ff6b1a]/30 border-2 border-[#ff6b1a]">
                    <svg className="w-8 h-8 text-[#ff6b1a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  {/* Warning Text */}
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#ff6b1a] font-['Arial',sans-serif] tracking-wider mb-2">
                      END OF LIFE
                    </h2>
                    <p className="text-xl text-white/90 font-['Arial',sans-serif] tracking-wide">
                      NEXT STAGE: RECYCLE
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

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