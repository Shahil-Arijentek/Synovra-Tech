import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

// Helper component for individual scroll-driven words
const ScrollWord = ({
  word,
  index,
  progress,
  enterRange,
  exitRange,
  isLast
}: {
  word: string,
  index: number,
  progress: MotionValue<number>,
  enterRange: [number, number],
  exitRange?: [number, number],
  isLast: boolean
}) => {
  // Stagger calculation: Shift the start/end times slightly based on index
  const staggerDelay = index * 0.015

  // Enter transforms
  const enterStart = enterRange[0] + staggerDelay
  const enterEnd = enterRange[1] + staggerDelay

  // Exit transforms (optional)
  const exitStart = exitRange ? exitRange[0] + staggerDelay : 1
  const exitEnd = exitRange ? exitRange[1] + staggerDelay : 1

  // Map opacity: 0 -> 1 (Enter) ... 1 -> 0 (Exit)
  const opacityInput = exitRange
    ? [enterStart, enterEnd, exitStart, exitEnd]
    : [enterStart, enterEnd]
  const opacityOutput = exitRange
    ? [0, 1, 1, 0]
    : [0, 1]

  // Map Y position: 50 -> 0 (Enter) ... 0 -> -50 (Exit)
  const yInput = exitRange
    ? [enterStart, enterEnd, exitStart, exitEnd]
    : [enterStart, enterEnd]
  const yOutput = exitRange
    ? [50, 0, 0, -50]
    : [50, 0]

  // Map Blur: 10px -> 0px (Enter) ... 0px -> 10px (Exit)
  const blurInput = exitRange
    ? [enterStart, enterEnd, exitStart, exitEnd]
    : [enterStart, enterEnd]
  const blurOutput = exitRange
    ? ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
    : ["blur(10px)", "blur(0px)"]

  const opacity = useTransform(progress, opacityInput, opacityOutput)
  const y = useTransform(progress, yInput, yOutput)
  const filter = useTransform(progress, blurInput, blurOutput)

  return (
    <motion.span
      style={{ opacity, y, filter }}
      className={`inline-block ${!isLast ? 'mr-[0.25em]' : ''}`}
    >
      {word}
    </motion.span>
  )
}

// Container for splitting text into scroll-driven words
const ScrollStaggeredText = ({
  text,
  progress,
  enterRange,
  exitRange,
  className,
  style
}: {
  text: string,
  progress: MotionValue<number>,
  enterRange: [number, number],
  exitRange?: [number, number],
  className?: string,
  style?: React.CSSProperties
}) => {
  const words = text.split(' ')
  return (
    <div className={className} style={style}>
      {words.map((word, i) => (
        <ScrollWord
          key={i}
          word={word}
          index={i}
          progress={progress}
          enterRange={enterRange}
          exitRange={exitRange}
          isLast={i === words.length - 1}
        />
      ))}
    </div>
  )
}

export default function BatteryHero() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress of the specific container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // ---- RANGES ----
  // Stage 1 (Intro): 0.0 - 0.3
  // Stage 2 (Deliver): 0.35 - 0.65
  // Stage 3 (Trace): 0.7 - 1.0

  // --- STAGE 1 (Intro) ---
  // Managed by variants (load) + scroll exit
  const stage1ExitOpacity = useTransform(scrollYProgress, [0.25, 0.35], [1, 0])
  const stage1ExitScale = useTransform(scrollYProgress, [0.25, 0.35], [1, 0.9])
  const stage1ExitY = useTransform(scrollYProgress, [0.25, 0.35], [0, -50])
  const stage1ExitFilter = useTransform(scrollYProgress, [0.25, 0.35], ["blur(0px)", "blur(10px)"])

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const mainHeading = "A system for extending battery life, restoring performance, and closing the materials loop."
  const words = mainHeading.split(' ')

  // Letter animation variants
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  }

  // Calculate global index for continuous stagger across words
  let globalLetterCount = 0

  return (
    // Outer scroll track - defines the total scroll distance (time)
    // 300vh = 3 screens worth of scrolling time
    <div
      ref={containerRef}
      className="relative w-full h-[300vh] bg-black"
    >
      {/* Sticky Inner Container - The visible viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">

        {/* Background Video (Persists through all stages) */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/Comp 1_6.webm" type="video/webm" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Vignette Effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black" style={{
            background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.7) 100%)'
          }} />

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none z-5" style={{
            background: 'linear-gradient(to bottom, transparent 0%, #000000 100%)'
          }} />
        </div>

        {/* --- STAGE 1 CONTENT (Intro) --- */}
        <motion.div
          style={{ opacity: stage1ExitOpacity, scale: stage1ExitScale, y: stage1ExitY, filter: stage1ExitFilter }}
          className="absolute inset-0 flex items-center justify-center z-10 px-4"
        >
          <div className="max-w-[1400px] mx-auto text-center">
            <h1
              className="text-white text-center max-w-[1000px] mx-auto"
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: 'clamp(32px, 5vw, 62px)',
                fontWeight: 900,
                lineHeight: '120%',
                letterSpacing: '-2.4px'
              }}
            >
              {words.map((word, wordIndex) => {
                // Return a wrapper for the word to keep letters together
                const wordElement = (
                  <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split('').map((char, charIndex) => {
                      // Apply global delay based on the running count
                      const delay = 0.2 + (globalLetterCount * 0.02)
                      globalLetterCount++ // Increment for next letter

                      return (
                        <motion.span
                          key={charIndex}
                          variants={letterVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{
                            delay: delay,
                            duration: 0.8,
                            ease: [0.2, 0.65, 0.3, 0.9]
                          }}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      )
                    })}
                  </span>
                )
                return wordElement
              })}
            </h1>
          </div>
        </motion.div>

        {/* --- STAGE 2 CONTENT --- */}
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4 pointer-events-none">
          <ScrollStaggeredText
            text="BUILT TO DELIVER IT."
            progress={scrollYProgress}
            enterRange={[0.32, 0.42]}
            exitRange={[0.58, 0.68]}
            className="text-center"
            style={{
              color: '#71717B',
              fontFamily: 'Arial, sans-serif',
              fontSize: 'clamp(20px, 3vw, 36px)',
              fontWeight: 900,
              lineHeight: '25.579px',
              letterSpacing: '0.448px',
              textTransform: 'uppercase'
            }}
          />
        </div>

        {/* --- STAGE 3 CONTENT --- */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 px-4 pointer-events-none">
          <div className="text-center">
            <ScrollStaggeredText
              text="Trace the Battery Afterlife"
              progress={scrollYProgress}
              enterRange={[0.65, 0.75]}
              className="text-white mb-4 block"
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: 'clamp(24px, 4vw, 42px)',
                fontWeight: 700,
                letterSpacing: '-1px'
              }}
            />
            <ScrollStaggeredText
              text="Witness the full journey from degradation to certified revival and recycle"
              progress={scrollYProgress}
              enterRange={[0.68, 0.78]} // Slight delay after title
              className="text-gray-400 max-w-2xl mx-auto text-lg sm:text-xl block"
            />
          </div>
        </div>

      </div>
    </div>
  )
}
