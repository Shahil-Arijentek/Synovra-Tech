interface PlateConditionCardProps {
  value: string
}

export default function PlateConditionCard({ value }: PlateConditionCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-2xl p-3 md:p-4 w-[280px] md:w-[420px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[10px] font-['Arial',sans-serif] tracking-wider mb-3">
        PLATE CONDITION
      </div>

      {/* Content - Text and Plate Image */}
      <div className="flex items-center justify-between">
        {/* Plate Restored Text */}
        <div 
          className="text-white font-['Gemunu_Libre',sans-serif] font-normal uppercase tracking-wide"
          style={{
            fontSize: '40px',
            lineHeight: '44px'
          }}
        >
          {value}
        </div>

        {/* Plate Visualization */}
        <div className="flex-shrink-0">
          <img
            src="/cards/platecondition.png"
            alt="Plate Condition"
            className="w-[180px] h-[120px] object-contain"
          />
        </div>
      </div>
    </div>
  )
}
