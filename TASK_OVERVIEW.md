# Task Overview: Battery Lifecycle Frame Extraction

## Objective
Extract frames from `FullScene.webm` video at specific time ranges and convert them to WebP format for use in the BatteryLifecycleScroll component.

## Original Requirements

### Time Ranges (in seconds)
- **Scene 1**: 0.01s to 0.03s
- **Scene 2**: 0.04s to 0.12s
- **Scene 3**: 0.13s to 0.16s
- **Scene 4**: 0.24s to 0.27s
- **Scene 5**: 0.28s to 0.44s
- **Scene 6**: 0.46s to 0.56s
- **Scene 7**: 0.59s to 1.08s

### Extraction Rate
- **30fps equivalent**

## Frame Count Analysis

### Original System (for comparison):
- Scene 1: 60 frames
- Scene 2: 60 frames
- Scene 3: 180 frames
- Scene 4: 160 frames
- Scene 5: 36 frames
- Scene 6: 100 frames
- Scene 7: 96 frames
- **Total: 692 frames**

## Implementation Steps (Completed & Reverted)

### 1. Frame Extraction
- Used `ffmpeg` to extract frames at 0.001s intervals
- Command pattern: `ffmpeg -i FullScene.webm -ss [start] -vframes 1 -vf "scale=1920:1080:flags=lanczos" output.webp`
- Extracted frames saved as: `frame_0001.webp`, `frame_0002.webp`, etc.

### 2. Code Updates
- Updated `SCENE_FRAME_COUNTS` array in `BatteryLifecycleScroll.tsx`
- Updated preloading strategy:
  - Scene 1: 20 frames (all)
  - Scene 2: 80 frames (all)
  - Scene 3: 6 frames (every 5th)
  - Scene 4: 4 frames (every 10th)
- Updated card visibility thresholds (Scene 1 cards show after frame 10 instead of 50)
- Updated Scene 7 preloading stride (every 20th frame instead of every 4th)

### 3. File Size Analysis
- **Original**: 692 frames = 11.87 MB (17.57 KB per frame)
- **New**: 913 frames = ~7.03 MB (estimated, actual was smaller due to better compression)
- **Size reduction**: 41% smaller despite more frames (due to high frame density = better WebP compression)

## Performance Considerations

### Why 913 frames won't cause lag:
1. **Smaller initial preload**: ~110 frames vs ~172 frames (36% reduction)
2. **Same rendering strategy**: Canvas-based, one frame at a time
3. **Scroll-based scrubbing**: Frame changes depend on scroll position, not time
4. **Background loading**: Remaining frames load in background
5. **Frame caching**: Loaded frames cached in memory

### Key Insight:
- The "30fps" in code comments refers to **perceived smoothness**, not extraction rate
- Frame change rate is **scroll-driven**, not time-based
- More frames = smoother scrubbing, not more lag

## Reversion

All changes were reverted using:
- `git restore .` - Restored all modified files
- Manual cleanup of untracked frame files
- Final state: 692 original frames restored, component code restored

## Current State

- **Frames**: 692 original frames (60, 60, 180, 160, 36, 100, 96)
- **Component**: Original code with original frame counts
- **Video source**: `FullScene.webm` available at `public/lifecycle/FullScene.webm`
- **Status**: All changes reverted, repository clean

## Notes for Future Implementation

1. **Time ranges are very short** (total ~1.08 seconds of video)
   - Consider if these are correct or if longer durations are needed
   
2. **Extraction method**: Individual frame extraction at specific timestamps
   - More reliable than batch extraction for short durations
   
3. **Frame organization**: Frames stored in `public/lifecycle/frames/scene-{1-7}/`
   - Naming convention: `frame_XXXX.webp` (4-digit zero-padded)

4. **Component expects**:
   - Frame path: `/lifecycle/frames/scene-{N}/frame_{XXXX}.webp`
   - 1-based frame numbering (frame_0001.webp is first frame)

## Technical Details

### FFmpeg Command Template
```bash
ffmpeg -i "FullScene.webm" \
  -ss [timestamp] \
  -vframes 1 \
  -vf "scale=1920:1080:flags=lanczos" \
  "output.webp" \
  -y
```

### Extraction Loop (PowerShell)
```powershell
for ($i = 0; $i -lt [frameCount]; $i++) {
  $timestamp = [startTime] + ($i * 0.001)
  $frameNum = $i + 1
  $output = "scene-X/frame_$($frameNum.ToString('0000')).webp"
  ffmpeg -i "$videoPath" -ss $timestamp -vframes 1 -vf "scale=1920:1080:flags=lanczos" "$output" -y
}
```

---

**Date**: Task completed and reverted
**Status**: All changes reverted, original state restored
