# Battery Lifecycle Scroll Component

## Overview
A high-performance React component built with GSAP and ScrollTrigger that creates an immersive scroll-synced video experience with animated diagnostic cards.

## Features
✅ Scroll-synced video playback using GSAP ScrollTrigger
✅ 7 diagnostic scenes with precise timing
✅ Glassmorphism card design with orange accents
✅ Smooth card animations from left side
✅ Loading overlay until video is ready
✅ Responsive and optimized performance

## Usage

### Accessing the Component
The component is available at: **`/battery-lifecycle`**

Navigate to `http://localhost:5173/battery-lifecycle` (or your dev server URL)

### Integration Example
```tsx
import BatteryLifecycleScroll from './components/BatteryLifecycleScroll'

function MyPage() {
  return <BatteryLifecycleScroll />
}
```

## Technical Details

### Video Configuration
- **Source**: `/lifecycle/fullscene.webm`
- **Position**: `sticky` (stays fixed while scrolling)
- **Properties**: `muted`, `playsInline`, `autoPlay={false}`
- **Duration**: 67 seconds (1:07)

### Scene Timings
| Scene | Time Range | Pause At | Card Displayed |
|-------|-----------|----------|----------------|
| 1 | 0s - 4s | 0:04 | Voltage Analysis (12.4V) |
| 2 | 4s - 7s | 0:07 | Internal Plate Analysis |
| 3 | 7s - 25s | 0:25 | Logistics & Boxing |
| 4 | 25s - 40s | 0:40 | Charging Rack Slotting |
| 5 | 40s - 42s | 0:42 | Internal Resistance (4.2mΩ) |
| 6 | 42s - 55s | 0:55 | Charging Phase (smooth play) |
| 7 | 55s - 67s | 1:07 | Full Dashboard Summary |

### GSAP Configuration
- **ScrollTrigger**: `scrub: 1` for smooth, weighted movement
- **Pin**: Video container stays fixed while scrolling
- **Card Animation**: `translateX(-100%)` to `translateX(0)` with `power3.out` easing

### Styling
- **Framework**: Tailwind CSS
- **Design Pattern**: Glassmorphism
  - Dark translucent background: `bg-black/70`
  - Backdrop blur: `backdrop-blur-md`
  - Orange glow: `shadow-[0_0_40px_rgba(255,107,26,0.3)]`
  - Gradient accents: `from-[#ff6b1a]/20`

## Customization

### Adding/Modifying Cards
Edit the `diagnosticCards` array in the component:
```tsx
const diagnosticCards: DiagnosticCard[] = [
  {
    id: 1,
    title: 'Your Title',
    value: 'Your Value',
    unit: 'Unit',
    description: 'Your description',
    icon: '🔋'
  }
]
```

### Adjusting Scene Timings
Modify the `sceneTimings` array:
```tsx
const sceneTimings = [
  { start: 0, pause: 4, cardIndex: 0 }
  // Add more scenes...
]
```

### Changing Scroll Speed
Adjust the `scrollMultiplier` for each scene:
- Default: `1.5` for normal scenes
- Charging phase: `3` for slower, smoother playback

## Performance Notes
- Video preloads automatically with `preload="auto"`
- Loading state prevents rendering until `onCanPlayThrough` fires
- ScrollTrigger cleanup on component unmount prevents memory leaks
- Single ScrollTrigger instance for optimal performance

## Browser Compatibility
- Requires WebM video support
- Modern browsers with GSAP support
- Mobile-friendly with `playsInline` attribute

## Dependencies
- `gsap`: ^3.14.2
- `gsap/ScrollTrigger`
- React 19+
- Tailwind CSS

## Troubleshooting

### Video not loading
- Verify `/lifecycle/fullscene.webm` exists in `public` folder
- Check browser console for video format errors
- Ensure video file is not corrupted

### Cards not animating
- Check that `activeCardIndex` is updating correctly
- Verify GSAP is properly installed and registered
- Inspect `cardRefs` are being set correctly

### Scroll not working
- Ensure container height is calculated correctly
- Check ScrollTrigger is registered: `gsap.registerPlugin(ScrollTrigger)`
- Verify no conflicting scroll libraries

## Future Enhancements
- [ ] Add sound effects option
- [ ] Mobile-optimized card positioning
- [ ] Keyboard navigation support
- [ ] Alternative video format fallbacks
