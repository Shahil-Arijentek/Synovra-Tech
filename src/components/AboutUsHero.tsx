import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AboutUsHero() {
  const contentRef = useRef(null)
  const isInView = useInView(contentRef, { once: true, amount: 0.3 })

  return (
    <section className="relative w-full min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
      <div ref={contentRef} className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{
            duration: 1.2,
            delay: 0.2,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="mb-6 sm:mb-8 flex justify-center"
        >
          <img 
            src="/logo.png" 
            alt="Synovra Logo" 
            className="w-24 h-auto sm:w-32 md:w-40 lg:w-44"
          />
        </motion.div>

        {/* Company Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1.2,
            delay: 0.5,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.2em] sm:tracking-[0.3em] mb-8 sm:mb-10 md:mb-12" 
          style={{ color: '#FF6B35' }}
        >
          SYNOVRA
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1.2,
            delay: 0.9,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto px-2 sm:px-4"
        >
          Building the world's first full-stack battery afterlife infrastructure — transforming end-of-life
          batteries into renewed assets through revival, repurposing, and responsible recycling
        </motion.p>
      </div>
    </section>
  )
}
