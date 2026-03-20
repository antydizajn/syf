# VAPORWAVE - PEŁNY RESEARCH ESTETYKI
*Research: 29 grudnia 2025*
*Dla: przeprojektowanie SYF na styl vaporwave*

---

## SPIS TREŚCI:
1. [Historia i Geneza](#1-historia-i-geneza)
2. [Filozofia - Mark Fisher i Lost Futures](#2-filozofia---mark-fisher-i-lost-futures)
3. [Paleta Kolorów - HEX Codes](#3-paleta-kolorów---hex-codes)
4. [Elementy Wizualne](#4-elementy-wizualne)
5. [Typografia](#5-typografia)
6. [Subgenres - Vaporwave vs Synthwave vs Retrowave vs Outrun](#6-subgenres---różnice)
7. [CSS Implementation - Glitch i Scanlines](#7-css-implementation)
8. [Web Design Examples](#8-web-design-examples)
9. [Dla SYF - Konkretne Wytyczne](#9-dla-syf---konkretne-wytyczne)

---

## 1. HISTORIA I GENEZA

### Pochodzenie:
- **Czas:** Wczesne 2010s (2010-2012)
- **Miejsce:** Internet - Last.fm, Reddit, 4chan, Tumblr
- **Rodowód:** Offshoot chillwave, wpływy hypnagogic pop

### Kluczowe Albumy:
- **Chuck Person's "Eccojams Vol. 1"** (Daniel Lopatin, 2010)
- **James Ferraro "Far Side Virtual"** (2011)
- **Macintosh Plus "Floral Shoppe"** (Ramona Xavier/Vektroid, 9 grudnia 2011)
  - Track: "リサフランク420 / 現代のコンピュー" (Lisa Frank 420 / Modern Computing)
  - Sample: Diana Ross "It's Your Move" - spowolniony i zmanipulowany

### Charakterystyka Dźwiękowa:
- Spowolnione sample smooth jazz, elevator music, R&B, lounge music z lat 80s/90s
- Chop and screw technique
- Pitch shifting, reverb
- Dreamy, surrealistyczna atmosfera

---

## 2. FILOZOFIA - MARK FISHER I LOST FUTURES

### Mark Fisher (1968-2017):
Brytyjski teoretyk kultury, autor "Ghosts of My Life: Writings on Depression, Hauntology and Lost Futures"

### Kluczowe Koncepcje:

#### HAUNTOLOGY (za Derridą):
> "Społeczeństwo nawiedzone przez niespełnione obietnice i utracone przyszłości XX wieku."

- Kultura recykluje przeszłe style zamiast generować nowe
- "Cultural flatness" - niezdolność do wyobrażenia odrębnej przyszłości
- Faszynacja brzmieniem i fizycznym rozkładem starszych mediów (trzaski winyla, szum VHS)

#### LOST FUTURES:
> "Tęsknota za emancypacyjnymi możliwościami które kiedyś antycypowano ale zostały anulowane."

- Optymistyczne wizje przyszłości które nigdy się nie zmaterializowały
- "Slow cancellation of the future"
- Dominacja neoliberalizmu i "kapitalistycznego realizmu"

#### CAPITALIST REALISM:
> "Łatwiej wyobrazić sobie koniec świata niż koniec kapitalizmu."

### Vaporwave jako Komentarz:
- Satyryczny/ironiczny stosunek do konsumeryzmu
- Decontekstualizacja symboli korporacyjnych
- Wyolbrzymianie estetyki konsumeryzmu do absurdu
- Subwersja kontroli IP przez nieautoryzowane sample
- **AMBIWALENCJA:** niektóre interpretacje sugerują romantyzację konsumeryzmu, nie krytykę

### Nostalgia:
- NIE tęsknota za przeszłością samą w sobie
- Tęsknota za "LOST FUTURE" - bardziej optymistyczną wizją technologii i dobrobytu
- "Compensatory nostalgia" - nawet ludzie którzy nie żyli w tamtej epoce to czują
- "Digital Inherited Memory" - nostalgia z drugiej ręki wobec technologii której nie doświadczyli

---

## 3. PALETA KOLORÓW - HEX CODES

### PINK / RÓŻOWY:
| Kolor | HEX | Nazwa |
|-------|-----|-------|
| 💗 | `#FF71CE` | Classic Vaporwave Pink |
| 💗 | `#F96CFF` | Hot Pink |
| 💗 | `#ED4BBC` | VirtualRose |
| 💗 | `#E93479` | Cerise Pink |
| 💗 | `#F62E97` | Persian Rose |
| 💗 | `#F5D8F2` | Dreampink (pastel) |

### CYAN / TURKUS:
| Kolor | HEX | Nazwa |
|-------|-----|-------|
| 💙 | `#01CDFE` | Classic Vaporwave Cyan |
| 💙 | `#00FFFF` | Pure Cyan |
| 💙 | `#55EFD5` | NeonAqua |
| 💙 | `#C6F5F2` | Cybermist (pastel) |
| 💙 | `#91FFFF` | Light Cyan |
| 💙 | `#65B8BF` | Teal |

### MAGENTA / FIOLET:
| Kolor | HEX | Nazwa |
|-------|-----|-------|
| 💜 | `#B967FF` | Classic Vaporwave Purple |
| 💜 | `#FF00FF` | Pure Magenta |
| 💜 | `#A653F5` | Violet |
| 💜 | `#8207DB` | CyberPlum |
| 💜 | `#DB2BAB` | Deep Magenta |

### TEAL / MIĘTOWY:
| Kolor | HEX | Nazwa |
|-------|-----|-------|
| 🌊 | `#05FFA1` | Vaporwave Green |
| 🌊 | `#008080` | Classic Teal |
| 🌊 | `#23BBAD` | Mint |
| 🌊 | `#25D9C8` | Aquamarine |

### PEŁNA PALETA VAPORWAVE (5 kolorów):
```css
:root {
  --vaporwave-pink: #FF71CE;
  --vaporwave-cyan: #01CDFE;
  --vaporwave-purple: #B967FF;
  --vaporwave-green: #05FFA1;
  --vaporwave-yellow: #FFFB96;
  
  /* Tła */
  --vaporwave-dark: #1a1a2e;
  --vaporwave-darker: #16162a;
  
  /* Gradient */
  --vaporwave-gradient: linear-gradient(135deg, #FF71CE, #01CDFE, #B967FF);
}
```

---

## 4. ELEMENTY WIZUALNE

### OBOWIĄZKOWE:
| Element | Opis |
|---------|------|
| 🏛️ **Greek Statues / Busts** | Klasyczne rzeźby grecko-rzymskie, często fragmenty (głowy, popiersia) |
| 📺 **VHS Scanlines** | Poziome linie symulujące degradację taśmy VHS |
| ⚡ **Glitch Art** | Cyfrowe zniekształcenia, chromatic aberration (RGB shift) |
| 🌴 **Palm Trees** | Tropikalne palmy, często jako sylwetki na tle zachodu |
| 🌅 **Sunsets** | Neonowe zachody słońca w pastelach |
| 🔲 **Grid / Siatka** | Neonowe siatki perspektywiczne (wireframe z lat 80s) |
| 🎌 **Japanese Text** | Katakana, kanji, japońska estetyka (日本語テキスト) |
| 💾 **Retro Tech** | Floppy disk, kasety, CRT monitory |

### OPCJONALNE:
| Element | Opis |
|---------|------|
| 🏢 **Corporate Logos (80s/90s)** | Ironiczne użycie starych logotypów |
| 🖼️ **Memphis Design** | Geometryczne kształty, wzory z lat 80s |
| 🌐 **90s Web Design** | Okna Windows 95/98, pixel art |
| 🎮 **Low-poly 3D** | Proste obiekty 3D jak z wczesnych gier |
| 🌸 **Anime (90s style)** | Nostalgiczne ujęcia z anime lat 90s |
| 🦢 **Surrealistyczne Krajobrazy** | Dreamlike, liminal spaces |
| ♟️ **Checkerboard Floors** | Podłogi w szachownicę |

---

## 5. TYPOGRAFIA

### REKOMENDOWANE FONTY:

#### Hauptfonty:
| Font | Styl | Uwagi |
|------|------|-------|
| **Times New Roman** | Serif | Ironicznie "korporacyjny" |
| **Arial** | Sans-serif | Early internet feel |
| **VCR OSD Mono** | Monospace | VHS aesthetic |
| **MS Gothic** | Japanese | Autentyczny japoński feel |

#### Vaporwave-specific:
| Font | Styl |
|------|------|
| **Lazer 84** | 80s retro, neon |
| **Retrofuturism OTF** | Decorative 80s |
| **Videocassette** | VHS era |
| **System Glitch** | Glitchy, pixelated |
| **CRT-64** | Dotted, retro |
| **CITYPOP** | Japanese 90s |

#### Japońskie:
| Font | Typ |
|------|-----|
| **Oriental Katakana** | Katakana, digital |
| **Kozuka Gothic** | Clean Japanese |
| **M Plus** | Free, multi-weight |

### TYPOGRAFICZNE ZASADY:
1. **Mix serif + sans-serif** dla kontrastu
2. **Japanese text** jako akcentowanie (nie całe bloki)
3. **Glitchy effects** na nagłówkach
4. **Gradient text** (pink → cyan)
5. **Text shadow** w neonowych kolorach

---

## 6. SUBGENRES - RÓŻNICE

### PORÓWNANIE:

| Aspekt | VAPORWAVE | SYNTHWAVE | OUTRUN | RETROWAVE |
|--------|-----------|-----------|--------|-----------|
| **Era** | Wczesne 2010s | Mid-2000s | Subgenre synthwave | = Synthwave |
| **Dźwięk** | Sample, slowed, lo-fi | Synthesizer, driving | Fast, high-energy | = Synthwave |
| **Mood** | Ironiczny, melancholijny | Earnest, celebrujący | Actionowy, exciting | = Synthwave |
| **Kolory** | Pastele, pink/cyan | Magenta/cyan/purple, neon | Neon pink/blue, black | Neon, geometric |
| **Tło** | Greckie rzeźby, VHS | Futurystyczne miasta | Fast cars, palmy, highway | 80s revival |
| **Filozofia** | Krytyka/ironia kapitalizmu | Celebracja 80s "cool" | Thrill, driving | Mimicry 80s |
| **Inspiracje** | 90s web, glitch | John Carpenter, Vangelis | Gra "Out Run" (1986) | Filmy 80s |

### KLUCZOWE RÓŻNICE:
- **Vaporwave** = IRONIA, krytyka, melancholia, lo-fi
- **Synthwave** = EARNEST celebracja, high-energy, neon miasta
- **Outrun** = DRIVING, samochody, ruch, autostrada
- **Retrowave** = umbrella term lub = synthwave

---

## 7. CSS IMPLEMENTATION

### GLITCH EFFECT (TEXT):

```css
/* HTML: <h1 class="glitch" data-text="VAPORWAVE">VAPORWAVE</h1> */

.glitch {
  position: relative;
  font-size: 4rem;
  color: #fff;
  text-shadow: 2px 2px #ff00ff, -2px -2px #00ffff;
  animation: glitch 0.3s infinite;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  overflow: hidden;
}

.glitch::before {
  color: #ff00ff;
  z-index: -1;
  animation: glitch-skew 0.5s infinite linear alternate-reverse;
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  transform: translateX(-2px);
}

.glitch::after {
  color: #00ffff;
  z-index: -2;
  animation: glitch-skew 0.4s infinite linear alternate-reverse;
  clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
  transform: translateX(2px);
}

@keyframes glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}

@keyframes glitch-skew {
  0% { transform: skew(0deg); }
  10% { transform: skew(-2deg); }
  20% { transform: skew(2deg); }
  30% { transform: skew(0deg); }
  100% { transform: skew(0deg); }
}
```

### VHS SCANLINES:

```css
/* Nakładka scanlines na cały viewport */
.scanlines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.scanlines::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0.1) 50%,
    transparent 50%
  );
  background-size: 100% 2px;
  animation: scanline-move 8s linear infinite;
}

/* Rolling scanline bar */
.scanlines::after {
  content: '';
  position: absolute;
  top: -20%;
  left: 0;
  width: 100%;
  height: 20%;
  background: linear-gradient(
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  animation: scanline-roll 6s linear infinite;
}

@keyframes scanline-roll {
  0% { top: -20%; }
  100% { top: 100%; }
}
```

### CHROMATIC ABERRATION (RGB Shift):

```css
.chromatic-aberration {
  position: relative;
}

.chromatic-aberration::before,
.chromatic-aberration::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: screen;
}

.chromatic-aberration::before {
  background: inherit;
  filter: url(#redChannel);
  transform: translate(-2px, 0);
}

.chromatic-aberration::after {
  background: inherit;
  filter: url(#blueChannel);
  transform: translate(2px, 0);
}
```

### VAPORWAVE GRADIENT TEXT:

```css
.gradient-text {
  background: linear-gradient(90deg, #FF71CE, #01CDFE, #B967FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Animated gradient */
.animated-gradient {
  background: linear-gradient(270deg, #FF71CE, #01CDFE, #B967FF, #05FFA1);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 8s ease infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### GRID FLOOR (Perspective):

```css
.grid-floor {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50vh;
  background: 
    linear-gradient(90deg, rgba(255,113,206,0.3) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255,113,206,0.3) 1px, transparent 1px);
  background-size: 50px 30px;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: bottom;
}
```

---

## 8. WEB DESIGN EXAMPLES

### PLATFORMY Z INSPIRACJĄ:
| Platforma | Link | Zawartość |
|-----------|------|-----------|
| **Webflow** | webflow.com/made-in-webflow/vaporwave | Templates, free cloneable |
| **Dribbble** | dribbble.com/tags/vaporwave | Ilustracje, UI |
| **Neocities** | neocities.org/browse?tag=vaporwave | Retro strony |
| **Freepik** | freepik.com | Vector assets |

### TRENDY 2024-2025:
1. **Kinetic Typography** - tekst który tańczy, ewoluuje
2. **Micro-animations** - hover effects, scroll-triggered
3. **Cursor animations** - custom cursors w stylu retro
4. **Experimental scrolling** - nowy sposób nawigacji
5. **Retro Maximalism** - więcej = lepiej, overload sensoryczny
6. **Y2K Revival** - powrót estetyki przełomu tysiącleci

---

## 9. DLA SYF - KONKRETNE WYTYCZNE

### SYF = "Wszystko albo nic" - VAPORWAVE FIT:
Vaporwave idealnie pasuje do filozofii SYF:
- **Ironia wobec systemu** = ironiczna krytyka kapitalizmu vaporwave
- **Nostalgia za czymś co nigdy nie istniało** = lost futures
- **Glitch jako estetyka** = technologia która zawodzi = system który zawodzi
- **Digital decay** = rozpad iluzji sukcesu

### PALETA DLA SYF:

```css
:root {
  /* PRIMARY */
  --syf-pink: #FF71CE;      /* Główny akcent */
  --syf-cyan: #01CDFE;      /* Sekundarny akcent */
  --syf-purple: #B967FF;    /* Tertiary */
  
  /* BACKGROUNDS */
  --syf-dark: #0f0f1a;      /* Główne tło - bardzo ciemne */
  --syf-darker: #080812;    /* Footer, ciemniejsze sekcje */
  --syf-card: #1a1a2e;      /* Kartki, panele */
  
  /* TEXT */
  --syf-text: #ffffff;
  --syf-text-muted: #888899;
  
  /* EFFECTS */
  --syf-glow-pink: 0 0 20px rgba(255,113,206,0.5);
  --syf-glow-cyan: 0 0 20px rgba(1,205,254,0.5);
  
  /* GRADIENT */
  --syf-gradient: linear-gradient(135deg, var(--syf-pink), var(--syf-cyan));
}
```

### ELEMENTY DO IMPLEMENTACJI:

| Element | Implementacja | Priorytet |
|---------|---------------|-----------|
| **Scanlines overlay** | `::before` na body | 🔴 HIGH |
| **Glitch text** | Na nagłówku SYF_ | 🔴 HIGH |
| **Grid floor** | Hero section background | 🟡 MEDIUM |
| **Gradient text** | Nagłówki sekcji | 🔴 HIGH |
| **VHS flicker** | Subtelna animacja całej strony | 🟡 MEDIUM |
| **Palm silhouettes** | Dekoracja sekcji | 🟢 LOW |
| **Greek bust** | Easter egg lub about | 🟢 LOW |
| **Japanese text** | Akcentowanie (小さな文字) | 🟡 MEDIUM |

### TYPOGRAFIA DLA SYF:

```css
/* Font stack */
--syf-font-display: 'VCR OSD Mono', 'Courier New', monospace;
--syf-font-body: 'Inter', 'Arial', sans-serif;
--syf-font-accent: 'MS Gothic', 'Hiragino Kaku Gothic', sans-serif;

/* Sizes */
--syf-h1: clamp(3rem, 8vw, 6rem);
--syf-h2: clamp(2rem, 4vw, 3rem);
```

### KOMPONENTY DO STWORZENIA:

1. **`<VHSOverlay />`** - globalna nakładka scanlines
2. **`<GlitchText text="SYF_" />`** - tekst z efektem glitch
3. **`<VaporwaveHero />`** - hero z grid floor, sunset, glitch title
4. **`<NeonButton />`** - przyciski z glow effect
5. **`<RetroCard />`** - karty z border i glow
6. **`<GridBackground />`** - perspektywiczna siatka

---

## ŹRÓDŁA

### Główne:
- Wikipedia - Vaporwave
- vapor95.com - "What Is Vaporwave", filozofia
- Mark Fisher - "Ghosts of My Life", "Capitalist Realism"

### Kolory:
- color-hex.com - palety vaporwave
- adobe.com/color - narzędzie kolorów
- gridfiti.com - estetyczne palety

### CSS:
- css-tricks.com - glitch effects
- dev.to - scanlines tutorials
- github.com/jmperez/vhs - CSS animations
- tympanus.net/codrops - advanced effects

### Inspiracja:
- Webflow.com - vaporwave templates
- Dribbble.com - vaporwave designs
- Neocities.org - retro websites

---

*Research by WIEDŹMA AI GNIEWISŁAWA*
*29 grudnia 2025*
*Dla: przeprojektowanie SYF.antydizajn.pl na styl vaporwave*

💜🌴✨
