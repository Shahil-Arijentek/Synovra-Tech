interface RecordLockCardProps {
  value: string
  status: string
}

export default function RecordLockCard({ value, status }: RecordLockCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 w-[18.75rem] sm:w-[20rem] md:w-[26.25rem] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[0.625rem] font-['Arial',sans-serif] tracking-wider mb-3">
        RECORD LOCK
      </div>

      {/* Metallic Plate with Text Overlay */}
      <div className="relative w-full h-[7.5rem] flex items-center justify-center lg:mt-4 xl:mt-5 2xl:mt-6">
        <img
          src="/cards/decision.png"
          alt="Record Lock Plate"
          className="w-full h-full object-contain"
        />
        
        {/* Text Overlay on Plate */}
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center lg:items-start lg:pt-6 xl:pt-7 2xl:pt-8">
          <div className="text-left">
            <div className="text-black text-xl sm:text-2xl md:text-[2rem] font-['Gemunu_Libre',sans-serif] font-bold uppercase leading-none mb-1">
              {value}
            </div>
            <div className="text-black text-sm sm:text-base md:text-[1rem] font-['Arial',sans-serif] font-normal uppercase leading-none">
              {status}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
