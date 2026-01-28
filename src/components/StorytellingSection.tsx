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
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(mountTimer);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isMounted) return;

    let ctx = gsap.context(() => {
      gsap.set([layer2Ref.current, layer3Ref.current], { opacity: 0 });
      gsap.set([video1Ref.current, video2Ref.current, video3Ref.current], { opacity: 1 });
      gsap.set([video2Ref.current, video3Ref.current], { visibility: 'hidden' });

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
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress < 0.33) {
              gsap.set(video1Ref.current, { visibility: 'visible' });
              gsap.set([video2Ref.current, video3Ref.current], { visibility: 'hidden' });
              if (video1Ref.current?.duration) {
                video1Ref.current.currentTime = (progress / 0.33) * video1Ref.current.duration;
              }
            } else if (progress >= 0.33 && progress < 0.66) {
              gsap.set(video2Ref.current, { visibility: 'visible' });
              gsap.set([video1Ref.current, video3Ref.current], { visibility: 'hidden' });
              if (video2Ref.current?.duration) {
                const p = (progress - 0.33) / 0.33;
                video2Ref.current.currentTime = p * video2Ref.current.duration;
              }
            } else {
              gsap.set(video3Ref.current, { visibility: 'visible' });
              gsap.set([video1Ref.current, video2Ref.current], { visibility: 'hidden' });
              if (video3Ref.current?.duration) {
                const p = (progress - 0.66) / 0.34;
                video3Ref.current.currentTime = p * video3Ref.current.duration;
              }
            }
          }
        },
      });

      tl.to(layer1Ref.current, { opacity: 0, duration: 0.1 }, 0.28)
        .to(layer2Ref.current, { opacity: 1, duration: 0.1 }, 0.33);

      tl.to(layer2Ref.current, { opacity: 0, duration: 0.1 }, 0.61)
        .to(layer3Ref.current, { opacity: 1, duration: 0.1 }, 0.66);

    }, containerRef);

    return () => ctx.revert();
  }, [isMounted]);

  return (
    <div id="why-revive" ref={containerRef} className="relative w-full h-[250vh] bg-black z-10">
      <div className="w-full h-screen flex flex-col items-center justify-start pt-[15vh] overflow-hidden">
        <div className="relative w-[45%] h-[35%] md:w-[35%] md:h-[40%] z-0 pointer-events-none">
          <video ref={video1Ref} src="/whyrevive/video1.mp4" className="absolute inset-0 w-full h-full object-contain" muted playsInline preload="auto" />
          <video ref={video2Ref} src="/whyrevive/video2.mp4" className="absolute inset-0 w-full h-full object-contain" muted playsInline preload="auto" />
          <video ref={video3Ref} src="/whyrevive/video3.mp4" className="absolute inset-0 w-full h-full object-contain" muted playsInline preload="auto" />
        </div>

        <div className="relative flex-1 w-full max-w-6xl mt-4 pointer-events-none z-10">
          <div ref={layer1Ref} className="absolute inset-0 flex flex-col items-center text-center">
            <h2 className="text-white mb-12 px-4 text-[22px] leading-[39px] max-w-[680px]">
              A global shift to a greener future is underway — the kind where the impossible is becoming everyday life.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4 pointer-events-auto max-w-5xl">
              {['Electric mobility.', 'Renewable energy.', 'Regulated recycling.'].map((text, i) => (
                <div key={i} className="bg-zinc-900/30 backdrop-blur-sm border border-white/5 rounded-2xl py-10 px-6">
                  <p className="text-white/80 text-lg font-light">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div ref={layer2Ref} className="absolute inset-0 flex flex-col items-center text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4 pointer-events-auto max-w-6xl mb-4">
              <ProblemCard title="CO2 surges" subtitle="→ from nonstop mining and smelting" />
              <ProblemCard title="Mines expand" subtitle="→ when old material sits unused" />
              <ProblemCard title="Batteries scrapped" subtitle="→ years early" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4 pointer-events-auto max-w-4xl mb-8">
              <ProblemCard title="No health data" subtitle="→ capacity disappears without trace" />
              <ProblemCard title="Systems broken" subtitle="→ collection, revival, recycling never meet" />
            </div>
          </div>

          <div ref={layer3Ref} className="absolute inset-0 flex flex-col items-center text-center">
            <div className="flex flex-wrap justify-center items-center gap-x-4 text-white/90 text-sm font-semibold mb-10 uppercase pointer-events-auto">
              <span>Zero-Liquid Discharge</span> <span className="text-white/40">•</span>
              <span>Serial-Linked Warranty</span> <span className="text-white/40">•</span>
              <span>Chain-of-Custody</span> <span className="text-white/40">•</span>
              <span>Audit-Ready Reporting</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-5xl pointer-events-auto mb-8">
              {['One loop', 'Revival-first', 'Zero-Liquid-Discharge', '90% less CO₂', 'Material recovery', 'Recycle at end'].map((text, i) => (
                <button key={i} className="px-8 py-3 bg-zinc-800/60 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold">
                  {text}
                </button>
              ))}
            </div>
            <p className="text-white/70 font-light max-w-3xl">We are not anti-recycling — we are anti-waste.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProblemCard: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="text-left p-5 border border-red-500/30 bg-red-950/20 rounded-[14px] shadow-2xl w-[360px] h-[98px]">
    <h3 className="text-[#FF6467] text-2xl font-bold mb-1">{title}</h3>
    <p className="text-white/60 text-base">{subtitle}</p>
  </div>
);

export default StorytellingSection;