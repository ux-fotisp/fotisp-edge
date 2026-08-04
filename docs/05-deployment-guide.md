# EDGE — Deployment & Production Guide

**Author**: Fotis Pastrakis  
**Target Platform**: Cloudflare Pages / Vercel / Netlify  
**Build Command**: `npm run build`  
**Output Directory**: `dist/`  

---

## 1. Cloudflare Pages Deployment (Default Adapter)

**EDGE** is configured out of the box to build for **Cloudflare Pages** using `@astrojs/cloudflare`.

### Deployment Steps:

1. **Push Repository to GitHub / GitLab**.
2. **Connect Project in Cloudflare Dashboard**:
   - Go to **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
   - Select the `fotisp-edge` repository.
3. **Configure Build Settings**:
   - **Framework Preset**: `Astro`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
   - **Node.js Version**: `18.x` or higher
4. **Deploy**:
   - Click **Save and Deploy**. Cloudflare Pages will build and deploy the application globally across Cloudflare's edge network.

---

## 2. Environment Bindings Configuration

In `astro.config.mjs`, Cloudflare platform bindings are defined:

```javascript
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: { enabled: false },
  }),
  integrations: [mdx(), react()],
});
```

- **Cloudflare Images**: Enabled for automated asset optimization via the `IMAGES` binding.
- **Cloudflare KV**: Configured for session state storage via the `SESSION` KV binding.

---

## 3. Deploying to Alternative Hosts (Vercel / Netlify / Static)

If you prefer to deploy to **Vercel**, **Netlify**, or standard static hosting:

### Option A: Static Deployment (Universal — Vercel / Netlify / GitHub Pages)
Change `output` to `'static'` in `astro.config.mjs`:

```javascript
export default defineConfig({
  output: 'static',
  integrations: [mdx(), react()],
});
```
*Run `npm run build` to generate pure pre-rendered HTML/CSS/JS files in `dist/` that deploy anywhere.*

### Option B: Vercel Server Deployment
Install Vercel adapter: `npm i @astrojs/vercel` and update `astro.config.mjs`:

```javascript
import vercel from '@astrojs/vercel';
export default defineConfig({
  output: 'server',
  adapter: vercel(),
});
```

### Option C: Netlify Server Deployment
Install Netlify adapter: `npm i @astrojs/netlify` and update `astro.config.mjs`:

```javascript
import netlify from '@astrojs/netlify';
export default defineConfig({
  output: 'server',
  adapter: netlify(),
});
```

---

## 4. Local Build Verification

Before committing changes, execute the production build pipeline locally:

```bash
# 1. Typecheck and build bundle
npm run build

# 2. Preview production build
npm run preview
```

**Verification Checklist**:
- [x] Build completes with Exit Code **0**.
- [x] No TypeScript or content collection schema validation errors.
- [x] Static assets correctly generated in `dist/client/`.
- [x] Server entrypoint compiled in `dist/server/`.
