
import { useEffect, useRef } from 'react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.load()

    let isCancelled = false

    let pauseTimer: ReturnType<typeof setTimeout> | null = null
    const timer = setTimeout(() => {
      if (isCancelled || !video) return

      const playPromise = video.play()

      if (playPromise !== undefined) {
        playPromise.catch(() => {})
      }

      pauseTimer = setTimeout(() => {
        if (!isCancelled && video) {
          video.pause()
        }
      }, 3000)
    }, 100)

    return () => {
      isCancelled = true
      clearTimeout(timer)
      if (pauseTimer) {
        clearTimeout(pauseTimer)
      }
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    }
  }, [])
  return (
    <section className="relative overflow-hidden min-h-[31.25rem] sm:min-h-[36rem] md:min-h-[40.63rem] lg:min-h-[50rem] xl:min-h-[56.25rem] text-white" style={{ backgroundColor: '#000000' }}>
      <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none z-20" style={{
        background: 'linear-gradient(to bottom, transparent 0%, #000000 100%)'
      }} />

      <div className="relative z-10 mx-auto max-w-[100rem] pt-[9.375rem] xs:pt-[10.63rem] sm:pt-[9rem] md:pt-[7rem] lg:pt-0 lg:-mt-4 xl:pt-[2rem] pb-[1.25rem] sm:pb-[2.25rem] md:pb-[3.125rem] lg:pb-[5rem] xl:pb-[7.5rem] px-4 sm:px-5 md:px-6 text-center overflow-x-hidden">
        <div className="max-w-[78%] sm:max-w-none mx-auto">
          <p className="hero-top-text mb-6 sm:mb-8 md:mb-4 lg:mb-4 lg:-mt-4 xl:mb-0 xl:-mt-8 lg:tracking-[0.3em] text-[clamp(0.9375rem,3vw,1.375rem)] sm:text-[clamp(1.25rem,4vw,2.5rem)]">
            EVERY BATTERY DESERVES
          </p>
        </div>
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-4 xl:px-0 mt-3 sm:mt-0 lg:-mt-4 xl:-mt-6">
          <div className="afterlife-scale-wrapper">
            <p
              className="afterlife-animation font-normal tracking-[0.02em] leading-none uppercase relative z-0 text-[clamp(2.5rem,11vw,4rem)] sm:text-[clamp(3.5rem,12vw,6rem)] md:text-[clamp(4.5rem,13vw,8.5rem)] lg:text-[clamp(5rem,13.75vw,11.75rem)]"
              data-text="AN AFTERLIFE"
            >
              AN AFTERLIFE
            </p>
          </div>

          <div className="relative -mt-4 max-[479px]:mt-0 sm:mt-0 sm:-mt-10 md:-mt-8 lg:-mt-[18rem] xl:-mt-[11rem] flex justify-center items-center z-10 pointer-events-none">
            <div className="w-full sm:w-[90%] md:w-[92%] lg:w-[90%] xl:w-[87.5rem] max-w-full scale-[1.1] sm:scale-[1.15] md:scale-[1.25] lg:scale-[1.05] xl:scale-100 origin-center flex justify-center items-center">
              <video
                ref={videoRef}
                className="w-full h-auto object-contain mix-blend-screen"
                muted
                playsInline
                preload="auto"
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
