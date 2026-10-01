import { sendGTMEvent } from "@next/third-parties/google";

// Track karo ke already initialized hai ya nahi
let isInitialized = false;

// Page views are sent by the Google tag in GTM; this file only pushes interaction events.
export const event = ({ action, category, label }) => {
  sendGTMEvent({
    event: action,
    event_category: category,
    event_label: label,
  });
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
        event({ action: 'outbound_click', category: 'External Link', label: href });
      }
      // Phone
      else if (href.startsWith('tel:')) {
        event({ action: 'phone_click', category: 'Phone Link', label: href });
      }
      // Mailto
      else if (href.startsWith('mailto:')) {
        event({ action: 'email_click', category: 'Email Link', label: href });
      }
      // Downloads
      else if (/\.(pdf|zip|jpg|png|doc|docx)$/i.test(href)) {
        event({ action: 'file_download', category: 'File Download', label: href });
      }
    }

    // Buttons
    if (target.tagName === 'BUTTON') {
      const label = (target.innerText || target.getAttribute('aria-label') || 'Unnamed Button').trim().slice(0, 100);
      event({ action: 'button_click', category: 'Button', label });
    }
  }, true); // Use capture phase

  // Form submissions
  document.addEventListener('submit', (e) => {
    if (e.target.tagName === 'FORM') {
      const name = e.target.getAttribute('name') || 'Unnamed Form';
      event({ action: 'form_submit', category: 'Form', label: name });
    }
  }, true);
};

// Initialize only once
export const initAnalytics = () => {
  if (isInitialized) return;
  isInitialized = true;
  setupEventDelegation();
};
