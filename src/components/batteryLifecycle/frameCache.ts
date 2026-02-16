// Image cache to prevent black flicker
export const frameCache = new Map<string, HTMLImageElement>()

// Preload helper function with caching
export const preloadImage = (src: string): Promise<void> => {
  // Return immediately if already cached
  if (frameCache.has(src)) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      frameCache.set(src, img)
      resolve()
    }
    img.onerror = reject
    img.src = src
  })
}
