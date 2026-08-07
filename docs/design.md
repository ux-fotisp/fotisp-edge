# EDGE — UI/UX Design System, Tokens & Interactive Components

**Author**: Senior UX & Front-End Engineering  
**System Name**: EDGE Obsidian & Scarlet Red Design System  
**Stylesheets**: `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/header.css`, `src/styles/navigation.css`, `src/styles/homepage.css`, `src/styles/cards.css`  
**UX Methodology**: Don Norman Core UX Heuristics + Dark Obsidian Visual System  
**Target Platform**: EDGE Platform (Astro 5.x / 7.x & Cloudflare Pages)  

---

## 1. Design System Philosophy & Aesthetic Intent

The **EDGE** visual system is engineered for high-stakes digital operations, modern engineering consultancies, and executive decision-makers. The design philosophy centers on **surgical precision**, **high visual contrast**, **zero latency**, and **purposeful motion**.

```
+-----------------------------------------------------------------------------------+
|                           EDGE VISUAL IDENTITY PILLARS                           |
|                                                                                   |
|  1. OBSIDIAN CANVAS      2. CRIMSON TELEMETRY     3. TYPOGRAPHIC READABILITY     |
|  Deep dark backdrop      High-contrast scarlet    Inter geometric sans paired    |
|  with laser grid accents  accents & glows          with JetBrains Mono data      |
+-----------------------------------------------------------------------------------+
```

---

## 2. Complete CSS Custom Properties & Token Architecture

The design system utilizes a high-contrast dark aesthetic built around deep charcoal obsidian surfaces, glassmorphic filters, and high-saturation electric scarlet accents.

### 2.1 Color Palette & Token Hierarchy (`src/styles/tokens.css`)

