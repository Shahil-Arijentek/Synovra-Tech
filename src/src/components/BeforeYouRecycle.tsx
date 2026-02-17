import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function BeforeYouRecycle() {
  const [isMounted, setIsMounted] = useState(false)
  const headingRef = useRef(null)
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.3 })

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black z-[320] py-12 md:py-0 transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/beforeyourecycle.webm" type="video/webm" />
      </video>

      {/* Content */}
      <div ref={headingRef} className="relative z-[2] text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="text-white mb-6 md:mb-8"
        >
          <span 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            style={{
              fontFamily: 'Arial',
              letterSpacing: '-1px'
            }}
          >
            Before you recycle — revive.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1.2,
            delay: 0.7,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="text-white/90 mb-8 md:mb-12 text-sm sm:text-base md:text-base lg:text-lg"
          style={{
            fontFamily: 'Arial',
            fontWeight: 400,
            lineHeight: '28px',
            maxWidth: '700px',
            margin: '0 auto 32px'
          }}
        >
          Join us in building the world's first true battery afterlife — where every unit
          is revived, tracked, and only recycled when no life remains.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1.2,
            delay: 1.1,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-[#ff6b1a] hover:bg-[#ff6b1a]/90 text-white font-medium text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 will-change-[box-shadow] shadow-[0_0_15px_rgba(255,107,26,0.4),0_0_30px_rgba(255,107,26,0.2)] hover:shadow-[0_0_20px_rgba(255,107,26,0.5),0_0_40px_rgba(255,107,26,0.25)]"
          >
            Book a Revival Pickup
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-lg border border-white/20 bg-[#191919] text-white font-medium text-base md:text-lg transition-all duration-300 hover:bg-white hover:text-black"
          >
            Start Earning More Per Battery
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
