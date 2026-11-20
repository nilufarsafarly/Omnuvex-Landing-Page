/** What our clients say (canvas: `quoteData`). Logos reuse the grey client logo files. */
export type Quote = {
  text: string;
  name: string;
  role: string;
  initials: string;
  company: string;
  logo: string;
  /** desktop logo height in px (tablet/phone heights live in QuoteCard's CSS, like the canvas) */
  logoH: number;
};

export const quotes: Quote[] = [
  {
    text: 'Automating our customer support workflows cut response times by 68% in the first month. Our team now focuses on high-value deals instead of repetitive tickets.',
    name: 'Elena Rostova',
    role: 'VP of Operations, TREVA',
    initials: 'ER',
    company: 'TREVA Real Estate',
    logo: '/images/clients/treva-ink.png',
    logoH: 32,
  },
  {
    text: 'Integrating the AI lead-scoring system directly into our CRM boosted qualified pipeline conversions by 42%. Setup took less than a single afternoon.',
    name: 'Marcus Vance',
    role: 'Head of Growth, TVIM',
    initials: 'MV',
    company: 'TVIM',
    logo: '/images/clients/tvim-ink.png',
    logoH: 26,
  },
  {
    text: 'Real-time reporting eliminated ten hours of manual spreadsheet work every week. We finally have instant visibility into campaign ROI across every department.',
    name: 'Sarah Jenkins',
    role: 'Chief Marketing Officer, TRENDERS',
    initials: 'SJ',
    company: 'TRENDERS',
    logo: '/images/clients/trenders-ink.png',
    logoH: 28,
  },
];
