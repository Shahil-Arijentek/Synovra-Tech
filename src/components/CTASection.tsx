import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CTASection() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const isContentInView = useInView(contentRef, { once: true, amount: 0.3 })

  return (
    <section ref={sectionRef} className="relative w-full h-[28.13rem] sm:h-[37.5rem] md:h-[43.75rem] overflow-hidden flex items-center justify-center bg-black">
      {/* Video Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={isSectionInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/beforeyourecycle.webm" type="video/webm" />
        </video>
      </motion.div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="text-white text-center mb-6 sm:mb-10 md:mb-12 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight sm:leading-snug px-2"
        >
          Ready to Give Your Batteries a Second Life?
        </motion.h2>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1.5,
            delay: 1,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
        >
          {/* Get in Touch Button  */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#ff6b1a] text-black font-semibold px-6 sm:px-10 py-2.5 sm:py-4 rounded-full text-sm sm:text-lg transition-all duration-300 will-change-[box-shadow] shadow-[0_0_15px_rgba(255,107,26,0.4),0_0_30px_rgba(255,107,26,0.2)] hover:shadow-[0_0_20px_rgba(255,107,26,0.5),0_0_40px_rgba(255,107,26,0.25)] hover:bg-[#ff6b1a]/90 w-full sm:w-auto sm:min-w-[11.25rem] max-w-[15rem] sm:max-w-[17.5rem]"
          >
            Get in Touch
          </motion.button>

          {/* Learn More Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-semibold px-6 sm:px-10 py-2.5 sm:py-4 rounded-full text-sm sm:text-lg transition-all duration-300 w-full sm:w-auto sm:min-w-[11.25rem] max-w-[15rem] sm:max-w-[17.5rem]"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
