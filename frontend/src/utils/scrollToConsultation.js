// The consultation section (calendar + contact form) is rendered at the bottom of most pages
// by ConditionalLayout. Contact CTAs keep href="/contact" as a fallback, and use this as onClick
// to scroll down instead when the section is on the current page.
export const CONSULTATION_ID = "consultation";

// True for links to the contact page ("/contact", "/contact/", full bigbearvans.com URL),
// e.g. CTA buttons whose URL is typed in the dashboard
export const isContactUrl = (url = "") =>
  /^(https?:\/\/(www\.)?bigbearvans\.com)?\/contact\/?$/i.test(url.trim());

const MAX_REAIMS = 3;
const USER_SCROLL_EVENTS = ["wheel", "touchstart", "keydown"];

// Calls `done` once the page has stopped scrolling for ~100ms (ignoring the first 200ms, before
// the smooth scroll has picked up speed)
function onScrollSettled(done) {
  const start = performance.now();
  let lastY = window.scrollY;
  let stillFrames = 0;
  const tick = () => {
    if (window.scrollY === lastY) stillFrames += 1;
    else { stillFrames = 0; lastY = window.scrollY; }
    if (stillFrames >= 6 && performance.now() - start > 200) return done();
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function scrollToConsultation(e) {
  const section = document.getElementById(CONSULTATION_ID);
  if (!section) return; // section hidden on this page: let the /contact link navigate

  e.preventDefault();
  section.scrollIntoView({ behavior: "smooth", block: "start" });

  // Lazy images above the section can change height while we scroll past them, which moves the
  // section after the scroll target was set. Once the scroll settles, re-aim if it drifted,
  // unless the visitor took over scrolling themselves.
  let cancelled = false;
  const cancel = () => { cancelled = true; };
  USER_SCROLL_EVENTS.forEach((type) => window.addEventListener(type, cancel, { once: true, passive: true }));
  const cleanup = () => USER_SCROLL_EVENTS.forEach((type) => window.removeEventListener(type, cancel));

  const check = (attempt) => onScrollSettled(() => {
    if (cancelled) return cleanup();
    const navOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const drift = section.getBoundingClientRect().top - navOffset;
    // Near the bottom of the page the section can't reach the top; that's as far as it goes
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (Math.abs(drift) <= 2 || atBottom || attempt >= MAX_REAIMS) return cleanup();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    check(attempt + 1);
  });
  check(0);
}
