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
  // SCENARIO 4: BackToTop Granular Segmented Progress Ring
  // ----------------------------------------------------------------
  console.log('\n--- SCENARIO 4: BackToTop.astro Dynamic Granular Progress Ring ---');
  const backToTopPath = path.join(process.cwd(), 'src/components/BackToTop.astro');
  const backToTopExists = fs.existsSync(backToTopPath);
  assert(backToTopExists, 'Scenario 4a: BackToTop.astro component file exists');

  if (backToTopExists) {
    const code = fs.readFileSync(backToTopPath, 'utf-8');
    assert(code.includes('id="segmented-back-to-top"'), 'Scenario 4b: Defines segmented-back-to-top button element');
    assert(code.includes('id="svg-segments-group"'), 'Scenario 4c: Contains dynamic SVG segments group context');
    assert(code.includes('#ee2626'), 'Scenario 4d: Uses Scarlet Red active stroke (#ee2626)');
    assert(code.includes('#380F15'), 'Scenario 4e: Uses Dark Crimson inactive stroke (#380F15)');
    assert(code.includes('initGranularProgressRing'), 'Scenario 4f: Implements initGranularProgressRing scroll calculation');
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
  // SCENARIO 8: Hero "EDGE" Light Pulsing & Mesh Sweep Interaction
  // ----------------------------------------------------------------
  console.log('\n--- SCENARIO 8: Hero EDGE Light Pulsing & Pointer Sweep ---');
  const indexPath = path.join(process.cwd(), 'src/pages/index.astro');
  const homepageCssPath = path.join(process.cwd(), 'src/styles/homepage.css');

  assert(fs.existsSync(indexPath), 'Scenario 8a: index.astro file exists');
  assert(fs.existsSync(homepageCssPath), 'Scenario 8b: homepage.css file exists');

  if (fs.existsSync(indexPath)) {
    const indexCode = fs.readFileSync(indexPath, 'utf-8');
    assert(indexCode.includes('id="hero-edge-word"'), 'Scenario 8c: Defines hero-edge-word element');
    assert(indexCode.includes('initEdgeWordInteraction'), 'Scenario 8d: Contains initEdgeWordInteraction controller function');
    assert(indexCode.includes('pointerPositionRelativeToElement'), 'Scenario 8e: Implements relative pointer position calculations');
  }

  if (fs.existsSync(homepageCssPath)) {
    const cssCode = fs.readFileSync(homepageCssPath, 'utf-8');
    assert(cssCode.includes('.edge-pulsing-word'), 'Scenario 8f: Defines .edge-pulsing-word CSS styles');
    assert(cssCode.includes('ambient-pulsing'), 'Scenario 8g: Defines ambient-pulsing focus in/out animation');
    assert(cssCode.includes('conic-gradient'), 'Scenario 8h: Implements mesh conic gradient text sweep');
  }

  // ----------------------------------------------------------------
  // SCENARIO 9: Homepage Team Showcase & Dynamic Team Architecture
  // ----------------------------------------------------------------
  console.log('\n--- SCENARIO 9: Team Showcase Home & Dynamic Architecture ---');
  const showcasePath = path.join(process.cwd(), 'src/components/TeamShowcaseHome.astro');
  const teamIndexPath = path.join(process.cwd(), 'src/pages/team/index.astro');
  const teamSinglePath = path.join(process.cwd(), 'src/pages/team/[slug].astro');

  assert(fs.existsSync(showcasePath), 'Scenario 9a: TeamShowcaseHome.astro component exists');
  assert(fs.existsSync(teamIndexPath), 'Scenario 9b: src/pages/team/index.astro exists');
  assert(fs.existsSync(teamSinglePath), 'Scenario 9c: src/pages/team/[slug].astro exists');

  if (fs.existsSync(showcasePath)) {
    const code = fs.readFileSync(showcasePath, 'utf-8');
    assert(code.includes('team-focus-card'), 'Scenario 9d: Defines team-focus-card focus pattern');
    assert(code.includes('INSPECT PROFILE'), 'Scenario 9e: Contains INSPECT PROFILE CTA');
  }

  if (fs.existsSync(teamIndexPath)) {
    const code = fs.readFileSync(teamIndexPath, 'utf-8');
    assert(code.includes('team-filter-bar'), 'Scenario 9f: Implements department filter tab bar');
    assert(code.includes('hiring-card'), 'Scenario 9g: Renders inline recruitment HiringCard');
  }

  if (fs.existsSync(teamSinglePath)) {
    const code = fs.readFileSync(teamSinglePath, 'utf-8');
    assert(code.includes('read-progress'), 'Scenario 9h: Defines scroll progress bar (#read-progress)');
    assert(code.includes('content-sidebar'), 'Scenario 9i: Implements 70/30 split layout');
    assert(code.includes('briefing-widget'), 'Scenario 9j: Renders sticky executive briefing sidebar widget');
  }

  // ----------------------------------------------------------------
  // SCENARIO 10: Services System UI & Methodology Pipeline
  // ----------------------------------------------------------------
  console.log('\n--- SCENARIO 10: Services UI & Methodology Pipeline ---');
  const serviceCardPath = path.join(process.cwd(), 'src/components/ServiceCard.astro');
  const lifecyclePath = path.join(process.cwd(), 'src/components/ServiceLifecycle.astro');
  const serviceShowcasePath = path.join(process.cwd(), 'src/components/ServiceShowcaseHome.astro');
  const servicesIndexPath = path.join(process.cwd(), 'src/pages/services/index.astro');
  const servicesSinglePath = path.join(process.cwd(), 'src/pages/services/[slug].astro');

  assert(fs.existsSync(serviceCardPath), 'Scenario 10a: ServiceCard.astro exists');
  assert(fs.existsSync(lifecyclePath), 'Scenario 10b: ServiceLifecycle.astro exists');
  assert(fs.existsSync(serviceShowcasePath), 'Scenario 10c: ServiceShowcaseHome.astro exists');
  assert(fs.existsSync(servicesIndexPath), 'Scenario 10d: src/pages/services/index.astro exists');
  assert(fs.existsSync(servicesSinglePath), 'Scenario 10e: src/pages/services/[slug].astro exists');

  if (fs.existsSync(serviceCardPath)) {
    const code = fs.readFileSync(serviceCardPath, 'utf-8');
    assert(code.includes('INSPECT SERVICE SCOPE'), 'Scenario 10f: ServiceCard features INSPECT SERVICE SCOPE CTA');
    assert(code.includes('deliverables-list'), 'Scenario 10g: ServiceCard renders deliverable points with checkmarks');
  }

  if (fs.existsSync(lifecyclePath)) {
    const code = fs.readFileSync(lifecyclePath, 'utf-8');
    assert(code.includes('ARCHITECTURAL AUDIT'), 'Scenario 10h: ServiceLifecycle features step 01 ARCHITECTURAL AUDIT');
    assert(code.includes('step-laser-indicator'), 'Scenario 10i: ServiceLifecycle includes laser indicator');
  }

  if (fs.existsSync(servicesSinglePath)) {
    const code = fs.readFileSync(servicesSinglePath, 'utf-8');
    assert(code.includes('executive-summary-box'), 'Scenario 10j: Service single profile renders executive summary box');
    assert(code.includes('SCOPE PROJECT'), 'Scenario 10k: Service single profile renders SCOPE PROJECT CTA button');
  }

  // ----------------------------------------------------------------
  // SCENARIO 11: Big-Tech News & Intelligence System
  // ----------------------------------------------------------------
  console.log('\n--- SCENARIO 11: News System & Intelligence Hub ---');
  const newsCardPath = path.join(process.cwd(), 'src/components/NewsCard.astro');
  const newsIndexPath = path.join(process.cwd(), 'src/pages/news/index.astro');
  const newsSinglePath = path.join(process.cwd(), 'src/pages/news/[slug].astro');

  assert(fs.existsSync(newsCardPath), 'Scenario 11a: NewsCard.astro component exists');
  assert(fs.existsSync(newsIndexPath), 'Scenario 11b: src/pages/news/index.astro exists');
  assert(fs.existsSync(newsSinglePath), 'Scenario 11c: src/pages/news/[slug].astro exists');

  if (fs.existsSync(newsCardPath)) {
    const code = fs.readFileSync(newsCardPath, 'utf-8');
    assert(code.includes('READ FULL RELEASE'), 'Scenario 11d: NewsCard features READ FULL RELEASE CTA');
    assert(code.includes('news-category-badge'), 'Scenario 11e: NewsCard includes category badge meta');
  }

  if (fs.existsSync(newsIndexPath)) {
    const blogCode = fs.readFileSync(path.join(process.cwd(), 'src/pages/blog/index.astro'), 'utf-8');
    assert(blogCode.includes('featured-news-hero'), 'Scenario 11f: Blog archive page renders featured article hero block');
    assert(blogCode.includes('news-filter-bar'), 'Scenario 11g: Blog archive page renders category filter bar');
  }

  if (fs.existsSync(newsSinglePath)) {
    const blogSingleCode = fs.readFileSync(path.join(process.cwd(), 'src/pages/blog/[slug].astro'), 'utf-8');
    assert(blogSingleCode.includes('read-progress'), 'Scenario 11h: Single article page renders top reading progress bar');
    assert(blogSingleCode.includes('article-prose-container'), 'Scenario 11i: Single article page renders constrained 720px reader column');
    assert(blogSingleCode.includes('related-news-section'), 'Scenario 11j: Single article page renders related intelligence articles grid');
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
