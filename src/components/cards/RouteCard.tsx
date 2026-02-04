export default function RouteCard() {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 w-[300px] sm:w-[320px] md:w-[420px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[8px] md:text-[10px] font-['Arial',sans-serif] tracking-wider mb-2 md:mb-3">
        ROUTE
      </div>

      {/* Route Visualization - Pickup to Facility */}
      <div className="relative w-full h-[100px] flex items-center justify-center mb-2">
        <img
          src="/cards/seen3.png"
          alt="Route Visualization"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Pickup and Facility Labels */}
      <div className="flex items-center justify-between px-2">
        <span className="text-[#9CA3AF] text-[12px] font-['Arial',sans-serif]">Pickup</span>
        <span className="text-[#9CA3AF] text-[18px]">→</span>
        <span className="text-[#9CA3AF] text-[12px] font-['Arial',sans-serif]">Facility</span>
      </div>
    </div>
  )
}
