// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://dpappbm.github.io',
  // Final base path is decided at deploy time.
  base: '/sejong-astro',
  trailingSlash: 'always',
});
