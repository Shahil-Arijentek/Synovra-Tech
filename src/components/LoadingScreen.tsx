interface LoadingScreenProps {
  message?: string
}

export default function LoadingScreen({ message = 'Loading Synovra...' }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="text-center">
        {/* Animated Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-[#ff6b1a]/20 rounded-full"></div>
          
          {/* Spinning Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-[#ff6b1a] rounded-full animate-spin"></div>
          
          {/* Inner Glow */}
          <div className="absolute inset-2 bg-[#ff6b1a]/10 rounded-full blur-sm"></div>
        </div>

        {/* Loading Text */}
        <p className="text-white text-lg font-['Arial',sans-serif] mb-2">
          {message}
        </p>

        {/* Animated Dots */}
        <div className="flex justify-center gap-1">
          <div className="w-2 h-2 bg-[#ff6b1a] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-[#ff6b1a] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-[#ff6b1a] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Subtle Brand Text */}
        {/* <p className="text-white/40 text-xs font-['Arial',sans-serif] mt-6 tracking-wider uppercase">
          Battery Revival Technology
        </p> */}
      </div>
    </div>
  )
}
