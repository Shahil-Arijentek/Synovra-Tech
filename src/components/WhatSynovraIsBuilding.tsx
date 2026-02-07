import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SECTION_BG = '#000000'
const CARD_BG = 'rgba(26, 26, 26, 0.50)'
const ICON_BG = 'rgba(255, 107, 26, 0.10)'
const BODY_TEXT = '#AAAAAA'
const ACCENT_ORANGE = '#FF6B1A'

const CARDS = [
  { icon: '/aboutus/Icon1.svg', text: 'Chemistry-aware diagnostics and system intelligence' },
  { icon: '/aboutus/Icon2.svg', text: 'Controlled restoration and performance normalization' },
  { icon: '/aboutus/Icon3.svg', text: 'Digitally tracked energy assets with verified outcomes' },
  { icon: '/aboutus/Icon4.svg', text: 'Distributed storage and energy delivery systems' },
  { icon: '/aboutus/Icon5.svg', text: 'Compliance-ready recovery and circular reintegration' },
]

export default function WhatSynovraIsBuilding() {
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
          What Synovra Is Building
        </motion.h2>

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mx-auto mb-10 md:mb-12 text-base sm:text-lg leading-relaxed max-w-3xl"
          style={{ color: BODY_TEXT }}
        >
          Synovra is not a service provider operating in isolation. It is building the infrastructure layer for the energy afterlife.
        </motion.p>

        {/* Feature cards row - narrower so each card is less wide */}
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mb-10 md:mb-12">
          {CARDS.map(({ icon, text }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.9, delay: 0.25 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center text-center rounded-xl p-5 md:p-6"
              style={{ backgroundColor: CARD_BG }}
            >
              <motion.span
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 mb-4"
                style={{ backgroundColor: ICON_BG }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.9, delay: 0.35 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <motion.img
                  src={icon}
                  alt=""
                  className="w-6 h-6"
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.45 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </motion.span>
              <p className="text-white text-base sm:text-lg leading-snug">
                {text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Concluding paragraph with orange highlight */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 1, delay: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mx-auto text-base sm:text-lg leading-relaxed max-w-4xl"
          style={{ color: BODY_TEXT }}
        >
          By combining electrochemistry, software, and infrastructure, Synovra enables energy assets to deliver more value, for longer, with greater certainty —{' '}
          <span style={{ color: ACCENT_ORANGE, fontWeight: 'bold' }}>before recovery is ever required.</span>
        </motion.p>
      </div>
    </section>
  )
}
