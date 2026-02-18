import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

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
  const staggerDelay = index * 0.01

  const enterStart = enterRange[0] + staggerDelay
  const enterEnd = enterRange[1] + staggerDelay

  const exitStart = exitRange ? exitRange[0] + staggerDelay : 1
  const exitEnd = exitRange ? exitRange[1] + staggerDelay : 1

  const opacityInput = exitRange
    ? [enterStart, enterEnd, exitStart, exitEnd]
    : [enterStart, enterEnd]
  const opacityOutput = exitRange
    ? [0, 1, 1, 0]
    : [0, 1]

  const yInput = exitRange
    ? [enterStart, enterEnd, exitStart, exitEnd]
    : [enterStart, enterEnd]
  const yOutput = exitRange
    ? [30, 0, 0, -30]
    : [30, 0]

  const blurInput = exitRange
    ? [enterStart, enterEnd, exitStart, exitEnd]
    : [enterStart, enterEnd]
  const blurOutput = exitRange
    ? ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
    : ["blur(8px)", "blur(0px)"]

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

export default function ExperienceRevival() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5
  })

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (video) {
        video.pause()
        video.src = ''
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[200vh]"
      style={{ position: 'relative' } as React.CSSProperties}
    >
      <section id="lifecycle" className="revival-experience sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden bg-black px-6 text-center text-white sm:px-8">

        {/* Background Video */}
        <div className="absolute inset-0 h-full w-full">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/Comp 1_6.webm" type="video/webm" />
          </video>
          
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black" style={{
            background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.7) 100%)'
          }} />

          <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none z-5" style={{
            background: 'linear-gradient(to bottom, transparent 0%, #000000 100%)'
          }} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto w-full max-w-full pointer-events-none px-4 sm:px-6">
          <h2 className="text-center font-['Arial'] font-black leading-[1.1] tracking-tight sm:tracking-tighter md:tracking-[-2.4px] text-white uppercase flex flex-col items-center gap-0" style={{ fontSize: 'clamp(1.25rem, 5vw, 3rem)' }}>
            <ScrollStaggeredText
              text="EXPERIENCE REVIVAL."
              progress={smoothProgress}
              enterRange={[0, 0.15]}
              className="whitespace-nowrap"
            />
            <ScrollStaggeredText
              text="EXPERIENCE PERFORMANCE."
              progress={smoothProgress}
              enterRange={[0.15, 0.30]}
              className="whitespace-nowrap"
            />
          </h2>
          <ScrollStaggeredText
            text="Redefining battery afterlife with premium, precision-engineered power built to last."
            progress={smoothProgress}
            enterRange={[0.30, 0.45]}
            className="mt-4 sm:mt-6 text-[0.75rem] sm:text-[0.875rem] md:text-[1rem] tracking-normal text-white/80 normal-case font-normal mx-auto px-2 sm:whitespace-nowrap max-w-full"
          />
        </div>
      </section>
    </div>
  );
}