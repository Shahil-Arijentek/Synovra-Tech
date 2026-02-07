import { lazy, Suspense, useEffect, useState } from 'react'

// Above-the-fold component - load immediately
import AboutUsHero from '../components/AboutUsHero'

// Below-the-fold components - lazy load
const WhatWeStandFor = lazy(() => import('../components/WhatWeStandFor'))
const OurLeadership = lazy(() => import('../components/OurLeadership'))
const CTASection = lazy(() => import('../components/CTASection'))

// Loading fallback component - Simple dual ring pattern
const SectionLoader = () => (
  <div className="min-h-[25rem] flex items-center justify-center bg-black">
    <div className="relative w-16 h-16">
      {/* Outer rotating ring */}
      <div className="absolute inset-0 border-4 border-transparent border-t-[#ff6b1a] border-r-[#ff6b1a] rounded-full animate-spin" />
      {/* Inner rotating ring (reverse) */}
      <div className="absolute inset-2 border-4 border-transparent border-b-[#ff8c42] border-l-[#ff8c42] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
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