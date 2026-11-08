// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://dpappbm.github.io',
  // Served by GitHub Pages at https://dpappbm.github.io/sejong/
  base: '/sejong',
  trailingSlash: 'always',
  // Pages load in the background when a link is hovered, so most navigations are instant.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
