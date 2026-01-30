import { useEffect, useRef } from 'react'

interface VoltageCardProps {
  value: string
  status: string
}

export default function VoltageCard({ value, status }: VoltageCardProps) {
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
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-2xl p-4 w-[200px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[10px] font-['Arial',sans-serif] tracking-wider mb-2">
        VOLTAGE
      </div>

      {/* Video Visualization - Microchip with Orange Glow */}
      <div className="relative w-full h-[110px] mb-2 flex items-center justify-center">
        <video
          ref={videoRef}
          src="/cards/voltage.mp4"
          className="w-full h-full object-contain"
          muted
          loop
          playsInline
          autoPlay
        />
      </div>

      {/* Bottom Info Bar */}
      <div className="flex items-center justify-between">
        {/* Value */}
        <div className="text-white text-base font-['Arial',sans-serif] font-medium">
          {value}
        </div>

        {/* Status */}
        <div className="text-[#9CA3AF] text-[10px] font-['Arial',sans-serif] uppercase tracking-wide">
          {status}
        </div>
      </div>
    </div>
  )
}
