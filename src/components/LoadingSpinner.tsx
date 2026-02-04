import { useState, useEffect } from 'react'

interface LoadingSpinnerProps {
  progress?: number
}

export default function LoadingSpinner({ progress: externalProgress }: LoadingSpinnerProps = {}) {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    // Smooth transition to real progress with faster response
    const targetProgress = externalProgress ?? 0
    
    const animate = () => {
      setDisplayProgress((prev) => {
        const diff = targetProgress - prev
        
        // Smooth easing towards target (faster response)
        if (Math.abs(diff) < 0.5) {
          return targetProgress
        }
        
        return prev + diff * 0.15 // Faster smooth easing
      })
    }

    const interval = setInterval(animate, 16) // 60fps

    return () => clearInterval(interval)
  }, [externalProgress])

  const progress = displayProgress

  // Calculate circle progress
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  // Dynamic loading text based on progress
  const getLoadingText = () => {
    if (progress < 20) return 'Initializing'
    if (progress < 50) return 'Loading Assets'
    if (progress < 80) return 'Processing'
    if (progress < 100) return 'Almost Ready'
    return 'Complete'
  }

  return (
    <div className="flex items-center justify-center w-full h-full bg-black">
      <div className="relative flex flex-col items-center gap-6">
        {/* Compact circular progress */}
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background track */}
            <circle
              cx="50"
              cy="50" 
              r={radius}
              stroke="rgba(255, 107, 26, 0.08)"
              strokeWidth="3"
              fill="none"
            />
            
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="url(#progressGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-200 ease-out"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(255, 107, 26, 0.6))'
              }}
            />
            
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b1a" />
                <stop offset="100%" stopColor="#ff8c42" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold text-white font-mono tracking-tight">
                  {Math.floor(progress)}
                </span>
                <span className="text-lg font-semibold text-[#ff6b1a] ml-0.5">%</span>
              </div>
            </div>
          </div>

          {/* Subtle rotating accent */}
          <div 
            className="absolute inset-0 rounded-full opacity-20 pointer-events-none"
            style={{
              background: `conic-gradient(from ${progress * 3.6}deg, transparent, #ff6b1a 10deg, transparent 20deg)`,
              filter: 'blur(4px)',
              animation: 'spin 4s linear infinite'
            }}
          />
        </div>

        {/* Compact progress bar */}
        <div className="w-56 space-y-2">
          <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#ff6b1a] to-[#ff8c42] rounded-full transition-all duration-200 ease-out"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 8px rgba(255, 107, 26, 0.5)'
              }}
            />
          </div>
          
          {/* Loading text */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-white/60 text-xs font-medium tracking-wider uppercase transition-all duration-300">
              {getLoadingText()}
            </span>
            {progress < 100 && (
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full bg-[#ff6b1a]"
                    style={{
                      animation: `pulse 1.4s ease-in-out infinite`,
                      animationDelay: `${i * 0.15}s`,
                      opacity: 0.4
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Minimalist battery indicator */}
        <div className="flex items-center gap-2">
          <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
            {/* Battery outline */}
            <rect 
              x="1" 
              y="2" 
              width="26" 
              height="12" 
              rx="1.5" 
              stroke="rgba(255, 107, 26, 0.4)" 
              strokeWidth="1.5" 
              fill="none"
            />
            {/* Battery tip */}
            <rect x="27" y="5" width="3" height="6" rx="0.5" fill="rgba(255, 107, 26, 0.4)"/>
            
            {/* Battery fill */}
            <rect 
              x="3" 
              y="4" 
              width={Math.max(0, (progress / 100) * 22)} 
              height="8" 
              rx="0.5" 
              fill="url(#batteryFill)"
              className="transition-all duration-200"
            />
            
            <defs>
              <linearGradient id="batteryFill" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff6b1a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ff8c42" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
          
          <span className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
            Synovra
          </span>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% { 
            opacity: 1;
            transform: scale(1.3);
          }
        }
      `}</style>
    </div>
  )
}
