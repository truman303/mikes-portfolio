# Mike Fellowes Portfolio Design

Design notes and open complexity items for the portfolio website.

---

## Open Complexity Items

These were flagged during planning and need decisions or deeper design work before or during implementation.

### 1. SVG Hover Animation System (Stage 3)

Each stick figure needs a unique micro-animation on hover (e.g., arm waves for "People Person", steam rises for "Coffee Drinker"). We need a clean interface for defining per-figure animations.

**Options to explore**:
- Each figure component exports a `data-animation` attribute naming its GSAP tween, with a central registry of animation functions
- Each figure component includes its own `<script>` tag with a self-contained GSAP hover handler
- A shared `initFigureAnimations()` function that queries `[data-figure]` elements and dispatches to a map of animation configs

**Decision**: TBD during Stage 3.

---

### 2. ScrollTrigger Pin Math — Work Section (Stage 4)

The Work section pins in the viewport while the user scrolls through 5 domain subsections. Calculating the correct trigger height and per-subsection offsets is the trickiest part of the animation layer.

**Key considerations**:
- Total pin distance = `(number of domains) * (viewport height)` or a fraction thereof
- Each domain subsection needs proportional start/end percentages within the overall trigger
- The title `y` animation and the figure `autoAlpha` animation must be synchronised to the same scrub progress
- Mobile fallback: unpin and stack sections vertically if viewport is too narrow for the split layout

**Decision**: TBD during Stage 4. Will prototype with 2 domains first before scaling to all 5.

---

### 3. Paper / Chalkboard Texture (Stage 1)

The sketch theme benefits from a textured background rather than flat colors.

**Options**:
- **CSS-only noise**: `background-image` with an inline SVG `<filter>` using `feTurbulence` — zero extra files, but limited control
- **SVG filter overlay**: A positioned `<svg>` element with a turbulence filter applied to a rect — more control, potential perf cost on large screens
- **Tiled image**: A small seamless `.png` or `.webp` noise texture tiled via `background-repeat` — most predictable but adds an asset

**Decision**: TBD during Stage 1. CSS-only is preferred if it looks good enough.

---

### 4. Brand Logos (Stage 6) ✓

Need visual representations for: Itron, Schlumberger, Actaris, Eskom, GEW, Hensoldt, iPay, Ontec, TRG.

**Decision**: Brand names rendered as styled text in Architects Daughter font inside sketch-style card frames. Each card has a hand-drawn wavy SVG accent underline and slight per-card rotation for visual variety. CSS-only infinite marquee (`@keyframes translateX(-50%)` on a duplicated strip) with edge-fade mask, hover-to-pause, `prefers-reduced-motion` wrap fallback, and mobile responsive sizing. Zero licensing issues, fits the sketch theme perfectly.

---

### 5. Mobile Navigation (Stage 2)

The fixed header with 5 nav items plus a dark mode toggle needs to work on small screens.

**Considerations**:
- Hamburger menu with a slide-out or dropdown panel
- Scroll offset calculation when jumping to anchors (must account for the fixed header height)
- Whether the header should auto-hide on scroll-down and reappear on scroll-up

**Decision**: TBD during Stage 2.
