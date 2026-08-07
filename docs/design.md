# EDGE — UI/UX Design System & Experience Architecture

**Author**: Senior UX Designer  
**UX Framework**: Don Norman Core UX Heuristics + Dark Obsidian Visual System  
**Target Platform**: EDGE Platform (Astro 5.x / 7.x & Cloudflare Pages)  

---

## 1. Design System Philosophy & Aesthetic Intent

The **EDGE** platform visual system is engineered for high-stakes digital operations, modern engineering consultancies, and executive decision-makers. The design philosophy centers on **surgical precision**, **high visual contrast**, **zero latency**, and **purposeful motion**.

```
+-----------------------------------------------------------------------------------+
|                           EDGE VISUAL IDENTITY PILLARS                           |
|                                                                                   |
|  1. OBSIDIAN CANVAS      2. CRIMSON TELEMETRY     3. TYPOGRAPHIC READABILITY     |
|  Deep dark backdrop      High-contrast scarlet    Inter geometric sans paired    |
|  with laser grid accents  accents & glows          with JetBrains Mono data      |
+-----------------------------------------------------------------------------------+
```

### 1.1 Color Palette & Token Hierarchy

| Token Name | Hex / Value | Strategic Role & UX Purpose |
|---|---|---|
| `--color-bg-primary` | `#0B0C10` | Dark obsidian primary background canvas |
| `--color-surface-dark` | `#15181F` | Surface card & container background |
| `--color-surface-elevated` | `#1F2833` | Interactive hover state panel surface |
| `--color-border-crimson` | `#380F15` | Subtle 1px structural container border |
| `--color-border-hover` | `#6B1D25` | Active hover container border elevation |
| `--color-accent-scarlet` | `#DC2626` | Primary action indicator, active laser grid line & CTA button |
| `--color-accent-glow` | `rgba(220, 38, 38, 0.25)` | Micro-glow aura behind interactive triggers |
| `--color-text-primary` | `#F3F4F6` | High-contrast white headline text (WCAG AAA) |
| `--color-text-secondary` | `#9CA3AF` | Muted silver body text for relaxed reading |
| `--color-text-muted` | `#6B7280` | Monospace telemetry label text |

---

## 2. Don Norman Core UX Heuristics Integration

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

### 2.1 Visibility of System Status
- **Scroll Depth Telemetry (`#read-progress`)**: On Archetype A editorial pages, a 3px electric scarlet progress bar fixed to the top viewport edge visually communicates scroll percentage.
- **Seat Capacity Progress Bar (`EventCard` & `events/[slug]`)**: Visual progress indicators display `registeredCount / totalSeats` with color-coded status badges (`UPCOMING`, `LIVE`, `COMPLETED`, `RECURRING`).
- **Active Navigation Tracking (`IntersectionObserver`)**: On Archetype C and D sub-pages, the sticky sidebar navigation dynamically updates active section highlights as the user scrolls through `#overview`, `#specs`, and `#pricing`.

### 2.2 Match Between System & Real World
- **Terminal Access Drawer (`AccessModal.astro`)**: Uses monospace styling, command prompt glyphs (`>`), and system telemetry phrasing to align with developer and operational mental models.
- **Calendar & Time Slot Integration**: Event time slots and location blocks present human-readable timezones alongside an interactive `.ics` Add-to-Calendar trigger.

### 2.3 User Control & Freedom
- **Slide-Over Terminal Modal**: Non-intrusive drawer overlay with clear exit pathways: pressing `Escape`, clicking the dark glass backdrop overlay, or selecting the `[X]` exit button.
- **Sticky Back-to-Top Indicator (`BackToTop.astro`)**: A floating circular trigger featuring an SVG radial scroll indicator allows instant restoration to page top from anywhere on long pages.

### 2.4 Consistency & Standards
- **Strict Button Hierarchy**:
  - **Primary CTA**: Solid Scarlet (`#DC2626`) fill with white text.
  - **Secondary CTA**: Crimson Outlined (`#380F15` border) with red hover fill.
  - **Tertiary Action**: Muted glass pill badge.
- **Archetype Page Engine**: Every page strictly adheres to one of four standardized sub-page archetypes.

### 2.5 Error Prevention & Clear Affordances
- **Inline Blur Validation**: Form fields validate on `blur`. Submit triggers remain visually disabled until all required fields satisfy formatting rules.
- **Focus Rings & Hover Affordances**: Interactive elements feature a 2px crimson outline glow on focus, visually signposting interactive affordances.

---

## 3. Sub-Page Archetype Layout Engine (OOUX Structural Layouts)

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

### 3.1 Archetype A — Editorial & Blog (`blog/[...slug].astro`)
- **Layout Grid**: Single centered reader column constrained to `720px` max-width.
- **Key UX Elements**:
  - Top-fixed `#read-progress` bar tracking scroll depth.
  - Author avatar badge, pub date, and calculated reading time.
  - Generous line height (`1.75`) with high-contrast `#F3F4F6` body text.

