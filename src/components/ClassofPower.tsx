import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ClassOfPowerHeading from "./ClassOfPowerHeading";

interface ClassofPowerProps {
  onReady?: () => void;
}

export default function ClassofPower({ onReady }: ClassofPowerProps = {}) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShowVideo(true);
        setIsLoading(true); // Start loading when video should appear
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Handle video loading
  const handleVideoCanPlay = () => {
    setVideoLoaded(true);
    setIsLoading(false);
    // Notify parent that video is ready
    if (onReady) {
      onReady();
    }
  };

  const handleVideoLoadStart = () => {
    setIsLoading(true);
  };

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
            <>
              {/* Loading indicator while video buffers - Dual rotating rings */}
              {isLoading && !videoLoaded && (
                <motion.div
                  key="video-loading"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-16 h-16">
                    {/* Outer rotating ring */}
                    <div className="absolute inset-0 border-4 border-transparent border-t-[#ff6b1a] border-r-[#ff6b1a] rounded-full animate-spin" />
                    {/* Inner rotating ring (reverse) */}
                    <div className="absolute inset-2 border-4 border-transparent border-b-[#ff8c42] border-l-[#ff8c42] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                  </div>
                </motion.div>
              )}
              
              {/* Video element */}
              <motion.video
                key="battery-video"
                ref={videoRef}
                src="/classofpower.webm"
                className="block h-auto"
                style={{
                  width: 'min(1024px, 92vw)',
                  objectFit: 'contain',
                  background: '#0d0d0d',
                  mixBlendMode: 'lighten',
                  opacity: videoLoaded ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out'
                }}
                autoPlay
                muted
                loop
                playsInline
                onLoadStart={handleVideoLoadStart}
                onCanPlay={handleVideoCanPlay}
                onLoadedData={handleVideoCanPlay}
                preload="auto"
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
