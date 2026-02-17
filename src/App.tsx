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
      }).catch((error) => {
        if (import.meta.env.DEV) {
          console.warn('Failed to load GSAP ScrollTrigger:', error)
        }
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

  React.useEffect(() => {
    if (!showContent) return
    const timer = setTimeout(() => {
      setShowFooter(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [showContent])

  if (!showContent) {
    return null
  }

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
    let isMounted = true
    let progressInterval: ReturnType<typeof setInterval> | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let fadeOutTimeout: ReturnType<typeof setTimeout> | null = null
    let showContentTimeout: ReturnType<typeof setTimeout> | null = null
    let finalTimeout: ReturnType<typeof setTimeout> | null = null

    const loadAssets = async () => {
      try {
        const startTime = Date.now()
        const MAX_LOAD_TIME = 10000 
        const MIN_LOAD_TIME = 1500 
        const componentsPromise = Promise.all([
          import('./pages/Home'),
          import('./pages/WhyRevive'),
          import('./pages/AboutUs'),
          import('./pages/GetStarted'),
        ])

        const { priorityPreloader } = await import('./utils/priorityPreloader')
        const { getAllCriticalAssets } = await import('./utils/assetManifest')

        const criticalAssets = getAllCriticalAssets()
        let loadedCount = 0
        const totalAssets = criticalAssets.length
        
        const loadCriticalAssets = new Promise<void>((resolve) => {
          const checkProgress = () => {
            if (!isMounted) {
              resolve()
              return
            }
            const heroVideo = '/mainbattery.mp4'
            const videoElement = document.querySelector(`video[src="${heroVideo}"]`) as HTMLVideoElement
            const heroLoaded = priorityPreloader.isLoaded(heroVideo) || 
                              (videoElement && videoElement.readyState >= 3)
            const currentLoaded = criticalAssets.filter(url => 
              priorityPreloader.isLoaded(url)
            ).length

            loadedCount = currentLoaded
            const progress = Math.min(95, Math.round((loadedCount / totalAssets) * 100))
            if (isMounted) {
              setLoadingProgress(progress)
            }
            if (heroLoaded && (loadedCount >= Math.max(5, totalAssets * 0.5) || progress >= 70)) {
              if (progressInterval) {
                clearInterval(progressInterval)
                progressInterval = null
              }
              if (timeoutId) {
                clearTimeout(timeoutId)
                timeoutId = null
              }
              resolve()
            }
          }
          progressInterval = setInterval(checkProgress, 100)
          timeoutId = setTimeout(() => {
            if (progressInterval) {
              clearInterval(progressInterval)
              progressInterval = null
            }
            resolve() 
          }, MAX_LOAD_TIME)
          checkProgress()
        })
        
        await Promise.race([
          Promise.all([componentsPromise, loadCriticalAssets]),
          new Promise(resolve => setTimeout(resolve, MAX_LOAD_TIME))
        ])

        if (!isMounted) return

        const elapsed = Date.now() - startTime
        const remainingTime = Math.max(0, MIN_LOAD_TIME - elapsed)

        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime))
        }

        if (!isMounted) return

        setLoadingProgress(100)

        fadeOutTimeout = setTimeout(() => {
          if (!isMounted) return
          setIsFadingOut(true)

          showContentTimeout = setTimeout(() => {
            if (!isMounted) return
            setIsInitialLoading(false)
            finalTimeout = setTimeout(() => {
              if (isMounted) {
                setShowContent(true)
              }
            }, 600)
          }, 500)
        }, 400)
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn('Asset loading error:', error)
        }
        if (!isMounted) return
        
        setLoadingProgress(100)
        fadeOutTimeout = setTimeout(() => {
          if (!isMounted) return
          setIsFadingOut(true)
          showContentTimeout = setTimeout(() => {
            if (!isMounted) return
            setIsInitialLoading(false)
            finalTimeout = setTimeout(() => {
              if (isMounted) {
                setShowContent(true)
              }
            }, 600)
          }, 500)
        }, 500)
      }
    }

    loadAssets()

    return () => {
      isMounted = false
      if (progressInterval) clearInterval(progressInterval)
      if (timeoutId) clearTimeout(timeoutId)
      if (fadeOutTimeout) clearTimeout(fadeOutTimeout)
      if (showContentTimeout) clearTimeout(showContentTimeout)
      if (finalTimeout) clearTimeout(finalTimeout)
    }
  }, [])

  return (
    <Router>
      {isInitialLoading && (
        <>
          <div className={`fixed inset-0 z-[9998] bg-black transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true" />
          <div className={`fixed inset-0 z-[9999] ${isFadingOut ? 'animate-fadeOut' : ''}`} role="status" aria-live="polite" aria-label="Loading">
            <LoadingSpinner progress={isFadingOut ? 100 : loadingProgress} />
          </div>
        </>
      )}
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