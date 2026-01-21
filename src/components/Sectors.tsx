import { useEffect, useRef, useState } from "react";

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
  const isInViewRef = useRef(false);
  const scrollLockRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.4 }
    );

    observer.observe(section);

    const onWheel = (event: WheelEvent) => {
      if (!isInViewRef.current) return;
      const now = Date.now();
      if (now - scrollLockRef.current < 500) {
        event.preventDefault();
        return;
      }

      if (event.deltaY > 0 && activeIndex < sectors.length - 1) {
        scrollLockRef.current = now;
        event.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, sectors.length - 1));
        return;
      }

      if (event.deltaY < 0 && activeIndex > 0) {
        scrollLockRef.current = now;
        event.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    section.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      observer.disconnect();
      section.removeEventListener("wheel", onWheel);
    };
  }, [activeIndex, sectors.length]);

  return (
    <>
      <section className="bg-black py-24 overflow-hidden relative font-['Poppins'] group">
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
        className="bg-black py-20 md:py-24 text-white -mt-24 md:-mt-34"
      >
        <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-10 px-6 lg:flex-row lg:items-start lg:gap-16">
          <div className="w-full lg:flex-1 lg:max-w-[360px]">
            <div className="space-y-6">
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
                        className={`text-[26px] font-black leading-tight tracking-[-2px] transition-colors duration-500 ${
                          isActive ? "text-white" : "text-white/60"
                        }`}
                      >
                        {sector.title}
                      </h3>
                    </div>
                    <p
                      className={`text-[15px] tracking-[-0.5px] transition-colors duration-500 ${
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
          </div>

          <div className="relative w-full lg:flex-[3.0]">
            <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)] sm:h-[580px] lg:h-[760px]">
              {images.map((src, index) => (
                <img
                  key={src}
                  alt={sectors[index]?.title ?? "Sector image"}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                  src={src}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}