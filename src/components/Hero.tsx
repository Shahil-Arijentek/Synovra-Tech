

import { useEffect, useRef } from 'react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(console.error)
    const timer = setTimeout(() => {
      video.pause()
    }, 3000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <section className="relative bg-black overflow-hidden min-h-[900px] text-white">
      <div className="relative z-10 mx-auto max-w-[1200px] pt-[140px] pb-[120px] px-6 text-center">
        <p className="text-[38px] md:text-[42px] font-black font-['Arial'] tracking-[2px] uppercase">
          EVERY BATTERY DESERVES
        </p>
        <p
          className="afterlife-animation -mt-[18px] text-[12vw] lg:text-[135px] font-extrabold tracking-[1px] leading-[1.1] uppercase max-w-[1240px] mx-auto w-full relative z-0"
          data-text="AN  AFTERLIFE"
        >
          AN AFTERLIFE
        </p>

        <div className="relative -mt-[220px] flex justify-center z-10">
          <div className="w-[1400px] max-w-full aspect-[4/3]">
            <video
              ref={videoRef}
              className="h-full w-full object-contain"
              muted
              playsInline
            >
              <source src="/mainbattery.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}

