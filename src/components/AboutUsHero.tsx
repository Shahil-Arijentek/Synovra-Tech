import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ORANGE = '#FF6600'

export default function AboutUsHero() {
  const contentRef = useRef(null)
  const isInView = useInView(contentRef, { once: true, amount: 0.2 })

  return (
    <section className="relative w-full min-h-screen bg-black flex items-center overflow-x-hidden px-4 pt-[7.5rem] pb-12 sm:px-6 sm:pt-36 sm:pb-16 md:pt-40 lg:px-12 lg:pt-20 lg:pb-20 xl:px-16">
      <div
        ref={contentRef}
        className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,36rem)_auto] gap-6 sm:gap-10 md:gap-12 lg:gap-8 xl:gap-10 items-center min-w-0"
      >
        {/* Left: Text content - on mobile appears below logo so both sit under navbar */}
        <div className="flex flex-col min-w-0 w-full max-w-[32rem] lg:max-w-[36rem] order-2 lg:order-1">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl leading-tight font-bold text-left mb-5 sm:mb-6 md:mb-8 sm:text-4xl md:text-5xl lg:text-6xl xl:text-[60px]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <span className="text-white">Engineering the</span>
            <br />
            <span
              style={{
                fontFamily: 'Arial',
                fontSize: 'clamp(1.75rem, 5vw, 60px)',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '105%',
                letterSpacing: 'clamp(-2px, -0.4vw, -1.786px)',
                background: 'linear-gradient(149deg, #FF6B1A 41.88%, #8C3100 90.04%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Energy Afterlife
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed text-left mb-4 sm:mb-5"
          >
            Synovra is an energy technology company building the systems that govern what happens after energy assets are deployed — how they are monitored, restored, redeployed, networked, and ultimately reintegrated into the energy ecosystem.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed text-left mb-4 sm:mb-5"
          >
            We design and operate data-driven energy afterlife infrastructure that connects electrochemistry, diagnostics, digital systems, logistics, and compliant material recovery into a single, auditable platform.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed text-left"
          >
            Our work transforms batteries from isolated hardware into managed energy assets — traceable, performance-verified, and continuously optimized across their usable life.
          </motion.p>
        </div>

        {/* Right: Logo + company name - on mobile first (right under navbar) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center justify-center min-w-0 shrink-0 order-1 lg:order-2"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 12 }}
            transition={{ duration: 1.3, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-3 sm:mb-4"
          >
            <img
              src="/logo.png"
              alt="Synovra Logo"
              className="w-24 h-auto sm:w-28 md:w-32 lg:w-40 xl:w-44 2xl:w-48 object-contain"
            />
          </motion.div>
          <span
            className="text-2xl font-bold tracking-[0.15em] sm:text-3xl sm:tracking-[0.2em] md:text-4xl md:tracking-[0.25em] lg:text-5xl uppercase whitespace-nowrap"
            style={{ color: ORANGE }}
          >
            SYNOVRA
          </span>
        </motion.div>
      </div>
    </section>
  )
}
