/**
 * One scroll loop for every scroll-linked effect on the page (ported from the canvas onScroll/renderVals):
 *  - navbar frost: `.ox-head.is-scrolled` once the hero's bottom passes the navbar
 *  - hero hands drift apart; the human hand fades out over the first 640px
 *  - section titles: words go from grey to ink as the title rises from 90% to 45% of the screen
 *  - Selected work: each card steps back as the next one slides over it (every width)
 *  - Services (phones): cards stack the same way and the grey tray shrinks around the pile
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));

function heroHands(y: number) {
  const bg = document.querySelector<HTMLElement>('.ox-bg');
  if (!bg) return;
  const wire = bg.querySelector<HTMLElement>('.ox-wire');
  const human = bg.querySelector<HTMLElement>('.ox-human');
  const opacity = Number(bg.dataset.handOpacity ?? 0.45);
  const on = bg.dataset.separate !== 'false' && !reduced;
  const dist = Number(bg.dataset.separation ?? 8);
  const progress = clamp(y / 400);
  const fade = clamp(y / 640);
  const p = on ? progress : 0;
  const f = on ? fade : 0;
  if (wire) {
    wire.style.transform = `translate(${(dist * p).toFixed(2)}cqw, -${(dist * p * 0.5).toFixed(2)}cqw) scaleX(-1)`;
  }
  if (human) {
    human.style.transform = `translate(-${(dist * f * 1.5).toFixed(2)}cqw, ${(dist * f * 0.75).toFixed(2)}cqw) scaleX(-1)`;
    human.style.opacity = (opacity * (1 - fade)).toFixed(3);
  }
}

function navbar() {
  const head = document.querySelector<HTMLElement>('.ox-head');
  const hero = document.querySelector<HTMLElement>('.ox-hero');
  if (!head) return;
  const past = hero ? hero.getBoundingClientRect().bottom <= head.getBoundingClientRect().bottom : window.scrollY > 600;
  head.classList.toggle('is-scrolled', past);
}

function titles() {
  const vh = window.innerHeight || 800;
  document.querySelectorAll<HTMLElement>('.ox-reveal').forEach((title) => {
    const words = title.querySelectorAll<HTMLElement>('.ox-w');
    const top = title.getBoundingClientRect().top;
    const p = reduced ? 1 : clamp((vh * 0.9 - top) / (vh * 0.45));
    const lit = p * words.length;
    words.forEach((w, i) => {
      const k = clamp(lit - i);
      w.style.color = `rgb(${Math.round(201 - 164 * k)},${Math.round(203 - 165 * k)},${Math.round(207 - 165 * k)})`;
    });
  });
}

function workStack() {
  const items = document.querySelectorAll<HTMLElement>('.ox-work-item');
  const gap = window.innerWidth >= 1024 ? 64 : 32;
  items.forEach((item, i) => {
    const card = item.querySelector<HTMLElement>('.ox-work-card');
    if (!card) return;
    let c = 0;
    if (!reduced && i < items.length - 1) {
      const a = item.getBoundingClientRect();
      const b = items[i + 1].getBoundingClientRect();
      c = clamp(1 - (b.top - a.top) / (a.height + gap));
    }
    card.style.transform = `translateY(${(-28 * c).toFixed(1)}px) scale(${(1 - 0.06 * c).toFixed(4)}) rotate(${(-1.6 * c).toFixed(3)}deg)`;
  });
}

function servicesStack() {
  const row = document.querySelector<HTMLElement>('.ox-svc-row');
  if (!row) return;
  const cards = row.querySelectorAll<HTMLElement>('.ox-svc');
  const bg = row.querySelector<HTMLElement>('.ox-svc-bg');
  const on = cards.length > 0 && window.innerWidth < 768;
  if (!on) {
    cards.forEach((c) => (c.style.transform = ''));
    if (bg) {
      bg.style.top = '';
      bg.style.height = '';
    }
    return;
  }
  cards.forEach((card, i) => {
    let c = 0;
    if (!reduced && i < cards.length - 1) {
      const a = card.getBoundingClientRect();
      const b = cards[i + 1].getBoundingClientRect();
      c = clamp(1 - (b.top - a.top) / (card.offsetHeight + 8));
    }
    card.style.transform =
      c > 0 ? `translateY(${(-16 * c).toFixed(1)}px) scale(${(1 - 0.06 * c).toFixed(4)}) rotate(${(-1.2 * c).toFixed(3)}deg)` : 'none';
  });
  if (bg) {
    // the tray wraps the pile: from 8px above card 01 to 8px below the last card
    const r = row.getBoundingClientRect();
    const f = cards[0].getBoundingClientRect();
    const l = cards[cards.length - 1].getBoundingClientRect();
    bg.style.top = `${Math.round(f.top - r.top - 8)}px`;
    bg.style.height = `${Math.round(l.bottom - f.top + 16)}px`;
  }
}

let frame = 0;
function update() {
  frame = 0;
  const y = window.scrollY || document.documentElement.scrollTop || 0;
  heroHands(y);
  navbar();
  titles();
  workStack();
  servicesStack();
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(update);
}

window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', schedule);
update();
