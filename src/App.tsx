import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense, useLayoutEffect } from 'react'
import React from 'react'
import './App.css'
import { NavbarProvider, useNavbar } from './contexts/NavbarContext'
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorBoundary from './components/ErrorBoundary'
import SmoothScrollLayout from './components/layout/SmoothScrollLayout'

// Lazy load all page components for better code splitting
const Home = lazy(() => import('./pages/Home'))
const WhyRevive = lazy(() => import('./pages/WhyRevive'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const GetStarted = lazy(() => import('./pages/GetStarted'))

function ScrollToTop() {
  const location = useLocation()
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    if (document.documentElement) {
      document.documentElement.scrollTop = 0
    }
    if (document.body) {
      document.body.scrollTop = 0
    }
  }, [location.pathname])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill(true))
        ScrollTrigger.refresh()
      }).catch(() => {
      })
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [location.pathname])

  return null
}

function AppContent({ showContent }: { showContent: boolean }) {
  const location = useLocation()
  const { isNavbarVisible } = useNavbar()
  const hideFooter = location.pathname === '/battery-lifecycle'
  const [showFooter, setShowFooter] = React.useState(false)
  if (!showContent) {
    return null
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <ScrollToTop />
      <div className="w-full min-h-screen font-sans bg-black animate-fadeIn">
        <ErrorBoundary>
          {isNavbarVisible && <Header />}
          <main role="main">
            <Suspense fallback={null}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/why-revive" element={<WhyRevive />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/get-started" element={<GetStarted />} />
              </Routes>
            </Suspense>
          </main>
          {!hideFooter && showFooter && (
            <div className="animate-fadeIn">
              <Footer />
            </div>
          )}
        </ErrorBoundary>
      </div>
    </>
  )
}

function App() {
  const [isInitialLoading, setIsInitialLoading] = React.useState(true)
  const [showContent, setShowContent] = React.useState(false)
  const [isFadingOut, setIsFadingOut] = React.useState(false)
  const [loadingProgress, setLoadingProgress] = React.useState(0)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const startTime = Date.now()

        const componentsPromise = Promise.all([
          import('./pages/Home'),
          import('./pages/WhyRevive'),
          import('./pages/AboutUs'),
          import('./pages/GetStarted'),
        ])

        const { AssetPreloader, getCriticalAssets } = await import('./utils/assetPreloader')

        const criticalAssets = getCriticalAssets()

        const preloader = new AssetPreloader(criticalAssets, (progress) => {
          setLoadingProgress(progress.percentage)
        })

        await Promise.all([
          preloader.load(),
          componentsPromise
        ])

        const elapsed = Date.now() - startTime
        const minLoadTime = 1500
        const remainingTime = Math.max(0, minLoadTime - elapsed)

        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime))
        }

        // Ensure we show 100% briefly before fading out
        setLoadingProgress(100)

        setTimeout(() => {
          setIsFadingOut(true)

          setTimeout(() => {
            setIsInitialLoading(false)
            // Wait for fade-out animation to complete before showing content
            setTimeout(() => setShowContent(true), 600)
          }, 500)
        }, 400)
      } catch (error) {
        setLoadingProgress(100)
        setTimeout(() => {
          setIsFadingOut(true)
          setTimeout(() => {
            setIsInitialLoading(false)
            // Wait for fade-out animation to complete before showing content
            setTimeout(() => setShowContent(true), 600)
          }, 500)
        }, 500)
      }
    }

    loadAssets()
  }, [])

  return (
    <Router>
      {/* Full-page loading overlay when entering website */}
      {isInitialLoading && (
        <>
          {/* Solid black background that stays during entire fade */}
          <div className={`fixed inset-0 z-[9998] bg-black transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true" />

          {/* Loading spinner with real progress - keep at 100% during fade */}
          <div className={`fixed inset-0 z-[9999] ${isFadingOut ? 'animate-fadeOut' : ''}`} role="status" aria-live="polite" aria-label="Loading">
            <LoadingSpinner progress={isFadingOut ? 100 : loadingProgress} />
          </div>
        </>
      )}

      {/* Delay content mounting until showContent is true to prevent flash */}
      {showContent && (
        <ErrorBoundary>
          <NavbarProvider>
            <SmoothScrollLayout>
              <AppContent showContent={showContent} />
            </SmoothScrollLayout>
          </NavbarProvider>
        </ErrorBoundary>
      )}
    </Router>
  )
}

export default App