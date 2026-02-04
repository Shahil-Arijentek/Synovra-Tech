import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInViewRef = useRef(false);
  const scrollLockRef = useRef(0);

  // useScroll for the whole container on mobile
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate active index based on scroll progress
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (window.innerWidth < 1024) {
        const index = Math.min(
          Math.floor(latest * sectors.length),
          sectors.length - 1
        );
        setActiveIndex(index);
      }
    });
  }, [scrollYProgress, sectors.length]);

  // Text conveyor belt Y offset
  // We want the active item to stay at the top of the window
  // Each item is exactly 120px tall for a consistent 3-item window
  const textTranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(sectors.length - 1) * 120]
  );

  // Desktop: GSAP ScrollTrigger for auto-pin
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Intersection observer for the whole section (for wheel locking)
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    sectionObserver.observe(section);

    const onWheel = (event: WheelEvent) => {
      if (window.innerWidth < 1024) return;
      if (!isInViewRef.current) return;

      const now = Date.now();
      if (now - scrollLockRef.current < 500) {
        event.preventDefault();
        return;
      }

      setActiveIndex((prev) => {
        if (event.deltaY > 0 && prev < sectors.length - 1) {
          scrollLockRef.current = now;
          event.preventDefault();
          return prev + 1;
        }
        if (event.deltaY < 0 && prev > 0) {
          scrollLockRef.current = now;
          event.preventDefault();
          return prev - 1;
        }
        return prev;
      });
    };

    section.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      sectionObserver.disconnect();
      section.removeEventListener("wheel", onWheel);
    };
  }, [activeIndex, sectors.length]);

  return (
    <>
      <section className="bg-black py-12 md:py-24 overflow-hidden relative font-['Poppins'] group">
        <div className="flex items-center justify-center">
          <h2 className="relative text-[7vw] sm:text-[8vw] md:text-[100px] lg:text-[150px] font-black uppercase tracking-tighter leading-none text-center text-[#1a1a1a] opacity-60 whitespace-nowrap">
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
            background-size: 0% 100%;
            background-repeat: no-repeat;
            background-position: left center;
            -webkit-background-clip: text;
            background-clip: text;
            transition: background-size 1800ms cubic-bezier(0.19, 1, 0.22, 1);
          }

          .group:hover .reveal-text {
            background-size: 100% 100%;
          }
        `}</style>
      </section>

      <section
        ref={sectionRef}
        className="bg-black pt-12 pb-0 md:pt-24 md:pb-24 text-white -mt-16 md:-mt-24"
      >
        {/* Container with extra height for mobile scroll interaction */}
        <div
          ref={containerRef}
          className="relative lg:h-auto h-[250vh]"
          style={{ position: 'relative' }}
        >
          {/* Sticky wrapper for visible content on mobile */}
          <div className="sticky top-0 h-screen lg:h-auto lg:relative flex w-full max-w-[1680px] flex-col lg:flex-row lg:items-start lg:gap-16 px-6 mx-auto overflow-hidden lg:overflow-visible">

            {/* Image - Perfect sticky at top on mobile */}
            <div className="w-full lg:flex-[3.0] z-40 mb-2 lg:mb-0 order-1 lg:order-2 mt-28 lg:mt-0">
              <div className="relative h-[250px] sm:h-[400px] lg:h-[760px] overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 bg-black">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Text Content Area */}
            <div className="w-full lg:flex-1 lg:max-w-[360px] order-2 lg:order-1 flex flex-col">

              {/* Desktop View: Static List */}
              <div className="hidden lg:flex flex-col space-y-6">
                {sectors.map((sector, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={sector.title}
                      className={`group flex w-full flex-col items-start gap-3 border-b border-[#0d0d0d] pb-6 text-left transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-40"
                        }`}
                      onClick={() => setActiveIndex(index)}
                      type="button"
                    >
                      <div className="flex items-center">
                        <h3
                          className={`text-[18px] md:text-[22px] font-black leading-tight tracking-tight md:tracking-[-1.5px] transition-colors duration-500 ${isActive ? "text-white" : "text-white/60"
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

              {/* Mobile View: Vertical Conveyor Belt Transition */}
              <div className="block lg:hidden h-[360px] relative overflow-hidden mt-8">
                <motion.div
                  style={{ y: textTranslateY }}
                  className="flex flex-col gap-0"
                >
                  {sectors.map((sector, index) => {
                    const isActive = index === activeIndex;
                    // Upcoming items are the next two after active
                    const isComingUp = index === activeIndex + 1 || index === activeIndex + 2;

                    return (
                      <div
                        key={index}
                        className={`h-[120px] flex flex-col justify-start transition-all duration-700 ease-out py-4 ${isActive
                          ? "opacity-100 scale-100"
                          : isComingUp
                            ? "opacity-30 scale-95 origin-left"
                            : "opacity-0 scale-90"
                          }`}
                      >
                        <h3 className="text-[20px] font-black leading-tight text-white tracking-tight">
                          {sector.title}
                        </h3>
                        <p className="text-sm sm:text-base md:text-base lg:text-lg text-white/70 leading-relaxed mt-2 max-w-[90%]">
                          {sector.subtitle}
                        </p>
                        <div className="relative mt-2">
                          <div className="absolute h-[1px] w-full bg-white/5" />
                          {isActive && (
                            <motion.div
                              className="absolute h-[2px] w-[120px] bg-[linear-gradient(90deg,#ff5e00_0%,rgba(255,94,0,0.6)_55%,rgba(255,94,0,0)_100%)] z-10"
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

                {/* Gradient Fades for the window edges - smoother transitions */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent pointer-events-none z-10" />
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}