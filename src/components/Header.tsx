import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="fixed top-0 mt-5 left-0 right-0 z-[9999] w-full px-[21px] py-0">
      <nav
        className="backdrop-blur-[10px] backdrop-filter border border-[rgba(255,255,255,0.1)] border-solid rounded-[10px] flex items-center justify-between px-[21px] py-px h-[84px] w-full max-w-[1376px] mx-auto bg-transparent relative"
      >
        {/* Logo - Stays on left */}
        <Link to="/" className="cursor-pointer h-[38px] relative shrink-0 w-[150px] md:w-[175px] bg-transparent border-none p-0 flex items-center">
          <div className="h-[13px] relative shrink-0 w-[122px]">
            <img
              src="/synovra.png"
              alt="Synovra"
              className="absolute inset-0 w-full h-full object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex relative shrink-0 w-auto items-center justify-end">
          <div className="flex gap-[32px] h-[36px] items-center justify-end px-[24px] py-0 relative shrink-0 w-auto">
            <Link
              to="/"
              className={`h-[20px] relative shrink-0 w-auto text-[14px] leading-[20px] font-['Arial',sans-serif] no-underline transition-colors whitespace-nowrap ${
                isActive('/') ? 'text-[#ff6b1a]' : 'text-[#4a5565] hover:text-[#ff6b1a]'
              }`}
            >
              Lifecycle
            </Link>
            <Link
              to="/why-revive"
              className={`h-[20px] relative shrink-0 w-auto text-[14px] leading-[20px] font-['Arial',sans-serif] no-underline transition-colors whitespace-nowrap ${
                isActive('/why-revive') ? 'text-[#ff6b1a]' : 'text-[#4a5565] hover:text-[#ff6b1a]'
              }`}
            >
              Why Revive
            </Link>
            <Link
              to="/about-us"
              className={`h-[20px] relative shrink-0 w-auto text-[14px] leading-[20px] font-['Arial',sans-serif] no-underline transition-colors whitespace-nowrap ${
                isActive('/about-us') ? 'text-[#ff6b1a]' : 'text-[#4a5565] hover:text-[#ff6b1a]'
              }`}
            >
              About Us
            </Link>
          </div>
          <Link to="/get-started" className="bg-[#ff6b1a] h-[58px] overflow-clip relative rounded-[4px] shrink-0 w-[156px] border-none cursor-pointer transition-all hover:bg-[#ff6b1a]/90 shadow-[0_0_20px_rgba(255,107,26,0.6)] hover:shadow-[0_0_30px_rgba(255,107,26,0.8)] flex items-center justify-center">
            <span className="font-['Arial',sans-serif] leading-[28px] text-[18px] text-white whitespace-nowrap">
              Get Started
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 text-white relative z-[110] outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div
            className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[94px] left-0 right-0 bg-[#0d0d0d]/90 backdrop-blur-md border border-white/10 rounded-[10px] p-6 flex flex-col gap-6 md:hidden z-[100]"
            >
              <Link
                to="/"
                className={`text-[18px] font-['Arial',sans-serif] no-underline ${
                  isActive('/') ? 'text-[#ff6b1a]' : 'text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Lifecycle
              </Link>
              <Link
                to="/why-revive"
                className={`text-[18px] font-['Arial',sans-serif] no-underline ${
                  isActive('/why-revive') ? 'text-[#ff6b1a]' : 'text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Why Revive
              </Link>
              <Link
                to="/about-us"
                className={`text-[18px] font-['Arial',sans-serif] no-underline ${
                  isActive('/about-us') ? 'text-[#ff6b1a]' : 'text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/get-started"
                className="bg-[#ff6b1a] h-[58px] rounded-[4px] text-white font-['Arial',sans-serif] text-[18px] shadow-[0_0_20px_rgba(255,107,26,0.6)] flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
