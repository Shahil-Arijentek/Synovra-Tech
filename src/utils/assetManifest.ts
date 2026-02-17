export const CRITICAL_VIDEOS = [
  '/mainbattery.mp4', // Hero video - highest priority
  '/cards/voltage.mp4', // Card animations
  '/cards/98.mp4',
  '/cards/99.mp4'
] as const

export const HIGH_PRIORITY_VIDEOS = [
  '/beforeyourecycle.webm',
  '/Comp 1_5.mp4',
  '/Comp 1_6.webm',
  '/classofpower.webm'
] as const

export const CRITICAL_IMAGES = [
  '/logo.png',
  '/synovra.png',
  '/favicon.png',
  '/car battery.png',
  '/newclassbattery.png'
] as const

export const CARD_IMAGES = [
  '/cards/barcode.png',
  '/cards/decision.png',
  '/cards/electrochemical.png',
  '/cards/internalresistance.png',
  '/cards/lead.png',
  '/cards/platecondition.png',
  '/cards/polymer.png',
  '/cards/seal.png',
  '/cards/sulphation.png',
  '/cards/voltage.mp4',
  '/cards/warranty.png',
  '/cards/SNV-text.png',
  '/cards/Subtract.png',
  '/cards/tick.png',
  '/cards/verifiedtick.png',
  '/cards/seen3.png'
] as const

export const BENEFIT_ICONS = [
  '/benefit/icon1.svg',
  '/benefit/icon2.svg',
  '/benefit/icon3.svg',
  '/benefit/icon4.svg'
] as const

export const BATTERY_STAGE_IMAGES = [
  '/Battery-At-Anystage/new.png',
  '/Battery-At-Anystage/used.png',
  '/Battery-At-Anystage/scrap.png'
] as const

export const CRITICAL_FRAMES = [
  '/lifecycle/frames/scene-1/frame_0001.webp',
  '/lifecycle/frames/scene-1/frame_0002.webp',
  '/lifecycle/frames/scene-1/frame_0003.webp',
  '/lifecycle/frames/scene-1/frame_0010.webp',
  '/lifecycle/frames/scene-1/frame_0020.webp',
  '/lifecycle/frames/scene-1/frame_0030.webp',
  '/lifecycle/frames/scene-2/frame_0001.webp',
  '/lifecycle/frames/scene-2/frame_0002.webp',
  '/lifecycle/frames/scene-2/frame_0003.webp'
] as const

export const STORYTELLING_FRAMES = [
  '/whyrevive/frames/video1/frame_0001.webp',
  '/whyrevive/frames/video1/frame_0002.webp',
  '/whyrevive/frames/video1/frame_0003.webp',
  '/whyrevive/frames/video2/frame_0001.webp',
  '/whyrevive/frames/video3/frame_0001.webp'
] as const

export function getAllCriticalAssets(): string[] {
  return [
    ...CRITICAL_VIDEOS,
    ...CRITICAL_IMAGES,
    ...CRITICAL_FRAMES,
    ...BATTERY_STAGE_IMAGES,
    ...BENEFIT_ICONS
  ]
}

export function getAllHighPriorityAssets(): string[] {
  return [
    ...HIGH_PRIORITY_VIDEOS,
    ...CARD_IMAGES,
    ...STORYTELLING_FRAMES
  ]
}
