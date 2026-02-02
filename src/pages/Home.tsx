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
const FeaturesSectionWithHoverEffects = lazy(() => import('../components/FeaturesSectionWithHoverEffects').then(module => ({ default: module.FeaturesSectionWithHoverEffects })))

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
      {/* Above-the-fold: Load immediately */}
      <Hero />
      <BatteryHero/>
      
      {/* Below-the-fold: Lazy load for better performance */}
      <Suspense fallback={<SectionLoader />}>
        <BatteryLifecycleScroll/>
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
        <FeaturesSectionWithHoverEffects />
      </Suspense>
    </div>
  )
}
