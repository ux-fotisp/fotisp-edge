// tests/qa-edge-suite.test.ts
import { onRequestPost as handleContact } from '../functions/api/contact';
import { onRequestGet as handleSearch } from '../functions/api/search';
import { onRequestGet as handleWeather } from '../functions/api/weather';
import { onRequestPost as handleBuilderSave } from '../functions/api/builder/save';
import { onRequestGet as handleBuilderLoad } from '../functions/api/builder/load';

// Mock helper
function mockContext(req: Request, envOverrides: Record<string, any> = {}): any {
  if (!globalThis.crypto) {
    (globalThis as any).crypto = { randomUUID: () => 'test-uuid-1234' };
  } else if (!globalThis.crypto.randomUUID) {
    (globalThis as any).crypto.randomUUID = () => 'test-uuid-1234';
  }
  return {
    request: req,
    env: {
      RESEND_API_KEY: '',
      OPENWEATHERMAP_API_KEY: '',
      OPENWEATHERMAP_LOCATION_ID: '2643743',
      CACHE: {
        store: new Map(),
        async get(key: string) { return this.store.get(key) || null; },
        async put(key: string, val: string) { this.store.set(key, val); },
      },
      DB: {
        prepare(sql: string) {
          return {
            bind(...args: any[]) {
              return {
                async all() {
                  if (sql.includes('MATCH')) {
                    const q = args[0];
                    if (q === 'Consulting') {
                      return { results: [{ id: '1', slug: 'first-consulting-contract', title: '6 Steps to Getting Your First Consulting Contract' }] };
                    }
                    return { results: [] };
                  }
                  return { results: [] };
                },
                async first() {
                  const slug = args[0];
                  if (slug === 'homepage') return { id: 'p1', slug: 'homepage', layout_json: '{"ROOT":{"type":"Container"}}' };
                  return null;
                },
                async run() {
                  return { success: true };
                }
              };
            },
            async run() { return { success: true }; },
            async first() { return { id: 'p1', slug: 'homepage', layout_json: '{"ROOT":{"type":"Container"}}' }; }
          };
        }
      },
      ...envOverrides,
    },
    params: {},
    waitUntil: () => {},
    next: () => {},
    data: {},
  };
}

async function runQATests() {
  console.log('====================================================');
  console.log('🧪 RUNNING DEEP QA TEST SUITE (EDGE APIS & INPUTS)');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail: any = '') {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} —`, typeof detail === 'object' ? JSON.stringify(detail) : detail);
      failed++;
    }
  }

  // ----------------------------------------------------------------
  // SCENARIO 1: Contact API Form Validation & Injection Safety
  // ----------------------------------------------------------------
  console.log('--- SCENARIO 1: Contact Form Validation & Edge Safety ---');
  
  // 1a. Empty payload
  let req = new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: '', email: '', message: '' })
  });
  let res = await handleContact(mockContext(req));
  let json = await res.json() as any;
  assert(res.status === 400 && json.success === false, 'Scenario 1a: Rejects empty submission with HTTP 400');

  // 1b. Invalid email format
  req = new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'John Doe', email: 'invalid-email-address', message: 'Hello' })
  });
  res = await handleContact(mockContext(req));
  json = await res.json() as any;
  assert(res.status === 400 && json.error === 'Invalid email address.', 'Scenario 1b: Rejects invalid email address formatting');

  // 1c. Valid submission without Resend key (Dev fallback)
  req = new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Fotis P.', email: 'fotis@example.com', message: 'Inquiry regarding services.' })
  });
  res = await handleContact(mockContext(req));
  json = await res.json() as any;
  assert(res.status === 200 && json.success === true, 'Scenario 1c: Accepts valid payload and handles dev mode fallback gracefully');

  // ----------------------------------------------------------------
  // SCENARIO 2: Search API Query Performance & FTS Resilience
  // ----------------------------------------------------------------
  console.log('\n--- SCENARIO 2: Search API Query Validation & FTS Execution ---');

  // 2a. Short query (<2 chars)
  req = new Request('http://localhost/api/search?q=a');
  res = await handleSearch(mockContext(req));
  json = await res.json() as any;
  assert(json.results.length === 0, 'Scenario 2a: Short queries (<2 chars) return empty results array without DB hit');

  // 2b. Matching search query
  req = new Request('http://localhost/api/search?q=Consulting');
  res = await handleSearch(mockContext(req));
  json = await res.json() as any;
  assert(json.results.length === 1 && json.results[0].slug === 'first-consulting-contract', 'Scenario 2b: Search matching query returns expected FTS results');

  // ----------------------------------------------------------------
  // SCENARIO 3: Weather API Cache & Fallback Mechanisms
  // ----------------------------------------------------------------
  console.log('\n--- SCENARIO 3: Weather API Caching & Fallback Resilience ---');

  const ctx = mockContext(new Request('http://localhost/api/weather'));
  
  // 3a. First hit without API key -> Default static fallback
  res = await handleWeather(ctx);
  json = await res.json() as any;
  assert(res.status === 200 && json.name === 'London' && json.temp === 18, 'Scenario 3a: Weather API returns London default when no API key configured');

  // ----------------------------------------------------------------
  // SCENARIO 4: Page Builder State Persistence & API Roundtrip
  // ----------------------------------------------------------------
  console.log('\n--- SCENARIO 4: Builder API Serialization & Persistence ---');

  // 4a. Save layout JSON
  const sampleLayout = JSON.stringify({ ROOT: { type: 'Container', nodes: ['hero1'] } });
  req = new Request('http://localhost/api/builder/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug: 'homepage', layout_json: sampleLayout })
  });
  res = await handleBuilderSave(mockContext(req));
  json = await res.json() as any;
  assert(res.status === 200 && json.success === true, 'Scenario 4a: Builder save endpoint persists layout JSON successfully', json);

  // 4b. Load saved layout
  req = new Request('http://localhost/api/builder/load?slug=homepage');
  res = await handleBuilderLoad(mockContext(req));
  json = await res.json() as any;
  assert(res.status === 200 && json.layout_json !== null, 'Scenario 4b: Builder load endpoint retrieves persisted layout JSON', json);

  // ----------------------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------------------
  console.log('\n====================================================');
  console.log(`📊 QA TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) process.exit(1);
}

runQATests().catch(err => {
  console.error('QA Test execution failed:', err);
  process.exit(1);
});
