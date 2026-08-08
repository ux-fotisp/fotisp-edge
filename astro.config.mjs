import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [mdx()],
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
});
