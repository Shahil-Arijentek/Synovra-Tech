import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const ProofInNumbersGSAP = () => {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Data for the comparison bars
  const comparisonData = [
    {
      label: 'Recycling Only',
      value: 10.0,
      color: 'bg-orange-500',
      maxWidth: 100,
    },
    {
      label: 'Revival First, Then Recycle',
      value: 1.2,
      color: 'bg-orange-500',
      maxWidth: 12, // 12% relative to recycling only
    },
  ];

  // GSAP ScrollTrigger setup with pinning
  useEffect(() => {
    if (!sectionRef.current) return;

    // Pin the section while animation plays
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => (isAnimationFinished ? '+=0' : '+=100%'),
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      onEnter: () => {
        if (!isAnimationFinished) {
          controls.start('visible');
        }
      },
      onLeaveBack: () => {
        controls.start('hidden');
        setIsAnimationFinished(false);
      },
    });

    // Cleanup
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [controls, isAnimationFinished]);

  // Update ScrollTrigger when animation finishes
  useEffect(() => {
    if (isAnimationFinished && scrollTriggerRef.current) {
      scrollTriggerRef.current.refresh();
      ScrollTrigger.refresh();
    }
  }, [isAnimationFinished]);

  const handleAnimationComplete = () => {
    setTimeout(() => {
      setIsAnimationFinished(true);
    }, 500); // Small delay before unpinning
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0d0d0d] text-white py-20 px-6 md:px-12 lg:px-24 flex items-center justify-center"
    >
      <div className="max-w-5xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 },
            },
          }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            The Proof in Numbers
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Revival keeps capacity in service and delays smelting — reducing emissions by up to{' '}
            <span className="text-orange-500 font-semibold">90%</span>.
          </p>
        </motion.div>

        {/* Comparison Bars */}
        <div className="space-y-8 mb-12">
          {comparisonData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.2 + index * 0.1,
                  },
                },
              }}
              className="bg-gray-900 rounded-2xl p-8"
            >
              {/* Label and Value */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl md:text-2xl font-semibold">{item.label}</h3>
                <div className="text-right">
                  <span className="text-3xl md:text-4xl font-bold text-orange-500">
                    {item.value}
                  </span>
                  <span className="text-xl md:text-2xl text-gray-400 ml-2">
                    kg CO<sub>2</sub>
                  </span>
                </div>
              </div>

              {/* Progress Bar Background */}
              <div className="relative w-full h-12 bg-gray-800 rounded-full overflow-hidden">
                {/* Animated Progress Bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={controls}
                  variants={{
                    hidden: { width: 0 },
                    visible: {
                      width: `${item.maxWidth}%`,
                      transition: {
                        duration: 2,
                        delay: 0.5 + index * 0.3,
                        ease: 'easeOut',
                      },
                    },
                  }}
                  onAnimationComplete={
                    index === comparisonData.length - 1
                      ? handleAnimationComplete
                      : undefined
                  }
                  className={`h-full ${item.color} rounded-full relative`}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
                </motion.div>
              </div>

              {/* Percentage Label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                      delay: 2.5 + index * 0.3,
                    },
                  },
                }}
                className="mt-2 text-right text-gray-400"
              >
                {item.maxWidth === 100 ? 'Baseline' : '-88% emissions'}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: isAnimationFinished ? 1 : 0,
              y: isAnimationFinished ? 0 : 20,
              transition: {
                duration: 0.6,
                delay: 0.5,
              },
            },
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="px-8 py-4 border-2 border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 w-full sm:w-auto">
            See Your CO<sub>2</sub> Savings
          </button>
          <button className="px-8 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 w-full sm:w-auto">
            Book a Revival Pickup
          </button>
        </motion.div>

        {/* Scroll indicator */}
        {!isAnimationFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center text-gray-500 text-sm">
              <svg
                className="w-6 h-6 animate-bounce mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              <span>Animation in progress...</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProofInNumbersGSAP;
