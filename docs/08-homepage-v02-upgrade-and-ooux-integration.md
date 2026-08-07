# 08 — Homepage v0.2 Upgrade & OOUX Integration

## Overview
This document details the technical implementation of **version 0.2** for the EDGE Platform homepage (`src/pages/index.astro`). The update transitions the portal from static feature placeholders into a fully dynamic, object-oriented user experience anchored in **Sophia Prater's OOUX** principles and **Don Norman's Core Usability Heuristics**.

---

## 1. Architectural Principles

### 1.1 Object-Oriented User Experience (OOUX)
The homepage functions as a central system directory exposing core platform objects:
- **`Service`**: Core engineering solutions (`/services/[slug]`)
- **`Event`**: Strategy sessions & summits (`/events/[slug]`)
- **`Portfolio` / `Case Study`**: Engineering missions & performance metrics (`/portfolio/[slug]`)
- **`Team Member`**: Leadership & operations directory (`/team/[slug]`)

### 1.2 Don Norman Usability Heuristics
- **System Status Visibility**: Surfaced via `StatsBar.astro` immediately below the Hero section.
- **Explicit Signifiers & Affordances**: Primary Hero CTA triggers terminal drawer (`AccessModal.astro`) directly; section headers feature high-contrast directional hover arrows (`.link-arrow`).
- **Interactive Feedback**: GPU-accelerated card hover physics (`translateY(-4px)`, `box-shadow`) and mouse spotlight tracking scripts across all card components.

---

## 2. Component & Content Collection Mapping

| Section | Content Collection | Component Used | Header Link Target |
| :--- | :--- | :--- | :--- |
| **Telemetry Stats Bar** | System Telemetry Constant | `StatsBar.astro` | N/A |
| **Core Services Matrix** | `services` (`!data.draft`) | `ServiceCard.astro` | `/services` |
| **Upcoming Sessions & Summits** | `events` (`!data.draft`) | `EventCard.astro` | `/events` |
| **Engineering Missions** | `portfolio` (`!data.draft`) | `PortfolioCard.astro` | `/portfolio` |
| **Team Directory** | `team` (sorted by `order`) | `TeamCard.astro` | `/team` |

---

## 3. Verification & Build Safety
- **Clean Build Validation**: Verified via `npm run build` with sanitized Cloudflare Page/Worker bindings (`scripts/fix-wrangler-config.mjs`).
- **Version Control Safety**: Committed and tagged as `v0.2.0` on local branch prior to pushing to remote repository.
