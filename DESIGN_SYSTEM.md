# DESIGN SYSTEM: SYF V5 (10-ATOMÓWKA TIER)

## 🎨 Design Tokens (V4.0)

| Token | Semantic Name | HEX | Usage |
|-------|---------------|-----|-------|
| `--neon-green` | Primary Action | `#39FF14` | Buttons, Success, Scanning |
| `--radioactive-yellow`| Warning/System | `#CCFF00` | Stats, Gauges, Warnings |
| `--void-black` | Background | `#000101` | Absolute Void Background |
| `--pure-white` | 1-Bit Primary | `#FFFFFF` | Brutalist 1-bit typography |
| `--cyber-red` | Critical/Alert | `#FF003C` | Errors, Hot zones, Glitches |
| `--matrix-blue` | Data/Auxiliary | `#00D4FF` | Connections, Grid lines |
| `--amber-glow` | Retro Phosphor | `#FFB000` | Vintage Arcade CRT |

## ☢️ The 10-ATOMÓWKA Principles (V5.0)

1. **Radioactive Bloom**: Layered additive glows that bleed.
2. **Kinetic Entropy**: Motion that feels slightly unstable.
3. **High-Fidelity Density**: Meaningful telemetry streams.
4. **Aggressive Technicality**: 0px radius, grid-locked logic.
5. **Supreme Dithering**: Haptic pixel textures (Halftones).
6. **Subliminal Grid**: Coordinate systems at 2% opacity.
7. **Dynamic Chromatic Aberration**: Interactive RGB shifts.
8. **Liquid Rigidness**: 3D Tilt effects on flat panels.
9. **Visual Audio-Sync**: Pulsing syncopated elements.
10. **Aesthetic Autonomy**: Each screen as standalone art.

## 🔠 Typography

- **Display**: [Orbitron](https://fonts.google.com/specimen/Orbitron) (Bold/Black) for headers and HUD readouts.
- **Mono**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) for technical data, file lists, and terminal.
- **Sizing**: 
  - Massive Hero: `clamp(8rem, 25vw, 20rem)`
  - HUD Labels: `0.7rem` (all caps, wide tracking)

## ✨ Animation Principles

1. **Glitch Protocol**: 3-step CSS keyframe animation for displacement and RGB split. Use on hover for interactive elements.
2. **Scanlines**: Low-opacity (5%) overlay with vertical motion.
3. **Kinetic Entry**: Elements should "materialize" using Framer Motion (Staggered scale + opacity with spring physics).
4. **Diagnostic Pulse**: Subtile opacity pulsing (0.8 -> 1.0) on system vital indicators.

## 🧱 Component Rules (SYF-ATOMIC)

- **HUD Panels**: Must have clipped corners (`clip-path`).
- **Reticles**: Circular SVG components with rotating sub-elements.
- **Tickers**: Marquee-style text for bottom status bars.
- **Borders**: 1px solid with variable opacity to create depth.

## 🚫 Anti-Patterns

- **Soft Shadows**: Use hard glows instead.
- **Rounded Corners**: Only hard angles (45 deg clips) allowed.
- **Placeholder Images**: Always use AI-generated or technical abstract patterns.
- **Standard Colors**: No generic Blue, Red, or Green. Only Neon/Radioactive variants.
