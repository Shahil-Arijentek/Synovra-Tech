import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Sectors() {
  const sectors = [
    {
      title: "UPS & Backup Power",
      subtitle: "Mission-critical uptime environments",
    },
    {
      title: "Healthcare & Pharma",
      subtitle: "Zero-failure power for regulated environments",
    },
    {
      title: "Telecom Networks",
      subtitle: "Always-on power across distributed systems",
    },
    {
      title: "Industrial Operations",
      subtitle: "Reliable power where downtime is costly",
    },
    {
      title: "Solar & Energy Storage",
      subtitle: "Extending asset life across renewable systems",
    },
    {
      title: "Automotive & Fleet Systems",
      subtitle:
        "Lead-acid starter and auxiliary batteries for high-utilization vehicles",
    },
  ];
  const images = [
    "/sector/image1.webp",
    "/sector/image2.webp",
    "/sector/image3.webp",
    "/sector/image4.webp",
    "/sector/image5.webp",
    "/sector/image6.webp",
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== "undefined" && window.innerWidth >= 1024);
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const textTranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(sectors.length - 1) * 120]
  );

  useEffect(() => {
    if (isDesktop) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        Math.floor(latest * sectors.length),
        sectors.length - 1
      );
      setActiveIndex(index);
    });

    return () => {
      unsubscribe();
    };
  }, [scrollYProgress, sectors.length, isDesktop]);

  useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 1024;
      setIsDesktop(newIsDesktop);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!isDesktop) {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      return;
    }

    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top top+=30",
      end: `+=${(sectors.length - 1) * 100}%`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.min(
          Math.floor(progress * sectors.length),
          sectors.length - 1
        );
        setActiveIndex(index);
      },
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [sectors.length, isDesktop]);

  return (
    <>
      <section className="bg-black pt-20 pb-8 md:py-28 overflow-hidden relative font-['Poppins'] group">
        <div className="flex items-center justify-center">
          <h2 className="relative text-[8vw] sm:text-[9vw] md:text-[5rem] lg:text-[10.5rem] font-black uppercase tracking-tighter leading-none text-center text-[#1a1a1a] opacity-60 whitespace-nowrap">
            <span className="block">SECTORS WE SERVE</span>
            <span className="reveal-text absolute inset-0 block">
              SECTORS WE SERVE
            </span>
          </h2>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;900&display=swap');

          .reveal-text {
            color: transparent;
            background-image: linear-gradient(90deg, #ff5e00 0%, #ff7a1a 50%,rgb(255, 94, 0) 100%);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: left center;
            -webkit-background-clip: text;
            background-clip: text;
            transition: background-size 1800ms cubic-bezier(0.19, 1, 0.22, 1);
          }

          /* Hover effect only on desktop (lg and above) */
          @media (min-width: 1024px) {
            .reveal-text {
              background-size: 0% 100%;
            }

            .group:hover .reveal-text {
              background-size: 100% 100%;
            }
          }
        `}</style>
      </section>

      <section
        ref={sectionRef}
        className="bg-black pt-8 pb-16 md:pt-24 md:pb-24 text-white"
      >
        {/* Container with extra height for mobile scroll interaction */}
        <div
          ref={containerRef}
          className="relative lg:h-auto h-[250vh]"
          style={{ position: 'relative' }}
        >
          <div className="sticky top-[6.5rem] lg:top-0 h-[calc(100vh-6.5rem)] lg:h-auto lg:relative flex w-full max-w-[105rem] flex-col lg:flex-row lg:items-start lg:gap-16 px-6 mx-auto overflow-hidden lg:overflow-visible">

            <div className="w-full lg:flex-[3.0] z-40 mb-2 lg:mb-0 order-1 lg:order-2 mt-8 lg:mt-0">
              <div className="relative h-[15.63rem] sm:h-[25rem] lg:h-[47.5rem] overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[activeIndex]}
                    src={images[activeIndex]}
                    alt={sectors[activeIndex]?.title ?? "Sector image"}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            <div className="w-full lg:flex-1 lg:max-w-[22.5rem] order-2 lg:order-1 flex flex-col">

              <div className="hidden lg:flex flex-col space-y-6">
                {sectors.map((sector, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={sector.title}
                      className={`group flex w-full flex-col items-start gap-3 border-b border-[#000000] pb-6 text-left transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-40"
                        }`}
                      onClick={() => {
                        if (scrollTriggerRef.current && window.innerWidth >= 1024) {
                          const targetProgress = index / (sectors.length - 1);
                          const trigger = scrollTriggerRef.current;
                          
                          requestAnimationFrame(() => {
                            if (trigger.start !== undefined && trigger.end !== undefined) {
                              const scrollDistance = trigger.end - trigger.start;
                              const targetScroll = trigger.start + scrollDistance * targetProgress;
                              
                              window.scrollTo({
                                top: targetScroll,
                                behavior: "smooth",
                              });
                            }
                          });
                        }
                      }}
                      type="button"
                    >
                      <div className="flex items-center">
                        <h3
                          className={`text-[1.125rem] md:text-[1.375rem] font-black leading-tight tracking-tight md:tracking-[-1.5px] transition-colors duration-500 ${isActive ? "text-white" : "text-white/60"
                            }`}
                        >
                          {sector.title}
                        </h3>
                      </div>
                      <p
                        className={`text-sm sm:text-base md:text-base lg:text-lg leading-relaxed tracking-tight transition-colors duration-500 max-w-md ${isActive ? "text-white/80" : "text-white/40"
                          }`}
                      >
                        {sector.subtitle}
                      </p>
                      <span
                        className={`h-px w-full bg-[linear-gradient(90deg,#ff5e00_0%,rgba(255,94,0,0.6)_55%,rgba(255,94,0,0)_100%)] transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"
                          }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="block lg:hidden h-[22.5rem] relative overflow-hidden mt-8">
                <motion.div
                  style={{ y: textTranslateY }}
                  className="flex flex-col gap-0"
                >
                  {sectors.map((sector, index) => {
                    const isActive = index === activeIndex;
                    const isComingUp = index === activeIndex + 1 || index === activeIndex + 2;

                    return (
                      <div
                        key={index}
                        className={`h-[7.5rem] flex flex-col justify-start transition-all duration-700 ease-out py-4 ${isActive
                          ? "opacity-100 scale-100"
                          : isComingUp
                            ? "opacity-30 scale-95 origin-left"
                            : "opacity-0 scale-90"
                          }`}
                      >
                        <h3 className="text-[1.25rem] font-black leading-tight text-white tracking-tight">
                          {sector.title}
                        </h3>
                        <p className="text-sm sm:text-base md:text-base lg:text-lg text-white/70 leading-relaxed mt-2 max-w-[90%]">
                          {sector.subtitle}
                        </p>
                        <div className="relative mt-2">
                          <div className="absolute h-[0.0625rem] w-full bg-white/5" />
                          {isActive && (
                            <motion.div
                              className="absolute h-[0.125rem] w-[7.5rem] bg-[linear-gradient(90deg,#ff5e00_0%,rgba(255,94,0,0.6)_55%,rgba(255,94,0,0)_100%)] z-10"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>

                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#000000] via-[#000000]/40 to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent pointer-events-none z-10" />
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}