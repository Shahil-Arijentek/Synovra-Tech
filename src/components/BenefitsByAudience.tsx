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
    <section className="relative flex w-full flex-col items-center justify-start bg-[#0d0d0d] overflow-hidden font-sans text-white z-[310] pt-12 pb-8 px-6 md:pt-16 md:pb-12 md:px-8">
      <BenefitsByAudienceHeading />
      
      <div className="max-w-[1400px] mx-auto pb-4 md:pb-8">

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mx-auto max-w-[1600px]">
          {benefitCards.map((card, index) => (
            <div
              key={index}
              className="bg-[#0d0d0d] border border-[#2A2A2A] rounded-xl relative overflow-hidden group transition-all duration-300 py-6 px-16 md:py-8 md:px-24"
            >
              {/* Animated Orange Border */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF6B1A] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" 
                   style={{ width: '6px' }}
              />
              {/* Icon */}
              <div className="w-12 h-12 bg-[#FF6B1A] rounded-lg flex items-center justify-center mb-3">
                <img 
                  src={card.iconPath} 
                  alt={card.title}
                  className="w-8 h-8"
                />
              </div>

              {/* Category */}
              <p className="text-gray-500 text-[10px] font-semibold tracking-wider mb-1">
                {card.category}
              </p>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-3">
                {card.title}
              </h3>

              {/* Benefits List */}
              <ul className="space-y-1.5">
                {card.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300">
                    <span className="text-[#FF6B1A] text-sm mt-0.5 flex-shrink-0">•</span>
                    <span className="text-sm sm:text-base md:text-base lg:text-lg leading-tight">{benefit}</span>
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