```css
:root {
  /* Surface Palette */
  --color-obsidian:          #080303; /* Primary dark background canvas */
  --color-bg-primary:        #0B0C10; /* Dark obsidian primary background canvas */
  --color-surface:           #0F0909; /* Dark surface — cards, secondary bg */
  --color-surface-dark:      #15181F; /* Surface card & container background */
  --color-surface-2:         #160A0A; /* Elevated surface — card hover */
  --color-surface-3:         #1A080B; /* Tech stack badge background */
  --color-surface-elevated:  #1F2833; /* Interactive hover state panel surface */
  --color-border:            rgba(220, 38, 38, 0.15); /* Red accent border */
  --color-border-crimson:    #380F15; /* Crimson border for container affordance */
  --color-border-deep:       #380F15; /* Deep crimson default border */
  --color-border-hover:      #6B1D25; /* Active hover container border elevation */
  --color-light-bg:          #FFFFFF; /* Stark white section background */

  /* Layout Archetype Constraints */
  --reader-width:            720px;   /* Archetype A: editorial reader column */
  --case-study-width:        1200px;  /* Archetype B: portfolio full-width grid */

  /* Accents & Signals */
  --color-primary:           #DC2626; /* Electric Scarlet Red */
  --color-accent-scarlet:    #DC2626; /* Primary action indicator & CTA button */
  --color-secondary:         #701A1A; /* Deep Wine / Crimson Red */
  --color-accent-light:      #EF4444; /* High-brightness neon glow red */
  --color-accent-glow:       rgba(220, 38, 38, 0.25); /* Micro-glow aura */

  /* Typography Colors */
  --color-heading:           #FFFFFF; /* Pure White for dark surface headings */
  --color-text-primary:      #F3F4F6; /* High-contrast white headline text (WCAG AAA) */
  --color-text:              #D1D5DB; /* Cool Silver Gray for crisp body text */
  --color-text-secondary:    #9CA3AF; /* Muted silver body text */
  --color-text-light:        #9CA3AF; /* Muted gray for subtitles & meta */

  /* Font Families */
  --font-primary:            'Inter', system-ui, -apple-system, sans-serif;
  --font-secondary:          'Inter', system-ui, -apple-system, sans-serif;
  --font-sans:               'Inter', system-ui, -apple-system, sans-serif;
  --font-mono:               'JetBrains Mono', monospace;

  /* Neon Ambient Glows */
  --glow-red:                0 0 25px rgba(220, 38, 38, 0.5);
  --glow-red-subtle:         0 0 15px rgba(220, 38, 38, 0.25);
  --glow-red-intense:        0 0 40px rgba(239, 68, 68, 0.6);

  /* Transitions */
  --transition-fast:         150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal:       250ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 3. Don Norman Core UX Heuristics Integration

EDGE explicitly embeds **Don Norman's classic UX heuristics** directly into its interface design and component behaviors:

```
+-----------------------------------------------------------------------------------+
|                        DON NORMAN CORE UX HEURISTICS                              |
|                                                                                   |
|  [ Visibility of Status ]  [ Real-World Feedback ]  [ User Control & Freedom ]   |
|  Scroll bars, capacity      Monospace terminal,     Slide-over drawer, ESC key,  |
|  bars & live indicators     calendar dropdowns      sticky back-to-top trigger   |
|                                                                                   |
|  [ Consistency & Standards] [ Error Prevention ]    [ Signifiers & Affordances ]  |
|  4 Predictable Archetypes   Disabled-until-valid    High-contrast outline rings, |
|  & uniform CTAs            blur form validation    hover elevation & focus glow |
+-----------------------------------------------------------------------------------+
```

### 3.1 Visibility of System Status
- **Scroll Depth Telemetry (`#read-progress`)**: On Archetype A editorial pages, a 3px electric scarlet progress bar fixed to the top viewport edge visually communicates scroll percentage.
- **Seat Capacity Progress Bar (`EventCard` & `events/[slug]`)**: Visual progress indicators display `registeredCount / totalSeats` with color-coded status badges (`UPCOMING`, `LIVE`, `COMPLETED`, `RECURRING`).
- **Active Navigation Tracking (`IntersectionObserver`)**: On Archetype C and D sub-pages, sticky sidebar navigation dynamically updates active section highlights as the user scrolls through `#overview`, `#specs`, and `#pricing`.
- **System Telemetry Bar (`StatsBar.astro`)**: Surfaces real-time operational status (e.g., `99.99% Uptime`, `< 1ms TTFB`).

### 3.2 Match Between System & Real World
- **Terminal Access Drawer (`AccessModal.astro`)**: Uses monospace styling, command prompt glyphs (`>`), and system telemetry phrasing to align with developer and operational mental models.
- **Calendar & Time Slot Integration**: Event time slots present human-readable timezones alongside interactive Google, Apple (.ics), and Outlook calendar triggers.

### 3.3 User Control & Freedom
- **Slide-Over Terminal Modal**: Non-intrusive drawer overlay with clear exit pathways: pressing `Escape`, clicking the dark glass backdrop overlay, or selecting the `[X]` exit button.
- **Sticky Back-to-Top Indicator (`BackToTop.astro`)**: A floating circular trigger featuring an SVG radial scroll indicator allows instant restoration to page top from anywhere on long pages.

### 3.4 Consistency & Standards
- **Strict Button Hierarchy**:
  - **Primary CTA**: Solid Scarlet (`#DC2626`) fill with white text.
  - **Secondary CTA**: Crimson Outlined (`#380F15` border) with red hover fill.
  - **Tertiary Action**: Muted glass pill badge.
- **Archetype Page Engine**: Every page strictly adheres to one of four standardized sub-page layout archetypes.

### 3.5 Error Prevention & Clear Affordances
- **Inline Blur Validation**: Form fields validate on `blur`. Submit triggers remain visually disabled until all required fields satisfy formatting rules.
- **Focus Rings & Hover Affordances**: Interactive elements feature a 2px crimson outline glow on focus, visually signposting interactive affordances.

---

## 4. Card Affordances & Hover Physics

