import { useState, useRef } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

// Define the slide interface
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

  const slides: ProofSlide[] = [
    {
      image: '/proof-in-action/image1.webp',
      alt: 'UPS racks in a live data center',
      headline: 'First in India to Deliver Third-Life UPS Revival',
      subhead: 'Warranty-backed revival deployed in live UPS systems.'
    },
    {
      image: '/proof-in-action/image2.webp',
      alt: 'Industrial environment',
      headline: 'Two-Year Warranties on Seven-Year-Old VRLA Batteries',
      subhead: 'Enterprise-grade deployments supporting global operations.'
    },
    {
      image: '/proof-in-action/image3.webp',
      alt: 'Live battery swap programs',
      headline: 'Live Battery Swap Programs, Executed at Scale',
      subhead: 'Revived batteries operating in active UPS environments.'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="bg-black px-6 py-20 md:py-28 text-white overflow-hidden">
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        
        {/* --- Heading Section --- */}
        <div ref={headingRef} className="flex flex-col items-center mb-0">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="text-center text-[2rem] md:text-5xl font-bold leading-tight"
          >
            Proven in Live Environments
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="mt-3 text-center text-sm sm:text-base md:text-base lg:text-lg text-white/70"
          >
            Operating where failure isn't an option
          </motion.p>
        </div>

        {/* --- Carousel Section with Spacing --- */}
        <motion.div 
          ref={carouselRef}
          initial={{ opacity: 0, y: 60 }}
          animate={isCarouselInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1.2, delay: 1.3, ease: [0.19, 1, 0.22, 1] }}
          className="w-full flex flex-col items-center -mt-4"
        >
          {/* Increased height to prevent clipping shadow/space */}
          <div className="relative flex items-center justify-center w-full h-[300px] md:h-[450px] lg:h-[500px]">
            {slides.map((slide, i) => {
              let offset = i - currentIndex;
              if (offset > 1) offset -= slides.length;
              if (offset < -1) offset += slides.length;

              const isActive = i === currentIndex;

              return (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    /* Adjust the multiplier (e.g., 95% or 100%) to increase/decrease 
                       the gap between the containers 
                    */
                    x: `${offset * 95}%`, 
                    scale: isActive ? 1 : 0.8,
                    opacity: isActive ? 1 : 0.3,
                    zIndex: isActive ? 10 : 5,
                    display: Math.abs(offset) > 1 ? "none" : "block"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 150, 
                    damping: 22,
                  }}
                  className="absolute w-[85%] lg:max-w-4xl aspect-[4/3] md:aspect-[16/8] lg:aspect-[16/7] overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border border-white/5 bg-neutral-900 shadow-2xl"
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* --- Dynamic Text Content --- */}
          <div className="mt-2 text-center px-2 min-h-[100px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              >
                <h3 className="text-xl md:text-3xl font-semibold leading-tight">
                  {slides[currentIndex].headline}
                </h3>
                <p className="mt-3 text-sm sm:text-base md:text-base lg:text-lg text-white/70">
                  {slides[currentIndex].subhead}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- Navigation --- */}
          <div className="mt-0 flex items-center justify-center gap-6">
            <button
              onClick={handlePrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}