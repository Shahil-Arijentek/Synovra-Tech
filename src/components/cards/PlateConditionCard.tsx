interface PlateConditionCardProps {
  value: string
}

export default function PlateConditionCard({ value }: PlateConditionCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-1.5 md:px-4 md:py-1 w-[18.75rem] sm:w-[20rem] md:w-[26.25rem] min-h-[11rem] sm:min-h-[11.5rem] md:min-h-[12rem] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[0.5rem] md:text-[0.625rem] font-['Arial',sans-serif] tracking-wider mt-6 md:mt-8 mb-0.5 md:mb-0.5">
        PLATE CONDITION
      </div>

      {/* Content - Text and Plate Image */}
      <div className="flex items-center justify-between gap-1.5 min-w-0 pt-2 md:pt-3">
        {/* Plate Restored Text */}
        <div 
          className="text-white font-['Gemunu_Libre',sans-serif] font-normal uppercase tracking-wide text-2xl sm:text-3xl md:text-4xl flex-shrink"
        >
          {value}
        </div>

        {/* Plate Visualization */}
        <div className="flex-shrink-0 overflow-visible -mt-2 sm:-mt-2.5 md:-mt-3">
          <img
            src="/cards/platecondition.png"
            alt="Plate Condition"
            className="w-[4.5rem] h-[3rem] sm:w-[5rem] sm:h-[3.5rem] md:w-[9rem] md:h-[6rem] lg:w-[10rem] lg:h-[6.5rem] object-contain"
          />
        </div>
      </div>
    </div>
  )
}
