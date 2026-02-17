import { useEffect, useRef } from 'react'

interface VoltageTrendCardProps {
  value: string
  status: string
}

export default function VoltageTrendCard({ value, status }: VoltageTrendCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
      })
    }
  }, [])

  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 w-[8.75rem] sm:w-[9.375rem] md:w-[13.13rem] h-[9.375rem] sm:h-[10rem] md:h-[14.69rem] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)] flex flex-col">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[0.5rem] md:text-[0.625rem] font-['Arial',sans-serif] tracking-wider mb-1 md:mb-2">
        VOLTAGE TREND
      </div>

      {/* Video Visualization - Microchip with Orange Glow */}
      <div className="relative w-full flex-1 flex items-center justify-center mb-1 md:mb-2">
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
      <div className="flex items-center justify-between mt-auto">
        {/* Value */}
        <div className="text-white text-xs md:text-base font-['Arial',sans-serif] font-medium">
          {value}
        </div>

        {/* Status */}
        <div className="text-[#9CA3AF] text-[0.5rem] md:text-[0.625rem] font-['Arial',sans-serif] uppercase tracking-wide">
          {status}
        </div>
      </div>
    </div>
  )
}
