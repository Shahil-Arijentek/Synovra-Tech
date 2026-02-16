import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div 
          className="fixed inset-0 z-[10000] min-h-screen flex items-center justify-center bg-black px-4 py-12"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-md w-full text-center">
            {/* Main card */}
            <div className="relative backdrop-blur-md bg-black/80 border border-white/10 rounded-2xl p-8 md:p-10 text-center shadow-2xl">
              {/* Icon */}
              <div className="inline-flex items-center justify-center mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#ff6b1a]/10 border-2 border-[#ff6b1a]/30 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-[#ff6b1a]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>

              {/* Heading */}
              <h2 
                className="text-2xl md:text-3xl font-bold text-white mb-6 font-['Arial',sans-serif]"
                style={{ letterSpacing: '-0.5px' }}
              >
                Something went wrong
              </h2>

              {/* Development error details - ONLY in development/localhost */}
              {import.meta.env.DEV && this.state.error && (
                <details className="mb-6 text-left bg-black/50 border border-white/5 rounded-lg overflow-hidden">
                  <summary className="text-gray-400 cursor-pointer p-3 hover:bg-white/5 transition-colors font-['Arial',sans-serif] text-sm">
                    Error details (development only)
                  </summary>
                  <pre className="text-xs text-[#ff6b1a]/80 bg-black/80 p-4 overflow-auto max-h-64 font-mono border-t border-white/5">
                    {this.state.error.toString()}
                    {this.state.error.stack && `\n\n${this.state.error.stack}`}
                  </pre>
                </details>
              )}

              {/* Refresh button */}
              <button
                onClick={() => window.location.reload()}
                className="relative px-8 py-3 bg-[#ff6b1a] text-white rounded-lg hover:bg-[#ff6b1a]/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b1a] focus:ring-offset-2 focus:ring-offset-black font-['Arial',sans-serif] font-semibold text-base shadow-lg shadow-[#ff6b1a]/20 hover:shadow-[#ff6b1a]/30 hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Refresh page"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
