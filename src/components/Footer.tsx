import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative w-full text-white z-[500]" style={{ backgroundColor: '#0d0d0d' }}>
      <div className="relative w-full overflow-visible">
        <img
          src="/footer.png"
          alt=""
          className="h-20 sm:h-24 md:h-48 lg:h-64 xl:h-80 w-full object-cover select-none relative md:z-10 opacity-20"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/20 via-[#0d0d0d]/10 to-[#0d0d0d] md:z-20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/30 via-transparent to-[#0d0d0d]/30 md:z-20" />
      </div>

      <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 md:px-8 lg:px-20 pb-8 sm:pb-10 pt-0 sm:pt-4 md:pt-8 lg:pt-12">
        <div className="grid gap-6 sm:gap-8 md:gap-12 grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-3 sm:space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#f59d0f]">
              <img
                src="/logo.png"
                alt="Synovra logo"
                className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 object-contain"
              />
              <span className="text-xs sm:text-sm md:text-base font-bold leading-none text-[#f59d0f]">
                Synovra
              </span>
            </div>
            <p className="max-w-lg mx-auto md:mx-0 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white/70 px-2 sm:px-0">
              Redefining battery lifecycle management through precision
              engineering and circular economy principles.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 text-center md:text-left">
            <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/50 font-medium">
              Navigation
            </p>
            <div className="space-y-2 sm:space-y-2 md:space-y-3 text-sm sm:text-base md:text-base lg:text-lg text-white/70">
              <Link className="block transition hover:text-white hover:translate-x-1 duration-200" to="/">
                Lifecycle
              </Link>
              <Link className="block transition hover:text-white hover:translate-x-1 duration-200" to="/why-revive">
                Why Revive
              </Link>
              <Link
                className="block transition hover:text-white hover:translate-x-1 duration-200"
                to="/about-us"
              >
                About Us
              </Link>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 text-center md:text-left">
            <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/50 font-medium">
              Contact
            </p>
            <div className="space-y-2 sm:space-y-2 md:space-y-3 text-sm sm:text-base md:text-base lg:text-lg text-white/70">
              <a
                className="block transition hover:text-white hover:translate-x-1 duration-200 break-all"
                href="mailto:shahil@arijentek.com"
              >
               shahil@arijentek.com
              </a>
              <a className="block transition hover:text-white hover:translate-x-1 duration-200" href="#">
                LinkedIn
              </a>
              <a className="block transition hover:text-white hover:translate-x-1 duration-200" href="#">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col gap-3 sm:gap-4 border-t border-white/10 pt-5 sm:pt-6 text-center md:text-left text-[0.625rem] sm:text-[0.6875rem] md:text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Synovra Technologies</p>
          <p>Made by <a href="https://www.arijentek.com/" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-white transition-colors duration-200 underline">Arijentek Solution</a></p>
        </div>
      </div>
    </footer>
  )
}