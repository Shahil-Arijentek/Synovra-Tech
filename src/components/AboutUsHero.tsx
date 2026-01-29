export default function AboutUsHero() {
  return (
    <section className="relative w-full min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <img 
            src="/logo.png" 
            alt="Synovra Logo" 
            className="w-24 h-auto sm:w-32 md:w-40 lg:w-44"
          />
        </div>

        {/* Company Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.2em] sm:tracking-[0.3em] mb-8 sm:mb-10 md:mb-12" 
            style={{ color: '#FF6B35' }}>
          SYNOVRA
        </h1>

        {/* Tagline */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto px-2 sm:px-4">
          Building the world's first full-stack battery afterlife infrastructure — transforming end-of-life
          batteries into renewed assets through revival, repurposing, and responsible recycling
        </p>
      </div>
    </section>
  )
}
