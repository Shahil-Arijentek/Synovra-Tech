export default function CTASection() {
  return (
    <section className="relative w-full h-[450px] sm:h-[600px] md:h-[700px] overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/beforeyourecycle.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-white text-center mb-6 sm:mb-10 md:mb-12 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight sm:leading-snug px-2">
          Ready to Give Your Batteries a Second Life?
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          {/* Get in Touch Button - Orange */}
          <button className="bg-[#ff6b1a] text-black font-semibold px-6 sm:px-10 py-2.5 sm:py-4 rounded-full text-sm sm:text-lg transition-all duration-300 will-change-[box-shadow] shadow-[0_0_15px_rgba(255,107,26,0.4),0_0_30px_rgba(255,107,26,0.2)] hover:shadow-[0_0_20px_rgba(255,107,26,0.5),0_0_40px_rgba(255,107,26,0.25)] hover:bg-[#ff6b1a]/90 w-full sm:w-auto sm:min-w-[180px] max-w-[240px] sm:max-w-[280px]">
            Get in Touch
          </button>

          {/* Learn More Button - Outlined */}
          <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-semibold px-6 sm:px-10 py-2.5 sm:py-4 rounded-full text-sm sm:text-lg transition-all duration-300 w-full sm:w-auto sm:min-w-[180px] max-w-[240px] sm:max-w-[280px]">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}
