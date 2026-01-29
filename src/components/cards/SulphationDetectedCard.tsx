interface SulphationDetectedCardProps {
  value: string
}

export default function SulphationDetectedCard({ value }: SulphationDetectedCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-[#111111]/70 border border-white/10 rounded-2xl p-4 w-[420px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[10px] font-['Arial',sans-serif] tracking-wider mb-3">
        SULPHATION
      </div>

      {/* Image Visualization - Horizontal Transparent Cylinder */}
      <div className="relative w-full h-[140px] mb-3 flex items-center justify-center">
        <img
          src="/cards/sulphation.png"
          alt="Sulphation Detected"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Large Text Value */}
      <div className="flex items-end justify-start">
        <div 
          className="text-white font-['Gemunu_Libre',sans-serif] font-bold uppercase tracking-wide"
          style={{
            fontSize: '28.754px',
            lineHeight: '36.754px'
          }}
        >
          {value}
        </div>
      </div>
    </div>
  )
}
