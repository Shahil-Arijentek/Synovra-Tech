interface RecordLockCardProps {
  value: string
  status: string
}

export default function RecordLockCard({ value, status }: RecordLockCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 w-[300px] sm:w-[320px] md:w-[420px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[8px] md:text-[10px] font-['Arial',sans-serif] tracking-wider mb-2 md:mb-3">
        RECORD LOCK
      </div>

      {/* Metallic Plate with Text Overlay */}
      <div className="relative w-full h-[140px] sm:h-[150px] md:h-[120px] flex items-center justify-center">
        <img
          src="/cards/decision.png"
          alt="Record Lock Plate"
          className="w-full h-full object-contain"
        />
        
        {/* Text Overlay on Plate */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <div 
            className="text-[#1a1a1a] font-['Arial',sans-serif] font-normal uppercase tracking-wide text-center text-base sm:text-lg md:text-xl"
          >
            {value}
          </div>
          <div 
            className="text-[#1a1a1a] font-['Arial',sans-serif] font-normal uppercase tracking-wide text-center text-xs sm:text-sm md:text-sm"
          >
            {status}
          </div>
        </div>
      </div>
    </div>
  )
}
