import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    "/sector/image1.png",
    "/sector/image2.png",
    "/sector/image3.png",
    "/sector/image4.png",
    "/sector/image5.png",
    "/sector/image6.png",
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const isInViewRef = useRef(false);
  const scrollLockRef = useRef(0);

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

    // Observer for mobile items - RE-RUN whenever activeIndex changes to ensure triggers work
    const itemObservers = sectors.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (window.innerWidth < 1024 && entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { 
          threshold: 0,
          rootMargin: "-45% 0px -45% 0px"
        }
      );
      
      const element = itemRefs.current[index];
      if (element) {
        observer.observe(element);
      }
      return observer;
    });

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
      itemObservers.forEach(o => o?.disconnect());
      section.removeEventListener("wheel", onWheel);
    };
  }, [activeIndex, sectors.length]); // Added activeIndex back to dependency array to ensure observers are fresh

  return (
    <>
      <section className="bg-black py-12 md:py-24 overflow-hidden relative font-['Poppins'] group">
        <div className="flex items-center justify-center">
          <h2 className="relative text-[12vw] md:text-[140px] lg:text-[180px] font-black uppercase tracking-tighter leading-none text-center text-[#1a1a1a] opacity-60">
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
        className="bg-black py-12 md:py-24 text-white -mt-16 md:-mt-34"
      >
        <div className="mx-auto flex w-full max-w-[1680px] flex-col lg:flex-row lg:items-start lg:gap-16 px-6">
          {/* Image - On mobile it becomes sticky at the top */}
          <div className="sticky top-32 lg:top-32 w-full lg:flex-[3.0] z-40 mb-12 lg:mb-0 order-1 lg:order-2">
            <div className="relative h-[300px] sm:h-[580px] lg:h-[760px] overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[activeIndex]}
                  src={images[activeIndex]}
                  alt={sectors[activeIndex]?.title ?? "Sector image"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:flex-1 lg:max-w-[360px] order-2 lg:order-1">
            {/* Desktop View: Scrollable List as before */}
            <div className="hidden lg:flex flex-col space-y-6">
              {sectors.map((sector, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={sector.title}
                    className={`group flex w-full flex-col items-start gap-3 border-b border-[#0d0d0d] pb-6 text-left transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-40"
                    }`}
                    onClick={() => setActiveIndex(index)}
                    type="button"
                  >
                    <div className="flex items-center">
                      <h3
                        className={`text-[20px] md:text-[26px] font-black leading-tight tracking-tight md:tracking-[-2px] transition-colors duration-500 ${
                          isActive ? "text-white" : "text-white/60"
                        }`}
                      >
                        {sector.title}
                      </h3>
                    </div>
                    <p
                      className={`text-[13px] md:text-[15px] leading-relaxed tracking-tight transition-colors duration-500 max-w-md ${
                        isActive ? "text-white/80" : "text-white/40"
                      }`}
                    >
                      {sector.subtitle}
                    </p>
                    <span
                      className={`h-px w-full bg-[linear-gradient(90deg,#ff5e00_0%,rgba(255,94,0,0.6)_55%,rgba(255,94,0,0)_100%)] transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Mobile View: Sticky Text + Invisible Triggers */}
            <div className="block lg:hidden">
              <div className="sticky top-[calc(8rem+300px+1.5rem)] z-50 bg-black pb-4 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-start gap-2 pointer-events-auto"
                  >
                    <h3 className="text-[20px] font-black leading-tight text-white">
                      {sectors[activeIndex].title}
                    </h3>
                    <p className="text-[13px] text-white/80">
                      {sectors[activeIndex].subtitle}
                    </p>
                    <div className="h-px w-full bg-[linear-gradient(90deg,#ff5e00_0%,rgba(255,94,0,0.6)_55%,rgba(255,94,0,0)_100%)]" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Invisible triggers to drive scrolling on mobile */}
              <div className="flex flex-col relative z-10 pt-[5vh]">
                {sectors.map((_, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    className="h-[50vh] w-full bg-transparent"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}