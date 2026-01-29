import Hero from '../components/Hero'
import ExperienceRevival from '../components/ExperienceRevival'
import SystemOutcomes from '../components/SystemOutcomes'
import ChagingPersective from '../components/ChagingPersective'
import GlowBattery from '../components/glowbattery'
import ClassofPower from '../components/ClassofPower'
import PulseX from '../components/PulseX'
import Challenges from '../components/Challenges'
import ProofInAction from '../components/ProofInAction'
import Sectors from '../components/Sectors'
import BuyBatteries from '../components/BuyBatteries'
import { FeaturesSectionWithHoverEffects } from '../components/FeaturesSectionWithHoverEffects'
import BatteryLifecycleScroll from '../components/BatteryLifecycleScroll'

export default function Home() {
  return (
    <>
      <Hero />
      <BatteryLifecycleScroll/>
      <ExperienceRevival />
      <SystemOutcomes />
      <ChagingPersective />
      <GlowBattery />
      <ClassofPower />
      <PulseX />
      <Challenges />
      <ProofInAction />
      <Sectors />
      <BuyBatteries />
      <FeaturesSectionWithHoverEffects />
    </>
  )
}
