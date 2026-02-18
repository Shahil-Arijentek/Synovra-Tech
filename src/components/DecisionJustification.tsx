import type { ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import {
  IconClipboardCheck,
  IconCoin,
  IconGauge,
  IconShieldCheck
} from '@tabler/icons-react'

export function FeaturesSectionWithHoverEffects() {
  const navigate = useNavigate()
  const headingRef = useRef(null)
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.8 })
  const ctaSectionRef = useRef(null)
  const isCtaInView = useInView(ctaSectionRef, { once: true, amount: 0.5 })

  const features = [
    {   
      title: 'Higher Payouts',
      description: 'Value recovered twice — through revival today and materials tomorrow.',
      icon: <IconCoin className="h-7 w-7 md:h-8 md:w-8" />
    },
    {
      title: 'Faster Cash Flow',
      description: 'Predictable payouts issued days after pickup, not weeks later.',
      icon: <IconGauge className="h-7 w-7 md:h-8 md:w-8" />
    },
    {
      title: 'Zero Operational Burden',
      description: 'No testing, sorting, or storage. We handle the entire afterlife.',
      icon: <IconClipboardCheck className="h-7 w-7 md:h-8 md:w-8" />
    },
    {
      title: 'ESG Advantage',
      description: 'Lower emissions, full traceability, and audit-ready reporting — built in.',
      icon: <IconShieldCheck className="h-7 w-7 md:h-8 md:w-8" />
    }
  ]

  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 md:py-28 pb-32 md:pb-40 text-white sm:px-6 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-black" />
      {/* Fade to #0d0d0d at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0d0d0d] pointer-events-none z-10" />
      <div className="relative mx-auto w-full" style={{ maxWidth: '64rem' }}>
        <div ref={headingRef} className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.3,
              ease: [0.19, 1, 0.22, 1]
            }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Decision Justification
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.7,
              ease: [0.19, 1, 0.22, 1]
            }}
            className="mt-4 text-xl md:text-2xl font-bold text-white/60"
          >
            (Why Partner Now)
          </motion.p>
        </div>
        <div className="mt-10 md:mt-12 grid grid-cols-1 gap-0 border border-white/10 md:grid-cols-2">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
      <section className="bg-black px-6 py-16 md:py-20 text-white">
        <div className="mx-auto flex w-full max-w-[82.5rem] justify-center">
          <motion.div 
            ref={ctaSectionRef}
            initial={{ opacity: 0, y: 60 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="flex w-full max-w-[73.75rem] flex-col items-center gap-6 md:gap-8 rounded-[1.5rem] border border-white/10 bg-black/80 backdrop-blur-sm px-6 py-10 md:px-12 md:py-[3.063rem] text-center"
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="text-[1.375rem] md:text-[1.5rem] font-bold leading-tight text-white"
            >
              No Sorting. No Guesswork. No Missed Value.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
              className="max-w-[45rem] text-[1rem] md:text-[1.125rem] font-medium md:font-bold leading-relaxed text-white/70"
            >
              We collect mixed loads — any chemistry, age, or condition — so your team never spends
              time testing, grading, or preparing units.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
            >
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/get-started')}
                className="h-[3.25rem] md:h-[3.625rem] w-full sm:w-auto rounded-[0.25rem] bg-[#ff6b1a] px-8 text-[1.0625rem] md:text-[1.125rem] font-bold text-[#0d0d0d] transition-all duration-300 will-change-[box-shadow] hover:bg-[#ff6b1a]/90 shadow-[0_0_15px_rgba(255,107,26,0.4),0_0_30px_rgba(255,107,26,0.2)] hover:shadow-[0_0_20px_rgba(255,107,26,0.5),0_0_40px_rgba(255,107,26,0.25)]"
              >
                Partner With Us
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/get-started')}
                className="h-[3.25rem] md:h-[3.625rem] w-full sm:w-auto rounded-[0.25rem] border border-white/20 bg-[#191919] px-8 text-[1.0625rem] md:text-[1.125rem] font-bold text-white transition-colors hover:bg-white hover:text-black"
              >
                Book a Pickup
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </section>
  )
}

function Feature({
  title,
  description,
  icon,
  index
}: {
  title: string
  description: string
  icon: ReactNode
  index: number
}) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })
  
  const isLeft = index % 2 === 0
  
  return (
    <motion.article 
      ref={cardRef}
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -20 : 20 }}
      transition={{ 
        duration: 1.5,
        delay: index * 0.15,
        ease: [0.33, 1, 0.68, 1]
      }}
      className="group relative border border-white/10 px-7 py-11 md:px-9 md:py-16 transition"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
      </div>
      <div className="absolute left-0 top-14 h-10 w-1 origin-center rounded-r-full bg-orange-500/60 transition-all duration-300 group-hover:h-14 group-hover:bg-orange-500" />
      <div className="relative z-10 flex flex-col gap-6 md:gap-8">
        <div className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border border-orange-500/40 text-orange-500 transition-all duration-300 group-hover:border-orange-500 group-hover:shadow-[0_0_20px_rgba(255,107,26,0.3)]">
          {icon}
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-semibold transition-transform duration-300 group-hover:translate-x-2">
            {title}
          </h3>
          <p className="mt-2 max-w-md text-sm md:text-base text-white/70 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.article>
  )
}
