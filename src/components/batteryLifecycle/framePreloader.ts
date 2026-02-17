import { preloadImage, frameCache } from './frameCache'
import { SCENE_FRAME_COUNTS } from './sceneConfig'

export interface PreloadProgress {
  loaded: number
  total: number
  percentage: number
}

export type PreloadProgressCallback = (progress: PreloadProgress) => void

export const preloadCriticalFrames = async (
  onProgress?: PreloadProgressCallback
): Promise<void> => {
  const startTime = Date.now()

  try {
    const scene1Frames = Array.from({ length: 60 }, (_, i) => i + 1)
    const scene2Frames = Array.from({ length: 60 }, (_, i) => i + 1)
    const scene3Frames = Array.from({ length: 36 }, (_, i) => (i * 5) + 1)
    const scene4Frames = Array.from({ length: 16 }, (_, i) => (i * 10) + 1)
    
    const criticalFrames = [
      ...scene1Frames.map(f => `/lifecycle/frames/scene-1/frame_${String(f).padStart(4, '0')}.webp`),
      ...scene2Frames.map(f => `/lifecycle/frames/scene-2/frame_${String(f).padStart(4, '0')}.webp`),
      ...scene3Frames.map(f => `/lifecycle/frames/scene-3/frame_${String(f).padStart(4, '0')}.webp`),
      ...scene4Frames.map(f => `/lifecycle/frames/scene-4/frame_${String(f).padStart(4, '0')}.webp`)
    ]

    let loaded = 0
    const total = criticalFrames.length

    const batchSize = 8
    for (let i = 0; i < criticalFrames.length; i += batchSize) {
      const batch = criticalFrames.slice(i, i + batchSize)
      await Promise.all(
        batch.map(src => 
          preloadImage(src).then(() => {
            loaded++
            if (onProgress) {
              onProgress({
                loaded,
                total,
                percentage: Math.round((loaded / total) * 100)
              })
            }
          })
        )
      )
    }
    const elapsed = Date.now() - startTime
    const minLoadTime = 2000
    const remainingTime = Math.max(0, minLoadTime - elapsed)
    
    await new Promise(resolve => setTimeout(resolve, remainingTime + 300))
  } catch {
    const elapsed = Date.now() - startTime
    const minLoadTime = 2000
    const remainingTime = Math.max(0, minLoadTime - elapsed)
    await new Promise(resolve => setTimeout(resolve, remainingTime))
  }
}

export const preloadRemainingFrames = async (): Promise<void> => {
  const scene7Frames: string[] = []
  for (let i = 1; i <= SCENE_FRAME_COUNTS[6]; i += 4) {
    scene7Frames.push(`/lifecycle/frames/scene-7/frame_${String(i).padStart(4, '0')}.webp`)
  }
  
  const batchSize = 4
  for (let i = 0; i < scene7Frames.length; i += batchSize) {
    const batch = scene7Frames.slice(i, i + batchSize)
    await Promise.all(batch.map(src => preloadImage(src).catch(() => {})))
    await new Promise(resolve => setTimeout(resolve, 50))
  }
  const scenes = [
    { sceneIndex: 2, count: SCENE_FRAME_COUNTS[2], stride: 1 }, 
    { sceneIndex: 3, count: SCENE_FRAME_COUNTS[3], stride: 1 }, 
    { sceneIndex: 4, count: SCENE_FRAME_COUNTS[4], stride: 1 },
    { sceneIndex: 5, count: SCENE_FRAME_COUNTS[5], stride: 2 }, 
  ]

  for (const scene of scenes) {
    const frames: string[] = []
    for (let i = 1; i <= scene.count; i += scene.stride) {
      frames.push(`/lifecycle/frames/scene-${scene.sceneIndex + 1}/frame_${String(i).padStart(4, '0')}.webp`)
    }
    for (let i = 0; i < frames.length; i += batchSize) {
      const batch = frames.slice(i, i + batchSize)
      await Promise.all(batch.map(src => preloadImage(src).catch(() => {})))
      await new Promise(resolve => setTimeout(resolve, 60))
    }
  }
}

export const preloadNextFrames = (
  currentScene: number,
  currentFrame: number,
  preloadCount: number = 35
): void => {
  const frameCount = SCENE_FRAME_COUNTS[currentScene]
  
  for (let i = 1; i <= preloadCount; i++) {
    const nextFrame = currentFrame + i
    if (nextFrame <= frameCount) {
      const src = `/lifecycle/frames/scene-${currentScene + 1}/frame_${String(nextFrame).padStart(4, '0')}.webp`
      if (!frameCache.has(src)) {
        const img = new Image()
        img.decoding = 'async'
        img.src = src
        img.onload = () => frameCache.set(src, img)
      }
    } else if (currentScene < SCENE_FRAME_COUNTS.length - 1) {
      const nextSceneIndex = currentScene + 1
      const nextSceneFrame = nextFrame - frameCount
      if (nextSceneFrame <= SCENE_FRAME_COUNTS[nextSceneIndex]) {
        const src = `/lifecycle/frames/scene-${nextSceneIndex + 1}/frame_${String(nextSceneFrame).padStart(4, '0')}.webp`
        if (!frameCache.has(src)) {
          const img = new Image()
          img.decoding = 'async'
          img.src = src
          img.onload = () => frameCache.set(src, img)
        }
      }
    }
  }
}
