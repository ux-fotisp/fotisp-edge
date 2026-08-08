import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    author: z.string().default('Admin'),
    publishedAt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    featuredImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string().optional(),
    excerpt: z.string().optional(),
    pubDate: z.string().optional(),
    eventDate: z.string().optional(),
    endDate: z.string().optional(),
    timeSlot: z.string().optional(),
    status: z.string().default('UPCOMING'),
    category: z.string().default('Upcoming'),
    eventType: z.string().default('IN_PERSON'),
    capacity: z.object({
      totalSeats: z.number().optional(),
      registeredCount: z.number().optional(),
    }).optional(),
    location: z.object({
      name: z.string(),
      address: z.string().optional(),
      virtualLink: z.string().optional(),
    }).optional(),
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

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/portfolio' }),
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

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string().optional(),
    excerpt: z.string().optional(),
    category: z.enum(['INFRASTRUCTURE', 'SECURITY', 'TELEMETRY']).default('INFRASTRUCTURE'),
    icon: z.string().optional(),
    featuredImage: z.string().optional(),
    order: z.number().default(0),
    deliverables: z.array(z.string()).optional(),
    slaMetrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
    pricingTier: z.string().default('ENTERPRISE // CUSTOM SCOPE'),
    draft: z.boolean().default(false),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    department: z.enum(['LEADERSHIP', 'ENGINEERING', 'RESEARCH', 'SECURITY']).default('ENGINEERING'),
    photo: z.string().optional(),
    avatar: z.string().optional(),
    location: z.string().default('UTC+2 // THESSALONIKI'),
    order: z.number().default(99),
    specialties: z.array(z.string()).default([]),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
    social: z.object({
      github: z.string().optional(),
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
      scholar: z.string().optional(),
      facebook: z.string().optional(),
    }).optional(),
    socials: z.object({
      github: z.string().url().or(z.string()).optional(),
      linkedin: z.string().url().or(z.string()).optional(),
      twitter: z.string().url().or(z.string()).optional(),
      scholar: z.string().url().or(z.string()).optional(),
    }).optional(),
    officeHoursUrl: z.string().optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    pubDate: z.date().or(z.string().transform(str => new Date(str))),
    category: z.enum(['PRESS RELEASES', 'PRODUCT', 'OPERATIONS', 'THOUGHT LEADERSHIP']).default('PRESS RELEASES'),
    author: z.string().default('EDGE Intelligence Team'),
    readingTime: z.string().default('4 min read'),
    featuredImage: z.string().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default(['EDGE', 'INFRASTRUCTURE']),
  }),
});

export const collections = { posts, events, portfolio, services, team, news };
