import { preloadImage, frameCache } from './frameCache'
import { SCENE_FRAME_COUNTS } from './sceneConfig'
import { bandwidthDetector } from '../../utils/bandwidthDetector'
import { priorityPreloader, type PreloadTask } from '../../utils/priorityPreloader'

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
  const networkInfo = bandwidthDetector.getNetworkInfo()
  const MAX_WAIT_TIME = 8000

  try {
    const scene1Frames = Array.from({ length: 60 }, (_, i) => i + 1)
    const scene2Frames = Array.from({ length: 60 }, (_, i) => i + 1)
    const scene3Frames = networkInfo.isSlowConnection 
      ? Array.from({ length: 15 }, (_, i) => (i * 4) + 1) 
      : Array.from({ length: 30 }, (_, i) => (i * 3) + 1) 
    const scene4Frames = networkInfo.isSlowConnection
      ? Array.from({ length: 8 }, (_, i) => (i * 15) + 1) 
      : Array.from({ length: 12 }, (_, i) => (i * 10) + 1)
    
    const criticalFrames = [
      ...scene1Frames.map(f => `/lifecycle/frames/scene-1/frame_${String(f).padStart(4, '0')}.webp`),
      ...scene2Frames.map(f => `/lifecycle/frames/scene-2/frame_${String(f).padStart(4, '0')}.webp`),
      ...scene3Frames.map(f => `/lifecycle/frames/scene-3/frame_${String(f).padStart(4, '0')}.webp`),
      ...scene4Frames.map(f => `/lifecycle/frames/scene-4/frame_${String(f).padStart(4, '0')}.webp`)
    ]

    let loaded = 0
    const total = criticalFrames.length
    const tasks: PreloadTask[] = criticalFrames.map((src, index) => ({
      url: src,
      type: 'frame',
      priority: index < 120 ? 'critical' : 'high', 
      onLoad: () => {
        loaded++
        if (onProgress) {
          onProgress({
            loaded,
            total,
            percentage: Math.round((loaded / total) * 100)
          })
        }
      }
    }))
    priorityPreloader.addTasks(tasks)
    const criticalFrameUrls = criticalFrames.slice(0, 120)
    const loadPromise = Promise.all(
      criticalFrameUrls.map(src => 
        preloadImage(src).catch(() => {})
      )
    )
    await Promise.race([
      loadPromise,
      new Promise(resolve => setTimeout(resolve, MAX_WAIT_TIME))
    ])
    const elapsed = Date.now() - startTime
    const minLoadTime = networkInfo.isSlowConnection ? 1000 : 1500
    const remainingTime = Math.max(0, minLoadTime - elapsed)
    
    if (remainingTime > 0) {
      await new Promise(resolve => setTimeout(resolve, remainingTime))
    }
  } catch {
    const elapsed = Date.now() - startTime
    const minLoadTime = networkInfo.isSlowConnection ? 1000 : 1500
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
  preloadCount?: number
): void => {
  const networkInfo = bandwidthDetector.getNetworkInfo()
  const baseCount = networkInfo.isSlowConnection ? 30 : 60
  const count = preloadCount || baseCount
  const frameCount = SCENE_FRAME_COUNTS[currentScene]
  
  const tasks: PreloadTask[] = []
  for (let i = 1; i <= count; i++) {
    const nextFrame = currentFrame + i
    if (nextFrame <= frameCount) {
      const src = `/lifecycle/frames/scene-${currentScene + 1}/frame_${String(nextFrame).padStart(4, '0')}.webp`
      if (!frameCache.has(src) && !priorityPreloader.isLoaded(src)) {
        tasks.push({
          url: src,
          type: 'frame',
          priority: i <= 20 ? 'high' : 'medium', 
          onLoad: () => {
          }
        })
      }
    } else if (currentScene < SCENE_FRAME_COUNTS.length - 1) {
      const nextSceneIndex = currentScene + 1
      const nextSceneFrame = nextFrame - frameCount
      if (nextSceneFrame <= Math.min(40, SCENE_FRAME_COUNTS[nextSceneIndex])) {
        const src = `/lifecycle/frames/scene-${nextSceneIndex + 1}/frame_${String(nextSceneFrame).padStart(4, '0')}.webp`
        if (!frameCache.has(src) && !priorityPreloader.isLoaded(src)) {
          tasks.push({
            url: src,
            type: 'frame',
            priority: nextSceneFrame <= 20 ? 'high' : 'medium' 
          })
        }
      }
    }
  }
  for (let i = 1; i <= 10; i++) {
    const prevFrame = currentFrame - i
    if (prevFrame >= 1) {
      const src = `/lifecycle/frames/scene-${currentScene + 1}/frame_${String(prevFrame).padStart(4, '0')}.webp`
      if (!frameCache.has(src) && !priorityPreloader.isLoaded(src)) {
        tasks.push({
          url: src,
          type: 'frame',
          priority: 'medium'
        })
      }
    }
  }

  if (tasks.length > 0) {
    priorityPreloader.addTasks(tasks)
  }
}