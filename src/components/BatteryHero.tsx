import { useState, useEffect } from 'react'

export default function BatteryHero() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src="/Comp 1_6.webm" type="video/webm" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 sm:mb-8 md:mb-10 max-w-[1000px]">
          A system for extending battery life, restoring performance, and closing the materials loop.
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-bold mb-12 sm:mb-16 md:mb-20 tracking-wide">
          BUILT TO DELIVER IT.
        </p>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <h2 className="text-lg sm:text-xl md:text-2xl text-white font-normal">
            Trace the Battery Afterlife
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl">
            Witness the full journey from degradation to certified revival and recycle
          </p>
        </div>
      </div>
    </div>
  )
}
