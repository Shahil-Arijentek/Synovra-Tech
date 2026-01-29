import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import LoadingScreen from '../components/LoadingScreen'

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  showLoading: (message?: string) => void
  hideLoading: () => void
  loadingMessage: string
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

interface LoadingProviderProps {
  children: ReactNode
  initialLoadingTime?: number
}

export function LoadingProvider({ children, initialLoadingTime = 1500 }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('Loading Synovra...')

  // Auto-hide loading after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, initialLoadingTime)

    return () => clearTimeout(timer)
  }, [initialLoadingTime])

  const showLoading = (message = 'Loading...') => {
    setLoadingMessage(message)
    setIsLoading(true)
  }

  const hideLoading = () => {
    setIsLoading(false)
  }

  const value = {
    isLoading,
    setIsLoading,
    showLoading,
    hideLoading,
    loadingMessage
  }

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && <LoadingScreen message={loadingMessage} />}
      {children}
    </LoadingContext.Provider>
  )
}

// Custom hook to use loading context
export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}
