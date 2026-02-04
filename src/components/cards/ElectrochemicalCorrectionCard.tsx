export default function ElectrochemicalCorrectionCard() {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 w-[300px] sm:w-[320px] md:w-[420px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Battery Visualization - Horizontal with Waveform */}
      <div className="relative w-full h-[140px] sm:h-[150px] md:h-[180px] mb-2 md:mb-3 flex items-center justify-center">
        <img
          src="/cards/electrochemical.png"
          alt="Electrochemical Correction"
          className="w-full h-full object-contain rotate-90 scale-110"
        />
      </div>

      {/* Title */}
      <div className="text-[#9CA3AF] text-[8px] sm:text-[10px] md:text-[12px] font-['Arial',sans-serif] tracking-wider text-center uppercase">
        ELECTROCHEMICAL CORRECTION
      </div>
    </div>
  )
}
