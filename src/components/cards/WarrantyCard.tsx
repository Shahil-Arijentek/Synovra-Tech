interface WarrantyCardProps {
  status: string
  coverage: string
}

export default function WarrantyCard({ status, coverage }: WarrantyCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-2xl p-3 w-[200px] h-[240px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[10px] font-['Arial',sans-serif] tracking-wider mb-6">
        WARRANTY
      </div>

      {/* Shield Icon with Clock */}
      <div className="flex items-center justify-center mb-6 mt-4">
        <img
          src="/cards/warranty.png"
          alt="Warranty Shield"
          className="w-[80px] h-[80px] object-contain"
        />
      </div>

      {/* Status Text */}
      <div className="text-center space-y-1">
        <div className="text-white text-[12px] font-['Arial',sans-serif] font-medium uppercase">
          {status}
        </div>
        <div className="text-white text-[12px] font-['Arial',sans-serif] font-medium uppercase">
          {coverage}
        </div>
      </div>
    </div>
  )
}
