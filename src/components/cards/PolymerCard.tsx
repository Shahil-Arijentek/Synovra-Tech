interface PolymerCardProps {
  value: string
}

export default function PolymerCard({ value }: PolymerCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-[#111111]/70 border border-white/10 rounded-2xl p-4 w-[200px] h-[240px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[10px] font-['Arial',sans-serif] tracking-wider mb-3">
        POLYMER
      </div>

      {/* Polymer Pellets Image */}
      <div className="flex items-center justify-center mb-4">
        <img
          src="/cards/polymer.png"
          alt="Polymer Pellets"
          className="w-full h-[130px] object-contain"
        />
      </div>

      {/* Recovery Value */}
      <div className="flex items-end justify-end">
        <div 
          className="text-white text-center font-['Gemunu_Libre',sans-serif] font-normal"
          style={{
            fontSize: '20px',
            lineHeight: '24px'
          }}
        >
          {value}
        </div>
      </div>
    </div>
  )
}
