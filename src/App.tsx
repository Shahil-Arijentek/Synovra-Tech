import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense, useLayoutEffect } from 'react'
import React from 'react'
import './App.css'
// import { LoadingProvider } from './contexts/LoadingContext'
import { NavbarProvider, useNavbar } from './contexts/NavbarContext'
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import FullPageLoadingSpinner from './components/FullPageLoadingSpinner'

// Lazy load all page components for better code splitting
const Home = lazy(() => import('./pages/Home'))
const WhyRevive = lazy(() => import('./pages/WhyRevive'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const GetStarted = lazy(() => import('./pages/GetStarted'))
// const BatteryLifecycle = lazy(() => import('./pages/BatteryLifecycle'))

function ScrollToTop() {
  const location = useLocation()
  
  // Use useLayoutEffect to scroll before paint
  useLayoutEffect(() => {
    // Force immediate scroll to top
    window.scrollTo(0, 0)
    
    // Also set document scroll directly
    if (document.documentElement) {
      document.documentElement.scrollTop = 0
    }
    if (document.body) {
      document.body.scrollTop = 0
    }
  }, [location.pathname])
  
  // Clean up ScrollTrigger after component is mounted
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill(true))
        ScrollTrigger.refresh()
      }).catch(() => {
        // Silently handle error
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
  
  // Hide content until loading is completely finished
  if (!showContent) {
    return null
  }
  
  return (
    <>
      <ScrollToTop />
      <div className="w-full min-h-screen font-sans bg-black animate-fadeIn">
        {isNavbarVisible && <Header />}
        <main>
          <Suspense fallback={<FullPageLoadingSpinner />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/why-revive" element={<WhyRevive />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/get-started" element={<GetStarted />} />
              {/* <Route path="/battery-lifecycle" element={<BatteryLifecycle />} /> */}
            </Routes>
          </Suspense>
        </main>
        {!hideFooter && <Footer />}
      </div>
    </>
  )
}

function App() {
  const [isInitialLoading, setIsInitialLoading] = React.useState(true)
  const [showContent, setShowContent] = React.useState(false)
  const [isFadingOut, setIsFadingOut] = React.useState(false)

  // Disable browser's scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  // Initial website loading
  useEffect(() => {
    let loadingTimer: number
    let fadeOutTimer: number
    let contentTimer: number
    
    // Show loading for initial resources
    loadingTimer = setTimeout(() => {
      setIsFadingOut(true)
      
      // Wait for fade-out to complete before showing content
      fadeOutTimer = setTimeout(() => {
        setIsInitialLoading(false)
        
        // Delay to ensure loading is completely gone
        contentTimer = setTimeout(() => {
          setShowContent(true)
        }, 100)
      }, 500) // Match fade-out animation duration
    }, 1500) // Show loading for 1.5 seconds

    return () => {
      clearTimeout(loadingTimer)
      clearTimeout(fadeOutTimer)
      clearTimeout(contentTimer)
    }
  }, [])
  
  return (
    <Router>
      {/* Full-page loading overlay when entering website */}
      {isInitialLoading && (
        <>
          {/* Solid black background that stays during entire fade */}
          <div className={`fixed inset-0 z-[9998] bg-black transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`} />
          
          {/* Loading spinner with fade animation */}
          <div className={`fixed inset-0 z-[9999] ${isFadingOut ? 'animate-fadeOut' : ''}`}>
            <LoadingSpinner />
          </div>
        </>
      )}
      
      {/* <LoadingProvider initialLoadingTime={1500}> */}
        <NavbarProvider>
          <AppContent showContent={showContent} />
        </NavbarProvider>
      {/* </LoadingProvider> */}
    </Router>
  )
}

export default App