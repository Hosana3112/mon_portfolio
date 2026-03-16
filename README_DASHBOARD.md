# VitalScope: 3D Health Metrics Dashboard

A futuristic, high-performance health dashboard built with **Next.js 14 (App Router)** to showcase advanced frontend engineering, 3D graphics integration, and state management.

![VitalScope Dashboard Preview](https://via.placeholder.com/1200x630/0f172a/6366f1?text=VitalScope+Dashboard+Preview)

## 🚀 Key Features

- **Immersive 3D Environment**: Full-screen floating abstract geometry powered by Three.js (via `@react-three/fiber` and `@react-three/drei`).
- **Interactive Parallax**: Camera motion reactive to mouse movements for depth perception.
- **Glassmorphism Design**: Premium UI panels with real-time backdrop blur, translucent borders, and subtle glowing highlights.
- **Zustand State Management**: Centralized store for health metrics with optimized reactive updates.
- **Real-time BMI Engine**: Live calculations for Body Mass Index with color-coded category indicators.
- **Micro-interactions**: Framer Motion powered entry animations and hover-based tilt effects.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **3D Engine**: Three.js / R3F
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📂 Architecture

```text
├── app/
│   ├── dashboard/       # Specialized dashboard route
│   ├── globals.css      # Tailwind 4.0 configuration & theme
│   └── layout.tsx       # Root configuration with SmoothScroll
├── components/
│   ├── dashboard/      # UI components (GlassCard, BMICard, etc.)
│   ├── three/          # R3F Scene components & geometry
│   └── ui/             # Preloader and generic UI elements
├── hooks/
│   └── useMetricsStore.ts # Centralized Zustand state
└── lib/
    └── utils.ts        # Helper functions
```

## 📦 Getting Started

1. **Clone & Install**:
   ```bash
   git clone <your-repo-url>
   npm install
   ```

2. **Run Locally**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 🌐 Deployment

The project is optimized for deployment on **Vercel**:

- Seamless support for Next.js App Router.
- Automated CI/CD from GitHub.
- Edge-ready performance.

---
Built with ⚡ by [Hosana Zitti](https://github.com/hosanazitti)
