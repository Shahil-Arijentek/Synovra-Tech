# Testing Guide - Battery Lifecycle Scroll Fix

## Quick Test

The dev server is running at: **http://localhost:5174/**

### Test Scenarios:

#### 1. **Normal Load (With Preloading)**
```
Visit: http://localhost:5174/
```
**Expected behavior:**
- Beautiful battery loading animation appears
- Progress bar goes from 0% → 100% (takes 2-5 seconds)
- Component loads and scrolling works smoothly
- **"Skip Loading" button** appears if you want to skip

#### 2. **Skip Preloading (For Testing)**
```
Visit: http://localhost:5174/?nopreload
```
**Expected behavior:**
- Skips preloading entirely
- Component loads immediately
- Scrolling should still work (frames load on-demand)

#### 3. **Test Scrolling**
Once loaded:
- Scroll down through the battery lifecycle
- Should see 7 scenes with smooth transitions
- Cards should animate in from the left
- Progress indicators should update

## Troubleshooting

### If Component Doesn't Load:

**Check 1: Console Errors**
- Open DevTools (F12)
- Look for errors in Console tab
- Common issues:
  - Frame files not found (404 errors)
  - CORS issues
  - JavaScript errors

**Check 2: Network Tab**
- Open DevTools > Network tab
- Filter by "webp"
- Check if frames are loading
- Look for failed requests (red)

**Check 3: Force Skip Preload**
- Add `?nopreload` to URL
- This bypasses preloading entirely
- If this works, preloading has an issue

### If Scrolling Doesn't Work:

**Check 1: ScrollTrigger**
- Open Console
- Type: `ScrollTrigger.getAll()`
- Should show array of triggers
- If empty, ScrollTrigger didn't initialize

**Check 2: Container Height**
- Inspect the component
- Check if container has height set
- Should be multiple viewport heights

**Check 3: GSAP Errors**
- Look for GSAP-related errors in console
- Check if `gsap` and `ScrollTrigger` are imported correctly

## Debug Mode

### Enable Detailed Logging:
Add to browser console:
```javascript
localStorage.setItem('debug', 'true')
```

### Check Preload Status:
```javascript
// Check if images are cached
performance.getEntriesByType('resource')
  .filter(r => r.name.includes('lifecycle/frames'))
  .length
```

### Manual Frame Test:
```javascript
// Test if a frame loads
const img = new Image()
img.onload = () => console.log('Frame loaded!')
img.onerror = () => console.error('Frame failed!')
img.src = '/lifecycle/frames/scene-1/frame_0001.webp'
```

## Common Issues & Fixes

### Issue: "Stuck on loading screen"
**Fix:**
1. Click "Skip Loading" button
2. Or add `?nopreload` to URL
3. Check console for errors

### Issue: "Frames not found (404)"
**Fix:**
1. Check if `/public/lifecycle/frames/` directory exists
2. Verify frame naming: `frame_0001.webp`, `frame_0002.webp`, etc.
3. Make sure frames are in correct scene folders

### Issue: "Scrolling doesn't trigger animation"
**Fix:**
1. Refresh page
2. Check if ScrollTrigger is initialized
3. Try scrolling more - might need more scroll distance

### Issue: "Cards don't appear"
**Fix:**
1. Check if scene is active (progress indicators at top)
2. Scroll more into the scene
3. Check console for card component errors

## Performance Testing

### Test Loading Speed:
```javascript
// In console, before visiting page
performance.mark('start')

// After page loads
performance.mark('end')
performance.measure('load-time', 'start', 'end')
console.log(performance.getEntriesByName('load-time')[0].duration)
```

### Test Frame Rate:
```javascript
// While scrolling
let frames = 0
setInterval(() => {
  console.log(`FPS: ${frames}`)
  frames = 0
}, 1000)

requestAnimationFrame(function count() {
  frames++
  requestAnimationFrame(count)
})
```

## Expected Results

✅ **Loading Screen:**
- Appears immediately
- Shows progress 0-100%
- Takes 2-5 seconds
- Has "Skip Loading" button

✅ **After Loading:**
- Smooth scrolling
- Frame changes visible
- Cards animate in
- Progress indicators work

✅ **Performance:**
- 60fps scrolling
- No stuttering
- No frozen frames
- Responsive to scroll

## Report Issues

If you find issues, note:
1. What URL you're testing
2. What you expected to happen
3. What actually happened
4. Console errors (if any)
5. Browser and version

## Quick Fixes Applied

1. ✅ Reduced preload to just 6 critical frames
2. ✅ Added 5-second safety timeout
3. ✅ Added "Skip Loading" button
4. ✅ Added `?nopreload` URL parameter
5. ✅ Better error handling
6. ✅ Individual frame error handling

## Next Steps

If everything works:
```bash
npm run build
git add .
git commit -m "Fix BatteryLifecycleScroll with optimized preloading"
git push
```

If issues persist, we can:
1. Disable preloading entirely
2. Use different loading strategy
3. Debug specific frame loading issues
