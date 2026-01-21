// import { useState, useEffect, useRef } from 'react'

// interface StageData {
//   voltage: {
//     status: string
//     image: string
//   }
//   status: {
//     status: string
//     image: string
//   }
//   temperature: {
//     status: string
//     image: string
//   }
//   health: {
//     status: string
//     image: string
//   }
//   cycles: {
//     status: string
//     image: string
//   }
//   internalResistance: {
//     status: string
//     image: string
//   }
//   batteryImage: string
//   systemStatus: string
// }

// const STAGE_IMAGES: StageData[] = [
//   // Stage 1
//   {
//     voltage: { status: 'Stable', image: '/lifecycle/voltage1.png' },
//     status: { status: 'Warning', image: '/lifecycle/status1.png' },
//     temperature: { status: 'Normal', image: '/lifecycle/temparature1.png' },
//     health: { status: 'Optimal', image: '/lifecycle/health1.png' },
//     cycles: { status: 'Low', image: '/lifecycle/cycle1.png' },
//     internalResistance: { status: 'Low', image: '/lifecycle/internalresource1.png' },
//     batteryImage: '/lifecycle/battery1.png',
//     systemStatus: 'Operating within optimal range.'
//   },
//   // Stage 2-8 (battery images are available, card images will use stage 1 as fallback)
//   ...Array.from({ length: 7 }, (_, i) => {
//     const stageNum = i + 2
//     // For card images, try stage-specific first, fallback to stage 1
//     // Battery images are available for all stages
//     return {
//       voltage: { 
//         status: 'Stable', 
//         image: `/lifecycle/voltage${stageNum}.png`
//       },
//       status: { 
//         status: 'Warning', 
//         image: `/lifecycle/status${stageNum}.png`
//       },
//       temperature: { 
//         status: 'Normal', 
//         image: `/lifecycle/temparature${stageNum}.png`
//       },
//       health: { 
//         status: 'Optimal', 
//         image: `/lifecycle/health${stageNum}.png`
//       },
//       cycles: { 
//         status: 'Low', 
//         image: `/lifecycle/cycle${stageNum}.png`
//       },
//       internalResistance: { 
//         status: 'Low', 
//         image: `/lifecycle/internalresource${stageNum}.png`
//       },
//       batteryImage: `/lifecycle/battery${stageNum}.png`,
//       systemStatus: 'Operating within optimal range.'
//     }
//   })
// ]

// const TOTAL_STAGES = 8
// const SCROLL_THRESHOLD = 150 // pixels to scroll before advancing stage

// export default function Lifecycle() {
//   const [currentStage, setCurrentStage] = useState(0)
//   const [scrollProgress, setScrollProgress] = useState(0)
//   const [isLocked, setIsLocked] = useState(true)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const scrollLockRef = useRef<number>(0)
//   const lastScrollY = useRef<number>(0)

//   useEffect(() => {
//     let ticking = false
//     let lockedScrollPosition = 0
//     let isInitialized = false

//     const updateScrollLock = () => {
//       if (!containerRef.current) return
//       const rect = containerRef.current.getBoundingClientRect()
//       lockedScrollPosition = window.scrollY + rect.top - window.innerHeight * 0.3
//       lastScrollY.current = window.scrollY
//       isInitialized = true
//     }

//     const handleWheel = (e: WheelEvent) => {
//       if (!containerRef.current || !isLocked) return

//       const rect = containerRef.current.getBoundingClientRect()
//       const isInView = rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1

//       if (!isInView) return

//       e.preventDefault()

//       if (ticking) return
//       ticking = true

//       requestAnimationFrame(() => {
//         const delta = e.deltaY

//         if (delta > 0 && currentStage < TOTAL_STAGES - 1) {
//           scrollLockRef.current += Math.abs(delta)

//           if (scrollLockRef.current >= SCROLL_THRESHOLD) {
//             const newStage = Math.min(currentStage + 1, TOTAL_STAGES - 1)
//             setCurrentStage(newStage)
//             scrollLockRef.current = 0
//             setScrollProgress(0)

//             if (newStage === TOTAL_STAGES - 1) {
//               setIsLocked(false)
//             } else {
//               updateScrollLock()
//             }
//           } else {
//             setScrollProgress((scrollLockRef.current / SCROLL_THRESHOLD) * 100)
//           }
//         } else if (delta < 0 && currentStage > 0) {
//           scrollLockRef.current -= Math.abs(delta)

