export default function ElectrochemicalCorrectionCard() {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 w-[18.75rem] sm:w-[20rem] md:w-[26.25rem] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Battery Visualization - Horizontal with Waveform */}
      <div className="relative w-full h-[8.75rem] sm:h-[9.375rem] md:h-[9rem] mb-2 md:mb-3 flex items-center justify-center overflow-visible">
        <img
          src="/cards/electrochemical.png"
          alt="Electrochemical Correction"
          className="object-contain rotate-90 scale-[1.4] sm:scale-[1.5] md:scale-[1.6]"
          style={{ width: '115%', height: '115%' }}
        />
      </div>

      {/* Title */}
      <div className="text-[#9CA3AF] text-[0.5rem] sm:text-[0.625rem] md:text-[0.75rem] font-['Arial',sans-serif] tracking-wider text-center uppercase">
        ELECTROCHEMICAL CORRECTION
      </div>
    </div>
  )
}
