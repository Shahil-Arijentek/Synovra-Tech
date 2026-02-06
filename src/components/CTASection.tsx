import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CTASection() {
  const contentRef = useRef(null)
  const isInView = useInView(contentRef, { once: true, amount: 0.3 })

  return (
    <section className="relative w-full h-[450px] sm:h-[600px] md:h-[700px] overflow-hidden flex items-center justify-center bg-black">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/beforeyourecycle.webm" type="video/webm" />
      </video>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="text-white text-center mb-6 sm:mb-10 md:mb-12 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight sm:leading-snug px-2"
        >
          Ready to Give Your Batteries a Second Life?
        </motion.h2>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1.2,
            delay: 0.7,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
        >
          {/* Get in Touch Button - Orange */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#ff6b1a] text-black font-semibold px-6 sm:px-10 py-2.5 sm:py-4 rounded-full text-sm sm:text-lg transition-all duration-300 will-change-[box-shadow] shadow-[0_0_15px_rgba(255,107,26,0.4),0_0_30px_rgba(255,107,26,0.2)] hover:shadow-[0_0_20px_rgba(255,107,26,0.5),0_0_40px_rgba(255,107,26,0.25)] hover:bg-[#ff6b1a]/90 w-full sm:w-auto sm:min-w-[180px] max-w-[240px] sm:max-w-[280px]"
          >
            Get in Touch
          </motion.button>

          {/* Learn More Button - Outlined */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-semibold px-6 sm:px-10 py-2.5 sm:py-4 rounded-full text-sm sm:text-lg transition-all duration-300 w-full sm:w-auto sm:min-w-[180px] max-w-[240px] sm:max-w-[280px]"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
