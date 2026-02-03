import { useState, useRef } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

interface ProofSlide {
  image: string
  alt: string
  headline: string
  subhead: string
}

export default function ProofInAction() {
  const headingRef = useRef(null)
  const carouselRef = useRef(null)
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.8 })
  const isCarouselInView = useInView(carouselRef, { once: true, amount: 0.3 })
  
  const slideVariants = {
    enter: (dir: number) => ({ 
      x: dir > 0 ? 100 : -100, 
      opacity: 0,
      scale: 0.95,
      filter: 'blur(4px)'
    }),
    center: { 
      x: 0, 
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)'
    },
    exit: (dir: number) => ({ 
      x: dir > 0 ? -60 : 60, 
      opacity: 0,
      scale: 0.98,
      filter: 'blur(2px)'
    })
  }
  const textVariants = {
    enter: (dir: number) => ({ 
      y: dir > 0 ? 30 : -30, 
      opacity: 0,
      scale: 0.95
    }),
    center: { 
      y: 0, 
      opacity: 1,
      scale: 1
    },
    exit: (dir: number) => ({ 
      y: dir > 0 ? -20 : 20, 
      opacity: 0,
      scale: 0.98
    })
  }

  const slides: ProofSlide[] = [
    {
      image: '/proof-in-action/image1.webp',
      alt: 'UPS racks in a live data center',
      headline: 'First in India to Deliver Third-Life UPS Revival',
      subhead: 'Warranty-backed revival deployed in live UPS systems.'
    },
    {
      image: '/proof-in-action/image2.webp',
      alt: 'Warranty-active VRLA battery in industrial environment',
      headline: 'Two-Year Warranties on Seven-Year-Old VRLA Batteries',
      subhead: 'Issued for enterprise-grade deployments supporting global operations.'
    },
    {
      image: '/proof-in-action/image3.webp',
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
      <div ref={headingRef} className="mx-auto flex max-w-6xl flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.3,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="text-center text-[32px] md:text-5xl font-bold leading-tight"
        >
          Proven in Live Environments
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.7,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="mt-3 text-center text-sm sm:text-base md:text-base lg:text-lg text-white/70"
        >
          Operating where failure isn't an option
        </motion.p>

          <motion.div 
            ref={carouselRef}
            initial={{ opacity: 0, y: 60 }}
            animate={isCarouselInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="mt-8 md:mt-12 flex w-full flex-col items-center"
          >
            <div className="w-full overflow-hidden rounded-[20px] md:rounded-[24px] border border-white/5 bg-black shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ 
                    duration: 0.7, 
                    ease: [0.19, 1, 0.22, 1]
                  }}
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
                transition={{ 
                  duration: 0.6, 
                  ease: [0.19, 1, 0.22, 1]
                }}
              >
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-xl md:text-3xl font-semibold leading-tight"
                >
                  {currentSlide.headline}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mt-2 md:mt-3 text-sm sm:text-base md:text-base lg:text-lg text-white/70"
                >
                  {currentSlide.subhead}
                </motion.p>
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
        </motion.div>
      </div>
    </section>
  )
}

