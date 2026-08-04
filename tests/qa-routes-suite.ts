// tests/qa-routes-suite.ts

const BASE_URL = 'http://127.0.0.1:4321';

const routesToTest = [
  { path: '/', expectedTitle: 'fotisp' },
  { path: '/blog', expectedTitle: 'News' },
  { path: '/blog/first-consulting-contract', expectedTitle: '6 Steps to Getting Your First Consulting Contract' },
  { path: '/events', expectedTitle: 'Events' },
  { path: '/events/q1-strategy-review', expectedTitle: 'Q1 Strategy Review' },
  { path: '/portfolio', expectedTitle: 'Case Studies' },
  { path: '/portfolio/cutting-costs-to-grow-stronger', expectedTitle: 'Cutting Costs' },
  { path: '/services', expectedTitle: 'Services' },
  { path: '/services/kpi-reporting', expectedTitle: 'KPI Reporting' },
  { path: '/team', expectedTitle: 'Our Team' },
  { path: '/team/martin-dylon', expectedTitle: 'Martin Dylon' },
  { path: '/contact', expectedTitle: 'Contact Us' },
  { path: '/api/weather', isApi: true },
  { path: '/api/search?q=Consulting', isApi: true },
];

async function runRouteQA() {
  console.log('====================================================');
  console.log('🧪 RUNNING ROUTING & PAGE CONTENT QA SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  for (const route of routesToTest) {
    const url = `${BASE_URL}${route.path}`;
    try {
      const res = await fetch(url);
      const statusOk = res.status === 200;
      
      if (route.isApi) {
        const json = await res.json();
        if (statusOk && json) {
          console.log(`✅ [PASS] API Route: ${route.path} (HTTP 200 OK)`);
          passed++;
        } else {
          console.error(`❌ [FAIL] API Route: ${route.path} (HTTP ${res.status})`);
          failed++;
        }
      } else {
        const html = await res.text();
        const hasContent = html.length > 500;
        const titleMatch = html.includes(route.expectedTitle);

        if (statusOk && hasContent && titleMatch) {
          console.log(`✅ [PASS] Page Route: ${route.path} (HTTP 200 OK, Title/Content verified)`);
          passed++;
        } else {
          console.error(`❌ [FAIL] Page Route: ${route.path} — Status: ${res.status}, Length: ${html.length}, Expected Match: "${route.expectedTitle}"`);
          failed++;
        }
      }
    } catch (err: any) {
      console.error(`❌ [FAIL] Route: ${route.path} — Fetch Error: ${err.message}`);
      failed++;
    }
  }

  console.log('\n====================================================');
  console.log(`📊 ROUTING QA RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) process.exit(1);
}

runRouteQA().catch(err => {
  console.error('QA Test execution failed:', err);
  process.exit(1);
});
