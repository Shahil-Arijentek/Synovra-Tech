import { useState, useEffect } from 'react'

interface LeadCardProps {
  value: string
  status: string
  shouldAnimate?: boolean
}

export default function LeadCard({ value, shouldAnimate = false }: LeadCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  
  // Extract number from value (e.g., "98%" -> 98)
  const targetValue = parseInt(value.replace('%', '')) || 0
  
  useEffect(() => {
    if (!shouldAnimate) {
      setAnimatedValue(0)
      return
    }
    
    if (targetValue === 0) return
    
    setAnimatedValue(0) // Reset to 0 when animation starts
    
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = targetValue / steps
    const stepDuration = duration / steps
    
    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const newValue = Math.min(Math.round(increment * currentStep), targetValue)
      setAnimatedValue(newValue)
      
      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedValue(targetValue)
      }
    }, stepDuration)
    
    return () => clearInterval(timer)
  }, [targetValue, shouldAnimate])

  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-3 w-[8.75rem] sm:w-[9.375rem] md:w-[12.5rem] h-[10rem] sm:h-[10.63rem] md:h-[15rem] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)] flex flex-col">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[0.5rem] md:text-[0.625rem] font-['Arial',sans-serif] tracking-wider mb-1 md:mb-2">
        LEAD
      </div>

      {/* Image Visualization - Lead Ingots */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <img
          src="/cards/lead.png"
          alt="Lead Ingots"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Bottom Info Bar */}
      <div className="flex items-center justify-end mt-auto">
        {/* Value */}
        <div className="text-white text-lg sm:text-xl md:text-2xl font-['Gemunu_Libre',sans-serif] font-normal">
          {animatedValue}%
        </div>
      </div>
    </div>
  )
}
