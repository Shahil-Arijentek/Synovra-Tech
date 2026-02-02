export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative">
        {/* Outer Rotating Ring */}
        <div className="relative w-32 h-32">
          {/* Spinning outer circle */}
          <div className="absolute inset-0 border-4 border-transparent border-t-[#ff6b1a] border-r-[#ff6b1a] rounded-full animate-spin" />
          
          {/* Pulse effect */}
          <div className="absolute inset-2 border-4 border-transparent border-b-[#ff8c42] border-l-[#ff8c42] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          
          {/* Center glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-[#ff6b1a] rounded-full animate-pulse shadow-[0_0_30px_rgba(255,107,26,0.8)]" />
          </div>
          
          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
            <div className="w-3 h-3 bg-white rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          </div>
        </div>
        
        {/* Loading Text with Brand Font */}
        <div className="text-center mt-8">
          <p className="text-white text-xl font-['Arial',sans-serif] tracking-wide mb-2">
            LOADING
          </p>
          
          {/* Animated Progress Dots */}
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-[#ff6b1a] rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-[#ff6b1a] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-[#ff6b1a] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
