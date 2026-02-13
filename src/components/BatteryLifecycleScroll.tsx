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

gsap.registerPlugin(ScrollTrigger)
const SCENE_FRAME_COUNTS = [
  60,   // Scene 1: 0-4s
  60,   // Scene 2: 4-8s
  84,   // Scene 3: 8-26s
  120,  // Scene 4: 16-28s
  187,  // Scene 5: 28-44s
  125,  // Scene 6: 43-56s
  88    // Scene 7: 56-67s
]

interface CardData {
  cardType: string
  value: string
  status: string
  position: 'left' | 'right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'center-bottom'
}

interface SceneConfig {
  id: number
  headline: string
  subline: string
  cards: CardData[]
}

const sceneConfig: SceneConfig[] = [
  // Scene 1: Initial Diagnostics
  {
    id: 1,
    headline: 'DIAGNOSTIC TRACE — BASELINE RECORDED',
    subline: 'In-service electrical signature logged',
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
    headline: 'DIAGNOSTIC TRACE — DECLINE DETECTED',
    subline: 'Sulphation onset identified',
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
    headline: 'DIAGNOSTIC TRACE — CHAIN OF CUSTODY',
    subline: 'Pickup logged • Route verified',
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
    headline: 'DIAGNOSTIC TRACE — ELIGIBILITY CONFIRMED',
    subline: 'Cell-level health profile generated',
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
    headline: 'DIAGNOSTIC TRACE — CONTROLLED RESTORATION',
    subline: 'Electrochemical correction in progress',
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
    headline: 'PATH AHEAD — SECOND LIFE ENABLED',
    subline: 'Performance restored • Track continues',
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
    headline: 'PATH AHEAD — MATERIAL RECOVERY',
    subline: 'Recycling initiated after verified service life',
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
  const [shouldShowUI, setShouldShowUI] = useState(false) // Track if progress bar and title should be visible (once true, stays true)
  const [isMobile, setIsMobile] = useState(false) // Track if screen is mobile (< 1024px)
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const { setNavbarVisible } = useNavbar()
  const hasPreloadedRef = useRef(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentCanvasFrameRef = useRef({ scene: 0, frame: 1 }) // Track what's on canvas
  const rafRef = useRef<number | null>(null)
  // Track card visibility states to prevent unnecessary animations
  const cardVisibilityState = useRef<{ [key: string]: boolean }>({})
  // Track active GSAP animations to prevent overlaps
  const activeAnimations = useRef<{ [key: string]: gsap.core.Tween | null }>({})
  // Throttle state updates during scroll
  const scrollUpdateTimeoutRef = useRef<number | null>(null)
  const pendingFrameUpdate = useRef<{ frame: number; scene: number } | null>(null)

  // Mobile detection effect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    // Check on mount
    checkMobile()
    
    // Check on resize
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Memoized helper function to check if a card should be visible based on current frame
  const shouldCardBeVisible = useCallback((sceneIndex: number, currentScene: number, currentFrame: number): boolean => {
    // Scene 1 cards: Show when viewing scene-2 folder frames 1-26
    if (sceneIndex === 0) {
      return currentScene === 1 && currentFrame >= 1 && currentFrame <= 26
    }
    
    // Scene 2 cards: Show when viewing scene-3 folder frames 1-52
    if (sceneIndex === 1) {
      return currentScene === 2 && currentFrame >= 1 && currentFrame <= 52
    }
    
    // Scene 3 cards: Show when viewing scene-3 folder frames 60-end OR scene-4 folder frames 1-19
    if (sceneIndex === 2) {
      const scene3FrameCount = SCENE_FRAME_COUNTS[2]
      return (currentScene === 2 && currentFrame >= 60 && currentFrame <= scene3FrameCount) ||
             (currentScene === 3 && currentFrame >= 1 && currentFrame <= 19)
    }
    
    // Scene 4 cards: Show when viewing scene-4 folder frames 81-end OR scene-5 folder frames 1-31
    if (sceneIndex === 3) {
      const scene4FrameCount = SCENE_FRAME_COUNTS[3]
      return (currentScene === 3 && currentFrame >= 81 && currentFrame <= scene4FrameCount) ||
             (currentScene === 4 && currentFrame >= 1 && currentFrame <= 31)
    }
    
    // Scene 5 cards: Show when viewing scene-5 folder frames 40-187
    if (sceneIndex === 4) {
      return currentScene === 4 && currentFrame >= 40 && currentFrame <= 187
    }
    
    // Scene 6 cards: Show when viewing scene-6 folder frames 31-end OR scene-7 folder frames 1-2
    if (sceneIndex === 5) {
      const scene6FrameCount = SCENE_FRAME_COUNTS[5]
      return (currentScene === 5 && currentFrame >= 31 && currentFrame <= scene6FrameCount) ||
             (currentScene === 6 && currentFrame >= 1 && currentFrame <= 2)
    }
    
    // Scene 7 cards: Show when viewing scene-7 folder frames 29-88 (or end)
    if (sceneIndex === 6) {
      const scene7FrameCount = SCENE_FRAME_COUNTS[6]
      return currentScene === 6 && currentFrame >= 29 && currentFrame <= scene7FrameCount
    }
    
    return false
  }, [])

  // Memoized helper function to get the active scene index based on which cards are currently visible
  const getActiveSceneIndexFromCards = useCallback((currentScene: number, currentFrame: number): number | null => {
    // Check each scene in order to find which one should be active
    for (let sceneIndex = 0; sceneIndex < sceneConfig.length; sceneIndex++) {
      if (shouldCardBeVisible(sceneIndex, currentScene, currentFrame)) {
        return sceneIndex
      }
    }
    return null
  }, [shouldCardBeVisible])

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
      // Mobile-specific positioning (letterbox layout)
      if (isMobile) {
        // Scene 1 mobile positioning
        if (sceneIndex === 0) {
          if (cardData.position === 'right') return 'left-6 top-[20%]'
          if (cardData.position === 'left') return 'left-6 top-[5%]'
          // Health gauge positioned extending to the right edge - aligned with Voltage top and extends to Internal Resistance bottom
          if (cardData.position === 'bottom-left' && cardData.cardType === 'health-gauge') return '-right-12 top-[10%]'
          // Sulphation positioned in bottom right area
          if (cardData.position === 'bottom-right' && cardData.cardType === 'sulphation') return '-right-4 top-[75%]'
        }
        // Scene 2 mobile positioning
        else if (sceneIndex === 1) {
          if (cardData.position === 'right') return 'left-6 top-[20%]'
          if (cardData.position === 'left') return 'left-6 top-[5%]'
          // Sulphation detected positioned extending to the right edge - same top position as health gauge in Scene 1
          if (cardData.position === 'bottom-left' && cardData.cardType === 'sulphation-detected') return '-right-44 top-[10%]'
          if (cardData.position === 'bottom-right' && cardData.cardType === 'decision') return '-right-20 top-[77%]'
        }
        // Scene 3 mobile positioning - organized structure
        else if (sceneIndex === 2) {
          // Top section - barcode and system-record
          if (cardData.cardType === 'barcode') return 'left-28 top-[5%]' // Top left, moved a little more right
          if (cardData.cardType === 'system-record') return 'left-28 top-[18%]' // Below barcode, moved a little more right
          // Bottom section - seal and route
          if (cardData.cardType === 'seal') return 'left-28 top-[70%]' // Bottom left, moved up and a little more right
          if (cardData.cardType === 'route') return 'left-28 top-[83%]' // Bottom left, below seal, moved up and a little more right
          if (cardData.cardType === 'logged') return '-right-4 top-[32%]' // Bottom right, moved up slightly
        }
        else if (sceneIndex === 3) {
          if (cardData.cardType === 'voltage') return 'left-6 top-[5%]' // Top left
          if (cardData.cardType === 'internal-resistance') return 'left-6 top-[18%]' // Below voltage
          // Sulphation positioned extending to the right edge - matching Scene 2 sulphation-detected
          if (cardData.cardType === 'sulphation') return '-right-8 top-[8%]' // Right side, moved up
          // Record-lock positioned matching Scene 2 decision card
          if (cardData.cardType === 'record-lock') return '-right-16 top-[77%]' // Bottom right, moved more right
        }
        // Scene 5 mobile positioning (similar to Scene 4)
        else if (sceneIndex === 4) {
          if (cardData.cardType === 'voltage-trend') return 'left-6 top-[5%]' // Top left
          if (cardData.cardType === 'internal-resistance') return 'left-6 top-[18%]' // Below voltage trend
          if (cardData.cardType === 'electrochemical-correction') return '-right-8 top-[8%]' // Right side, moved more left
          if (cardData.cardType === 'plate-condition') return 'left-20 top-[77%]' // Bottom, moved more left
          if (cardData.cardType === 'controlled') return '-right-6 top-[90%]' // Bottom right badge, moved down more, slightly right
        }
        // Scene 6 mobile positioning (similar to previous scenes)
        else if (sceneIndex === 5) {
          if (cardData.cardType === 'health-gauge') return 'left-6 top-[5%]' // Top left
          if (cardData.cardType === 'warranty') return 'left-6 top-[18%]' // Below health gauge
          if (cardData.cardType === 'performance-restored') return '-right-4 top-[8%]' // Right side, moved more left
          if (cardData.cardType === 'record-lock') return 'left-20 top-[75%]' // Bottom, moved more right
          if (cardData.cardType === 'certified') return '-right-4 top-[95%]' // Bottom right badge, moved down even more
        }
        // Scene 7 mobile positioning (similar to previous scenes)
        else if (sceneIndex === 6) {
          if (cardData.cardType === 'recovery-certified') return 'left-20 top-[5%]' // Left side (record lock style) - moved slightly right
          if (cardData.cardType === 'lead') return 'left-16 top-[24%]' // Just below record lock, moved slightly more right
          if (cardData.cardType === 'polymer') return 'right-0 top-[24%]' // Right side, moved a little more left
          if (cardData.cardType === 'compliance-record') return 'left-20 top-[77%]' // Bottom, moved down slightly
          if (cardData.cardType === 'verified') return '-right-4 top-[92%]' // Bottom right badge, moved down a little more
        }
      }
      
      // Desktop/laptop positioning (unchanged)
      // Scene-specific positioning
      if (sceneIndex === 0) {
        // Scene 1 positions - Desktop/Laptop alignment fixes
        if (cardData.position === 'right') return 'right-10 sm:right-14 md:right-auto md:left-[19em] top-20 sm:top-24 md:top-28 lg:top-12 lg:left-[19em] xl:top-12 xl:left-[19.5em] 2xl:top-12 2xl:left-[20em]'
        if (cardData.position === 'left') return 'left-8 sm:left-10 md:left-12 top-20 sm:top-24 md:top-28 lg:top-12 lg:left-12 xl:top-12 xl:left-14 2xl:top-12 2xl:left-16'
        // HEALTH % card: same as bottom-left but moved down on laptop only
        if (cardData.position === 'bottom-left' && cardData.cardType === 'health-gauge') return 'left-12 sm:left-14 md:left-[4rem] top-[38%] sm:top-[40%] md:top-[44%] lg:top-[22rem] lg:left-[4.5rem] xl:top-[23rem] xl:left-[5rem] 2xl:top-[24rem] 2xl:left-[5.5rem]'
        if (cardData.position === 'bottom-left') return 'left-12 sm:left-14 md:left-[4rem] top-[38%] sm:top-[40%] md:top-[44%] lg:top-[22rem] lg:left-[4.5rem] xl:top-[22rem] xl:left-[5rem] 2xl:top-[22rem] 2xl:left-[5.5rem]'
        // SULPHATION card (scene 1): same as bottom-right but moved up on laptop only
        if (cardData.position === 'bottom-right' && cardData.cardType === 'sulphation') return 'left-12 sm:left-14 md:left-[4rem] top-[68%] sm:top-[70%] md:top-[74%] lg:top-[41rem] lg:left-[4.5rem] xl:top-[27.5rem] xl:left-[5rem] 2xl:top-[42rem] 2xl:left-[5.5rem]'
        if (cardData.position === 'bottom-right') return 'left-12 sm:left-14 md:left-[4rem] top-[68%] sm:top-[70%] md:top-[74%] lg:top-[41rem] lg:left-[4.5rem] xl:top-[27rem] xl:left-[5rem] 2xl:top-[41rem] 2xl:left-[5.5rem]'
      } else if (sceneIndex === 1) {
        // Scene 2 positions - Desktop/Laptop alignment fixes
        if (cardData.position === 'right') return 'right-10 sm:right-14 md:right-auto md:left-[19em] top-20 sm:top-24 md:top-28 lg:top-12 lg:left-[19em] xl:top-12 xl:left-[19.5em] 2xl:top-12 2xl:left-[20em]'
        if (cardData.position === 'left') return 'left-8 sm:left-10 md:left-12 top-20 sm:top-24 md:top-28 lg:top-12 lg:left-12 xl:top-12 xl:left-14 2xl:top-12 2xl:left-16'
        if (cardData.position === 'bottom-left') return 'left-12 sm:left-14 md:left-28 lg:left-[4.5rem] xl:left-[5rem] 2xl:left-[5.5rem] top-[34%] sm:top-[36%] md:top-[40%] lg:top-[23rem] xl:top-[23rem] 2xl:top-[23rem]'
        if (cardData.position === 'bottom-right') return 'left-12 sm:left-14 md:left-28 lg:left-[4.5rem] xl:left-[5rem] 2xl:left-[5.5rem] top-[65%] sm:top-[67%] md:top-[71%] lg:top-[41rem] xl:top-[41rem] 2xl:top-[41rem]'
      } else if (sceneIndex === 2) {
        // Scene 3 positions - Desktop/Laptop alignment fixes
        if (cardData.position === 'right') {
          if (cardData.cardType === 'logged') return 'right-10 sm:right-12 md:right-16 bottom-16 md:bottom-20 lg:bottom-20 xl:bottom-20 2xl:bottom-20'
          return 'left-12 sm:left-14 md:left-20 top-[67%] sm:top-[69%] md:top-[73%] lg:top-[43rem] lg:left-[4.5rem] xl:top-[43rem] xl:left-[5rem] 2xl:top-[43rem] 2xl:left-[5.5rem]'
        }
        if (cardData.position === 'left') return 'left-12 sm:left-14 md:left-20 top-14 sm:top-16 md:top-20 lg:top-12 lg:left-[4.5rem] xl:top-12 xl:left-[5rem] 2xl:top-12 2xl:left-[5.5rem]'
        if (cardData.position === 'bottom-left') return 'left-12 sm:left-14 md:left-20 top-[22%] sm:top-[24%] md:top-[28%] lg:top-[14rem] lg:left-[4.5rem] xl:top-[14rem] xl:left-[5rem] 2xl:top-[14rem] 2xl:left-[5.5rem]'
        if (cardData.position === 'bottom-right') return 'left-12 sm:left-14 md:left-20 top-[41%] sm:top-[42%] md:top-[46%] lg:top-[27rem] lg:left-[4.5rem] xl:top-[27rem] xl:left-[5rem] 2xl:top-[27rem] 2xl:left-[5.5rem]'
      } else if (sceneIndex === 3) {
        // Scene 4 positions - Desktop/Laptop alignment fixes
        if (cardData.position === 'right') return 'right-10 sm:right-14 md:right-auto md:left-[19em] top-20 sm:top-24 md:top-28 lg:top-12 lg:left-[19em] xl:top-12 xl:left-[19.5em] 2xl:top-12 2xl:left-[20em]'
        if (cardData.position === 'left') return 'left-8 sm:left-10 md:left-12 top-20 sm:top-24 md:top-28 lg:top-12 lg:left-12 xl:top-12 xl:left-14 2xl:top-12 2xl:left-16'
        if (cardData.position === 'bottom-left') return 'left-12 sm:left-14 md:left-16 top-[34%] sm:top-[36%] md:top-[40%] lg:top-[22rem] lg:left-[4.5rem] xl:top-[22rem] xl:left-[5rem] 2xl:top-[22rem] 2xl:left-[5.5rem]'
        if (cardData.position === 'bottom-right') return 'left-12 sm:left-14 md:left-16 top-[64%] sm:top-[66%] md:top-[70%] lg:top-[40rem] lg:left-[4.5rem] xl:top-[40rem] xl:left-[5rem] 2xl:top-[40rem] 2xl:left-[5.5rem]'
      } else if (sceneIndex === 4) {
        // Scene 5 positions - Desktop/Laptop alignment fixes
        if (cardData.position === 'right') {
          if (cardData.cardType === 'controlled') return 'right-10 sm:right-12 md:right-16 bottom-16 md:bottom-20 lg:bottom-20 xl:bottom-20 2xl:bottom-20'
          return 'right-10 sm:right-14 md:right-auto md:left-[19em] top-20 sm:top-24 md:top-28 lg:top-12 lg:left-[19em] xl:top-12 xl:left-[19.5em] 2xl:top-12 2xl:left-[20em]'
        }
        if (cardData.position === 'left') return 'left-8 sm:left-10 md:left-12 top-20 sm:top-24 md:top-28 lg:top-12 lg:left-12 xl:top-12 xl:left-14 2xl:top-12 2xl:left-16'
        if (cardData.position === 'bottom-left') return 'left-12 sm:left-14 md:left-16 top-[38%] sm:top-[40%] md:top-[44%] lg:top-[22rem] lg:left-[4.5rem] xl:top-[22rem] xl:left-[5rem] 2xl:top-[22rem] 2xl:left-[5.5rem]'
        if (cardData.position === 'bottom-right') return 'left-12 sm:left-14 md:left-16 top-[68%] sm:top-[70%] md:top-[74%] lg:top-[41.5rem] lg:left-[4.5rem] xl:top-[41.5rem] xl:left-[5rem] 2xl:top-[41.5rem] 2xl:left-[5.5rem]'
      } else if (sceneIndex === 5) {
        // Scene 6 positions - Desktop/Laptop alignment fixes
        if (cardData.position === 'top') return 'left-12 sm:left-14 md:left-20 top-20 sm:top-22 md:top-26 lg:top-16 lg:left-[4.5rem] xl:top-16 xl:left-[5rem] 2xl:top-16 2xl:left-[5.5rem]'
        if (cardData.position === 'left') {
          if (cardData.cardType === 'health-gauge') return 'left-10 sm:left-12 md:left-16 top-[35%] sm:top-[37%] md:top-[41%] lg:top-[22rem] lg:left-[3rem] xl:top-[22rem] xl:left-[3.5rem] 2xl:top-[22rem] 2xl:left-[4rem]'
          return 'left-10 sm:left-12 md:left-16 top-[35%] sm:top-[37%] md:top-[41%] lg:top-[22rem] lg:left-[4.5rem] xl:top-[22rem] xl:left-[5rem] 2xl:top-[22rem] 2xl:left-[5.5rem]'
        }
        if (cardData.position === 'right') {
          if (cardData.cardType === 'certified') return 'right-10 sm:right-12 md:right-16 bottom-16 md:bottom-20 lg:bottom-20 xl:bottom-20 2xl:bottom-20'
          if (cardData.cardType === 'warranty') return 'right-12 sm:right-14 md:right-auto md:left-[20rem] top-[35%] sm:top-[37%] md:top-[41%] lg:top-[22rem] lg:left-[19.5em] xl:top-[22rem] xl:left-[20em] 2xl:top-[22rem] 2xl:left-[20.5em]'
          return 'right-12 sm:right-14 md:right-auto md:left-[20rem] top-[35%] sm:top-[37%] md:top-[41%] lg:top-[22rem] lg:left-[19em] xl:top-[22rem] xl:left-[19.5em] 2xl:top-[22rem] 2xl:left-[20em]'
        }
        if (cardData.position === 'bottom') return 'left-12 sm:left-14 md:left-20 top-[60%] sm:top-[62%] md:top-[66%] lg:top-[41em] lg:left-[4.5rem] xl:top-[41em] xl:left-[5rem] 2xl:top-[41em] 2xl:left-[5.5rem]'
      } else if (sceneIndex === 6) {
        // Scene 7 positions - Desktop/Laptop alignment fixes
        if (cardData.position === 'left') return 'left-8 sm:left-10 md:left-12 top-16 sm:top-18 md:top-22 lg:top-16 lg:left-[3rem] xl:top-16 xl:left-[3.5rem] 2xl:top-16 2xl:left-[4rem]'
        if (cardData.position === 'right') {
          if (cardData.cardType === 'verified') return 'right-10 sm:right-12 md:right-16 bottom-16 md:bottom-20 lg:bottom-20 xl:bottom-20 2xl:bottom-20'
          return 'right-10 sm:right-14 md:right-auto md:left-[19em] top-16 sm:top-18 md:top-22 lg:top-16 lg:left-[19.5em] xl:top-16 xl:left-[20em] 2xl:top-16 2xl:left-[20.5em]'
        }
        if (cardData.position === 'bottom-left') return 'left-12 sm:left-14 md:left-16 top-[35%] sm:top-[37%] md:top-[41%] lg:top-[24rem] lg:left-[4.5rem] xl:top-[24rem] xl:left-[5rem] 2xl:top-[24rem] 2xl:left-[5.5rem]'
        if (cardData.position === 'bottom-right') return 'left-12 sm:left-14 md:left-16 top-[60%] sm:top-[62%] md:top-[66%] lg:top-[40rem] lg:left-[4.5rem] xl:top-[40rem] xl:left-[5rem] 2xl:top-[40rem] 2xl:left-[5.5rem]'
      }
      // Default positions
      if (cardData.position === 'right') return 'right-16 md:right-auto md:left-[16rem] top-24 md:top-28 lg:top-20'
      if (cardData.position === 'left') return 'left-6 md:left-8 top-24 md:top-28 lg:top-20'
      if (cardData.position === 'bottom-left') return 'left-4 md:left-8 top-[20rem] md:top-[22rem] lg:top-[20rem]'
      if (cardData.position === 'bottom-right') return 'left-4 md:left-[16rem] top-[22rem] md:top-[24rem] lg:top-[22rem]'
      
      return 'left-4 md:left-8 top-1/2 md:top-[52%] lg:top-1/2 -translate-y-1/2'
    }

    const cardKey = `scene-${sceneIndex}-card-${cardIndex}`

    // Mobile scaling helper - returns scale class based on scene and card type
    const getMobileScale = () => {
      if (!isMobile) return ''
      
      // Scene 1 scaling
      if (sceneIndex === 0) {
        const isVoltageOrResistance = cardType === 'voltage' || cardType === 'internal-resistance'
        const isHealthGauge = cardType === 'health-gauge'
        const isSulphation = cardType === 'sulphation'
        const scale = isVoltageOrResistance ? 'scale-[0.60]' : isHealthGauge ? 'scale-[0.70]' : isSulphation ? 'scale-[0.80]' : 'scale-[0.70]'
        return `${scale} origin-top-left`
      }
      
      // Scene 2 scaling
      if (sceneIndex === 1) {
        const isVoltageOrResistance = cardType === 'voltage' || cardType === 'internal-resistance'
        const isSulphationDetected = cardType === 'sulphation-detected'
        const isDecision = cardType === 'decision'
        const scale = isVoltageOrResistance ? 'scale-[0.60]' : isSulphationDetected ? 'scale-[0.75]' : isDecision ? 'scale-[0.70]' : 'scale-[0.70]'
        return `${scale} origin-top-left`
      }
      
      // Scene 3 scaling
      if (sceneIndex === 2) {
        return 'scale-[0.70] origin-top-left'
      }
      
      // Scene 4 scaling (similar to Scene 1)
      if (sceneIndex === 3) {
        const isVoltageOrResistance = cardType === 'voltage' || cardType === 'internal-resistance'
        const isSulphation = cardType === 'sulphation'
        const isRecordLock = cardType === 'record-lock'
        const scale = isVoltageOrResistance ? 'scale-[0.60]' : isSulphation ? 'scale-[0.80]' : isRecordLock ? 'scale-[0.70]' : 'scale-[0.70]'
        return `${scale} origin-top-left`
      }
      
      // Scene 5 scaling (similar to Scene 4)
      if (sceneIndex === 4) {
        const isVoltageTrendOrResistance = cardType === 'voltage-trend' || cardType === 'internal-resistance'
        const isElectrochemical = cardType === 'electrochemical-correction'
        const isPlateCondition = cardType === 'plate-condition'
        const isControlled = cardType === 'controlled'
        const scale = isVoltageTrendOrResistance ? 'scale-[0.60]' : isElectrochemical ? 'scale-[0.80]' : isPlateCondition ? 'scale-[0.70]' : isControlled ? 'scale-[0.70]' : 'scale-[0.70]'
        return `${scale} origin-top-left`
      }
      
      // Scene 6 scaling (similar to previous scenes)
      if (sceneIndex === 5) {
        const isHealthGauge = cardType === 'health-gauge'
        const isWarranty = cardType === 'warranty'
        const isPerformanceRestored = cardType === 'performance-restored'
        const isRecordLock = cardType === 'record-lock'
        const isCertified = cardType === 'certified'
        const scale = isHealthGauge ? 'scale-[0.60]' : isWarranty ? 'scale-[0.60]' : isPerformanceRestored ? 'scale-[0.80]' : isRecordLock ? 'scale-[0.70]' : isCertified ? 'scale-[0.70]' : 'scale-[0.70]'
        return `${scale} origin-top-left`
      }
      
      // Scene 7 scaling (similar to previous scenes)
      if (sceneIndex === 6) {
        const isLead = cardType === 'lead'
        const isPolymer = cardType === 'polymer'
        const isRecoveryCertified = cardType === 'recovery-certified'
        const isComplianceRecord = cardType === 'compliance-record'
        const isVerified = cardType === 'verified'
        const scale = isLead ? 'scale-[0.60]' : isPolymer ? 'scale-[0.60]' : isRecoveryCertified ? 'scale-[0.80]' : isComplianceRecord ? 'scale-[0.70]' : isVerified ? 'scale-[0.70]' : 'scale-[0.70]'
        return `${scale} origin-top-left`
      }
      
      return 'scale-[0.70] origin-top-left'
    }

    switch (cardType) {
      case 'voltage':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10 max-lg:scale-[0.55] sm:max-lg:scale-[0.65]`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={getMobileScale()}>
              <VoltageCard value={cardData.value} status={cardData.status} />
            </div>
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
            <div className={getMobileScale()}>
              <InternalResistanceCard value={cardData.value} status={cardData.status} />
            </div>
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
            <div className={getMobileScale()}>
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
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={getMobileScale()}>
              <SulphationCard value={cardData.value} status={cardData.status} compactLaptop={sceneIndex === 0} />
            </div>
          </div>
        )
      case 'sulphation-detected':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10 ${sceneIndex === 1 ? 'w-full lg:w-[26.25rem] lg:h-[13rem] [&>*]:lg:w-full [&>*]:lg:max-w-full [&>*]:lg:h-full [&>*]:lg:min-h-0' : ''}`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={getMobileScale()}>
              <SulphationDetectedCard value={cardData.value} />
            </div>
          </div>
        )
      case 'decision':
        return (
          <div
            key={cardKey}
            ref={el => { cardRefs.current[cardKey] = el }}
            className={`absolute ${getCardPosition()} z-10 ${sceneIndex === 1 ? 'w-full lg:w-[26.25rem] lg:h-[13rem] [&>*]:lg:w-full [&>*]:lg:max-w-full [&>*]:lg:h-full [&>*]:lg:min-h-0' : ''}`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={getMobileScale()}>
              <DecisionCard value={cardData.value} status={cardData.status} />
            </div>
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
            <div className={getMobileScale()}>
              <BarcodeCard value={cardData.value} />
            </div>
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
            <div className={getMobileScale()}>
              <SystemRecordCard value={cardData.value} />
            </div>
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
            <div className={getMobileScale()}>
              <RouteCard />
            </div>
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
            <div className={getMobileScale()}>
              <SealCard value={cardData.value} />
            </div>
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
            <div className={getMobileScale()}>
              <RecordLockCard value={cardData.value} status={cardData.status} />
            </div>
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
            <div className={getMobileScale()}>
              <VoltageTrendCard value={cardData.value} status={cardData.status} />
            </div>
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
            <div className={getMobileScale()}>
              <ElectrochemicalCorrectionCard />
            </div>
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
            <div className={getMobileScale()}>
              <PlateConditionCard value={cardData.value} />
            </div>
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
            <div className={getMobileScale()}>
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
            className={`absolute ${getCardPosition()} z-10`}
            style={{ opacity: 0, transform: 'translateX(-400px) scale(1.2)' }}
          >
            <div className={getMobileScale()}>
              <WarrantyCard status={cardData.value} coverage={cardData.status} />
            </div>
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
            <div className={getMobileScale()}>
              <LeadCard value={cardData.value} status={cardData.status} />
            </div>
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
            <div className={getMobileScale()}>
              <PolymerCard value={cardData.value} status={cardData.status} />
            </div>
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
            <div className={getMobileScale()}>
              <ComplianceRecordCard value={cardData.value} />
            </div>
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
            <div className={getMobileScale()}>
              <RecoveryCertifiedCard />
            </div>
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
            <div className={getMobileScale()}>
              <LoggedCard />
            </div>
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
            <div className={getMobileScale()}>
              <ControlledCard />
            </div>
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
            <div className={getMobileScale()}>
              <CertifiedCard />
            </div>
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
            <div className={getMobileScale()}>
              <VerifiedCard />
            </div>
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
            
            // Calculate new frame and scene values
            const newFrame = clampedFrameIndex + 1
            const newScene = scene.sceneIndex

            // Store pending update
            pendingFrameUpdate.current = { frame: newFrame, scene: newScene }

            // Throttle state updates using RAF for smooth performance
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
      // Cancel pending scroll updates
      if (scrollUpdateTimeoutRef.current !== null) {
        cancelAnimationFrame(scrollUpdateTimeoutRef.current)
        scrollUpdateTimeoutRef.current = null
      }
      // Kill all active card animations
      Object.values(activeAnimations.current).forEach(anim => {
        if (anim) anim.kill()
      })
      activeAnimations.current = {}
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

  // Optimized card visibility based on frame ranges - prevents lag and overlap
  useEffect(() => {
    if (isPreloading) return

    // Determine which scene should be active based on frame-based card visibility
    const newActiveSceneIndex = getActiveSceneIndexFromCards(currentSceneForFrame, currentFrame)
    setActiveSceneIndex(newActiveSceneIndex)

    // Show UI when Scene 1 cards appear (scene-2 folder frames 1-26)
    // Once shown, it stays visible permanently
    if (!shouldShowUI && newActiveSceneIndex === 0) {
      setShouldShowUI(true)
    }

    // Batch all animations to prevent conflicts
    const animationsToRun: Array<{ card: HTMLElement; key: string; visible: boolean }> = []

    // Check visibility for each scene's cards and collect animations
    sceneConfig.forEach((scene, sceneIndex) => {
      const shouldBeVisible = shouldCardBeVisible(sceneIndex, currentSceneForFrame, currentFrame)
      
      scene.cards.forEach((_cardData: CardData, cardIndex: number) => {
        const cardKey = `scene-${sceneIndex}-card-${cardIndex}`
        const card = cardRefs.current[cardKey]
        
        if (card) {
          // Check if visibility state has changed - skip if already in correct state
          const currentVisibility = cardVisibilityState.current[cardKey] || false
          
          if (shouldBeVisible !== currentVisibility) {
            // Only animate if state actually changed
            animationsToRun.push({ card, key: cardKey, visible: shouldBeVisible })
            // Update state immediately to prevent duplicate animations
            cardVisibilityState.current[cardKey] = shouldBeVisible
          }
        }
      })
    })

    // Execute animations in batch using RAF for smooth performance
    if (animationsToRun.length > 0) {
      requestAnimationFrame(() => {
        animationsToRun.forEach(({ card, key, visible }) => {
          // Kill any existing animation for this card to prevent overlap
          if (activeAnimations.current[key]) {
            activeAnimations.current[key]?.kill()
            activeAnimations.current[key] = null
          }

          if (visible) {
            // Smooth fade in and slide in
            const tween = gsap.to(card, {
              x: 0,
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
              force3D: true,
              overwrite: true, // Force overwrite to prevent conflicts
              onComplete: () => {
                activeAnimations.current[key] = null
              }
            })
            activeAnimations.current[key] = tween
          } else {
            // Smooth fade out and slide out
            const tween = gsap.to(card, {
              x: -400,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
              force3D: true,
              overwrite: true, // Force overwrite to prevent conflicts
              onComplete: () => {
                activeAnimations.current[key] = null
              }
            })
            activeAnimations.current[key] = tween
          }
        })
      })
    }

    // Cleanup function to kill animations when effect re-runs or unmounts
    return () => {
      // Note: We don't kill animations here as they should complete naturally
      // Only kill if component unmounts (handled in main cleanup)
    }
  }, [currentFrame, currentSceneForFrame, isPreloading, shouldShowUI, isMobile, getActiveSceneIndexFromCards, shouldCardBeVisible])

  // Scene 1 mobile: Adjust Health Gauge Card height to span from Voltage to Internal Resistance
  useEffect(() => {
    if (!isMobile || activeSceneIndex !== 0) return

    // Helper function to find the actual card element inside the scaling wrapper
    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      // Look for div with backdrop-blur class
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    const healthGaugeKey = 'scene-0-card-2' // Health Gauge is the 3rd card (index 2) in Scene 1
    const healthGaugeElement = cardRefs.current[healthGaugeKey]
    
    if (healthGaugeElement) {
      const cardElement = findCardElement(healthGaugeElement)
      if (cardElement) {
        // Set height to match sulphation card default height (similar to Scene 2 sulphation-detected)
        cardElement.style.height = '12rem'
        cardElement.style.minHeight = '12rem'
        cardElement.style.maxHeight = '12rem'
      }
    }

    // Scene 1 mobile: Increase Sulphation Card width
    const sulphationKey = 'scene-0-card-3' // Sulphation is the 4th card (index 3) in Scene 1
    const sulphationElement = cardRefs.current[sulphationKey]
    
    if (sulphationElement) {
      const sulphationCardElement = findCardElement(sulphationElement)
      if (sulphationCardElement) {
        // Increase width from 18.75rem (300px) to 22rem (352px) for Scene 1 mobile
        sulphationCardElement.style.width = '22rem'
        sulphationCardElement.style.minWidth = '22rem'
      }
    }
  }, [isMobile, activeSceneIndex, currentFrame])

  // Scene 2 mobile: Reduce width of Sulphation Detected Card and adjust Decision Card
  useEffect(() => {
    if (!isMobile || activeSceneIndex !== 1) return

    // Helper function to find the actual card element inside the scaling wrapper
    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      // Look for div with backdrop-blur class
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    const sulphationDetectedKey = 'scene-1-card-2' // Sulphation Detected is the 3rd card (index 2) in Scene 2
    const sulphationDetectedElement = cardRefs.current[sulphationDetectedKey]
    
    if (sulphationDetectedElement) {
      const cardElement = findCardElement(sulphationDetectedElement)
      if (cardElement) {
        // Reduce width for mobile Scene 2
        cardElement.style.width = '18rem'
        cardElement.style.maxWidth = '18rem'
        cardElement.style.minWidth = '18rem'
      }
    }

    // Apply sulphation card dimensions from Scene 1 to Decision Card for mobile Scene 2
    const decisionKey = 'scene-1-card-3' // Decision is the 4th card (index 3) in Scene 2
    const decisionElement = cardRefs.current[decisionKey]
    
    if (decisionElement) {
      const cardElement = findCardElement(decisionElement)
      if (cardElement) {
        // Increased width and height for mobile Scene 2
        cardElement.style.width = '24rem'
        cardElement.style.maxWidth = '24rem'
        cardElement.style.minWidth = '24rem'
        cardElement.style.height = '14rem'
        cardElement.style.maxHeight = '14rem'
        cardElement.style.minHeight = '14rem'
        
        // Move the image and text down within the card
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
        
        // Also adjust text overlay position
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

  // Scene 4 mobile: Apply same sizing as Scene 2 (sulphation matches sulphation-detected, record-lock matches decision)
  useEffect(() => {
    if (!isMobile || activeSceneIndex !== 3) return

    // Helper function to find the actual card element inside the scaling wrapper
    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      // Look for div with backdrop-blur class
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    // Sulphation card - match Scene 2 sulphation-detected card width
    const sulphationKey = 'scene-3-card-2' // Sulphation is the 3rd card (index 2) in Scene 4
    const sulphationElement = cardRefs.current[sulphationKey]
    
    if (sulphationElement) {
      const cardElement = findCardElement(sulphationElement)
      if (cardElement) {
        // Match Scene 2 sulphation-detected card width
        cardElement.style.width = '18rem'
        cardElement.style.maxWidth = '18rem'
        cardElement.style.minWidth = '18rem'
      }
    }

    // Record-lock card - match Scene 2 decision card size
    const recordLockKey = 'scene-3-card-3' // Record-lock is the 4th card (index 3) in Scene 4
    const recordLockElement = cardRefs.current[recordLockKey]
    
    if (recordLockElement) {
      const cardElement = findCardElement(recordLockElement)
      if (cardElement) {
        // Match Scene 2 decision card dimensions
        cardElement.style.width = '24rem'
        cardElement.style.maxWidth = '24rem'
        cardElement.style.minWidth = '24rem'
        cardElement.style.height = '14rem'
        cardElement.style.maxHeight = '14rem'
        cardElement.style.minHeight = '14rem'
        
        // Move the image and text down within the card (same as decision card in Scene 2)
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
        
        // Also adjust text overlay position (same as decision card in Scene 2)
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

  // Scene 2 desktop/laptop: Match decision card size to sulphation-detected card
  useEffect(() => {
    if (isMobile || activeSceneIndex !== 1) return

    // Helper function to find the actual card element inside the scaling wrapper
    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      // Look for div with backdrop-blur class
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    const decisionKey = 'scene-1-card-3' // Decision is the 4th card (index 3) in Scene 2
    const decisionElement = cardRefs.current[decisionKey]
    
    if (decisionElement) {
      const cardElement = findCardElement(decisionElement)
      if (cardElement) {
        // Match sulphation-detected card dimensions: w-[26.25rem] h-[13rem]
        cardElement.style.width = '26.25rem'
        cardElement.style.height = '13rem'
        cardElement.style.maxWidth = '26.25rem'
        cardElement.style.minWidth = '26.25rem'
        cardElement.style.maxHeight = '13rem'
        cardElement.style.minHeight = '13rem'
      }
    }
  }, [isMobile, activeSceneIndex, currentFrame])

  // Scene 4 desktop/laptop: Match record-lock card size to sulphation card
  useEffect(() => {
    if (isMobile || activeSceneIndex !== 3) return

    // Helper function to find the actual card element inside the scaling wrapper
    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      // Look for div with backdrop-blur class
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    const recordLockKey = 'scene-3-card-3' // Record-lock is the 4th card (index 3) in Scene 4
    const recordLockElement = cardRefs.current[recordLockKey]
    
    if (recordLockElement) {
      const cardElement = findCardElement(recordLockElement)
      if (cardElement) {
        // Match sulphation card dimensions: w-[26.25rem] h-[13rem] (same as Scene 2)
        cardElement.style.width = '26.25rem'
        cardElement.style.height = '13rem'
        cardElement.style.maxWidth = '26.25rem'
        cardElement.style.minWidth = '26.25rem'
        cardElement.style.maxHeight = '13rem'
        cardElement.style.minHeight = '13rem'
      }
    }
  }, [isMobile, activeSceneIndex, currentFrame])

  // Scene 5 mobile: Reduce width of electrochemical-correction card
  useEffect(() => {
    if (!isMobile || activeSceneIndex !== 4) return

    // Helper function to find the actual card element inside the scaling wrapper
    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      // Look for div with backdrop-blur class
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    // Electrochemical-correction card - reduce width
    const electrochemicalKey = 'scene-4-card-2' // Electrochemical-correction is the 3rd card (index 2) in Scene 5
    const electrochemicalElement = cardRefs.current[electrochemicalKey]
    
    if (electrochemicalElement) {
      const cardElement = findCardElement(electrochemicalElement)
      if (cardElement) {
        // Reduce width for mobile Scene 5
        cardElement.style.width = '18rem'
        cardElement.style.maxWidth = '18rem'
        cardElement.style.minWidth = '18rem'
      }
    }

    // Plate-condition card - increase width and height
    const plateConditionKey = 'scene-4-card-3' // Plate-condition is the 4th card (index 3) in Scene 5
    const plateConditionElement = cardRefs.current[plateConditionKey]
    
    if (plateConditionElement) {
      const cardElement = findCardElement(plateConditionElement)
      if (cardElement) {
        // Increase width and height for mobile Scene 5
        cardElement.style.width = '25rem'
        cardElement.style.maxWidth = '25rem'
        cardElement.style.minWidth = '25rem'
        cardElement.style.height = '8rem'
        cardElement.style.maxHeight = '8rem'
        cardElement.style.minHeight = '8rem'
        
        // Ensure container doesn't overflow
        cardElement.style.overflow = 'hidden'
        
        // Make "PLATE RESTORED" text single line and align with image
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
        
        // Adjust the flex container to align items properly
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
        
        // Increase the image size while keeping it within container
        const imageElement = cardElement.querySelector('img[src="/cards/platecondition.png"]') as HTMLImageElement
        if (imageElement) {
          imageElement.style.width = '14rem'
          imageElement.style.height = '8.5rem'
          imageElement.style.maxWidth = '14rem'
          imageElement.style.maxHeight = '8.5rem'
          imageElement.style.objectFit = 'contain'
          imageElement.style.marginLeft = '3rem'
        }
        
        // Also adjust the parent container to move image to the right
        const imageContainer = imageElement?.parentElement as HTMLElement
        if (imageContainer) {
          imageContainer.style.marginLeft = 'auto'
          imageContainer.style.marginRight = '0'
        }
      }
    }
  }, [isMobile, activeSceneIndex, currentFrame])

  // Scene 6 mobile: Reduce width of performance-restored card
  useEffect(() => {
    if (!isMobile || activeSceneIndex !== 5) return

    // Helper function to find the actual card element inside the scaling wrapper
    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      // Look for div with backdrop-blur class
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    // Performance-restored card - reduce width (index 0, scene-5-card-0)
    const performanceRestoredKey = 'scene-5-card-0'
    const performanceRestoredElement = cardRefs.current[performanceRestoredKey]
    
    if (performanceRestoredElement) {
      const cardElement = findCardElement(performanceRestoredElement)
      if (cardElement) {
        // Reduce width for mobile Scene 6
        cardElement.style.width = '16rem'
        cardElement.style.maxWidth = '16rem'
        cardElement.style.minWidth = '16rem'
      }
    }
  }, [isMobile, activeSceneIndex, currentFrame])

  // Scene 6 mobile: Apply same sizing and positioning as Scene 4 for record-lock card
  useEffect(() => {
    if (!isMobile || activeSceneIndex !== 5) return

    // Helper function to find the actual card element inside the scaling wrapper
    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      // Look for div with backdrop-blur class
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    // Record-lock card - match Scene 4 record-lock card size
    const recordLockKey = 'scene-5-card-3' // Record-lock is the 4th card (index 3) in Scene 6
    const recordLockElement = cardRefs.current[recordLockKey]
    
    if (recordLockElement) {
      const cardElement = findCardElement(recordLockElement)
      if (cardElement) {
        // Match Scene 4 record-lock card dimensions
        cardElement.style.width = '24rem'
        cardElement.style.maxWidth = '24rem'
        cardElement.style.minWidth = '24rem'
        cardElement.style.height = '14rem'
        cardElement.style.maxHeight = '14rem'
        cardElement.style.minHeight = '14rem'
        
        // Move the image and text down within the card (same as Scene 4)
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
        
        // Also adjust text overlay position (same as Scene 4)
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

  // Scene 6 desktop/laptop: Match record-lock card size to Scene 4
  useEffect(() => {
    if (isMobile || activeSceneIndex !== 5) return

    // Helper function to find the actual card element inside the scaling wrapper
    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      // Look for div with backdrop-blur class
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    const recordLockKey = 'scene-5-card-3' // Record-lock is the 4th card (index 3) in Scene 6
    const recordLockElement = cardRefs.current[recordLockKey]
    
    if (recordLockElement) {
      const cardElement = findCardElement(recordLockElement)
      if (cardElement) {
        // Match Scene 4 record-lock card dimensions: w-[26.25rem] h-[13rem]
        cardElement.style.width = '26.25rem'
        cardElement.style.height = '13rem'
        cardElement.style.maxWidth = '26.25rem'
        cardElement.style.minWidth = '26.25rem'
        cardElement.style.maxHeight = '13rem'
        cardElement.style.minHeight = '13rem'
      }
    }
  }, [isMobile, activeSceneIndex, currentFrame])

  // Scene 7 mobile: Reduce size of recovery-certified and compliance-record cards
  useEffect(() => {
    if (!isMobile || activeSceneIndex !== 6) return

    // Helper function to find the actual card element inside the scaling wrapper
    const findCardElement = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null
      // Look for div with backdrop-blur class
      const card = Array.from(element.querySelectorAll('div')).find(
        div => div.className.includes('backdrop-blur')
      ) as HTMLElement
      return card || null
    }

    // Recovery-certified card - reduce size (index 3, scene-6-card-3)
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

    // Compliance-record card - increase size (index 2, scene-6-card-2)
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
            className={`absolute w-full bg-black ${
              isMobile ? 'h-[35vh] top-1/2 -translate-y-1/2' : 'inset-0 h-full'
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

          {/* Scene Progress Indicator - Separate Containers */}
          {shouldShowUI && activeSceneIndex !== null && (
            <>
              {/* Progress Boxes Container */}
              <div className={`absolute z-20 ${isMobile
                ? 'top-[calc(50%+17.5vh-2rem)] left-4'
                : 'top-4 lg:top-8 left-5 sm:left-4 lg:left-[32rem] xl:left-[38rem]'
                }`}>
                <div 
                  className="flex items-center gap-0.5 lg:gap-2 backdrop-blur-sm h-[1.875rem] lg:h-[4.688rem] rounded-md lg:rounded-2xl px-1.5 lg:px-5"
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
                        activeSceneIndex === index ? 'w-3 h-3 lg:w-7 lg:h-7' : 'w-2.5 h-2.5 lg:w-6 lg:h-6'
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
                <div className={`absolute z-20 ${isMobile
                  ? 'top-[calc(50%+17.5vh-2rem)] right-4 max-w-[calc(100%-8rem)]'
                  : 'top-4 lg:top-8 right-2 sm:right-4 lg:right-8 xl:right-16 max-w-[calc(100%-1rem)] sm:max-w-[calc(100%-2rem)] lg:max-w-[600px] xl:max-w-none'
                  }`}>
                  <div
                    className="flex flex-col items-center justify-center backdrop-blur-sm min-h-[1.875rem] sm:min-h-[2.188rem] lg:min-h-[4.688rem] rounded-lg lg:rounded-2xl px-3 sm:px-4 lg:px-6 xl:px-12 2xl:px-24 w-auto lg:w-[600px] xl:w-[46.88rem] py-1 sm:py-1.5 lg:py-3"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.10)',
                      background: 'rgba(0, 0, 0, 0.4)',
                      willChange: 'transform'
                    }}
                  >
                    <p className="text-[0.375rem] xs:text-[0.4375rem] sm:text-[0.5rem] lg:text-sm xl:!text-base 2xl:!text-lg font-['Arial',sans-serif] tracking-wide uppercase text-center px-1" style={{ color: '#9F9F9F', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      {sceneConfig[activeSceneIndex]?.headline}
                    </p>
                    <p className="text-[0.3125rem] xs:text-[0.375rem] sm:text-[0.4375rem] lg:text-xs xl:!text-sm 2xl:!text-base font-['Arial',sans-serif] tracking-normal normal-case text-center px-1 mt-0.5 sm:mt-1" style={{ color: '#9F9F9F', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
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
            <div className="absolute bottom-4 lg:bottom-8 left-[40%] lg:left-1/2 z-10 flex flex-col items-center gap-1 lg:gap-2 animate-bounce lg:-translate-x-1/2">
              <p className="text-white/60 text-xs lg:text-sm font-['Arial',sans-serif]">Scroll to explore</p>
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}