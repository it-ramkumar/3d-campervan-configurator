// The consultation section (calendar + contact form) is rendered at the bottom of most pages
// by ConditionalLayout. Contact CTAs keep href="/contact" as a fallback, and use this as onClick
// to scroll down instead when the section is on the current page.
export const CONSULTATION_ID = "consultation";

// True for links to the contact page ("/contact", "/contact/", full bigbearvans.com URL),
// e.g. CTA buttons whose URL is typed in the dashboard
export const isContactUrl = (url = "") =>
  /^(https?:\/\/(www\.)?bigbearvans\.com)?\/contact\/?$/i.test(url.trim());

export function scrollToConsultation(e) {
  const section = document.getElementById(CONSULTATION_ID);
  if (!section) return; // section hidden on this page: let the /contact link navigate

  e.preventDefault();
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}
