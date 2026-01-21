import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
// import Lifecycle from './components/Lifecycle'
import ExperienceRevival from './components/ExperienceRevival'
import ClassofPower from './components/ClassofPower'
import ProofInAction from './components/ProofInAction'
import Sectors from './components/Sectors'
import BuyBatteries from './components/BuyBatteries'
import Footer from './components/Footer'
import Challenges from './components/Challenges'
import { FeaturesSectionWithHoverEffects } from './components/FeaturesSectionWithHoverEffects'
import ChagingPersective from './components/ChagingPersective'
import GlowBattery from './components/glowbattery'
import SystemOutcomes from './components/SystemOutcomes'
import PulseX from './components/PulseX'


function App() {
  return (
    <div className="w-full min-h-screen font-sans">
      <Header />
      <Hero />
      <ExperienceRevival />
      <SystemOutcomes/>
      <ChagingPersective/>
      <GlowBattery/>
      <ClassofPower />
      <PulseX/>
      <Challenges />
      <ProofInAction />
      <Sectors />
      <BuyBatteries />
      <FeaturesSectionWithHoverEffects/>
      <Footer />
    </div>
  )
}
export default App