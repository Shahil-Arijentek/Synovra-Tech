export default function ClassOfPowerHeading() {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-8 mb-4 md:mb-8">
      <div className="relative overflow-hidden rounded-2xl py-20 md:py-28">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-100 scale-150"
        >
          <source src="/Comp 1_5.mp4" type="video/mp4" />
        </video>

        {/* Content */}
        <div className="relative z-10 text-center">
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
            className="text-white/70 text-sm sm:text-base md:text-base lg:text-lg"
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
