interface CertifiedCardProps {
  text?: string
}

export default function CertifiedCard({ text }: CertifiedCardProps) {
  const displayText = text || 'CERTIFIED'
  
  return (
    <div className="backdrop-blur-[14.9px] bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-2.5 md:p-3 lg:p-3.5 shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Content */}
      <div className="flex items-center gap-2 md:gap-2.5 whitespace-nowrap">
        {/* Tick Icon */}
        <div className="flex-shrink-0">
          <img
            src="/cards/tick.png"
            alt="Certified"
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 object-contain"
          />
        </div>

        {/* Certified Text */}
        <div 
          className="font-['Arial',sans-serif] uppercase text-sm sm:text-base md:text-lg lg:text-xl"
          style={{
            color: 'rgba(255, 255, 255, 0.60)',
            fontStyle: 'normal',
            fontWeight: 400
          }}
        >
          {displayText}
        </div>
      </div>
    </div>
  )
}
