import { useState } from 'react'
import ChallengesHero from './ChallengesHero'
import { AnimatePresence, motion } from 'framer-motion'

interface Challenge {
  image: string
  title: string
  problem: string
  solution: string
}

export default function Challenges() {
  const challenges: Challenge[] = [
    {
      image: '/challenges/card1.png',
      title: 'Premium Batteries Are Expensive to Replace',
      problem: 'OEM-grade batteries with warranties demand large upfront capital — making scale painful.',
      solution: 'We deliver performance-verified batteries with warranty coverage — without the cost of buying new.'
    },
    {
      image: '/challenges/card2.png',
      title: 'Returns Are Unpredictable',
      problem: 'Battery value fluctuates based on chemistry, age, and grading — making outcomes uncertain.',
      solution: 'Every battery receives a consistent, pre-defined value — creating predictable, repeatable returns.'
    },
    {
      image: '/challenges/card3.png',
      title: 'Storage and Sorting Slow You Down',
      problem: 'Testing, sorting, and storing used batteries consumes space, labor, and time.',
      solution: 'We collect mixed loads in any condition — no testing, no sorting, no preparation.'
    },
    {
      image: '/challenges/card4.png',
      title: 'Informal Handling Creates Risk',
      problem: 'Poor handling exposes brands to environmental risk, compliance gaps, and reputational damage.',
      solution: 'Our Zero Discharge Facility ensures closed-loop handling — no liquid discharge, full electrolyte reuse, and reduced chemical dependency.'
    },
  ]
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentChallenge = challenges[currentIndex]
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % challenges.length)
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + challenges.length) % challenges.length)

  return (
 <ChallengesHero title="Your Challenges, Solved" className="w-full">
      <section className="relative z-20 w-full bg-black -mt-[500px] pb-32">
        <div className="relative flex flex-col items-center px-8 mt-0">
          <div className="w-full max-w-[1040px] z-20"> 
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ x: 120, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -120, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex w-full overflow-hidden rounded-[20px] border border-white/10 bg-black shadow-[0_-5px_30px_rgba(0,0,0,0.4)]"
                style={{ height: '400px' }}
              >
                <div
                  className="h-full w-1/2 rounded-[20px] bg-black"
                  style={{
                    backgroundImage: `url(${currentChallenge.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="flex w-1/2 flex-col justify-center bg-black p-10">
                  <h3 className="mb-4 text-[24px] font-bold text-white">
                    {currentChallenge.title}
                  </h3>
                  <div className="mb-4">
                    <p className="text-[10px] font-bold uppercase text-red-500">
                      The Challenge
                    </p>
                    <p className="text-[14px] text-gray-200">{currentChallenge.problem}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-emerald-500">
                      How Synovra Solves It
                    </p>
                    <p className="text-[14px] text-gray-200">{currentChallenge.solution}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="relative z-50 mt-4 flex items-center justify-center gap-4">
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
        </div>
      </section>
  </ChallengesHero>
  )
}