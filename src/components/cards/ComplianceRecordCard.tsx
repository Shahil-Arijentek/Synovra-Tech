interface ComplianceRecordCardProps {
  value: string
}

export default function ComplianceRecordCard({ value }: ComplianceRecordCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-2xl p-4 w-[420px] h-[180px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[10px] font-['Arial',sans-serif] tracking-wider mb-2">
        SYSTEM RECORD
      </div>

      {/* Image Visualization - White Metallic Plate with Text Overlay */}
      <div className="relative w-full h-[110px] mb-2 flex items-center justify-center">
        <img
          src="/cards/Subtract.png"
          alt="System Record"
          className="w-full h-full object-contain"
        />
        {/* Text Overlay - Centered on Image */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ marginTop: '-8px' }}>
          <div
            className="text-[#FF6B00] font-['Arial',sans-serif] font-bold uppercase tracking-wide text-center"
            style={{
              fontSize: '14px',
              lineHeight: '20px'
            }}
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  )
}
