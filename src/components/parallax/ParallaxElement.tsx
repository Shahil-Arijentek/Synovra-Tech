
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ParallaxElementProps {
    children: ReactNode
    speed?: number
    className?: string
    start?: string
    end?: string
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
            const yPercent = (speed - 1) * 20

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
