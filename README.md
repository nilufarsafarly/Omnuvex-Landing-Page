# Omnuvex landing — Astro

Port of the Claude Design canvas "Omnuvex landing — hero" (artboard `Main.dc.html`, version 148) to Astro 7 + Tailwind 4.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Structure

- `src/pages/index.astro` — section order
- `src/layouts/BaseLayout.astro` — head, Archivo font, global.css, page scripts
- `src/styles/global.css` — design tokens (`@theme`), layout variables (`--head-*`, `--stick-top`), the shared `.ox-act` button, reveal classes
- `src/components/ui/` — `ActionButton`, `RevealTitle`, `LanguageSwitcher`
- `src/components/layout/` — `Header` (+ `MobileMenu`), `Footer`
- `src/components/sections/` — `Hero`, `Services` (+ `ServiceCard`), `Clients`, `Work` (+ `WorkCard`), `Process`, `Testimonials` (+ `QuoteCard`), `Faq`, `Contact` (+ `AuditForm`)
- `src/data/` — section content
- `src/scripts/` — `scroll.ts` (navbar frost, hands, title reveal, stacking cards), `smooth-scroll.ts`, `reveal.ts`, `lang.ts`

## Breakpoints

Phone-first, matching the canvas: base = phone (< 768px), `md:` = tablet (768–1023px), `lg:` = desktop (≥ 1024px). `sm:` is not used.

## Not wired yet

- The audit form only shows the "Request received" state; nothing is sent.
- Language switchers change the selected language only; there are no translations.
- Footer/legal links (`#privacy`, `#terms`, `#cookies`, `#products`, `#portfolio`, `#company`) have no target sections, as in the canvas.

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages via `.github/workflows/deploy.yml`:
https://nilufarsafarly.github.io/Omnuvex-Landing-Page/

The site lives under the `/Omnuvex-Landing-Page` base path (set in `astro.config.mjs`), so locally it is at
http://localhost:4321/Omnuvex-Landing-Page/. Reference files in `public/` with `asset('/images/…')` from `src/lib/asset.ts`, not a bare `/images/…` path.
