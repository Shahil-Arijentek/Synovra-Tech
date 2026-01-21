import type { PropsWithChildren } from 'react'
import RippleGrid from './RippleGrid'

type ChallengesHeroProps = PropsWithChildren<{
  className?: string
  title?: string; 
}>

export default function ChallengesHero({ children, title, className = '' }: ChallengesHeroProps) {
  return (
    <section className={`relative ${className}`}>
      <div className="relative min-h-[700px] overflow-hidden bg-[#000000]">
          <RippleGrid
           className="absolute inset-x-0 -top-40 h-[calc(100%+32px)] z-0"
          enableRainbow={false}
          gridColor="#FF6B1A"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={20}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
        opacity={0.40}
        />

        {title && (
          <div className="absolute inset-0 z-10 flex items-start justify-center px-8 pt-64 pointer-events-none">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-center text-4xl font-bold text-white drop-shadow-2xl sm:text-5xl">
                {title}
              </h2>
              <p className="mt-4 h-[32px] w-[781px] font-['Arial'] text-[#9CA3AF] opacity-100">
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