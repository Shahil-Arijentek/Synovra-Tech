import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import WhyRevive from './pages/WhyRevive'

function ScrollToTop() {
  const location = useLocation()
  
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0)
    
    // Import ScrollTrigger dynamically to refresh it
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      // Kill all scroll triggers and refresh
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true))
      ScrollTrigger.refresh()
    }).catch(() => {
      // GSAP not loaded yet, ignore
    })
  }, [location.pathname])
  
  return null
}

function AppContent() {
  const location = useLocation()
  
  return (
    <>
      <ScrollToTop />
      <div className="w-full min-h-screen font-sans">
        <Header />
        <main>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/why-revive" element={<WhyRevive />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App