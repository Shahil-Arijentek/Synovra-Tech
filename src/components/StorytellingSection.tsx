import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { priorityPreloader, type PreloadTask } from '../utils/priorityPreloader';
import { bandwidthDetector } from '../utils/bandwidthDetector';
import { useNavbar } from '../contexts/NavbarContext';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 59;
interface StorytellingProps {
  onReady?: () => void;
}

const StorytellingSection: React.FC<StorytellingProps> = ({ onReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.3 });
  const [isMounted, setIsMounted] = React.useState(false);
  const [isReady] = React.useState(true); 
  const [currentVideo, setCurrentVideo] = React.useState(1);
  const [video1Frame, setVideo1Frame] = React.useState(1);
  const [video2Frame, setVideo2Frame] = React.useState(1);
  const [video3Frame, setVideo3Frame] = React.useState(1);
  const { setNavbarVisible } = useNavbar();
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    setNavbarVisible(true);
    
    const mountTimer = setTimeout(() => {
      setIsMounted(true);
      if (onReady) {
        onReady();
      }
    }, 100);
    return () => clearTimeout(mountTimer);
  }, [onReady, setNavbarVisible]);

  useEffect(() => {
    // Enhanced preloading with priority system
    const preloadStorytellingFrames = () => {
      const networkInfo = bandwidthDetector.getNetworkInfo();
      const preloadCount = networkInfo.isSlowConnection ? 10 : 20;
      
      // Preload first frames of all videos
      const tasks: PreloadTask[] = [];
      
      // Video 1: First 10-20 frames
      for (let frame = 1; frame <= preloadCount; frame++) {
        if (frame <= FRAME_COUNT) {
          tasks.push({
            url: `/whyrevive/frames/video1/frame_${String(frame).padStart(4, '0')}.webp`,
            type: 'frame',
            priority: frame <= 5 ? 'high' : 'medium'
          } as PreloadTask);
        }
      }
      
      // Video 2-3: First 5 frames each
      for (let video = 2; video <= 3; video++) {
        for (let frame = 1; frame <= 5; frame++) {
          tasks.push({
            url: `/whyrevive/frames/video${video}/frame_${String(frame).padStart(4, '0')}.webp`,
            type: 'frame',
            priority: 'medium'
          } as PreloadTask);
        }
      }
      
      priorityPreloader.addTasks(tasks);
    };
    
    const timer = setTimeout(preloadStorytellingFrames, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isMounted) return;

    setNavbarVisible(true);
    
    const scrollToSection = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScroll > 100) {
        const element = document.getElementById('why-revive');
        if (element) {
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({ top: Math.max(0, elementTop), behavior: 'instant' });
          
          const lenisInstance = (window as any).lenis;
          if (lenisInstance) {
            lenisInstance.scrollTo(Math.max(0, elementTop), { immediate: true });
          }
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
        const lenisInstance = (window as any).lenis;
        if (lenisInstance) {
          lenisInstance.scrollTo(0, { immediate: true });
        }
      }
    };

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.set([layer2Ref.current, layer3Ref.current], { opacity: 0 });

      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: 1,
        onEnter: () => {
          setNavbarVisible(false);
        },
        onLeave: () => {
          setNavbarVisible(true);
        },
        onEnterBack: () => {
          setNavbarVisible(false);
        },
        onLeaveBack: () => {
          setNavbarVisible(true);
        },
        onUpdate: (self) => {
          const progress = self.progress;
          
          if (progress < 0.33) {
            setCurrentVideo(1);
            const frameProgress = progress / 0.33;
            const frameIndex = Math.floor(frameProgress * (FRAME_COUNT - 1)) + 1;
            setVideo1Frame(Math.max(1, Math.min(frameIndex, FRAME_COUNT)));
          } else if (progress >= 0.33 && progress < 0.66) {
            setCurrentVideo(2);
            const frameProgress = (progress - 0.33) / 0.33;
            const frameIndex = Math.floor(frameProgress * (FRAME_COUNT - 1)) + 1;
            setVideo2Frame(Math.max(1, Math.min(frameIndex, FRAME_COUNT)));
          } else {
            setCurrentVideo(3);
            const frameProgress = (progress - 0.66) / 0.34;
            const frameIndex = Math.floor(frameProgress * (FRAME_COUNT - 1)) + 1;
            setVideo3Frame(Math.max(1, Math.min(frameIndex, FRAME_COUNT)));
          }
        }
      });
      
      scrollTriggerRef.current = scrollTriggerInstance;

      const tl = gsap.timeline({
        scrollTrigger: scrollTriggerInstance
      });

      tl.to(layer1Ref.current, { opacity: 0, duration: 0.1 }, 0.28)
        .to(layer2Ref.current, { opacity: 1, duration: 0.1 }, 0.33);

      tl.to(layer2Ref.current, { opacity: 0, duration: 0.1 }, 0.61)
        .to(layer3Ref.current, { opacity: 1, duration: 0.1 }, 0.66);

    }, containerRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      scrollToSection();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      setNavbarVisible(true);
      ctx.revert();
    };
  }, [isMounted, setNavbarVisible]);

  useEffect(() => {
    if (!isReady) return;

    const preloadUpcoming = () => {
      const networkInfo = bandwidthDetector.getNetworkInfo();
      const basePreloadCount = networkInfo.isSlowConnection ? 30 : 50;
      const framesToPreload = basePreloadCount;
      
      let startFrame = 1;
      if (currentVideo === 1) startFrame = video1Frame;
      else if (currentVideo === 2) startFrame = video2Frame;
      else startFrame = video3Frame;

      const tasks: PreloadTask[] = [];
      for (let i = 1; i <= framesToPreload; i++) {
        const nextFrame = startFrame + i;
        if (nextFrame <= FRAME_COUNT) {
          const url = `/whyrevive/frames/video${currentVideo}/frame_${String(nextFrame).padStart(4, '0')}.webp`;
          tasks.push({
            url,
            type: 'frame',
            priority: i <= 20 ? 'high' : 'medium' // Increased from 10 to 20
          } as PreloadTask);
        }
      }
      
     
      if (currentVideo < 3) {
        for (let frame = 1; frame <= 20; frame++) { 
          tasks.push({
            url: `/whyrevive/frames/video${currentVideo + 1}/frame_${String(frame).padStart(4, '0')}.webp`,
            type: 'frame',
            priority: frame <= 10 ? 'high' : 'medium'
          } as PreloadTask);
        }
      }
      
      for (let i = 1; i <= 10; i++) {
        const prevFrame = startFrame - i;
        if (prevFrame >= 1) {
          const url = `/whyrevive/frames/video${currentVideo}/frame_${String(prevFrame).padStart(4, '0')}.webp`;
          tasks.push({
            url,
            type: 'frame',
            priority: 'medium'
          } as PreloadTask);
        }
      }
      
      priorityPreloader.addTasks(tasks);
    };

    preloadUpcoming();
  }, [currentVideo, video1Frame, video2Frame, video3Frame, isReady]);

  return (
    <div 
      id="why-revive" 
      ref={containerRef} 
      className={`relative w-full h-[250vh] bg-black z-10 transition-opacity duration-300 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-b from-transparent via-black/50 to-[#000000] pointer-events-none z-20" />
      <div className="w-full h-screen flex flex-col items-center justify-start pt-[10vh] sm:pt-[12vh] md:pt-[15vh] overflow-hidden">
        <div className="relative w-[70%] h-[28%] sm:w-[55%] sm:h-[35%] md:w-[45%] md:h-[50%] z-0 pointer-events-none bg-black mt-4 sm:mt-0">
          <img 
            src={`/whyrevive/frames/video1/frame_${String(video1Frame).padStart(4, '0')}.webp`}
            alt="Battery lifecycle visualization 1"
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200 ${currentVideo === 1 ? 'opacity-100' : 'opacity-0'}`}
            style={{ mixBlendMode: 'screen' }}
          />
          <img 
            src={`/whyrevive/frames/video2/frame_${String(video2Frame).padStart(4, '0')}.webp`}
            alt="Battery lifecycle visualization 2"
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200 ${currentVideo === 2 ? 'opacity-100' : 'opacity-0'}`}
            style={{ mixBlendMode: 'screen' }}
          />
          <img 
            src={`/whyrevive/frames/video3/frame_${String(video3Frame).padStart(4, '0')}.webp`}
            alt="Battery lifecycle visualization 3"
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200 ${currentVideo === 3 ? 'opacity-100' : 'opacity-0'}`}
            style={{ mixBlendMode: 'screen' }}
          />
        </div>

        <div className="relative flex-1 w-full max-w-6xl mt-8 sm:mt-8 md:mt-4 pointer-events-none z-10 px-4 overflow-hidden">
          <div ref={layer1Ref} className="absolute inset-0 flex flex-col items-center text-center">
            <motion.h2
              ref={headingRef}
              initial={{ opacity: 0, y: 40 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.19, 1, 0.22, 1]
              }}
              className="text-white mb-4 sm:mb-6 md:mb-12 px-4 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed md:leading-[2.438rem] max-w-[42.5rem] break-words"
            >
              A global shift to a greener future is underway — the kind where the impossible is becoming everyday life.
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-4 md:gap-6 w-full px-4 pointer-events-auto max-w-5xl">
              {['Electric mobility.', 'Renewable energy.', 'Regulated recycling.'].map((text, i) => (
                <div key={i} className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl py-4 sm:py-5 md:py-10 px-3 sm:px-4 md:px-6">
                  <p className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg font-bold">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div ref={layer2Ref} className="absolute inset-0 flex flex-col items-center text-center mt-2 sm:-mt-8 md:mt-0 opacity-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-full px-4 pointer-events-auto max-w-6xl mb-2 sm:mb-3 md:mb-4">
              <ProblemCard title="CO2 surges" subtitle="→ from nonstop mining and smelting" />
              <ProblemCard title="Mines expand" subtitle="→ when old material sits unused" />
              <ProblemCard title="Batteries scrapped" subtitle="→ years early" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-full px-4 pointer-events-auto max-w-4xl mb-3 sm:mb-6 md:mb-8">
              <ProblemCard title="No health data" subtitle="→ capacity disappears without trace" />
              <ProblemCard title="Systems broken" subtitle="→ collection, revival, recycling never meet" />
            </div>
          </div>

          <div ref={layer3Ref} className="absolute inset-0 flex flex-col items-center text-center opacity-0 mt-4 sm:mt-0">
            <div className="flex flex-wrap justify-center items-center gap-x-2 md:gap-x-4 text-white/90 text-[0.625rem] sm:text-xs md:text-sm font-semibold mb-4 sm:mb-6 md:mb-10 uppercase pointer-events-auto px-4 break-words">
              <span>Zero-Liquid Discharge</span> <span className="text-white/40">•</span>
              <span>Serial-Linked Warranty</span> <span className="text-white/40 hidden sm:inline">•</span>
              <span className="hidden sm:inline">Chain-of-Custody</span> <span className="text-white/40 hidden md:inline">•</span>
              <span className="hidden md:inline">Audit-Ready Reporting</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2 md:gap-4 max-w-5xl pointer-events-auto mb-4 sm:mb-6 md:mb-8 px-4">
              {['One loop', 'Revival-first', 'Zero-Liquid-Discharge', '90% less CO₂', 'Material recovery', 'Recycle at end'].map((text, i) => (
                <button key={i} className="px-3 sm:px-4 md:px-8 py-1.5 sm:py-2 md:py-3 bg-black/70 backdrop-blur-sm border border-white/20 rounded-full text-white text-[0.625rem] sm:text-xs md:text-base font-semibold break-words">
                  {text}
                </button>
              ))}
            </div>
            <p className="text-white/70 font-light text-xs sm:text-sm md:text-base lg:text-lg max-w-3xl px-4 break-words">We are not anti-recycling — we are anti-waste.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProblemCard: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="p-1.5 sm:p-4 md:p-4 lg:p-6 border border-red-500/30 bg-red-950/20 rounded-[0.625rem] sm:rounded-[0.875rem] md:rounded-xl shadow-2xl w-full max-w-[17.5rem] sm:max-w-[23.75rem] md:max-w-none min-h-[3.438rem] sm:min-h-[5.313rem] md:min-h-[6rem] lg:min-h-[7.188rem] mx-auto overflow-hidden">
    <h3 className="text-[#FF6467] text-[0.625rem] sm:text-base md:text-xl lg:text-2xl font-bold mb-0.5 sm:mb-1 md:mb-1.5 break-words text-center">{title}</h3>
    <p className="text-white/60 text-[0.5625rem] sm:text-sm md:text-sm lg:text-base xl:text-lg leading-snug md:leading-relaxed text-center break-words">{subtitle}</p>
  </div>
);

export default StorytellingSection;