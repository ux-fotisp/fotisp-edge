# EDGE — emdash Theme

**EDGE** is an open-source, high-performance theme for **emdash** designed and engineered by **Fotis Pastrakis** for **free usage**.

Built on Astro 5.x/7.x and engineered for deployment on **Cloudflare Pages**, EDGE combines a deep dark obsidian visual aesthetic with electric scarlet red accents, hardware-accelerated micro-animations, and type-safe MDX content collections.

---

## 🎯 Designated Purpose

This repository provides an official, free-to-use **emdash theme** tailored for high-stakes digital consultancies, tech infrastructure providers, and modern digital platforms.

Created by **Fotis Pastrakis**, EDGE is released for free community usage and modification under the MIT License.

---

## ✨ Key Features

- **AstroAnimate Header Dock**: macOS-style glassmorphic floating navigation dock with proximity-based icon magnification.
- **Futuristic CyberGrid Background (`<CyberGridBg />`)**: 60fps HTML5 Canvas background rendering dynamic horizontal & vertical neon red light trails with intersection node glows.
- **FillHoverButton Micro-Animations**: Liquid sweep hover fill effect with ambient neon red glow site-wide.
- **ACCESS EDGE Slide-Over Terminal (`<AccessModal />`)**: Interactive slide-over drawer for infrastructure & access requests.
- **Mouse Card Spotlights**: Real-time cursor coordinate tracking illuminating dark cards.
- **Type-Safe MDX Content Layer**: Built-in collections for Services, Portfolio Case Studies, Events, Blog Posts, and Team Profiles.
- **Cloudflare Pages Ready**: Configured with `@astrojs/cloudflare` server adapter, KV sessions, and Cloudflare Image optimization.

---

## 📚 Technical Documentation (`docs/`)

Comprehensive technical guides are available in the [`docs/`](./docs/) directory:

- [**Design System & Component Specs**](./docs/design.md): Comprehensive reference for colors, typography, UX heuristics, and interactive components.
- [**Information Architecture**](./docs/information-architecture.md): OOUX Object-Oriented User Experience specifications for all system entities.
- [**Changelog**](./CHANGELOG.md): Version release history and detailed feature logs.
- [**01. Architecture Overview**](./docs/01-architecture-overview.md): System stack, directory map, layout engine, and performance principles.
- [**04. Content Layer & Collections**](./docs/04-content-layer-and-collections.md): MDX schemas, dynamic route pre-rendering, and D1 database seeding.
- [**05. Deployment Guide**](./docs/05-deployment-guide.md): Cloudflare Pages build configuration (`npm run build`), environment bindings, and hosting options.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Local Development Server
```bash
npm run dev
```
Open `http://localhost:4321` in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 📄 License & Attribution

Designed and authored by **Fotis Pastrakis**.  
Released as a free open-source theme for **emdash** under the [MIT License](./LICENSE).
