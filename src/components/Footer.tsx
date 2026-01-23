export default function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-black text-white">
      <div className="relative w-full">
        <img
          src="/footer.png"
          alt=""
          className="h-24 sm:h-32 md:h-48 lg:h-64 w-full object-cover select-none"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-8 lg:px-20 pb-10 pt-0">
        <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 uppercase tracking-[0.3em] text-[#f59d0f]">
              <img
                src="/logo.png"
                alt="Synovra logo"
                className="h-6 w-6 md:h-7 md:w-7 object-contain"
              />
              <span className="text-sm md:text-base font-bold leading-none text-[#f59d0f]">
                Synovra
              </span>
            </div>
            <p className="max-w-lg mx-auto md:mx-0 text-[13px] md:text-base leading-relaxed text-white/70">
              Redefining battery lifecycle management through precision
              engineering and circular economy principles.
            </p>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/50">
              Navigation
            </p>
            <div className="space-y-2 md:space-y-3 text-[13px] md:text-base text-white/70">
              <a className="block transition hover:text-white" href="#process">
                Process
              </a>
              <a className="block transition hover:text-white" href="#impact">
                Impact
              </a>
              <a
                className="block transition hover:text-white"
                href="#technology"
              >
                Technology
              </a>
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/50">
              Contact
            </p>
            <div className="space-y-2 md:space-y-3 text-[13px] md:text-base text-white/70">
              <a
                className="block transition hover:text-white"
                href="mailto:hello@synovra.tech"
              >
                hello@synovra.tech
              </a>
              <a className="block transition hover:text-white" href="#">
                LinkedIn
              </a>
              <a className="block transition hover:text-white" href="#">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-center md:text-left text-[11px] md:text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2025 Synovra Technologies</p>
          <div className="flex items-center justify-center gap-6">
            <a className="transition hover:text-white" href="#">
              Privacy
            </a>
            <a className="transition hover:text-white" href="#">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}