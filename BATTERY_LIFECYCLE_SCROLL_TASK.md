# Task Description: BatteryLifecycleScroll Component

## Overview
The `BatteryLifecycleScroll` component is a scroll-driven animation that displays a battery lifecycle story across 7 scenes. It uses canvas frame rendering, GSAP/ScrollTrigger animations, and responsive card positioning.

## Component Purpose
- Displays 7 scenes of battery lifecycle frames (diagnostics → detection → logistics → recovery → verification → recycling)
- Renders frames from pre-rendered WebP images based on scroll position
- Shows diagnostic cards that animate in/out per scene
- Maintains smooth performance with frame preloading and canvas rendering

## Technical Architecture

### 1. Frame System
- 7 scenes with variable frame counts (60, 60, 180, 160, 36, 100, 96 frames)
- Canvas-based rendering to prevent flicker
- Frame cache using `Map<string, HTMLImageElement>`
- Preloading strategy:
  - Critical frames (Scenes 1-2: all frames, Scenes 3-4: sampled)
  - Background preloading for remaining frames
  - Aggressive preload of next 35 frames during scroll

### 2. Scroll Animation System
- Uses GSAP ScrollTrigger for scroll-driven scrubbing
- Scroll progress maps to frame indices
- Each scene has a scroll multiplier (4x, 6x, or 8x viewport height)
- Total scroll height: ~30 viewport heights

### 3. Card System
- 20+ card types (VoltageCard, HealthGaugeCard, etc.)
- Cards animate in from left (`translateX(-400px)`) with opacity fade
- Cards are positioned per scene using `getCardPosition()`
- Cards show/hide based on:
  - Active scene index
  - Frame threshold (Scene 1 cards appear after frame 50)
  - Scroll progress threshold (15% for most scenes, 5% for last scene)

### 4. Responsive Positioning System
Current state: Cards use responsive positioning for mobile/tablet/desktop.

#### Positioning Strategy:
- Mobile (< 640px): Uses fixed pixel values (`left-8`, `right-10`, `top-20`) and percentage-based vertical positioning (`top-[38%]`, `top-[68%]`)
- Tablet (640px - 1024px): Uses `sm:` and `md:` breakpoints with adjusted spacing
- Desktop (≥ 1024px): Uses `md:`, `lg:`, `xl:`, `2xl:` breakpoints with original desktop positioning

#### Scene-Specific Positioning:
- Scene 1: Top cards (voltage, internal-resistance), bottom cards (health-gauge, sulphation) using percentage positioning on mobile
- Scene 2: Similar layout with adjusted percentages
- Scene 3: Cards distributed across screen using percentage positioning
- Scenes 4-7: Varied layouts per scene requirements

### 5. Card Scaling (Current State)
- No scaling classes applied (user reverted scaling changes)
- Cards maintain original size on all screen sizes
- Desktop positioning preserved with `md:`, `lg:` breakpoints

## Current Task: Responsive Card Sizing for Mobile

### Objective
Implement responsive card scaling that reduces card size on mobile and tablet devices while maintaining original size on desktop/laptop.

### Requirements
1. **Mobile Devices (< 640px)**:
   - Cards should be scaled down to 55% of original size
   - Use class: `max-lg:scale-[0.55]`

2. **Tablet Devices (640px - 1024px)**:
   - Cards should be scaled down to 65% of original size
   - Use class: `sm:max-lg:scale-[0.65]`

3. **Desktop/Laptop (≥ 1024px)**:
   - Cards must remain at original size (100% scale)
   - No scaling classes should apply
   - Desktop view must be completely unchanged

### Implementation Details

#### Cards to Update:
All card components in the `renderCard` function need scaling classes:
- `voltage` card
- `internal-resistance` card
- `health-gauge` card
- `sulphation` card
- `sulphation-detected` card
- `decision` card
- `barcode` card
- `system-record` card
- `route` card
- `seal` card
- `record-lock` card
- `voltage-trend` card
- `electrochemical-correction` card
- `plate-condition` card
- `performance-restored` card
- `warranty` card
- `lead` card
- `polymer` card
- `compliance-record` card
- `recovery-certified` card
- `logged` card
- `controlled` card
- `certified` card
- `verified` card

#### Special Cases:
- **Health Gauge & Sulphation Cards**: May need slightly smaller scale (`max-lg:scale-[0.5] sm:max-lg:scale-[0.6]`) due to larger original size
- **Sulphation Detected & Decision Cards**: Already have responsive width/height classes for Scene 2, scaling should work alongside these

#### CSS Class Pattern:
```tsx
className={`absolute ${getCardPosition()} z-10 max-lg:scale-[0.55] sm:max-lg:scale-[0.65]`}
```

For larger cards:
```tsx
className={`absolute ${getCardPosition()} z-10 max-lg:scale-[0.5] sm:max-lg:scale-[0.6]`}
```

### Important Notes:
1. **Breakpoint Strategy**: Use `max-lg:` prefix to ensure scaling only applies below 1024px (mobile/tablet)
2. **Desktop Preservation**: Desktop (lg and above) will have no scale class, maintaining 100% size
3. **Transform Conflict**: The inline `transform: 'translateX(-400px) scale(1.2)'` is for GSAP animation and won't conflict with CSS scale classes
4. **GSAP Animation**: GSAP will animate the `x` transform, but CSS scale will be preserved

### Testing Checklist:
- [ ] Mobile view (< 640px): Cards are 55% size
- [ ] Tablet view (640px - 1024px): Cards are 65% size
- [ ] Desktop view (≥ 1024px): Cards are 100% size (unchanged)
- [ ] Card animations still work smoothly
- [ ] Card positioning remains correct at all sizes
- [ ] No visual glitches or layout shifts

## Recent Changes & Context

### What Was Attempted:
1. Frame size reduction: Attempted to reduce frame to 60vh on mobile/tablet (reverted)
2. Card scaling: Attempted to scale cards down on mobile/tablet using `max-lg:scale-[0.55]` (reverted by user)
3. Card positioning: Updated to use percentage-based positioning (`top-[38%]`, `bottom-[8vh]`) for better distribution

### Current State:
- Frame: Full screen on all devices (original size maintained)
- Cards: Original size on all devices (no scaling) - **NEEDS TO BE IMPLEMENTED**
- Positioning: Responsive positioning using Tailwind breakpoints with percentage-based vertical positioning on mobile/tablet

## Key Features

### Performance Optimizations:
- Frame caching to prevent re-downloads
- Canvas rendering with `desynchronized: true` for better performance
- RAF (requestAnimationFrame) for smooth frame updates
- Preloading strategy to prevent black flicker
- Skip duplicate frame draws

### User Experience:
- Loading screen with progress indicator during preload
- Smooth card animations (GSAP power2 easing)
- Scene progress indicator (7 boxes showing active scene)
- Scene title display (headline + subline)
- Scroll indicator (bouncing arrow)
- End-of-life warning overlay (Scene 7, frames 60-93)

## Technical Stack
- React (useState, useEffect, useRef)
- GSAP (GreenSock Animation Platform)
- ScrollTrigger plugin
- Canvas API for frame rendering
- Tailwind CSS for responsive styling
- TypeScript for type safety

## File Structure
- Component: `src/components/BatteryLifecycleScroll.tsx`
- Card components: `src/components/cards/*.tsx`
- Frame assets: `/public/lifecycle/frames/scene-{1-7}/frame_*.webp`
- Loader: `src/components/BatteryLifecycleLoader.tsx`

## Implementation Priority
**HIGH PRIORITY**: Responsive card sizing is the current active task. All cards need scaling classes added while ensuring desktop remains completely unchanged.
