# EDGE — Content Layer & Collections Guide

**Author**: Fotis Pastrakis  
**Content Directory**: `src/content/`  

---

## 1. Overview

The **EDGE** content layer is powered by Astro's native Content Layer and MDX integrations. Content is organized into type-safe Markdown/MDX collections:

1. **`services/`**: Infrastructure & consulting offerings
2. **`portfolio/`**: Client case studies & mission reports
3. **`events/`**: Strategy sessions, webinars & keynotes
4. **`blog/`**: Technical insights & announcements
5. **`team/`**: Operational leadership & engineering profiles

---

## 2. Collection Schemas (`src/content/config.ts`)

### Services Collection
```typescript
import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    icon: z.string().optional(),
    featuredImage: z.string().optional(),
    order: z.number().default(0),
  }),
});
```

### Portfolio Collection
```typescript
const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    category: z.string().optional(),
    excerpt: z.string().optional(),
    featuredImage: z.string().optional(),
    publishDate: z.date().optional(),
  }),
});
```

### Events Collection
```typescript
const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    eventDate: z.string(),
    eventTime: z.string().optional(),
    location: z.string().optional(),
    isRecurring: z.boolean().default(false),
    featuredImage: z.string().optional(),
  }),
});
```

---

## 3. Sample MDX File Format

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

## 4. Dynamic Route Pre-rendering Strategy

Detail pages support both static pre-rendering and Cloudflare server-side rendering:

```astro
---
import { getCollection } from 'astro:content';

// Dynamic params lookup from content collection
const { slug } = Astro.params;
const entries = await getCollection('portfolio');
const entry = entries.find(c => c.slug === slug);
const { Content } = await entry.render();
---
```

---

## 5. Cloudflare D1 Database Seeding (Optional Dynamic Layer)

For environments utilizing Cloudflare D1 SQL database storage:

- **Seeding Script**: Available via project seeds (`db/seed.sql`).
- **Collections Sync**: Populates posts, events, services, and team tables with identical schema fields for edge database queries.
