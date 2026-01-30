// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const StorytellingSection: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const video1Ref = useRef<HTMLVideoElement>(null);
//   const video2Ref = useRef<HTMLVideoElement>(null);
//   const video3Ref = useRef<HTMLVideoElement>(null);
//   const layer1Ref = useRef<HTMLDivElement>(null);
//   const layer2Ref = useRef<HTMLDivElement>(null);
//   const layer3Ref = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//   });

//   React.useLayoutEffect(() => {
//     if (!containerRef.current) return;
//     const videos = [video1Ref.current, video2Ref.current, video3Ref.current];
//     videos.forEach(vid => {
//       if (vid) {
//         vid.currentTime = 0;
//         vid.pause();
//       }
//     });

//     const ctx = gsap.context(() => {
//       // Auto-play timeline - each stage lasts ~4 seconds
//       const tl = gsap.timeline({
//         repeat: -1, // Loop infinitely
//         repeatDelay: 2, // Pause 2 seconds before restarting
//       });

//       // Stage 1: Show layer 1 and play video 1 (4 seconds)
//       tl.set(layer1Ref.current, { opacity: 1, y: 0 })
//         .set(video1Ref.current, { opacity: 1 })
//         .call(() => {
//           if (video1Ref.current) {
//             video1Ref.current.currentTime = 0;
//             video1Ref.current.play().catch(() => {});
//           }
//         })
//         .to({}, { duration: 4 }) // Wait 4 seconds

//         // Transition to Stage 2
//         .to(layer1Ref.current, { opacity: 0, y: -30, duration: 0.5 })
//         .to(video1Ref.current, { opacity: 0, duration: 0.3 }, "<")
//         .to(layer2Ref.current, { opacity: 1, y: 0, duration: 0.5 }, "<0.2")
//         .to(video2Ref.current, { opacity: 1, duration: 0.3 }, "<")
//         .call(() => {
//           if (video2Ref.current) {
//             video2Ref.current.currentTime = 0;
//             video2Ref.current.play().catch(() => {});
//           }
//         })
//         .to({}, { duration: 4 }) // Wait 4 seconds

//         // Transition to Stage 3
//         .to(layer2Ref.current, { opacity: 0, y: -30, duration: 0.5 })
//         .to(video2Ref.current, { opacity: 0, duration: 0.3 }, "<")
//         .to(layer3Ref.current, { opacity: 1, y: 0, duration: 0.5 }, "<0.2")
//         .to(video3Ref.current, { opacity: 1, duration: 0.3 }, "<")
//         .call(() => {
//           if (video3Ref.current) {
//             video3Ref.current.currentTime = 0;
//             video3Ref.current.play().catch(() => {});
//           }
//         })
//         .to({}, { duration: 4 }); // Wait 4 seconds

//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div id="why-revive" ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
//       <div className="relative w-full h-screen flex flex-col items-center justify-start pt-[8vh] md:pt-[11vh]">
//         <div className="relative w-[80%] h-[25%] sm:w-[60%] sm:h-[30%] md:w-[35%] md:h-[40%] z-0 pointer-events-none">
//           <video
//             ref={video1Ref}
//             src="/whyrevive/video1.mp4"
//             className="absolute inset-0 w-full h-full object-contain"
//             muted playsInline preload="auto"
//           />
//           <video
//             ref={video2Ref}
//             src="/whyrevive/video2.mp4"
//             className="absolute inset-0 w-full h-full object-contain opacity-0"
//             muted playsInline preload="auto"
//           />
//           <video
//             ref={video3Ref}
//             src="/whyrevive/video3.mp4"
//             className="absolute inset-0 w-full h-full object-contain opacity-0"
//             muted playsInline preload="auto"
//           />
//         </div>
//         <div className="relative flex-1 w-full max-w-6xl mt-4 pointer-events-none z-10">
//           <div ref={layer1Ref} className="absolute inset-0 flex flex-col items-center text-center opacity-0 transform translate-y-12 px-4">
//             <h2 className="text-white mb-8 md:mb-12" style={{
//               width: '100%',
//               maxWidth: '680px',
//               fontFamily: 'Arial',
//               fontSize: window.innerWidth < 768 ? '18px' : '22px',
//               fontWeight: 400,
//               lineHeight: window.innerWidth < 768 ? '28px' : '39px',
//               textAlign: 'center'
//             }}>
//               A global shift to a greener future is underway — the kind where <br className="hidden md:block" />
//               the impossible is becoming everyday life.
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full pointer-events-auto max-w-5xl">
//               {['Electric mobility.', 'Renewable energy.', 'Regulated recycling.'].map((text, i) => (
//                 <div key={i} className="bg-zinc-900/30 backdrop-blur-sm border border-white/5 rounded-xl md:rounded-2xl py-4 md:py-6 px-4 md:px-6">
//                   <p className="text-white/80 text-base md:text-xl font-light tracking-tight">{text}</p>
//                 </div>
//               ))}
//             </div>
//             <p className="text-white/40 text-xs sm:text-sm md:text-base font-light tracking-tight mt-4 md:mt-6 max-w-3xl">
//               But until the systems to support a green future are in place, the future won't be truly green.
//             </p>
//           </div>

