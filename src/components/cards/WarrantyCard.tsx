interface WarrantyCardProps {
  status: string
  coverage: string
}

export default function WarrantyCard({ status, coverage }: WarrantyCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-3 w-[130px] sm:w-[140px] md:w-[200px] h-[160px] sm:h-[170px] md:h-[240px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)] flex flex-col">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[8px] md:text-[10px] font-['Arial',sans-serif] tracking-wider mb-4 md:mb-6">
        WARRANTY
      </div>

      {/* Shield Icon with Clock */}
      <div className="flex items-center justify-center mb-4 md:mb-6 mt-2 md:mt-4 flex-1">
        <img
          src="/cards/warranty.png"
          alt="Warranty Shield"
          className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] object-contain"
        />
      </div>

      {/* Status Text */}
      <div className="text-center space-y-1 mt-auto">
        <div className="text-white text-[10px] sm:text-[11px] md:text-[12px] font-['Arial',sans-serif] font-medium uppercase">
          {status}
        </div>
        <div className="text-white text-[10px] sm:text-[11px] md:text-[12px] font-['Arial',sans-serif] font-medium uppercase">
          {coverage}
        </div>
      </div>
    </div>
  )
}
