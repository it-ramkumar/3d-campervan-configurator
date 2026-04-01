// Track karo ke already initialized hai ya nahi
let isInitialized = false;

export const pageView = (url) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", { page_path: url });
  }
};

export const event = ({ action, category, label, value }) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Event delegation use karo - better performance
const setupEventDelegation = () => {
  // Single click listener for entire document
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (!target) return;

    // External links
    if (target.tagName === 'A') {
      const href = target.getAttribute('href');
      if (!href) return;

      // External link
      if (href.startsWith('http') && !href.includes(window.location.hostname)) {
        event({
          action: 'click',
          category: 'External Link',
          label: href,
          value: 1,
        });
      }
      // Mailto
      else if (href.startsWith('mailto:')) {
        event({
          action: 'click',
          category: 'Email Link',
          label: href,
          value: 1,
        });
      }
      // Downloads
      else if (/\.(pdf|zip|jpg|png|doc|docx)$/i.test(href)) {
        event({
          action: 'download',
          category: 'File Download',
          label: href,
          value: 1,
        });
      }
    }

    // Buttons
    if (target.tagName === 'BUTTON') {
      const label = target.innerText || target.getAttribute('aria-label') || 'Unnamed Button';
      event({
        action: 'click',
        category: 'Button',
        label: label,
        value: 1,
      });
    }
  }, true); // Use capture phase

  // Form submissions
  document.addEventListener('submit', (e) => {
    if (e.target.tagName === 'FORM') {
      const name = e.target.getAttribute('name') || 'Unnamed Form';
      event({
        action: 'submit',
        category: 'Form',
        label: name,
        value: 1,
      });
    }
  }, true);
};

// Initialize only once
export const initAnalytics = () => {
  // Prevent multiple initializations
  if (isInitialized) {
    console.warn('Analytics already initialized');
    return;
  }

  // // Check if gtag is loaded
  // if (typeof window.gtag !== 'function') {
  //   console.warn('gtag not loaded, analytics disabled');
  //   return;
  // }

  isInitialized = true;

  // First page view
  pageView(window.location.pathname + window.location.search);

  // Setup event delegation (single listener instead of multiple)
  setupEventDelegation();
};