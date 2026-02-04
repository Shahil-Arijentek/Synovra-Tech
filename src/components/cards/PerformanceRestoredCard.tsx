interface PerformanceRestoredCardProps {
  voltageFrom: string
  voltageTo: string
  resistanceFrom: string
  resistanceTo: string
}

export default function PerformanceRestoredCard({ 
  voltageFrom, 
  voltageTo, 
  resistanceFrom, 
  resistanceTo 
}: PerformanceRestoredCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 w-[300px] sm:w-[320px] md:w-[420px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[8px] md:text-[10px] font-['Arial',sans-serif] tracking-wider mb-3 md:mb-4">
        PERFORMANCE RESTORED
      </div>

      {/* Voltage Comparison */}
      <div className="mb-4 md:mb-6">
        <div className="text-[#9CA3AF] text-[10px] sm:text-[12px] md:text-[14px] font-['Arial',sans-serif] mb-2 text-center">
          Voltage
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <span className="text-white text-xl sm:text-2xl md:text-[40px] font-['Gemunu_Libre',sans-serif] font-normal">
            {voltageFrom}
          </span>
          <span className="text-white text-sm sm:text-base md:text-[24px]">→</span>
          <span className="text-[#FF6B00] text-xl sm:text-2xl md:text-[40px] font-['Gemunu_Libre',sans-serif] font-normal">
            {voltageTo}
          </span>
        </div>
      </div>

      {/* Internal Resistance Comparison */}
      <div>
        <div className="text-[#9CA3AF] text-[10px] sm:text-[12px] md:text-[14px] font-['Arial',sans-serif] mb-2 text-center">
          Internal Resistance
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <span className="text-white text-xl sm:text-2xl md:text-[40px] font-['Gemunu_Libre',sans-serif] font-normal">
            {resistanceFrom}
          </span>
          <span className="text-white text-sm sm:text-base md:text-[24px]">→</span>
          <span className="text-[#FF6B00] text-xl sm:text-2xl md:text-[40px] font-['Gemunu_Libre',sans-serif] font-normal">
            {resistanceTo}
          </span>
        </div>
      </div>
    </div>
  )
}
