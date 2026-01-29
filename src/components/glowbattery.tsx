import { useEffect, useRef, useState } from 'react'

const CARDS = [
  { title: 'The Old Way', description: 'Treated symptoms on the surface —\nnot the blockage inside.', type: 'old' },
  { title: 'The Synovra Way', description: 'Clears internal sulphation so energy\ncan flow again.', type: 'new' },
  { title: 'The Old Way', description: 'Binary tests ignored how much usable\nlife remained.', type: 'old' },
  { title: 'The Synovra Way', description: 'Multiple parameters reveal what can\nstill be recovered.', type: 'new' },
  { title: 'The Old Way', description: 'No tracking meant no accountability\nafter delivery.', type: 'old' },
  { title: 'The Synovra Way', description: 'Measured performance enables\ntraceable, warranty-backed outcomes.', type: 'new' },
  { title: 'The Old Way', description: 'Sulphation returned because nothing\nstopped it forming again.', type: 'old' },
  { title: 'The Synovra Way', description: 'A proprietary solvent layer slows\nsulphation buildup.', type: 'new' }
]

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export default function GlowBattery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      const currentScroll = clamp(-rect.top, 0, totalScrollable)
      const rawProgress = (currentScroll / totalScrollable) * (CARDS.length - 1)
      setProgress(rawProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const activeIndex = Math.floor(progress)
  const activeCard = CARDS[activeIndex]

  // Calculate synchronized opacities for the batteries/glows based on card types
  const leftBatteryOpacity = CARDS.reduce((acc, card, i) => {
    if (card.type !== 'old') return acc
    // Match the card's transition logic: peaks at integer index, fades out within +/- 0.5 distance
    const cardOpacity = clamp(1 - Math.abs(progress - i) * 2, 0, 1)
    return Math.max(acc, cardOpacity)
  }, progress < 0.5 ? 1 : 0) // Keep fixed for the very start

  const rightBatteryOpacity = CARDS.reduce((acc, card, i) => {
    if (card.type !== 'new') return acc
    const cardOpacity = clamp(1 - Math.abs(progress - i) * 2, 0, 1)
    return Math.max(acc, cardOpacity)
  }, progress > CARDS.length - 1.5 ? 1 : 0) // Keep fixed for the very end

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0d0d0d]"
      style={{ height: '500vh' }}
    >
      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.8; filter: blur(100px); transform: scale(1); }
          50% { opacity: 0.4; filter: blur(80px); transform: scale(0.9); }
        }
        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        @keyframes image-blink {
          0%, 100% { 
            opacity: 1; 
            filter: brightness(1.3) sepia(0.4) saturate(2) drop-shadow(0 0 25px rgba(255, 90, 0, 0.7)); 
          }
          50% { 
            opacity: 0.8; 
            filter: brightness(1.1) sepia(0.2) saturate(1.2) drop-shadow(0 0 5px rgba(255, 90, 0, 0.2)); 
          }
        }
        .animate-image-blink {
          animation: image-blink 2s ease-in-out infinite;
        }
      `}</style>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Shading Gradients to blend with dark background */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0d0d0d] to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d0d0d] to-transparent z-10" />

        {/* Battery Assets & Switching Glow with Stage-based Fade */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute bottom-12 left-0 h-[30vh] md:h-[90%] w-1/2 md:w-auto transition-opacity duration-150 flex items-end"
          >
            {/* Soft Radial Glow behind the Left Battery */}
            <div
              className={`absolute inset-0 bg-[radial-gradient(circle,rgba(255,94,0,0.3)_0%,transparent_70%)] rounded-full ${leftBatteryOpacity > 0.5 ? 'animate-glow-pulse' : ''} pointer-events-none`}
              style={{ opacity: leftBatteryOpacity }}
            />
            <img
              src="/perspective/leftbattery.png"
              alt="Left"
              className={`relative h-full w-full object-contain object-bottom z-10 ${activeCard?.type === 'old' ? 'animate-image-blink' : ''}`}
              style={{ opacity: activeCard?.type === 'old' ? 1 : Math.max(0.15, leftBatteryOpacity) }}
            />
          </div>

          <div
            className="absolute bottom-12 right-0 h-[30vh] md:h-[90%] w-1/2 md:w-auto transition-opacity duration-150 flex items-end justify-end"
          >
            {/* Soft Radial Glow behind the Right Battery */}
            <div
              className={`absolute inset-0 bg-[radial-gradient(circle,rgba(255,94,0,0.3)_0%,transparent_70%)] rounded-full ${rightBatteryOpacity > 0.5 ? 'animate-glow-pulse' : ''} pointer-events-none`}
              style={{ opacity: rightBatteryOpacity }}
            />
            <img
              src="/perspective/rightsidebattery.png"
              alt="Right"
              className={`relative h-full w-full object-contain object-bottom z-10 ${activeCard?.type === 'new' ? 'animate-image-blink' : ''}`}
              style={{ opacity: activeCard?.type === 'new' ? 1 : Math.max(0.15, rightBatteryOpacity) }}
            />
          </div>
        </div>

        {/* Card Animation Area */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 md:px-6 -translate-y-24 md:translate-y-20">
          {/* Centered container for the stack */}
          <div className="relative w-full max-w-[320px] md:max-w-[620px] h-[140px] md:h-[240px]">
            {CARDS.map((card, index) => {
              const isEven = (index + 1) % 2 === 0
              const distance = progress - index

              // Animation styles
              const opacity = clamp(1 - Math.abs(distance) * 2, 0, 1)
              const scale = clamp(1 - Math.abs(distance) * 0.05, 0.92, 1)
              const translateY = distance * -30

              return (
                <div
                  key={index}
                  className="absolute inset-0 flex items-center justify-center transition-all duration-150 ease-out"
                  style={{
                    opacity: opacity,
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    zIndex: index === activeIndex ? 50 : 10,
                    pointerEvents: index === activeIndex ? 'auto' : 'none'
                  }}
                >
                  {/* Fixed dimensions for uniform look */}
                  <div className={`flex flex-row items-center gap-4 md:gap-10 rounded-[20px] md:rounded-[28px] border px-4 md:px-12 py-3 md:py-8 shadow-2xl backdrop-blur-xl w-full h-full ${isEven
                    ? 'border-orange-500/50 bg-gradient-to-r from-[#ff3b00] to-[#ff6a00] text-black'
                    : 'border-white/10 bg-white/10 text-white shadow-white/5'
                    }`}>
                    {/* Number box with updated typography specs */}
                    <div
                      className={`opacity-20 md:opacity-30 flex-shrink-0 text-left ${isEven ? 'text-black' : 'text-white'}`}
                      style={{
                        fontFamily: 'Arial',
                        fontSize: 'clamp(60px, 14vw, 137.402px)',
                        fontWeight: 700,
                        lineHeight: '1'
                      }}
                    >
                      {index + 1}
                    </div>

                    <div className="flex flex-col flex-1 text-left">
                      <h3
                        className="text-[18px] md:text-[40px] font-black leading-tight tracking-tight md:tracking-[-2.4px]"
                        style={{
                          fontFamily: 'Arial',
                        }}
                      >
                        {card.title}
                      </h3>
                      <p
                        className={`mt-0.5 font-medium text-[11px] md:text-[22px] leading-tight md:leading-[131%] tracking-tight md:tracking-[-1px] ${isEven ? 'text-black/90' : 'text-white/80'}`}
                        style={{
                          fontFamily: 'Arial',
                        }}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}