import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface ProofSlide {
  image: string
  alt: string
  headline: string
  subhead: string
}

export default function ProofInAction() {
  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 })
  }
  const textVariants = {
    enter: (dir: number) => ({ y: dir > 0 ? 18 : -18, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir: number) => ({ y: dir > 0 ? -18 : 18, opacity: 0 })
  }

  const slides: ProofSlide[] = [
    {
      image: '/proof-in-action/image1.png',
      alt: 'UPS racks in a live data center',
      headline: 'First in India to Deliver Third-Life UPS Revival',
      subhead: 'Warranty-backed revival deployed in live UPS systems.'
    },
    {
      image: '/proof-in-action/image2.png',
      alt: 'Warranty-active VRLA battery in industrial environment',
      headline: 'Two-Year Warranties on Seven-Year-Old VRLA Batteries',
      subhead: 'Issued for enterprise-grade deployments supporting global operations.'
    },
    {
      image: '/proof-in-action/image3.png',
      alt: 'Live battery swap programs at scale',
      headline: 'Live Battery Swap Programs, Executed at Scale',
      subhead: 'Revived batteries operating in active UPS environments.'
    }
  ]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const currentSlide = slides[currentIndex]
  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }
  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="bg-black px-6 py-12 md:py-20 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        <h2 className="text-center text-[32px] md:text-5xl font-bold leading-tight">
          Proven in Live Environments
        </h2>
        <p className="mt-3 text-center text-xs md:text-base text-white/70">
          Operating where failure isn't an option
        </p>

          <div className="mt-8 md:mt-12 flex w-full flex-col items-center">
            <div className="w-full overflow-hidden rounded-[20px] md:rounded-[24px] border border-white/5 bg-black shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="overflow-hidden rounded-[20px] md:rounded-[24px]"
                >
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.alt}
                    className="block aspect-[4/3] md:aspect-[16/8] lg:aspect-[16/7] w-full rounded-[20px] md:rounded-[24px] object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

          <div className="mt-6 md:mt-8 text-center px-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <h3 className="text-xl md:text-3xl font-semibold leading-tight">
                  {currentSlide.headline}
                </h3>
                <p className="mt-2 md:mt-3 text-[13px] md:text-base text-white/70">
                  {currentSlide.subhead}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous proof"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next proof"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

