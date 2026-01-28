export default function BusinessImpact() {
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
    <section className="bg-[#0d0d0d] py-12 md:py-20 px-4 sm:px-6 md:px-8 font-sans text-white relative z-[310] -mt-8 md:-mt-[20vh]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10 md:mb-16">
          Business Impact
        </h2>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto">
          {/* Table Headers */}
          <div className="grid grid-cols-2 border-b border-[#333]">
            <div className="bg-[#0d0d0d] p-4 sm:p-6 md:p-12 border-r border-[#333]">
              <h3 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                Recycling Model
              </h3>
            </div>
            <div className="bg-[#0d0d0d] p-4 sm:p-6 md:p-12">
              <h3 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#FF6B1A]">
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
                <p className="text-xs sm:text-base md:text-lg lg:text-xl text-white/90">
                  {row.recycling}
                </p>
              </div>
              <div className="bg-[#0d0d0d] p-4 sm:p-6 md:p-12 flex items-center">
                <p className="text-xs sm:text-base md:text-lg lg:text-xl text-white/90">
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
  