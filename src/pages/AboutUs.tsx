import AboutUsHero from '../components/AboutUsHero'
import WhatWeStandFor from '../components/WhatWeStandFor'
import OurLeadership from '../components/OurLeadership'
import CTASection from '../components/CTASection'

export default function AboutUs() {
  return (
    <div className="bg-black text-white">
      <AboutUsHero />
      <WhatWeStandFor />
      <OurLeadership />
      <CTASection />
    </div>
  )
}