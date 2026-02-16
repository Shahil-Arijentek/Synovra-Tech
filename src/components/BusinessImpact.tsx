import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function ComparisonRow({ row, index }: { row: { recycling: string; synovra: string }; index: number }) {
  const rowRef = useRef(null)
  const isRowInView = useInView(rowRef, { once: true, amount: 0.3 })
  
  return (
    <div
      ref={rowRef}
      className="grid grid-cols-2 border-b border-[#333] last:border-b-0"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isRowInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{
          duration: 1.2,
          delay: 0.7 + index * 0.1,
          ease: [0.19, 1, 0.22, 1]
        }}
        className="bg-[#0d0d0d] p-4 sm:p-6 md:p-12 border-r border-[#333] flex items-center"
      >
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90">
          {row.recycling}
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isRowInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{
          duration: 1.2,
          delay: 0.7 + index * 0.1,
          ease: [0.19, 1, 0.22, 1]
        }}
        className="bg-gradient-to-br from-[#2d1a10] to-[#1f1410] p-4 sm:p-6 md:p-12 flex items-center"
      >
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90">
          {row.synovra}
        </p>
      </motion.div>
    </div>
  )
}

export default function BusinessImpact() {
  const [isMounted, setIsMounted] = useState(false)
  const headingRef = useRef(null)
  const tableHeaderRef = useRef(null)
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.3 })
  const isTableHeaderInView = useInView(tableHeaderRef, { once: true, amount: 0.3 })

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const comparisonData = [
    {
      recycling: "Scrap value only",
      synovra: "Higher guaranteed payout"
    },
    {
      recycling: "Rigid pickup schedules",
      synovra: "Flexible, no-prep pickups"
    },
    {
      recycling: "Warehouses filled with scrap",
      synovra: "Faster turnover, free storage space"
    },
    {
      recycling: "Labor spent testing & sorting",
      synovra: "Synovra handles logistics end-to-end"
    }
  ]

  return (
    <section className={`bg-[#0d0d0d] py-20 md:py-28 px-4 sm:px-6 md:px-8 font-sans text-white relative z-[310] transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-[87.5rem] mx-auto">
        {/* Header */}
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-8 md:mt-12 mb-10 md:mb-16"
        >
          Business Impact
        </motion.h2>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto">
          {/* Table Headers */}
          <div ref={tableHeaderRef} className="grid grid-cols-2 border-b border-[#333]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isTableHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.19, 1, 0.22, 1]
              }}
              className="bg-[#0d0d0d] p-4 sm:p-6 md:p-12 border-r border-[#333]"
            >
              <h3 className="text-xs sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
                Recycling Model
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isTableHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.19, 1, 0.22, 1]
              }}
              className="bg-gradient-to-br from-[#2d1a10] to-[#1f1410] p-4 sm:p-6 md:p-12"
            >
              <h3 className="text-xs sm:text-lg md:text-xl lg:text-2xl font-bold text-[#FF6B1A]">
                Synovra Revival-First
              </h3>
            </motion.div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((row, index) => (
            <ComparisonRow key={index} row={row} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
