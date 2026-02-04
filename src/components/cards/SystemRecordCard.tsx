interface SystemRecordCardProps {
  value: string
}

export default function SystemRecordCard({ value }: SystemRecordCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-2xl p-3 md:p-4 w-[280px] md:w-[420px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[10px] font-['Arial',sans-serif] tracking-wider mb-3">
        SYSTEM RECORD
      </div>

      {/* Metallic Plate with Text Overlay */}
      <div className="relative w-full h-[80px] flex items-center justify-center">
        <img
          src="/cards/Subtract.png"
          alt="System Record Plate"
          className="w-full h-full object-contain"
        />
        
        {/* Text Overlay on Plate */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ marginTop: '-8px' }}>
          <div 
            className="text-[#FF6B1A] font-['Arial',sans-serif] font-bold uppercase tracking-wide text-center"
            style={{
              fontSize: '16px',
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
