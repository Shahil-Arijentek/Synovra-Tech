interface SulphationCardProps {
  value: string
  status: string
  compactLaptop?: boolean
}
export default function SulphationCard({ value, status: _status, compactLaptop }: SulphationCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 w-[18.75rem] sm:w-[20rem] md:w-[26.25rem] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Container with flex layout: text on left, image on right */}
      <div className={`relative w-full h-[10.94rem] sm:h-[11.56rem] md:h-[11.25rem] flex items-center ${compactLaptop ? 'lg:h-[9.5rem]' : ''}`}>
        {/* Left side - Text content */}
        <div className="flex-1 flex flex-col justify-between h-full z-10">
          {/* Title - Positioned at top left */}
          <div className="pt-1 md:pt-2">
            <div className="text-[#9CA3AF] text-[0.5rem] md:text-[0.625rem] font-['Arial',sans-serif] tracking-[0.2em] drop-shadow-lg">
              SULPHATION
            </div>
          </div>

          {/* Large Text Value - Positioned at bottom left */}
          <div className="pb-1 md:pb-2">
            <div 
              className="text-white font-['Gemunu_Libre',sans-serif] font-bold uppercase tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] text-lg md:text-[28.754px] leading-6 md:leading-[36.754px]"
            >
              {value}
            </div>
          </div>
        </div>

        {/* Right side - Battery illustration */}
        <div className="flex-1 flex items-center justify-end h-full">
          <img
            src={value === 'DETECTED' ? '/cards/sulphatondet.png' : '/cards/sulphatonneg.png'}
            alt="Sulphation Analysis"
            className="h-full w-auto object-contain"
          />
        </div>
      </div>
    </div>
  )
}
