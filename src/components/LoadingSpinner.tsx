import { useState, useEffect } from 'react'

interface LoadingSpinnerProps {
  progress?: number
}

export default function LoadingSpinner({ progress: externalProgress }: LoadingSpinnerProps = {}) {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    const targetProgress = externalProgress ?? 0
    
    const animate = () => {
      setDisplayProgress((prev) => {
        const diff = targetProgress - prev
        
        if (Math.abs(diff) < 0.5) {
          return targetProgress
        }
        
        return prev + diff * 0.15
      })
    }

    const interval = setInterval(animate, 16)

    return () => clearInterval(interval)
  }, [externalProgress])

  const progress = displayProgress

  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

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

        {/* Synovra text */}
        <span className="text-[0.625rem] text-white/30 font-mono uppercase tracking-wider">
          Synovra
        </span>
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
