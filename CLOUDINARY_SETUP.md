# Cloudinary Setup Guide for Synovra

## 📦 What We're Moving (265 MB total)

### Priority 1 - Videos (142 MB):
- `getstarted.mp4` (54.22 MB)
- `beforeyourecycle.mp4` (43.69 MB)
- `lifecycle/fullscene.webm` (22.66 MB)
- `whyrevive/plexus-black-white.mov` (12.31 MB)
- Other large videos

### Priority 2 - Large Images (123 MB):
- All `sector/*.png` (65 MB)
- All `lifecycle/*.png` (48 MB)
- All `proof-in-action/*.png` (35 MB)
- All `leadership/*.png` (45 MB)

---

## 🔧 Step-by-Step Setup

### Step 1: Create Cloudinary Account (2 mins)

1. Go to: https://cloudinary.com/users/register/free
2. Sign up (free tier includes):
   - ✅ 25 GB storage
   - ✅ 25 GB bandwidth/month
   - ✅ Automatic optimization
   - ✅ Global CDN

3. After signup, note your **Cloud Name** (you'll need this!)

---

### Step 2: Upload Files to Cloudinary (10 mins)

**Option A: Via Web Interface (Easiest)**

1. Login to Cloudinary Dashboard
2. Click "Media Library" → "Upload"
3. Create folders to organize:
   - `synovra/lifecycle/`
   - `synovra/sector/`
   - `synovra/leadership/`
   - `synovra/proof-in-action/`
   - `synovra/whyrevive/`

4. Upload files to respective folders
5. Enable "Auto-optimization" for all uploads

**Option B: Via Cloudinary Upload Widget (Bulk)**

1. Go to: https://cloudinary.com/console/media_library/folders/upload
2. Drag and drop entire folders
3. Wait for upload + automatic optimization

---

### Step 3: Get Optimized URLs

After upload, Cloudinary gives you URLs like:

**Videos:**
```
https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/q_auto/synovra/lifecycle/fullscene.webm
```

**Images:**
```
https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/q_auto,f_auto/synovra/sector/image6.png
```

**URL Parameters Explained:**
- `q_auto` = Auto quality (optimal compression)
- `f_auto` = Auto format (WebP/AVIF for modern browsers)
- `w_auto` = Auto width (responsive images)

---

### Step 4: Update Your Code

#### Create a Cloudinary Config File:

**File: `src/config/cloudinary.ts`**
```typescript
// Replace YOUR_CLOUD_NAME with your actual cloud name
export const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME'

export const getCloudinaryUrl = (path: string, options: {
  type?: 'image' | 'video'
  quality?: 'auto' | 'best' | 'good' | 'eco'
  format?: 'auto'
  width?: number
} = {}) => {
  const { type = 'image', quality = 'auto', format = 'auto', width } = options
  
  let transformations = []
  
  if (quality) transformations.push(`q_${quality}`)
  if (format) transformations.push(`f_${format}`)
  if (width) transformations.push(`w_${width}`)
  
  const params = transformations.join(',')
  
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${type}/upload/${params}/${path}`
}

// Helper for videos
export const getVideoUrl = (path: string) => 
  getCloudinaryUrl(path, { type: 'video', quality: 'auto' })

// Helper for images
export const getImageUrl = (path: string, width?: number) => 
  getCloudinaryUrl(path, { type: 'image', quality: 'auto', format: 'auto', width })
```

#### Update BatteryLifecycleScroll.tsx:

```typescript
import { getVideoUrl } from '../config/cloudinary'

// In the video tag:
<video>
  <source 
    src={getVideoUrl('synovra/lifecycle/fullscene.webm')} 
    type="video/webm" 
  />
</video>
```

#### Update Other Components:

**Before:**
```tsx
<img src="/sector/image6.png" alt="Sector" />
```

**After:**
```tsx
import { getImageUrl } from '../config/cloudinary'

<img 
  src={getImageUrl('synovra/sector/image6.png', 1200)} 
  alt="Sector"
  loading="lazy"
