# UI DECISIONS: Antigravity AI Lab /tech

## 🧠 Design Rationale
The goal is to move from "Artistic Chaos" to "Technical Dominance." The UI must feel like a military-grade AGI dashboard that is also clean enough for an investor to navigate.

### 1. The "Grid Supremacy" Choice
- **Decision**: No rounded corners (0px) for all primary containers.
- **Rationale**: Reinforces the "Antigravity" DNA of precision and mathematical rigidity. Soft corners suggest consumer-grade apps; hard corners suggest high-level engineering.

### 2. The "Diagnostic Margin" Choice
- **Decision**: Surround the main content with "HUD Margins" featuring real-time (or simulated) system metrics (e.g., Latency, Token Stream, Memory Load).
- **Rationale**: Satisfies the "Density Maxima" rule of the Antigravity Constitution. It proves the system is "alive" even on a static landing page.

### 3. Glassmorphism vs. Solid Black
- **Decision**: Clear OLED Black Background with "Frosted Slate" panels (`backdrop-filter: blur(20px)`).
- **Rationale**: Creates depth and a premium "Space/Futuristic" feel without sacrificing readability.

### 4. Interactive 3D Holograms (Tilt)
- **Decision**: Use Framer Motion's `useMotionValue` for mouse-tracked tilt on project cards.
- **Rationale**: Adds a "Tactile" feel. It makes the cards feel like physical objects or holographic interfaces.
