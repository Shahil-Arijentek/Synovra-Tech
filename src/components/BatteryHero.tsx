import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

export default function BatteryHero() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects based on scroll - slower transitions
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.7], [0, 150])

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // Split text into words for animation
  const mainHeading = "A system for extending battery life, restoring performance, and closing the materials loop."
  const words = mainHeading.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  }

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(2px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  }

  return (
    <div 
      ref={containerRef}
      className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      style={{ backgroundColor: '#000000' }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src="/Comp 1_6.webm" type="video/webm" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Vignette Effect - Fade edges to black */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black" style={{
        background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.7) 100%)'
      }} />

      {/* Bottom Gradient Fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none z-5" style={{
        background: 'linear-gradient(to bottom, transparent 0%, #000000 100%)'
      }} />

      {/* Content */}
      <motion.div 
        ref={contentRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ opacity, scale, y, willChange: 'transform, opacity' }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center"
      >
        {/* Main Heading - Word by Word Animation */}
        <motion.h1 
          className="text-white text-center mb-6 sm:mb-8 md:mb-10 max-w-[1000px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ 
            willChange: 'opacity',
            fontFamily: 'Arial, sans-serif',
            fontSize: 'clamp(32px, 5vw, 62px)',
            fontWeight: 900,
            lineHeight: '120%',
            letterSpacing: '-2.4px',
            fontStyle: 'normal'
          }}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block mr-[0.3em]"
              style={{ willChange: 'transform, opacity' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ 
            willChange: 'transform, opacity',
            color: '#71717B',
            fontFamily: 'Arial, sans-serif',
            fontSize: 'clamp(20px, 3vw, 36px)',
            fontWeight: 900,
            lineHeight: '25.579px',
            letterSpacing: '0.448px',
            textTransform: 'uppercase',
            fontStyle: 'normal'
          }}
        >
          BUILT TO DELIVER IT.
        </motion.p>

        {/* Bottom Section */}
        <motion.div 
          className="flex flex-col items-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.9, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform, opacity' }}
        >
          <motion.h2 
            className="text-lg sm:text-xl md:text-2xl text-white font-normal"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            Trace the Battery Afterlife
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base text-gray-400 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 2.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Witness the full journey from degradation to certified revival and recycle
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}
