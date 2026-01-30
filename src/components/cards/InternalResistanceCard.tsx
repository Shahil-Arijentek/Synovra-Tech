interface InternalResistanceCardProps {
  value: string
  status: string
}

export default function InternalResistanceCard({ value, status }: InternalResistanceCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-2xl p-4 w-[200px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[10px] font-['Arial',sans-serif] tracking-wider mb-2">
        INTERNAL RESISTANCE
      </div>

      {/* Image Visualization - Cylindrical Battery */}
      <div className="relative w-full h-[110px] mb-2 flex items-center justify-center">
        <img
          src="/cards/internalresistance.png"
          alt="Internal Resistance"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Bottom Info Bar */}
      <div className="flex items-center justify-between">
        {/* Value */}
        <div className="text-white text-base font-['Arial',sans-serif] font-medium">
          {value}
        </div>

        {/* Status */}
        <div className="text-[#9CA3AF] text-[10px] font-['Arial',sans-serif] uppercase tracking-wide">
          {status}
        </div>
      </div>
    </div>
  )
}
