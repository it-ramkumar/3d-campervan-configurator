// Single source of truth for the business entity (NAP, hours, socials).
// Every schema references this so Google sees one consistent business.

export const SITE_URL = "https://www.bigbearvans.com";
export const BUSINESS_ID = `${SITE_URL}/#organization`;
export const LOGO_URL = `${SITE_URL}/images/blackLogo.webp`;
export const PHONE = "+1-951-441-9719";

export const ADDRESS = {
  "@type": "PostalAddress",
  "streetAddress": "320 W Big Bear Blvd",
  "addressLocality": "Big Bear",
  "addressRegion": "CA",
  "postalCode": "92314",
  "addressCountry": "US"
};

export const GEO = {
  "@type": "GeoCoordinates",
  "latitude": 34.260751,
  "longitude": -116.8497999
};

// Sunday is by appointment only, so it's left out (no fixed hours)
export const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": "Saturday",
    "opens": "10:00",
    "closes": "16:00"
  }
];

// Keep in sync with the footer social icons — only profiles the site links to
export const SAME_AS = [
  "https://www.instagram.com/bigbearvans",
  "https://x.com/bigbearvans_",
  "https://www.youtube.com/channel/UCQFzU9eB7Aa8x_E9ov1hD7w",
  "https://www.linkedin.com/company/big-bear-vans"
];

export const AREA_SERVED = { "@type": "Country", "name": "United States" };

// Full entity — use on pages about the business itself (home, about, contact, showroom)
export const BUSINESS = {
  "@type": "AutomotiveBusiness",
  "@id": BUSINESS_ID,
  "name": "Big Bear Vans",
  "url": SITE_URL,
  "logo": LOGO_URL,
  "image": `${SITE_URL}/meta-data/home-meta-image.webp`,
  "description": "Premium custom camper van conversions on Mercedes Sprinter and Ford Transit, featuring 3D design and CNC-engineered cabinetry.",
  "telephone": PHONE,
  "priceRange": "$$$",
  "address": ADDRESS,
  "geo": GEO,
  "openingHoursSpecification": OPENING_HOURS,
  "areaServed": AREA_SERVED,
  "sameAs": SAME_AS
};

// Short reference — use as provider/publisher/seller on other pages
export const BUSINESS_REF = {
  "@type": "AutomotiveBusiness",
  "@id": BUSINESS_ID,
  "name": "Big Bear Vans",
  "url": SITE_URL,
  "telephone": PHONE,
  "address": ADDRESS
};

export const PUBLISHER = {
  "@type": "Organization",
  "@id": BUSINESS_ID,
  "name": "Big Bear Vans",
  "logo": { "@type": "ImageObject", "url": LOGO_URL }
};
