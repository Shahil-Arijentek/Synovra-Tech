import { lazy, Suspense, useEffect, useState } from 'react'

// Above-the-fold component - load immediately
import AboutUsHero from '../components/AboutUsHero'

// Below-the-fold components - lazy load
const WhatWeStandFor = lazy(() => import('../components/WhatWeStandFor'))
const OurLeadership = lazy(() => import('../components/OurLeadership'))
const CTASection = lazy(() => import('../components/CTASection'))

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center bg-black">
    <div className="relative">
      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-[#ff6b1a] rounded-full animate-ping opacity-75" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#ff6b1a] rounded-full animate-pulse" />
      </div>
      {/* Center dot */}
      <div className="w-4 h-4 bg-[#ff6b1a] rounded-full shadow-[0_0_20px_rgba(255,107,26,0.8)]" />
    </div>
  </div>
)

export default function AboutUs() {
  const [isReady, setIsReady] = useState(false)
  
  // Ensure page starts at top and prevent flash
  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 10)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div 
      className="bg-black text-white transition-opacity duration-200"
      style={{ opacity: isReady ? 1 : 0 }}
    >
      {/* Above-the-fold: Load immediately */}
      <AboutUsHero />
      
      {/* Below-the-fold: Lazy load */}
      <Suspense fallback={<SectionLoader />}>
        <WhatWeStandFor />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <OurLeadership />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <CTASection />
      </Suspense>
    </div>
  )
}