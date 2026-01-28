export default function BeforeYouRecycle() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#0d0d0d] z-[320] py-12 md:py-0">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/beforeyourecycle.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-[2] text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-white mb-6 md:mb-8">
          <span 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            style={{
              fontFamily: 'Arial',
              letterSpacing: '-1px'
            }}
          >
            Before you recycle — revive.
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-white/90 mb-8 md:mb-12 text-sm sm:text-base md:text-lg"
          style={{
            fontFamily: 'Arial',
            fontWeight: 400,
            lineHeight: '28px',
            maxWidth: '700px',
            margin: '0 auto 32px'
          }}
        >
          Join us in building the world's first true battery afterlife — where every unit
          is revived, tracked, and only recycled when no life remains.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center items-center">
          <button className="w-full sm:w-auto bg-[#ff6b1a] hover:bg-[#ff6b1a]/90 text-white font-medium text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(255,107,26,0.6)] hover:shadow-[0_0_30px_rgba(255,107,26,0.8)]">
            Book a Revival Pickup
          </button>
          <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-lg border border-white/20 bg-[#191919] text-white font-medium text-base md:text-lg transition-all duration-300 hover:bg-white hover:text-black">
            Start Earning More Per Battery
          </button>
        </div>
      </div>
    </section>
  )
}
