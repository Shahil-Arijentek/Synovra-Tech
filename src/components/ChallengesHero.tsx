import { useState, useEffect, type PropsWithChildren } from 'react'
import RippleGrid from './RippleGrid'

type ChallengesHeroProps = PropsWithChildren<{
  className?: string
  title?: string;
}>

export default function ChallengesHero({ children, title, className = '' }: ChallengesHeroProps) {
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className={`relative ${className}`}>
      <div className="relative min-h-[500px] md:min-h-[700px] overflow-hidden bg-[#0d0d0d]">
        <RippleGrid
          className="absolute inset-x-0 top-0 md:-top-40 h-full md:h-[calc(100%+32px)] z-0"
          enableRainbow={false}
          gridColor="#FF6B1A"
          rippleIntensity={0.05}
          gridSize={isMobile ? 6 : 10}
          gridThickness={20}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={isMobile ? 0.5 : 0.40}
          fadeDistance={isMobile ? 2.5 : 1.5}
        />

        {title && (
          <div className="absolute inset-0 z-10 flex items-start pt-12 justify-center px-6 md:items-start md:px-8 md:pt-64 pointer-events-none">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-2xl">
                {title}
              </h2>
              <p className="mt-4 max-w-[781px] w-full font-['Arial'] text-[#9CA3AF] text-sm sm:text-base md:text-base lg:text-lg opacity-100 px-4">
                We eliminate the cost, risk, and unpredictability from your battery afterlife.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-20">{children}</div>
    </section>
  )
}