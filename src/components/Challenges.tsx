import { useState, useRef } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

interface Challenge {
  image: string
  title: string
  problem: string
  solution: string
}

export default function Challenges() {
  const challenges: Challenge[] = [
    {
      image: '/challenges/card1.webp',
      title: 'Premium Batteries Are Expensive to Replace',
      problem: 'OEM-grade batteries with warranties demand large upfront capital — making scale painful.',
      solution: 'We deliver performance-verified batteries with warranty coverage — without the cost of buying new.'
    },
    {
      image: '/challenges/card2.webp',
      title: 'Returns Are Unpredictable',
      problem: 'Battery value fluctuates based on chemistry, age, and grading — making outcomes uncertain.',
      solution: 'Every battery receives a consistent, pre-defined value — creating predictable, repeatable returns.'
    },
    {
      image: '/challenges/card3.webp',
      title: 'Storage and Sorting Slow You Down',
      problem: 'Testing, sorting, and storing used batteries consumes space, labor, and time.',
      solution: 'We collect mixed loads in any condition — no testing, no sorting, no preparation.'
    },
    {
      image: '/challenges/card4.webp',
      title: 'Informal Handling Creates Risk',
      problem: 'Poor handling exposes brands to environmental risk, compliance gaps, and reputational damage.',
      solution: 'Our Zero Discharge Facility ensures closed-loop handling — no liquid discharge, full electrolyte reuse, and reduced chemical dependency.'
    },
  ]
  const [currentIndex, setCurrentIndex] = useState(0)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.8 })
  const isCardsInView = useInView(cardsRef, { once: true, amount: 0.3 })
  const currentChallenge = challenges[currentIndex]
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % challenges.length)
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + challenges.length) % challenges.length)

  return (
    <section className="relative w-full bg-black py-16 md:py-24">
      {/* Heading Section */}
      <div ref={headingRef} className="text-center px-6 md:px-8 mb-12 md:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.3,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Your Challenges, Solved
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.7,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="max-w-[781px] mx-auto font-['Arial'] text-[#9CA3AF] text-sm sm:text-base md:text-base lg:text-lg"
        >
          We eliminate the cost, risk, and unpredictability from your battery afterlife.
        </motion.p>
      </div>

      {/* Cards Section */}
      <motion.div 
        ref={cardsRef}
        initial={{ opacity: 0, y: 60 }}
        animate={isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        className="relative flex flex-col items-center px-4 sm:px-6 md:px-8"
      >
        <div className="w-full max-w-[1200px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row w-full gap-8 md:gap-12 items-center md:items-start"
            >
              {/* Image with border */}
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: -40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              >
                <div
                  className="w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-[20px] border-2 border-black overflow-hidden shadow-2xl"
                  style={{
                    backgroundImage: `url(${currentChallenge.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </motion.div>

              {/* Text content without box */}
              <div className="flex w-full md:w-1/2 flex-col justify-center items-center md:items-start text-center md:text-left px-4 md:px-0 h-[300px] sm:h-[350px] md:h-[400px]">
                <motion.h3 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
                  className="mb-4 sm:mb-6 text-[16px] sm:text-[28px] md:text-[32px] font-bold text-white leading-tight"
                >
                  {currentChallenge.title}
                </motion.h3>
                <motion.div 
                  className="mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                >
                  <p className="text-[11px] sm:text-[14px] md:text-[15px] font-bold uppercase text-red-500 mb-1 sm:mb-2">
                    The Challenge
                  </p>
                  <p className="text-xs sm:text-lg md:text-lg lg:text-xl text-gray-200 leading-relaxed">{currentChallenge.problem}</p>
                </motion.div>
                <motion.div 
                  className="mb-0"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                >
                  <p className="text-[11px] sm:text-[14px] md:text-[15px] font-bold uppercase text-emerald-500 mb-1 sm:mb-2">
                    How Synovra Solves It
                  </p>
                  <p className="text-xs sm:text-lg md:text-lg lg:text-xl text-gray-200 leading-relaxed">{currentChallenge.solution}</p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navigation Buttons */}
        <div className="relative mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous challenge"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next challenge"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </motion.div>
    </section>
  )
}