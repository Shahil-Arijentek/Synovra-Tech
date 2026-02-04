interface PolymerCardProps {
  value: string
  status: string
}

export default function PolymerCard({ value, status }: PolymerCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-2xl p-2 md:p-3 w-[140px] md:w-[200px] h-[180px] md:h-[240px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)] flex flex-col">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[10px] font-['Arial',sans-serif] tracking-wider mb-2">
        POLYMER
      </div>

      {/* Image Visualization - Polymer Pellets */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <img
          src="/cards/polymer.png"
          alt="Polymer Pellets"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Bottom Info Bar */}
      <div className="flex items-center justify-end mt-auto">
        {/* Value with Status */}
        <div className="text-white text-lg font-['Gemunu_Libre',sans-serif] font-normal">
          {value} {status}
        </div>
      </div>
    </div>
  )
}
