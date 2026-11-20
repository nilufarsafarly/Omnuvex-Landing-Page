/**
 * "Trusted by" logos (canvas markup, section #clients). Ink is the grey default, colour shows on hover.
 * Heights are per breakpoint: desktop from the canvas inline styles, tablet / phone from its
 * max-width:1023px / 767px rules. `shift` is the inline translateY that optically centres the mark.
 */
export type Client = {
  name: string;
  ink: string;
  color: string;
  shift: number;
  height: { phone: number; tablet: number; desktop: number };
};

export const clients: Client[] = [
  { name: 'TREVA Real Estate', ink: '/images/clients/treva-ink.png', color: '/images/clients/treva-color.png', shift: 2, height: { phone: 18, tablet: 26, desktop: 32 } },
  { name: 'Trenders', ink: '/images/clients/trenders-ink.png', color: '/images/clients/trenders-color.png', shift: 0, height: { phone: 15, tablet: 22, desktop: 28 } },
  { name: 'tvim', ink: '/images/clients/tvim-ink.png', color: '/images/clients/tvim-color.png', shift: 0, height: { phone: 14, tablet: 21, desktop: 26 } },
  { name: 'BRABUS Island Baku', ink: '/images/clients/brabus-ink.png', color: '/images/clients/brabus-color.png', shift: 2, height: { phone: 15, tablet: 22, desktop: 28 } },
  { name: 'Sabah Towers', ink: '/images/clients/sabah-ink.png', color: '/images/clients/sabah-color.png', shift: 0, height: { phone: 26, tablet: 37, desktop: 46 } },
];
