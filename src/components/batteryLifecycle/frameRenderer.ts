import { frameCache } from './frameCache'
import { preloadImage } from './frameCache'

export interface CanvasFrameRef {
  scene: number
  frame: number
}

export const drawFrame = (
  canvas: HTMLCanvasElement | null,
  sceneIndex: number,
  frameNumber: number,
  currentCanvasFrameRef: { current: CanvasFrameRef }
): void => {
  if (currentCanvasFrameRef.current.scene === sceneIndex && 
      currentCanvasFrameRef.current.frame === frameNumber) {
    return
  }

  if (!canvas) return

  const frameSrc = `/lifecycle/frames/scene-${sceneIndex + 1}/frame_${String(frameNumber).padStart(4, '0')}.webp`
  const cachedImage = frameCache.get(frameSrc)

  if (cachedImage && cachedImage.complete && cachedImage.naturalWidth > 0) {
    const ctx = canvas.getContext('2d', { 
      alpha: false, 
      desynchronized: true 
    })
    
    if (ctx) {
      ctx.globalAlpha = 1.0
      ctx.drawImage(cachedImage, 0, 0, canvas.width, canvas.height)
      currentCanvasFrameRef.current = { scene: sceneIndex, frame: frameNumber }
      
      if (canvas.style.opacity !== '1') {
        canvas.style.opacity = '1'
      }
    }
  } else {
    // Frame not cached - preload it immediately and wait for it
    if (!cachedImage) {
      preloadImage(frameSrc).then(() => {
        // Retry drawing after frame is loaded
        const loadedImage = frameCache.get(frameSrc)
        if (loadedImage && loadedImage.complete && loadedImage.naturalWidth > 0) {
          const ctx = canvas.getContext('2d', { 
            alpha: false, 
            desynchronized: true 
          })
          
          if (ctx) {
            ctx.globalAlpha = 1.0
            ctx.drawImage(loadedImage, 0, 0, canvas.width, canvas.height)
            currentCanvasFrameRef.current = { scene: sceneIndex, frame: frameNumber }
            
            if (canvas.style.opacity !== '1') {
              canvas.style.opacity = '1'
            }
          }
        }
      }).catch(() => {
        // Silently fail - frame will be retried on next scroll update
      })
    }
  }
}