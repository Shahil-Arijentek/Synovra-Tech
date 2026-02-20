import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

type BatteryStage = 'new' | 'used' | 'scrap'

const stageConfig: Record<BatteryStage, { label: string; description: string }> = {
  new: { label: 'OPTIMAL', description: 'Clear chemistry. Peak output.' },
  used: { label: 'DRIFTING', description: 'Sulphation rising. Output slipping.' },
  scrap: { label: 'CRITICAL', description: 'High sulphation. Value remains.' },
}

const batteryLayers = {
  chassis: '/Battery-At-Anystage/new.png',
  internal: '/Battery-At-Anystage/used.png',
  scrap: '/Battery-At-Anystage/scrap.png',
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
  const scrapRef = useRef<HTMLImageElement | null>(null)
  const labelsRef = useRef<HTMLDivElement | null>(null)
  const gsapContextRef = useRef<gsap.Context | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const headingRef = useRef(null)
  const batteryContainerRef = useRef(null)
  const bottomCardRef = useRef(null)
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.8 })
  const isBatteryInView = useInView(batteryContainerRef, { once: true, amount: 0.3 })
  const isBottomCardInView = useInView(bottomCardRef, { once: true, amount: 0.8 })


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
    const scrap = scrapRef.current
    if (!internal || !scrap || !gsapContextRef.current) {
      setActiveStage(stage)
      return
    }

    timelineRef.current?.kill()
    isAnimatingRef.current = true

    gsapContextRef.current.add(() => {
      setActiveStage(stage)

      const internalOpacity = stage === 'new' ? 0 : stage === 'used' ? 1 : 0
      const scrapOpacity = stage === 'scrap' ? 1 : 0

      const tl = gsap.timeline({
        defaults: { duration: transitionDuration, ease: 'power2.inOut' },
        onComplete: () => {
          isAnimatingRef.current = false
        },
      })

      tl.to(internal, { opacity: internalOpacity }, 0)
      tl.to(scrap, { opacity: scrapOpacity }, 0)

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
    const scrap = scrapRef.current
    if (!internal || !scrap) {
      return
    }

    const internalOpacity = activeStage === 'new' ? 0 : activeStage === 'used' ? 1 : 0
    const scrapOpacity = activeStage === 'scrap' ? 1 : 0
    gsap.set(internal, { opacity: internalOpacity })
    gsap.set(scrap, { opacity: scrapOpacity })
  }, [activeStage])

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
        className="relative overflow-hidden bg-black px-6 py-20 md:py-28 text-center text-white"
      >
      <div
        className="pointer-events-none absolute inset-x-0 top-12 mx-auto h-[38.75rem] max-w-[69.94rem] bg-[linear-gradient(270deg,rgba(0,0,0,0)_0%,#000000_8%,#000000_92%,rgba(0,0,0,0)_100%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex w-full max-w-[69.94rem] flex-col items-center gap-4 md:gap-6">
        <div ref={headingRef} className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.3,
              ease: [0.19, 1, 0.22, 1]
            }}
            className="text-[2rem] md:text-5xl lg:text-[3.75rem] font-bold tracking-[-1px] md:tracking-[-1.5px] text-white leading-tight"
          >
            We Buy Batteries at Any Stage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.7,
              ease: [0.19, 1, 0.22, 1]
            }}
            className="mt-3 text-[0.875rem] md:text-[1.125rem] font-bold leading-relaxed text-white/70"
          >
            From pristine to scrap — all chemistries, all conditions, all ages.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ 
              duration: 1.2, 
              delay: 1.1,
              ease: [0.19, 1, 0.22, 1]
            }}
            className="text-[0.875rem] md:text-[1.125rem] font-bold leading-relaxed text-white/70"
          >
            One pickup. One fair payout. No sorting.
          </motion.p>
        </div>

        <motion.div 
          ref={labelsRef} 
          initial={{ opacity: 0, y: 20 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.19, 1, 0.22, 1] }}
          className="relative z-10 mt-2 flex items-center justify-center gap-6 md:gap-10 text-center"
        >
          {(['new', 'used', 'scrap'] as BatteryStage[]).map((stage, index) => (
            <motion.button
              key={stage}
              data-stage={stage}
              initial={{ opacity: 0, y: 20 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.6, 
                delay: 1.4 + (index * 0.1),
                ease: [0.19, 1, 0.22, 1] 
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-2 py-2 text-[1.125rem] md:text-[1.25rem] font-bold tracking-[-0.5px] md:tracking-[-1px] transition-all duration-300 ${
                activeStage === stage
                  ? 'text-[#ff6b1a] drop-shadow-[0_0_8px_rgba(255,107,26,0.6)]'
                  : 'text-[#595959] hover:text-[#888]'
              }`}
              type="button"
              onClick={() => handleStageChange(stage)}
            >
              {stageConfig[stage].label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          ref={batteryContainerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isBatteryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="pointer-events-none relative -mt-8 md:-mt-16 flex h-[18.75rem] md:h-[35rem] w-full items-center justify-center"
        >
          <div className="relative h-full w-full">
            <motion.img
              ref={chassisRef}
              alt="Battery chassis"
              className="absolute inset-0 h-full w-full object-contain z-0"
              src={batteryLayers.chassis}
            />
            <img
              ref={internalRef}
              alt="Battery internal plates"
              className="absolute inset-0 h-full w-full object-contain opacity-0 z-10"
              style={{ willChange: 'opacity', imageRendering: 'auto' }}
              src={batteryLayers.internal}
            />
            <img
              ref={scrapRef}
              alt="Battery scrap condition"
              className="absolute inset-0 h-full w-full object-contain opacity-0 z-20"
              style={{ willChange: 'opacity' }}
              src={batteryLayers.scrap}
            />
          </div>
        </motion.div>
      </div>

        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[8rem] w-full md:w-[91.25rem] -translate-x-1/2 bg-gradient-to-t from-black from-[50%] to-transparent" />
        <motion.div 
          ref={bottomCardRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isBottomCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="relative mx-auto -mt-16 md:-mt-20 flex w-full max-w-[40.56rem] flex-col items-center gap-1 px-6 py-4 md:py-6 text-center"
        >
          {/* <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={isBottomCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="text-[1.375rem] md:text-[1.5rem] font-bold leading-tight text-white"
          >
            Healthy / Near New
          </motion.p> */}
          <div className="min-h-[3rem] flex items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p 
                key={activeStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className="text-[1rem] md:text-[1.125rem] leading-relaxed text-white/60"
              >
                {stageConfig[activeStage].description}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

    </>
  )
}