To ensure interactive elements clearly signal clickability, all cards (`.metric-card`, `.service-card`, `.event-card`, `.portfolio-card`, `.team-card`) implement GPU-accelerated hover physics and mouse spotlight tracking.

### 4.1 Card Transitions & Glow
Cards feature a default 1px `#380F15` deep crimson border. Upon hover/focus, they transition smoothly to an electric scarlet border (`#DC2626`) with a 24px ambient glow and a 4px upward lift:

```css
.feature-card,
.service-card,
.event-card,
.portfolio-card,
.team-card {
  position: relative;
  will-change: transform, box-shadow, border-color;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.3s ease,
              box-shadow 0.3s ease;
}

.feature-card:hover,
.service-card:hover,
.event-card:hover,
.portfolio-card:hover,
.team-card:hover {
  transform: translateY(-4px);
  border-color: rgba(220, 38, 38, 0.55) !important;
  box-shadow: 0 0 24px rgba(220, 38, 38, 0.18), 0 12px 30px rgba(0, 0, 0, 0.4) !important;
}
```

### 4.2 Real-Time Mouse Spotlight Physics
Cards dynamically track cursor coordinates (`--mouse-x`, `--mouse-y`), illuminating a 400px radial red neon spotlight beneath the cursor:

```css
.feature-card::before,
.service-card::before,
.event-card::before,
.portfolio-card::before,
.team-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(239, 68, 68, 0.12),
    transparent 80%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.feature-card:hover::before,
.service-card:hover::before,
.event-card:hover::before,
.portfolio-card:hover::before,
.team-card:hover::before {
  opacity: 1;
}
```

---

## 5. Strict Button Hierarchy & FillHoverButton Physics

Interactive buttons enforce a strict visual hierarchy and liquid sweep micro-animations:

- **Primary Actions (`.btn`)**: Solid Scarlet Red (`#DC2626`), white text. Used for top-level operational conversions.
- **Secondary Actions (`.btn-outline`)**: Outlined red (`border: 2px solid #DC2626`), red text, transparent background. Used for secondary exploration.

```css
.btn, button[type="submit"], input[type="submit"], .header-cta, .btn-fill-hover {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  background-color: var(--color-primary);
  color: #FFFFFF;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-base);
  font-family: var(--font-primary);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  transition: border-color 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.2s ease;
}

/* Dynamic liquid sweep pseudo-layer */
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

## 6. Typography Strategy

EDGE employs **Inter**, a modern geometric sans-serif typeface, paired with **JetBrains Mono** for code and telemetry data.

- **Headings (`h1`–`h3`)**: Ultra-bold (`font-weight: 800-900`), uppercase or tight letter spacing (`letter-spacing: -0.02em`).
- **Section Headers**: Pure White titles paired with red left border accents (`border-left: 3px solid #DC2626`).
- **Body Copy**: Light Cool Silver Gray (`#D1D5DB`), crisp 1.7–1.8 line height for optimal legibility.
- **Labels & Badges**: Small uppercase text (`font-size: 10px-11px`), `font-weight: 800`, `letter-spacing: 0.12em`.

---

## 7. Sub-Page Archetype Layout Engine (OOUX Structural Layouts)

To prevent visual drift and enforce predictable user expectations, EDGE routes content through four specialized page archetypes:

```
+-----------------------------------------------------------------------------------+
|                        SUB-PAGE ARCHETYPE ENGINE                                  |
|                                                                                   |
|  ARCHETYPE A: Editorial        ARCHETYPE B: Portfolio Case Study                  |
|  max-width: 720px              max-width: 1200px                                  |
|  - Top #read-progress bar      - 4-column scarlet metric grid                     |
|  - Author avatar & read time   - Tech stack pill tags & visual grid               |
|                                                                                   |
|  ARCHETYPE C: Services Doc     ARCHETYPE D: Single Event System                   |
|  70/30 Split Layout            70/30 Split Layout                                 |
|  - Sticky sidebar section nav  - Sticky RSVP sidebar & capacity bar               |
|  - Interactive doc blocks      - Speaker grid & agenda timeline                   |
+-----------------------------------------------------------------------------------+
```

