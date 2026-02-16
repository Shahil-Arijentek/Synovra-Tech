import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MythTruthPair {
  myth: string;
  truth: string;
}

const mythTruthData: MythTruthPair[] = [
  {
    myth: "A used battery is dead.",
    truth: "A revived battery can return to full power."
  },
  {
    myth: "Revived means second-hand.",
    truth: "Revived means scientifically restored and warranty-backed."
  },
  {
    myth: "Recycling is the greenest option.",
    truth: "Revival cuts emissions by up to 90%."
  },
  {
    myth: "Returns are low-value scrap.",
    truth: "Revival delivers value now and later."
  }
];

const MythsVsTruths: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.documentElement.style.overflow = '';
    }
    
    const mountTimer = setTimeout(() => {
      setIsMounted(true);
    }, 50);

    return () => {
      clearTimeout(mountTimer);
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isMounted) return;

    let isActive = true;
    let ctx: gsap.Context | null = null;

    if (layer1Ref.current) {
      layer1Ref.current.style.opacity = '1';
    }

    const initTimer = setTimeout(() => {
      if (!isActive || !containerRef.current) return;

      ctx = gsap.context(() => {
        if (!layer1Ref.current || !layer2Ref.current || !layer3Ref.current || !layer4Ref.current) {
          return;
        }

        gsap.set(layer1Ref.current, { opacity: 1, y: 0 });
        gsap.set([layer2Ref.current, layer3Ref.current, layer4Ref.current], { opacity: 0, y: 300 });

        const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

        // Stage 1: Hold first content (0 - 0.1)
        if (layer1Ref.current) {
          tl.to(layer1Ref.current, { opacity: 1, duration: 0.1 }, 0);
        }

        // Transition 1→2 (0.1 - 0.25)
        if (layer1Ref.current && layer2Ref.current) {
          // Layer 1 moves UP and fades out
          tl.to(layer1Ref.current, { opacity: 0, y: -100, duration: 0.15 }, 0.1);
          // Layer 2 moves UP from below and fades in
          tl.fromTo(layer2Ref.current, { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.15 }, 0.1);
        }

        // Stage 2: Hold second content (0.25 - 0.35)
        if (layer2Ref.current) {
          tl.to(layer2Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.25);
        }

        // Transition 2→3 (0.35 - 0.50)
        if (layer2Ref.current && layer3Ref.current) {
          // Layer 2 moves UP and fades out
          tl.to(layer2Ref.current, { opacity: 0, y: -100, duration: 0.15 }, 0.35);
          // Layer 3 moves UP from below and fades in
          tl.fromTo(layer3Ref.current, { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.15 }, 0.35);
        }

        // Stage 3: Hold third content (0.50 - 0.60)
        if (layer3Ref.current) {
          tl.to(layer3Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.50);
        }

        // Transition 3→4 (0.60 - 0.75)
        if (layer3Ref.current && layer4Ref.current) {
          // Layer 3 moves UP and fades out
          tl.to(layer3Ref.current, { opacity: 0, y: -100, duration: 0.15 }, 0.60);
          // Layer 4 moves UP from below and fades in
          tl.fromTo(layer4Ref.current, { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.15 }, 0.60);
        }

        // Stage 4: Hold last content (0.75 - 0.85)
        if (layer4Ref.current) {
          tl.to(layer4Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.75);
        }

        // Fade out entire section (0.85 - 1.0)
        if (contentRef.current) {
          tl.to(contentRef.current, { opacity: 0, duration: 0.15 }, 0.85);
        }

      }, containerRef);

      ScrollTrigger.refresh();
    }, 100);

    const video = videoRef.current;
    return () => {
      isActive = false;
      clearTimeout(initTimer);
      
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => {
        try {
          trigger.kill(true);
        } catch {
          // Ignore errors during cleanup
        }
      });
      
      if (ctx) {
        try {
          ctx.revert();
        } catch {
        }
      }
      
      if (video) {
        try {
          video.pause();
          video.src = '';
        } catch {
        }
      }
      
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.documentElement.style.overflow = '';
        
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 10);
      }
    };
  }, [isMounted]);

  return (
    <div ref={containerRef} className={`relative w-full h-[500vh] md:h-[400vh] bg-[#0d0d0d] z-[101] -mt-[150vh] transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      <div ref={contentRef} className="sticky top-0 w-full min-h-screen bg-[#0d0d0d] flex items-start justify-center pt-24 md:pt-24 pb-12 md:pb-16">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.05]"
      >
        <source src="/whyrevive/plexus-black-white.mov" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[#0d0d0d]/30"></div>

      {/* Content */}
      <div className="relative z-[210] w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Title */}
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-8 md:mt-12 lg:mt-16 mb-8 md:mb-8 lg:mb-12">
          Myths vs Truths
        </h2>

        {/* Content Layers Container */}
        <div className="relative w-full mt-12 md:mt-16 lg:mt-24" style={{ minHeight: '450px' }}>
          {/* Layer 1 */}
          <div ref={layer1Ref} className="absolute inset-0 w-full">
            <MythTruthContent 
              myth={mythTruthData[0].myth}
              truth={mythTruthData[0].truth}
            />
          </div>

          {/* Layer 2 */}
          <div ref={layer2Ref} className="absolute inset-0 w-full">
            <MythTruthContent 
              myth={mythTruthData[1].myth}
              truth={mythTruthData[1].truth}
            />
          </div>

          {/* Layer 3 */}
          <div ref={layer3Ref} className="absolute inset-0 w-full">
            <MythTruthContent 
              myth={mythTruthData[2].myth}
              truth={mythTruthData[2].truth}
            />
          </div>

          {/* Layer 4 */}
          <div ref={layer4Ref} className="absolute inset-0 w-full">
            <MythTruthContent 
              myth={mythTruthData[3].myth}
              truth={mythTruthData[3].truth}
            />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

const MythTruthContent: React.FC<{ myth: string; truth: string }> = ({ myth, truth }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-20 items-start max-w-5xl mx-auto">
      {/* MYTH Section */}
      <div className="text-left md:text-left space-y-2 md:space-y-3 p-4 md:p-5 lg:p-6" style={{
        borderRadius: '15px',
        background: 'rgba(13, 13, 13, 0.4)',
        backdropFilter: 'blur(22.2px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }}>
        <h3 className="uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl font-black" style={{
          color: '#595959',
          fontFamily: 'Arial',
          fontStyle: 'normal',
          fontWeight: '900',
          lineHeight: '120%',
          letterSpacing: '-2.4px',
          textTransform: 'uppercase'
        }}>
          MYTH
        </h3>
        <p className="text-white text-sm sm:text-base md:text-base lg:text-lg font-light leading-relaxed">
          {myth}
        </p>
      </div>

      {/* TRUTH Section */}
      <div className="text-left md:text-left space-y-2 md:space-y-3 mt-8 md:mt-24 lg:mt-32 p-4 md:p-5 lg:p-6" style={{
        borderRadius: '15px',
        background: 'rgba(26, 13, 3, 0.4)',
        backdropFilter: 'blur(22.2px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }}>
        <h3 className="text-[#FF6B35] text-lg sm:text-xl md:text-2xl lg:text-3xl font-black tracking-wider" style={{
          fontWeight: '900'
        }}>
          TRUTH
        </h3>
        <p className="text-white text-sm sm:text-base md:text-base lg:text-lg font-light leading-relaxed">
          {truth}
        </p>
      </div>
    </div>
  );
};

export default MythsVsTruths;