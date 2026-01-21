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

const AnimatedGauge = ({ value, label }: { value: number; label: string }) => {
    const [gaugeValue, setGaugeValue] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, value, {
                duration: 2.0,
                ease: "linear", 
                // ease: [0.42, 0.42, 0.42, 0.42],
                onUpdate: (latest) => setGaugeValue(latest),
            });
            return () => controls.stop();
        }
    }, [isInView, value]);
    const glowIntensity = gaugeValue / value;

    return (
        <div ref={ref} className="relative flex flex-col items-center">
            <svg style={{ height: 0, width: 0, position: 'absolute' }}>
                <defs>
                    <linearGradient id="gauge-gradient-refined" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FF4500" />
                        <stop offset="100%" stopColor="#FF8C00" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="w-64 h-48 relative">
                <Gauge
                    value={gaugeValue}
                    startAngle={-110}
                    endAngle={110}
                    innerRadius="88%"
                    outerRadius="100%"
                    sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                            display: 'none',
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                            fill: 'url(#gauge-gradient-refined)',
                            filter: `drop-shadow(0 0 ${5 * glowIntensity}px #FF8C00) drop-shadow(0 0 ${12 * glowIntensity}px #FF4500)`,
                            strokeLinecap: 'round',
                            willChange: 'filter, stroke-dashoffset',
                        },
                        [`& .${gaugeClasses.referenceArc}`]: {
                            fill: 'rgba(255, 255, 255, 0.05)',
                        },
                    }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 pointer-events-none">
                    <span 
                        style={{
                            color: '#FFF',
                            textAlign: 'center',
                            fontFamily: '"Gemunu Libre", sans-serif',
                            fontSize: '34px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '1',
                            textShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        90-100%
                    </span>
                    <div className="mt-1">
                        <span 
                            style={{
                                color: '#EAEAEA',
                                textAlign: 'center',
                                fontFamily: 'Arial',
                                fontSize: '15px',
                                fontStyle: 'normal',
                                fontWeight: 900,
                                lineHeight: '1.2',
                                letterSpacing: '-0.5px',
                                opacity: 0.9,
                            }}
                        >
                            {label}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function SystemOutcomes() {
    return (
        <div className="flex flex-col overflow-hidden bg-black">
            <ContainerScroll
                titleComponent={
                    <>
                        <h1
                            className="text-white mb-2"
                            style={{
                                fontFamily: "Arial",
                                fontSize: "62px",
                                fontStyle: "normal",
                                fontWeight: 900,
                                lineHeight: "120%",
                                letterSpacing: "-2.4px",
                            }}
                        >
                            Measured Impact
                        </h1>
                        <p
                            className="mb-8"
                            style={{
                                color: "#595959",
                                textAlign: "center",
                                fontFamily: "Arial",
                                fontSize: "24px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "32px",
                            }}
                        >
                            What the system has already delivered
                        </p>
                    </>
                }
            >
                <div className="w-full h-full bg-[#0a0a0a] p-4 md:p-6">
                    {/* Main Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto h-full">

                        {/* Left Column */}
                        <div className="flex flex-col gap-6 justify-start pt-8">
                            <h3 className="text-white font-bold text-center mb-2 uppercase tracking-wide text-xs md:text-sm h-5">System Outcomes</h3>

                            {/* Batteries Revived Card */}
                            <div className="bg-[#111] border border-white/10 rounded-xl p-5 flex flex-col justify-center gap-1 shadow-lg h-36 w-full">
                                <div className="flex items-center gap-1">
                                    <span className="text-3xl font-black text-white">
                                        <Counter value={20000} />
                                    </span>
                                    <span className="text-3xl font-black text-[#ff6b1a]"> +</span>
                                </div>
                                <span className="text-[#ff6b1a] font-bold text-sm">Batteries Revived</span>
                                <p className="text-white/50 text-xs leading-tight">Across critical applications and operating conditions</p>
                            </div>

                            {/* Warranty Months Card */}
                            <div className="bg-[#111] border border-white/10 rounded-xl p-5 flex flex-col justify-center gap-1 shadow-lg h-36 w-full">
                                <div className="flex items-center gap-1">
                                    <span className="text-3xl font-black text-white">
                                        <Counter value={300} />
                                    </span>
                                    <span className="text-3xl font-black text-[#ff6b1a]"> k+</span>
                                </div>
                                <span className="text-[#ff6b1a] font-bold text-sm">Warranty Months</span>
                                <p className="text-white/50 text-xs leading-tight">12–36 month warranty-backed revival performance</p>
                            </div>

                            {/* Client Savings Card */}
                            <div className="bg-[#111] border border-white/10 rounded-xl p-5 flex flex-col justify-center gap-1 shadow-lg h-36 w-full">
                                <div className="flex items-center gap-1">
                                    <span className="text-3xl font-black text-white">$<Counter value={1.5} decimals={1} /></span>
                                    <span className="text-3xl font-black text-[#ff6b1a]"> M</span>
                                </div>
                                <span className="text-[#ff6b1a] font-bold text-sm">Client Savings</span>
                                <p className="text-white/50 text-xs leading-tight">Through predictable lifecycle decisions</p>
                            </div>
                        </div>

                        {/* Center Column - Gauges */}
                        <div className="flex flex-col gap-8 items-center justify-start pt-8">
                            <h3 className="text-white font-bold text-center mb-2 uppercase tracking-wide text-xs md:text-sm h-5">Performance Restoration</h3>

                            {/* Gauge 1 */}
                            <div className="flex flex-col items-center justify-center flex-1">
                                <AnimatedGauge value={95} label="SOH Recovery" />
                                <p className="text-white/60 text-center text-xs mt-[-20px] px-4 max-w-[200px]">Near-new operating health restored</p>
                            </div>

                            {/* Gauge 2 */}
                            <div className="flex flex-col items-center justify-center flex-1">
                                <AnimatedGauge value={95} label="SOH Recovery" />
                                <p className="text-white/60 text-center text-xs mt-[-20px] px-4 max-w-[200px]">Usable charge capacity restored</p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-6 justify-start pt-8">
                            <h3 className="text-white font-bold text-center mb-2 uppercase tracking-wide text-xs md:text-sm h-5">Performance Restoration</h3>

                            {/* CO2 Avoided Card */}
                            <div className="bg-[#111] border border-white/10 rounded-xl p-5 flex flex-col justify-center gap-1 shadow-lg h-36 w-full">
                                <div className="flex items-center gap-1">
                                    <span className="text-3xl font-black text-white">
                                        <Counter value={1.23} decimals={2} />M
                                    </span>
                                    <span className="text-3xl font-black text-[#ff6b1a]"> kg</span>
                                </div>
                                <span className="text-[#ff6b1a] font-bold text-sm">CO₂ Avoided</span>
                                <p className="text-white/50 text-xs leading-tight">By extending life before recycling</p>
                            </div>

                            {/* Waste Prevented Card */}
                            <div className="bg-[#111] border border-white/10 rounded-xl p-5 flex flex-col justify-center gap-1 shadow-lg h-36 w-full">
                                <div className="flex items-center gap-1">
                                    <span className="text-3xl font-black text-white">
                                        <Counter value={500} />t
                                    </span>
                                    <span className="text-3xl font-black text-[#ff6b1a]"> +</span>
                                </div>
                                <span className="text-[#ff6b1a] font-bold text-sm">Waste Prevented</span>
                                <p className="text-white/50 text-xs leading-tight">Batteries retained in active use</p>
                            </div>

                            {/* Liquid Discharge Card */}
                            <div className="bg-[#111] border border-white/10 rounded-xl p-5 flex flex-col justify-center gap-1 shadow-lg h-36 w-full">
                                <div className="flex items-center gap-1">
                                    <span className="text-3xl font-black text-white">
                                        <Counter value={0} />
                                    </span>
                                    <span className="text-3xl font-black text-[#ff6b1a]"> %</span>
                                </div>
                                <span className="text-[#ff6b1a] font-bold text-sm">Liquid Discharge</span>
                                <p className="text-white/50 text-xs leading-tight">All electrolyte filtered and reused</p>
                            </div>

                        </div>
                    </div>
                </div>
            </ContainerScroll>
            <div className="bg-black py-8 px-8 overflow-hidden font-sans text-white border-y border-white/5 -mt-24 md:-mt-64 relative z-30">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative h-12 mb-6 overflow-hidden bg-white/5 flex items-center rounded-lg">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
          
          <div className="flex animate-scroll whitespace-nowrap items-center">
            {[...tickerData, ...tickerData, ...tickerData].map((item, i) => (
              <div key={i} className="flex items-center px-6">
                <span className="text-white/70 font-medium mr-4">
                    {item.prefix}<span className="text-[#ff6b1a]">{item.highlight}</span>
                </span>
                <div className="w-2 h-2 bg-[#ff6b1a] rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col items-center justify-center gap-4 px-4">
          <p 
            className="text-[18px] text-[#4A5565] text-center font-normal leading-[28px]"
            style={{ fontFamily: 'Arial' }}
          >
             Measured outcomes. Verified performance. Extended life.
          </p>
          <button 
            className="bg-[#ff6b1a] h-[58px] rounded-[4px] px-10 text-[#FFF] font-normal text-[18px] leading-[28px] text-center border-none cursor-pointer transition-all hover:bg-[#ff6b1a]/90 shadow-[0_0_20px_rgba(255,107,26,0.6)] hover:shadow-[0_0_30px_rgba(255,107,26,0.8)] whitespace-nowrap"
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
