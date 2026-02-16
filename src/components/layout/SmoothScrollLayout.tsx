
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

interface SmoothScrollLayoutProps {
    children: ReactNode
}

export default function SmoothScrollLayout({ children }: SmoothScrollLayoutProps) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        lenisRef.current = lenis

        // Integrate with GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger)

        // Update ScrollTrigger on Lenis scroll
        lenis.on('scroll', ScrollTrigger.update)

        // Add Lenis's requestAnimationFrame to GSAP's ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        // Disable lag smoothing in GSAP to ensure smooth scrolling
        gsap.ticker.lagSmoothing(0)

        return () => {
            lenis.destroy()
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000)
            })
        }
    }, [])

    return (
        <div className="smooth-scroll-wrapper w-full min-h-screen">
            {children}
        </div>
    )
}
