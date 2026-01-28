import ProofNotPromises from '../components/ProofNotPromises'
import StorytellingSection from '../components/StorytellingSection'
import MythsVsTruths from '../components/MythsVsTruths'
import BusinessImpact from '../components/BusinessImpact'
import BenefitsByAudience from '../components/BenefitsByAudience'
import BeforeYouRecycle from '../components/BeforeYouRecycle'


export default function WhyRevive() {
  return (
    <div>
      <StorytellingSection />
      <MythsVsTruths />
      <ProofNotPromises/>
      <BusinessImpact/>
      <BenefitsByAudience/>
      <BeforeYouRecycle/>
    </div>
  )
}