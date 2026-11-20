/** Contact section: audit form options (canvas: `needs` + the industry <select>) and the "what happens next" timeline. */

/** Group 01 chips */
export const needs: string[] = ['AI Automation', 'Software Development', 'Systems Integration', 'Consulting', 'Not sure yet'];

/** Group 02 industry select (the empty "Industry (optional)" option is rendered by the form) */
export const industries: string[] = ['Real Estate', 'Wholesale & Distribution', 'E-commerce', 'Marketing & Creative Services', 'Other'];

/** Message textarea limit */
export const MSG_MAX = 500;

export type TimelineStep = {
  when: string;
  what: string;
};

/** First item is "now" before sending; after sending it is "done" and the second becomes "now". */
export const timeline: TimelineStep[] = [
  { when: 'Today', what: 'You send the form' },
  { when: 'Within 24 hours', what: 'We reply and book a call' },
  { when: 'Day 2–3', what: '30-minute call about your goals' },
  { when: 'Within a week', what: 'Free audit with an automation plan' },
];
