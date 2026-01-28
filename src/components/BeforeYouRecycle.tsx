export default function BeforeYouRecycle() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black z-[320]">
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

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Content */}
      <div className="relative z-[2] text-center px-6 max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-white mb-8">
          <span 
            style={{
              fontFamily: 'Arial',
              fontSize: '72px',
              fontWeight: 700,
              lineHeight: '1.2',
              letterSpacing: '-1px'
            }}
          >
            Before you recycle — revive.
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-white/90 mb-12"
          style={{
            fontFamily: 'Arial',
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '28px',
            maxWidth: '700px',
            margin: '0 auto 48px'
          }}
        >
          Join us in building the world's first true battery afterlife — where every unit
          is revived, tracked, and only recycled when no life remains.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="bg-[#ff6b1a] hover:bg-[#ff6b1a]/90 text-white font-medium text-lg px-8 py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(255,107,26,0.6)] hover:shadow-[0_0_30px_rgba(255,107,26,0.8)] whitespace-nowrap">
            Book a Revival Pickup
          </button>
          <button className="px-8 py-4 rounded-lg border border-white/20 bg-[#191919] text-white font-medium text-lg transition-all duration-300 hover:bg-white hover:text-black whitespace-nowrap">
            Start Earning More Per Battery
          </button>
        </div>
      </div>
    </section>
  )
}
