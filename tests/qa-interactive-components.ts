// tests/qa-interactive-components.ts
import fs from 'fs';
import path from 'path';

async function runInteractiveQAUnitTests() {
  console.log('====================================================');
  console.log('🧪 QA UNIT TEST SUITE: EDGE INTERACTIVE & SUBPAGES');
  console.log('   Author: Fotis Pastrakis');
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

  // ----------------------------------------------------------------
  // SCENARIO 1: PageTitle Component Structure & Styling Audit
  // ----------------------------------------------------------------
  console.log('--- SCENARIO 1: PageTitle.astro Component Integrity ---');
  const pageTitlePath = path.join(process.cwd(), 'src/components/PageTitle.astro');
  const pageTitleExists = fs.existsSync(pageTitlePath);
  assert(pageTitleExists, 'Scenario 1a: PageTitle.astro component file exists');

  if (pageTitleExists) {
    const code = fs.readFileSync(pageTitlePath, 'utf-8');
    assert(code.includes('page-title-hero'), 'Scenario 1b: Contains page-title-hero container class');
    assert(code.includes('page-title-grid'), 'Scenario 1c: Contains animated red grid overlay');
    assert(code.includes('page-title-laser'), 'Scenario 1d: Contains red laser accent line');
    assert(code.includes('page-title-breadcrumb'), 'Scenario 1e: Supports breadcrumb navigation rendering');
    assert(code.includes('#080303'), 'Scenario 1f: Uses Obsidian dark background (#080303)');
  }

  // ----------------------------------------------------------------
  // SCENARIO 2: CTABand Component Variants & Options
  // ----------------------------------------------------------------
  console.log('\n--- SCENARIO 2: CTABand.astro Variants & Structure ---');
  const ctaBandPath = path.join(process.cwd(), 'src/components/CTABand.astro');
  const ctaBandExists = fs.existsSync(ctaBandPath);
  assert(ctaBandExists, 'Scenario 2a: CTABand.astro component file exists');

  if (ctaBandExists) {
    const code = fs.readFileSync(ctaBandPath, 'utf-8');
    assert(code.includes('cta-band--scarlet'), 'Scenario 2b: Implements scarlet gradient variant');
    assert(code.includes('cta-band--dark'), 'Scenario 2c: Implements dark obsidian variant');
    assert(code.includes('cta-band--light'), 'Scenario 2d: Implements light white variant');
    assert(code.includes('cta-band-grid'), 'Scenario 2e: Includes red grid overlay');
    assert(code.includes('cta-band-btn-light'), 'Scenario 2f: Includes inverted button style for scarlet background');
  }

  // ----------------------------------------------------------------
  // SCENARIO 3: AccessModal Terminal Drawer Integration
  // ----------------------------------------------------------------
  console.log('\n--- SCENARIO 3: AccessModal.astro Terminal Drawer & Handshake ---');
  const accessModalPath = path.join(process.cwd(), 'src/components/AccessModal.astro');
  const accessModalExists = fs.existsSync(accessModalPath);
  assert(accessModalExists, 'Scenario 3a: AccessModal.astro component file exists');

  if (accessModalExists) {
    const code = fs.readFileSync(accessModalPath, 'utf-8');
    assert(code.includes('id="access-modal"'), 'Scenario 3b: Defines access-modal drawer container');
    assert(code.includes('id="access-modal-overlay"'), 'Scenario 3c: Defines backdrop blur overlay');
    assert(code.includes('role="dialog"'), 'Scenario 3d: Enforces dialog ARIA accessibility role');
    assert(code.includes('openAccessModal'), 'Scenario 3e: Implements modal open trigger logic');
    assert(code.includes('closeAccessModal'), 'Scenario 3f: Implements modal close logic on overlay & ESC key');
    assert(code.includes('TRANSMITTING...'), 'Scenario 3g: Contains submission loading state & handshake response');
  }

  // ----------------------------------------------------------------
  // SCENARIO 4: BackToTop & SVG Scroll Progress Ring Formula
  // ----------------------------------------------------------------
  console.log('\n--- SCENARIO 4: BackToTop.astro Circular Progress Ring ---');
  const backToTopPath = path.join(process.cwd(), 'src/components/BackToTop.astro');
  const backToTopExists = fs.existsSync(backToTopPath);
  assert(backToTopExists, 'Scenario 4a: BackToTop.astro component file exists');

  if (backToTopExists) {
    const code = fs.readFileSync(backToTopPath, 'utf-8');
    assert(code.includes('progress-ring'), 'Scenario 4b: Contains SVG progress ring element');
    assert(code.includes('progress-ring-circle'), 'Scenario 4c: Contains progress-ring-circle stroke path');
    assert(code.includes('stroke="#DC2626"'), 'Scenario 4d: Uses electric scarlet stroke color (#DC2626)');
    assert(code.includes('strokeDashoffset'), 'Scenario 4e: Implements dynamic strokeDashoffset progress calculation');
    assert(code.includes('scrollTop > 300'), 'Scenario 4f: Displays button when scroll position exceeds 300px');
  }

  // ----------------------------------------------------------------
  // SCENARIO 5: CyberGridBg Canvas Animation Component
  // ----------------------------------------------------------------
  console.log('\n--- SCENARIO 5: CyberGridBg.astro HTML5 Canvas & Trails ---');
  const cyberGridPath = path.join(process.cwd(), 'src/components/CyberGridBg.astro');
  const cyberGridExists = fs.existsSync(cyberGridPath);
  assert(cyberGridExists, 'Scenario 5a: CyberGridBg.astro component file exists');

  if (cyberGridExists) {
    const code = fs.readFileSync(cyberGridPath, 'utf-8');
    assert(code.includes('id="cyber-grid-canvas"'), 'Scenario 5b: Defines HTML5 2D canvas context');
    assert(code.includes('gridSize'), 'Scenario 5c: Supports gridSize parameter prop');
    assert(code.includes('horizontalTrails'), 'Scenario 5d: Manages horizontal light streak vectors');
    assert(code.includes('verticalTrails'), 'Scenario 5e: Manages vertical light streak vectors');
    assert(code.includes('requestAnimationFrame'), 'Scenario 5f: Drives 60fps hardware-accelerated render loop');
  }

  // ----------------------------------------------------------------
  // SCENARIO 6: CSS Tokens & FillHoverButton Classes Audit
  // ----------------------------------------------------------------
  console.log('\n--- SCENARIO 6: CSS Tokens & Utility Class Verification ---');
  const baseCssPath = path.join(process.cwd(), 'src/styles/base.css');
  const tokensCssPath = path.join(process.cwd(), 'src/styles/tokens.css');
  
  assert(fs.existsSync(baseCssPath), 'Scenario 6a: base.css file exists');
  assert(fs.existsSync(tokensCssPath), 'Scenario 6b: tokens.css file exists');

  if (fs.existsSync(baseCssPath)) {
    const code = fs.readFileSync(baseCssPath, 'utf-8');
    assert(code.includes('FillHoverButton'), 'Scenario 6c: Defines FillHoverButton animation layer');
    assert(code.includes('.entry-content h2'), 'Scenario 6d: Defines dark rich text entry-content h2 border accent');
    assert(code.includes('.widget'), 'Scenario 6e: Defines dark sidebar container widget styling');
    assert(code.includes('.share-bar'), 'Scenario 6f: Defines social share bar component styles');
    assert(code.includes('.badge'), 'Scenario 6g: Defines scarlet pill badge styles');
  }

  // ----------------------------------------------------------------
  // SCENARIO 7: Documentation Suite Verification
  // ----------------------------------------------------------------
  console.log('\n--- SCENARIO 7: Documentation Suite File & Author Verification ---');
  const docsDir = path.join(process.cwd(), 'docs');
  const expectedDocs = [
    '01-architecture-overview.md',
    '02-design-system-and-tokens.md',
    '03-interactive-components.md',
    '04-content-layer-and-collections.md',
    '05-deployment-guide.md',
  ];

  for (const docFile of expectedDocs) {
    const docPath = path.join(docsDir, docFile);
    const exists = fs.existsSync(docPath);
    assert(exists, `Scenario 7: Document exists: docs/${docFile}`);
    if (exists) {
      const content = fs.readFileSync(docPath, 'utf-8');
      assert(content.includes('Fotis Pastrakis'), `Scenario 7: Author attribution present in docs/${docFile}`);
      assert(!content.toLowerCase().includes('logico'), `Scenario 7: Excludes legacy 'logico' references in docs/${docFile}`);
      assert(!content.toLowerCase().includes('convert'), `Scenario 7: Excludes legacy 'convert' references in docs/${docFile}`);
    }
  }

  // ----------------------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------------------
  console.log('\n====================================================');
  console.log(`📊 INTERACTIVE QA RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) process.exit(1);
}

runInteractiveQAUnitTests().catch(err => {
  console.error('QA Test execution failed:', err);
  process.exit(1);
});
