import { lazy, Suspense, useEffect, useState } from 'react'
import StorytellingSection from '../components/StorytellingSection'
const MythsVsTruths = lazy(() => import('../components/MythsVsTruths'))
const ProofNotPromises = lazy(() => import('../components/ProofNotPromises'))
const BusinessImpact = lazy(() => import('../components/BusinessImpact'))
const BenefitsByAudience = lazy(() => import('../components/BenefitsByAudience'))
const BeforeYouRecycle = lazy(() => import('../components/BeforeYouRecycle'))


export default function WhyRevive() {
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
      className="transition-opacity duration-200"
      style={{ opacity: isReady ? 1 : 0 }}
    >
      <StorytellingSection />
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