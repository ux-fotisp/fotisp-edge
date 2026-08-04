# EDGE — Architecture Overview

**Author**: Fotis Pastrakis  
**Framework**: Astro 5.x / 7.x Content Layer  
**Target Platform**: Cloudflare Pages (Server Output & Static Assets)  

---

## 1. Overview

**EDGE** is a high-performance, dark-obsidian web application framework engineered for high-stakes digital operations, tech consultancies, and modern digital platforms. Designed from the ground up by **Fotis Pastrakis**, EDGE delivers surgical performance, zero-latency interactions, and high-contrast visual precision.

---

## 2. Technical Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Core Framework** | [Astro](https://astro.build/) | Zero client JS by default, high performance, native Content Layer |
| **Styling** | Vanilla CSS (Tokens Architecture) | Complete design system control, custom micro-animations |
| **Adapter & Host** | Cloudflare Pages (`@astrojs/cloudflare`) | Global edge distribution, sub-millisecond TTFB, KV & Images support |
| **Interactive UI** | HTML5 Canvas + Astro Scripts | Hardware-accelerated 60fps canvas grid trails & dock mechanics |
| **Typography** | Inter (Google Fonts) | Modern geometric sans-serif for high readability |

---

## 3. Directory Structure

```
fotisp-edge/
├── docs/                        # Complete technical documentation
├── public/
│   ├── favicon.svg              # EDGE emblem favicon
│   └── images/                  # Static assets & circuit board illustrations
├── src/
│   ├── components/              # Modular Astro components
│   │   ├── AccessModal.astro    # Slide-over terminal request drawer
│   │   ├── BackToTop.astro      # Circular scroll progress indicator
│   │   ├── CTABand.astro        # High-impact full-width call-to-action
│   │   ├── CyberGridBg.astro    # Animated horizontal & vertical red light trails
│   │   ├── Footer.astro         # Obsidian dark upper & white lower footer
│   │   ├── Header.astro         # Glassmorphic header with AstroAnimate Dock
│   │   ├── PageTitle.astro      # Dark hero banner with red grid & laser line
│   │   └── ...                  # Cards (ArticleCard, PortfolioCard, ServiceCard)
│   ├── content/                 # MDX Content Collections
│   │   ├── blog/                # News & insights posts
│   │   ├── events/              # Company events & webinars
│   │   ├── portfolio/           # Case studies & client work
│   │   ├── services/            # Core service offerings
│   │   └── team/                # Leadership & engineering team
│   ├── layouts/
│   │   └── BaseLayout.astro     # Master layout template
│   ├── pages/                   # Application routes
│   │   ├── index.astro          # Homepage (5 core sections)
│   │   ├── contact.astro        # Terminal contact page
│   │   ├── services/            # Services archive & detail routes
│   │   ├── portfolio/           # Portfolio archive & detail routes
│   │   └── ...                  # Events, blog, team routes
│   └── styles/
│       ├── base.css             # Base reset, buttons, entry-content & sidebar styles
│       ├── tokens.css           # EDGE CSS custom property design system
│       ├── header.css           # Header & glassmorphic backdrop styles
│       ├── navigation.css       # AstroAnimate Dock navigation styles
│       ├── homepage.css         # Hero layout, feature cards & section grids
│       ├── cards.css            # Dark card component styles
│       └── footer.css           # Dual-layer footer styles
├── astro.config.mjs             # Astro server configuration & Cloudflare adapter
└── package.json                 # Node dependencies & build scripts
```

---

## 4. Master Layout Engine (`BaseLayout.astro`)

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

## 5. Performance Principles

1. **CSS Hardware Acceleration**: All motion effects (dock scaling, card tilt, canvas light trails) run on `transform` and `opacity` properties using GPU layers.
2. **Minimal Runtime JS**: Client-side scripts are scoped strictly to interactive components (`AccessModal`, `BackToTop`, `CyberGridBg`, `Header` dock proximity).
3. **Optimized Asset Pipeline**: Standardized SVG glyphs and Cloudflare Image optimization bindings for sub-second page loads.