//           <div ref={layer2Ref} className="absolute inset-0 flex flex-col items-center text-center opacity-0 transform translate-y-12 px-4">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 w-full pointer-events-auto max-w-6xl mb-3 md:mb-4">
//               <ProblemCard title="CO2 surges" subtitle="→ from nonstop mining and smelting" />
//               <ProblemCard title="Mines expand" subtitle="→ when old material sits unused" />
//               <ProblemCard title="Batteries scrapped" subtitle="→ years early" />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 w-full pointer-events-auto max-w-4xl mb-4 md:mb-8">
//               <ProblemCard title="No health data" subtitle="→ capacity disappears without trace" />
//               <ProblemCard title="Systems broken" subtitle="→ collection, revival, recycling never meet" />
//             </div>
//             <p className="text-white/60 text-xs sm:text-sm md:text-base font-light tracking-tight mt-2 md:mt-4 max-w-4xl">
//               And that's where we step in — the missing layer that turns 'green at the front' into green all the way through.
//             </p>
//           </div>

//           <div ref={layer3Ref} className="absolute inset-0 flex flex-col items-center text-center opacity-0 transform translate-y-12 px-4">
//             <div className="flex flex-wrap justify-center items-center gap-x-2 md:gap-x-4 gap-y-2 text-white/90 text-[10px] sm:text-xs md:text-sm font-semibold mb-4 md:mb-6 tracking-wide uppercase pointer-events-auto">
//               <span>Zero-Liquid Discharge</span>
//               <span className="text-white/40">•</span>
//               <span>Serial-Linked Warranty</span>
//               <span className="text-white/40">•</span>
//               <span>Chain-of-Custody</span>
//               <span className="text-white/40">•</span>
//               <span>Audit-Ready Reporting</span>
//             </div>

        
//             <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-5xl pointer-events-auto mb-4 md:mb-6">
//               {['One loop', 'Revival-first', 'Zero-Liquid-Discharge', '90% less CO₂', 'Material recovery', 'Recycle at end'].map((text, i) => (
//                 <button key={i} className="px-4 sm:px-6 md:px-8 py-2 md:py-3 bg-zinc-800/60 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs sm:text-sm md:text-base font-semibold hover:bg-zinc-700/60 transition-all">
//                   {text}
//                 </button>
//               ))}
//             </div>


//             <p className="text-white/70 text-xs sm:text-sm md:text-base font-light tracking-tight max-w-3xl">
//               We are not anti-recycling — we are anti-waste.
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// const ProblemCard: React.FC<{ title: string; subtitle: string; className?: string }> = ({ title, subtitle, className }) => {
//   const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
//   return (
//     <div className={`text-left transition-all ${className}`} style={{
//       width: isMobile ? '100%' : '360px',
//       maxWidth: '360px',
//       height: 'auto',
//       minHeight: isMobile ? '80px' : '98px',
//       borderRadius: '14px',
//       border: '1px solid rgba(251, 44, 54, 0.30)',
//       background: 'rgba(70, 8, 9, 0.28)',
//       boxShadow: '0 4px 15.1px 0 rgba(0, 0, 0, 0.88)',
//       padding: isMobile ? '16px' : '20px'
//     }}>
//       <h3 className="mb-1 md:mb-3" style={{
//         color: '#FF6467',
//         fontFamily: 'Arial',
//         fontSize: isMobile ? '18px' : '24px',
//         fontWeight: 700,
//         lineHeight: isMobile ? '24px' : '32px'
//       }}>{title}</h3>
//       <p style={{
//         color: 'rgba(255, 255, 255, 0.60)',
//         fontFamily: 'Arial',
//         fontSize: isMobile ? '13px' : '16px',
//         fontWeight: 400,
//         lineHeight: isMobile ? '20px' : '24px'
//       }}>{subtitle}</p>
//     </div>
//   );
// };

// export default StorytellingSection;