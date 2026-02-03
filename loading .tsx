// import { useEffect, useState } from 'react'

// export default function LoadingSpinner() {
//   const [progress, setProgress] = useState(0)
//   const [loadingText, setLoadingText] = useState('INITIALIZING')

//   useEffect(() => {
//     // Simulate progressive loading with realistic stages
//     const stages = [
//       { progress: 0, text: 'INITIALIZING', duration: 100 },
//       { progress: 15, text: 'LOADING ASSETS', duration: 200 },
//       { progress: 35, text: 'PROCESSING', duration: 300 },
//       { progress: 60, text: 'OPTIMIZING', duration: 300 },
//       { progress: 85, text: 'FINALIZING', duration: 250 },
//       { progress: 100, text: 'COMPLETE', duration: 150 },
//     ]

//     let currentStage = 0
//     let animationFrame: number

//     const animate = () => {
//       if (currentStage < stages.length) {
//         const stage = stages[currentStage]
//         const nextProgress = stage.progress
//         const step = (nextProgress - progress) / (stage.duration / 16) // 60fps

//         const updateProgress = () => {
//           setProgress((prev) => {
//             const next = prev + step
//             if (next >= nextProgress) {
//               currentStage++
//               setLoadingText(stage.text)
//               if (currentStage < stages.length) {
//                 setTimeout(animate, 50)
//               }
//               return nextProgress
//             }
//             animationFrame = requestAnimationFrame(updateProgress)
//             return next
//           })
//         }

//         updateProgress()
//       }
//     }

//     const timer = setTimeout(animate, 300)

//     return () => {
//       clearTimeout(timer)
//       if (animationFrame) cancelAnimationFrame(animationFrame)
//     }
//   }, [])

//   // Calculate circle progress
//   const circumference = 2 * Math.PI * 90 // radius = 90
//   const strokeDashoffset = circumference - (progress / 100) * circumference

//   return (
//     <div className="flex items-center justify-center w-full h-full bg-black">
//       <div className="relative flex flex-col items-center">
//         {/* Main circular progress */}
//         <div className="relative w-64 h-64">
//           {/* Background circle */}
//           <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
//             {/* Background track */}
//             <circle
//               cx="100"
//               cy="100"
//               r="90"
//               stroke="rgba(255, 107, 26, 0.1)"
//               strokeWidth="8"
//               fill="none"
//             />
            
//             {/* Progress circle */}
//             <circle
//               cx="100"
//               cy="100"
//               r="90"
//               stroke="url(#gradient)"
//               strokeWidth="8"
//               fill="none"
//               strokeLinecap="round"
//               strokeDasharray={circumference}
//               strokeDashoffset={strokeDashoffset}
//               className="transition-all duration-300 ease-out"
//               style={{
//                 filter: 'drop-shadow(0 0 12px rgba(255, 107, 26, 0.8))'
//               }}
//             />
            
//             {/* Gradient definition */}
//             <defs>
//               <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#ff6b1a" />
//                 <stop offset="50%" stopColor="#ff8c42" />
//                 <stop offset="100%" stopColor="#ffaa6b" />
//               </linearGradient>
//             </defs>
//           </svg>

//           {/* Center content */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             {/* Percentage */}
//             <div className="text-center mb-2">
//               <span className="text-6xl font-bold text-white font-['Arial',sans-serif] tracking-tight">
//                 {Math.floor(progress)}
//               </span>
//               <span className="text-3xl font-bold text-[#ff6b1a] ml-1">%</span>
//             </div>
            
//             {/* Battery icon animation */}
//             <div className="mt-2 relative">
//               <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="relative">
//                 {/* Battery outline */}
//                 <rect x="2" y="4" width="40" height="16" rx="2" 
//                       stroke="#ff6b1a" strokeWidth="2" fill="none"/>
//                 {/* Battery tip */}
//                 <rect x="42" y="8" width="4" height="8" rx="1" fill="#ff6b1a"/>
                
//                 {/* Battery fill - animated based on progress */}
//                 <rect 
//                   x="4" 
//                   y="6" 
//                   width={Math.max(0, (progress / 100) * 36)} 
//                   height="12" 
//                   rx="1" 
//                   fill="url(#batteryGradient)"
//                   className="transition-all duration-300"
//                 >
//                   <animate
//                     attributeName="opacity"
//                     values="0.8;1;0.8"
//                     dur="1.5s"
//                     repeatCount="indefinite"
//                   />
//                 </rect>
                
//                 <defs>
//                   <linearGradient id="batteryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                     <stop offset="0%" stopColor="#ff6b1a" />
//                     <stop offset="100%" stopColor="#ffaa6b" />
//                   </linearGradient>
//                 </defs>
//               </svg>
              
//               {/* Energy particles */}
//               {progress > 20 && (
//                 <div className="absolute -top-1 left-0 w-full h-full pointer-events-none">
//                   {[...Array(3)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="absolute w-1 h-1 bg-[#ff6b1a] rounded-full"
//                       style={{
//                         left: `${20 + i * 15}%`,
//                         animation: `float 1.5s ease-in-out infinite ${i * 0.3}s`,
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Rotating glow ring */}
//           <div 
//             className="absolute inset-0 rounded-full opacity-30"
//             style={{
//               background: `conic-gradient(from 0deg, transparent 0deg, #ff6b1a 90deg, transparent 180deg)`,
//               animation: 'spin 3s linear infinite',
//               filter: 'blur(8px)'
//             }}
//           />
//         </div>

//         {/* Loading text with modern style */}
//         <div className="text-center mt-8 space-y-3">
//           <p className="text-white text-xl font-['Arial',sans-serif] font-bold tracking-[0.2em] uppercase">
//             {loadingText}
//           </p>
          
//           {/* Animated progress bar */}
//           <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
//             <div 
//               className="h-full bg-gradient-to-r from-[#ff6b1a] via-[#ff8c42] to-[#ffaa6b] rounded-full transition-all duration-300 ease-out"
//               style={{ 
//                 width: `${progress}%`,
//                 boxShadow: '0 0 12px rgba(255, 107, 26, 0.8)'
//               }}
//             />
//           </div>

//           {/* Pulse indicator */}
//           <div className="flex justify-center items-center gap-2 mt-4">
//             {[...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="w-2 h-2 rounded-full bg-[#ff6b1a]"
//                 style={{
//                   animation: `pulse 1.5s ease-in-out infinite ${i * 0.2}s`,
//                   boxShadow: '0 0 8px rgba(255, 107, 26, 0.8)'
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Brand name */}
//         <div className="mt-8 text-white/40 text-sm font-['Arial',sans-serif] tracking-wider uppercase">
//           Synovra
//         </div>
//       </div>

//       <style>{`
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
        
//         @keyframes float {
//           0%, 100% { 
//             transform: translateY(0) scale(1);
//             opacity: 0;
//           }
//           50% { 
//             transform: translateY(-12px) scale(1.2);
//             opacity: 1;
//           }
//         }
        
//         @keyframes pulse {
//           0%, 100% { 
//             opacity: 0.3;
//             transform: scale(0.8);
//           }
//           50% { 
//             opacity: 1;
//             transform: scale(1.2);
//           }
//         }
//       `}</style>
//     </div>
//   )
// }
