# EDGE — Interactive Micro-Animations & Components

**Author**: Fotis Pastrakis  
**Components Directory**: `src/components/`  
**UX Methodology**: Don Norman Immediate & Meaningful Feedback, System Status, Error Prevention  

---

## 1. Floating Dock Navigation (`Header.astro` & `navigation.css`)

The desktop navigation header features an **AstroAnimate-style floating glassmorphic dock** with proximity-based icon scaling and active route indicators:

```
+-----------------------------------------------------------------------+
|  [LOGO]    ( Home | Services | Portfolio | News | Contact )  [ACCESS] |
+-----------------------------------------------------------------------+
```

### Key Mechanics:
- **`aria-current="page"` Route Status**: Automatically detects active routes via `Astro.url.pathname`, setting `aria-current="page"` and applying a scarlet red underline accent (`scaleX(1)`).
- **Proximity Magnification**: As the mouse approaches a dock navigation item, client-side JS calculates the distance vector between the cursor and the item center.
- **Dynamic Scale Factors**: Hovered items scale up to `1.24x`, adjacent items scale to `1.10x`, creating a fluid wave deformation.
- **Glassmorphic Backdrop**: Built with `background: rgba(15, 9, 9, 0.7)` and `backdrop-filter: blur(16px)`.

---

## 2. Scroll Progress Bar (`#read-progress`)

For editorial and long-form pages (`blog/[...slug].astro`), system status visibility is maintained via a top-fixed reading progress bar:

```typescript
const bar = document.getElementById('read-progress');
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (bar) bar.style.width = `${pct}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
```

- **Visual Style**: Top-fixed 3px bar (`linear-gradient(90deg, #DC2626, #EF4444)`), `z-index: 10000`, with a neon red drop-shadow glow.

---

## 3. Section Anchor Observer (`IntersectionObserver`)

In Archetype C pages (`services/[...slug].astro`), sticky sidebar section navigation links update dynamically based on viewport scroll depth:

```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      sectionLinks.forEach(link => {
        link.classList.toggle('is-active', link.dataset.section === entry.target.id);
      });
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });
```

- **Section Links**: Automatically highlight anchors (`#overview`, `#specs`, `#pricing`), providing instant orientation.

---

## 4. Immediate Inline Input Validation & Error Prevention

In accordance with Don Norman's *Feedback* and *Error Prevention* rules, forms (`contact.astro`, `services/[...slug].astro`, `AccessModal.astro`) implement real-time validation:

- **Inline Blur Feedback**: Email inputs validate format on `blur`. Valid inputs show a green border (`#10B981`) and `✓ Valid email` message. Invalid inputs display a red border (`#EF4444`) and `✗ Enter a valid email address`.
- **Disabled-Until-Valid Submit Button**: Submit triggers remain disabled (`opacity: 0.45`, `cursor: not-allowed`) until all mandatory fields satisfy validation constraints.

```typescript
function updateSubmitState() {
  const valid = validateEmail(emailInput.value);
  submitBtn.disabled = !valid;
  submitBtn.style.opacity = valid ? '1' : '0.45';
  submitBtn.style.cursor = valid ? 'pointer' : 'not-allowed';
}
```

---

## 5. CyberGrid Light Trails (`<CyberGridBg.astro>`)

The hero section features an interactive **HTML5 Canvas component** that renders dynamic neon red light trails across a grid layout.

- **Canvas Rendering**: Renders a 60px grid matrix operating at 60fps on a dedicated 2D canvas context.
- **Light Streak Vectors**: Spawns randomized horizontal and vertical light streaks (`#DC2626` / `#EF4444`) moving across grid coordinate lines.
- **Intersection Node Glows**: Detects coordinate intersections between horizontal and vertical streaks, drawing a radial pulse glow (`rgba(239, 68, 68, 0.8)`).

---

## 6. ACCESS EDGE Slide-Over Terminal Drawer (`<AccessModal.astro>`)

- **Slide-Over Drawer**: Transitions in from the right viewport edge (`transform: translateX(0)`).
- **High-Tech Inputs**: Dark input fields with red focus rings (`#DC2626`) and pulse indicators.
- **Handshake Feedback**: Interactive submission script providing instant transmission status updates.

---

## 7. Real-Time Mouse Spotlight on Feature Cards

Cards on the homepage (`.feature-card`) track cursor coordinates dynamically (`--mouse-x`, `--mouse-y`), illuminating a 400px radial red neon spotlight beneath the cursor.

---

## 9. Events Archive & Single Card Components (`<EventCard.astro>`)

- **Status Badges**: Visual status indicators (`UPCOMING` green `#22C55E`, `LIVE` red `#EF4444`, `COMPLETED` charcoal `#9CA3AF`, `RECURRING` purple `#A78BFA`).
- **Stacked Avatar Circles**: Multi-speaker avatar stack rendering overlapping initial circles (`margin-left: -8px`) with `+N` count indicators.
- **Dynamic Capacity Bar**: Color-shifting progress bar tracking percentage filled (<70% green, 70-89% amber, 90%+ red).
- **Crimson Hover Glow**: Card border transitions to `#DC2626` with a `0 0 24px rgba(220,38,38,0.2)` glow and -2px vertical lift.

---

## 10. Single Event Conversion & Sharing Widgets (`events/[slug].astro`)

- **Collapsible Calendar Dropdown**: Accessible menu (`aria-expanded`) offering instant export options for Google Calendar, Apple (.ics), and Outlook.
- **1-Click Copy Link Toast**: Interactive URL copy button that copies `window.location.href` to clipboard and provides immediate `✓ Copied!` feedback for 2 seconds.
- **Sticky Conversion Sidebar**: Sticky sidebar (`top: 100px`) locking registration CTAs and event specs in view during content scroll.