//           if (scrollLockRef.current <= -SCROLL_THRESHOLD) {
//             const newStage = Math.max(currentStage - 1, 0)
//             setCurrentStage(newStage)
//             scrollLockRef.current = 0
//             setScrollProgress(0)
//             updateScrollLock()
//           } else {
//             setScrollProgress((Math.abs(scrollLockRef.current) / SCROLL_THRESHOLD) * 100)
//           }
//         }

//         ticking = false
//       })
//     }

//     const handleScroll = () => {
//       if (!containerRef.current || !isLocked) return

//       const rect = containerRef.current.getBoundingClientRect()
//       const isInView = rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1

//       if (!isInView) return

//       // Lock scroll position when in view
//       if (isInitialized && lockedScrollPosition) {
//         window.scrollTo({
//           top: lockedScrollPosition,
//           behavior: 'auto'
//         })
//       }
//     }

//     // Initialize on mount
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && !isInitialized) {
//             updateScrollLock()
//           }
//         })
//       },
//       { threshold: 0.3 }
//     )

//     if (containerRef.current) {
//       observer.observe(containerRef.current)
//     }

//     window.addEventListener('wheel', handleWheel, { passive: false })
//     window.addEventListener('scroll', handleScroll, { passive: true })

//     return () => {
//       observer.disconnect()
//       window.removeEventListener('wheel', handleWheel)
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, [currentStage, isLocked])

//   const currentData = STAGE_IMAGES[currentStage]

//   // Calculate 3D transform based on stage and progress
//   const get3DTransform = (stage: number, progress: number) => {
//     const stageOffset = stage - currentStage
//     const progressFactor = progress / 100

//     // Smooth interpolation for transitions
//     if (stageOffset === 0) {
//       // Current stage - slight forward movement during scroll
//       return {
//         rotateX: progressFactor * 1.5,
//         translateZ: progressFactor * 20,
//         scale: 1 + progressFactor * 0.02,
//         opacity: 1
//       }
//     } else if (stageOffset === 1) {
//       // Next stage - coming forward
//       return {
//         rotateX: (1 - progressFactor) * 8 + progressFactor * 1.5,
//         translateZ: (1 - progressFactor) * -80 + progressFactor * 20,
//         scale: (1 - progressFactor) * 0.85 + progressFactor * 1.02,
//         opacity: progressFactor
//       }
//     } else if (stageOffset === -1) {
//       // Previous stage - going back
//       return {
//         rotateX: progressFactor * -8 + (1 - progressFactor) * 1.5,
//         translateZ: progressFactor * -80 + (1 - progressFactor) * 20,
//         scale: progressFactor * 0.85 + (1 - progressFactor) * 1.02,
//         opacity: 1 - progressFactor
//       }
//     } else {
//       // Other stages - further away
//       const distance = Math.abs(stageOffset)
//       return {
//         rotateX: stageOffset * 8,
//         translateZ: -distance * 100,
//         scale: 1 - distance * 0.15,
//         opacity: Math.max(0, 1 - distance * 0.4)
//       }
//     }
//   }

//   return (
//     <section 
//       ref={containerRef}
//       className="relative bg-[#0d0d0d] min-h-screen flex items-center justify-center py-20 px-4"
//       style={{ perspective: '1000px' }}
//     >
//       {/* Progress Indicator */}
//       <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50">
//         <div className="flex items-center gap-2 text-white/60 text-sm">
//           <span className="text-orange-500 font-semibold">{currentStage + 1}</span>
//           <span>/</span>
//           <span>{TOTAL_STAGES}</span>
//         </div>
//         <div className="w-48 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
//           <div 
//             className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"
//             style={{ width: `${((currentStage + 1) / TOTAL_STAGES) * 100}%` }}
//           />
//         </div>
//       </div>

//       {/* Main Dashboard Container */}
//       <div 
//         className="relative w-full max-w-[1221px] h-[876px] transition-transform duration-700 ease-out"
//         style={{
//           transformStyle: 'preserve-3d',
//           transform: `translateZ(${get3DTransform(currentStage, scrollProgress).translateZ}px) rotateX(${get3DTransform(currentStage, scrollProgress).rotateX}deg) scale(${get3DTransform(currentStage, scrollProgress).scale})`,
//           opacity: get3DTransform(currentStage, scrollProgress).opacity
//         }}
//       >
//         {/* Background Frame */}
//         <div className="absolute inset-0 rounded-[47px] bg-gradient-to-br from-gray-800/20 to-gray-900/20" />
//         <div className="absolute inset-[7px] rounded-[44px] bg-[#0f0f0f]" />

