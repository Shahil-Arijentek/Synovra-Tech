"use client";
import React, { useState, useEffect } from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { useMotionValue, useTransform, animate, motion, useInView } from "framer-motion";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const tickerData = [
    { prefix: 'Cycle ', highlight: '#278' },
    { prefix: '12.6', highlight: 'V' },
    { prefix: 'Lead Recovery ', highlight: '95%' },
    { prefix: 'Carbon Credit: ', highlight: '$42.13' },
    { prefix: 'Waste Prevented ', highlight: '22kg' }
]

const Counter = ({ value, duration = 2, decimals = 0 }: { value: number; duration?: number; decimals?: number }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        return latest.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
            useGrouping: true,
        });
    });
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            animate(count, value, { duration, ease: "easeOut" });
        }
    }, [isInView, value, duration, count]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
};

const AnimatedGauge = ({ value, label, id, range }: { value: number; label: string; id: string; range?: { min: number, max: number } }) => {
    const [progress, setProgress] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, 1, {
                duration: 2.5,
                ease: [0.16, 1, 0.3, 1],
                onUpdate: (latest) => setProgress(latest),
            });
            return () => controls.stop();
        }
    }, [isInView]);

    const currentPos = progress * value;

    return (
        <div ref={ref} className="relative flex flex-col items-center">
            <svg style={{ height: 0, width: 0, position: 'absolute' }}>
                <defs>
                    <linearGradient id={`gauge-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff6b1a" />
                        <stop offset="100%" stopColor="#ff8c00" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="w-56 h-36 md:w-64 md:h-48 relative flex items-center justify-center overflow-visible">
                <Gauge
                    value={currentPos}
                    startAngle={-110}
                    endAngle={110}
                    innerRadius="88%"
                    outerRadius="100%"
                    sx={{
                        [`& .${gaugeClasses.valueText}`]: { display: 'none' },
                        [`& .${gaugeClasses.referenceArc}`]: {
                            fill: 'rgba(255, 255, 255, 0.1)',
                            stroke: 'none',
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                            fill: `url(#gauge-gradient-${id})`,
                            filter: 'drop-shadow(0 0 12px rgba(255, 107, 26, 0.8))',
                            strokeLinecap: 'butt',
                            pathLength: 100,
                            strokeDasharray: '20 100',
                            strokeDashoffset: -80,
                        },
                        '& svg': { 
                            overflow: 'visible',
                        }
                    }}
                />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 md:pt-10 pointer-events-none">
                    <span className="text-xl md:text-[1.75rem] text-white font-['Gemunu_Libre']">
                        {range
                            ? `${Math.round(progress * range.min)}-${Math.round(progress * range.max)}%`
                            : `${Math.round(currentPos)}%`
                        }
                    </span>
                    <div className="mt-0 md:mt-1">
                        <span className="text-[0.75rem] md:text-[0.9375rem] text-[#EAEAEA] font-black uppercase tracking-tighter">
                            {label}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default function SystemOutcomes() {
    const [activeTab, setActiveTab] = useState(0);
    const [isLoaded] = useState(true);
    const titleRef = React.useRef(null);
    const isTitleInView = useInView(titleRef, { once: true, amount: 0.8 });
    const tabs = [
        { id: 0, label: "System" },
        { id: 1, label: "Performance" },
        { id: 2, label: "Environmental" },
    ];

    return (
        <div className="flex flex-col overflow-hidden bg-black" style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s ease-in' }}>
            <ContainerScroll
                titleComponent={
                    <div ref={titleRef}>
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ 
                                duration: 1.2, 
                                delay: 0.3,
                                ease: [0.19, 1, 0.22, 1]
                            }}
                            className="text-white mb-2 whitespace-nowrap"
                            style={{
                                fontFamily: "Arial",
                                fontSize: "clamp(2rem, 8vw, 3.875rem)",
                                fontStyle: "normal",
                                fontWeight: 900,
                                lineHeight: "120%",
                                letterSpacing: "-2.4px",
                            }}
                        >
                            Measured Impact
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 40 }}
                            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ 
                                duration: 1.2, 
                                delay: 0.7,
                                ease: [0.19, 1, 0.22, 1]
                            }}
                            className="mb-8"
                            style={{
                                color: "#595959",
                                textAlign: "center",
                                fontFamily: "Arial",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "32px",
                            }}
                        >
                            What the system has already delivered
                        </motion.p>
                    </div>
                }
            >
                <div className="w-full h-full bg-black p-3 md:p-6 flex flex-col overflow-hidden">
                    {/* Tab Switcher - Mobile Only */}
                    <div className="flex md:hidden mb-4 relative px-4 shrink-0 h-10 md:h-14 items-center">
                        {/* The "Opacity Black Line" Track */}
                        <div className="absolute inset-x-4 h-[0.0625rem] bg-white/10 bottom-1.5 md:bottom-3" />

                        <div className="flex w-full justify-center gap-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative py-1.5 md:py-4 text-[0.625rem] md:text-[0.625rem] font-black uppercase tracking-tighter md:tracking-[0.2em] transition-colors duration-500 ${activeTab === tab.id ? "text-white" : "text-white/40"
                                        }`}
                                >
                                    <span className="relative z-20">{tab.label}</span>
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="gaugeTabIndicator"
                                            className="absolute bottom-1 md:bottom-2.5 left-0 right-0 flex justify-center z-50 pointer-events-none"
                                        >
                                            <motion.div
                                                className="h-[0.25rem] w-10 md:w-12 bg-[#ff6b1a] rounded-full shadow-[0_0_25px_rgba(255,107,26,1)]"
                                                initial={{ y: 20, opacity: 0, scaleX: 0.5 }}
                                                animate={{ y: 1, opacity: 1, scaleX: 1 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 350,
                                                    damping: 25
                                                }}
                                            />
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        {/* Main Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 max-w-7xl lg:max-w-6xl 2xl:max-w-7xl mx-auto h-full">

                            {/* Left Column */}
                            <div className={`${activeTab === 0 ? "flex" : "hidden"} md:flex flex-col gap-3 md:gap-6 justify-start pt-1 md:pt-8`}>
                                <h3 className="text-white font-bold text-center mb-1 md:mb-2 uppercase tracking-wide text-[0.625rem] md:text-sm h-4 md:h-5">System Outcomes</h3>

                                {/* Batteries Revived Card */}
                                <div className="bg-[#111] border border-white/10 rounded-xl p-4 md:p-6 flex flex-col justify-center gap-1 md:gap-1.5 shadow-lg h-[6.25rem] md:h-36 w-full">
                                    <div className="flex items-center gap-1">
                                        <span className="text-3xl md:text-4xl font-black text-white">
                                            <Counter value={20000} />
                                        </span>
                                        <span className="text-3xl md:text-4xl font-black text-[#ff6b1a]"> +</span>
                                    </div>
                                    <span className="text-[#ff6b1a] font-bold text-[0.75rem] md:text-base">Batteries Revived</span>
                                    <p className="text-white/50 text-[0.625rem] md:text-sm leading-tight">Across critical applications and operating conditions</p>
                                </div>

                                {/* Warranty Months Card */}
                                <div className="bg-[#111] border border-white/10 rounded-xl p-4 md:p-6 flex flex-col justify-center gap-1 md:gap-1.5 shadow-lg h-[6.25rem] md:h-36 w-full">
                                    <div className="flex items-center gap-1">
                                        <span className="text-3xl md:text-4xl font-black text-white">
                                            <Counter value={300000} />
                                        </span>
                                        {/* <span className="text-2xl md:text-3xl font-black text-[#ff6b1a]"> k+</span> */}
                                    </div>
                                    <span className="text-[#ff6b1a] font-bold text-[0.75rem] md:text-base">Warranty Months</span>
                                    <p className="text-white/50 text-[0.625rem] md:text-sm leading-tight">12–36 month warranty-backed revival performance</p>
                                </div>

                                {/* Client Savings Card */}
                                <div className="bg-[#111] border border-white/10 rounded-xl p-4 md:p-6 flex flex-col justify-center gap-1 md:gap-1.5 shadow-lg h-[6.25rem] md:h-36 w-full">
                                    <div className="flex items-center gap-1">
                                        <span className="text-3xl md:text-4xl font-black text-white">$<Counter value={1.5} decimals={1} /></span>
                                        <span className="text-3xl md:text-4xl font-black text-[#ff6b1a]"> M</span>
                                    </div>
                                    <span className="text-[#ff6b1a] font-bold text-[0.75rem] md:text-base">Client Savings</span>
                                    <p className="text-white/50 text-[0.625rem] md:text-sm leading-tight">Through predictable lifecycle decisions</p>
                                </div>
                            </div>

                            {/* Center Column - Gauges */}
                            <div className={`${activeTab === 1 ? "flex" : "hidden"} md:flex flex-col gap-4 md:gap-8 items-center justify-start pt-2 md:pt-8`}>
                                <h3 className="text-white font-bold text-center mb-1 md:mb-2 uppercase tracking-wide text-[0.625rem] md:text-sm h-4 md:h-5">Performance Restoration</h3>

                                {/* Gauge 1 */}
                                <div className="flex flex-col items-center justify-center">
                                    <AnimatedGauge id="soh" value={100} range={{ min: 95, max: 100 }} label="SOH Recovery" />
                                    <p className="text-white/60 text-center text-[0.625rem] md:text-xs mt-[-10px] md:mt-[-20px] px-2 sm:px-4 max-w-[13.75rem] sm:max-w-[15rem] md:max-w-[12.5rem] leading-tight break-words">Near-new operating health restored</p>
                                </div>

                                {/* Gauge 2 */}
                                <div className="flex flex-col items-center justify-center">
                                    <AnimatedGauge id="capacity" value={100} range={{ min: 95, max: 100 }} label="Capacity Recovery" />
                                    <p className="text-white/60 text-center text-[0.625rem] md:text-xs mt-[-10px] md:mt-[-20px] px-2 sm:px-4 max-w-[13.75rem] sm:max-w-[15rem] md:max-w-[12.5rem] leading-tight break-words">Usable charge capacity restored</p>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className={`${activeTab === 2 ? "flex" : "hidden"} md:flex flex-col gap-3 md:gap-6 justify-start pt-1 md:pt-8`}>
                                <h3 className="text-white font-bold text-center mb-1 md:mb-2 uppercase tracking-wide text-[0.625rem] md:text-sm h-4 md:h-5">Environmental & Compliance</h3>

                                {/* CO2 Avoided Card */}
                                <div className="bg-[#111] border border-white/10 rounded-xl p-4 md:p-6 flex flex-col justify-center gap-1 md:gap-1.5 shadow-lg h-[6.25rem] md:h-36 w-full">
                                    <div className="flex items-center gap-1">
                                        <span className="text-3xl md:text-4xl font-black text-white">
                                            <Counter value={1.23} decimals={2} />M
                                        </span>
                                        <span className="text-3xl md:text-4xl font-black text-[#ff6b1a]"> kg</span>
                                    </div>
                                    <span className="text-[#ff6b1a] font-bold text-[0.75rem] md:text-base">CO₂ Avoided</span>
                                    <p className="text-white/50 text-[0.625rem] md:text-sm leading-tight">By extending life before recycling</p>
                                </div>

                                {/* Waste Prevented Card */}
                                <div className="bg-[#111] border border-white/10 rounded-xl p-4 md:p-6 flex flex-col justify-center gap-1 md:gap-1.5 shadow-lg h-[6.25rem] md:h-36 w-full">
                                    <div className="flex items-center gap-1">
                                        <span className="text-3xl md:text-4xl font-black text-white">
                                            <Counter value={500} /> tonne
                                        </span>
                                    </div>
                                    <span className="text-[#ff6b1a] font-bold text-[0.75rem] md:text-base">Waste Prevented</span>
                                    <p className="text-white/50 text-[0.625rem] md:text-sm leading-tight">Batteries retained in active use</p>
                                </div>

                                {/* Liquid Discharge Card */}
                                <div className="bg-[#111] border border-white/10 rounded-xl p-4 md:p-6 flex flex-col justify-center gap-1 md:gap-1.5 shadow-lg h-[6.25rem] md:h-36 w-full">
                                    <div className="flex items-center gap-1">
                                        <span className="text-3xl md:text-4xl font-black text-white">
                                            <Counter value={0} />
                                        </span>
                                        <span className="text-3xl md:text-4xl font-black text-[#ff6b1a]"> %</span>
                                    </div>
                                    <span className="text-[#ff6b1a] font-bold text-[0.75rem] md:text-base">Liquid Discharge</span>
                                    <p className="text-white/50 text-[0.625rem] md:text-sm leading-tight">All electrolyte filtered and reused</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </ContainerScroll>
            <div className="bg-black py-4 md:py-8 px-8 overflow-hidden font-sans text-white -mt-48 md:-mt-64 relative z-30" style={{ minHeight: '200px' }}>
                <div className="max-w-[75rem] mx-auto">
                    <div className="relative h-12 mb-6 overflow-hidden flex items-center rounded-lg">
                        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

                        <div className="flex animate-scroll whitespace-nowrap items-center">
                            {[...tickerData, ...tickerData, ...tickerData].map((item, i) => (
                                <div key={i} className="flex items-center px-6">
                                    <div className="w-2 h-2 bg-[#ff6b1a] rounded-full mr-4" />
                                    <span className="text-white/70 font-medium">
                                        {item.prefix}<span className="text-[#ff6b1a]">{item.highlight}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="flex flex-col items-center justify-center gap-4 px-4">
                        <p
                            className="text-[0.875rem] md:text-[1.125rem] text-[#4A5565] text-center font-normal leading-normal md:leading-[1.75rem]"
                            style={{ fontFamily: 'Arial' }}
                        >
                            Measured outcomes. Verified performance. Extended life.
                        </p>
                        <button
                            className="bg-[#ff6b1a] h-[3rem] md:h-[3.625rem] rounded-[0.25rem] px-6 md:px-10 text-[#FFF] font-normal text-[0.9375rem] md:text-[1.125rem] leading-normal md:leading-[1.75rem] text-center border-none cursor-pointer transition-all duration-300 will-change-[box-shadow] hover:bg-[#ff6b1a]/90 shadow-[0_0_15px_rgba(255,107,26,0.4),0_0_30px_rgba(255,107,26,0.2)] hover:shadow-[0_0_20px_rgba(255,107,26,0.5),0_0_40px_rgba(255,107,26,0.25)] whitespace-nowrap"
                            style={{ fontFamily: 'Arial' }}
                        >
                            Request Custom Report
                        </button>
                    </div>
                </div>

                <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
            </div>
        </div>

    );
}
