export const frameCache = new Map<string, HTMLImageElement>()

export const preloadImage = (src: string): Promise<void> => {
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
