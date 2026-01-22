import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 mt-5 left-0 right-0 z-[100] w-full px-[21px] py-0">
      <nav
        className="backdrop-blur-[10px] backdrop-filter border border-[rgba(255,255,255,0.1)] border-solid rounded-[10px] flex items-center justify-between px-[21px] py-px h-[84px] w-full max-w-[1376px] mx-auto bg-transparent relative"
      >
        {/* Logo - Stays on left */}
        <button className="cursor-pointer h-[38px] relative shrink-0 w-[150px] md:w-[175px] bg-transparent border-none p-0 flex items-center">
          <div className="h-[13px] relative shrink-0 w-[122px]">
            <img
              src="/synovra.png"
              alt="Synovra"
              className="absolute inset-0 w-full h-full object-contain object-left"
            />
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex relative shrink-0 w-auto items-center justify-end">
          <div className="flex gap-[32px] h-[36px] items-center justify-end px-[24px] py-0 relative shrink-0 w-auto">
            <a
              href="#lifecycle"
              className="h-[20px] relative shrink-0 w-auto text-[#ff6b1a] text-[14px] leading-[20px] font-['Arial',sans-serif] no-underline transition-colors hover:text-[#ff6b1a]/80 whitespace-nowrap"
            >
              Lifecycle
            </a>
            <a
              href="#why-revive"
              className="h-[20px] relative shrink-0 w-auto text-[#4a5565] text-[14px] leading-[20px] font-['Arial',sans-serif] no-underline transition-colors hover:text-[#4a5565]/80 whitespace-nowrap"
            >
              Why Revive
            </a>
          </div>
          <button className="bg-[#ff6b1a] h-[58px] overflow-clip relative rounded-[4px] shrink-0 w-[156px] border-none cursor-pointer transition-all hover:bg-[#ff6b1a]/90 shadow-[0_0_20px_rgba(255,107,26,0.6)] hover:shadow-[0_0_30px_rgba(255,107,26,0.8)]">
            <span className="absolute font-['Arial',sans-serif] leading-[28px] left-[32px] text-[18px] text-white whitespace-nowrap top-[15px]">
              Get Started
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 text-white relative z-[110]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </motion.div>
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[94px] left-0 right-0 bg-black/90 backdrop-blur-md border border-white/10 rounded-[10px] p-6 flex flex-col gap-6 md:hidden z-[100]"
            >
              <a
                href="#lifecycle"
                className="text-[#ff6b1a] text-[18px] font-['Arial',sans-serif] no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Lifecycle
              </a>
              <a
                href="#why-revive"
                className="text-white text-[18px] font-['Arial',sans-serif] no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Why Revive
              </a>
              <button
                className="bg-[#ff6b1a] h-[58px] rounded-[4px] text-white font-['Arial',sans-serif] text-[18px] shadow-[0_0_20px_rgba(255,107,26,0.6)]"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
