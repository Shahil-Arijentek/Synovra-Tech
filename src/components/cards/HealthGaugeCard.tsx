import { useEffect, useRef, useState } from 'react'

interface HealthGaugeCardProps {
  value: string
  video?: string
  width?: string
}

export default function HealthGaugeCard({ value, video = '99.mp4', width = '420px' }: HealthGaugeCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed && videoRef.current) {
            videoRef.current.play().catch(() => {
              // Video autoplay prevented
            })
            setHasPlayed(true)
          }
        })
      },
      { threshold: 0.5 } // Play when 50% of the card is visible
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [hasPlayed])

  return (
    <div 
      ref={containerRef}
      className={`backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 h-[140px] sm:h-[150px] md:h-[240px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)] ${width === '420px' ? 'w-[240px] sm:w-[260px] md:w-[420px]' : 'w-[130px] sm:w-[140px] md:w-[200px]'}`}
    >
      {/* Container for overlapping video and text */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Title - Positioned at top left */}
        <div className="absolute top-0 left-0 z-10">
          <div className="text-[#9CA3AF] text-[8px] md:text-[10px] font-['Arial',sans-serif] tracking-wider">
            HEALTH %
          </div>
        </div>

        {/* Video Visualization - Gauge/Meter */}
        <div className="absolute inset-0 flex items-center justify-center">
          <video
            ref={videoRef}
            src={`/cards/${video}`}
            className="w-full h-full object-contain scale-[1.1] md:scale-[1.2]"
            muted
            playsInline
          />
          {/* Fade overlay - black edges */}
          <div className="absolute inset-0 pointer-events-none" 
               style={{
                 background: 'radial-gradient(circle at center, transparent 15%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.95) 80%, black 95%)'
               }}
          />
        </div>

        {/* Large Percentage Value - Bottom Right */}
        <div className="absolute bottom-0 right-0 z-10">
          <div 
            className="text-white font-['Gemunu_Libre',sans-serif] font-normal text-lg md:text-[28.754px] leading-6 md:leading-[36.754px]"
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  )
}
