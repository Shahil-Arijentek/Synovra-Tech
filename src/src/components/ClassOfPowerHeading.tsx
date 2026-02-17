export default function ClassOfPowerHeading() {
  return (
    <div className="max-w-7xl lg:max-w-9xl mx-auto px-4 sm:px-6 md:px-8 mb-4 md:mb-8">
      <div className="relative overflow-hidden md:overflow-visible rounded-lg md:rounded-none py-16 md:py-20 lg:py-28">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-100 scale-110 md:scale-125"
        >
          <source src="/Comp 1_5.mp4" type="video/mp4" />
        </video>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/60 via-transparent to-[#0d0d0d]/60" />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2
            className="text-white font-bold mb-4 md:mb-6"
            style={{
              fontFamily: 'Arial',
              fontSize: 'clamp(28px, 8vw, 48px)',
              lineHeight: '1.2',
              letterSpacing: '1px',
              margin: '0 0 1rem 0'
            }}
          >
            A New Class of Power
          </h2>
          <p
            className="text-white/70 text-xs sm:text-sm md:text-sm lg:text-base"
            style={{
              fontFamily: 'Arial',
              fontWeight: 400,
              lineHeight: '1.4',
              margin: 0
            }}
          >
            Chemically restored. Technically validated. Warranty-backed.
          </p>
        </div>
      </div>
    </div>
  )
}
