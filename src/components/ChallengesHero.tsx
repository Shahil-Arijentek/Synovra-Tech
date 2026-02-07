import { type PropsWithChildren } from 'react'

type ChallengesHeroProps = PropsWithChildren<{
  className?: string
  title?: string;
}>

export default function ChallengesHero({ children, title, className = '' }: ChallengesHeroProps) {
  return (
    <section className={`relative ${className}`}>
      <div className="relative min-h-[31.25rem] md:min-h-[43.75rem] overflow-hidden bg-gradient-to-b from-black via-[#0d0d0d] to-black">
        {title && (
          <div className="absolute inset-0 z-30 flex items-start pt-12 justify-center px-6 md:items-start md:px-8 md:pt-32 pointer-events-none">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-2xl">
                {title}
              </h2>
              <p className="mt-4 max-w-[48.81rem] w-full font-['Arial'] text-[#9CA3AF] text-sm sm:text-base md:text-base lg:text-lg opacity-100 px-4">
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