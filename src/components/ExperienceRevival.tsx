import Threads from "./Threads";

export default function ExperienceRevival() {
  return (
    <section className="revival-experience relative flex min-h-[1069px] items-center justify-center overflow-hidden bg-black px-6 text-center text-white sm:px-8">
      
      {/* Replaced Video with Threads */}
      {/* <div className="absolute inset-0 h-full w-full">
        <Threads
          amplitude={1.5} 
          distance={0} 
          enableMouseInteraction={true} 
        />
      </div> */}

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-3xl pointer-events-none">
        <h2 className="text-center font-['Arial'] text-[42px] md:text-[52px] font-black leading-[1.2] tracking-[-2.4px] text-white">
          Experience Revival.<br /> Experience Performance.
        </h2>
        <p className="mt-3 text-xs tracking-[0.2em] text-white/80 uppercase">
          Redefining battery afterlife with premium, precision-engineered power built to last.
        </p>
      </div>
    </section>
  );
}