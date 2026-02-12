import { useState, useEffect, useRef } from 'react'
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

export default function BatteryHero() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5
  })

  const stage1ExitOpacity = useTransform(smoothProgress, [0.12, 0.28], [1, 0], {
    clamp: false
  })
  const stage1ExitScale = useTransform(smoothProgress, [0.12, 0.28], [1, 0.92], {
    clamp: false
  })
  const stage1ExitY = useTransform(smoothProgress, [0.12, 0.28], [0, -30], {
    clamp: false
  })
  const stage1ExitFilter = useTransform(smoothProgress, [0.12, 0.28], ["blur(0px)", "blur(8px)"], {
    clamp: false
  })

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)
    
    return () => window.removeEventListener('resize', checkIsDesktop)
  }, [])

  useEffect(() => {
    if (isDesktop && videoLoaded && videoRef.current && shouldLoadVideo) {
      const playVideo = async () => {
        try {
          await videoRef.current?.play()
        } catch (error) {
          console.log('Video autoplay blocked, but video is loaded')
        }
      }
      playVideo()
    }
  }, [videoLoaded, shouldLoadVideo, isDesktop])

  useEffect(() => {
    if (!isDesktop) {
      return
    }

    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    const slowConnection = connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g'
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (slowConnection || prefersReducedMotion) {
      setVideoLoaded(true)
      return
    }

    const checkIfInViewport = () => {
      if (!containerRef.current) return false
      const rect = containerRef.current.getBoundingClientRect()
      return rect.top < window.innerHeight && rect.bottom > 0
    }

    if (checkIfInViewport()) {
      setShouldLoadVideo(true)
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load()
        }
      }, 100)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadVideo) {
            setShouldLoadVideo(true)
            setTimeout(() => {
              if (videoRef.current) {
                videoRef.current.load()
              }
            }, 100)
          }
        })
      },
      {
        rootMargin: '200px',
        threshold: 0.1
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    const fallbackTimer = setTimeout(() => {
      if (!shouldLoadVideo && containerRef.current) {
        setShouldLoadVideo(true)
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.load()
          }
        }, 100)
      }
    }, 500)

    return () => {
      clearTimeout(fallbackTimer)
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [shouldLoadVideo, isDesktop])

  const mainHeading = "A system for extending battery life, restoring performance, and closing the materials loop."
  const words = mainHeading.split(' ')

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
        ease: [0.2, 0.65, 0.3, 0.9] as const
      }
    }
  }

  let globalLetterCount = 0

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[200vh] bg-black"
      style={{ position: 'relative' }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">

        <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-black lg:hidden" />
          
          {isDesktop && (
            <>
              {!videoLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 hidden lg:block" />
              )}
              
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload={shouldLoadVideo ? "auto" : "none"}
                onLoadedData={() => {
                  setVideoLoaded(true)
                  if (videoRef.current) {
                    const currentSrc = videoRef.current.currentSrc
                    if (currentSrc && !currentSrc.includes('Comp 1_6.webm')) {
                      console.warn('Video fallback detected: Using MP4 instead of WebM')
                    }
                    videoRef.current.play().catch(() => {})
                  }
                }}
                onError={(e) => {
                  console.error('Video load error:', e)
                  setVideoLoaded(true)
                }}
                onCanPlay={() => {
                  setVideoLoaded(true)
                  if (videoRef.current) {
                    const currentSrc = videoRef.current.currentSrc
                    if (currentSrc && !currentSrc.includes('Comp 1_6.webm')) {
                      console.warn('Video fallback detected: Using MP4 instead of WebM')
                    }
                    videoRef.current.play().catch(() => {})
                  }
                }}
                onPlay={() => setVideoLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 hidden lg:block ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              >
                {shouldLoadVideo && (
                  <>
                    <source src="/Comp 1_6.webm" type="video/webm" />
                  </>
                )}
              </video>

              <div className="absolute inset-0 bg-black/40 hidden lg:block" />

              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black hidden lg:block" style={{
                background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.7) 100%)'
              }} />

              <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none z-5 hidden lg:block" style={{
                background: 'linear-gradient(to bottom, transparent 0%, #000000 100%)'
              }} />
            </>
          )}
        </div>

        <motion.div
          style={{ opacity: stage1ExitOpacity, scale: stage1ExitScale, y: stage1ExitY, filter: stage1ExitFilter }}
          className="absolute inset-0 flex items-center justify-center z-10 px-4"
        >
          <div className="max-w-[87.5rem] mx-auto text-center">
            <h1
              className="text-white text-center max-w-[62.5rem] mx-auto text-[clamp(1.25rem,3.5vw,2rem)] lg:text-[clamp(2.25rem,4.25vw,3.25rem)]"
              style={{
                fontFamily: 'Arial, sans-serif',
                fontWeight: 900,
                lineHeight: '120%',
                letterSpacing: '-2.4px'
              }}
            >
              {words.map((word, wordIndex) => {
                const wordElement = (
                  <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split('').map((char, charIndex) => {
                      const delay = 0.2 + (globalLetterCount * 0.02)
                      globalLetterCount++

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
                            ease: [0.2, 0.65, 0.3, 0.9] as const
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

        <div className="absolute inset-0 flex items-center justify-center z-20 px-4 pointer-events-none">
          <ScrollStaggeredText
            text="BUILT TO DELIVER IT."
            progress={smoothProgress}
            enterRange={[0.20, 0.35]}
            exitRange={[0.45, 0.60]}
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

        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 px-4 pointer-events-none">
          <div className="text-center">
            <ScrollStaggeredText
              text="Trace the Battery Afterlife"
              progress={smoothProgress}
              enterRange={[0.52, 0.68]}
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
              progress={smoothProgress}
              enterRange={[0.60, 0.75]}
              className="text-gray-400 max-w-2xl mx-auto text-lg sm:text-xl block"
            />
          </div>
        </div>

      </div>
    </div>
  )
}
