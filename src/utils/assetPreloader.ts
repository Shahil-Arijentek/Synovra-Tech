/**
 * Asset Preloader Utility
 * Tracks real loading progress of images, videos, and other resources
 */

export interface AssetLoadProgress {
  loaded: number
  total: number
  percentage: number
}

export type ProgressCallback = (progress: AssetLoadProgress) => void

export class AssetPreloader {
  private assets: string[] = []
  private loadedCount = 0
  private totalCount = 0
  private onProgress: ProgressCallback | null = null

  constructor(assets: string[], onProgress?: ProgressCallback) {
    this.assets = assets
    this.totalCount = assets.length
    this.onProgress = onProgress || null
  }

  /**
   * Start preloading all assets with progressive loading
   */
  async load(): Promise<void> {
    console.log('🔄 Starting to load', this.totalCount, 'assets')
    
    if (this.totalCount === 0) {
      this.updateProgress()
      return Promise.resolve()
    }

    // Start with 0% immediately
    this.updateProgress()

    // Load assets sequentially with small delays for visible progress
    for (let i = 0; i < this.assets.length; i++) {
      const asset = this.assets[i]
      
      try {
        await this.loadAsset(asset)
      } catch (error) {
        console.warn('⚠️ Failed to load asset:', asset, error)
        this.loadedCount++
        this.updateProgress()
      }
      
      // Small delay between assets for smooth visual progress
      if (i < this.assets.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 60))
      }
    }
    
    console.log('✅ All assets loaded successfully')
  }

  /**
   * Load a single asset (image or video)
   */
  private loadAsset(url: string): Promise<void> {
    return new Promise((resolve) => {
      const extension = url.split('.').pop()?.toLowerCase()

      if (['mp4', 'webm', 'mov'].includes(extension || '')) {
        // Video loading
        const video = document.createElement('video')
        video.preload = 'auto'
        
        const onLoaded = () => {
          this.loadedCount++
          console.log(`✅ Loaded video: ${url} (${this.loadedCount}/${this.totalCount})`)
          this.updateProgress()
          cleanup()
          resolve()
        }

        const onError = (e: Event) => {
          this.loadedCount++
          console.warn(`❌ Failed to load video: ${url}`, e)
          this.updateProgress()
          cleanup()
          resolve() // Resolve anyway to not block
        }

        const cleanup = () => {
          video.removeEventListener('loadeddata', onLoaded)
          video.removeEventListener('error', onError)
        }

        video.addEventListener('loadeddata', onLoaded)
        video.addEventListener('error', onError)
        video.src = url
      } else {
        // Image loading
        const img = new Image()
        
        const onLoaded = () => {
          this.loadedCount++
          console.log(`✅ Loaded image: ${url} (${this.loadedCount}/${this.totalCount})`)
          this.updateProgress()
          cleanup()
          resolve()
        }

        const onError = (e: Event | string) => {
          this.loadedCount++
          console.warn(`❌ Failed to load image: ${url}`, e)
          this.updateProgress()
          cleanup()
          resolve() // Resolve anyway to not block
        }

        const cleanup = () => {
          img.removeEventListener('load', onLoaded)
          img.removeEventListener('error', onError)
        }

        img.addEventListener('load', onLoaded)
        img.addEventListener('error', onError)
        img.src = url
      }
    })
  }

  /**
   * Update progress and notify callback
   */
  private updateProgress(): void {
    const percentage = this.totalCount > 0 
      ? Math.round((this.loadedCount / this.totalCount) * 100)
      : 100

    const progress: AssetLoadProgress = {
      loaded: this.loadedCount,
      total: this.totalCount,
      percentage,
    }

    console.log(`📊 Progress: ${percentage}% (${this.loadedCount}/${this.totalCount})`)

    if (this.onProgress) {
      this.onProgress(progress)
    }
  }
}

/**
 * Get critical assets that should be preloaded
 */
export function getCriticalAssets(): string[] {
  return [
    // Essential branding
    '/logo.png',
    '/synovra.png',
    
    // Hero assets
    '/car battery.png',
    '/newclassbattery.png',
    
    // First few lifecycle frames
    '/lifecycle/frames/frame_0001.webp',
    '/lifecycle/frames/frame_0002.webp',
    '/lifecycle/frames/frame_0003.webp',
    
    // Battery stages
    '/Battery-At-Anystage/new.png',
    '/Battery-At-Anystage/used.png',
    '/Battery-At-Anystage/scrap.png',
    
    // Benefits icons
    '/benefit/icon1.svg',
    '/benefit/icon2.svg',
    '/benefit/icon3.svg',
    '/benefit/icon4.svg',
  ]
}
