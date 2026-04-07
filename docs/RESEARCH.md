# Research

This document should only be used as reference material. It should be treated with caution and verified before use. Some concepts may be useful, but it was aimed at a different portfolio concept.

## 🧠 1. Core Concept Architecture

You essentially want 3 layers:

#### 1. **Structure → Astro**

* Pages, layout, SEO, content
* Static-first = fast portfolio

#### 2. **Styling → Tailwind**

* Clean typography
* “Hand-drawn” aesthetic via fonts + utilities

#### 3. **Animation → GSAP**

* Bring stick figures to life
* Subtle motion = personality without distraction

---

## ✏️ 2. Creating the Sketch Style - SVG Stick Figures

Use inline SVGs so you can animate parts (arms, head, etc.)

Example:

```html
<svg class="w-48 h-48" viewBox="0 0 200 200">
  <!-- Head -->
  <circle cx="100" cy="50" r="20" stroke="black" fill="none" stroke-width="3"/>
  
  <!-- Body -->
  <line x1="100" y1="70" x2="100" y2="130" stroke="black" stroke-width="3"/>
  
  <!-- Arms -->
  <line id="arm-left" x1="100" y1="90" x2="70" y2="110" stroke="black" stroke-width="3"/>
  <line id="arm-right" x1="100" y1="90" x2="130" y2="110" stroke="black" stroke-width="3"/>
</svg>
```

👉 Why SVG?

* GSAP can animate individual parts
* Scales perfectly
* Easy to keep “hand-drawn” feel

---

## 🎨 3. Tailwind Styling for “Sketch” Look

## Use a handwritten font

Add something like:

* “Patrick Hand”
* “Gloria Hallelujah”

```js
// tailwind.config.js
theme: {
  extend: {
    fontFamily: {
      sketch: ['"Patrick Hand"', 'cursive'],
    }
  }
}
```

---

### Rough UI styling

```html
<div class="border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_black]">
```

👉 This creates:

* Cartoon box feel
* Slight “drawn” imperfection

---

### Add subtle randomness

You can fake “hand-drawn” by slightly rotating elements:

```html
<div class="rotate-[-1deg] hover:rotate-[1deg] transition">
```

---

## 🎬 4. GSAP Animations (This is where it shines)

Install:

```bash
npm install gsap
```

---

### Example 1: Waving arm

```js
import { gsap } from "gsap";

gsap.to("#arm-right", {
  rotation: 20,
  transformOrigin: "top center",
  repeat: -1,
  yoyo: true,
  duration: 0.6,
  ease: "power1.inOut"
});
```

---

### Example 2: “Drawing itself” effect

Perfect for your theme.

```js
gsap.from("svg path, svg line", {
  strokeDasharray: 200,
  strokeDashoffset: 200,
  duration: 1.5,
  stagger: 0.1,
  ease: "power2.out"
});
```

👉 This makes it look like the sketch is being drawn live.

---

### Example 3: Scroll-triggered scenes

Use GSAP ScrollTrigger:

```js
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.from(".dev-scene", {
  opacity: 0,
  y: 50,
  scrollTrigger: {
    trigger: ".dev-scene",
    start: "top 80%",
  }
});
```

---

## 🧩 5. Astro Component Structure

Example:

```
src/
 ├─ components/
 │   ├─ StickDev.astro
 │   ├─ SketchCard.astro
 │   └─ SceneWhiteboard.astro
 ├─ layouts/
 └─ pages/
```

---

### Example Component

```astro
---
// StickDev.astro
---

<div class="flex items-center gap-6">
  <slot /> <!-- SVG goes here -->
  
  <div class="font-sketch text-xl">
    <slot name="text" />
  </div>
</div>
```

---

## 🎭 6. Scene Ideas (This is your differentiator)

Each section = a mini story

#### 👨‍💻 Hero

* Stick figure typing
* Screen flickers (GSAP opacity animation)

#### 📊 Skills

* Figure pointing at a chart
* Bars animate up

#### 🛠 Experience

* Fixing a “broken device”
* Sparks animation (simple lines)

#### 🧠 Projects

* Whiteboard with diagrams being drawn

---

## ⚡ 7. Performance Tips (Important with GSAP)

* Only load GSAP on components that need it
* Use Astro’s partial hydration:

```astro
<script client:visible>
```

* Prefer SVG over images (lighter + animatable)

---

## 🎯 8. Polishing Touches

### Cursor effect (fun but optional)

```js
gsap.to(".cursor", {
  x: mouseX,
  y: mouseY
});
```

---

### Sound (tiny touch)

* Subtle “scribble” sound on draw animations

---

### Easter egg

* Konami code → ninja dev appears 😄

---

## 💡 Final Thought

The key is restraint:

* Keep layout clean (like a professional portfolio)
* Use sketches as **accent storytelling**, not clutter
* Smooth animations > flashy animations

---