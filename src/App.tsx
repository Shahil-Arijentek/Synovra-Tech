import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import WhyRevive from './pages/WhyRevive'

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen font-sans">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/why-revive" element={<WhyRevive />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App