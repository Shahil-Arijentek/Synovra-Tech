

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
      <div className="relative z-10 mx-auto max-w-[1200px] pt-[160px] md:pt-[140px] pb-[20px] md:pb-[120px] px-6 text-center">
        <p className="hero-top-text mb-2">
          EVERY BATTERY DESERVES
        </p>
        <div className="max-w-[340px] md:max-w-none mx-auto">
          <div className="afterlife-scale-wrapper">
            <p
              className="afterlife-animation text-[60px] sm:text-[11vw] lg:text-[155px] font-normal tracking-[0.02em] leading-none uppercase max-w-[1240px] mx-auto w-full relative z-0"
              data-text="AN AFTERLIFE"
            >
              AN AFTERLIFE
            </p>
          </div>

          <div className="relative -mt-[30px] sm:-mt-[100px] md:-mt-[220px] lg:-mt-[240px] flex justify-center z-10 pointer-events-none">
            <div className="w-full md:w-[1400px] max-w-full aspect-[4/3] scale-[1.3] sm:scale-[1.5] md:scale-100 origin-center">
              <video
                ref={videoRef}
                className="h-full w-full object-contain mix-blend-screen"
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

