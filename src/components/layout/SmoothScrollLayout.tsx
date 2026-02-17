
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
    const tickerCallbackRef = useRef<((time: number) => void) | null>(null)

    useEffect(() => {
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

        gsap.registerPlugin(ScrollTrigger)

        lenis.on('scroll', ScrollTrigger.update)

        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000)
        }
        tickerCallbackRef.current = tickerCallback

        gsap.ticker.add(tickerCallback)
        gsap.ticker.lagSmoothing(0)

        return () => {
            if (tickerCallbackRef.current) {
                gsap.ticker.remove(tickerCallbackRef.current)
                tickerCallbackRef.current = null
            }
            lenis.off('scroll', ScrollTrigger.update)
            lenis.destroy()
        }
    }, [])

    return (
        <div className="smooth-scroll-wrapper w-full min-h-screen">
            {children}
        </div>
    )
}
