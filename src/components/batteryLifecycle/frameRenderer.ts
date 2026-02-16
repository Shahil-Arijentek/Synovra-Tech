import { frameCache } from './frameCache'

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
  // Skip if same frame already on canvas
  if (currentCanvasFrameRef.current.scene === sceneIndex && 
      currentCanvasFrameRef.current.frame === frameNumber) {
    return
  }

  if (!canvas) return

  const frameSrc = `/lifecycle/frames/scene-${sceneIndex + 1}/frame_${String(frameNumber).padStart(4, '0')}.webp`
  const cachedImage = frameCache.get(frameSrc)

  // CRITICAL: Only draw if image is cached and ready
  // This ensures old frame stays visible until new frame is ready
  if (cachedImage && cachedImage.complete && cachedImage.naturalWidth > 0) {
    const ctx = canvas.getContext('2d', { 
      alpha: false, // No transparency = faster
      desynchronized: true // Better performance
    })
    
    if (ctx) {
      // Ensure canvas is fully opaque
      ctx.globalAlpha = 1.0
      // Draw cached image directly to canvas - no blink!
      ctx.drawImage(cachedImage, 0, 0, canvas.width, canvas.height)
      currentCanvasFrameRef.current = { scene: sceneIndex, frame: frameNumber }
      
      // Force canvas visibility
      if (canvas.style.opacity !== '1') {
        canvas.style.opacity = '1'
      }
    }
  }
  // If not cached: old frame remains visible (no black flash)
}
