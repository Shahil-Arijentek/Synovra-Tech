export default function ChagingPersective() {
  return (
    <section className="bg-black pt-28 pb-0 md:py-24 overflow-hidden relative font-['Poppins'] group">
      <div className="flex items-center justify-center">
        <h2 className="relative text-[10vw] md:text-[140px] lg:text-[180px] font-black uppercase tracking-tighter leading-none text-center text-[#1a1a1a] opacity-60">
          <span className="block">CHANGING THE PERSECTIVE</span>
          <span className="reveal-text absolute inset-0 block">
            CHANGING THE PERSECTIVE
          </span>
        </h2>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;900&display=swap');

        .reveal-text {
          color: transparent;
          background-image: linear-gradient(90deg, #ff5e00 0%, #ff7a1a 50%, rgb(255, 94, 0) 100%);
          background-size: 0% 100%;
          background-repeat: no-repeat;
          background-position: left center;
          -webkit-background-clip: text;
          background-clip: text;
          transition: background-size 1800ms cubic-bezier(0.19, 1, 0.22, 1);
        }

        .group:hover .reveal-text {
          background-size: 100% 100%;
        }
      `}</style>
    </section>
  );
}
