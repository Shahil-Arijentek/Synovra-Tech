
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
            try {
                if (tickerCallbackRef.current) {
                    gsap.ticker.remove(tickerCallbackRef.current)
                    tickerCallbackRef.current = null
                }
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.warn('Error removing GSAP ticker callback:', error)
                }
            }
            
            try {
                lenis.off('scroll', ScrollTrigger.update)
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.warn('Error removing Lenis scroll listener:', error)
                }
            }
            
            try {
                lenis.destroy()
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.warn('Error destroying Lenis instance:', error)
                }
            }
        }
    }, [])

    return (
        <div className="smooth-scroll-wrapper w-full min-h-screen">
            {children}
        </div>
    )
}
