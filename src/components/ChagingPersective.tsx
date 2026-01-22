import { useEffect, useRef, useState } from 'react';

export default function ChagingPersective() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-black pt-28 pb-0 md:py-24 overflow-hidden relative font-['Poppins']"
    >
      <div className="flex items-center justify-center">
        <h2 className="relative text-[10vw] md:text-[140px] lg:text-[180px] font-black uppercase tracking-tighter leading-none text-center text-[#1a1a1a] opacity-60">
          <span className="block">CHANGING THE PERSPECTIVE</span>
          <span 
            className="reveal-text absolute inset-0 block"
            style={{ backgroundSize: isVisible ? '100% 100%' : '0% 100%' }}
          >
            CHANGING THE PERSPECTIVE
          </span>
        </h2>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;900&display=swap');

        .reveal-text {
          color: transparent;
          background-image: linear-gradient(90deg, #ff5e00 0%, #ff7a1a 50%, rgb(255, 94, 0) 100%);
          background-size: 0% 100%;
          background-repeat: no-repeat;
          background-position: left center;
          -webkit-background-clip: text;
          background-clip: text;
          transition: background-size 2500ms cubic-bezier(0.19, 1, 0.22, 1);
        }
      `}</style>
    </section>
  );
}
