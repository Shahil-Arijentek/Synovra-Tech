export default function CertifiedCard() {
  return (
    <div className="backdrop-blur-[14.9px] bg-white/5 border border-white/10 rounded-xl p-4 shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Content */}
      <div className="flex items-center gap-3 whitespace-nowrap">
        {/* Tick Icon */}
        <div className="flex-shrink-0">
          <img
            src="/cards/tick.png"
            alt="Certified"
            className="w-8 h-8 object-contain"
          />
        </div>

        {/* Certified Text */}
        <div 
          className="font-['Arial',sans-serif] uppercase"
          style={{
            color: 'rgba(255, 255, 255, 0.60)',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '30px'
          }}
        >
          CERTIFIED
        </div>
      </div>
    </div>
  )
}
