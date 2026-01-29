import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

// Scene configuration - each scene can have multiple cards
const sceneConfig = [
  { 
    id: 1,
    title: 'DIAGNOSTIC SCAN',
    cards: [
      { 
        cardType: 'voltage',
        value: '12.4 V',
        status: 'STABLE',
        position: 'left'
      },
      { 
        cardType: 'resistance',
        value: '4.2 mΩ',
        status: 'LOW',
        position: 'right'
      },
      {
        cardType: 'health',
        value: '99%',
        status: 'RESTORED',
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
  { 
    id: 2,
    title: 'PLATE ANALYSIS',
    cards: [
      { 
        cardType: 'voltage',
        value: '12.4 V',
        status: 'STABLE',
        position: 'left'
      },
      { 
        cardType: 'resistance',
        value: '7.8 mΩ',
        status: 'LOW',
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
  { 
    id: 3,
    title: 'LOGISTICS',
    cards: [
      {
        cardType: 'barcode',
        value: 'SNV-A1042',
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
        value: 'Pickup → Facility',
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
  { 
    id: 4,
    title: 'RACK STATUS',
    cards: [
      {
        cardType: 'voltage',
        value: '11.2 V',
        status: 'STABLE',
        position: 'left'
      },
      {
        cardType: 'resistance',
        value: '14.5 mΩ',
        status: 'HIGH',
        position: 'right'
      },
      {
        cardType: 'sulphation-detected',
        value: 'CONFIRMED',
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
  { 
    id: 5,
    title: 'INTERNAL RESISTANCE',
    cards: [
      {
        cardType: 'voltage-trend',
        value: '14.0 V',
        status: 'RISING',
        position: 'left'
      },
      {
        cardType: 'resistance',
        value: '7.8 mΩ',
        status: 'LOW',
        position: 'right'
      },
      {
        cardType: 'electrochemical',
        value: '',
        status: '',
        position: 'bottom-left'
      },
      {
        cardType: 'plate-condition',
        value: 'Plate\nRestored',
        status: '',
        position: 'bottom-right'
      }
    ]
  },
  { 
    id: 6,
    title: 'CHARGING PHASE',
    cards: [
      {
        cardType: 'performance-restored',
        value: '',
        status: '',
        position: 'top'
      },
      {
        cardType: 'health',
        value: '98%',
        status: '',
        position: 'left',
        video: '98.mp4',
        width: '200px'
      },
      {
        cardType: 'warranty',
        value: '',
        status: 'WARRANTY ACTIVE',
        position: 'right',
        coverage: 'EXTENDED COVERAGE ENABLED'
      },
      {
        cardType: 'record-lock',
        value: 'DIAGNOSTIC',
        status: 'RECORD LOCKED',
        position: 'bottom'
      }
    ]
  },
  { 
    id: 7,
    title: 'DIAGNOSTIC SUMMARY',
    cards: [
      {
        cardType: 'lead',
        value: '98%',
        status: '',
        position: 'left'
      },
      {
        cardType: 'polymer',
        value: '92% Recovered',
        status: '',
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
  { start: 0, pause: 4, cardIndex: 0 },      // Scene 1: 0-4s, Voltage Card
  { start: 4, pause: 7, cardIndex: 1 },      // Scene 2: 4-7s, Internal Plate
  { start: 7, pause: 25, cardIndex: 2 },     // Scene 3: 7-25s, Logistics
  { start: 25, pause: 40, cardIndex: 3 },    // Scene 4: 25-40s, Charging Rack
  { start: 40, pause: 42, cardIndex: 4 },    // Scene 5: 40-42s, Internal Resistance
  { start: 42, pause: 55, cardIndex: 5 },    // Scene 6: 42-55s, Charging Phase (smooth play)
  { start: 55, pause: 67, cardIndex: 6 }     // Scene 7: 55-67s (1:07), Final Dashboard
]

export default function BatteryLifecycleScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

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

    // Calculate total scroll height with extra padding at end to prevent jump
    const totalScrollMultiplier = scrollSections.reduce((sum, s) => sum + s.scrollMultiplier, 0)
    const scrollHeight = window.innerHeight * (totalScrollMultiplier + 4) // Add 4vh extra padding for smooth end

    // Set container height to enable scrolling
    gsap.set(container, { height: scrollHeight })

    // Main ScrollTrigger for video scrubbing
    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Clamp progress between 0 and 1, extending the final scene
        const rawProgress = self.progress
        const progress = Math.min(rawProgress, 1)
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
            ? (progress >= sceneStart && progress <= sceneEnd)
            : (progress >= sceneStart && progress < sceneEnd)

          if (isInScene) {
            const sceneProgress = (progress - sceneStart) / sceneProgressShare
            const sceneDuration = scene.pause - scene.start
            
            // Calculate current time - keep slightly before end to prevent video end event
            currentTime = scene.start + (sceneProgress * sceneDuration)
            
            // Clamp to prevent video from reaching absolute end (which causes reset/blink)
            currentTime = Math.min(currentTime, videoDuration - 0.001)

            // Show/hide cards based on scene
            setActiveCardIndex(scene.cardIndex)

            // Hide all cards first
            sceneConfig.forEach((scn, scnIdx) => {
              if (scnIdx !== scene.cardIndex && scn.cards) {
                scn.cards.forEach((_cardData, cardIdx) => {
                  const cardRefIndex = scnIdx * 10 + cardIdx
                  const card = cardRefs.current[cardRefIndex]
                  if (card) {
                    const cardSide = card.getAttribute('data-card-side')
                    if (cardSide === 'right') {
                      gsap.to(card, {
                        x: 400,
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power2.in'
                      })
                    } else if (cardSide === 'bottom') {
                      gsap.to(card, {
                        y: 200,
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power2.in'
                      })
                    } else {
                      gsap.to(card, {
                        x: -400,
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power2.in'
                      })
                    }
                  }
                })
              }
            })

            // Animate card in when entering scene
            if (sceneProgress > 0.1) {
              // Animate all cards for this scene
              const currentScene = sceneConfig[scene.cardIndex]
              if (currentScene && currentScene.cards) {
                currentScene.cards.forEach((_cardData, cardIdx) => {
                  const cardRefIndex = scene.cardIndex * 10 + cardIdx
                  const card = cardRefs.current[cardRefIndex]
                  if (card) {
                    const cardSide = card.getAttribute('data-card-side')
                    if (cardSide === 'bottom') {
                      gsap.to(card, {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power3.out'
                      })
                    } else {
                      gsap.to(card, {
                        x: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power3.out'
                      })
                    }
                  }
                })
              }
            }

            break
          }

          accumulatedProgress = sceneEnd
        }

        // Update video time and prevent seeking beyond duration
        if (video && !isNaN(currentTime)) {
          // Keep video just before end to prevent ended event/reset/blink
          const clampedTime = Math.max(0, Math.min(currentTime, videoDuration - 0.001))
          if (Math.abs(video.currentTime - clampedTime) > 0.01) {
            video.currentTime = clampedTime
          }
        }
      }
    })

    // Initial setup: hide all cards with correct direction
    cardRefs.current.forEach(card => {
      if (card) {
        const cardSide = card.getAttribute('data-card-side')
        if (cardSide === 'right') {
          gsap.set(card, { x: 400, opacity: 0 })
        } else if (cardSide === 'bottom') {
          gsap.set(card, { y: 200, opacity: 0 })
        } else {
          gsap.set(card, { x: -400, opacity: 0 })
        }
      }
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
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
            loop={false}
            onLoadedMetadata={handleVideoReady}
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
                        activeCardIndex === index ? 'w-7 h-7' : 'w-6 h-6'
                      }`}
                    >
                      {/* Box Background */}
                      <div
                        className={`w-full h-full rounded-lg transition-all duration-300 ${
                          activeCardIndex === index
                            ? 'bg-[#ff7700] shadow-[0_0_20px_rgba(255,119,0,0.9)]'
                            : activeCardIndex !== null && index < activeCardIndex
                            ? 'bg-[#ff7700]/40 border border-[#ff7700]/60'
                            : 'bg-white/10 border border-white/20'
                        }`}
                      >
                        {/* Inner glow for active box */}
                        {activeCardIndex === index && (
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/30 to-transparent"></div>
                        )}
                      </div>

                      {/* Active indicator pulse */}
                      {activeCardIndex === index && (
                        <div className="absolute inset-0 rounded-lg animate-pulse">
                          <div className="w-full h-full rounded-lg border-2 border-[#ff7700]/50"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Scene Title Label - Separate Container */}
              {activeCardIndex !== null && (
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
                      Scene {activeCardIndex + 1} — {sceneConfig[activeCardIndex]?.title}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Diagnostic Cards Container */}
          {sceneConfig.map((scene, sceneIndex) => {
            // Render all cards for this scene
            return scene.cards.map((cardData, cardIndex) => {
              const uniqueKey = `${scene.id}-${cardIndex}`
              const cardRefIndex = sceneIndex * 10 + cardIndex // Unique index for card refs

              // Define position based on card position property and scene
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
                
                // Default positions for other scenes
                if (cardData.position === 'right') return 'left-[16rem] top-32'
                if (cardData.position === 'left') return 'left-8 top-32'
                if (cardData.position === 'bottom-left') return 'left-8 top-[22rem]'
                if (cardData.position === 'bottom-right') return 'left-[16rem] top-[28rem]'
                if (cardData.position === 'center-bottom') return 'left-8 top-[22rem]'
                if (cardData.position === 'top') return 'left-8 top-32'
                
                return 'left-8 top-1/2 -translate-y-1/2'
              }

              const isRightSide = cardData.position === 'right' || cardData.position === 'bottom-right'
              const isBottomCard = cardData.position === 'bottom-left' || cardData.position === 'bottom-right' || cardData.position === 'center-bottom'
              const initialTransform = isRightSide ? 'translateX(400px)' : isBottomCard ? 'translateY(200px)' : 'translateX(-400px)'

              // Render appropriate card component based on cardType
              const renderCard = () => {
                switch (cardData.cardType) {
                  case 'voltage':
                    return <VoltageCard value={cardData.value} status={cardData.status} />
                  case 'voltage-trend':
                    return <VoltageTrendCard value={cardData.value} status={cardData.status} />
                  case 'resistance':
                    return <InternalResistanceCard value={cardData.value} status={cardData.status} />
                  case 'health':
                    return <HealthGaugeCard 
                      value={cardData.value} 
                      status={cardData.status} 
                      video={(cardData as any).video}
                      width={(cardData as any).width}
                    />
                  case 'sulphation':
                    return <SulphationCard value={cardData.value} status={cardData.status} />
                  case 'sulphation-detected':
                    return <SulphationDetectedCard value={cardData.value} />
                  case 'decision':
                    return <DecisionCard value={cardData.value} status={cardData.status} />
                  case 'barcode':
                    return <BarcodeCard value={cardData.value} />
                  case 'system-record':
                    return <SystemRecordCard value={cardData.value} />
                  case 'route':
                    return <RouteCard />
                  case 'seal':
                    return <SealCard value={cardData.value} />
                  case 'record-lock':
                    return <RecordLockCard value={cardData.value} status={cardData.status} />
                  case 'electrochemical':
                    return <ElectrochemicalCorrectionCard />
                  case 'plate-condition':
                    return <PlateConditionCard value={cardData.value} />
                  case 'performance-restored':
                    return <PerformanceRestoredCard 
                      voltageFrom="11.2" 
                      voltageTo="12.6 V" 
                      resistanceFrom="14.5" 
                      resistanceTo="4.8 mΩ" 
                    />
                  case 'warranty':
                    return <WarrantyCard 
                      status={(cardData as any).status || 'WARRANTY ACTIVE'} 
                      coverage={(cardData as any).coverage || 'EXTENDED COVERAGE ENABLED'} 
                    />
                  case 'lead':
                    return <LeadCard value={cardData.value} />
                  case 'polymer':
                    return <PolymerCard value={cardData.value} />
                  case 'compliance-record':
                    return <ComplianceRecordCard value={cardData.value} />
                  case 'recovery-certified':
                    return <RecoveryCertifiedCard value={cardData.value} />
                  default:
                    return null
                }
              }

              const card = renderCard()
              if (!card) return null

              return (
                <div
                  key={uniqueKey}
                  ref={el => { cardRefs.current[cardRefIndex] = el }}
                  className={`absolute z-10 ${getCardPosition()} ${
                    activeCardIndex === sceneIndex ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                  style={{ opacity: 0, transform: initialTransform }}
                  data-card-side={isRightSide ? 'right' : isBottomCard ? 'bottom' : 'left'}
                >
                  {card}
                </div>
              )
            })
          })}

          {/* Scroll Indicator (only visible when not loading) */}
          {!isLoading && (
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
