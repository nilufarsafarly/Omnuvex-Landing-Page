/** How an engagement runs (canvas: static markup in section#process). */
export type Step = {
  num: string;
  title: string;
  text: string;
};

export const steps: Step[] = [
  { num: '01', title: 'Discovery call', text: 'We learn about your goals, challenges and current setup.' },
  { num: '02', title: 'Audit / action plan', text: 'We analyse, validate and recommend the right approach.' },
  { num: '03', title: 'Scope locked in writing', text: 'You get a clear plan, timeline and deliverables.' },
  { num: '04', title: 'Delivery', text: 'We build, test and hand over with full documentation.' },
];
