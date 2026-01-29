// import { useEffect, useRef, useState } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// interface DiagnosticCard {
//   id: number
//   title: string
//   value: string
//   status: string
// }

// const diagnosticCards: DiagnosticCard[] = [
//   {
//     id: 1,
//     title: 'VOLTAGE',
//     value: '12.4 V',
//     status: 'STABLE'
//   },
//   {
//     id: 2,
//     title: 'PLATE ANALYSIS',
//     value: 'OPTIMAL',
//     status: 'CLEAN'
//   },
//   {
//     id: 3,
//     title: 'LOGISTICS',
//     value: 'SNV-A12',
//     status: 'TRACKED'
//   },
//   {
//     id: 4,
//     title: 'RACK STATUS',
//     value: 'ACTIVE',
//     status: 'SECURED'
//   },
//   {
//     id: 5,
//     title: 'INTERNAL RESISTANCE',
//     value: '4.2 mΩ',
//     status: 'LOW'
//   },
//   {
//     id: 6,
//     title: 'CHARGING PHASE',
//     value: '99%',
//     status: 'RESTORED'
//   },
//   {
//     id: 7,
//     title: 'DIAGNOSTIC SUMMARY',
//     value: '100%',
//     status: 'OPTIMAL'
//   }
// ]

// // Scene timings in seconds
// const sceneTimings = [
//   { start: 0, pause: 4, cardIndex: 0 },      // Scene 1: 0-4s, Voltage Card
//   { start: 4, pause: 7, cardIndex: 1 },      // Scene 2: 4-7s, Internal Plate
//   { start: 7, pause: 25, cardIndex: 2 },     // Scene 3: 7-25s, Logistics
//   { start: 25, pause: 40, cardIndex: 3 },    // Scene 4: 25-40s, Charging Rack
//   { start: 40, pause: 42, cardIndex: 4 },    // Scene 5: 40-42s, Internal Resistance
//   { start: 42, pause: 55, cardIndex: 5 },    // Scene 6: 42-55s, Charging Phase (smooth play)
//   { start: 55, pause: 67, cardIndex: 6 }     // Scene 7: 55-67s (1:07), Final Dashboard
// ]

// export default function BatteryLifecycleScroll() {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
//   const cardRefs = useRef<(HTMLDivElement | null)[]>([])

//   useEffect(() => {
//     const video = videoRef.current
//     const container = containerRef.current

//     if (!video || !container) return

//     const videoDuration = 67 // Total duration: 1:07 (67 seconds)
    
//     // Create scroll sections for each scene
//     const scrollSections = sceneTimings.map((scene, index) => {
//       const isChargingPhase = index === 5 // Scene 6 (charging phase)
      
//       return {
//         ...scene,
//         // Longer scroll distance for charging phase to let it play smoothly
//         scrollMultiplier: isChargingPhase ? 3 : 1.5
//       }
//     })

//     // Calculate total scroll height
//     const totalScrollMultiplier = scrollSections.reduce((sum, s) => sum + s.scrollMultiplier, 0)
//     const scrollHeight = window.innerHeight * totalScrollMultiplier

//     // Set container height to enable scrolling
//     gsap.set(container, { height: scrollHeight })

//     // Main ScrollTrigger for video scrubbing
//     ScrollTrigger.create({
//       trigger: container,
//       start: 'top top',
//       end: 'bottom bottom',
//       pin: true,
//       pinSpacing: false,
//       scrub: 1,
//       onUpdate: (self) => {
//         const progress = Math.min(self.progress, 1) // Clamp progress to 1
//         let currentTime = 0
//         let accumulatedProgress = 0
//         let sceneFound = false

//         // Find which scene we're in based on scroll progress
//         for (let i = 0; i < scrollSections.length; i++) {
//           const scene = scrollSections[i]
//           const sceneProgressShare = scene.scrollMultiplier / totalScrollMultiplier
//           const sceneStart = accumulatedProgress
//           const sceneEnd = accumulatedProgress + sceneProgressShare

