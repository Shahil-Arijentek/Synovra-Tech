import { priorityPreloader, type PreloadTask } from './priorityPreloader'
import { bandwidthDetector } from './bandwidthDetector'
import { getAllCriticalAssets, getAllHighPriorityAssets } from './assetManifest'

class GlobalPreloader {
  private initialized = false

  public initialize(): void {
    if (this.initialized) return
    this.initialized = true

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.preloadCriticalAssets())
    } else {
      this.preloadCriticalAssets()
    }

    // Preload high priority assets after a short delay
    setTimeout(() => {
      this.preloadHighPriorityAssets()
    }, 500)
  }

  private preloadCriticalAssets(): void {
    const criticalAssets = getAllCriticalAssets()
    const heroVideo = '/mainbattery.mp4'
    const heroVideoTask: PreloadTask = {
      url: heroVideo,
      type: 'video',
      priority: 'critical',
      onLoad: () => {
        // Ensure video element is ready if it exists
        const video = document.querySelector('video[src="/mainbattery.mp4"]') as HTMLVideoElement
        if (video) {
          video.load() // Force reload to ensure it's ready
        }
      }
    }
    
    // Add hero video first, then other critical assets
    priorityPreloader.addTask(heroVideoTask)
    
    const otherTasks: PreloadTask[] = criticalAssets
      .filter(url => url !== heroVideo)
      .map((url) => {
        const extension = url.split('.').pop()?.toLowerCase() || ''
        const isVideo = ['mp4', 'webm', 'mov'].includes(extension)
        
        return {
          url,
          type: isVideo ? 'video' : 'image',
          priority: 'critical'
        }
      })

    priorityPreloader.addTasks(otherTasks)
  }

  private preloadHighPriorityAssets(): void {
    const highPriorityAssets = getAllHighPriorityAssets()
    const networkInfo = bandwidthDetector.getNetworkInfo()
    
    // On slow connections, reduce high priority preloading
    if (networkInfo.isSlowConnection) {
      // Only preload essential high priority assets
      const essentialAssets = highPriorityAssets.slice(0, 5)
      const tasks: PreloadTask[] = essentialAssets.map(url => {
        const extension = url.split('.').pop()?.toLowerCase() || ''
        const isVideo = ['mp4', 'webm', 'mov'].includes(extension)
        
        return {
          url,
          type: isVideo ? 'video' : 'image',
          priority: 'high'
        }
      })
      priorityPreloader.addTasks(tasks)
    } else {
      const tasks: PreloadTask[] = highPriorityAssets.map(url => {
        const extension = url.split('.').pop()?.toLowerCase() || ''
        const isVideo = ['mp4', 'webm', 'mov'].includes(extension)
        
        return {
          url,
          type: isVideo ? 'video' : 'image',
          priority: 'high'
        }
      })
      priorityPreloader.addTasks(tasks)
    }
  }
}

// Singleton instance
export const globalPreloader = new GlobalPreloader()
