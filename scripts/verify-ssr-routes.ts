import { spawn } from 'child_process';

const routesToTest = [
  '/',
  '/blog',
  '/blog/brand-identity-that-lasts',
  '/portfolio',
  '/portfolio/a-strategic-overhaul',
  '/services',
  '/services/it-business-consulting',
  '/team',
  '/events',
  '/contact',
];

async function verifyRoutes() {
  console.log('🚀 Launching Astro Dev Server for SSR Health Inspection...');
  const devServer = spawn('npx', ['astro', 'dev', '--port', '4399'], {
    shell: true,
    stdio: 'ignore',
  });

  // Give server 5 seconds to warm up
  await new Promise((resolve) => setTimeout(resolve, 5000));

  let passed = 0;
  let failed = 0;

  for (const route of routesToTest) {
    const url = `http://127.0.0.1:4399${route}`;
    try {
      const res = await fetch(url);
      const html = await res.text();
      if (res.status === 200 && html.includes('<body')) {
        console.log(`✅ [200 OK] Route verified: ${route}`);
        passed++;
      } else {
        console.error(`❌ [FAIL ${res.status}] Route failed: ${route}`);
        failed++;
      }
    } catch (err) {
      console.error(`❌ [ERROR] Could not connect to route: ${route}`);
      failed++;
    }
  }

  // Kill dev server
  devServer.kill();

  console.log('\n====================================================');
  console.log(`📊 SSR ROUTE HEALTH RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

verifyRoutes().catch((err) => {
  console.error(err);
  process.exit(1);
});
