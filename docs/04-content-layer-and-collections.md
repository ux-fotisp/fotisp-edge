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

### Portfolio Collection
```typescript
const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    client: z.string().optional(),
    category: z.string().optional(),
    featuredImage: z.string().optional(),
    publishedAt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});
```

### Services Collection
```typescript
const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    icon: z.string().optional(),
    featuredImage: z.string().optional(),
    order: z.number().default(0),
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

---

## 4. Sample MDX File Format

### Creating a Service Entry (`src/content/services/kpi-reporting.mdx`)
```mdx
---
title: "KPI Reporting"
excerpt: "Real-time key performance indicator measurement for operational clarity."
icon: "📊"
order: 1
---

KPI Reporting is an essential practice for any performance-driven organization. Our consultants work closely with your team to identify the most impactful metrics.

## Our Approach
We begin with a thorough audit of your existing measurement frameworks.

## Key Benefits
- Real-time performance visibility
- Data-driven decision making
- Custom dashboards for each stakeholder level
```

---

## 5. Dynamic Route Rendering Strategy

Detail pages support both static pre-rendering and Cloudflare server-side rendering:

```astro
---
import { getCollection } from 'astro:content';

const { slug } = Astro.params;
const entries = await getCollection('portfolio');
const entry = entries.find(c => c.id === slug || c.slug === slug);
const { Content } = await entry.render();
---
```

---

## 6. Cloudflare D1 Database Seeding (Optional Dynamic Layer)

For environments utilizing Cloudflare D1 SQL database storage:

- **Seeding Script**: Available via project seeds (`migrations/0002_seed.sql` & `scripts/seed-d1.ts`).
- **Collections Sync**: Populates posts, events, services, and team tables with identical schema fields for edge database queries.
