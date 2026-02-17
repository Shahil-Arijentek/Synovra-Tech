import { lazy, Suspense, useEffect, useState } from 'react'
import AboutUsHero from '../components/AboutUsHero'
const WhatWeStandFor = lazy(() => import('../components/WhatWeStandFor'))
const WhatSynovraIsBuilding = lazy(() => import('../components/WhatSynovraIsBuilding'))
const GlobalPresence = lazy(() => import('../components/GlobalPresence'))
const OurLeadership = lazy(() => import('../components/OurLeadership'))
const CTASection = lazy(() => import('../components/CTASection'))

export default function AboutUs() {
  const [isReady, setIsReady] = useState(false)
  
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
      <AboutUsHero />
      <Suspense fallback={null}>
        <WhatWeStandFor />
      </Suspense>
      
      <Suspense fallback={null}>
        <WhatSynovraIsBuilding />
      </Suspense>
      
      <Suspense fallback={null}>
        <GlobalPresence />
      </Suspense>
      
      <Suspense fallback={null}>
        <OurLeadership />
      </Suspense>
      
      <Suspense fallback={null}>
        <CTASection />
      </Suspense>
    </div>
  )
}