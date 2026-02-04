interface BarcodeCardProps {
  value: string
}

export default function BarcodeCard({ value }: BarcodeCardProps) {
  return (
    <div className="backdrop-blur-[14.9px] bg-black/80 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 w-[300px] sm:w-[320px] md:w-[420px] shadow-[inset_0px_14.368px_57.47px_0px_rgba(0,0,0,0.3)]">
      {/* Title */}
      <div className="text-[#9CA3AF] text-[8px] md:text-[10px] font-['Arial',sans-serif] tracking-wider mb-2 md:mb-3">
        BARCODE
      </div>

      {/* Barcode Image */}
      <div className="relative w-full h-[40px] mb-3 flex items-center justify-center bg-black/30 rounded-lg">
        <img
          src="/cards/barcode.png"
          alt="Barcode"
          className="w-full h-full object-contain px-4"
        />
      </div>

      {/* Serial Number Text */}
      <div className="flex items-center justify-center">
        <img
          src="/cards/SNV-text.png"
          alt={value}
          className="h-[12px] object-contain"
        />
      </div>
    </div>
  )
}
