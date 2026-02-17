import { priorityPreloader, type PreloadTask } from './priorityPreloader'

export interface PreloadConfig {
  element: HTMLElement
  assets: string[]
  assetType: 'image' | 'video' | 'frame'
  priority: 'high' | 'medium' | 'low'
  threshold?: number // Distance in pixels before viewport
  rootMargin?: string // Intersection Observer rootMargin
}

class IntersectionPreloader {
  private observer: IntersectionObserver | null = null
  private configs: Map<HTMLElement, PreloadConfig> = new Map()
  private preloadedSections: Set<HTMLElement> = new Set()

  constructor() {
    this.setupObserver()
  }

  private setupObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const config = this.configs.get(entry.target as HTMLElement)
            if (config && !this.preloadedSections.has(entry.target as HTMLElement)) {
              this.preloadSection(config)
              this.preloadedSections.add(entry.target as HTMLElement)
            }
          }
        })
      },
      {
        root: null,
        rootMargin: '500px', // Start preloading 500px before viewport
        threshold: 0.01
      }
    )
  }

  public register(config: PreloadConfig): void {
    if (!this.observer) {
      // Fallback: preload immediately if IntersectionObserver not available
      this.preloadSection(config)
      return
    }

    this.configs.set(config.element, config)
    this.observer.observe(config.element)
  }

  public registerMultiple(configs: PreloadConfig[]): void {
    configs.forEach(config => this.register(config))
  }

  private preloadSection(config: PreloadConfig): void {
    const tasks: PreloadTask[] = config.assets.map(url => ({
      url,
      type: config.assetType,
      priority: config.priority
    }))

    priorityPreloader.addTasks(tasks)
  }

  public unregister(element: HTMLElement): void {
    if (this.observer) {
      this.observer.unobserve(element)
    }
    this.configs.delete(element)
    this.preloadedSections.delete(element)
  }

  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect()
    }
    this.configs.clear()
    this.preloadedSections.clear()
  }
}

// Singleton instance
export const intersectionPreloader = new IntersectionPreloader()