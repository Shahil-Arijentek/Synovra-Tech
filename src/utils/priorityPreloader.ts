import { bandwidthDetector } from './bandwidthDetector'

export type AssetType = 'image' | 'video' | 'frame'
export type Priority = 'critical' | 'high' | 'medium' | 'low'

export interface PreloadTask {
  url: string
  type: AssetType
  priority: Priority
  onLoad?: () => void
  onError?: () => void
}

class PriorityPreloader {
  private queue: Map<Priority, PreloadTask[]> = new Map([
    ['critical', []],
    ['high', []],
    ['medium', []],
    ['low', []]
  ])
  
  private activeLoads: Set<string> = new Set()
  private loadedAssets: Set<string> = new Set()
  private isProcessing = false
  private maxConcurrent: number = 8
  private currentConcurrent = 0

  constructor() {
    const networkInfo = bandwidthDetector.getNetworkInfo()
    this.maxConcurrent = networkInfo.isSlowConnection ? 4 : 8 
  }

  public addTask(task: PreloadTask): void {
    if (this.loadedAssets.has(task.url) || this.activeLoads.has(task.url)) {
      return
    }

    const priorityQueue = this.queue.get(task.priority)
    if (priorityQueue) {
      priorityQueue.push(task)
      this.processQueue()
    }
  }

  public addTasks(tasks: PreloadTask[]): void {
    tasks.forEach(task => this.addTask(task))
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing) return
    this.isProcessing = true

    while (this.hasPendingTasks() && this.currentConcurrent < this.maxConcurrent) {
      const task = this.getNextTask()
      if (!task) break

      this.currentConcurrent++
      this.activeLoads.add(task.url)

      this.loadAsset(task)
        .then(() => {
          this.loadedAssets.add(task.url)
          task.onLoad?.()
        })
        .catch((error) => {
          if (import.meta.env.DEV) {
            console.warn(`Asset failed to load: ${task.url}`, error)
          }
          this.loadedAssets.add(task.url)
          task.onError?.()
        })
        .finally(() => {
          this.activeLoads.delete(task.url)
          this.currentConcurrent--
          this.processQueue()
        })
    }

    this.isProcessing = false
  }

  private hasPendingTasks(): boolean {
    return Array.from(this.queue.values()).some(queue => queue.length > 0)
  }

  private getNextTask(): PreloadTask | null {
    const priorities: Priority[] = ['critical', 'high', 'medium', 'low']
    
    for (const priority of priorities) {
      const queue = this.queue.get(priority)
      if (queue && queue.length > 0) {
        return queue.shift() || null
      }
    }
    
    return null
  }

  private loadAsset(task: PreloadTask): Promise<void> {
    return new Promise((resolve, reject) => {
      const extension = task.url.split('.').pop()?.toLowerCase() || ''
      
      if (['mp4', 'webm', 'mov'].includes(extension)) {
        this.loadVideo(task.url)
          .then(resolve)
          .catch(reject)
      } else {
        this.loadImage(task.url)
          .then(resolve)
          .catch(reject)
      }
    })
  }

  private loadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.decoding = 'async'
      
      const TIMEOUT = 15000 // 15 seconds timeout
      let timeoutId: ReturnType<typeof setTimeout> | null = null
      
      const cleanup = () => {
        img.onload = null
        img.onerror = null
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
      }

      const onLoad = () => {
        cleanup()
        resolve()
      }

      const onError = () => {
        cleanup()
        reject(new Error(`Failed to load image: ${url}`))
      }

      const onTimeout = () => {
        cleanup()
        this.loadedAssets.add(url)
        reject(new Error(`Timeout loading image: ${url}`))
      }

      img.onload = onLoad
      img.onerror = onError
      timeoutId = setTimeout(onTimeout, TIMEOUT)
      
      img.src = url
    })
  }

  private loadVideo(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video')
      video.preload = 'auto'
      video.muted = true
      video.playsInline = true
      
      const TIMEOUT = 20000 
      let timeoutId: ReturnType<typeof setTimeout> | null = null
      
      const cleanup = () => {
        video.removeEventListener('loadeddata', onLoaded)
        video.removeEventListener('error', onError)
        video.removeEventListener('canplaythrough', onCanPlay)
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
      }

      const onLoaded = () => {
        cleanup()
        resolve()
      }

      const onCanPlay = () => {
        cleanup()
        resolve()
      }

      const onError = () => {
        cleanup()
        reject(new Error(`Failed to load video: ${url}`))
      }

      const onTimeout = () => {
        cleanup()
        this.loadedAssets.add(url)
        reject(new Error(`Timeout loading video: ${url}`))
      }

      video.addEventListener('loadeddata', onLoaded, { once: true })
      video.addEventListener('canplaythrough', onCanPlay, { once: true })
      video.addEventListener('error', onError, { once: true })
      timeoutId = setTimeout(onTimeout, TIMEOUT)
      
      video.src = url
    })
  }

  public isLoaded(url: string): boolean {
    return this.loadedAssets.has(url)
  }

  public clear(): void {
    this.queue.forEach(queue => queue.length = 0)
    this.activeLoads.clear()
  }
}
export const priorityPreloader = new PriorityPreloader()