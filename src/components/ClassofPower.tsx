import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ClassOfPowerHeading from "./ClassOfPowerHeading";

export default function ClassofPower() {
  const [showVideo, setShowVideo] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShowVideo(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView]);

  useEffect(() => {
    return () => {
      // Clean up video on unmount
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col items-center justify-start overflow-hidden pt-12 pb-8 px-6 md:pt-16 md:pb-12 md:px-8"
      style={{ backgroundColor: '#0d0d0d' }}
    >
      <ClassOfPowerHeading />

      <div
        className="relative w-full flex items-center justify-center mt-4 md:mt-10"
        style={{
          minHeight: '400px'
        }}
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
              ref={videoRef}
              src="/classofpower.webm"
              className="block h-auto"
              style={{
                width: 'min(1024px, 92vw)',
                objectFit: 'contain',
                background: '#0d0d0d',
                mixBlendMode: 'lighten'
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
