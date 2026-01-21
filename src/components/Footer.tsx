export default function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-black text-white">
      <div className="relative w-full">
        <img
          src="/footer.png"
          alt=""
          className="h-auto w-full select-none"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-8 pb-10 pt-0 lg:px-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3 uppercase tracking-[0.3em] text-[#f59d0f]">
              <img
                src="/logo.png"
                alt="Synovra logo"
                className="h-7 w-7 object-contain"
              />
              <span className="text-base font-bold leading-none text-[#f59d0f]">
                Synovra
              </span>
            </div>
            <p className="max-w-lg text-base leading-7 text-white/70">
              Redefining battery lifecycle management through precision
              engineering and circular economy principles.
            </p>
          </div>

          <div className="space-y-4 text-base">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Navigation
            </p>
            <div className="space-y-3 text-white/70">
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

          <div className="space-y-4 text-base">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Contact
            </p>
            <div className="space-y-3 text-white/70">
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

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2025 Synovra Technologies</p>
          <div className="flex items-center gap-6">
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