interface PlateConditionCardProps {
  value: string
}

export default function PlateConditionCard({ value }: PlateConditionCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 w-[18.75rem] sm:w-[20rem] md:w-[26.25rem] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[0.5rem] md:text-[0.625rem] font-['Arial',sans-serif] tracking-wider mb-2 md:mb-3">
        PLATE CONDITION
      </div>

      {/* Content - Text and Plate Image */}
      <div className="flex items-center justify-between gap-2">
        {/* Plate Restored Text */}
        <div 
          className="text-white font-['Gemunu_Libre',sans-serif] font-normal uppercase tracking-wide text-2xl sm:text-3xl md:text-4xl"
        >
          {value}
        </div>

        {/* Plate Visualization */}
        <div className="flex-shrink-0">
          <img
            src="/cards/platecondition.png"
            alt="Plate Condition"
            className="w-[7.5rem] h-[5rem] sm:w-[8.75rem] sm:h-[6.25rem] md:w-[11.25rem] md:h-[7.5rem] object-contain"
          />
        </div>
      </div>
    </div>
  )
}
