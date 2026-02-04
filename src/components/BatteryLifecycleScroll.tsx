import { useEffect, useRef, useState } from 'react'
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
      },
      {
        cardType: 'logged',
        value: '',
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
      },
      {
        cardType: 'controlled',
        value: '',
        status: '',
        position: 'right'
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
      },
      {
        cardType: 'certified',
        value: '',
        status: '',
        position: 'right'
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
      },
      {
        cardType: 'verified',
        value: '',
        status: '',
        position: 'right'
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

// Image cache to prevent black flicker
const frameCache = new Map<string, HTMLImageElement>()

// Preload helper function with caching
const preloadImage = (src: string): Promise<void> => {
  // Return immediately if already cached
  if (frameCache.has(src)) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      frameCache.set(src, img)
      resolve()
    }
    img.onerror = reject
    img.src = src
  })
}

export default function BatteryLifecycleScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyContainerRef = useRef<HTMLDivElement>(null)
  const [activeSceneIndex, setActiveSceneIndex] = useState<number | null>(null)
  const [currentFrame, setCurrentFrame] = useState(1) // Current frame to display (1-based)
  const [currentSceneForFrame, setCurrentSceneForFrame] = useState(0) // Scene index for frame rendering (0-based)
  const [isPreloading, setIsPreloading] = useState(true) // Track preload state
  const [preloadProgress, setPreloadProgress] = useState(0) // Track preload progress
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const { setNavbarVisible } = useNavbar()
  const hasPreloadedRef = useRef(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentCanvasFrameRef = useRef({ scene: 0, frame: 1 }) // Track what's on canvas
  const rafRef = useRef<number | null>(null)

  // Canvas frame rendering - ZERO BLINK guaranteed
  const drawFrame = (sceneIndex: number, frameNumber: number) => {
    // Skip if same frame already on canvas
    if (currentCanvasFrameRef.current.scene === sceneIndex && 
        currentCanvasFrameRef.current.frame === frameNumber) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const frameSrc = `/lifecycle/frames/scene-${sceneIndex + 1}/frame_${String(frameNumber).padStart(4, '0')}.webp`
    const cachedImage = frameCache.get(frameSrc)

    // CRITICAL: Only draw if image is cached and ready
    // This ensures old frame stays visible until new frame is ready
    if (cachedImage && cachedImage.complete && cachedImage.naturalWidth > 0) {
      const ctx = canvas.getContext('2d', { 
        alpha: false, // No transparency = faster
        desynchronized: true // Better performance
      })
      
      if (ctx) {
        // Ensure canvas is fully opaque
        ctx.globalAlpha = 1.0
        // Draw cached image directly to canvas - no blink!
        ctx.drawImage(cachedImage, 0, 0, canvas.width, canvas.height)
        currentCanvasFrameRef.current = { scene: sceneIndex, frame: frameNumber }
        
        // Force canvas visibility
        if (canvas.style.opacity !== '1') {
          canvas.style.opacity = '1'
        }
      }
    }
    // If not cached: old frame remains visible (no black flash)
  }

  // Function to render specific card type
  const renderCard = (cardType: string, cardData: CardData, sceneIndex: number, cardIndex: number) => {
    const getCardPosition = () => {
      // Scene-specific positioning
      if (sceneIndex === 0) {
        // Scene 1 positions
        if (cardData.position === 'right') return 'right-10 sm:right-14 md:right-auto md:left-[19em] top-20 sm:top-24 md:top-12'
        if (cardData.position === 'left') return 'left-8 sm:left-10 md:left-12 top-20 sm:top-24 md:top-12'
        if (cardData.position === 'bottom-left') return 'left-12 sm:left-14 md:left-[4rem] top-[38%] sm:top-[40%] md:top-[22rem]'
        if (cardData.position === 'bottom-right') return 'left-12 sm:left-14 md:left-[4rem] top-[68%] sm:top-[70%] md:top-[41rem]'
      } else if (sceneIndex === 1) {
        // Scene 2 positions
        if (cardData.position === 'right') return 'right-10 sm:right-14 md:right-auto md:left-[19em] top-20 sm:top-24 md:top-12'
        if (cardData.position === 'left') return 'left-8 sm:left-10 md:left-12 top-20 sm:top-24 md:top-12'
        if (cardData.position === 'bottom-left') return 'left-12 sm:left-14 md:left-16 top-[34%] sm:top-[36%] md:top-[23rem]'
        if (cardData.position === 'bottom-right') return 'left-12 sm:left-14 md:left-16 top-[65%] sm:top-[67%] md:top-[41rem]'
      } else if (sceneIndex === 2) {
        // Scene 3 positions
        if (cardData.position === 'right') {
          if (cardData.cardType === 'logged') return 'right-4 sm:right-6 md:right-16 bottom-16'
          return 'left-12 sm:left-14 md:left-20 top-[67%] sm:top-[69%] md:top-[43rem]'
        }
        if (cardData.position === 'left') return 'left-12 sm:left-14 md:left-20 top-14 sm:top-16 md:top-12'
        if (cardData.position === 'bottom-left') return 'left-12 sm:left-14 md:left-20 top-[22%] sm:top-[24%] md:top-[14rem]'
        if (cardData.position === 'bottom-right') return 'left-12 sm:left-14 md:left-20 top-[41%] sm:top-[42%] md:top-[27rem]'
      } else if (sceneIndex === 3) {
        // Scene 4 positions
        if (cardData.position === 'right') return 'right-10 sm:right-14 md:right-auto md:left-[19em] top-20 sm:top-24 md:top-12'
        if (cardData.position === 'left') return 'left-8 sm:left-10 md:left-12 top-20 sm:top-24 md:top-12'
        if (cardData.position === 'bottom-left') return 'left-12 sm:left-14 md:left-16 top-[34%] sm:top-[36%] md:top-[22rem]'
        if (cardData.position === 'bottom-right') return 'left-12 sm:left-14 md:left-16 top-[62%] sm:top-[64%] md:top-[40rem]'
      } else if (sceneIndex === 4) {
        // Scene 5 positions
        if (cardData.position === 'right') {
          if (cardData.cardType === 'controlled') return 'right-4 md:right-16 bottom-16'
          return 'right-16 md:right-auto md:left-[19em] top-24 md:top-12'
        }
        if (cardData.position === 'left') return 'left-6 md:left-12 top-24 md:top-12'
        if (cardData.position === 'bottom-left') return 'left-4 md:left-16 top-[22rem]'
        if (cardData.position === 'bottom-right') return 'left-4 md:left-16 top-[36rem] md:top-[41.5rem]'
      } else if (sceneIndex === 5) {
        // Scene 6 positions
        if (cardData.position === 'top') return 'left-4 md:left-20 top-16'
        if (cardData.position === 'left') return 'left-8 md:left-16 top-[13rem] md:top-[25rem]'
        if (cardData.position === 'right') {
          if (cardData.cardType === 'certified') return 'right-4 md:right-16 bottom-16'
          return 'right-16 md:right-auto md:left-[20rem] top-[26rem] md:top-[25rem]'
        }
        if (cardData.position === 'bottom') return 'left-4 md:left-20 top-[36rem] md:top-[44em]'
      } else if (sceneIndex === 6) {
        // Scene 7 positions
        if (cardData.position === 'left') return 'left-6 md:left-12 top-16'
        if (cardData.position === 'right') {
          if (cardData.cardType === 'verified') return 'right-4 md:right-16 bottom-16'
          return 'right-16 md:right-auto md:left-[19em] top-16'
        }
        if (cardData.position === 'bottom-left') return 'left-4 md:left-16 top-[24rem]'
        if (cardData.position === 'bottom-right') return 'left-4 md:left-16 top-[35rem] md:top-[40rem]'
      }
      // Default positions
      if (cardData.position === 'right') return 'right-16 md:right-auto md:left-[16rem] top-24 md:top-20'
      if (cardData.position === 'left') return 'left-6 md:left-8 top-24 md:top-20'
      if (cardData.position === 'bottom-left') return 'left-4 md:left-8 top-[20rem]'
      if (cardData.position === 'bottom-right') return 'left-4 md:left-[16rem] top-[22rem]'
      
      return 'left-4 md:left-8 top-1/2 -translate-y-1/2'
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
      case 'logged':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <LoggedCard />
          </div>
        )
      case 'controlled':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <ControlledCard />
          </div>
        )
      case 'certified':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <CertifiedCard />
          </div>
        )
      case 'verified':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <VerifiedCard />
          </div>
        )
      default:
        return null
    }
  }

  // Preload critical frames before component becomes interactive
  useEffect(() => {
    if (hasPreloadedRef.current) return
    hasPreloadedRef.current = true

    const startTime = Date.now()

    const preloadCriticalFrames = async () => {
      try {
        // Extended preload strategy: Load enough frames to ensure smooth first scroll
        // Scene 1: EVERY frame (60 frames)
        const scene1Frames = Array.from({ length: 60 }, (_, i) => i + 1)
        // Scene 2: EVERY frame (60 frames) - ensure full smooth playback
        const scene2Frames = Array.from({ length: 60 }, (_, i) => i + 1)
        // Scene 3: Every 5th frame (36 frames) - sample ahead
        const scene3Frames = Array.from({ length: 36 }, (_, i) => (i * 5) + 1)
        // Scene 4: Every 10th frame (16 frames) - sample ahead
        const scene4Frames = Array.from({ length: 16 }, (_, i) => (i * 10) + 1)
        
        const criticalFrames = [
          ...scene1Frames.map(f => `/lifecycle/frames/scene-1/frame_${String(f).padStart(4, '0')}.webp`),
          ...scene2Frames.map(f => `/lifecycle/frames/scene-2/frame_${String(f).padStart(4, '0')}.webp`),
          ...scene3Frames.map(f => `/lifecycle/frames/scene-3/frame_${String(f).padStart(4, '0')}.webp`),
          ...scene4Frames.map(f => `/lifecycle/frames/scene-4/frame_${String(f).padStart(4, '0')}.webp`)
        ]

        let loaded = 0
        const total = criticalFrames.length

        // Preload in larger batches for faster loading
        const batchSize = 8
        for (let i = 0; i < criticalFrames.length; i += batchSize) {
          const batch = criticalFrames.slice(i, i + batchSize)
          await Promise.all(
            batch.map(src => 
              preloadImage(src).then(() => {
                loaded++
                setPreloadProgress(Math.round((loaded / total) * 100))
              })
            )
          )
        }

        // Ensure minimum loading time (2 seconds) so caching is complete
        const elapsed = Date.now() - startTime
        const minLoadTime = 2000 // 2 seconds minimum
        const remainingTime = Math.max(0, minLoadTime - elapsed)
        
        await new Promise(resolve => setTimeout(resolve, remainingTime + 300))
        setIsPreloading(false)
      } catch (error) {
        // Even on error, ensure minimum load time
        const elapsed = Date.now() - startTime
        const minLoadTime = 2000
        const remainingTime = Math.max(0, minLoadTime - elapsed)
        await new Promise(resolve => setTimeout(resolve, remainingTime))
        setIsPreloading(false)
      }
    }

    preloadCriticalFrames()
  }, [])

  // Background preload remaining frames after component is interactive
  useEffect(() => {
    if (isPreloading) return

    const preloadRemainingFrames = async () => {
      // Priority 1: Preload scene 7 first (to prevent flicker at the end)
      const scene7Frames: string[] = []
      for (let i = 1; i <= SCENE_FRAME_COUNTS[6]; i += 4) {
        scene7Frames.push(`/lifecycle/frames/scene-7/frame_${String(i).padStart(4, '0')}.webp`)
      }
      
      const batchSize = 4
      for (let i = 0; i < scene7Frames.length; i += batchSize) {
        const batch = scene7Frames.slice(i, i + batchSize)
        await Promise.all(batch.map(src => preloadImage(src).catch(() => {})))
        await new Promise(resolve => setTimeout(resolve, 50))
      }
      
      // Priority 2: Fill in remaining frames for all scenes
      const scenes = [
        { sceneIndex: 2, count: SCENE_FRAME_COUNTS[2], stride: 1 }, // Scene 3: EVERY frame (fill gaps)
        { sceneIndex: 3, count: SCENE_FRAME_COUNTS[3], stride: 1 }, // Scene 4: EVERY frame (fill gaps)
        { sceneIndex: 4, count: SCENE_FRAME_COUNTS[4], stride: 1 }, // Scene 5: EVERY frame
        { sceneIndex: 5, count: SCENE_FRAME_COUNTS[5], stride: 2 }, // Scene 6: every 2nd frame
      ]

      for (const scene of scenes) {
        const frames: string[] = []
        for (let i = 1; i <= scene.count; i += scene.stride) {
          frames.push(`/lifecycle/frames/scene-${scene.sceneIndex + 1}/frame_${String(i).padStart(4, '0')}.webp`)
        }

        // Preload in small batches with delays to not block main thread
        for (let i = 0; i < frames.length; i += batchSize) {
          const batch = frames.slice(i, i + batchSize)
          await Promise.all(batch.map(src => preloadImage(src).catch(() => {})))
          await new Promise(resolve => setTimeout(resolve, 60))
        }
      }
    }

    // Start background preloading immediately
    const timeoutId = setTimeout(() => {
      preloadRemainingFrames()
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [isPreloading])

  useEffect(() => {
    const container = containerRef.current

    if (!container || isPreloading) return
    
    // Set initial minimum height immediately to prevent black space
    gsap.set(container, { minHeight: window.innerHeight * 30 })
    
    // Wait for component to be fully mounted and laid out
    const initTimeout = setTimeout(() => {
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

      // Set initial state BEFORE ScrollTrigger starts
      // This ensures frame 1 is visible immediately when section comes into view
      setCurrentFrame(1)
      setCurrentSceneForFrame(0)
      setActiveSceneIndex(null) // Don't show cards initially, only frame
      
      // Force initial frame draw
      drawFrame(0, 1)

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
        // Ensure first frame is visible and canvas is shown
        drawFrame(0, 1)
        // Force canvas visibility when entering section
        const canvas = canvasRef.current
        if (canvas) {
          canvas.style.opacity = '1'
          canvas.style.visibility = 'visible'
        }
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
        // Reset to first frame when leaving upwards
        setCurrentFrame(1)
        setCurrentSceneForFrame(0)
        drawFrame(0, 1)
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

            // Hide cards from current scene if we're in scene 1 before frame 50
            if (scene.sceneIndex === 0 && clampedFrameIndex < 50) {
              const currentScene = sceneConfig[scene.sceneIndex]
              currentScene.cards.forEach((_: CardData, cardIndex: number) => {
                const cardKey = `scene-${scene.sceneIndex}-card-${cardIndex}`
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

            // Animate cards in - smooth entrance
            // For the last scene, show cards earlier to ensure they're visible
            const showThreshold = isLastScene ? 0.05 : 0.15
            
            // Only show cards after frame 50 in scene 1, or if we're past scene 1
            const shouldShowCards = (scene.sceneIndex > 0) || (scene.sceneIndex === 0 && clampedFrameIndex >= 50)
            
            if (sceneProgress > showThreshold && shouldShowCards) {
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

      // Refresh ScrollTrigger after everything is set up
      ScrollTrigger.refresh()
    }, 100) // Small delay to ensure layout is ready

    return () => {
      clearTimeout(initTimeout)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      // Show navbar when component unmounts
      setNavbarVisible(true)
    }
  }, [setNavbarVisible, isPreloading])

  // Initialize canvas and draw first frame IMMEDIATELY
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || isPreloading) return

    // Set canvas to match frame resolution (1920x1080 or your frame size)
    canvas.width = 1920
    canvas.height = 1080

    // Fill canvas with black immediately to prevent white flash
    const ctx = canvas.getContext('2d', { 
      alpha: false,
      desynchronized: true 
    })
    if (ctx) {
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Set initial state immediately
    setCurrentFrame(1)
    setCurrentSceneForFrame(0)
    setActiveSceneIndex(null)

    // Draw first frame when ready - CRITICAL for initial visibility
    let attempts = 0
    const maxAttempts = 100
    
    const drawInitialFrame = () => {
      const firstFrameSrc = '/lifecycle/frames/scene-1/frame_0001.webp'
      const cachedImage = frameCache.get(firstFrameSrc)
      
      if (cachedImage && cachedImage.complete && cachedImage.naturalWidth > 0) {
        // Draw frame immediately
        drawFrame(0, 1)
        
        // Show canvas - frame is ready!
        if (canvas) {
          canvas.style.opacity = '1'
          canvas.style.visibility = 'visible'
        }
        
        // Refresh after a moment
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 100)
      } else {
        attempts++
        // Keep trying until first frame is cached, with fallback
        if (attempts < maxAttempts) {
          setTimeout(drawInitialFrame, 50)
        } else {
          // Fallback: show canvas anyway after reasonable wait
          if (canvas) {
            canvas.style.opacity = '1'
            canvas.style.visibility = 'visible'
          }
        }
      }
    }

    // Start drawing immediately
    drawInitialFrame()

    // Fallback timeout: ensure canvas is visible after 2 seconds
    const fallbackTimeout = setTimeout(() => {
      if (canvas && canvas.style.opacity === '0') {
        canvas.style.opacity = '1'
        canvas.style.visibility = 'visible'
        drawFrame(0, 1)
      }
    }, 2000)

    return () => {
      clearTimeout(fallbackTimeout)
    }
  }, [isPreloading])

  // Watch for when component enters viewport and refresh ScrollTrigger
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Component is visible, refresh ScrollTrigger
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

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  // Canvas frame update with RAF - smooth and blink-free
  useEffect(() => {
    // Cancel any pending RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    // Use RAF for optimal performance
    rafRef.current = requestAnimationFrame(() => {
      drawFrame(currentSceneForFrame, currentFrame)
    })

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [currentFrame, currentSceneForFrame])

  // Preload next frames for smooth scrolling (only when not in initial preload)
  useEffect(() => {
    if (isPreloading) return

    const preloadCount = 35 // Aggressive preload to prevent first-scroll blink
    const frameCount = SCENE_FRAME_COUNTS[currentSceneForFrame]
    
    for (let i = 1; i <= preloadCount; i++) {
      const nextFrame = currentFrame + i
      
      // Preload frames within current scene
      if (nextFrame <= frameCount) {
        const src = `/lifecycle/frames/scene-${currentSceneForFrame + 1}/frame_${String(nextFrame).padStart(4, '0')}.webp`
        if (!frameCache.has(src)) {
          const img = new Image()
          img.decoding = 'async'
          img.src = src
          img.onload = () => frameCache.set(src, img)
        }
      } else if (currentSceneForFrame < SCENE_FRAME_COUNTS.length - 1) {
        // Preload first frames of next scene
        const nextSceneIndex = currentSceneForFrame + 1
        const nextSceneFrame = nextFrame - frameCount
        if (nextSceneFrame <= SCENE_FRAME_COUNTS[nextSceneIndex]) {
          const src = `/lifecycle/frames/scene-${nextSceneIndex + 1}/frame_${String(nextSceneFrame).padStart(4, '0')}.webp`
          if (!frameCache.has(src)) {
            const img = new Image()
            img.decoding = 'async'
            img.src = src
            img.onload = () => frameCache.set(src, img)
          }
        }
      }
    }
  }, [currentFrame, currentSceneForFrame, isPreloading])

  // Show loading screen while preloading
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
          {/* Canvas renderer - ZERO BLINK, enterprise-grade */}
          <div 
            className="absolute inset-0 w-full h-full bg-black"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              opacity: 1
            }}
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none bg-black"
              style={{ 
                objectFit: 'cover',
                imageRendering: 'crisp-edges',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                willChange: 'transform',
                opacity: 1,
                visibility: 'visible'
              }}
            />
          </div>

          {/* Scene Progress Indicator - Separate Containers */}
          {(currentSceneForFrame > 0 || (currentSceneForFrame === 0 && currentFrame >= 50)) && (
            <>
              {/* Progress Boxes Container */}
              <div className="absolute top-2 md:top-8 left-2 sm:left-4 md:left-[38rem] z-20">
                <div 
                  className="flex items-center gap-0.5 md:gap-2 backdrop-blur-sm h-[30px] md:h-[75px] rounded-md md:rounded-2xl px-1.5 md:px-5"
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
                        activeSceneIndex === index ? 'w-3 h-3 md:w-7 md:h-7' : 'w-2.5 h-2.5 md:w-6 md:h-6'
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
                <div className="absolute top-2 md:top-8 right-2 sm:right-4 md:right-16 z-20">
                  <div
                    className="flex items-center justify-center backdrop-blur-sm h-[30px] sm:h-[35px] md:h-[75px] rounded-lg md:rounded-2xl px-2 sm:px-3 md:px-12 whitespace-nowrap"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.10)',
                      background: 'rgba(0, 0, 0, 0.4)',
                      willChange: 'transform'
                    }}
                  >
                    <p className="text-white/90 text-[7px] xs:text-[8px] sm:text-[9px] md:text-base font-['Arial',sans-serif] tracking-wide uppercase">
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
            <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 md:gap-2 animate-bounce">
              <p className="text-white/60 text-xs md:text-sm font-['Arial',sans-serif]">Scroll to explore</p>
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}