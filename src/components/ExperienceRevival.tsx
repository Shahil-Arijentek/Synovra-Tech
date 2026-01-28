export default function ExperienceRevival() {
  return (
    <section id="lifecycle" className="revival-experience relative flex min-h-[400px] md:min-h-[600px] items-center justify-center overflow-hidden bg-black px-6 text-center text-white sm:px-8 py-12 md:py-20">

      {/* Background Video */}
      <div className="absolute inset-0 h-full w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-60"
        >
          <source src="/envato_video_gen_Dec_22_2025_10_05_24.mp4" type="video/mp4" />
        </video>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-full pointer-events-none px-4 sm:px-6">
        <h2 className="text-center font-['Arial'] font-black leading-[1.1] tracking-tight sm:tracking-tighter md:tracking-[-2.4px] text-white uppercase flex flex-col items-center gap-1" style={{ fontSize: 'clamp(1.25rem, 5vw, 3rem)' }}>
          <span className="whitespace-nowrap">Experience Revival.</span>
          <span className="whitespace-nowrap">Experience Performance.</span>
        </h2>
        <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.3em] text-white/90 uppercase max-w-[280px] sm:max-w-none mx-auto leading-relaxed px-2">
          Redefining battery afterlife with premium, precision-engineered power built to last.
        </p>
      </div>
    </section>
  );
}