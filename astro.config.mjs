// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://dpappbm.github.io',
  // Final base path is decided at deploy time.
  base: '/sejong-astro',
  trailingSlash: 'always',
  // Pages load in the background when a link is hovered, so most navigations are instant.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
