import BenefitsByAudienceHeading from './BenefitsByAudienceHeading'

interface BenefitCard {
  iconPath: string
  category: string
  title: string
  benefits: string[]
}

export default function BenefitsByAudience() {
  const benefitCards: BenefitCard[] = [
    {
      iconPath: "/benefit/icon1.svg",
      category: "MANUFACTURERS",
      title: "Market Edge",
      benefits: [
        "Warranty-backed revived units",
        "Longer life = ESG edge",
        "Built-in proof, no extra reporting"
      ]
    },
    {
      iconPath: "/benefit/icon2.svg",
      category: "END-USERS",
      title: "Premium Power, Proven Value",
      benefits: [
        "Premium, certified, warranty-backed",
        "2+ lifespan",
        "Up to 50% cheaper",
        "Higher trade-in when returned to Synovra/partners"
      ]
    },
    {
      iconPath: "/benefit/icon3.svg",
      category: "DISTRIBUTORS",
      title: "More Cash, Less Work",
      benefits: [
        "Higher payouts",
        "Save labor & space",
        "Faster turnover",
        "Bigger CO₂ savings"
      ]
    },
    {
      iconPath: "/benefit/icon4.svg",
      category: "RECYCLERS",
      title: "3× Revenue",
      benefits: [
        "2.5-3× more revenue",
        "Spent-only streams = higher yield",
        "No premature smelting",
        "ESG data included"
      ]
    }
  ]

  return (
    <section className="relative flex w-full flex-col items-center justify-start bg-[#0d0d0d] overflow-hidden font-sans text-white z-[310] pt-8 pb-6 px-4 md:pt-12 md:pb-8 md:px-6">
      <BenefitsByAudienceHeading />
      
      <div className="max-w-[1200px] mx-auto pb-3 md:pb-6">

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mx-auto max-w-[1300px]">
          {benefitCards.map((card, index) => (
            <div
              key={index}
              className="bg-[#0d0d0d] border border-[#2A2A2A] rounded-xl relative overflow-hidden group transition-all duration-300 py-5 px-8 md:py-6 md:px-10"
            >
              {/* Animated Orange Border */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF6B1A] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" 
                   style={{ width: '6px' }}
              />
              {/* Icon */}
              <div className="w-10 h-10 bg-[#FF6B1A] rounded-lg flex items-center justify-center mb-2">
                <img 
                  src={card.iconPath} 
                  alt={card.title}
                  className="w-6 h-6"
                />
              </div>

              {/* Category */}
              <p className="text-gray-500 text-[9px] font-semibold tracking-wider mb-1">
                {card.category}
              </p>

              {/* Title */}
              <h3 className="text-base font-bold text-white mb-2">
                {card.title}
              </h3>

              {/* Benefits List */}
              <ul className="space-y-1">
                {card.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300">
                    <span className="text-[#FF6B1A] text-sm mt-0.5 flex-shrink-0">•</span>
                    <span className="text-xs sm:text-sm md:text-sm leading-tight">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
