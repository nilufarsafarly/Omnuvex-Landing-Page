/**
 * Sections below the hero fade and rise in once as they enter the screen.
 * Classes are only added when motion is allowed, so content is never hidden without JS.
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced && 'IntersectionObserver' in window) {
  const sections = document.querySelectorAll<HTMLElement>('main > section:not(.ox-hero), footer.ox-sfoot');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0 },
  );
  sections.forEach((el) => {
    el.classList.add('ox-rv');
    io.observe(el);
  });
}