### 3.2 Archetype B — Portfolio & Case Studies (`portfolio/[...slug].astro`)
- **Layout Grid**: Full `1200px` case study container.
- **Key UX Elements**:
  - Top `CASE STUDY // [ID]` identifier tag.
  - **4-Column Metric Grid**: Large numeric callouts in electric scarlet (`#DC2626`) showing measurable performance gains.
  - Tech stack pill tags (`#1A080B` surface, `#380F15` crimson border).
  - Two-column grid pairing architectural diagram visual panel with MDX content.

### 3.3 Archetype C — Services & Documentation (`services/[...slug].astro`)
- **Layout Grid**: 70/30 asymmetrical split layout with sticky sidebar.
- **Key UX Elements**:
  - **30% Sticky Sidebar**: Contains section anchor navigation powered by `IntersectionObserver`.
  - **70% Main Document Block**: Structured documentation blocks separated by 1px `#380F15` borders.
  - Contextual primary CTA button opening `AccessModal.astro`.

### 3.4 Archetype D — Single Event System (`events/[slug].astro`)
- **Layout Grid**: 70/30 asymmetrical split layout with sticky conversion column.
- **Key UX Elements**:
  - **30% Sticky Conversion Sidebar**: Features event date/time block, live seat capacity progress bar, `Add to Calendar` dropdown button, and `Register Now` trigger.
  - **70% Content Block**: Key Takeaways highlight box, Speaker Grid with avatar circles and roles, and interactive Agenda Timeline grid.

---

## 4. Interactive Component Systems & UX Affordances

```
+-----------------------------------------------------------------------------------+
|                        INTERACTIVE UI COMPONENTS                                  |
|                                                                                   |
|  Header & Dock       AccessModal            BackToTop         CTABand             |
|  Glassmorphic nav    Monospace terminal     Circular radial   3 high-impact       |
|  with fisheye hover  request drawer         scroll indicator  conversion strips   |
+-----------------------------------------------------------------------------------+
```

### 4.1 `Header.astro` & AstroAnimate Dock
- **Visual Design**: Glassmorphic backdrop (`backdrop-filter: blur(12px)` with `rgba(11, 12, 16, 0.85)` surface).
- **AstroAnimate Dock Mechanics**: Micro-interaction scaling on hover (`transform: scale(1.05)`) with smooth CSS easing.
- **State Signifiers**: Active nav item highlighted with solid scarlet border bottom and `aria-current="page"` attribute for screen readers.

### 4.2 `AccessModal.astro` (Terminal Drawer)
- **Visual Design**: Dark slide-over drawer styled as a developer terminal with JetBrains Mono font.
- **Interactivity**:
  - Focus lock inside modal when open.
  - Real-time inline field validation.
  - Global event listener closing drawer on `Escape` keypress.

### 4.3 `CyberGridBg.astro` (Laser Grid Background)
- **Visual Design**: Animated HTML5 Canvas rendering horizontal & vertical grid lines with hardware-accelerated 60fps red light trails.
- **Performance**: Render loop runs on `requestAnimationFrame`, pausing execution when tab is inactive to preserve CPU/GPU resources.

### 4.4 `BackToTop.astro` (Scroll Depth Indicator)
- **Visual Design**: Floating action button anchored to bottom-right corner.
- **Interactivity**: Radial SVG dash-offset updates dynamically based on `window.scrollY / totalScrollHeight`. Hidden when scroll depth $< 200px$.

### 4.5 `CTABand.astro` (High-Impact Conversion Strips)
- **Visual Design**: Full-width conversion band featuring 3 distinct layout variants (Standard, Terminal Code Box, Dual Action Grid).
- **Interactivity**: Hover glow transition on primary CTA triggers.

---

## 5. CSS Tokens & Micro-Animations Specification

### 5.1 CSS Custom Properties (`src/styles/tokens.css`)

```css
:root {
  /* Colors */
  --color-bg-primary: #0B0C10;
  --color-surface-dark: #15181F;
  --color-surface-elevated: #1F2833;
  --color-border-crimson: #380F15;
  --color-border-hover: #6B1D25;
  --color-accent-scarlet: #DC2626;
  --color-text-primary: #F3F4F6;
  --color-text-secondary: #9CA3AF;

  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 5.2 Micro-Animations & Hardware Acceleration
- **GPU-Promoted Animation Layer**: All interactive animations exclusively manipulate `transform` and `opacity` to avoid layout thrashing and maintain 60fps performance.
- **Card Hover Physics**:
  ```css
  .edge-card {
    transition: transform var(--transition-normal), border-color var(--transition-normal);
  }
  .edge-card:hover {
    transform: translateY(-4px);
    border-color: var(--color-border-hover);
  }
  ```

---

## 6. Accessibility (a11y) & WCAG AA Compliance

1. **Color Contrast Ratios**: All text elements satisfy WCAG AA minimum 4.5:1 ratio against dark obsidian backgrounds (primary body text `#F3F4F6` achieves 14.8:1 ratio).
2. **Keyboard Navigation & Traversal**: Visible crimson focus outlines on all interactive elements (`:focus-visible`).
3. **Screen Reader Signifiers**: Proper ARIA states (`aria-current="page"`, `aria-expanded`, `aria-modal="true"`, `role="dialog"`).
4. **Reduced Motion Support**: `@media (prefers-reduced-motion: reduce)` disables canvas animations and complex CSS transitions for users with vestibular sensitivities.
