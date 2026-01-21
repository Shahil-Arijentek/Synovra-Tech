import { useRef } from 'react'

interface Challenge {
  image: string
  title: string
  problem: string
  solution: string
}

export default function Challenges() {
  const sectionRef = useRef<HTMLElement>(null)

  const challenges: Challenge[] = [
    {
      image: '/challenge1.png', 
      title: 'The High Cost of Premium Batteries',
      problem: 'OEM quality batteries with warranties are expensive, making large scale replacements costly.',
      solution: 'Synovra delivers premium, performance verified batteries at a fraction of the cost of new — same warranty, same performance.'
    },
    {
      image: '/challenge2.png',
      title: 'Battery Lifecycle Management',
      problem: 'Managing battery end-of-life creates disposal challenges and environmental concerns.',
      solution: 'Synovra provides complete lifecycle management with 3rd-life revival, tracking, and circular economy integration.'
    },
    {
      image: '/challenge3.png',
      title: 'Operational Downtime Risks',
      problem: 'Battery failures cause unexpected downtime, impacting critical operations and revenue.',
      solution: 'Synovra\'s warranty-backed revived batteries ensure reliable power with zero operational burden.'
    },
    {
      image: '/challenge4.png',
      title: 'Environmental Compliance',
      problem: 'Battery disposal regulations are tightening, requiring sustainable waste management solutions.',
      solution: 'Synovra\'s zero-liquid-discharge facility processes batteries with 100% electrolyte reuse, ensuring full compliance.'
    },
    {
      image: '/challenge5.png',
      title: 'Supply Chain Dependencies',
      problem: 'Reliance on new battery suppliers creates supply chain vulnerabilities and long lead times.',
      solution: 'Synovra\'s revival process creates local supply chains, reducing dependencies and ensuring faster availability.'
    }
  ]

  // --- TIGHT STACK CONFIGURATION ---
  const cardHeight = 400
  const cardWidth = 1040
  const stickyTopPosition = 80  // Reduced gap from the top of the screen
  const stackOverlap = 12       // Minimal sliver of previous card showing
  const scrollDistance = 150    // Reduced gap between cards (prevents the "big gap" while scrolling)

  return (
    <section ref={sectionRef} className="bg-white w-full">
      {/* Header - Reduced bottom padding */}
      <div className="max-w-[1400px] mx-auto pt-16 pb-8 px-8 text-center">
        <h2 style={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: 700,
          fontSize: '52px',
          color: '#0a0a0a',
          margin: 0
        }}>
          Your Challenges, Solved
        </h2>
      </div>

      {/* Cards List */}
      <div className="flex flex-col items-center px-8 relative">
        {challenges.map((challenge, index) => (
          <div 
            key={index} 
            className="bg-white rounded-[20px] overflow-hidden flex shadow-[0_-5px_30px_rgba(0,0,0,0.08)] border border-black/5"
            style={{
              position: 'sticky',
              // Cards stack closely
              top: `${stickyTopPosition + (index * stackOverlap)}px`, 
              width: '100%',
              maxWidth: `${cardWidth}px`,
              height: `${cardHeight}px`,
              // Controls the scroll "feel" - less margin = faster overlap
              marginBottom: index === challenges.length - 1 ? '10vh' : `${scrollDistance}px`, 
              zIndex: index,
            }}
          >
            {/* Image Section */}
            <div 
              className="w-1/2 h-full bg-[#f8f8f8]"
              style={{
                backgroundImage: `url(${challenge.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Content Section */}
            <div className="w-1/2 flex flex-col justify-center p-10 bg-white">
              <h3 className="font-bold text-[24px] mb-4 text-black leading-tight">
                {challenge.title}
              </h3>
              
              <div className="mb-4">
                <p className="text-red-500 font-bold text-[10px] uppercase tracking-widest mb-1">Problem</p>
                <p className="text-gray-700 text-[14px] leading-relaxed">{challenge.problem}</p>
              </div>
              
              <div>
                <p className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest mb-1">Solution</p>
                <p className="text-gray-700 text-[14px] leading-relaxed">{challenge.solution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}



//left section revised for scroll animation
// import { useState, useEffect, useRef } from 'react'

// interface Challenge {
//   image: string
//   title: string
//   problem: string
//   solution: string
// }

// export default function Challenges() {
//   const sectionRef = useRef<HTMLElement>(null)
//   const [scrollProgress, setScrollProgress] = useState(0)

//   const challenges: Challenge[] = [
//     {
//       image: '/challenge1.png', 
//       title: 'The High Cost of Premium Batteries',
//       problem: 'OEM quality batteries with warranties are expensive, making large scale replacements costly.',
//       solution: 'Synovra delivers premium, performance verified batteries at a fraction of the cost of new — same warranty, same performance.'
//     },
//     {
//       image: '/challenge2.png',
//       title: 'Battery Lifecycle Management',
//       problem: 'Managing battery end-of-life creates disposal challenges and environmental concerns.',
//       solution: 'Synovra provides complete lifecycle management with 3rd-life revival, tracking, and circular economy integration.'
//     },
//     {
//       image: '/challenge3.png',
//       title: 'Operational Downtime Risks',
//       problem: 'Battery failures cause unexpected downtime, impacting critical operations and revenue.',
//       solution: 'Synovra\'s warranty-backed revived batteries ensure reliable power with zero operational burden.'
//     },
//     {
//       image: '/challenge4.png',
//       title: 'Environmental Compliance',
//       problem: 'Battery disposal regulations are tightening, requiring sustainable waste management solutions.',
//       solution: 'Synovra\'s zero-liquid-discharge facility processes batteries with 100% electrolyte reuse, ensuring full compliance.'
//     },
//     {
//       image: '/challenge5.png',
//       title: 'Supply Chain Dependencies',
//       problem: 'Reliance on new battery suppliers creates supply chain vulnerabilities and long lead times.',
//       solution: 'Synovra\'s revival process creates local supply chains, reducing dependencies and ensuring faster availability.'
//     }
//   ]

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!sectionRef.current) return
//       const rect = sectionRef.current.getBoundingClientRect()
//       const windowHeight = window.innerHeight
      
//       // Calculate progress based on how much of the section has been scrolled
//       // totalScrollable is the extra height we added to the section (400vh - 100vh)
//       const totalScrollable = rect.height - windowHeight
//       const currentScroll = -rect.top
      
//       // Progress goes from 0 to 1
//       const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable))
//       setScrollProgress(progress)
//     }

//     window.addEventListener('scroll', handleScroll, { passive: true })
//     handleScroll() // Initialize on load
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const cardWidth = 1040
//   const cardHeight = 450

//   return (
//     <section 
//       ref={sectionRef}
//       className="relative bg-white"
//       style={{ height: '400vh' }} // Runway for scrolling
//     >
//       <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
//         {/* Section Header */}
//         <div className="absolute top-16 text-center w-full px-8">
//           <h2 style={{
//             fontFamily: 'Arial, sans-serif',
//             fontWeight: 700,
//             fontSize: '56px',
//             color: '#0a0a0a',
//             margin: 0
//           }}>
//             Your Challenges, Solved
//           </h2>
//         </div>

//         {/* Card Animation Track */}
//         <div className="relative w-full max-w-[1040px]" style={{ height: `${cardHeight}px` }}>
//           {challenges.map((challenge, index) => {
//             const totalCards = challenges.length
            
//             // For the first card (index 0), we want it to be active immediately (progress 0)
//             // For others, we divide the scroll range
//             const segment = 1 / (totalCards - 1) 
//             const start = (index - 1) * segment
            
//             let translateX = 0
//             let opacity = 1

//             if (index === 0) {
//               // Card 1 is always visible at the start, then slides left when Card 2 comes
//               const card1ExitProgress = Math.min(1, scrollProgress / (segment * 0.5))
//               translateX = -card1ExitProgress * 20 // Move slightly left as others arrive
//               opacity = 1 - (card1ExitProgress * 0.3) // Slight fade
//             } else {
//               // Cards 2-5 slide in from the right (120% to 0%)
//               const localProgress = Math.max(0, Math.min(1, (scrollProgress - start) / segment))
//               translateX = (1 - localProgress) * 120
//               opacity = localProgress > 0 ? 1 : 0
//             }

//             return (
//               <div 
//                 key={index}
//                 className="absolute inset-0 bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black/5 flex overflow-hidden"
//                 style={{
//                   width: `${cardWidth}px`,
//                   height: `${cardHeight}px`,
//                   transform: `translateX(${translateX}%)`,
//                   opacity: opacity,
//                   zIndex: index,
//                   transition: 'transform 0.1s linear, opacity 0.2s ease-in-out'
//                 }}
//               >
//                 {/* Image Section (Left) */}
//                 <div 
//                   className="w-1/2 h-full bg-[#f8f8f8]"
//                   style={{
//                     backgroundImage: `url(${challenge.image})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                   }}
//                 />

//                 {/* Content Section (Right) */}
//                 <div className="w-1/2 flex flex-col justify-center p-12 text-left bg-white">
//                   <h3 className="font-bold text-[28px] mb-6 text-black leading-tight">
//                     {challenge.title}
//                   </h3>
                  
//                   <div className="mb-6">
//                     <p className="text-red-500 font-bold text-[11px] uppercase tracking-widest mb-2">Problem</p>
//                     <p className="text-gray-700 text-[16px] leading-relaxed">{challenge.problem}</p>
//                   </div>
                  
//                   <div>
//                     <p className="text-emerald-500 font-bold text-[11px] uppercase tracking-widest mb-2">Solution</p>
//                     <p className="text-gray-700 text-[16px] leading-relaxed">{challenge.solution}</p>
//                   </div>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </section>
//   )
// }



// src/components/testchallenge.tsx

// import React, { Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Stage } from '@react-three/drei';
// // Import the component you just generated
// import { Model } from './src/components/BlenderModel'; 

// export default function TestChallengeScene() {
//   return (
//     // The Canvas is where your 3D scene lives
//     <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
//       <Suspense fallback={null}>
//         {/* The generated model component is used right here */}
//         <Model /> 
//       </Suspense>
//       {/* Adds basic lighting and environmental backdrop */}
//       <Stage environment="city" intensity={0.5} />
//       {/* Allows you to rotate and zoom around the model */}
//       <OrbitControls enableDamping dampingFactor={0.05} />
//     </Canvas>
//   );
// }
