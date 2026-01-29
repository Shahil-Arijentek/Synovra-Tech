interface GenericCardProps {
  title: string
  value: string
  status: string
  index: number
  total: number
}

export default function GenericCard({ title, value, status, index, total }: GenericCardProps) {
  return (
    <div className="relative backdrop-blur-xl bg-black/40 border border-white/5 rounded-2xl p-8 min-w-[420px] overflow-hidden">
      {/* Bottom Accent Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff6b1a]/50 to-transparent"></div>
      
      {/* Card Content */}
      <div className="relative z-10 space-y-6">
        {/* Title */}
        <div className="border-b border-white/10 pb-3">
          <h3 className="text-white/90 font-['Arial',sans-serif] font-bold text-xl tracking-wide uppercase">
            {title}
          </h3>
        </div>

        {/* Value Display */}
        <div className="bg-black/60 rounded-xl p-6 border border-white/10">
          <div className="text-center">
            <div className="text-[#ff6b1a] font-bold text-5xl font-mono tracking-tight mb-2">
              {value}
            </div>
          </div>
        </div>

        {/* Status Display */}
        <div className="flex items-center justify-between bg-white/5 rounded-lg p-4 border border-white/10">
          <span className="text-white/60 text-sm font-['Arial',sans-serif] uppercase tracking-wider">
            Status
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ff6b1a] animate-pulse"></div>
            <span className="text-white font-['Arial',sans-serif] font-semibold text-sm uppercase tracking-wide">
              {status}
            </span>
          </div>
        </div>

        {/* Scene Progress */}
        <div className="flex items-center gap-3 pt-2">
          <div className="flex-1 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#ff6b1a] to-[#ff9b1a] rounded-full transition-all duration-500"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            ></div>
          </div>
          <span className="text-white/40 text-xs font-['Arial',sans-serif] font-mono">
            {index + 1}/{total}
          </span>
        </div>
      </div>

      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#ff6b1a]/10 to-transparent rounded-tr-2xl pointer-events-none"></div>
    </div>
  )
}
