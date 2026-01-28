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
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set Layer 1 visible immediately at position 0
      gsap.set(layer1Ref.current, { opacity: 1, y: 0 });
      // Set other layers below the viewport (positive Y) and invisible
      gsap.set([layer2Ref.current, layer3Ref.current, layer4Ref.current], { opacity: 0, y: 300 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Stage 1: Hold first content (0 - 0.1)
      tl.to(layer1Ref.current, { opacity: 1, duration: 0.1 }, 0);

      // Transition 1→2 (0.1 - 0.25)
      // Layer 1 moves UP and fades out
      tl.to(layer1Ref.current, { opacity: 0, y: -100, duration: 0.15 }, 0.1);
      // Layer 2 moves UP from below and fades in
      tl.fromTo(layer2Ref.current, { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.15 }, 0.1);

      // Stage 2: Hold second content (0.25 - 0.35)
      tl.to(layer2Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.25);

      // Transition 2→3 (0.35 - 0.50)
      // Layer 2 moves UP and fades out
      tl.to(layer2Ref.current, { opacity: 0, y: -100, duration: 0.15 }, 0.35);
      // Layer 3 moves UP from below and fades in
      tl.fromTo(layer3Ref.current, { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.15 }, 0.35);

      // Stage 3: Hold third content (0.50 - 0.60)
      tl.to(layer3Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.50);

      // Transition 3→4 (0.60 - 0.75)
      // Layer 3 moves UP and fades out
      tl.to(layer3Ref.current, { opacity: 0, y: -100, duration: 0.15 }, 0.60);
      // Layer 4 moves UP from below and fades in
      tl.fromTo(layer4Ref.current, { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.15 }, 0.60);

      // Stage 4: Hold last content (0.75 - 1.0)
      tl.to(layer4Ref.current, { opacity: 1, y: 0, duration: 0.25 }, 0.75);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black overflow-hidden z-[200] -mt-[600px] -mb-[400px]">
      <div className="sticky top-0 w-full min-h-[90vh] bg-black flex items-start justify-center overflow-hidden pt-24 pb-16">
      {/* Background Video with low opacity */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-[90vh] object-cover opacity-5"
      >
        <source src="/whyrevive/plexus-black-white.mov" type="video/mp4" />
      </video>

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-[210] w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Title */}
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12">
          Myths vs Truths
        </h2>

        {/* Content Layers Container */}
        <div className="relative w-full" style={{ minHeight: '500px' }}>
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center max-w-5xl mx-auto">
      {/* MYTH Section */}
      <div className="text-left md:text-left space-y-3 p-5 md:p-6" style={{
        borderRadius: '15px',
        opacity: 0.89,
        background: '#0D0D0D',
        backdropFilter: 'blur(22.2px)'
      }}>
        <h3 className="uppercase" style={{
          color: '#595959',
          fontFamily: 'Arial',
          fontSize: '28px',
          fontStyle: 'normal',
          fontWeight: 900,
          lineHeight: '120%',
          letterSpacing: '-2.4px',
          textTransform: 'uppercase'
        }}>
          MYTH
        </h3>
        <p className="text-white text-base md:text-lg lg:text-xl font-light leading-relaxed">
          {myth}
        </p>
      </div>

      {/* TRUTH Section */}
      <div className="text-left md:text-left space-y-3 mt-28 md:mt-32 p-5 md:p-6" style={{
        borderRadius: '15px',
        opacity: 0.89,
        background: '#1A0D03',
        backdropFilter: 'blur(22.2px)'
      }}>
        <h3 className="text-[#FF6B35] text-2xl md:text-3xl font-bold tracking-wider">
          TRUTH
        </h3>
        <p className="text-white text-base md:text-lg lg:text-xl font-light leading-relaxed">
          {truth}
        </p>
      </div>
    </div>
  );
};

export default MythsVsTruths;