interface ComplianceRecordCardProps {
  value: string
}

export default function ComplianceRecordCard({ value }: ComplianceRecordCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 w-[18.75rem] sm:w-[20rem] md:w-[26.25rem] h-[8.75rem] sm:h-[9.375rem] md:h-[11.25rem] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[0.5rem] md:text-[0.625rem] font-['Arial',sans-serif] tracking-wider mb-2">
        SYSTEM RECORD
      </div>

      {/* Image Visualization - White Metallic Plate with Text Overlay */}
      <div className="relative w-full h-[6.875rem] sm:h-[7.5rem] md:h-[6.875rem] mb-2 flex items-center justify-center">
        <img
          src="/cards/Subtract.png"
          alt="System Record"
          className="w-full h-full object-contain"
        />
        {/* Text Overlay - Centered on Image */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ marginTop: '-5px' }}>
          <div
            className="text-[#FF6B00] font-['Arial',sans-serif] font-normal uppercase tracking-wide text-center text-xs sm:text-sm md:text-base"
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  )
}
