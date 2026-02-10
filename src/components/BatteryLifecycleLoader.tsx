export default function BatteryLifecycleLoader({ progress }: { progress: number }) {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated battery icon */}
        <div className="relative w-24 h-32">
          {/* Battery outline */}
          <div className="absolute inset-0 border-4 border-[#ff7700]/40 rounded-lg">
            {/* Battery terminal */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-3 bg-[#ff7700]/40 rounded-t"></div>
            
            {/* Battery fill animation */}
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#ff7700] to-[#ff9944] transition-all duration-300 ease-out rounded-b-md"
              style={{ height: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </div>
          
          {/* Glow effect */}
          <div 
            className="absolute inset-0 rounded-lg blur-xl transition-opacity duration-300"
            style={{ 
              background: `radial-gradient(circle, rgba(255, 119, 0, ${progress / 200}) 0%, transparent 70%)`,
              opacity: progress / 100
            }}
          ></div>
        </div>
        
        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-white/90 text-xl font-['Arial',sans-serif] tracking-wide font-semibold">
            Initializing Battery Lifecycle
          </p>
          <p className="text-[#ff7700] text-lg font-['Arial',sans-serif] font-mono">
            {progress}%
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-80 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-to-r from-[#ff7700] via-[#ff9944] to-[#ff7700] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          >
          </div>
        </div>

        {/* Status message */}
        <p className="text-white/50 text-sm font-['Arial',sans-serif] mt-2 animate-pulse">
          {progress < 30 && 'Loading diagnostic systems...'}
          {progress >= 30 && progress < 60 && 'Preparing visualization...'}
          {progress >= 60 && progress < 90 && 'Optimizing performance...'}
          {progress >= 90 && 'Almost ready...'}
        </p>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}
