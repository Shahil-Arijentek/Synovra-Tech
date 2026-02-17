import { SCENE_FRAME_COUNTS } from './sceneConfig'

export const shouldCardBeVisible = (
  sceneIndex: number,
  currentScene: number,
  currentFrame: number
): boolean => {
  if (sceneIndex === 0) {
    return currentScene === 1 && currentFrame >= 1 && currentFrame <= 26
  }

  if (sceneIndex === 1) {
    return currentScene === 2 && currentFrame >= 1 && currentFrame <= 52
  }
  
  if (sceneIndex === 2) {
    const scene3FrameCount = SCENE_FRAME_COUNTS[2]
    return (currentScene === 2 && currentFrame >= 60 && currentFrame <= scene3FrameCount) ||
           (currentScene === 3 && currentFrame >= 1 && currentFrame <= 19)
  }
  
  if (sceneIndex === 3) {
    const scene4FrameCount = SCENE_FRAME_COUNTS[3]
    return (currentScene === 3 && currentFrame >= 81 && currentFrame <= scene4FrameCount) ||
           (currentScene === 4 && currentFrame >= 1 && currentFrame <= 31)
  }
  
  if (sceneIndex === 4) {
    return currentScene === 4 && currentFrame >= 40 && currentFrame <= 187
  }
  
  if (sceneIndex === 5) {
    const scene6FrameCount = SCENE_FRAME_COUNTS[5]
    return (currentScene === 5 && currentFrame >= 31 && currentFrame <= scene6FrameCount) ||
           (currentScene === 6 && currentFrame >= 1 && currentFrame <= 2)
  }
  
  if (sceneIndex === 6) {
    const scene7FrameCount = SCENE_FRAME_COUNTS[6]
    return currentScene === 6 && currentFrame >= 29 && currentFrame <= scene7FrameCount
  }
  
  return false
}

export const getActiveSceneIndexFromCards = (
  sceneConfig: any[],
  currentScene: number,
  currentFrame: number
): number | null => {
  for (let sceneIndex = 0; sceneIndex < sceneConfig.length; sceneIndex++) {
    if (shouldCardBeVisible(sceneIndex, currentScene, currentFrame)) {
      return sceneIndex
    }
  }
  return null
}
