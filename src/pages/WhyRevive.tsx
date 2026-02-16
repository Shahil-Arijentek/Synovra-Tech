import { lazy, Suspense, useEffect, useState } from 'react'

// Above-the-fold component - load immediately
import StorytellingSection from '../components/StorytellingSection'

// Below-the-fold components - lazy load
const MythsVsTruths = lazy(() => import('../components/MythsVsTruths'))
const ProofNotPromises = lazy(() => import('../components/ProofNotPromises'))
const BusinessImpact = lazy(() => import('../components/BusinessImpact'))
const BenefitsByAudience = lazy(() => import('../components/BenefitsByAudience'))
const BeforeYouRecycle = lazy(() => import('../components/BeforeYouRecycle'))


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
      <Suspense fallback={null}>
        <MythsVsTruths />
      </Suspense>
      
      <Suspense fallback={null}>
        <ProofNotPromises/>
      </Suspense>
      
      <Suspense fallback={null}>
        <BusinessImpact/>
      </Suspense>
      
      <Suspense fallback={null}>
        <BenefitsByAudience/>
      </Suspense>
      
      <Suspense fallback={null}>
        <BeforeYouRecycle/>
      </Suspense>
    </div>
  )
}