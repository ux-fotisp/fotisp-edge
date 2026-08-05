# EDGE — Content Layer & Collections Guide

**Author**: Fotis Pastrakis  
**Content Directory**: `src/content/`  
**UX Methodology**: Archetype Page Routing (Editorial, Portfolio, Services)  

---

## 1. Overview

The **EDGE** content layer is powered by Astro's native Content Layer and MDX integrations. Content is organized into type-safe Markdown/MDX collections paired with specialized archetype templates:

1. **`blog/` (Archetype A — Editorial)**: News & technical insights posts (`blog/[...slug].astro`)
2. **`portfolio/` (Archetype B — Case Studies)**: Client case studies & mission reports (`portfolio/[...slug].astro`)
3. **`services/` (Archetype C — Documentation)**: Infrastructure & consulting offerings (`services/[...slug].astro`)
4. **`events/`**: Strategy sessions, webinars & keynotes (`events/[...slug].astro`)
5. **`team/`**: Operational leadership & engineering profiles (`team/[...slug].astro`)

---

## 2. Collection Schemas (`src/content.config.ts`)

### Blog Collection (`posts`)
```typescript
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    author: z.string().default('Admin'),
    publishedAt: z.string(),
    categories: z.array(z.string()).default([]),
    featuredImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});
```

### Events Collection (`src/content.config.ts`)
```typescript
const events = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string().optional(),
    excerpt: z.string().optional(),
    pubDate: z.string().optional(),
    eventDate: z.string(),
    endDate: z.string().optional(),
    timeSlot: z.string(),                         // e.g. "18:00 – 20:30 UTC"
    status: z.enum(['UPCOMING', 'LIVE', 'COMPLETED', 'RECURRING']).default('UPCOMING'),
    category: z.enum(['Upcoming', 'Recurring', 'Past']).default('Upcoming'),
    eventType: z.enum(['VIRTUAL', 'HYBRID', 'IN_PERSON']).default('IN_PERSON'),
    capacity: z.object({
      totalSeats: z.number().optional(),
      registeredCount: z.number().optional(),
    }).optional(),
    location: z.object({
      name: z.string(),
      address: z.string().optional(),
      virtualLink: z.string().optional(),
    }),
    featuredImage: z.string().optional(),
    registrationUrl: z.string().optional(),
    keyTakeaways: z.array(z.string()).optional(),
    speakers: z.array(z.object({
      name: z.string(),
      role: z.string(),
      company: z.string(),
      avatar: z.string().optional(),
    })).optional(),
    agenda: z.array(z.object({
      time: z.string(),
      topic: z.string(),
      speakerName: z.string().optional(),
      description: z.string().optional(),
    })).optional(),
    draft: z.boolean().default(false),
  }),
});
```

---

## 3. Sub-Page Archetype Rendering Mapping

Each collection renders through its dedicated UX archetype template:

| Collection | Route File | Archetype | Unique UX Elements |
|---|---|---|---|
| `blog` | `src/pages/blog/[...slug].astro` | **Archetype A (Editorial)** | 720px reader column, `#read-progress` top scroll bar, author avatar row, reading time |
| `portfolio` | `src/pages/portfolio/[...slug].astro` | **Archetype B (Case Study)** | 1200px full grid, `CASE STUDY // ID` badge, 4-col scarlet metric grid, tech stack badges |
| `services` | `src/pages/services/[...slug].astro` | **Archetype C (Services)** | 70/30 split layout, sticky sidebar with IntersectionObserver anchor nav, inline validation |
| `events` | `src/pages/events/[slug].astro` | **Archetype D (Events System)** | 70/30 split layout, sticky conversion sidebar with capacity bar, Add to Calendar dropdown, agenda grid & speaker showcase |

---

## 4. Sample MDX File Format

### Creating an Event Entry (`src/content/events/q1-strategy-review.mdx`)
```mdx
---
title: "Q1 Strategy Review & Planning Session"
tagline: "Calibrating Direction — Numbers, Markets, and the Year Ahead"
excerpt: "Annual strategy review where senior leadership reviews KPI performance and market shifts."
eventDate: "2024-03-15"
timeSlot: "09:00 – 17:00 GMT"
status: "COMPLETED"
category: "Past"
eventType: "HYBRID"
capacity:
  totalSeats: 80
  registeredCount: 74
location:
  name: "Hilton London Bankside"
  address: "London SE1 0UG, United Kingdom"
speakers:
  - name: "James Flanagan"
    role: "Chief Network Officer"
    company: "EDGE Platform"
keyTakeaways:
  - "Q4 2023 KPI performance analysis across 6 departments"
  - "Market intelligence briefing on emerging sector trends"
---

# Strategic Roadmap & Objectives
Full event summary and body content...
```

---

## 5. Dynamic Route Rendering Strategy (Astro 7 Content Layer)

Detail pages support both static pre-rendering and Cloudflare server-side rendering using the Astro 7 Content Layer `render(entry)` API:

```astro
---
import { getEntry, render } from 'astro:content';

const { slug } = Astro.params;
const entry = await getEntry('events', slug!);
if (!entry) return Astro.redirect('/404');

const event = entry.data;
const { Content } = await render(entry);
---
```

---

## 6. Cloudflare D1 Database Seeding (Optional Dynamic Layer)

For environments utilizing Cloudflare D1 SQL database storage:

- **Seeding Script**: Available via project seeds (`migrations/0002_seed.sql` & `scripts/seed-d1.ts`).
- **Collections Sync**: Populates posts, events, services, and team tables with identical schema fields for edge database queries.