### 7.1 Archetype A — Editorial & Blog (`blog/[...slug].astro`)
- **Layout Grid**: Single centered reader column constrained to `720px` max-width (`--reader-width`).
- **Key UX Elements**: Top-fixed `#read-progress` bar tracking scroll depth, author avatar badge, pub date, calculated reading time, generous line height (`1.75`).

### 7.2 Archetype B — Portfolio & Case Studies (`portfolio/[...slug].astro`)
- **Layout Grid**: Full `1200px` case study container (`--case-study-width`).
- **Key UX Elements**: Top `CASE STUDY // [ID]` identifier tag, **4-Column Metric Grid** with large electric scarlet callouts (`#DC2626`), tech stack pill tags (`#1A080B` surface, `#380F15` border), and 2-column visual grid.

### 7.3 Archetype C — Services & Documentation (`services/[...slug].astro`)
- **Layout Grid**: 70/30 asymmetrical split layout with sticky sidebar navigation.
- **Key UX Elements**: 30% sticky sidebar with section anchor navigation powered by `IntersectionObserver`, 70% main document block with `#380F15` borders, and contextual CTA triggering `AccessModal.astro`.

### 7.4 Archetype D — Single Event System (`events/[slug].astro`)
- **Layout Grid**: 70/30 asymmetrical split layout with sticky conversion column.
- **Key UX Elements**: 30% sticky conversion sidebar featuring event date/time block, seat capacity progress bar, `Add to Calendar` dropdown, and `Register Now` trigger; 70% content block featuring Key Takeaways, Speaker Grid, and Agenda Timeline.

---

## 8. Section Color Alternation Rules & Utility Classes Reference

Pages follow a strict section alternation strategy to maintain high visual contrast:

1. **Dark Section (`.section-dark` / `#080303`)**: Hero, Command Control cards, Events section, Portfolio showcase, Team section, Footer Upper.
2. **Light Section (`.section-light` / `#FFFFFF`)**: Trusted By logo strip, Forged for the Extremes block, Footer Lower.

### Utility Classes Table

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
| `.link-arrow` | High-contrast directional hover arrow (`→`) with dynamic gap physics |

---

## 9. Interactive UI Components Specification

```
+-----------------------------------------------------------------------------------+
|                        INTERACTIVE UI COMPONENTS                                  |
|                                                                                   |
|  Header & Dock       AccessModal            BackToTop         CTABand             |
|  Glassmorphic nav    Monospace terminal     Circular radial   3 high-impact       |
|  with fisheye hover  request drawer         scroll indicator  conversion strips   |
+-----------------------------------------------------------------------------------+
```

### 9.1 `Header.astro` & Floating Dock Navigation
- **Visual Design**: Glassmorphic backdrop (`background: rgba(15, 9, 9, 0.7)`, `backdrop-filter: blur(16px)`).
- **Proximity Magnification**: As the cursor approaches dock navigation links, client-side JavaScript calculates cursor distance vectors, scaling hovered items up to `1.24x` and adjacent items to `1.10x`.
- **State Signifiers**: Active nav item highlighted with solid scarlet underline (`scaleX(1)`) and `aria-current="page"` attribute for screen readers.
- **Mobile Menu**: Mobile devices (`<= 991px`) hide the outer `Access Edge` CTA button while sustaining the prominent `.mobile-nav-cta` button inside the slide-over `.mobile-nav` drawer.

### 9.2 `AccessModal.astro` (Terminal Request Drawer)
- **Visual Design**: Dark slide-over drawer styled as a developer terminal with JetBrains Mono font and prompt glyphs (`>`).
- **Interactivity**:
  - Focus lock inside modal when open.
  - Global event listener closing drawer on `Escape` keypress, overlay backdrop click, or `[X]` exit trigger.
  - Triggered globally via `[data-open-modal]` or `.mobile-nav-cta`.

