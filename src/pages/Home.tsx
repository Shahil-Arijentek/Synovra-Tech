import { lazy, Suspense, useEffect, useState } from 'react'

import Hero from '../components/Hero'
import BatteryHero from '../components/BatteryHero'

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

export default function Home() {
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
      <Hero />
      <div style={{ position: 'relative' }}>
        <BatteryHero/>
      </div>
      <Suspense fallback={null}>
        <div style={{ position: 'relative' }}>
          <BatteryLifecycleScroll/>
        </div>
      </Suspense> 
      
      <Suspense fallback={null}>
        <ExperienceRevival />
      </Suspense>
      
      <Suspense fallback={null}>
        <SystemOutcomes />
      </Suspense>
      
      <Suspense fallback={null}>
        <ChagingPersective />
      </Suspense>
      
      <Suspense fallback={null}>
        <GlowBattery />
      </Suspense>
      
      <Suspense fallback={null}>
        <ClassofPower />
      </Suspense>
      
      <Suspense fallback={null}>
        <PulseX />
      </Suspense>
      
      <Suspense fallback={null}>
        <Challenges />
      </Suspense>
      
      <Suspense fallback={null}>
        <ProofInAction />
      </Suspense>
      
      <Suspense fallback={null}>
        <Sectors />
      </Suspense>
      
      <Suspense fallback={null}>
        <BuyBatteries />
      </Suspense>
      
      <Suspense fallback={null}>
        <DecisionJustification />
      </Suspense>
    </div>
  )
}
