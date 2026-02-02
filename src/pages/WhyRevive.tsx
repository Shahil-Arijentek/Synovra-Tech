import { lazy, Suspense, useEffect, useState } from 'react'

// Above-the-fold component - load immediately
import StorytellingSection from '../components/StorytellingSection'

// Below-the-fold components - lazy load
const MythsVsTruths = lazy(() => import('../components/MythsVsTruths'))
const ProofNotPromises = lazy(() => import('../components/ProofNotPromises'))
const BusinessImpact = lazy(() => import('../components/BusinessImpact'))
const BenefitsByAudience = lazy(() => import('../components/BenefitsByAudience'))
const BeforeYouRecycle = lazy(() => import('../components/BeforeYouRecycle'))


// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center bg-[#0d0d0d]">
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

export default function WhyRevive() {
  const [isPageReady, setIsPageReady] = useState(false)
  const [isStorytellingReady, setIsStorytellingReady] = useState(false)
  
  // Ensure page starts at top and prevent flash
  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    
    // Small delay to ensure scroll is complete before showing content
    const timer = setTimeout(() => {
      setIsPageReady(true)
    }, 10)
    
    return () => clearTimeout(timer)
  }, [])

  // Callback when StorytellingSection is fully loaded
  const handleStorytellingReady = () => {
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      setIsStorytellingReady(true)
    }, 300)
  }
  
  return (
    <div 
      className="transition-opacity duration-200"
      style={{ opacity: isPageReady ? 1 : 0 }}
    >
      {/* Above-the-fold: Load immediately */}
      <StorytellingSection onReady={handleStorytellingReady} />
      
      {/* Below-the-fold: Only render after StorytellingSection is ready to prevent flash */}
      {isStorytellingReady && (
        <>
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
        </>
      )}
    </div>
  )
}