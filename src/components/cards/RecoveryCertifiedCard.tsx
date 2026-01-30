export default function RecoveryCertifiedCard() {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-2xl p-4 w-[420px] h-[180px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[10px] font-['Arial',sans-serif] tracking-wider mb-2">
        RECORD LOCK
      </div>

      {/* Image Visualization - Metallic Plate with Checkmark and Text */}
      <div className="relative w-full h-[110px] mb-1 flex items-center justify-center">
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
              className="w-[40px] h-[40px] object-contain"
            />
          </div>
          {/* Text */}
          <div className="text-left">
            <p className="text-black text-[32px] font-['Gemunu_Libre',sans-serif] font-bold uppercase leading-none mb-1">
              RECOVERY
            </p>
            <p className="text-black text-[16px] font-['Arial',sans-serif] font-normal uppercase leading-none">
              CERTIFIED
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
