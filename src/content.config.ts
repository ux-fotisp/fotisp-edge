import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/posts' }),
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

const events = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    eventDate: z.string().optional(),
    eventTime: z.string().optional(),
    location: z.string().optional(),
    isRecurring: z.boolean().default(false),
    recurrence: z.string().optional(),
    featuredImage: z.string().optional(),
    categorySlug: z.string().optional(),
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
    excerpt: z.string().optional(),
    icon: z.string().optional(),
    featuredImage: z.string().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    social: z.object({
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
      facebook: z.string().optional(),
    }).optional(),
    order: z.number().default(0),
  }),
});

export const collections = { posts, events, portfolio, services, team };
