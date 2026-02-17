export type ConnectionType = 'slow-2g' | '2g' | '3g' | '4g' | 'wifi' | 'unknown'

export interface NetworkInfo {
  effectiveType: ConnectionType
  downlink: number // Mbps
  rtt: number // ms
  saveData: boolean
  isSlowConnection: boolean
  recommendedBatchSize: number
  recommendedPreloadCount: number
}

class BandwidthDetector {
  private networkInfo: NetworkInfo | null = null
  private listeners: Set<(info: NetworkInfo) => void> = new Set()

  constructor() {
    this.detect()
    this.setupListeners()
  }

  private detect(): void {
    const nav = navigator as any
    
    // Get Network Information API if available
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection || null
    
    if (connection) {
      const effectiveType = this.mapEffectiveType(connection.effectiveType)
      const downlink = connection.downlink || 10 // Default to 10 Mbps if unknown
      const rtt = connection.rtt || 50 // Default to 50ms if unknown
      const saveData = connection.saveData || false
      
      // Determine if slow connection
      const isSlowConnection = 
        effectiveType === 'slow-2g' || 
        effectiveType === '2g' || 
        (effectiveType as string) === '3g' ||
        downlink < 1.5 ||
        saveData

      // Calculate recommended batch size based on connection
      let recommendedBatchSize = 8
      let recommendedPreloadCount = 35
      
      if (isSlowConnection) {
        recommendedBatchSize = 3
        recommendedPreloadCount = 10
      } else if ((effectiveType as string) === '3g' || downlink < 5) {
        recommendedBatchSize = 5
        recommendedPreloadCount = 20
      } else if (effectiveType === '4g' || downlink >= 10) {
        recommendedBatchSize = 10
        recommendedPreloadCount = 50
      } else {
        recommendedBatchSize = 15
        recommendedPreloadCount = 100
      }

      this.networkInfo = {
        effectiveType,
        downlink,
        rtt,
        saveData,
        isSlowConnection,
        recommendedBatchSize,
        recommendedPreloadCount
      }
    } else {
      // Fallback: Assume good connection if API not available
      this.networkInfo = {
        effectiveType: 'unknown',
        downlink: 10,
        rtt: 50,
        saveData: false,
        isSlowConnection: false,
        recommendedBatchSize: 8,
        recommendedPreloadCount: 35
      }
    }
  }

  private mapEffectiveType(effectiveType: string | undefined): ConnectionType {
    if (!effectiveType) return 'unknown'
    
    const type = effectiveType.toLowerCase()
    if (type.includes('slow-2g')) return 'slow-2g'
    if (type === '2g') return '2g'
    if (type === '3g') return '3g'
    if (type === '4g') return '4g'
    if (type.includes('wifi') || type === 'ethernet') return 'wifi'
    return 'unknown'
  }

  private setupListeners(): void {
    const nav = navigator as any
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection
    
    if (connection) {
      connection.addEventListener('change', () => {
        this.detect()
        this.notifyListeners()
      })
    }
  }

  private notifyListeners(): void {
    if (this.networkInfo) {
      this.listeners.forEach(listener => listener(this.networkInfo!))
    }
  }

  public getNetworkInfo(): NetworkInfo {
    if (!this.networkInfo) {
      this.detect()
    }
    return this.networkInfo!
  }

  public subscribe(listener: (info: NetworkInfo) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  public isSlowConnection(): boolean {
    return this.getNetworkInfo().isSlowConnection
  }

  public getRecommendedBatchSize(): number {
    return this.getNetworkInfo().recommendedBatchSize
  }

  public getRecommendedPreloadCount(): number {
    return this.getNetworkInfo().recommendedPreloadCount
  }
}

// Singleton instance
export const bandwidthDetector = new BandwidthDetector()
