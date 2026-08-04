# EDGE — Design System & Tokens Guide

**Author**: Fotis Pastrakis  
**System Name**: EDGE Obsidian & Scarlet Red Design System  
**Stylesheet**: `src/styles/tokens.css` & `src/styles/base.css`  
**UX Methodology**: Don Norman Core UX Heuristics & Visual Hierarchy  

---

## 1. Color Palette Architecture

The **EDGE** design system utilizes a high-contrast dark aesthetic built around deep charcoal obsidian surfaces and high-saturation electric scarlet accents.

```css
:root {
  /* Surface Palette */
  --color-obsidian:     #080303; /* Primary dark background */
  --color-surface:      #0F0909; /* Dark surface — cards, secondary bg */
  --color-surface-2:    #160A0A; /* Elevated surface — card hover */
  --color-surface-3:    #1A080B; /* Tech stack badge background */
  --color-border:       rgba(220, 38, 38, 0.15); /* Red accent border */
  --color-border-deep:  #380F15; /* Crimson border for card affordance */
  --color-light-bg:     #FFFFFF; /* Stark white section background */

  /* Layout Archetype Constraints */
  --reader-width:       720px;   /* Archetype A: editorial reader column */
  --case-study-width:   1200px;  /* Archetype B: portfolio full-width */

  /* Accents */
  --color-primary:      #DC2626; /* Electric Scarlet Red */
  --color-secondary:    #701A1A; /* Deep Wine / Crimson Red */
  --color-accent-light: #EF4444; /* High-brightness neon glow red */

  /* Typography */
  --color-heading:      #FFFFFF; /* Pure White for dark surface headings */
  --color-text:         #D1D5DB; /* Cool Silver Gray for crisp body text */
  --color-text-light:   #9CA3AF; /* Muted gray for subtitles & meta */

  /* Neon Ambient Glows */
  --glow-red:           0 0 25px rgba(220, 38, 38, 0.5);
  --glow-red-subtle:    0 0 15px rgba(220, 38, 38, 0.25);
  --glow-red-intense:   0 0 40px rgba(239, 68, 68, 0.6);
}
```

---

## 2. Signifiers & Affordances (Don Norman UX Rule)

To ensure interactive elements clearly signal their clickability:

### Card & Metric Transitions:
Cards, spec items, and tech badges feature a default 1px `#380F15` deep crimson border. Upon hover/focus, they transition smoothly to an electric scarlet border (`#DC2626`) with a 24px ambient glow:

```css
.metric-card,
.service-spec-item,
.case-visual-inner {
  background: var(--color-surface);
  border: 1px solid var(--color-border-deep); /* #380F15 default signifier */
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease;
}

.metric-card:hover,
.service-spec-item:hover {
  border-color: #DC2626;
  box-shadow: 0 0 24px rgba(220, 38, 38, 0.3);
  transform: translateY(-3px);
}
```

---

## 3. Button Hierarchy & FillHoverButton Effect

Interactive buttons enforce a strict visual hierarchy:

- **Primary Actions (`.btn`)**: Solid Scarlet Red (`#DC2626`), white text, no border. Used for top-level operational conversions.
- **Secondary Actions (`.btn-outline`)**: Outlined red (`border: 2px solid #DC2626`), red text, dark background. Used for secondary navigation or exploration.

```css
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  background-color: var(--color-primary);
  color: #FFFFFF;
  border: 2px solid var(--color-primary);
  border-radius: 6px;
  font-weight: 700;
  text-transform: uppercase;
  overflow: hidden;
  isolation: isolate;
  transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.2s ease;
}

/* Animated liquid sweep pseudo-layer */
.btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #EF4444 0%, #B91C1C 50%, #701A1A 100%);
  z-index: -1;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn:hover::before { transform: translateY(0); }
.btn:hover {
  border-color: #EF4444;
  box-shadow: 0 0 25px rgba(239, 68, 68, 0.5);
  transform: translateY(-2px);
}
```

---

## 4. Typography Strategy

EDGE employs **Inter**, a modern geometric sans-serif typeface, across all headings, navigation links, and body content.

- **Headings (`h1`–`h3`)**: Ultra-bold (`font-weight: 800-900`), uppercase or tight letter spacing (`letter-spacing: -0.02em`).
- **Section Headers**: Pure White titles paired with red left border accents (`border-left: 3px solid #DC2626`).
- **Body Copy**: Light Cool Silver Gray (`#D1D5DB`), crisp 1.7–1.8 line height for optimal legibility.
- **Labels & Badges**: Small uppercase text (`font-size: 10px-11px`), `font-weight: 800`, `letter-spacing: 0.12em`.

---

## 5. Section Color Alternation Rules

To maintain high contrast and clear visual pacing, pages follow a strict section alternation strategy:

1. **Dark Section (`.section-dark` / `#080303`)**: Hero, Command Control cards, Team section, Footer Upper.
2. **Light Section (`.section-light` / `#FFFFFF`)**: Trusted By logo strip, Forged for the Extremes block, Footer Lower.

---

## 6. Utility Classes Reference

| Class | Function |
|---|---|
| `.glow-red` | Applies electric scarlet drop-shadow and glow |
| `.badge` | Scarlet rounded pill tag for categories & labels |
| `.badge-category` | Translucent scarlet category badge with red border |
| `.tech-badge` | Tech stack pill badge (`#1A080B` bg, `#380F15` border) |
| `.lead` | Elevated subtitle paragraph styling (`font-size: 1.1rem`) |
| `.widget` | Dark surface container with red accent border |
| `.widget-title` | Uppercase red widget title with border bottom |
| `.nav-active` | Active navigation route highlight with scarlet underline |
