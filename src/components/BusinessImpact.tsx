import { useEffect, useState } from 'react'

export default function BusinessImpact() {
  const [isMounted, setIsMounted] = useState(false)

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
    <section className={`bg-[#0d0d0d] py-12 md:py-20 px-4 sm:px-6 md:px-8 font-sans text-white relative z-[310] transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 md:mb-16">
          Business Impact
        </h2>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto">
          {/* Table Headers */}
          <div className="grid grid-cols-2 border-b border-[#333]">
            <div className="bg-[#0d0d0d] p-4 sm:p-6 md:p-12 border-r border-[#333]">
              <h3 className="text-xs sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
                Recycling Model
              </h3>
            </div>
            <div className="bg-gradient-to-br from-[#2d1a10] to-[#1f1410] p-4 sm:p-6 md:p-12">
              <h3 className="text-xs sm:text-lg md:text-xl lg:text-2xl font-bold text-[#FF6B1A]">
                Synovra Revival-First
              </h3>
            </div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-2 border-b border-[#333] last:border-b-0"
            >
              <div className="bg-[#0d0d0d] p-4 sm:p-6 md:p-12 border-r border-[#333] flex items-center">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90">
                  {row.recycling}
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#2d1a10] to-[#1f1410] p-4 sm:p-6 md:p-12 flex items-center">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90">
                  {row.synovra}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
