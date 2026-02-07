import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SECTION_BG = '#000000'
const BOX_BG = 'rgba(26, 26, 26, 0.50)'
const ACCENT_ORANGE = '#E67C30'
const BODY_TEXT = '#AAAAAA'

const FEATURES = [
  'Asset-level and network-level energy intelligence',
  'Distributed storage and backup systems',
  'Community-scale and industrial energy resilience',
  'Data-backed performance verification and reporting',
]

function TickIcon() {
  return (
    <span
      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
      style={{ backgroundColor: ACCENT_ORANGE }}
      aria-hidden
    >
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
        <path
          d="M16.6663 5L7.49967 14.1667L3.33301 10"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export default function WhatWeStandFor() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section
      ref={ref}
      className="w-full py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-bold text-white mb-6 md:mb-8"
          style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.2 }}
        >
          A Systems-Led Energy Platform
        </motion.h2>

        {/* Description paragraph - constrained width */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mx-auto mb-10 md:mb-12 text-base sm:text-lg leading-relaxed max-w-6xl"
          style={{ color: BODY_TEXT }}
        >
          Synovra's platform extends beyond individual batteries. It is designed to operate at system scale — enabling distributed energy networks where storage, monitoring, and delivery are coordinated through software and infrastructure.
        </motion.p>

        {/* 2x2 Feature grid + Quote - narrower width for containers */}
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-6 md:mb-8">
            {FEATURES.map((text, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-center gap-4 rounded-xl p-5 md:p-6 min-h-[4.5rem]"
                style={{ backgroundColor: BOX_BG }}
              >
                <TickIcon />
                <span className="text-white text-base sm:text-lg leading-snug">
                  {text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Quote box - orange left border */}
          <motion.blockquote
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-xl pl-5 pr-5 pt-5 pb-5 md:pl-6 md:pr-6 md:pt-6 md:pb-6 border-l-[5px]"
            style={{
              backgroundColor: BOX_BG,
              borderLeftColor: ACCENT_ORANGE,
            }}
          >
            <p className="text-white/95 text-base sm:text-lg leading-relaxed">
              &ldquo;This enables energy to be delivered where generation is inconsistent, grids are constrained, or reliability is critical — using intelligently managed storage assets as part of a larger system.&rdquo;
            </p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  )
}