//           if (progress >= sceneStart && progress < sceneEnd) {
//             const sceneProgress = (progress - sceneStart) / sceneProgressShare
//             const sceneDuration = scene.pause - scene.start
//             currentTime = scene.start + (sceneProgress * sceneDuration)

//             // Show/hide cards based on scene
//             setActiveCardIndex(scene.cardIndex)

//             // Animate card in when entering scene
//             if (sceneProgress > 0.1 && sceneProgress < 0.9) {
//               const card = cardRefs.current[scene.cardIndex]
//               if (card) {
//                 gsap.to(card, {
//                   x: 0,
//                   opacity: 1,
//                   duration: 0.6,
//                   ease: 'power3.out'
//                 })
//               }
//             }

//             sceneFound = true
//             break
//           }

//           accumulatedProgress = sceneEnd
//         }

//         // If we're at the end (progress >= 0.98), lock to final frame
//         if (!sceneFound || progress >= 0.98) {
//           currentTime = videoDuration - 0.1
//           setActiveCardIndex(scrollSections.length - 1)
//           const lastCard = cardRefs.current[scrollSections.length - 1]
//           if (lastCard) {
//             gsap.to(lastCard, {
//               x: 0,
//               opacity: 1,
//               duration: 0.6,
//               ease: 'power3.out'
//             })
//           }
//         }

//         // Update video time and prevent seeking beyond duration
//         if (video && !isNaN(currentTime)) {
//           const clampedTime = Math.max(0, Math.min(currentTime, videoDuration - 0.1))
//           if (Math.abs(video.currentTime - clampedTime) > 0.01) {
//             video.currentTime = clampedTime
//           }
//         }
//       }
//     })

//     // Initial setup: hide all cards
//     cardRefs.current.forEach(card => {
//       if (card) {
//         gsap.set(card, { x: -400, opacity: 0 })
//       }
//     })

//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill())
//     }
//   }, [isLoading])

//   const handleVideoCanPlayThrough = () => {
//     setIsLoading(false)
//   }

//   return (
//     <div className="relative w-full bg-black">
//       {/* Loading Overlay */}
//       {isLoading && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
//           <div className="text-center">
//             <div className="w-16 h-16 border-4 border-[#ff6b1a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//             <p className="text-white text-lg font-['Arial',sans-serif]">Loading Battery Lifecycle...</p>
//           </div>
//         </div>
//       )}

//       {/* Scroll Container */}
//       <div ref={containerRef} className="relative w-full">
//         {/* Sticky Video Container */}
//         <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
//           <video
//             ref={videoRef}
//             className="absolute inset-0 w-full h-full object-cover"
//             muted
//             playsInline
//             preload="auto"
//             loop={false}
//             onCanPlayThrough={handleVideoCanPlayThrough}
//             onEnded={(e) => {
//               // Prevent video from resetting
//               e.currentTarget.currentTime = e.currentTarget.duration - 0.1
//             }}
//           >
//             <source src="/fullscene.webm" type="video/webm" />
//           </video>

//           {/* Scene Progress Indicator - Separate Containers */}
//           {!isLoading && (
//             <>
//               {/* Progress Boxes Container */}
//               <div className="absolute top-32 left-24 z-20">
//                 <div 
//                   className="flex items-center gap-2 backdrop-blur-md"
//                   style={{
//                     height: '75px',
//                     borderRadius: '16px',
//                     border: '1px solid rgba(255, 255, 255, 0.10)',
//                     background: 'rgba(20, 20, 20, 0.70)',
//                     padding: '0 20px'
//                   }}
//                 >
//                   {sceneTimings.map((_, index) => (
//                     <div
//                       key={index}
//                       className={`relative transition-all duration-300 ${
//                         activeCardIndex === index ? 'w-7 h-7' : 'w-6 h-6'
//                       }`}
//                     >
//                       {/* Box Background */}
//                       <div
//                         className={`w-full h-full rounded-lg transition-all duration-300 ${
//                           activeCardIndex === index
//                             ? 'bg-[#ff6b1a] shadow-[0_0_20px_rgba(255,107,26,0.8)]'
//                             : activeCardIndex !== null && index < activeCardIndex
//                             ? 'bg-[#ff6b1a]/40 border border-[#ff6b1a]/60'
//                             : 'bg-white/10 border border-white/20'
//                         }`}
//                       >
//                         {/* Inner glow for active box */}
//                         {activeCardIndex === index && (
//                           <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/30 to-transparent"></div>
//                         )}
//                       </div>

