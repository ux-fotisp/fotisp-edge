# EDGE — Document 06: Versioning & Safety Strategy Protocol
**Author**: Fotis Pastrakis  
**Project**: fotisp-edge (Cloudflare Emdash Engine)

---

## 1. Overview & Objectives

Major architectural changes (such as framework CSS refactoring, Vite upgrades, or content schema migrations) carry risk of visual regressions, cache corruption, or SSR server errors. 

To eliminate these risks, the EDGE engineering workflow enforces a **5-Tier Safety Protocol** leveraging Semantic Versioning, Isolated Feature Branching, SSR Runtime Route Inspection, Visual Regression Testing, and Automated One-Command Rollback procedures.

---

## 2. The 5-Tier Safety Architecture

```
                                  [ GIT BASELINE TAG ]
                                  (e.g., v1.0.0-stable)
                                           │
                                           ▼
                                 [ ISOLATED FEATURE BRANCH ]
                                 (e.g., feat/tailwind-v4)
                                           │
                                           ▼
  ┌────────────────────────────────────────┴────────────────────────────────────────┐
  │                                                                                 │
  ▼                                                                                 ▼
[ TIER 1: ENVIRONMENT & CACHE ]                                     [ TIER 2: CONTINUOUS VISUAL QA ]
• Automated pre-clean script                                         • Playwright real-browser snapshots
  (rm -rf node_modules/.vite .astro .wrangler)                       • Pixel-diff regression assertions
• Immutable npm lockfile enforcement                                 • Full 12-route SSR HTTP status checks
  (npm ci vs npm install)                                              (asserts HTTP 200 OK + body)
  │                                                                                 │
  └────────────────────────────────────────┬────────────────────────────────────────┘
                                           │
                                           ▼
                                [ TIER 3: STAGING VERIFICATION ]
                                (Cloudflare Pages Preview Branch)
                                           │
                                           ▼
                                [ TIER 4: SEMVER TAG & MERGE ]
                                (Merge to main -> tag v1.1.0)
                                           │
                                           ▼
                                [ TIER 5: EMERGENCY ROLLBACK ]
                                (npm run emergency:rollback)
```

---

## 3. Versioning Standards (SemVer)

All repository releases follow [Semantic Versioning 2.0.0](https://semver.org/):

- **`v1.0.0` (Baseline Stable)**: Vanilla CSS Design System, Don Norman UX Heuristics (editorial, portfolio, services archetypes), 112 QA assertions passing.
- **`v1.x.0` (Minor Release)**: Addition of new page archetypes, content collections (e.g. events, team), or non-breaking API handlers.
- **`v2.0.0` (Major Release)**: Breaking architectural changes, such as adopting utility-first engines, major Astro upgrades, or database schema pivots.

### Baseline Tagging Workflow
Before initiating any major refactor, tag the baseline:
```bash
git tag -a v1.0.0-stable -m "EDGE v1.0.0 Stable Baseline"
git push origin v1.0.0-stable
```

---

## 4. Branching & Isolation Rules

1. **`main` Branch Protection**:
   - `main` always represents production-ready, verified code.
   - Direct development of major refactors on `main` is strictly prohibited.

2. **Feature Branches (`feat/*`)**:
   - Every refactor or experiment must take place on a dedicated branch:
     ```bash
     git checkout -b feat/tailwind-v4-migration
     ```

3. **Release Candidates (`release/*`)**:
   - Once a feature branch passes all QA tiers, it is merged into a `release/vX.Y.Z` branch for Cloudflare Pages preview testing before final merge to `main`.

---

## 5. SSR & Visual Testing Safeguards

To prevent "false positive" test runs where static file checks pass while runtime SSR rendering or visual layouts break:

1. **SSR Route Health Check (`scripts/verify-ssr-routes.ts`)**:
   - Boots the Astro dev/SSR server and executes live HTTP GET requests against all 12 system routes (`/`, `/blog`, `/portfolio`, `/services`, `/contact`, `/team`, `/events`, etc.).
   - Asserts HTTP status `200 OK` and checks that required HTML elements (`<header>`, `<main>`, `<footer>`) are rendered.

2. **Playwright Visual Snapshot Testing**:
   - Compares pixel-by-pixel snapshots of page headers, typography, and card grids against reference baseline screenshots before allowing a merge.

---

## 6. Emergency Rollback Protocol

If an unexpected regression occurs in production or staging, execute the single-command emergency rollback:

```bash
npm run emergency:rollback
```

This script:
1. Switches to the `main` branch.
2. Hard resets to the latest stable Git tag baseline (`git reset --hard v1.0.0-stable`).
3. Cleans all untracked artifacts (`git clean -fd`).
4. Force-pushes the restored state to origin (`git push origin main --force`).

---

## Summary of Safety Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run clean:cache` | Clears `.astro`, `.wrangler`, and `node_modules/.vite` build caches |
| `npm run test:all` | Runs 112 QA assertions across components, routing, and APIs |
| `npm run test:ssr` | Performs live HTTP GET requests against all 12 Astro routes |
| `npm run version:tag` | Tags current commit as a stable baseline in Git |
| `npm run emergency:rollback` | Immediately restores workspace and remote repository to baseline tag |
