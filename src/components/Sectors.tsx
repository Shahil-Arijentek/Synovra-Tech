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
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sectors.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { 
          threshold: 0.5,
          rootMargin: "-20% 0px -20% 0px"
        }
      );

      const element = itemRefs.current[index];
      if (element) observer.observe(element);
      return observer;
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectors.length]);

  return (
    <>
      <section className="bg-black py-12 md:py-24 overflow-hidden relative font-['Poppins'] group">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center">
            <h2 className="relative text-[10vw] sm:text-[12vw] md:text-[140px] lg:text-[180px] font-black uppercase tracking-tighter leading-none text-center text-[#1a1a1a] opacity-60">
              <span className="block">SECTORS WE SERVE</span>
              <span className="reveal-text absolute inset-0 block">
                SECTORS WE SERVE
              </span>
            </h2>
          </div>
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
        className="bg-black py-12 md:py-24 text-white -mt-8 md:-mt-16"
      >
        <div className="mx-auto flex w-full max-w-[1680px] flex-col-reverse lg:flex-row lg:items-start lg:gap-16 px-6">
          <div className="w-full lg:flex-1 lg:max-w-[400px]">
            <div className="space-y-12 md:space-y-32 py-12 lg:py-32">
              {sectors.map((sector, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={sector.title}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    className={`group flex w-full flex-col items-start gap-4 md:gap-6 border-l-2 pl-6 md:pl-8 transition-all duration-700 ${
                      isActive ? "border-[#ff5e00] opacity-100" : "border-white/10 opacity-30"
                    }`}
                  >
                    <div className="flex items-center">
                      <h3
                        className={`text-[24px] md:text-[32px] lg:text-[40px] font-black leading-tight tracking-tight transition-colors duration-500 ${
                          isActive ? "text-white" : "text-white/60"
                        }`}
                      >
                        {sector.title}
                      </h3>
                    </div>
                    <p
                      className={`text-[15px] md:text-[18px] leading-relaxed tracking-tight transition-colors duration-500 max-w-md ${
                        isActive ? "text-white/80" : "text-white/40"
                      }`}
                    >
                      {sector.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sticky top-24 lg:top-32 w-full lg:flex-[2.5] z-10 mb-12 lg:mb-0">
            <div className="relative aspect-[4/3] md:aspect-video lg:aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5">
              {images.map((src, index) => (
                <img
                  key={src}
                  alt={sectors[index]?.title ?? "Sector image"}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${
                    index === activeIndex ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-110 rotate-1"
                  }`}
                  src={src}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
