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

  async load(): Promise<void> {
    if (this.totalCount === 0) {
      this.updateProgress()
      return Promise.resolve()
    }
    this.updateProgress()

    for (let i = 0; i < this.assets.length; i++) {
      const asset = this.assets[i]
      const isPriorityVideo = asset.includes('mainbattery.mp4')
      
      try {
        await this.loadAsset(asset)
      } catch {
        this.loadedCount++
        this.updateProgress()
      }
      
      if (i < this.assets.length - 1 && !isPriorityVideo) {
        await new Promise(resolve => setTimeout(resolve, 60))
      }
    }
  }
  private loadAsset(url: string): Promise<void> {
    return new Promise((resolve) => {
      const extension = url.split('.').pop()?.toLowerCase()

      if (['mp4', 'webm', 'mov'].includes(extension || '')) {
        const video = document.createElement('video')
        video.preload = 'auto'
        
        const onLoaded = () => {
          this.loadedCount++
          this.updateProgress()
          cleanup()
          resolve()
        }

        const onError = () => {
          this.loadedCount++
          this.updateProgress()
          cleanup()
          resolve() 
        }

        const cleanup = () => {
          video.removeEventListener('canplaythrough', onLoaded)
          video.removeEventListener('loadeddata', onLoaded)
          video.removeEventListener('error', onError)
          // Clean up video element to prevent memory leaks
          video.src = ''
          video.load()
        }

        video.addEventListener('canplaythrough', onLoaded, { once: true })
        video.addEventListener('loadeddata', onLoaded, { once: true })
        video.addEventListener('error', onError, { once: true })
        video.src = url
        if (url.includes('mainbattery.mp4')) {
          video.load()
        }
      } else {
        const img = new Image()
        
        const onLoaded = () => {
          this.loadedCount++
          this.updateProgress()
          cleanup()
          resolve()
        }

        const onError = () => {
          this.loadedCount++
          this.updateProgress()
          cleanup()
          resolve() 
        }

        const cleanup = () => {
          img.removeEventListener('load', onLoaded)
          img.removeEventListener('error', onError)
          // Clean up image element to prevent memory leaks
          img.src = ''
        }

        img.addEventListener('load', onLoaded)
        img.addEventListener('error', onError)
        img.src = url
      }
    })
  }
  private updateProgress(): void {
    const percentage = this.totalCount > 0 
      ? Math.round((this.loadedCount / this.totalCount) * 100)
      : 100

    const progress: AssetLoadProgress = {
      loaded: this.loadedCount,
      total: this.totalCount,
      percentage,
    }

    if (this.onProgress) {
      this.onProgress(progress)
    }
  }
}
export function getCriticalAssets(): string[] {
  return [
    '/mainbattery.mp4',
    '/logo.png',
    '/synovra.png',
    '/car battery.png',
    '/newclassbattery.png',
    '/lifecycle/frames/frame_0001.webp',
    '/lifecycle/frames/frame_0002.webp',
    '/lifecycle/frames/frame_0003.webp',
    '/Battery-At-Anystage/new.png',
    '/Battery-At-Anystage/used.png',
    '/Battery-At-Anystage/scrap.png',
    '/benefit/icon1.svg',
    '/benefit/icon2.svg',
    '/benefit/icon3.svg',
    '/benefit/icon4.svg',
  ]
}