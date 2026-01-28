import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ProofNotPromises() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  // Ensure scroll is always enabled
  useEffect(() => {
    // Make sure body is scrollable
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  const barAnimation = {
    initial: { width: 0 },
    animate: { width: '75%' },
    transition: { duration: 5, ease: [0.25, 0.1, 0.25, 1] }
  }

  const shortBarAnimation = {
    initial: { width: 0 },
    animate: { width: '55%' },
    transition: { duration: 5, ease: [0.25, 0.1, 0.25, 1] }
  }

  return (
    <div className="relative" style={{ marginTop: '-3200px' }}>
      <section ref={sectionRef} className="bg-black py-12 px-8 font-sans text-white sticky top-0 z-[105]">
        <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            The Proof in Numbers
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Revival keeps capacity in service and delays smelting — reducing emissions by up to 90%.
          </p>
        </div>

        {/* Comparison Bars */}
        <div className="max-w-4xl mx-auto mb-10 space-y-8">
          {/* Recycling Only */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recycling Only</h3>
            <div className="w-full bg-black rounded-[12px] overflow-hidden p-[2px]">
              <motion.div
                className="bg-[#FF6B1A] rounded-[10px] p-8 h-full flex items-center"
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                variants={barAnimation}
              >
                <p className="text-3xl font-bold text-white">
                  10.0 kg CO<sub>2</sub>
                </p>
              </motion.div>
            </div>
          </div>

          {/* Revival First, Then Recycle */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Revival First, Then Recycle</h3>
            <div className="w-full bg-black rounded-[12px] overflow-hidden p-[2px]">
              <motion.div
                className="bg-[#FF6B1A] rounded-[10px] p-8 h-full flex items-center"
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                variants={shortBarAnimation}
              >
                <p className="text-3xl font-bold whitespace-nowrap text-white">
                  1.2 kg CO<sub>2</sub>
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mb-6">
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Revival keeps capacity in service and delays smelting — cutting emissions by up to 90%.
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-[#ff6b1a] hover:bg-[#ff7a2e] text-white font-medium text-lg px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap">
            See Your CO<sub>2</sub> Savings
          </button>
          <button className="bg-white hover:bg-gray-100 text-black font-medium text-lg px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap">
            Book a Revival Pickup
          </button>
        </div>
      </div>
      </section>
    </div>
  )
}
