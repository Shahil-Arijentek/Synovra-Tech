interface DecisionCardProps {
  value: string
  status: string
}

export default function DecisionCard({ value, status }: DecisionCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-5 w-[18.75rem] sm:w-[20rem] md:w-[28.5rem] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[0.5rem] md:text-[0.625rem] font-['Arial',sans-serif] tracking-wider mb-2 md:mb-3">
        DECISION
      </div>

      {/* Metallic Plate with Text Overlay */}
      <div className="relative w-full h-[8.75rem] sm:h-[9.375rem] md:h-[9.5rem] mb-2 flex items-center justify-center">
        <img
          src="/cards/decision.png"
          alt="Decision Plate"
          className="w-full h-full object-contain"
        />
        
        {/* Text Overlay on Plate */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0">
          <div 
            className="text-[#1a1a1a] font-['Arial',sans-serif] font-normal uppercase tracking-wide text-center text-lg sm:text-xl md:text-2xl px-4 sm:pr-1 md:pr-2"
          >
            {value}
          </div>
          <div 
            className="text-[#1a1a1a] font-['Arial',sans-serif] font-normal uppercase tracking-wide text-center md:text-right text-xs sm:text-sm md:text-base w-full px-4 sm:pr-30 md:pr-36"
          >
            {status}
          </div>
        </div>
      </div>
    </div>
  )
}
