import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ProofNotPromises() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.3 })
  const [isMounted, setIsMounted] = React.useState(false)

  // Ensure scroll is always enabled
  useEffect(() => {
    // Make sure body is scrollable
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''

    // Mount with delay for smooth fade-in
    const timer = setTimeout(() => setIsMounted(true), 100)

    // Cleanup on unmount
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  const barVariants = {
    initial: { width: 0 },
    animate: { 
      width: '75%',
      transition: { duration: 5, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  }

  const shortBarVariants = {
    initial: { width: 0 },
    animate: { 
      width: '20%',
      transition: { duration: 5, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  }

  return (
    <div className={`relative overflow-hidden md:overflow-visible transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`} style={{ marginTop: '-3200px' }}>
      <section ref={sectionRef} className="py-8 md:py-12 px-4 sm:px-6 md:px-8 pb-32 md:pb-12 font-sans text-white sticky top-0 z-[105] overflow-hidden md:overflow-visible" style={{ backgroundColor: '#0d0d0d' }}>
        <div className="max-w-[87.5rem] mx-auto overflow-hidden md:overflow-visible">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-6 md:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.19, 1, 0.22, 1]
            }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
          >
            The Proof in Numbers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 1.2,
              delay: 0.7,
              ease: [0.19, 1, 0.22, 1]
            }}
            className="text-sm sm:text-base md:text-base lg:text-lg text-white/70 max-w-3xl mx-auto px-4"
          >
            Revival keeps capacity in service and delays smelting — reducing emissions by up to 90%.
          </motion.p>
        </div>

        {/* Comparison Bars */}
        <div className="max-w-4xl mx-auto mb-4 md:mb-10 space-y-4 md:space-y-8">
          {/* Recycling Only */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 px-2">Recycling Only</h3>
            <div className="w-full bg-[#0d0d0d] rounded-[0.75rem] overflow-hidden p-[0.125rem]">
              <motion.div
                className="bg-[#FF6B1A] rounded-[0.625rem] p-4 md:p-6 h-full flex items-center"
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                variants={barVariants}
              >
                <p className="text-lg sm:text-xl md:text-2xl font-bold whitespace-nowrap text-white">
                  10.0 kg CO<sub>2</sub>
                </p>
              </motion.div>
            </div>
          </div>

          {/* Revival First, Then Recycle */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 px-2">Revival First, Then Recycle</h3>
            <div className="w-full bg-[#0d0d0d] rounded-[0.75rem] overflow-hidden p-[0.125rem]">
              <motion.div
                className="bg-[#FF6B1A] rounded-[0.625rem] p-4 md:p-6 h-full flex items-center"
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                variants={shortBarVariants}
              >
                <p className="text-lg sm:text-xl md:text-2xl font-bold whitespace-nowrap text-white">
                  1.2 kg CO<sub>2</sub>
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Text - Hidden on mobile, shown on desktop */}
        <div className="text-center mb-6 md:mb-6 hidden md:block">
          <p className="text-sm sm:text-base md:text-base lg:text-lg text-white/70 max-w-2xl mx-auto px-4">
            Revival keeps capacity in service and delays smelting — cutting emissions by up to 90%.
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="hidden md:flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
          <button className="w-full sm:w-auto bg-[#ff6b1a] text-white font-medium text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg">
            See Your CO<sub>2</sub> Savings
          </button>
          <button className="w-full sm:w-auto bg-white text-black font-medium text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg">
            Book a Revival Pickup
          </button>
        </div>
      </div>
      </section>
    </div>
  )
}