### 9.3 `#read-progress` Bar (Scroll Depth Telemetry)
- **Visual Style**: Top-fixed 3px bar (`linear-gradient(90deg, #DC2626, #EF4444)`), `z-index: 10000`, with a neon red drop-shadow glow.
- **Script Engine**: Updates `width: X%` dynamically based on `window.scrollY / (scrollHeight - innerHeight)`.

### 9.4 Section Anchor Observer (`IntersectionObserver`)
- **Usage**: In Archetype C services documentation pages, tracks scroll depth across `#overview`, `#specs`, and `#pricing`.
- **Feedback**: Automatically toggles `.is-active` class on sticky sidebar anchor links.

### 9.5 Immediate Inline Input Validation & Error Prevention
- **Inline Blur Feedback**: Email input fields validate format on `blur`. Valid inputs show green border (`#10B981`) with `✓ Valid email` message. Invalid inputs show red border (`#EF4444`) with `✗ Enter a valid email address`.
- **Disabled-Until-Valid Submit Trigger**: Submit triggers remain disabled (`opacity: 0.45`, `cursor: not-allowed`) until all mandatory fields pass validation.

### 9.6 `CyberGridBg.astro` (Laser Light Trails)
- **Visual Design**: Animated HTML5 Canvas rendering horizontal & vertical grid lines with hardware-accelerated 60fps red light streak trails.
- **Node Intersection Glow**: Spawns radial pulse glows (`rgba(239, 68, 68, 0.8)`) when light streaks intersect grid coordinate nodes.
- **Performance**: Render loop operates via `requestAnimationFrame`.

### 9.7 `BackToTop.astro` (Scroll Progress Indicator)
- **Visual Design**: Floating circular action button anchored to bottom-right corner (`bottom: 32px`, `right: 32px`).
- **Interactivity**: Radial SVG stroke-dashoffset updates dynamically based on scroll percentage. Hidden when scroll depth is $< 200px$.

### 9.8 `CTABand.astro` (High-Impact Conversion Strips)
- **Visual Design**: Full-width conversion band featuring 3 distinct layout variants (Standard, Terminal Code Box, Dual Action Grid).

### 9.9 `EventCard.astro` & Single Event Conversion Widgets
- **Status Badges**: Visual status indicators (`UPCOMING` green `#22C55E`, `LIVE` red `#EF4444`, `COMPLETED` charcoal `#9CA3AF`, `RECURRING` purple `#A78BFA`).
- **Stacked Avatar Circles**: Multi-speaker avatar stack rendering overlapping initial circles (`margin-left: -8px`) with `+N` count indicators.
- **Dynamic Capacity Bar**: Color-shifting progress bar tracking percentage filled (<70% green, 70-89% amber, 90%+ red).
- **Collapsible Calendar Dropdown**: Accessible menu (`aria-expanded`) offering instant export options for Google Calendar, Apple (.ics), and Outlook.
- **1-Click Copy Link Toast**: Interactive URL copy button that copies `window.location.href` to clipboard and provides immediate `✓ Copied!` feedback for 2 seconds.

---

## 10. Accessibility (a11y) & WCAG AA Compliance

1. **Color Contrast Ratios**: All text elements satisfy WCAG AA minimum 4.5:1 ratio against dark obsidian backgrounds (primary body text `#F3F4F6` achieves 14.8:1 ratio).
2. **Keyboard Navigation & Traversal**: Visible crimson focus outlines on all interactive elements (`:focus-visible`).
3. **Screen Reader Signifiers**: Proper ARIA states (`aria-current="page"`, `aria-expanded`, `aria-modal="true"`, `role="dialog"`).
4. **Reduced Motion Support**: `@media (prefers-reduced-motion: reduce)` disables canvas animations and complex CSS transitions for users with vestibular sensitivities.
5. **Viewport & Overflow Control**: Strict global `overflow-x: hidden` and `max-width: 100%` on `html`, `body`, and `.page-wrap` to prevent accidental horizontal scroll bleeding.
