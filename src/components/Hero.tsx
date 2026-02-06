

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
    <section className="relative bg-black overflow-hidden min-h-[500px] sm:min-h-[550px] md:min-h-[650px] lg:min-h-[800px] xl:min-h-[900px] text-white">
      {/* Bottom Gradient Fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none z-20" style={{
        background: 'linear-gradient(to bottom, transparent 0%, #000000 100%)'
      }} />

      <div className="relative z-10 mx-auto max-w-[1600px] pt-[150px] xs:pt-[170px] sm:pt-[160px] md:pt-[110px] lg:pt-[100px] xl:pt-[110px] pb-[20px] sm:pb-[30px] md:pb-[50px] lg:pb-[80px] xl:pb-[120px] px-4 sm:px-5 md:px-6 text-center">
        <p className="hero-top-text mb-6 sm:mb-8 md:mb-4">
          EVERY BATTERY DESERVES
        </p>
        <div className="w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-4 xl:px-0 mt-3 sm:mt-0">
          <div className="afterlife-scale-wrapper">
            <p
              className="afterlife-animation font-normal tracking-[0.02em] leading-none uppercase relative z-0"
              data-text="AN AFTERLIFE"
            >
              AN AFTERLIFE
            </p>
          </div>

          <div className="relative -mt-4 sm:-mt-[20px] md:-mt-[40px] lg:-mt-[80px] xl:-mt-[130px] flex justify-center items-center z-10 pointer-events-none">
            <div className="w-full sm:w-[92%] md:w-[88%] lg:w-[90%] xl:w-[1400px] max-w-full scale-[1.1] sm:scale-[1.2] md:scale-[1.2] lg:scale-[1.05] xl:scale-100 origin-center flex justify-center items-center">
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

