
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ParallaxElementProps {
    children: ReactNode
    speed?: number // 0.5 = half speed (far), 1 = normal, 2 = double speed (close)
    className?: string
    start?: string // "top bottom" by default
    end?: string // "bottom top" by default
}

export default function ParallaxElement({
    children,
    speed = 0.5,
    className = "",
    start = "top bottom",
    end = "bottom top"
}: ParallaxElementProps) {
    const triggerRef = useRef<HTMLDivElement>(null)
    const targetRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const trigger = triggerRef.current
        const target = targetRef.current

        if (!trigger || !target) return

        gsap.registerPlugin(ScrollTrigger)

        const context = gsap.context(() => {
            // Calculate movement based on speed
            // If speed is 1, yMovement should be 0 (natural scroll)
            // We want to offset the natural scroll.
            // A speed of 0.5 means it should move 50% of the distance it would have naturally.
            // So we translate it down by 50% of the scroll distance?

            // Actually, standard parallax logic:
            // data-speed="0.5" -> moves at half speed.
            // To achieve this with transform while scrolling:
            // y = (scrollTop * (1 - speed))

            // Using ScrollTrigger scrub:
            // We can animate 'y' from -offset to +offset.
            // Or simply 'y' to some value based on scroll distance.

            // Let's use a simpler visual approach:
            // Strength of effect.
            // yPercent can be convenient.

            const yPercent = (speed - 1) * 20 // Arbitrary multiplier for effect strength

            gsap.fromTo(target,
                {
                    yPercent: -yPercent
                },
                {
                    yPercent: yPercent,
                    ease: "none",
                    scrollTrigger: {
                        trigger: trigger,
                        start: start,
                        end: end,
                        scrub: 0
                    }
                }
            )
        }, triggerRef)

        return () => context.revert()
    }, [speed, start, end])

    return (
        <div ref={triggerRef} className={`parallax-wrapper ${className}`}>
            <div ref={targetRef} className="will-change-transform">
                {children}
            </div>
        </div>
    )
}
