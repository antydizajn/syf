# PAGE DESIGN: /tech (Antigravity AI Lab)

> **LOGIC:** This file overrides `MASTER.md` for the `/tech` route.

## 🎨 Theme & Palette (Refined)

### Colors
- **Primary (Reliability)**: `#2563EB` (Tech Blue)
- **Accent (Energy)**: `#F97316` (Innovation Orange)
- **Diagnostic (Data)**: `#39FF14` (Neon Green)
- **Critical (Alert)**: `#FF003C` (Cyber Red)
- **Background**: `#000101` (Absolute OLED Black)
- **Surface**: `#0F172A` (Deep Slate for panels)

## 🔠 Typography (Specifics)
- **H1 Override**: `font-family: 'Space Grotesk', sans-serif; font-weight: 700; letter-spacing: -0.05em;`
- **Mono Stats**: `font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--neon);`

## ✨ Animation Suite (Page Specific)
1. **3D Interactive Tilt**: All project cards must have a subtle `whileHover={{ rotateX: 5, rotateY: 5 }}` using Framer Motion.
2. **Scanline Glow**: The background should feature a fixed, ultra-low opacity (2%) scanline overlay moving vertically.
3. **Data Pulse**: Key technical specs should pulse between `#39FF14` and `#FFFFFF` at 0.5Hz.

## 🧱 Component Rules
- **Project Cards**: No rounded corners (`0px`). Use a `1px` border with `border-image: linear-gradient(to right, #2563EB, #39FF14) 1;`.
- **Hero Section**: Must feature a "Live Diagnostic" feed simulation in the margins.
- **Micro-Interactions**: All buttons must have a `0.1s` glitch effect on hover.

## 🚫 Anti-Patterns
- ❌ No generic "Bootstrap" look.
- ❌ No rounded buttons (`border-radius: 0` or `max 4px`).
- ❌ No placeholder text. All copy must come from `CONTENT.md`.
