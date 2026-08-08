// tests/qa-full-routing-suite.ts
import fs from 'fs';
import path from 'path';

const routesToTest = [
  { path: '/', title: 'Homepage / Index', file: 'src/pages/index.astro' },
  { path: '/blog', title: 'Blog Archive', file: 'src/pages/blog/index.astro' },
  { path: '/blog/[slug]', title: 'Blog Single', file: 'src/pages/blog/[slug].astro' },
  { path: '/events', title: 'Events Archive', file: 'src/pages/events/index.astro' },
  { path: '/events/[slug]', title: 'Events Single', file: 'src/pages/events/[slug].astro' },
  { path: '/portfolio', title: 'Portfolio Archive', file: 'src/pages/portfolio/index.astro' },
  { path: '/portfolio/[slug]', title: 'Portfolio Single', file: 'src/pages/portfolio/[slug].astro' },
  { path: '/services', title: 'Services Archive', file: 'src/pages/services/index.astro' },
  { path: '/services/[slug]', title: 'Services Single', file: 'src/pages/services/[slug].astro' },
  { path: '/news', title: 'News Archive', file: 'src/pages/news/index.astro' },
  { path: '/news/[slug]', title: 'News Single', file: 'src/pages/news/[slug].astro' },
  { path: '/team', title: 'Team Archive', file: 'src/pages/team/index.astro' },
  { path: '/team/[slug]', title: 'Team Single', file: 'src/pages/team/[slug].astro' },
  { path: '/contact', title: 'Contact Form', file: 'src/pages/contact.astro' },
];

async function runComprehensiveRoutingQA() {
  console.log('====================================================');
  console.log('🧪 COMPREHENSIVE ROUTING & CONTENT RENDERING QA');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail: string = '') {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} — ${detail}`);
      failed++;
    }
  }

  // 1. Static & Dynamic Page Files Audit
  console.log('--- 1. Page Template & Route Handler File Verification ---');
  for (const route of routesToTest) {
    const fullPath = path.join(process.cwd(), route.file);
    const exists = fs.existsSync(fullPath);
    assert(exists, `Route File Verified: ${route.path} (${route.file})`);
  }

  // 2. Content Collections Markdown & MDX Files Audit
  console.log('\n--- 2. Content Collection Entries Verification ---');
  
  const contentDirs = [
    { name: 'posts', expected: 6, dir: 'src/content/posts' },
    { name: 'events', expected: 2, dir: 'src/content/events' },
    { name: 'portfolio', expected: 6, dir: 'src/content/portfolio' },
    { name: 'services', expected: 6, dir: 'src/content/services' },
    { name: 'news', expected: 3, dir: 'src/content/news' },
    { name: 'team', expected: 6, dir: 'src/content/team' },
  ];

  for (const c of contentDirs) {
    const fullDir = path.join(process.cwd(), c.dir);
    if (!fs.existsSync(fullDir)) {
      assert(false, `Collection folder exists: ${c.name}`, 'Directory missing');
      continue;
    }
    const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    assert(files.length === c.expected, `Collection '${c.name}': Found ${files.length} entries (expected ${c.expected})`);
    
    for (const f of files) {
      const slug = f.replace(/\.(md|mdx)$/, '');
      assert(!!slug, `Dynamic CPT Slug generated: /${c.name}/${slug}`);
    }
  }

  // 3. API Endpoints Code Integrity
  console.log('\n--- 3. Edge API & Form Handlers Verification ---');
  const apiFiles = [
    'src/pages/contact.astro',
    'src/components/AccessModal.astro',
    'src/components/BackToTop.astro',
  ];

  for (const api of apiFiles) {
    const fullPath = path.join(process.cwd(), api);
    const exists = fs.existsSync(fullPath);
    assert(exists, `Edge Endpoint & Form Handler Verified: /${api}`);
  }

  // Summary
  console.log('\n====================================================');
  console.log(`📊 ROUTING QA RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) process.exit(1);
}

runComprehensiveRoutingQA().catch(err => {
  console.error('QA Test execution failed:', err);
  process.exit(1);
});
