interface WarrantyCardProps {
  status: string
  coverage: string
}

export default function WarrantyCard({ status, coverage }: WarrantyCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-3 w-[9.375rem] sm:w-[10rem] md:w-[12.5rem] h-[9.375rem] sm:h-[10rem] md:h-[15rem] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)] flex flex-col">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[0.5rem] md:text-[0.625rem] font-['Arial',sans-serif] tracking-wider mb-4 md:mb-6">
        WARRANTY
      </div>

      {/* Shield Icon with Clock */}
      <div className="flex items-center justify-center mb-2 md:mb-6 mt-2 md:mt-4 flex-1">
        <img
          src="/cards/warranty.png"
          alt="Warranty Shield"
          className="w-[3.125rem] h-[3.125rem] sm:w-[3.75rem] sm:h-[3.75rem] md:w-[5rem] md:h-[5rem] object-contain"
        />
      </div>

      {/* Status Text */}
      <div className="text-center space-y-0.5 mt-auto px-1 pb-1">
        <div className="text-white text-[0.4375rem] sm:text-[0.5rem] md:text-[0.75rem] font-['Arial',sans-serif] font-medium uppercase leading-tight break-words">
          {status}
        </div>
        <div className="text-white text-[0.4375rem] sm:text-[0.5rem] md:text-[0.75rem] font-['Arial',sans-serif] font-medium uppercase leading-tight break-words">
          {coverage}
        </div>
      </div>
    </div>
  )
}
