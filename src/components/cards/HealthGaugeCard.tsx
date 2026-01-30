import { useEffect, useRef } from 'react'

interface HealthGaugeCardProps {
  value: string
  video?: string
  width?: string
}

export default function HealthGaugeCard({ value, video = '99.mp4', width = '420px' }: HealthGaugeCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Auto-play the video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay prevented:', err)
      })
    }
  }, [])

  return (
    <div 
      className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-2xl p-3 h-[240px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]"
      style={{ width }}
    >
      {/* Title */}
      <div className="text-[#9CA3AF] text-[10px] font-['Arial',sans-serif] tracking-wider mb-2">
        HEALTH %
      </div>

      {/* Video Visualization - Gauge/Meter */}
        <div className="relative w-full h-[140px] mb-1 flex items-center justify-center">
        <video
          ref={videoRef}
          src={`/cards/${video}`}
          className="w-full h-full object-contain scale-100"
          muted
          loop
          playsInline
          autoPlay
        />
      </div>

      {/* Large Percentage Value - Bottom Right */}
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
