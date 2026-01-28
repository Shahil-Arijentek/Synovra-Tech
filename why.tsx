export default function BenefitsByAudienceHeading() {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-8 mb-12 md:mb-20">
      <div className="relative overflow-hidden rounded-2xl py-16 md:py-20">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/Comp 1_5.mp4" type="video/mp4" />
        </video>
        
        {/* Content */}
        <div className="relative z-10 text-center">
          <h2 
          className="mb-4 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black"
          style={{
            color: '#FFF',
            textAlign: 'center',
            fontFamily: 'Arial',
            fontStyle: 'normal',
            lineHeight: '120%',
            letterSpacing: '1px'
          }}
        >
          Benefits by Audience
        </h2>
        <p 
          className="text-sm sm:text-base md:text-lg px-4"
          style={{
            color: '#9C9C9C',
            textAlign: 'center',
            fontFamily: 'Arial',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '28px'
          }}
        >
          One system. Different value at every stage of the battery lifecycle.
        </p>
        </div>
      </div>
    </div>
  )
}



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
    <section className="bg-[#0d0d0d] font-sans text-white relative z-[310]">
      <BenefitsByAudienceHeading />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 pb-12 md:pb-20">

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mx-auto max-w-[920px]">
          {benefitCards.map((card, index) => (
            <div
              key={index}
              className="bg-[#0d0d0d] border border-[#2A2A2A] rounded-xl relative overflow-hidden group transition-all duration-300 p-5 md:p-6"
            >
              {/* Animated Orange Border */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF6B1A] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" 
                   style={{ width: '6px' }}
              />
              {/* Icon */}
              <div className={`${index === 3 ? 'w-12 h-12' : 'w-10 h-10'} bg-[#FF6B1A] rounded-lg flex items-center justify-center mb-3`}>
                <img 
                  src={card.iconPath} 
                  alt={card.title}
                  className={index === 3 ? 'w-8 h-8' : 'w-5 h-5'}
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
                    <span className="text-[#FF6B1A] text-xs mt-0.5 flex-shrink-0">•</span>
                    <span className="text-xs leading-tight">{benefit}</span>
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
