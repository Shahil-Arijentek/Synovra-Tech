// LRU Cache implementation for frame management
const MAX_CACHE_SIZE = 300
const frameCache = new Map<string, HTMLImageElement>()
const accessOrder = new Map<string, number>()

/**
 * Evicts the least recently used frame from cache if at capacity
 */
const evictOldestFrame = (): void => {
  if (frameCache.size < MAX_CACHE_SIZE) {
    return
  }

  // Find the oldest accessed frame
  const entries = Array.from(accessOrder.entries())
  if (entries.length === 0) {
    return
  }

  const oldest = entries.reduce((oldest, current) => {
    return current[1] < oldest[1] ? current : oldest
  })

  // Remove from both caches
  frameCache.delete(oldest[0])
  accessOrder.delete(oldest[0])
}

/**
 * Updates the access time for a frame (marks it as recently used)
 */
const updateAccessTime = (src: string): void => {
  accessOrder.set(src, Date.now())
}

export const getFrameCache = (): Map<string, HTMLImageElement> => {
  return frameCache
}

export const preloadImage = (src: string): Promise<void> => {
  // If already cached, update access time and return
  if (frameCache.has(src)) {
    updateAccessTime(src)
    return Promise.resolve()
  }

  // Evict oldest if cache is full
  evictOldestFrame()

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      frameCache.set(src, img)
      updateAccessTime(src)
      resolve()
    }
    img.onerror = reject
    img.src = src
  })
}

/**
 * Clears the frame cache (useful for memory management)
 */
export const clearFrameCache = (): void => {
  frameCache.clear()
  accessOrder.clear()
}

/**
 * Gets current cache size
 */
export const getCacheSize = (): number => {
  return frameCache.size
}
