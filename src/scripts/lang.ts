/**
 * Shared language state for every switcher on the page (header, mobile menu, footer).
 * There is no translation yet: picking a language only updates which option is selected.
 * Switchers call setLang() and listen for the `ox:lang` event to re-render their state.
 */
export type LangId = 'az' | 'ru' | 'en';

export const LANGS: { id: LangId; code: string; name: string }[] = [
  { id: 'az', code: 'AZ', name: 'Azərbaycan' },
  { id: 'ru', code: 'RU', name: 'Русский' },
  { id: 'en', code: 'EN', name: 'English' },
];

export function getLang(): LangId {
  const v = document.documentElement.dataset.lang as LangId | undefined;
  return v && LANGS.some((l) => l.id === v) ? v : 'en';
}

export function setLang(id: LangId) {
  if (getLang() === id) return;
  document.documentElement.dataset.lang = id;
  document.dispatchEvent(new CustomEvent<LangId>('ox:lang', { detail: id }));
}

export function onLang(fn: (id: LangId) => void) {
  document.addEventListener('ox:lang', (e) => fn((e as CustomEvent<LangId>).detail));
  fn(getLang());
}
