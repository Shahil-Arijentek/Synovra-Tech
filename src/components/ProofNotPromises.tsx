import { useState, useEffect, useRef } from 'react'

interface Metric {
  icon: React.ReactNode
  value: string
  label: string
  numericValue: number
  suffix?: string
  prefix?: string
}

export default function ProofNotPromises() {
  const metrics: Metric[] = [
    { icon: <img src="/proof-not-promises/Icon1.svg" alt="CO₂ Saved" className="w-5 h-5" />, value: '12.4M kg', label: 'CO₂ Saved', numericValue: 12.4, suffix: 'M kg' },
    { icon: <img src="/proof-not-promises/Icon2.svg" alt="Cost Saved" className="w-5 h-5" />, value: '$47.3M', label: 'Cost Saved', numericValue: 47.3, prefix: '$', suffix: 'M' },
    { icon: <img src="/proof-not-promises/Icon3.svg" alt="Batteries Recovered" className="w-5 h-5" />, value: '542k', label: 'Batteries Recovered', numericValue: 542, suffix: 'k' },
    { icon: <img src="/proof-not-promises/Icon4.svg" alt="Waste Prevented" className="w-5 h-5" />, value: '89.2k tons', label: 'Waste Prevented', numericValue: 89.2, suffix: 'k tons' },
    { icon: <img src="/proof-not-promises/Icon5.svg" alt="Carbon Credits Earned" className="w-5 h-5" />, value: '3,280', label: 'Carbon Credits Earned', numericValue: 3280 },
    { icon: <img src="/proof-not-promises/Icon6.svg" alt="Warranty Extensions Issued" className="w-5 h-5" />, value: '428k', label: 'Warranty Extensions Issued', numericValue: 428, suffix: 'k' },
  ]

  const tickerData = ['Cycle #278', '12.6V', 'Lead Recovery 95%', 'Carbon Credit: $42.13', 'Waste Prevented 22kg']

  return (
    <section className="bg-black py-20 px-8 overflow-hidden font-sans text-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="text-white text-[48px] md:text-[60px] font-black leading-tight tracking-tight">
            Proof, Not Promises — All Verifiable in Our System
          </h2>
        </div>
        
        {/* Subtitle */}
        <div className="text-center mb-16">
          <p className="text-[18px] text-white/70">
            Every battery leaves a trace — in value and in impact.
          </p>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>

        {/* Scrolling Ticker (Simplified CSS) */}
        <div className="relative h-12 mb-12 overflow-hidden bg-white/5 flex items-center">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
          
          <div className="flex animate-scroll whitespace-nowrap items-center">
            {[...tickerData, ...tickerData, ...tickerData].map((item, i) => (
              <div key={i} className="flex items-center px-6">
                <span className="text-white/70 font-medium mr-4">{item}</span>
                <div className="w-2 h-2 bg-[#ff6b1a] rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-[18px] text-white/70 mb-6">
            See Your Potential Impact — Request a Custom Report
          </p>
          <button className="bg-[#ff6b1a] h-[58px] rounded-[6px] px-10 text-white font-bold text-[18px] border-none cursor-pointer transition-all hover:bg-[#ff6b1a]/90 shadow-[0_0_20px_rgba(255,107,26,0.6)] hover:shadow-[0_0_30px_rgba(255,107,26,0.8)]">
            Request Custom Report
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  )
}

function MetricCard({ metric }: { metric: Metric }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const end = metric.numericValue
    const duration = 2000
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(start + (end - start) * easeOutQuart)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isVisible, metric.numericValue])

  const formatNumber = (num: number) => {
    const isDecimal = metric.suffix?.includes('M') || metric.suffix?.includes('k')
    return isDecimal ? num.toFixed(1) : Math.floor(num).toLocaleString()
  }

  return (
    <div 
      ref={cardRef}
      className="bg-[#0f0f0f] rounded-[20px] p-8 min-h-[220px] flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 border border-white/10"
      style={{
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.5)'
      }}
    >
      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
        {metric.icon}
      </div>
      
      <div>
        <h3 className="text-[32px] font-bold text-white leading-none mb-2">
          {metric.prefix}{formatNumber(count)}{metric.suffix}
        </h3>
        <p className="text-[15px] text-white/60 font-medium">
          {metric.label}
        </p>
      </div>
    </div>
  )
}