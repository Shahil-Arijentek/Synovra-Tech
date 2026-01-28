import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

interface PulseXItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const pulseXItems: PulseXItem[] = [
  {
    title: "THE REVIVAL SYSTEM",
    subtitle: "Engineered for Repeatable Results",
    description: "Our proprietary electrochemical restoration platform ensures consistent performance across every batch, extending battery life with laboratory-grade precision.",
    image: "/pulsex/image1.png",
  },
  {
    title: "CHEMISTRY-SPECIFIC CONTROL",
    subtitle: "Every Battery Treated on Its Terms",
    description: "Smart sensors detect individual cell chemistry and adjust restoration pulses in real-time, maximizing recovery for diverse battery types.",
    image: "/pulsex/image2.png",
  },
  {
    title: "MEASURED OUTPUT",
    subtitle: "Verified Before It Leaves",
    description: "Comprehensive diagnostic testing validates health metrics and capacity, providing a certified performance guarantee for every revived unit.",
    image: "/pulsex/image3.png",
  },
  {
    title: "INTERNAL CORRECTION",
    subtitle: "Restoration Starts Inside",
    description: "Advanced pulse-width modulation targets internal sulfation and crystal growth, reversing degradation at the molecular level.",
    image: "/pulsex/image4.png",
  },
  {
    title: "TRACEABILITY",
    subtitle: "Serial-Linked Proof",
    description: "Each battery is tracked through its entire lifecycle via a secure digital twin, ensuring full auditability and performance history.",
    image: "/pulsex/image5.png",
  },
];

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-3 max-w-[1200px] mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  subtitle,
  description,
  image,
  imageClassName,
}: {
  className?: string;
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  image?: string;
  imageClassName?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      className={cn(
        "group/bento relative flex flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] min-h-[320px] md:min-h-[200px]",
        "will-change-transform transform-gpu cursor-pointer md:cursor-default",
        className
      )}
    >
      {/* Background Image - Clear at the top */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.img
          src={image}
          alt="Bento item"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn("h-full w-full object-cover opacity-70", imageClassName)}
        />
      </div>

      {/* The Transparent Glass Box - Custom Styled Box */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 z-10 p-4 md:p-5 overflow-hidden rounded-[12px] border border-[#262626]/60"
        style={{
          background: "rgba(0, 0, 0, 0.28)",
          backdropFilter: "blur(5.2px)",
          WebkitBackdropFilter: "blur(5.2px)"
        }}
        animate={{
          background: isHovered ? "rgba(0, 0, 0, 0.45)" : "rgba(0, 0, 0, 0.28)",
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Backdrop Blur Container (if needed, but using inline style for precision) */}

        <motion.span
          className="uppercase mb-2 inline-block font-bold"
          style={{
            color: '#FF6B1A',
            fontSize: '11px',
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </motion.span>

        <div className="flex flex-col relative">
          <motion.h4
            animate={{
              y: isHovered ? -2 : 0,
              fontSize: isHovered ? "1.15rem" : "1.25rem"
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-white leading-tight tracking-tight font-medium"
          >
            {subtitle}
          </motion.h4>

          <AnimatePresence mode="wait">
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "circOut" }}
              >
                <p className="pt-2 text-[13px] md:text-[14px] leading-snug text-zinc-300 font-normal">
                  {description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Main Card Border */}
      <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none z-20" />
    </motion.div>
  );
};
export const PulseX = () => {
  return (
    <section className="relative overflow-hidden bg-[#0d0d0d] pt-8 pb-12 px-6 md:px-12 lg:pt-12 lg:pb-16">
      <div className="relative mx-auto max-w-[1200px]">
        <div className="mb-6 md:mb-10 space-y-4 text-center">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
            style={{
              fontSize: 'clamp(28px, 8vw, 42px)',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 900,
              lineHeight: '120%',
              letterSpacing: '-0.8px',
              fontStyle: 'normal',
            }}
          >
            Introducing Pulse <span style={{ color: '#FF6B1A' }}>X</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-3xl text-[#FFF]"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 'clamp(14px, 4vw, 18px)',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '140%',
              letterSpacing: '-0.5px',
            }}
          >
            Controlled electrochemical correction — applied with precision, verified at scale.
          </motion.p>
        </div>

        <BentoGrid className="md:grid-rows-12 h-auto md:h-[650px] gap-4 md:gap-3">
          {/* Item 0: Tall vertical card (Left) */}
          <BentoGridItem
            title={pulseXItems[0].title}
            subtitle={pulseXItems[0].subtitle}
            description={pulseXItems[0].description}
            image={pulseXItems[0].image}
            className="md:row-span-12 h-auto md:h-full"
          />

          {/* Remaining 4 items in a 2x2 grid */}
          <BentoGridItem
            title={pulseXItems[1].title}
            subtitle={pulseXItems[1].subtitle}
            description={pulseXItems[1].description}
            image={pulseXItems[1].image}
            className="md:row-span-6"
          />
          <BentoGridItem
            title={pulseXItems[3].title}
            subtitle={pulseXItems[3].subtitle}
            description={pulseXItems[3].description}
            image={pulseXItems[3].image}
            className="md:row-span-7"
          />
          <BentoGridItem
            title={pulseXItems[2].title}
            subtitle={pulseXItems[2].subtitle}
            description={pulseXItems[2].description}
            image={pulseXItems[2].image}
            className="md:row-span-6"
          />
          <BentoGridItem
            title={pulseXItems[4].title}
            subtitle={pulseXItems[4].subtitle}
            description={pulseXItems[4].description}
            image={pulseXItems[4].image}
            className="md:row-span-5"
          />
        </BentoGrid>
      </div>
    </section>
  );
};

export default PulseX;