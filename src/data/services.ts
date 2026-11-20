/** Services accordion cards (canvas `svcData`). The line drawing and icon for each card are in ServiceCard.astro, by index. */
export type Service = {
  num: string;
  title: string;
  text: string;
};

export const services: Service[] = [
  { num: '01', title: 'AI Automation', text: 'Automations that cut measurable costs and accelerate measurable revenue.' },
  { num: '02', title: 'Software Development', text: 'Custom platforms, CRMs and tools your team actually owns.' },
  { num: '03', title: 'Systems Integration', text: 'Connect the tools you already have so information stops getting lost.' },
  { num: '04', title: 'Consulting', text: 'We understand your business before we touch the code.' },
];
