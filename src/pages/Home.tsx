import { lazy, Suspense, useEffect, useState } from 'react'

// Above-the-fold components - load immediately
import Hero from '../components/Hero'
import BatteryHero from '../components/BatteryHero'

// Below-the-fold components - lazy load for better performance
const BatteryLifecycleScroll = lazy(() => import('../components/BatteryLifecycleScroll'))
const ExperienceRevival = lazy(() => import('../components/ExperienceRevival'))
const SystemOutcomes = lazy(() => import('../components/SystemOutcomes'))
const ChagingPersective = lazy(() => import('../components/ChagingPersective'))
const GlowBattery = lazy(() => import('../components/glowbattery'))
const ClassofPower = lazy(() => import('../components/ClassofPower'))
const PulseX = lazy(() => import('../components/PulseX'))
const Challenges = lazy(() => import('../components/Challenges'))
const ProofInAction = lazy(() => import('../components/ProofInAction'))
const Sectors = lazy(() => import('../components/Sectors'))
const BuyBatteries = lazy(() => import('../components/BuyBatteries'))
const DecisionJustification = lazy(() => import('../components/DecisionJustification').then(module => ({ default: module.FeaturesSectionWithHoverEffects })))

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

export default function Home() {
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
      className="transition-opacity duration-200"
      style={{ opacity: isReady ? 1 : 0 }}
    >
      <Hero />
      <div style={{ position: 'relative' }}>
        <BatteryHero/>
      </div>
      <Suspense fallback={<SectionLoader />}>
        <div style={{ position: 'relative' }}>
          <BatteryLifecycleScroll/>
        </div>
      </Suspense> 
      
      <Suspense fallback={<SectionLoader />}>
        <ExperienceRevival />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <SystemOutcomes />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ChagingPersective />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <GlowBattery />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ClassofPower />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <PulseX />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Challenges />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ProofInAction />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Sectors />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <BuyBatteries />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <DecisionJustification />
      </Suspense>
    </div>
  )
}
