# Changelog

All notable changes to the **EDGE Platform** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.3.0] - 2026-08-08

### Added
- **News System & Editorial Intelligence Hub (`/blog` & `/news`)**:
  - Registered `news` collection schema in `src/content.config.ts` validating `title`, `tagline`, `pubDate`, `category`, `author`, `readingTime`, `featuredImage`, `featured`, and `tags`.
  - Added sample MDX intelligence releases (`pop-expansion-eu.mdx`, `latency-benchmark-q3.mdx`, `zero-trust-update.mdx`).
  - Built `NewsCard.astro` component featuring dark burgundy surface (`#1A080B`), category badge, publication date, reading time, and `#ee2626` hover lift.
  - Refactored `/blog/index.astro` to Big-Tech Intelligence layout featuring a full-width featured hero article card, interactive category filter tabs (`ALL | PRESS RELEASES | PRODUCT | OPERATIONS | THOUGHT LEADERSHIP | MARKETING`), and 3-column responsive grid.
  - Refactored `/blog/[slug].astro` single article template featuring top reading progress bar (`#read-progress`), centered article header, constrained 720px reader column, custom `#ee2626` left-bordered blockquotes, one-click link copy action, social share buttons, and related articles feed.
  - Added SSG prerender redirect handlers (`/news/index.astro` and `/news/[slug].astro`) cleanly forwarding to `/blog`.
- **Dedicated Team System Architecture (`/team` & `/team/[slug]`)**:
  - Implemented `TeamShowcaseHome.astro` featuring Dribbble-inspired focus card spotlight pattern with sibling dimming physics.
  - Built Dedicated Team Archive (`src/pages/team/index.astro`) with department filter tabs (`ALL | LEADERSHIP | ENGINEERING | RESEARCH | SECURITY`) and inline recruitment `HiringCard`.
  - Built Single Team Profile (`src/pages/team/[slug].astro`) with 70/30 split layout, scroll progress bar, metrics grid, authored blog posts feed, speaking engagements, and sticky briefing sidebar widget.
- **Dedicated Services System Architecture (`/services` & `/services/[slug]`)**:
  - Built Service Archive (`src/pages/services/index.astro`) with 4-step methodology pipeline (`ServiceLifecycle.astro`) featuring laser indicator bar.
  - Built Single Service Profile (`src/pages/services/[slug].astro`) with executive summary callout, deliverable checklist, process flow, and `SCOPE PROJECT` CTAs.

### Changed
- **Global Footer & Attribution**:
  - Updated global footer left copyright text to `"© 2026 EDGE Theme. Built on Cloudflare Pages & Astro by Fotis Pastrakis"`, adding external link (`https://fotisp.gr/`) opening in a new tab on `Fotis Pastrakis`.
- **Design System & Documentation (`docs/design.md`)**:
  - Documented complete architectural specifications for Team System, Services System, and News System in `docs/design.md`.
- **Quality Assurance Test Suites**:
  - Expanded `tests/qa-interactive-components.ts` to 77 automated scenario tests covering all interactive components and templates.
  - Expanded `tests/qa-full-routing-suite.ts` to 52 automated route and content collection checks.

---

## [0.2.0] - 2026-08-07

### Added
- **OOUX Content Layer Integration (`src/pages/index.astro`)**:
  - Dynamically imported `events`, `services`, `portfolio`, and `team` collections via `getCollection`.
  - Added **"UPCOMING STRATEGY SESSIONS & SUMMITS"** section featuring the top 2 upcoming events rendered with `EventCard.astro` and direct header archive link (`/events`).
  - Added **"CORE ENGINEERING SERVICES"** matrix rendering real `ServiceCard.astro` instances in a responsive grid (`/services`).
  - Added **"ENGINEERING MISSIONS & CASE STUDIES"** showcase section with 2-column `PortfolioCard.astro` layout (`/portfolio`).
  - Upgraded **Team Directory** section to render 4 core team members (`Martin Dylon`, `James Flanagan`, `Vicki Cheng`, `Elena Rodriguez`) using `TeamCard.astro`.
- **Don Norman Usability Heuristics & Signifiers**:
  - Implemented real-time Telemetry StatsBar directly below the Hero (`99.99%` Uptime, `< 1ms` Edge TTFB, `500+` Audits, `24/7` Defense).
  - Updated primary Hero CTA (`DEPLOY INFRASTRUCTURE`) with `data-open-modal` to trigger `AccessModal.astro` terminal drawer natively.
  - High-contrast directional hover arrows (`.link-arrow`) across all section headers.
  - Extended GPU-accelerated card hover physics and mouse spotlight lighting across `.feature-card`, `.service-card`, `.event-card`, `.portfolio-card`, and `.team-card`.
- **Team Collection & Assets**:
  - Added 4th team member `Elena Rodriguez` (`Chief Technology Officer`) in `src/content/team/elena-rodriguez.mdx`.
  - Integrated high-res Unsplash team portraits across all 4 team profiles.

### Changed
- Refactored `src/pages/index.astro` from static placeholder cards to dynamic Content Layer object collections.
- Updated `TeamCard.astro` to support social links, team profile routes, and image rendering.
- Enhanced `PortfolioCard.astro` with electric scarlet tags, client metadata, and link arrows.
- Updated `src/styles/homepage.css` with responsive section header splits, grid layouts, and card hover spotlight mechanics.
- Updated mobile header layout in `src/styles/navigation.css` to hide the outer `Access Edge` button while sustaining it cleanly inside the mobile drawer menu.
- Enforced strict global `overflow-x: hidden` across `html`, `body`, `.page-wrap`, `.site-content-wrap`, and `.main` in `src/styles/base.css` to eliminate horizontal scrolling on mobile viewports.

---

## [0.1.0] - 2026-08-05
- Initial EDGE design system foundation, Cloudflare wrangler binding sanitization, and Astro Content Layer API setup.
