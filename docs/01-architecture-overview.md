# EDGE — Architecture Overview

**Author**: Fotis Pastrakis  
**Framework**: Astro 5.x / 7.x Content Layer  
**Target Platform**: Cloudflare Pages (Server Output & Static Assets)  
**UX Methodology**: Don Norman Core UX Heuristics & Archetype Layout Engine  

---

## 1. Overview

**EDGE** is a high-performance, dark-obsidian web application framework engineered for high-stakes digital operations, tech consultancies, and modern digital platforms. Designed from the ground up by **Fotis Pastrakis**, EDGE delivers surgical performance, zero-latency interactions, high-contrast visual precision, and strict compliance with Don Norman's core UX heuristics.

---

## 2. Technical Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Core Framework** | [Astro](https://astro.build/) | Zero client JS by default, high performance, native Content Layer |
| **Styling** | Vanilla CSS (Tokens Architecture) | Complete design system control, custom micro-animations |
| **Adapter & Host** | Cloudflare Pages (`@astrojs/cloudflare`) | Global edge distribution, sub-millisecond TTFB, KV & Images support |
| **Interactive UI** | HTML5 Canvas + Astro Scripts | Hardware-accelerated 60fps canvas grid trails & dock mechanics |
| **UX Engine** | Don Norman UX Heuristics | System status visibility, signifier affordances, immediate feedback & error prevention |
| **Typography** | Inter (Google Fonts) | Modern geometric sans-serif for high readability |

---

## 3. Directory Structure

```
fotisp-edge/
├── docs/                        # Complete technical documentation
│   ├── 01-architecture-overview.md
│   ├── 02-design-system-and-tokens.md
│   ├── 03-interactive-components.md
│   ├── 04-content-layer-and-collections.md
│   └── 05-deployment-guide.md
├── public/
│   ├── favicon.svg              # EDGE emblem favicon
│   └── images/                  # Static assets & circuit board illustrations
├── src/
│   ├── components/              # Modular Astro components
│   │   ├── AccessModal.astro    # Slide-over terminal request drawer
│   │   ├── BackToTop.astro      # Circular scroll progress indicator
│   │   ├── CTABand.astro        # High-impact full-width call-to-action (3 variants)
│   │   ├── CyberGridBg.astro    # Animated horizontal & vertical red light trails
│   │   ├── Footer.astro         # Obsidian dark upper & white lower footer
│   │   ├── Header.astro         # Glassmorphic header with AstroAnimate Dock & aria-current
│   │   ├── PageTitle.astro      # Dark hero banner with red grid, laser & dynamic breadcrumbs
│   │   └── ...                  # Cards (ArticleCard, PortfolioCard, ServiceCard)
│   ├── content/                 # MDX Content Collections
│   │   ├── blog/                # News & insights posts
│   │   ├── events/              # Company events & webinars
│   │   ├── portfolio/           # Case studies & client work
│   │   ├── services/            # Core service offerings
│   │   └── team/                # Leadership & engineering team
│   ├── layouts/
│   │   └── BaseLayout.astro     # Master layout template
│   ├── pages/                   # Application routes (Archetype Engine)
│   │   ├── index.astro          # Homepage (5 core sections)
│   │   ├── contact.astro        # Terminal contact page
│   │   ├── blog/[...slug].astro # Archetype A: Editorial Reader Column
│   │   ├── portfolio/[...slug].astro # Archetype B: Full-Width Case Study Grid
│   │   ├── services/[...slug].astro  # Archetype C: 70/30 Sticky Sidebar Doc Layout
│   │   └── ...                  # Events, team routes
│   └── styles/
│       ├── base.css             # Base reset, buttons, entry-content & sidebar styles
│       ├── tokens.css           # EDGE CSS custom property design system
│       ├── header.css           # Header & glassmorphic backdrop styles
│       ├── navigation.css       # AstroAnimate Dock & aria-current indicator styles
│       ├── homepage.css         # Hero layout, feature cards & section grids
│       ├── cards.css            # Dark card component styles
│       └── footer.css           # Dual-layer footer styles
├── tests/                       # QA & Unit test suites
│   ├── qa-interactive-components.ts
│   ├── qa-full-routing-suite.ts
│   └── qa-edge-suite.ts
├── astro.config.mjs             # Astro server configuration & Cloudflare adapter
└── package.json                 # Node dependencies & build scripts
```

---

## 4. Sub-Page Archetype Layout Engine

EDGE implements three specialized page archetypes to enforce natural mental models:

```
+-----------------------------------------------------------------------------------+
| ARCHETYPE A: Editorial         | ARCHETYPE B: Portfolio        | ARCHETYPE C: Services
| (max-width: 720px)             | (max-width: 1200px)           | (70/30 Split Layout)
| - Top #read-progress bar       | - CASE STUDY // ID badge      | - Sticky sidebar (30%)
| - Category badge               | - 4-col Metric Grid (Scarlet) | - Section anchor nav
| - Author avatar & reading time | - Tech stack pill badges      | - Structured doc blocks
| - Single column reader flow    | - 2-column visual & content   | - Inline blur validation
+-----------------------------------------------------------------------------------+
```

1. **Archetype A — Blog & Editorial (`blog/[...slug].astro`)**:
   - Constrained 720px reader column.
   - Top-fixed `#read-progress` bar tracking scroll depth.
   - Author avatar initials badge, date, and calculated reading time.

2. **Archetype B — Portfolio & Case Studies (`portfolio/[...slug].astro`)**:
   - Full 1200px case study grid.
   - `CASE STUDY // [ID]` identifier tag.
   - 4-column metric grid featuring large electric scarlet numbers.
   - Tech stack pill badges (`#1A080B` surface, `#380F15` crimson border).
   - 2-column grid pairing interactive architecture visual panel with MDX content.

3. **Archetype C — Services & Informational (`services/[...slug].astro`)**:
   - 70/30 split layout with sticky sidebar navigation.
   - Real-time `IntersectionObserver` section anchor tracking (`#overview`, `#specs`, `#pricing`).
   - Structured documentation blocks with 1px `#380F15` borders.
   - Strict button hierarchy (solid `#DC2626` primary vs. outlined red secondary).
   - Real-time inline blur validation with disabled-until-valid submit buttons.

---

## 5. Master Layout Engine (`BaseLayout.astro`)

All pages are wrapped by `BaseLayout.astro`, which guarantees global visual and functional parity across the platform:

```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import AccessModal from '../components/AccessModal.astro';
import BackToTop from '../components/BackToTop.astro';
---
<!doctype html>
<html lang="en">
  <head>
    <!-- Meta tags, OpenGraph, Favicon -->
  </head>
  <body class={bodyClass}>
    <div class="page-wrap">
      <Header />
      <div class="site-content-wrap">
        <slot />
      </div>
      <Footer />
    </div>
    <AccessModal />
    <BackToTop />
  </body>
</html>
```

---

## 6. Performance & UX Principles

1. **Don Norman UX Compliance**: Strict enforcement of system status visibility, clear signifier affordances, immediate validation feedback, and error prevention.
2. **CSS Hardware Acceleration**: All motion effects (dock scaling, card tilt, canvas light trails) run on `transform` and `opacity` properties using GPU layers.
3. **Minimal Runtime JS**: Client-side scripts are scoped strictly to interactive components (`AccessModal`, `BackToTop`, `CyberGridBg`, `Header` dock, `#read-progress`, `IntersectionObserver`).
4. **Optimized Asset Pipeline**: Standardized SVG glyphs and Cloudflare Image optimization bindings for sub-second page loads.
