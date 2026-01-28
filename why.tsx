import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StorytellingSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Ensure all videos start paused at first frame
    const videos = [video1Ref.current, video2Ref.current, video3Ref.current];
    videos.forEach(vid => {
      if (vid) {
        vid.currentTime = 0;
        vid.pause();
      }
    });

    const ctx = gsap.context(() => {
      // Set Layer 1 content to be visible immediately on load
      gsap.set(layer1Ref.current, { opacity: 1, y: 0 });

      let lastProgress = 0;
      let currentActiveVideo: HTMLVideoElement | null = null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const isScrollingDown = progress > lastProgress;
            
            // Determine which video should be active based on progress
            let targetVideo: HTMLVideoElement | null = null;
            if (progress < 0.35) {
              targetVideo = video1Ref.current;
            } else if (progress < 0.60) {
              targetVideo = video2Ref.current;
            } else {
              targetVideo = video3Ref.current;
            }

            // Handle video playback based on scroll direction
            if (targetVideo && targetVideo !== currentActiveVideo) {
              // Stop previous video
              if (currentActiveVideo) {
                currentActiveVideo.pause();
              }
              
              // Start new video
              currentActiveVideo = targetVideo;
              if (isScrollingDown) {
                targetVideo.currentTime = 0;
                targetVideo.play().catch(() => {});
              }
            }

            // When scrolling up, pause the current video
            if (!isScrollingDown && currentActiveVideo) {
              currentActiveVideo.pause();
            } else if (isScrollingDown && currentActiveVideo && currentActiveVideo.paused) {
              currentActiveVideo.play().catch(() => {});
            }

            lastProgress = progress;
          },
        },
      });

      // --- STAGE 1: VISION ---
      // Hold at first frame for 0.1 seconds
      tl.to({}, { duration: 0.1 }, 0);
      
      // Fade out Layer 1 (Vision) and fade in Layer 2 (Problem)
      tl.to(layer1Ref.current, { opacity: 0, y: -30, duration: 0.1 }, 0.1);
      tl.to(layer2Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.15);

      // Transition to Stage 2
      tl.to(video1Ref.current, { opacity: 0, duration: 0.05 }, 0.35);
      tl.to(video2Ref.current, { opacity: 1, duration: 0.05 }, 0.35);

      // --- STAGE 2: PROBLEM ---
      // Layer 2 visible, Video 2 playing
      
      // Transition to Stage 3 - Fade out Layer 2
      tl.to(layer2Ref.current, { opacity: 0, y: -30, duration: 0.1 }, 0.55);
      tl.to(video2Ref.current, { opacity: 0, duration: 0.05 }, 0.60);
      tl.to(video3Ref.current, { opacity: 1, duration: 0.05 }, 0.60);

      // --- STAGE 3: SOLUTION ---
      // Fade in Layer 3 (Solution)
      tl.to(layer3Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.70);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="why-revive" ref={containerRef} className="relative w-full h-[500vh] bg-black overflow-hidden">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-start pt-[15vh]">
        
        {/* Floating Video Layer: Removed border, shadow, and bg-black */}
        <div className="relative w-[45%] h-[35%] md:w-[35%] md:h-[40%] z-0 pointer-events-none">
          <video
            ref={video1Ref}
            src="/whyrevive/video1.mp4"
            className="absolute inset-0 w-full h-full object-contain"
            muted playsInline preload="auto"
          />
          <video
            ref={video2Ref}
            src="/whyrevive/video2.mp4"
            className="absolute inset-0 w-full h-full object-contain opacity-0"
            muted playsInline preload="auto"
          />
          <video
            ref={video3Ref}
            src="/whyrevive/video3.mp4"
            className="absolute inset-0 w-full h-full object-contain opacity-0"
            muted playsInline preload="auto"
          />
        </div>

        {/* Content Layers positioned below the floating assets */}
        <div className="relative flex-1 w-full max-w-6xl mt-4 pointer-events-none z-10">
          
          {/* Layer 1: Vision */}
          <div ref={layer1Ref} className="absolute inset-0 flex flex-col items-center text-center opacity-0 transform translate-y-12">
            <h2 className="text-white mb-12 px-4" style={{
              width: '680px',
              maxWidth: '90%',
              fontFamily: 'Arial',
              fontSize: '22px',
              fontWeight: 400,
              lineHeight: '39px',
              textAlign: 'center'
            }}>
              A global shift to a greener future is underway — the kind where <br className="hidden md:block" />
              the impossible is becoming everyday life.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4 pointer-events-auto max-w-5xl">
              {['Electric mobility.', 'Renewable energy.', 'Regulated recycling.'].map((text, i) => (
                <div key={i} className="bg-zinc-900/30 backdrop-blur-sm border border-white/5 rounded-2xl py-10 px-6">
                  <p className="text-white/80 text-lg md:text-xl font-light tracking-tight">{text}</p>
                </div>
              ))}
            </div>
            <p className="text-white/40 text-sm md:text-base font-light tracking-tight mt-12 px-4 max-w-3xl">
              But until the systems to support a green future are in place, the future won't be truly green.
            </p>
          </div>

          {/* Layer 2: Problem */}
          <div ref={layer2Ref} className="absolute inset-0 flex flex-col items-center text-center opacity-0 transform translate-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full px-4 pointer-events-auto max-w-6xl mb-4">
              <ProblemCard title="CO2 surges" subtitle="→ from nonstop mining and smelting" />
              <ProblemCard title="Mines expand" subtitle="→ when old material sits unused" />
              <ProblemCard title="Batteries scrapped" subtitle="→ years early" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full px-4 pointer-events-auto max-w-4xl mb-8">
              <ProblemCard title="No health data" subtitle="→ capacity disappears without trace" />
              <ProblemCard title="Systems broken" subtitle="→ collection, revival, recycling never meet" />
            </div>
            <p className="text-white/60 text-sm md:text-base font-light tracking-tight mt-4 px-4 max-w-4xl">
              And that's where we step in — the missing layer that turns 'green at the front' into green all the way through.
            </p>
          </div>

          {/* Layer 3: Solution */}
          <div ref={layer3Ref} className="absolute inset-0 flex flex-col items-center text-center opacity-0 transform translate-y-12">
            {/* Top text line with dots */}
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-white/90 text-xs md:text-sm font-semibold mb-10 tracking-wide uppercase pointer-events-auto">
              <span>Zero-Liquid Discharge</span>
              <span className="text-white/40">•</span>
              <span>Serial-Linked Warranty</span>
              <span className="text-white/40">•</span>
              <span>Chain-of-Custody</span>
              <span className="text-white/40">•</span>
              <span>Audit-Ready Reporting</span>
            </div>

            {/* Pill buttons */}
            <div className="flex flex-wrap justify-center gap-4 max-w-5xl pointer-events-auto mb-8">
              {['One loop', 'Revival-first', 'Zero-Liquid-Discharge', '90% less CO₂', 'Material recovery', 'Recycle at end'].map((text, i) => (
                <button key={i} className="px-8 md:px-10 py-3 md:py-4 bg-zinc-800/60 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm md:text-base font-semibold hover:bg-zinc-700/60 transition-all">
                  {text}
                </button>
              ))}
            </div>

            {/* Bottom text */}
            <p className="text-white/70 text-sm md:text-base font-light tracking-tight px-4 max-w-3xl">
              We are not anti-recycling — we are anti-waste.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

const ProblemCard: React.FC<{ title: string; subtitle: string; className?: string }> = ({ title, subtitle, className }) => (
  <div className={`text-left transition-all ${className}`} style={{
    width: '360px',
    height: '98px',
    borderRadius: '14px',
    border: '1px solid rgba(251, 44, 54, 0.30)',
    background: 'rgba(70, 8, 9, 0.28)',
    boxShadow: '0 4px 15.1px 0 rgba(0, 0, 0, 0.88)',
    padding: '20px'
  }}>
    <h3 className="mb-3" style={{
      color: '#FF6467',
      fontFamily: 'Arial',
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '32px'
    }}>{title}</h3>
    <p style={{
      color: 'rgba(255, 255, 255, 0.60)',
      fontFamily: 'Arial',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px'
    }}>{subtitle}</p>
  </div>
);

export default StorytellingSection;