//         {/* System State Bar */}
//         <div className="absolute top-[10.35%] left-[11.25%]">
//           <p className="text-[#71717b] text-xs tracking-[0.6px] font-['Arial',sans-serif]">
//             SYSTEM STATE
//           </p>
//         </div>

//         <div className="absolute top-[10.16%] right-[13.61%] flex items-center gap-3">
//           <div className="w-2 h-2 rounded-full bg-[rgba(0,188,125,0.6)]" />
//           <p className="text-white text-xs font-['Arial',sans-serif]">
//             {currentData.systemStatus}
//           </p>
//         </div>

//         {/* Central Battery Image */}
//         <div 
//           className="absolute left-1/2 top-[152px] -translate-x-1/2 w-[959px] h-[721px] transition-opacity duration-700"
//           style={{ opacity: get3DTransform(currentStage, scrollProgress).opacity }}
//         >
//           <img 
//             src={currentData.batteryImage} 
//             alt="Battery" 
//             className="w-full h-full object-cover object-center"
//             onError={(e) => {
//               // Fallback if image doesn't exist
//               e.currentTarget.style.display = 'none'
//             }}
//           />
//         </div>

//         {/* Metric Cards Grid */}
//         <div className="absolute inset-0">
//           {/* Left Column */}
//           <div className="absolute left-[162px] top-[170px] space-y-[16px]">
//             {/* VOLTAGE */}
//             <MetricCard
//               title="VOLTAGE"
//               status={currentData.voltage.status}
//               image={currentData.voltage.image}
//               transform={get3DTransform(currentStage, scrollProgress)}
//             />
            
//             {/* TEMPERATURE */}
//             <MetricCard
//               title="TEMPERATURE"
//               status={currentData.temperature.status}
//               image={currentData.temperature.image}
//               transform={get3DTransform(currentStage, scrollProgress)}
//             />
            
//             {/* CYCLES */}
//             <MetricCard
//               title="CYCLES"
//               status={currentData.cycles.status}
//               image={currentData.cycles.image}
//               transform={get3DTransform(currentStage, scrollProgress)}
//             />
//           </div>

//           {/* Right Column */}
//           <div className="absolute right-[162px] top-[170px] space-y-[16px]">
//             {/* STATUS */}
//             <MetricCard
//               title="STATUS"
//               status={currentData.status.status}
//               image={currentData.status.image}
//               transform={get3DTransform(currentStage, scrollProgress)}
//             />
            
//             {/* HEALTH */}
//             <MetricCard
//               title="HEALTH"
//               status={currentData.health.status}
//               image={currentData.health.image}
//               transform={get3DTransform(currentStage, scrollProgress)}
//             />
            
//             {/* INTERNAL RESISTANCE */}
//             <MetricCard
//               title="INTERNAL RESISTANCE"
//               status={currentData.internalResistance.status}
//               image={currentData.internalResistance.image}
//               transform={get3DTransform(currentStage, scrollProgress)}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// interface MetricCardProps {
//   title: string
//   status: string
//   image: string
//   transform: {
//     rotateX: number
//     translateZ: number
//     scale: number
//     opacity: number
//   }
// }

// function MetricCard({ title, status, image, transform }: MetricCardProps) {
//   return (
//     <div
//       className="relative w-[251px] h-[233px] rounded-[14px] border border-white/16 overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.3)] transition-all duration-700"
//       style={{
//         background: 'linear-gradient(137.13deg, rgba(39, 39, 42, 0.6) 0%, rgba(24, 24, 27, 0.8) 100%)',
//         transform: `translateZ(${transform.translateZ}px)`,
//         opacity: transform.opacity
//       }}
//     >
//       <div className="absolute inset-0 p-[1px]">
//         <div className="relative w-full h-full">
//           {/* Background Image */}
//           <div className="absolute inset-0">
//             <img 
//               src={image} 
//               alt={title}
//               className="w-full h-full object-cover object-center"
//               onError={(e) => {
//                 e.currentTarget.style.display = 'none'
//               }}
//             />
//           </div>

//           {/* Title */}
//           <div className="absolute top-5 left-5">
//             <p className="text-[#71717b] text-xs tracking-[0.3px] font-['Arial',sans-serif]">
//               {title}
//             </p>
//           </div>

//           {/* Status */}
//           <div className="absolute bottom-5 left-5">
//             <p className="text-[#52525c] text-xs tracking-[0.3px] uppercase font-['Arial',sans-serif]">
//               {status}
//             </p>
//           </div>

//           {/* Inner Shadow */}
//           <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.02)]" />
//         </div>
//       </div>
//     </div>
//   )
// }
