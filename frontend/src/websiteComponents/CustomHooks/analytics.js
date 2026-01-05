// analytics.js
// Full production-ready GA helper for React SPA
// Tracks page views, links, forms, buttons, downloads, mailto

export const pageView = (url) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", { page_path: url });
  } else {
    console.warn("gtag not loaded yet, pageView skipped:", url);
  }
};

export const event = ({ action, category, label, value }) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    console.warn("gtag not loaded yet, event skipped:", action);
  }
};

// Track external links
const trackExternalLinks = () => {
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    if (href.startsWith("#") || href.startsWith("/")) return; // internal links

    link.addEventListener("click", () => {
      event({
        action: "click",
        category: "External Link",
        label: href,
        value: 1,
      });
    });
  });
};

// Track mailto links
const trackMailtoLinks = () => {
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener("click", () => {
      event({
        action: "click",
        category: "Email Link",
        label: link.getAttribute("href"),
        value: 1,
      });
    });
  });
};

// Track downloads
const trackDownloads = () => {
  document.querySelectorAll('a[href$=".pdf"], a[href$=".zip"], a[href$=".jpg"], a[href$=".png"]').forEach((link) => {
    link.addEventListener("click", () => {
      event({
        action: "download",
        category: "File Download",
        label: link.getAttribute("href"),
        value: 1,
      });
    });
  });
};

// Track forms
const trackForms = () => {
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", () => {
      const name = form.getAttribute("name") || "Unnamed Form";
      event({
        action: "submit",
        category: "Form",
        label: name,
        value: 1,
      });
    });
  });
};

// Track all buttons
const trackButtons = () => {
  document.querySelectorAll("button").forEach((btn) => {
    const label = btn.innerText || btn.getAttribute("aria-label") || "Unnamed Button";
    btn.addEventListener("click", () => {
      event({
        action: "click",
        category: "Button",
        label: label,
        value: 1,
      });
    });
  });
};

// Initialize all automatic tracking
export const initAnalytics = () => {
  if (process.env.NODE_ENV !== "production") return;

  // First page view
  pageView(window.location.pathname + window.location.search);

  // Auto tracking
  trackExternalLinks();
  trackMailtoLinks();
  trackDownloads();
  trackForms();
  trackButtons();
};
