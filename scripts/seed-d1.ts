#!/usr/bin/env tsx
// scripts/seed-d1.ts
// Run with: npx tsx scripts/seed-d1.ts
// Or via Wrangler: npx wrangler d1 execute fotisp-edge-db --file=migrations/0002_seed.sql

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

const DB_NAME = 'fotisp-edge-db';

// ── Helpers ────────────────────────────────────────────────────────
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
function ts(date: string) { return Math.floor(new Date(date).getTime() / 1000); }
function esc(s: string) { return s.replace(/'/g, "''"); }

// ── Posts ─────────────────────────────────────────────────────────
const posts = [
  {
    id: uuid(), slug: 'first-consulting-contract',
    title: '6 Steps to Getting Your First Consulting Contract',
    excerpt: 'Breaking into consulting is one of the most rewarding career moves you can make.',
    content: 'Breaking into consulting is rewarding but landing your first contract can feel overwhelming...',
    author: 'Admin', categories: '["Business","Consulting"]', published_at: ts('2020-10-14'),
  },
  {
    id: uuid(), slug: 'enforce-non-compete',
    title: 'Can You Enforce a Non-Compete?',
    excerpt: 'Non-compete agreements are one of the most contested areas of employment law.',
    content: 'Non-compete agreements (also called restrictive covenants) are contractual clauses...',
    author: 'Admin', categories: '["Law","Business"]', published_at: ts('2020-10-14'),
  },
  {
    id: uuid(), slug: 'venture-capital-rules',
    title: 'The Rules of Venture Capital in 2024',
    excerpt: 'VC has changed dramatically. Here\'s what founders need to understand about how the game is played.',
    content: 'The venture capital landscape has shifted significantly over the past several years...',
    author: 'Admin', categories: '["Finance","Startups"]', published_at: ts('2020-10-14'),
  },
  {
    id: uuid(), slug: 'growth-hacking-customer-feedback',
    title: 'Growth Hacking With Customer Feedback',
    excerpt: 'The fastest-growing companies don\'t guess — they build systematic feedback loops.',
    content: 'The fastest-growing companies build systematic feedback loops that fuel product decisions...',
    author: 'Admin', categories: '["Marketing","Growth"]', published_at: ts('2020-10-14'),
  },
  {
    id: uuid(), slug: 'brand-identity-that-lasts',
    title: 'How to Build a Brand Identity That Lasts',
    excerpt: 'Brand identity is more than a logo — it\'s every interaction a customer has with your business.',
    content: 'Brand identity is more than a logo. It is the sum of every interaction a customer has...',
    author: 'Admin', categories: '["Marketing","Business"]', published_at: ts('2020-10-14'),
  },
  {
    id: uuid(), slug: 'reducing-operational-complexity',
    title: 'Reducing Operational Complexity Through Automation',
    excerpt: 'Every manual process is a liability. Learn how to identify and automate the right workflows.',
    content: 'Every manual process is a liability. It consumes time, introduces human error...',
    author: 'Admin', categories: '["Operations","Technology"]', published_at: ts('2020-10-14'),
  },
];

// ── Events ────────────────────────────────────────────────────────
const events = [
  {
    id: uuid(), slug: 'q1-strategy-review',
    title: 'Q1 Strategy Review & Planning Session',
    excerpt: 'Annual Q1 strategy review where senior leadership reviews KPI performance.',
    event_date: '2024-03-15', event_time: '09:00 – 17:00',
    location: 'London, UK — Hilton Bankside', is_recurring: 0,
    category_slug: 'corporate', published_at: ts('2024-01-15'),
  },
  {
    id: uuid(), slug: 'digital-transformation-summit',
    title: 'Digital Transformation Summit',
    excerpt: 'A full-day summit for C-suite executives and technology leaders.',
    event_date: '2024-04-22', event_time: '08:30 – 18:00',
    location: 'Athens, Greece — Metropolitan Expo', is_recurring: 0,
    category_slug: 'technology', published_at: ts('2024-02-01'),
  },
];

// ── Portfolio ─────────────────────────────────────────────────────
const portfolio = [
  {
    id: uuid(), slug: 'cutting-costs-to-grow-stronger',
    title: 'Cutting Costs to Grow Stronger',
    excerpt: 'How we helped a consumer goods company reduce operational overhead by 31%.',
    category_slug: 'consumer-markets', published_at: ts('2023-06-01'),
  },
  {
    id: uuid(), slug: 'helping-global-media-firm-optimize',
    title: 'Helping a Global Media Firm Optimize Business',
    excerpt: 'Strategic restructuring for a global media conglomerate with 14 brands.',
    category_slug: 'media', published_at: ts('2023-03-15'),
  },
  {
    id: uuid(), slug: 'app-for-branch-managers',
    title: 'An App That Helps Branch Managers Manage',
    excerpt: 'Mobile-first operations dashboard for 200+ branch managers.',
    category_slug: 'information-technology', published_at: ts('2022-11-10'),
  },
  {
    id: uuid(), slug: 'a-strategic-overhaul',
    title: 'A Strategic Overhaul',
    excerpt: 'Complete strategic repositioning for a legacy media brand navigating disruption.',
    category_slug: 'media', published_at: ts('2022-08-01'),
  },
  {
    id: uuid(), slug: 'enhancing-bi-through-ai',
    title: 'Enhancing Business Intelligence Through AI',
    excerpt: 'Deploying ML models to surface actionable intelligence from enterprise data.',
    category_slug: 'technology', published_at: ts('2022-04-15'),
  },
  {
    id: uuid(), slug: 'improving-care-provider-experience',
    title: 'Improving the Care Provider Experience',
    excerpt: 'UX research and portal redesign for a national healthcare provider network.',
    category_slug: 'healthcare', published_at: ts('2021-12-01'),
  },
];

// ── Services ──────────────────────────────────────────────────────
const services = [
  { id: uuid(), slug: 'kpi-reporting', title: 'KPI Reporting & Performance Analytics', excerpt: 'A measurable value that demonstrates how effectively a company achieves key business objectives.', icon: '📊', published_at: ts('2020-01-01') },
  { id: uuid(), slug: 'it-business-consulting', title: 'IT Business Consulting', excerpt: 'Analyzing business objectives to determine how technology can deliver optimal results.', icon: '💼', published_at: ts('2020-01-01') },
  { id: uuid(), slug: 'strategic-planning', title: 'Strategic Planning', excerpt: 'Long-term direction setting with measurable milestones and success metrics.', icon: '🗺️', published_at: ts('2020-01-01') },
  { id: uuid(), slug: 'reverse-logistics', title: 'Reverse Logistics', excerpt: 'Moving goods from their final destination for value capture or proper disposal.', icon: '🔄', published_at: ts('2020-01-01') },
  { id: uuid(), slug: 'operations-management', title: 'Operations Management', excerpt: 'Streamlining internal processes to maximize efficiency and reduce overhead.', icon: '⚙️', published_at: ts('2020-01-01') },
  { id: uuid(), slug: 'market-research', title: 'Market Research', excerpt: 'Data-driven insights to inform your business development strategy.', icon: '🔍', published_at: ts('2020-01-01') },
];

// ── Team ──────────────────────────────────────────────────────────
const team = [
  { id: uuid(), slug: 'martin-dylon', name: 'Martin Dylon', role: 'Chief Financial Officer', bio: 'Over 20 years of financial leadership experience across financial services, consumer goods, and professional services.', social_json: '{"linkedin":"#","twitter":"#"}' },
  { id: uuid(), slug: 'james-flanagan', name: 'James Flanagan', role: 'Chief Network Officer', bio: '15 years building high-value professional networks across Europe, North America, and Southeast Asia.', social_json: '{"linkedin":"#","twitter":"#"}' },
  { id: uuid(), slug: 'mark-price', name: 'Mark Price', role: 'Chief Diversity Officer', bio: 'Driving inclusive excellence across the organization with deep expertise in DEI strategy and implementation.', social_json: '{"linkedin":"#","twitter":"#"}' },
  { id: uuid(), slug: 'christopher-walker', name: 'Christopher Walker', role: 'Chief Commercial Officer', bio: 'Commercial strategy and revenue growth across complex, multi-market B2B environments.', social_json: '{"linkedin":"#","twitter":"#"}' },
  { id: uuid(), slug: 'mark-weathers', name: 'Mark Weathers', role: 'Tax Leader', bio: 'Specialist in international tax strategy, transfer pricing, and M&A tax advisory.', social_json: '{"linkedin":"#"}' },
  { id: uuid(), slug: 'vicki-cheng', name: 'Vicki Cheng', role: 'Senior Partner', bio: '18 years in organizational transformation, leadership development, and people strategy across 14 countries.', social_json: '{"linkedin":"#","twitter":"#"}' },
];

// ── Build SQL ─────────────────────────────────────────────────────
let sql = `-- fotisp-edge D1 Seed Data\n-- Generated: ${new Date().toISOString()}\n\nBEGIN TRANSACTION;\n\n`;

// Posts
sql += `-- POSTS\n`;
posts.forEach(p => {
  sql += `INSERT OR IGNORE INTO posts (id, slug, title, excerpt, content, author, categories, published_at) VALUES ('${p.id}', '${esc(p.slug)}', '${esc(p.title)}', '${esc(p.excerpt)}', '${esc(p.content)}', '${p.author}', '${p.categories}', ${p.published_at});\n`;
});
sql += `\n`;

// FTS index
sql += `-- FTS INDEX\n`;
posts.forEach(p => {
  sql += `INSERT OR IGNORE INTO posts_fts (rowid, title, excerpt, content) SELECT rowid, title, excerpt, content FROM posts WHERE slug = '${p.slug}';\n`;
});
sql += `\n`;

// Events
sql += `-- EVENTS\n`;
events.forEach(e => {
  sql += `INSERT OR IGNORE INTO fotisp_events (id, slug, title, excerpt, event_date, event_time, location, is_recurring, category_slug, published_at) VALUES ('${e.id}', '${esc(e.slug)}', '${esc(e.title)}', '${esc(e.excerpt)}', '${e.event_date}', '${e.event_time}', '${esc(e.location)}', ${e.is_recurring}, '${e.category_slug}', ${e.published_at});\n`;
});
sql += `\n`;

// Portfolio
sql += `-- PORTFOLIO\n`;
portfolio.forEach(p => {
  sql += `INSERT OR IGNORE INTO fotisp_portfolio (id, slug, title, excerpt, category_slug, published_at) VALUES ('${p.id}', '${esc(p.slug)}', '${esc(p.title)}', '${esc(p.excerpt)}', '${p.category_slug}', ${p.published_at});\n`;
});
sql += `\n`;

// Services
sql += `-- SERVICES\n`;
services.forEach(s => {
  sql += `INSERT OR IGNORE INTO fotisp_services (id, slug, title, excerpt, icon, published_at) VALUES ('${s.id}', '${esc(s.slug)}', '${esc(s.title)}', '${esc(s.excerpt)}', '${s.icon}', ${s.published_at});\n`;
});
sql += `\n`;

// Team
sql += `-- TEAM\n`;
team.forEach(t => {
  sql += `INSERT OR IGNORE INTO fotisp_team (id, slug, name, role, bio, social_json) VALUES ('${t.id}', '${esc(t.slug)}', '${esc(t.name)}', '${esc(t.role)}', '${esc(t.bio)}', '${t.social_json}');\n`;
});

sql += `\nCOMMIT;\n`;

// Write the seed SQL file
const seedPath = join(process.cwd(), 'migrations', '0002_seed.sql');
writeFileSync(seedPath, sql, 'utf-8');
console.log(`✅ Seed SQL written to migrations/0002_seed.sql`);
console.log(`\n📋 Content summary:`);
console.log(`   Posts:     ${posts.length}`);
console.log(`   Events:    ${events.length}`);
console.log(`   Portfolio: ${portfolio.length}`);
console.log(`   Services:  ${services.length}`);
console.log(`   Team:      ${team.length}`);
console.log(`\n🚀 To apply to D1, run:`);
console.log(`   npx wrangler d1 execute fotisp-edge-db --file=migrations/0002_seed.sql`);
console.log(`   (or for local dev: npx wrangler d1 execute fotisp-edge-db --local --file=migrations/0002_seed.sql)`);
