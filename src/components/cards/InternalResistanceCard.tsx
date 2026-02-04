interface InternalResistanceCardProps {
  value: string
  status: string
}

export default function InternalResistanceCard({ value, status }: InternalResistanceCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 w-[130px] sm:w-[140px] md:w-[210px] h-[140px] sm:h-[150px] md:h-[235px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)] flex flex-col">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[8px] md:text-[10px] font-['Arial',sans-serif] tracking-wider mb-1 md:mb-2">
        INTERNAL RESISTANCE
      </div>

      {/* Image Visualization - Cylindrical Battery */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden mb-1 md:mb-2">
        <img
          src="/cards/internalresistance.png"
          alt="Internal Resistance"
          className="w-full h-full object-contain scale-125"
        />
      </div>

      {/* Bottom Info Bar */}
      <div className="flex items-center justify-between mt-auto">
        {/* Value */}
        <div className="text-white text-xs md:text-base font-['Arial',sans-serif] font-medium">
          {value}
        </div>

        {/* Status */}
        <div className="text-[#9CA3AF] text-[8px] md:text-[10px] font-['Arial',sans-serif] uppercase tracking-wide">
          {status}
        </div>
      </div>
    </div>
  )
}
