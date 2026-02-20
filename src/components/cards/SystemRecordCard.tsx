interface SystemRecordCardProps {
  value: string
}

export default function SystemRecordCard({ value }: SystemRecordCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 w-[18.75rem] sm:w-[20rem] md:w-[26.25rem] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[0.5rem] md:text-[0.625rem] font-['Arial',sans-serif] tracking-wider mb-2 md:mb-3">
        SYSTEM RECORD
      </div>

      {/* Metallic Plate with Text Overlay */}
      <div className="relative w-full h-[5rem] flex items-center justify-center">
        <img
          src="/cards/Subtract.png"
          alt="System Record Plate"
          className="w-full h-full object-contain"
        />
        
        {/* Text Overlay on Plate */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ marginTop: '-5px', marginLeft: '-0.5rem' }}>
          <div 
            className="text-black font-['Arial',sans-serif] font-bold uppercase tracking-wide text-center text-xs sm:text-sm md:text-base"
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  )
}
