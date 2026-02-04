interface SealCardProps {
  value: string
}

export default function SealCard({ value }: SealCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-2xl p-3 md:p-4 w-[280px] md:w-[420px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[10px] font-['Arial',sans-serif] tracking-wider mb-4">
        SEAL
      </div>

      {/* Content - Text and Badge */}
      <div className="flex items-start justify-between">
        {/* Sealed & Logged Text */}
        <div 
          className="text-white font-['Gemunu_Libre',sans-serif] font-bold uppercase tracking-wide pt-20"
          style={{
            fontSize: '24px',
            lineHeight: '32px'
          }}
        >
          {value}
        </div>

        {/* Security Badge Icon */}
        <div className="flex-shrink-0">
          <img
            src="/cards/seal.png"
            alt="Security Seal"
            className="w-[120px] h-[120px] object-contain"
          />
        </div>
      </div>
    </div>
  )
}
