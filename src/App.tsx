import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import { LoadingProvider } from './contexts/LoadingContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import WhyRevive from './pages/WhyRevive'
import AboutUs from './pages/AboutUs'
import GetStarted from './pages/GetStarted'
// import BatteryLifecycle from './pages/BatteryLifecycle'

function ScrollToTop() {
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true))
      ScrollTrigger.refresh()
    }).catch(() => {
    })
  }, [location.pathname])
  
  return null
}

function AppContent() {
  const location = useLocation()
  const hideFooter = location.pathname === '/battery-lifecycle'
  
  return (
    <>
      <ScrollToTop />
      <div className="w-full min-h-screen font-sans">
        <Header />
        <main>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/why-revive" element={<WhyRevive />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/get-started" element={<GetStarted />} />
            {/* <Route path="/battery-lifecycle" element={<BatteryLifecycle />} /> */}
          </Routes>
        </main>
        {!hideFooter && <Footer />}
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <LoadingProvider initialLoadingTime={1500}>
        <AppContent />
      </LoadingProvider>
    </Router>
  )
}

export default App