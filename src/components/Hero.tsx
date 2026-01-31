

import { useEffect, useRef } from 'react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    
    let isCancelled = false
    
    // Wait a tick to ensure DOM is ready
    const timer = setTimeout(() => {
      if (isCancelled || !video) return
      
      const playPromise = video.play()
      
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Silently handle play interruptions
        })
      }
      
      // Pause after 3 seconds
      setTimeout(() => {
        if (!isCancelled && video) {
          video.pause()
        }
      }, 3000)
    }, 100)
    
    return () => {
      isCancelled = true
      clearTimeout(timer)
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    }
  }, [])
  return (
    <section className="relative bg-black overflow-hidden min-h-[500px] md:min-h-[900px] text-white">
      {/* Bottom Gradient Fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none z-20" style={{
        background: 'linear-gradient(to bottom, transparent 0%, #000000 100%)'
      }} />
      
      <div className="relative z-10 mx-auto max-w-[1600px] pt-[160px] md:pt-[110px] pb-[20px] md:pb-[120px] px-6 text-center">
        <p className="hero-top-text mb-2">
          EVERY BATTERY DESERVES
        </p>
        <div className="max-w-[340px] md:max-w-none mx-auto">
          <div className="afterlife-scale-wrapper">
            <p
              className="afterlife-animation text-[80px] sm:text-[14vw] lg:text-[220px] font-normal tracking-[0.02em] leading-none uppercase max-w-[1400px] mx-auto w-full relative z-0"
              data-text="AN AFTERLIFE"
            >
              AN AFTERLIFE
            </p>
          </div>

          <div className="relative mt-0 sm:-mt-[40px] md:-mt-[100px] lg:-mt-[130px] flex justify-center items-center z-10 pointer-events-none">
            <div className="w-full md:w-[1400px] max-w-full scale-[1.3] sm:scale-[1.5] md:scale-100 origin-center flex justify-center items-center">
              <video
                ref={videoRef}
                className="w-full h-auto object-contain mix-blend-screen"
                muted
                playsInline
              >
                <source src="/mainbattery.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

