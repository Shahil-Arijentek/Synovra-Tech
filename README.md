# Synovra - Battery Revival Platform

<div align="center">
  <img src="public/logo.png" alt="Synovra Logo" width="200"/>
  
  ### Transforming Battery Lifecycle Management
  
  A cutting-edge web platform showcasing innovative battery revival technology and sustainable energy solutions.
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.2-646cff?logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
  
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Performance Optimizations](#-performance-optimizations)

---

## 🎯 Overview

Synovra is an immersive, performance-optimized web application that demonstrates the revolutionary approach to battery lifecycle management. The platform combines stunning visuals, smooth animations, and comprehensive information about battery revival technology, sustainability initiatives, and business impact.

**Key Highlights:**
- 🔋 Interactive battery lifecycle visualization
- 🎨 Modern, responsive UI with advanced animations
- 📊 Data-driven proof of technology effectiveness
- 🌍 Sustainability-focused approach
- 🚀 Performance-first architecture with lazy loading
- 📱 Fully responsive across all devices

---

## ✨ Features

### 🎬 Interactive Experiences
- **Battery Lifecycle Scroll**: Frame-by-frame animation showcase powered by GSAP ScrollTrigger
- **3D Battery Hero**: Engaging hero sections with depth and motion
- **Changing Perspective**: Dynamic visual transitions demonstrating battery transformation
- **Class of Power**: Video-based sections highlighting battery classification

### 📖 Content Sections
- **Why Revive**: Comprehensive explanation of battery revival benefits
- **Experience Revival**: Before/after comparisons and success metrics
- **System Outcomes**: Data visualization with MUI X-Charts
- **PulseX Technology**: Detailed breakdown of proprietary technology
- **Proof in Action**: Real-world case studies and results
- **Challenges**: Industry problems and Synovra's solutions

### 👥 Company Information
- **About Us**: Company mission, vision, and values
- **Leadership Team**: Executive profiles with role descriptions
- **Business Impact**: ROI and sustainability metrics
- **Sectors**: Industries served and use cases
- **Get Started**: Call-to-action and contact information

### ⚡ Performance Features
- Lazy loading for code splitting
- Service worker for asset caching
- Preloading critical resources
- Optimized image formats (WebP)
- Smooth page transitions
- Progressive loading states

---

## 🛠️ Tech Stack

### Core
- **[React 19](https://reactjs.org/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **[React Router DOM](https://reactrouter.com/)** - Client-side routing

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Emotion](https://emotion.sh/)** - CSS-in-JS library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon set
- **[Tabler Icons](https://tabler-icons.io/)** - Additional icon library

### Animation
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[GSAP](https://greensock.com/gsap/)** - Professional-grade animation platform
- **ScrollTrigger** - Scroll-based animations

### Data Visualization
- **[@mui/x-charts](https://mui.com/x/react-charts/)** - Advanced charting components

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd synovra
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in terminal)

---

## 📁 Project Structure

```
synovra/
├── public/                      # Static assets
│   ├── Battery-At-Anystage/    # Battery state images
│   ├── benefit/                # Benefit icons
│   ├── cards/                  # Card assets (images, videos)
│   ├── challenges/             # Challenge section images
│   ├── leadership/             # Leadership team photos
│   ├── lifecycle/              # Battery lifecycle frames
│   │   └── frames/             # 692 WebP animation frames
│   ├── perspective/            # Perspective section assets
│   ├── proof-in-action/        # Case study images
│   ├── pulsex/                 # PulseX technology images
│   ├── sector/                 # Industry sector images
│   ├── whyrevive/              # Why Revive animation frames
│   ├── sw.js                   # Service worker
│   └── *.webm, *.mp4          # Video assets
│
├── src/
│   ├── components/             # React components (63 files)
│   │   ├── Hero.tsx
│   │   ├── BatteryHero.tsx
│   │   ├── BatteryLifecycleScroll.tsx
│   │   ├── ExperienceRevival.tsx
│   │   ├── SystemOutcomes.tsx
│   │   ├── PulseX.tsx
│   │   ├── Challenges.tsx
│   │   ├── ProofInAction.tsx
│   │   ├── Sectors.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   │
│   ├── pages/                  # Page components
│   │   ├── Home.tsx
│   │   ├── WhyRevive.tsx
│   │   ├── AboutUs.tsx
│   │   ├── GetStarted.tsx
│   │   └── BatteryLifecycle.tsx
│   │
│   ├── contexts/               # React contexts
│   │   ├── LoadingContext.tsx
│   │   └── NavbarContext.tsx
│   │
│   ├── utils/                  # Utility functions
│   ├── lib/                    # Library configurations
│   ├── assets/                 # Source assets
│   ├── App.tsx                 # Main app component
│   ├── main.tsx               # Entry point
│   ├── index.css              # Global styles
│   └── App.css                # App-specific styles
│
├── dist/                       # Production build
├── node_modules/              # Dependencies
├── .eslint.config.js          # ESLint configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
├── vercel.json                # Vercel deployment config
├── package.json               # Project dependencies
└── README.md                  # This file
```

---

## 📜 Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot module replacement at `http://localhost:5173`

### Build
```bash
npm run build
```
Creates an optimized production build in the `dist/` folder. Runs TypeScript compilation and Vite build.

### Preview
```bash
npm run preview
```
Locally preview the production build before deploying.

### Lint
```bash
npm run lint
```
Runs ESLint to check code quality and adherence to coding standards.

---

## ⚡ Performance Optimizations

### Code Splitting
- **Lazy Loading**: All page components and heavy sections are lazy-loaded
- **Suspense Boundaries**: Strategic loading states to prevent layout shift
- **Route-based Splitting**: Each route loads only necessary code

### Asset Optimization
- **WebP Images**: Modern format for 25-35% smaller file sizes
- **Frame Preloading**: Critical lifecycle frames preloaded for instant display
- **Video Optimization**: WebM format for better compression
- **Service Worker**: Aggressive caching strategy for 700+ animation frames

### Animation Performance
- **GSAP**: Hardware-accelerated animations
- **Will-change**: Strategic use for better rendering performance
- **ScrollTrigger**: Optimized scroll-based animations
- **Framer Motion**: Layout animations with automatic optimization

### Loading Strategy
```typescript
// Initial loading screen (1.5s)
// → Fade out (0.5s)
// → Content reveal (smooth transition)
```

### Network Optimization
- Lazy image loading
- Chunked JavaScript bundles
- CSS minification and purging
- Tree-shaking for unused code

---

<div align="center">
  
  Made by Arijentek Solution

</div>
