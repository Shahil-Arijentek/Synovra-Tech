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
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      
      const lenisInstance = (window as any).lenis
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true })
      }
    }
    
    scrollToTop()
    
    const timer = setTimeout(() => {
      scrollToTop()
      setIsReady(true)
    }, 10)
    
    const refreshTimer = setTimeout(() => {
      scrollToTop()
      const gsapInstance = (window as any).gsap
      if (gsapInstance?.ScrollTrigger) {
        gsapInstance.ScrollTrigger.refresh()
      }
    }, 300)
    
    return () => {
      clearTimeout(timer)
      clearTimeout(refreshTimer)
    }
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