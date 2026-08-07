import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: { enabled: false },
  }),
  integrations: [
    mdx(),
    react(),
    keystatic(),
  ],
  vite: {
    build: {
      chunkSizeWarningLimit: 1200,
    },
    optimizeDeps: {
      exclude: ['@keystatic/core', '@astrojs/cloudflare', 'astro/compiler-runtime'],
    },
  },
});
