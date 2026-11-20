// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Published on GitHub Pages at https://nilufarsafarly.github.io/Omnuvex-Landing-Page/
export default defineConfig({
  site: 'https://nilufarsafarly.github.io',
  base: '/Omnuvex-Landing-Page',
  vite: { plugins: [tailwindcss()] },
});