//                       {/* Active indicator pulse */}
//                       {activeCardIndex === index && (
//                         <div className="absolute inset-0 rounded-lg animate-pulse">
//                           <div className="w-full h-full rounded-lg border-2 border-[#ff6b1a]/50"></div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Scene Title Label - Separate Container */}
//               {activeCardIndex !== null && (
//                 <div className="absolute top-32 right-24 z-20">
//                   <div
//                     className="flex items-center backdrop-blur-md"
//                     style={{
//                       height: '75px',
//                       borderRadius: '16px',
//                       border: '1px solid rgba(255, 255, 255, 0.10)',
//                       background: 'rgba(20, 20, 20, 0.70)',
//                       padding: '0 32px'
//                     }}
//                   >
//                     <p className="text-white/90 text-base font-['Arial',sans-serif] tracking-wide uppercase whitespace-nowrap">
//                       Scene {activeCardIndex + 1} — {diagnosticCards[activeCardIndex]?.title}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}

//           {/* Diagnostic Cards Container */}
//           <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 max-w-md">
//             {diagnosticCards.map((card, index) => (
//               <div
//                 key={card.id}
//                 ref={el => { cardRefs.current[index] = el }}
//                 className={`absolute left-0 top-0 ${
//                   activeCardIndex === index ? 'pointer-events-auto' : 'pointer-events-none'
//                 }`}
//                 style={{ opacity: 0, transform: 'translateX(-400px)' }}
//               >
//                 {/* Glassmorphism Card - High Fidelity Production Style */}
//                 <div className="relative backdrop-blur-xl bg-black/40 border border-white/5 rounded-2xl p-8 min-w-[420px] overflow-hidden">
//                   {/* Bottom Accent Glow */}
//                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff6b1a]/50 to-transparent"></div>
                  
//                   {/* Card Content */}
//                   <div className="relative z-10 space-y-6">
//                     {/* Title */}
//                     <div className="border-b border-white/10 pb-3">
//                       <h3 className="text-white/90 font-['Arial',sans-serif] font-bold text-xl tracking-wide uppercase">
//                         {card.title}
//                       </h3>
//                     </div>

//                     {/* Value Display */}
//                     <div className="bg-black/60 rounded-xl p-6 border border-white/10">
//                       <div className="text-center">
//                         <div className="text-[#ff6b1a] font-bold text-5xl font-mono tracking-tight mb-2">
//                           {card.value}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Status Display */}
//                     <div className="flex items-center justify-between bg-white/5 rounded-lg p-4 border border-white/10">
//                       <span className="text-white/60 text-sm font-['Arial',sans-serif] uppercase tracking-wider">
//                         Status
//                       </span>
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 rounded-full bg-[#ff6b1a] animate-pulse"></div>
//                         <span className="text-white font-['Arial',sans-serif] font-semibold text-sm uppercase tracking-wide">
//                           {card.status}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Scene Progress */}
//                     <div className="flex items-center gap-3 pt-2">
//                       <div className="flex-1 h-0.5 bg-white/10 rounded-full overflow-hidden">
//                         <div 
//                           className="h-full bg-gradient-to-r from-[#ff6b1a] to-[#ff9b1a] rounded-full transition-all duration-500"
//                           style={{ width: `${((index + 1) / diagnosticCards.length) * 100}%` }}
//                         ></div>
//                       </div>
//                       <span className="text-white/40 text-xs font-['Arial',sans-serif] font-mono">
//                         {index + 1}/{diagnosticCards.length}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Subtle corner accent */}
//                   <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#ff6b1a]/10 to-transparent rounded-tr-2xl pointer-events-none"></div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Scroll Indicator (only visible when not loading) */}
//           {!isLoading && (
//             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
//               <p className="text-white/60 text-sm font-['Arial',sans-serif]">Scroll to explore</p>
//               <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//               </svg>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
