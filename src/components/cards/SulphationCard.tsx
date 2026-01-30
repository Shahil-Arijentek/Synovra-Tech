interface SulphationCardProps {
  value: string
  status: string
}

export default function SulphationCard({ value }: SulphationCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-2xl p-4 w-[420px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Container for overlapping image and text */}
      <div className="relative w-full h-[180px] overflow-hidden">
        {/* Title - Positioned at top left with gradient background */}
        <div className="absolute top-0 left-0 z-10 w-[60%]">
          <div className="bg-gradient-to-r from-black/95 via-black/60 via-30% to-transparent pl-4 pr-12 py-1.5 backdrop-blur-md">
            <div className="text-[#9CA3AF] text-[10px] font-['Arial',sans-serif] tracking-[0.2em] drop-shadow-lg">
              SULPHATION
            </div>
          </div>
        </div>

        {/* Image Visualization - Horizontal Transparent Cylinder */}
        <div className="absolute inset-0 flex items-center justify-center translate-y-2">
          <img
            src="/cards/sulphation.png"
            alt="Sulphation Analysis"
            className="w-full h-full object-contain scale-[3.5] rotate-[-1deg]"
          />
        </div>

        {/* Large Text Value - Positioned at bottom left */}
        <div className="absolute bottom-0 left-0 z-10">
          <div 
            className="text-white font-['Gemunu_Libre',sans-serif] font-bold uppercase tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            style={{
              fontSize: '28.754px',
              lineHeight: '36.754px'
            }}
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  )
}
