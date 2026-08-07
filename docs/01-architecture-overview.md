# EDGE — Architecture Overview

**Author**: Fotis Pastrakis  
**Framework**: Astro 5.x / 7.x Content Layer  
**Target Platform**: Cloudflare Pages (Server Output & Static Assets)  
**UX Methodology**: Don Norman Core UX Heuristics & Archetype Layout Engine  

---

## 1. Overview

**EDGE** is a high-performance, dark-obsidian web application framework engineered for high-stakes digital operations, tech consultancies, and modern digital platforms. Designed from the ground up, EDGE delivers surgical performance, zero-latency interactions, high-contrast visual precision, and strict compliance with Don Norman's core UX heuristics.

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
│   ├── 02-design-system-and-tokens.md    # Points to design.md
│   ├── 03-interactive-components.md     # Points to design.md
│   ├── 04-content-layer-and-collections.md
│   ├── 05-deployment-guide.md
│   ├── 06-versioning-and-safety-strategy.md
│   ├── 07-css-sanitization-and-deployment-fix.md
│   ├── 08-homepage-v02-upgrade-and-ooux-integration.md
│   ├── design.md                # Master UI/UX Design System & Experience Architecture
│   └── information-architecture.md # OOUX / ORCA Domain Model & Evaluation
├── public/
│   ├── favicon.svg              # EDGE emblem favicon
│   └── images/                  # Static assets & circuit board illustrations
├── src/
│   ├── components/              # Modular Astro components
│   │   ├── AccessModal.astro    # Slide-over terminal request drawer
│   │   ├── BackToTop.astro      # Circular scroll progress indicator
│   │   ├── CTABand.astro        # High-impact full-width call-to-action (3 variants)
│   │   ├── CyberGridBg.astro    # Animated horizontal & vertical red light trails
│   │   ├── EntryListMeta.astro  # Enriched monospace event meta pill bar
│   │   ├── EventCard.astro      # Rich event archive card with avatars & capacity bar
│   │   ├── Footer.astro         # Obsidian dark upper & white lower footer
│   │   ├── Header.astro         # Glassmorphic header with AstroAnimate Dock & aria-current
│   │   ├── PageTitle.astro      # Dark hero banner with red grid, laser & dynamic breadcrumbs
│   │   └── ...                  # Cards (ArticleCard, PortfolioCard, ServiceCard)
│   ├── content/                 # MDX Content Collections
│   │   ├── blog/                # News & insights posts
│   │   ├── events/              # Strategy sessions, summits & webinars
│   │   ├── portfolio/           # Case studies & client work
│   │   ├── services/            # Core service offerings
│   │   └── team/                # Leadership & engineering team
│   ├── layouts/
│   │   └── BaseLayout.astro     # Master layout template
│   ├── pages/                   # Application routes (Archetype Engine)
│   │   ├── index.astro          # Homepage (v0.2 Dynamic OOUX Portal)
│   │   ├── contact.astro        # Terminal contact page
│   │   ├── blog/[...slug].astro # Archetype A: Editorial Reader Column
│   │   ├── portfolio/[...slug].astro # Archetype B: Full-Width Case Study Grid
│   │   ├── services/[...slug].astro  # Archetype C: 70/30 Sticky Sidebar Doc Layout
│   │   ├── events/index.astro   # Events Archive (Upcoming, Recurring, Past sections)
│   │   ├── events/[slug].astro  # Archetype D: Single Event 70/30 Layout with Sticky Sidebar
│   │   └── ...                  # Team routes
│   └── styles/
│       ├── base.css             # Base reset, buttons, entry-content & sidebar styles
│       ├── tokens.css           # EDGE CSS custom property design system
│       ├── header.css           # Header & glassmorphic backdrop styles
│       ├── navigation.css       # AstroAnimate Dock & aria-current indicator styles
│       ├── homepage.css         # Hero layout, feature cards & section grids
│       ├── cards.css            # Dark card component styles
│       └── footer.css           # Dual-layer footer styles
├── tests/                       # QA & Unit test suites
├── astro.config.mjs             # Astro server configuration & Cloudflare adapter
└── package.json                 # Node dependencies & build scripts
```

---

## 4. Sub-Page Archetype Routing Overview

EDGE routes content through four specialized page archetypes to enforce natural mental models. For comprehensive architectural specifications, refer to [`docs/design.md`](design.md#7-sub-page-archetype-layout-engine-ooux-structural-layouts):

1. **Archetype A — Editorial (`blog/[...slug].astro`)**: 720px reader column with `#read-progress` depth tracking.
2. **Archetype B — Case Studies (`portfolio/[...slug].astro`)**: 1200px full grid with 4-column scarlet numeric callouts.
3. **Archetype C — Services (`services/[...slug].astro`)**: 70/30 split layout with `IntersectionObserver` sticky sidebar anchor navigation.
4. **Archetype D — Event System (`events/[slug].astro`)**: 70/30 split layout with sticky conversion sidebar, capacity progress bar, and calendar dropdown.

---

## 5. Master Layout Engine (`BaseLayout.astro`)

All pages are wrapped by `BaseLayout.astro`, guaranteeing global visual and functional parity across the platform:

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
