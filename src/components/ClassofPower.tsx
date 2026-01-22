import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

export default function ClassofPower() {
  const [showVideo, setShowVideo] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShowVideo(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col items-center justify-start bg-black overflow-hidden pt-12 pb-8 px-6 md:pt-16 md:pb-12 md:px-8"
    >
      <div
        className="flex w-full max-w-[1200px] flex-col items-center gap-4 md:gap-6"
      >
        <h2
          className="text-center text-white font-bold"
          style={{
            fontFamily: 'Arial',
            fontSize: 'clamp(28px, 8vw, 48px)',
            lineHeight: '1.2',
            letterSpacing: '-0.8px',
            margin: 0
          }}
        >
          A New Class of Power
        </h2>
        <p
          className="text-center text-white/70"
          style={{
            fontFamily: 'Arial',
            fontWeight: 400,
            fontSize: 'clamp(12px, 3.5vw, 14px)',
            lineHeight: '1.4',
            margin: 0
          }}
        >
          Chemically restored. Technically validated. Warranty-backed.
        </p>
      </div>

      <div
        className="relative w-full flex items-center justify-center mt-4 md:mt-10"
      >
        <AnimatePresence mode="wait">
          {!showVideo ? (
            <motion.img
              key="battery-image"
              src="/car battery.png"
              alt="Car Battery"
              className="block h-auto"
              style={{
                width: 'min(1024px, 92vw)',
                objectFit: 'contain'
              }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          ) : (
            <motion.video
              key="battery-video"
              src="/classofpower.webm"
              className="block h-auto"
              style={{
                width: 'min(1024px, 92vw)',
                objectFit: 'contain'
              }}
              autoPlay
              muted
              loop
              playsInline
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
