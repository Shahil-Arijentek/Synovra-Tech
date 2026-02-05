import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ExperienceRevival() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.8 })

  useEffect(() => {
    return () => {
      // Clean up video on unmount
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.src = ''
      }
    }
  }, [])

  return (
    <section id="lifecycle" className="revival-experience relative flex min-h-[400px] md:min-h-[600px] items-center justify-center overflow-hidden bg-black px-6 text-center text-white sm:px-8 py-12 md:py-20">

      {/* Background Video */}
      <div className="absolute inset-0 h-full w-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-60"
          style={{ mixBlendMode: 'screen' }}
        >
          <source src="/beforeyourecycle.webm" type="video/webm" />
        </video>
        {/* Black overlay to blend video with black background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      </div>

      {/* Content Container */}
      <div ref={containerRef} className="relative z-10 mx-auto w-full max-w-full pointer-events-none px-4 sm:px-6">
        <h2 className="text-center font-['Arial'] font-black leading-[1.1] tracking-tight sm:tracking-tighter md:tracking-[-2.4px] text-white uppercase flex flex-col items-center gap-0" style={{ fontSize: 'clamp(1.25rem, 5vw, 3rem)' }}>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.3,
              ease: [0.19, 1, 0.22, 1]
            }}
            className="whitespace-nowrap"
          >
            Experience Revival.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.7,
              ease: [0.19, 1, 0.22, 1]
            }}
            className="whitespace-nowrap"
          >
            Experience Performance.
          </motion.span>
        </h2>
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ 
            duration: 1.2, 
            delay: 1.1,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="mt-4 sm:mt-6 text-[12px] sm:text-[14px] md:text-[16px] tracking-normal text-white/80 normal-case font-normal mx-auto px-2 sm:whitespace-nowrap max-w-full"
        >
          Redefining battery afterlife with premium, precision-engineered power built to last.
        </motion.p>
      </div>
    </section>
  );
}