import { frameCache } from './frameCache'
import { preloadImage } from './frameCache'

export interface CanvasFrameRef {
  scene: number
  frame: number
}

const contextCache = new WeakMap<HTMLCanvasElement, CanvasRenderingContext2D | null>()
const loadingFrames = new Set<string>()

export const getCanvasContext = (canvas: HTMLCanvasElement): CanvasRenderingContext2D | null => {
  if (!canvas) return null
  
  let ctx = contextCache.get(canvas)
  if (ctx === undefined) {
    ctx = canvas.getContext('2d', { 
      alpha: false, 
      desynchronized: true 
    })
    contextCache.set(canvas, ctx)
  }
  return ctx
}

export const drawFrame = (
  canvas: HTMLCanvasElement | null,
  sceneIndex: number,
  frameNumber: number,
  currentCanvasFrameRef: { current: CanvasFrameRef }
): boolean => {
  if (currentCanvasFrameRef.current.scene === sceneIndex && 
      currentCanvasFrameRef.current.frame === frameNumber) {
    return true
  }

  if (!canvas) return false

  const frameSrc = `/lifecycle/frames/scene-${sceneIndex + 1}/frame_${String(frameNumber).padStart(4, '0')}.webp`
  const cachedImage = frameCache.get(frameSrc)

  if (cachedImage && cachedImage.complete && cachedImage.naturalWidth > 0) {
    const ctx = getCanvasContext(canvas)
    
    if (ctx) {
      ctx.globalAlpha = 1.0
      ctx.drawImage(cachedImage, 0, 0, canvas.width, canvas.height)
      currentCanvasFrameRef.current = { scene: sceneIndex, frame: frameNumber }
      
      if (canvas.style.opacity !== '1') {
        canvas.style.opacity = '1'
      }
      
      loadingFrames.delete(frameSrc)
      return true
    }
  } else {
    if (!loadingFrames.has(frameSrc) && !cachedImage) {
      loadingFrames.add(frameSrc)
      
      preloadImage(frameSrc).then(() => {
        loadingFrames.delete(frameSrc)
        
        const loadedImage = frameCache.get(frameSrc)
        if (loadedImage && loadedImage.complete && loadedImage.naturalWidth > 0) {
          const ctx = getCanvasContext(canvas)
          
          if (ctx) {
            const targetFrame = currentCanvasFrameRef.current
            const isStillTarget = targetFrame.scene === sceneIndex && targetFrame.frame === frameNumber
            
            const frameDiff = Math.abs(
              (targetFrame.scene * 1000 + targetFrame.frame) - 
              (sceneIndex * 1000 + frameNumber)
            )
            const isNearby = frameDiff <= 5
            
            if (isStillTarget || isNearby) {
              ctx.globalAlpha = 1.0
              ctx.drawImage(loadedImage, 0, 0, canvas.width, canvas.height)
              currentCanvasFrameRef.current = { scene: sceneIndex, frame: frameNumber }
              
              if (canvas.style.opacity !== '1') {
                canvas.style.opacity = '1'
              }
            }
          }
        }
      }).catch(() => {
        loadingFrames.delete(frameSrc)
      })
    }
    
    return false
  }
  
  return false
}