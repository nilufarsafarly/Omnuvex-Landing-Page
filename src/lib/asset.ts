/**
 * Prefix a public file path with the site's base path, so images work both
 * locally ("/") and on GitHub Pages ("/Omnuvex-Landing-Page/").
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
