import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://fotisp-edge.fotispastrakis.workers.dev',
  output: 'static',
  integrations: [mdx(), sitemap()],
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  vite: {
    ssr: {
      external: ['node:fs/promises', 'node:path', 'node:url', 'node:crypto', 'node:buffer'],
    },
  },
});
