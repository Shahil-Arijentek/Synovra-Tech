interface WarrantyCardProps {
  status: string
  coverage: string
}

export default function WarrantyCard({ status, coverage }: WarrantyCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-[15.815px] p-3 md:p-4 w-[9.375rem] sm:w-[10rem] md:w-[12.5rem] lg:w-[350px] lg:h-[200px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)] flex items-center justify-center gap-4 md:gap-6">
      {/* Shield Icon with Clock - Left Side */}
      <div className="flex-shrink-0">
        <img
          src="/cards/warranty.png"
          alt="Warranty Shield"
          className="w-[3.125rem] h-[3.125rem] sm:w-[3.5rem] sm:h-[3.5rem] md:w-[4rem] md:h-[4rem] lg:w-[6rem] lg:h-[6rem] object-contain"
        />
      </div>

      {/* Text Content - Right Side */}
      <div className="flex flex-col justify-center">
        {/* WARRANTY Label */}
        {status && (
          <div className="text-[#9CA3AF] text-[0.5rem] sm:text-[0.625rem] md:text-[0.75rem] lg:text-[0.875rem] font-['Arial',sans-serif] tracking-wider uppercase mb-1 md:mb-1.5">
            {status}
          </div>
        )}
        {/* Coverage Value */}
        <div className={`text-white font-['Arial',sans-serif] font-bold uppercase leading-tight ${
          coverage === '12-24 M' 
            ? 'text-base sm:text-lg md:text-xl lg:text-3xl' 
            : 'text-[0.4375rem] sm:text-[0.5rem] md:text-[0.75rem] font-medium'
        }`}>
          {coverage}
        </div>
      </div>
    </div>
  )
}
