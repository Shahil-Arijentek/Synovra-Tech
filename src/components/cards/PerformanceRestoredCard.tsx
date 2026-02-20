interface PerformanceRestoredCardProps {
  voltageFrom: string
  voltageTo: string
  resistanceFrom: string
  resistanceTo: string
  healthFrom?: string
  healthTo?: string
}

export default function PerformanceRestoredCard({ 
  voltageFrom, 
  voltageTo, 
  resistanceFrom, 
  resistanceTo,
  healthFrom = '65%',
  healthTo = '95%'
}: PerformanceRestoredCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-[15.815px] p-3 md:p-4 w-[18.75rem] sm:w-[20rem] md:w-[26.25rem] lg:w-[350px] lg:h-[450px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)] flex flex-col items-center">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[0.5rem] md:text-[0.625rem] font-['Arial',sans-serif] tracking-wider mb-2.5 md:mb-3 w-full text-left">
        PERFORMANCE RESTORED
      </div>

      {/* Health Comparison */}
      <div className="mb-2.5 md:mb-3 w-full">
        <div className="flex flex-col items-center gap-1 md:gap-1.5 mb-1 md:mb-1.5">
          <img
            src="/cards/health.svg"
            alt="Health"
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-12 lg:h-12 object-contain"
          />
          <div className="text-[#9CA3AF] text-[0.625rem] sm:text-[0.75rem] md:text-[0.875rem] font-['Arial',sans-serif]">
            Health
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-2.5">
          <span 
            className="text-white text-lg sm:text-xl md:text-2xl lg:text-[2.5rem]"
            style={{
              fontFamily: 'Arial',
              fontStyle: 'normal',
              fontWeight: 600
            }}
          >
            {healthFrom}
          </span>
          <span className="text-white text-sm sm:text-base md:text-lg">→</span>
          <span 
            className="text-lg sm:text-xl md:text-2xl lg:text-[2.5rem] font-['Arial',sans-serif]"
            style={{
              background: 'linear-gradient(141deg, #FF6A00 14.29%, #AF4900 86.47%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Arial',
              fontStyle: 'normal',
              fontWeight: 600
            }}
          >
            {healthTo}
          </span>
        </div>
      </div>

      {/* Voltage Comparison */}
      <div className="mb-2.5 md:mb-3 w-full">
        <div className="flex flex-col items-center gap-1 md:gap-1.5 mb-1 md:mb-1.5">
          <img
            src="/cards/voltage.svg"
            alt="Voltage"
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-12 lg:h-12 object-contain"
          />
          <div className="text-[#9CA3AF] text-[0.625rem] sm:text-[0.75rem] md:text-[0.875rem] font-['Arial',sans-serif]">
            Voltage
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-2.5">
          <span 
            className="text-white text-lg sm:text-xl md:text-2xl lg:text-[2.5rem]"
            style={{
              fontFamily: 'Arial',
              fontStyle: 'normal',
              fontWeight: 600
            }}
          >
            {voltageFrom}
          </span>
          <span className="text-white text-sm sm:text-base md:text-lg">→</span>
          <span 
            className="text-lg sm:text-xl md:text-2xl lg:text-[2.5rem] font-['Arial',sans-serif]"
            style={{
              background: 'linear-gradient(141deg, #FF6A00 14.29%, #AF4900 86.47%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Arial',
              fontStyle: 'normal',
              fontWeight: 600
            }}
          >
            {voltageTo}
          </span>
        </div>
      </div>

      {/* Internal Resistance Comparison */}
      <div className="w-full">
        <div className="flex flex-col items-center gap-1 md:gap-1.5 mb-1 md:mb-1.5">
          <img
            src="/cards/resistance.svg"
            alt="Internal Resistance"
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-12 lg:h-12 object-contain"
          />
          <div className="text-[#9CA3AF] text-[0.625rem] sm:text-[0.75rem] md:text-[0.875rem] font-['Arial',sans-serif]">
            Internal Resistance
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-2.5">
          <span 
            className="text-white text-lg sm:text-xl md:text-2xl lg:text-[2.5rem]"
            style={{
              fontFamily: 'Arial',
              fontStyle: 'normal',
              fontWeight: 600
            }}
          >
            {resistanceFrom}
          </span>
          <span className="text-white text-sm sm:text-base md:text-lg">→</span>
          <span 
            className="text-lg sm:text-xl md:text-2xl lg:text-[2.5rem] font-['Arial',sans-serif]"
            style={{
              background: 'linear-gradient(141deg, #FF6A00 14.29%, #AF4900 86.47%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Arial',
              fontStyle: 'normal',
              fontWeight: 600
            }}
          >
            {resistanceTo}
          </span>
        </div>
      </div>
    </div>
  )
}
