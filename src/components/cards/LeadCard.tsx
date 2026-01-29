interface LeadCardProps {
  value: string
}

export default function LeadCard({ value }: LeadCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-[#111111]/70 border border-white/10 rounded-2xl p-4 w-[200px] h-[240px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[10px] font-['Arial',sans-serif] tracking-wider mb-3">
        LEAD
      </div>

      {/* Lead Ingots Image */}
      <div className="flex items-center justify-center mb-4">
        <img
          src="/cards/lead.png"
          alt="Lead Ingots"
          className="w-full h-[130px] object-contain"
        />
      </div>

      {/* Percentage Value */}
      <div className="flex items-end justify-end">
        <div 
          className="text-white text-center font-['Gemunu_Libre',sans-serif] font-normal"
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
