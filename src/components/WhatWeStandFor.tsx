export default function WhatWeStandFor() {
  const principles = [
    "Revival-first approach",
    "End-to-end accountability",
    "Impact at scale"
  ]

  return (
    <section className="relative w-full bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6 sm:mb-8 md:mb-12">
          What We Stand For
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-white/90 text-center leading-relaxed mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto px-2 sm:px-4">
          We believe in extending battery life, not discarding potential. Our revival-first philosophy ensures every 
          battery gets the opportunity for a second life before recycling. We take full responsibility for the entire 
          lifecycle, delivering measurable economic and environmental impact at industrial scale.
        </p>

        {/* Principles */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
          {principles.map((principle, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center gap-3 bg-[#1a1a1a] rounded-full px-6 py-3 sm:py-4 w-full sm:w-auto sm:flex-1 sm:min-w-[200px] md:min-w-[240px] hover:bg-[#252525] transition-colors"
            >
              <div className="w-2 h-2 bg-[#FF6B35] rounded-full flex-shrink-0" />
              <span className="text-sm sm:text-base text-white/90 text-center whitespace-nowrap">{principle}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
