import type { ReactNode } from 'react'

import {
  IconClipboardCheck,
  IconCoin,
  IconGauge,
  IconShieldCheck
} from '@tabler/icons-react'

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {   
      title: 'Higher Payouts',
      description: 'Value recovered twice — through revival today and materials tomorrow.',
      icon: <IconCoin className="h-6 w-6" />
    },
    {
      title: 'Faster Cash Flow',
      description: 'Predictable payouts issued days after pickup, not weeks later.',
      icon: <IconGauge className="h-6 w-6" />
    },
    {
      title: 'Zero Operational Burden',
      description: 'No testing, sorting, or storage. We handle the entire afterlife.',
      icon: <IconClipboardCheck className="h-6 w-6" />
    },
    {
      title: 'ESG Advantage',
      description: 'Lower emissions, full traceability, and audit-ready reporting — built in.',
      icon: <IconShieldCheck className="h-6 w-6" />
    }
  ]

  return (
    <section className="relative overflow-hidden bg-[#0d0d0d] px-6 py-20 text-white sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[#0d0d0d]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Decision Justification
          </h2>
          <p className="mt-3 text-lg font-bold text-white/60">(Why Partner Now)</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-0 border border-white/10 md:grid-cols-2">
          {features.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Feature({
  title,
  description,
  icon
}: {
  title: string
  description: string
  icon: ReactNode
}) {
  return (
    <article className="group relative border border-white/10 px-10 py-12 transition">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
      </div>
      <div className="absolute left-0 top-10 h-10 w-1 origin-center rounded-r-full bg-orange-500/60 transition-all duration-200 group-hover:h-14 group-hover:bg-orange-500" />
      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/40 text-orange-500">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-semibold transition-transform duration-200 group-hover:translate-x-2">
            {title}
          </h3>
          <p className="mt-3 max-w-md text-sm text-white/70">{description}</p>
        </div>
      </div>
    </article>
  )
}
