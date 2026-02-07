interface SulphationCardProps {
  value: string
  status: string
  compactLaptop?: boolean
}

export default function SulphationCard({ value, status: _status, compactLaptop }: SulphationCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 w-[18.75rem] sm:w-[20rem] md:w-[26.25rem] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Container for overlapping image and text */}
      <div className={`relative w-full h-[10.94rem] sm:h-[11.56rem] md:h-[11.25rem] overflow-hidden ${compactLaptop ? 'lg:h-[9.5rem]' : ''}`}>
        {/* Title - Positioned at top left with gradient background */}
        <div className="absolute top-0 left-0 lg:-top-1 z-10 w-[60%]">
          <div className="bg-gradient-to-r from-black/95 via-black/60 via-30% to-transparent pl-2 md:pl-4 pr-6 md:pr-12 py-1 md:py-1.5 backdrop-blur-md">
            <div className="text-[#9CA3AF] text-[0.5rem] md:text-[0.625rem] font-['Arial',sans-serif] tracking-[0.2em] drop-shadow-lg">
              SULPHATION
            </div>
          </div>
        </div>

        {/* Image Visualization - Horizontal Transparent Cylinder */}
        <div className="absolute inset-0 flex items-center justify-center translate-y-2">
          <img
            src="/cards/sulphation.png"
            alt="Sulphation Analysis"
            className="w-full h-full object-contain scale-[2.5] md:scale-[3.5] rotate-[-1deg]"
          />
        </div>

        {/* Large Text Value - Positioned at bottom left */}
        <div className="absolute bottom-0 left-0 z-10">
          <div 
            className="text-white font-['Gemunu_Libre',sans-serif] font-bold uppercase tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] text-lg md:text-[28.754px] leading-6 md:leading-[36.754px]"
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  )
}
