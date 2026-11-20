/**
 * Smooth scrolling (ported from the canvas componentDidMount). Off with reduced motion.
 *  - Mouse/trackpad: each wheel tick moves a target; the page eases toward it.
 *  - Touch: the page follows the finger with a light ease, then glides on with momentum.
 *    Touches that start in the open mobile menu, a form field or a pop-up menu, and
 *    two-finger gestures, keep native scrolling. (This disables pull-to-refresh.)
 *  - In-page #anchor links glide to their section, leaving room for the sticky navbar.
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const maxY = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
const menuOpen = () => !!document.querySelector('.ox-head.is-menu');

type Smooth = { cur: number; tgt: number; raf: number; ease: number };
let sc: Smooth | null = null;
let scrollToY: ((y: number, ease?: number) => void) | null = null;

if (!reduced && (finePointer || hasTouch)) {
  const s: Smooth = { cur: window.scrollY, tgt: window.scrollY, raf: 0, ease: 0.1 };
  sc = s;
  const step = () => {
    s.cur += (s.tgt - s.cur) * s.ease;
    if (Math.abs(s.tgt - s.cur) < 0.5) {
      s.cur = s.tgt;
      s.raf = 0;
    } else {
      s.raf = requestAnimationFrame(step);
    }
    window.scrollTo({ top: s.cur, behavior: 'instant' });
  };
  scrollToY = (y, ease = 0.1) => {
    if (!s.raf) s.cur = window.scrollY;
    s.ease = ease;
    s.tgt = Math.max(0, Math.min(maxY(), y));
    if (!s.raf) s.raf = requestAnimationFrame(step);
  };

  if (finePointer) {
    window.addEventListener(
      'wheel',
      (e) => {
        if (e.ctrlKey || e.defaultPrevented || maxY() === 0) return;
        const t = e.target as Element | null;
        if (t?.closest?.('textarea, select, [role="menu"]')) return;
        e.preventDefault();
        let d = e.deltaY;
        if (e.deltaMode === 1) d *= 40;
        else if (e.deltaMode === 2) d *= window.innerHeight;
        const base = s.raf ? s.tgt : window.scrollY;
        scrollToY!(base + d);
      },
      { passive: false },
    );
  }

  if (hasTouch) {
    const t = { on: false, dir: 0, x: 0, y: 0, lastY: 0, lastT: 0, v: 0 };
    window.addEventListener(
      'touchstart',
      (e) => {
        const target = e.target as Element | null;
        const skip =
          e.touches.length > 1 ||
          menuOpen() ||
          !!target?.closest?.('.ox-mnav, textarea, select, input, [role="menu"]') ||
          maxY() === 0;
        t.on = !skip;
        t.dir = 0;
        t.v = 0;
        if (skip) return;
        // grab: stop any glide where it is
        if (s.raf) {
          cancelAnimationFrame(s.raf);
          s.raf = 0;
        }
        s.cur = s.tgt = window.scrollY;
        t.x = e.touches[0].clientX;
        t.y = t.lastY = e.touches[0].clientY;
        t.lastT = performance.now();
      },
      { passive: true },
    );
    window.addEventListener(
      'touchmove',
      (e) => {
        if (!t.on) return;
        if (e.touches.length > 1) {
          t.on = false;
          return;
        }
        const p = e.touches[0];
        if (!t.dir) {
          const dx = Math.abs(p.clientX - t.x);
          const dy = Math.abs(p.clientY - t.y);
          if (dx < 4 && dy < 4) return;
          t.dir = dy >= dx ? 1 : 2;
        }
        if (t.dir !== 1) return;
        e.preventDefault();
        const now = performance.now();
        const d = t.lastY - p.clientY;
        const dt = Math.max(1, now - t.lastT);
        t.v = t.v * 0.6 + (d / dt) * 0.4;
        t.lastY = p.clientY;
        t.lastT = now;
        scrollToY!(s.tgt + d, 0.35);
      },
      { passive: false },
    );
    const end = () => {
      if (!t.on) return;
      t.on = false;
      if (t.dir !== 1) return;
      // momentum: glide on in the swipe direction (ignored if the finger rested before lifting)
      const v = performance.now() - t.lastT > 80 ? 0 : t.v;
      if (Math.abs(v) > 0.05) scrollToY!(s.tgt + v * 380, 0.06);
    };
    window.addEventListener('touchend', end, { passive: true });
    window.addEventListener('touchcancel', end, { passive: true });
  }
}

// In-page links glide to their section, leaving room for the sticky navbar
document.addEventListener('click', (e) => {
  const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href')!.slice(1);
  const el = id ? document.getElementById(id) : null;
  if (!el) return;
  e.preventDefault();
  // stop just under the stuck navbar (32 + 72 = 104px on desktop, as in the canvas)
  const root = getComputedStyle(document.documentElement);
  const offset = parseFloat(root.getPropertyValue('--head-top')) + parseFloat(root.getPropertyValue('--head-h')) || 104;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  if (sc && scrollToY) scrollToY(y);
  else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
});
