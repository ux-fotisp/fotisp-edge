import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  integrations: [mdx()],
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  vite: {
    ssr: {
      external: ['node:fs/promises', 'node:path', 'node:url', 'node:crypto', 'node:buffer'],
    },
  },
});
