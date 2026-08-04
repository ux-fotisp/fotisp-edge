# EDGE — Interactive Micro-Animations & Components

**Author**: Fotis Pastrakis  
**Components Directory**: `src/components/`  

---

## 1. Floating Dock Navigation (`Header.astro` & `navigation.css`)

The desktop navigation header features an **AstroAnimate-style floating glassmorphic dock** with proximity-based icon scaling:

```
+-----------------------------------------------------------------------+
|  [LOGO]    ( Home | Services | Portfolio | News | Contact )  [ACCESS] |
+-----------------------------------------------------------------------+
```

### Key Mechanics:
- **Proximity Magnification**: As the mouse approaches a dock navigation item, client-side JS calculates the distance vector between the cursor and the item center.
- **Dynamic Scale Factors**: Hovered items scale up to `1.24x`, adjacent items scale to `1.10x`, creating a fluid wave deformation.
- **Glassmorphic Backdrop**: Built with `background: rgba(15, 9, 9, 0.7)` and `backdrop-filter: blur(16px)`.

---

## 2. CyberGrid Light Trails (`<CyberGridBg.astro>`)

The hero section features an interactive **HTML5 Canvas component** that renders dynamic neon red light trails across a grid layout.

### Technical Implementation:
- **Canvas Rendering**: Renders a 60px grid matrix operating at 60fps on a dedicated 2D canvas context.
- **Light Streak Vectors**: Spawns randomized horizontal and vertical light streaks (`#DC2626` / `#EF4444`) moving across grid coordinate lines.
- **Intersection Node Glows**: Detects coordinate intersections between horizontal and vertical streaks, drawing a radial pulse glow (`rgba(239, 68, 68, 0.8)`) at intersection nodes.

```astro
<CyberGridBg gridSize={60} speed={1.2} />
```

---

## 3. ACCESS EDGE Slide-Over Terminal Drawer (`<AccessModal.astro>`)

The system access terminal provides an interactive modal drawer triggered by any "ACCESS EDGE" CTA button site-wide.

### Key Features:
- **Slide-Over Drawer**: Transitions in from the right viewport edge (`transform: translateX(0)`).
- **High-Tech Inputs**: Dark input fields with red focus rings (`#DC2626`) and pulse indicators.
- **Keyboard & Overlay Controls**: Automatically closes when pressing `ESC` or clicking the blurred backdrop overlay.
- **Handshake Feedback**: Interactive submission script providing instant transmission status updates.

---

## 4. Real-Time Mouse Spotlight on Feature Cards

Cards on the homepage (`.feature-card`) track the mouse position dynamically:

```typescript
const cards = document.querySelectorAll('.feature-card') as NodeListOf<HTMLElement>;
cards.forEach((card) => {
  card.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});
```

A radial gradient overlay layer (`.feature-card::before`) uses `var(--mouse-x)` and `var(--mouse-y)` to illuminate a 400px red neon glow beneath the cursor.

---

## 5. Circular Scroll Progress Ring (`<BackToTop.astro>`)

The BackToTop button features an integrated SVG progress ring around its perimeter:

- **Scroll Tracking**: Listens to `window.scrollY` and calculates page scroll percentage.
- **SVG Dash Offset**: Dynamically adjusts `strokeDashoffset` on the `#progress-circle` SVG element (`stroke="#DC2626"`).
- **Visibility Trigger**: Scales in smoothly when scroll position exceeds 300px.
