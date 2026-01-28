export default function ClassOfPowerHeading() {
  return (
    <div className="max-w-[600px] mx-auto px-4 sm:px-6 md:px-8 mb-4 md:mb-8">
      <div className="relative overflow-hidden rounded-2xl py-10 md:py-14">
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
            className="text-white font-bold mb-3 md:mb-4"
            style={{
              fontFamily: 'Arial',
              fontSize: 'clamp(24px, 6vw, 38px)',
              lineHeight: '1.2',
              letterSpacing: '-0.8px',
              margin: '0 0 0.75rem 0'
            }}
          >
            A New Class of Power
          </h2>
          <p
            className="text-white/70"
            style={{
              fontFamily: 'Arial',
              fontWeight: 400,
              fontSize: 'clamp(11px, 3vw, 13px)',
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
