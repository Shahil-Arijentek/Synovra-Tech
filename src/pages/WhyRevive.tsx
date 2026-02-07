import { lazy, Suspense, useEffect, useState } from 'react'

// Above-the-fold component - load immediately
import StorytellingSection from '../components/StorytellingSection'

// Below-the-fold components - lazy load
const MythsVsTruths = lazy(() => import('../components/MythsVsTruths'))
const ProofNotPromises = lazy(() => import('../components/ProofNotPromises'))
const BusinessImpact = lazy(() => import('../components/BusinessImpact'))
const BenefitsByAudience = lazy(() => import('../components/BenefitsByAudience'))
const BeforeYouRecycle = lazy(() => import('../components/BeforeYouRecycle'))


// Loading fallback component - Simple dual ring pattern
const SectionLoader = () => (
  <div className="min-h-[25rem] flex items-center justify-center bg-[#0d0d0d]">
    <div className="relative w-16 h-16">
      {/* Outer rotating ring */}
      <div className="absolute inset-0 border-4 border-transparent border-t-[#ff6b1a] border-r-[#ff6b1a] rounded-full animate-spin" />
      {/* Inner rotating ring (reverse) */}
      <div className="absolute inset-2 border-4 border-transparent border-b-[#ff8c42] border-l-[#ff8c42] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
    </div>
  </div>
)

export default function WhyRevive() {
  const [isReady, setIsReady] = useState(false)
  
  // Ensure page starts at top and prevent flash
  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    
    // Small delay to ensure scroll is complete before showing content
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 10)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div 
      className="transition-opacity duration-200"
      style={{ opacity: isReady ? 1 : 0 }}
    >
      {/* Above-the-fold: Load immediately */}
      <StorytellingSection />
      
      {/* Below-the-fold: Lazy load */}
      <Suspense fallback={<SectionLoader />}>
        <MythsVsTruths />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ProofNotPromises/>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <BusinessImpact/>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <BenefitsByAudience/>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <BeforeYouRecycle/>
      </Suspense>
    </div>
  )
}