/>
```

---

### Step 5: Find & Replace All Asset URLs

Here's what to replace in your codebase:

#### Videos to Replace:
```
/getstarted.mp4 → synovra/getstarted.mp4
/beforeyourecycle.mp4 → synovra/beforeyourecycle.mp4
/lifecycle/fullscene.webm → synovra/lifecycle/fullscene.webm
/whyrevive/plexus-black-white.mov → synovra/whyrevive/plexus-black-white.mov
```

#### Images to Replace (Examples):
```
/sector/image1.png → synovra/sector/image1.png
/lifecycle/1.png → synovra/lifecycle/1.png
/leadership/ceo.png → synovra/leadership/ceo.png
/proof-in-action/image1.png → synovra/proof-in-action/image1.png
```

---

### Step 6: Remove Old Files from Public Folder

After confirming everything works:

1. Delete large files from `public/` folder
2. Keep small files (SVGs, small PNGs < 2MB)
3. Commit and push to Vercel

**Your public folder will shrink from 349 MB to ~84 MB!**

---

## 🎨 Advanced Cloudinary Features (Optional)

### Responsive Images (Different sizes for different devices):

```typescript
export const getResponsiveImageUrl = (path: string) => ({
  mobile: getImageUrl(path, 640),   // 640px wide for mobile
  tablet: getImageUrl(path, 1024),  // 1024px for tablet
  desktop: getImageUrl(path, 1920)  // 1920px for desktop
})

// Usage:
<picture>
  <source media="(max-width: 640px)" srcSet={getImageUrl(path, 640)} />
  <source media="(max-width: 1024px)" srcSet={getImageUrl(path, 1024)} />
  <img src={getImageUrl(path, 1920)} alt="..." />
</picture>
```

### Video with Poster (Instant display):

```typescript
export const getVideoPoster = (videoPath: string) => {
  // Cloudinary auto-generates poster from video frame
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/so_0,q_auto,f_jpg/${videoPath}.jpg`
}

// Usage:
<video poster={getVideoPoster('synovra/lifecycle/fullscene')}>
  <source src={getVideoUrl('synovra/lifecycle/fullscene.webm')} />
</video>
```

### Lazy Loading for Images:

```typescript
<img 
  src={getImageUrl('synovra/sector/image6.png')}
  loading="lazy"  // Browser-native lazy loading
  decoding="async"  // Async decode for better performance
  alt="Sector 6"
/>
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] All large videos load from Cloudinary
- [ ] All large images load from Cloudinary
- [ ] BatteryLifecycleScroll video loads smoothly (no lag)
- [ ] Images are in WebP format (check Network tab)
- [ ] Page load time < 5 seconds
- [ ] Lighthouse score > 90
- [ ] Vercel bandwidth usage dropped significantly
- [ ] No broken images/videos

---

## 📊 Monitoring & Limits

### Free Tier Limits:
- **Storage:** 25 GB (you're using ~0.265 GB = 1%)
- **Bandwidth:** 25 GB/month
- **Transformations:** 25,000/month

### Check Usage:
- Dashboard: https://cloudinary.com/console/usage
- Monitor monthly bandwidth
- If you exceed, upgrade to paid plan (~$89/month)

### Estimated Monthly Bandwidth:
- Assume 1,000 visitors/month
- Each loads ~50 MB of assets
- Total: ~50 GB/month

**⚠️ You might need paid plan if traffic is high!**

---

## 💰 Cost Comparison

| Scenario | Vercel Bandwidth | Cloudinary Plan | Total Cost |
|----------|-----------------|-----------------|------------|
| **Current (no CDN)** | Included in Pro plan | - | $20/month |
| **With Cloudinary Free** | Minimal | Free | $20/month |
| **High Traffic (>25GB/mo)** | Minimal | $89/month | $109/month |

**Note:** Cloudinary paid plan includes better performance + more features

---

## 🚀 Alternative: Budget CDN Option

If cost is a concern, consider:

1. **Bunny CDN** - $1/month for 1TB storage + $0.01/GB bandwidth
2. **AWS S3 + CloudFront** - Pay as you go (~$3-5/month for your usage)

---

## 📞 Support

- Cloudinary Docs: https://cloudinary.com/documentation
- Support: https://support.cloudinary.com/
- Community: https://community.cloudinary.com/

---

## Next Steps

1. ✅ Sign up for Cloudinary
2. ✅ Upload priority 1 files (videos)
3. ✅ Test BatteryLifecycleScroll with Cloudinary URL
4. ✅ Upload priority 2 files (large images)
5. ✅ Update all code references
6. ✅ Test locally
7. ✅ Deploy to Vercel
8. ✅ Verify performance improvement
9. ✅ Delete old files from public folder
10. ✅ Celebrate! 🎉

**Estimated time: 30-45 minutes for complete migration**
