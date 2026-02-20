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
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center">
            {/* Vector Icon */}
            <div className="flex-shrink-0 mr-3 md:mr-4">
              <img
                src="/cards/Vector.svg"
                alt="Maintenance Icon"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              />
            </div>
            
            {/* Text Content */}
            <div className="text-left">
              <div className="text-black text-xl sm:text-2xl md:text-[2rem] font-['Gemunu_Libre',sans-serif] font-bold uppercase leading-none mb-1">
                {value}
              </div>
              <div className="text-black text-sm sm:text-base md:text-[1rem] font-['Arial',sans-serif] font-normal uppercase leading-none">
                {status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
