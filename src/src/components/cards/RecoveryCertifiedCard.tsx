export default function RecoveryCertifiedCard() {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 w-[18.75rem] sm:w-[20rem] md:w-[26.25rem] h-[8.75rem] sm:h-[9.375rem] md:h-[11.25rem] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[0.5rem] md:text-[0.625rem] font-['Arial',sans-serif] tracking-wider mb-2">
        RECORD LOCK
      </div>

      {/* Image Visualization - Metallic Plate with Checkmark and Text */}
      <div className="relative w-full h-[6.875rem] sm:h-[7.5rem] md:h-[6.875rem] mb-1 flex items-center justify-center">
        <img
          src="/cards/decision.png"
          alt="Record Lock"
          className="w-full h-full object-contain"
        />
        {/* Checkmark and Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3">
          {/* Orange Checkmark Icon */}
          <div className="flex-shrink-0">
            <img
              src="/cards/verifiedtick.png"
              alt="Verified"
              className="w-[1.875rem] h-[1.875rem] sm:w-[2.188rem] sm:h-[2.188rem] md:w-[2.5rem] md:h-[2.5rem] object-contain"
            />
          </div>
          {/* Text */}
          <div className="text-left">
            <p className="text-black text-xl sm:text-2xl md:text-[2rem] font-['Gemunu_Libre',sans-serif] font-bold uppercase leading-none mb-1">
              RECOVERY
            </p>
            <p className="text-black text-sm sm:text-base md:text-[1rem] font-['Arial',sans-serif] font-normal uppercase leading-none">
              CERTIFIED
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
