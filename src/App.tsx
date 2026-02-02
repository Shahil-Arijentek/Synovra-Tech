import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense, useLayoutEffect } from 'react'
import './App.css'
// import { LoadingProvider } from './contexts/LoadingContext'
import { NavbarProvider, useNavbar } from './contexts/NavbarContext'
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'

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

function AppContent() {
  const location = useLocation()
  const { isNavbarVisible } = useNavbar()
  const hideFooter = location.pathname === '/battery-lifecycle'
  
  return (
    <>
      <ScrollToTop />
      <div className="w-full min-h-screen font-sans bg-black">
        {isNavbarVisible && <Header />}
        <main>
          <Suspense fallback={<LoadingSpinner />}>
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
  // Disable browser's scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])
  
  return (
    <Router>
      {/* <LoadingProvider initialLoadingTime={1500}> */}
        <NavbarProvider>
          <AppContent />
        </NavbarProvider>
      {/* </LoadingProvider> */}
    </Router>
  )
}

export default App