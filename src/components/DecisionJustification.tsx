import type { ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import {
  IconClipboardCheck,
  IconCoin,
  IconGauge,
  IconShieldCheck
} from '@tabler/icons-react'

export function FeaturesSectionWithHoverEffects() {
  const headingRef = useRef(null)
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.8 })

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
