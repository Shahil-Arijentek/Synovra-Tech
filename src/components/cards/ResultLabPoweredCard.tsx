export default function ResultLabPoweredCard() {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Headline */}
      <div className="text-white font-['Arial',sans-serif] font-bold uppercase text-lg sm:text-xl md:text-2xl mb-2 md:mb-3 leading-tight">
        RESULT — LAB POWERED
      </div>
      
      {/* Secondary line */}
      <div className="text-[#9CA3AF] font-['Arial',sans-serif] text-xs sm:text-sm md:text-base leading-relaxed">
        Verified output from a Synovra-revived battery
      </div>
    </div>
  )
}
