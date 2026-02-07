import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ClassOfPowerHeading from "./ClassOfPowerHeading";

interface ClassofPowerProps {
  onReady?: () => void;
}

export default function ClassofPower({ onReady }: ClassofPowerProps = {}) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Preload: video is in DOM from mount (hidden) so it starts loading as soon as user lands on the page
  // Only switch to video when BOTH in-view + delay AND video is ready → no loading state, smooth transition

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowVideo(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const handleVideoCanPlay = () => {
    setVideoLoaded(true);
    if (onReady) onReady();
  };

  // Only display video when we want to show it AND it's ready to play (no spinner, no blank state)
  const displayVideo = showVideo && videoLoaded;

  useEffect(() => {
    if (displayVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [displayVideo]);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
      }
    };
  }, []);

  const mediaStyle = {
    width: "min(1024px, 92vw)",
    objectFit: "contain" as const,
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col items-center justify-start overflow-hidden pt-12 pb-8 px-6 md:pt-16 md:pb-12 md:px-8"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      <ClassOfPowerHeading />

      <div
        className="relative w-full flex items-center justify-center mt-4 md:mt-10"
        style={{ minHeight: "400px" }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{ ...mediaStyle, minHeight: "400px" }}
        >
          {/* Video: always in DOM from mount so it preloads; visible only when ready */}
          <motion.video
            ref={videoRef}
            src="/classofpower.webm"
            className="absolute inset-0 m-auto block h-auto w-full"
            style={{
              ...mediaStyle,
              background: "#0d0d0d",
              mixBlendMode: "lighten",
              opacity: displayVideo ? 1 : 0,
              pointerEvents: displayVideo ? "auto" : "none",
              transition: "opacity 0.8s ease-in-out",
            }}
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={handleVideoCanPlay}
            onLoadedData={handleVideoCanPlay}
          />

          {/* Image: show until video is ready, then crossfade out (no loading spinner) */}
          <AnimatePresence>
            {!displayVideo && (
              <motion.img
                key="battery-image"
                src="/car battery.png"
                alt="Car Battery"
                className="absolute inset-0 m-auto block h-auto"
                style={mediaStyle}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
