// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Two hosts:
//  - Vercel (sets VERCEL=1 during its builds): served from the domain root.
//  - GitHub Pages: https://nilufarsafarly.github.io/Omnuvex-Landing-Page/
const onVercel = !!process.env.VERCEL;

export default defineConfig({
  site: onVercel ? undefined : 'https://nilufarsafarly.github.io',
  base: onVercel ? '/' : '/Omnuvex-Landing-Page',
  vite: { plugins: [tailwindcss()] },
});
