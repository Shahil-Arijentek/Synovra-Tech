import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

type BatteryStage = 'new' | 'used' | 'scrap'

const stageConfig: Record<BatteryStage, { label: string }> = {
  new: { label: 'New' },
  used: { label: 'Used' },
  scrap: { label: 'Scrap' },
}

const batteryLayers = {
  chassis: '/Battery-At-Anystage/new.png',
  internal: '/Battery-At-Anystage/used.png',
}

const stageOrder: BatteryStage[] = ['new', 'used', 'scrap']
const transitionDuration = 0.8
const autoPlayIntervalMs = 3000

export default function BuyBatteries() {
  const [activeStage, setActiveStage] = useState<BatteryStage>('new')
  const activeStageRef = useRef(activeStage)
  const isAnimatingRef = useRef(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const chassisRef = useRef<HTMLImageElement | null>(null)
  const internalRef = useRef<HTMLImageElement | null>(null)
  const labelsRef = useRef<HTMLDivElement | null>(null)
  const gsapContextRef = useRef<gsap.Context | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    activeStageRef.current = activeStage
  }, [activeStage])

  useEffect(() => {
    gsapContextRef.current = gsap.context(() => {}, sectionRef)
    return () => {
      timelineRef.current?.kill()
      gsapContextRef.current?.revert()
    }
  }, [])

  const runTransition = useCallback((stage: BatteryStage) => {
    if (stage === activeStageRef.current) {
      return
    }

    const internal = internalRef.current
    if (!internal || !gsapContextRef.current) {
      setActiveStage(stage)
      return
    }

    timelineRef.current?.kill()
    isAnimatingRef.current = true

    gsapContextRef.current.add(() => {
      setActiveStage(stage)

      const internalOpacity = stage === 'new' ? 0 : stage === 'used' ? 0.4 : 1

      const tl = gsap.timeline({
        defaults: { duration: transitionDuration, ease: 'power2.inOut' },
        onComplete: () => {
          isAnimatingRef.current = false
        },
      })

      tl.to(internal, { opacity: internalOpacity }, 0)

      const activeLabel = labelsRef.current?.querySelector<HTMLButtonElement>(
        `[data-stage="${stage}"]`
      )
      if (activeLabel) {
        tl.fromTo(
          activeLabel,
          { textShadow: '0 0 0 rgba(255,107,26,0)' },
          {
            textShadow: '0 0 18px rgba(255,107,26,0.75)',
            duration: transitionDuration * 0.4,
            repeat: 1,
            yoyo: true,
            ease: 'power1.inOut',
          },
          '<'
        )
      }

      timelineRef.current = tl
    })
  }, [])

  const handleStageChange = (stage: BatteryStage) => {
    if (isAnimatingRef.current) {
      return
    }

    runTransition(stage)
  }

  useEffect(() => {
    const internal = internalRef.current
    if (!internal) {
      return
    }

    const internalOpacity = activeStage === 'new' ? 0 : activeStage === 'used' ? 0.4 : 1
    gsap.set(internal, { opacity: internalOpacity })
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      const currentIndex = stageOrder.indexOf(activeStageRef.current)
      const nextStage = stageOrder[(currentIndex + 1) % stageOrder.length]
      runTransition(nextStage)
    }, autoPlayIntervalMs)

    return () => {
      window.clearInterval(interval)
    }
  }, [runTransition])
  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-black px-6 py-12 md:py-20 text-center text-white"
      >
      <div
        className="pointer-events-none absolute inset-x-0 top-12 mx-auto h-[620px] max-w-[1119px] bg-[linear-gradient(270deg,rgba(0,0,0,0)_0%,#000_20.192%,#000_76.923%,rgba(0,0,0,0)_100%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex w-full max-w-[1119px] flex-col items-center gap-4 md:gap-6">
        <div className="text-center">
          <h2 className="text-[32px] md:text-5xl lg:text-[60px] font-bold tracking-[-1px] md:tracking-[-1.5px] text-white leading-tight">
            We Buy Batteries at Any Stage
          </h2>
          <p className="mt-3 text-[14px] md:text-[18px] font-bold leading-relaxed text-white/70">
            From pristine to scrap — all chemistries, all conditions, all ages.
          </p>
          <p className="text-[14px] md:text-[18px] font-bold leading-relaxed text-white/70">
            One pickup. One fair payout. No sorting.
          </p>
        </div>

        <div ref={labelsRef} className="relative z-10 mt-2 flex items-center justify-center gap-6 md:gap-10 text-center">
          {(['new', 'used', 'scrap'] as BatteryStage[]).map((stage) => (
            <button
              key={stage}
              data-stage={stage}
              className={`px-2 py-2 tracking-[-0.5px] md:tracking-[-1px] transition-colors ${
                activeStage === stage
                  ? 'text-[#ff6b1a]'
                  : 'text-[#595959]'
              } ${stage === 'new' ? 'text-[18px] md:text-[20px] font-bold' : 'text-[14px] md:text-[16px] font-bold'}`}
              type="button"
              onClick={() => handleStageChange(stage)}
            >
              {stageConfig[stage].label}
            </button>
          ))}
        </div>

        <div className="pointer-events-none relative -mt-8 md:-mt-16 flex h-[300px] md:h-[560px] w-full items-center justify-center">
          <div className="relative h-full w-full">
            <img
              ref={chassisRef}
              alt="Battery chassis"
              className="absolute inset-0 h-full w-full object-contain"
              style={{
                filter: activeStage === 'scrap' ? 'grayscale(1) brightness(0.85)' : 'none',
              }}
              src={batteryLayers.chassis}
            />
            <img
              ref={internalRef}
              alt="Battery internal plates"
              className="absolute inset-0 h-full w-full object-contain opacity-0"
              style={{ willChange: 'opacity' }}
              src={batteryLayers.internal}
            />
          </div>
        </div>
      </div>

        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[200px] w-full md:w-[1460px] -translate-x-1/2 bg-gradient-to-t from-black from-[65%] to-transparent" />
        <div className="relative mx-auto mt-6 md:mt-10 flex w-full max-w-[649px] flex-col items-center gap-1 rounded-[10px] px-6 py-4 md:py-6 text-center">
          <p className="text-[18px] md:text-[20px] font-bold leading-tight text-white">Healthy / Near New</p>
          <p className="text-[13px] md:text-[14px] leading-relaxed text-white/60">
            High-performance batteries — we buy them too. No need to hold for resale.
          </p>
        </div>
      </section>
      <section className="bg-black px-6 pb-16 md:pb-20 text-white">
        <div className="mx-auto flex w-full max-w-[1320px] justify-center">
          <div className="flex w-full max-w-[1180px] flex-col items-center gap-6 md:gap-8 rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.01)] px-6 py-10 md:px-12 md:py-[49px] text-center">
            <p className="text-[18px] md:text-[20px] font-bold leading-tight text-white">
              No Sorting. No Guesswork. No Missed Value.
            </p>
            <p className="max-w-[720px] text-[14px] md:text-[16px] font-medium md:font-bold leading-relaxed text-white/70">
              We collect mixed loads — any chemistry, age, or condition — so your team never spends
              time testing, grading, or preparing units.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button className="h-[52px] md:h-[58px] w-full sm:w-auto rounded-[4px] bg-[#ff6b1a] px-8 text-[15px] md:text-[16px] font-bold text-[#0d0d0d] transition-all hover:bg-[#ff6b1a]/90 shadow-[0_0_20px_rgba(255,107,26,0.6)] hover:shadow-[0_0_30px_rgba(255,107,26,0.8)]">
                Partner With Us
              </button>
              <button className="h-[52px] md:h-[58px] w-full sm:w-auto rounded-[4px] border border-white/20 bg-[#191919] px-8 text-[15px] md:text-[16px] font-bold text-white transition-colors hover:bg-white hover:text-black">
                Book a Pickup
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

