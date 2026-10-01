import { SITE_URL, BUSINESS } from "./business";

export const generateAboutSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about-us/#webpage`,
      "url": `${SITE_URL}/about-us`,
      "name": "About Big Bear Vans - Our Story & Team | Big Bear Vans",
      "description": `Meet the team behind Big Bear Vans. Founded by van lifers
 Artur & Anna, we've delivered 105+ custom Sprinter and
Transit camper van conversions.`,
      "inLanguage": "en-US",
      "about": { "@id": BUSINESS["@id"] },
      "publisher": { "@id": BUSINESS["@id"] }
    },
    {
      ...BUSINESS,
      "founder": [
        {
          "@type": "Person",
          "name": "Artur",
          "jobTitle": "Co-Founder & Lead Engineer"
        },
        {
          "@type": "Person",
          "name": "Anna",
          "jobTitle": "Co-Founder & Design Lead",
          "image": `${SITE_URL}/custom%20build/anna-arthur-big-bear-vans.webp`
        }
      ],
      "knowsAbout": [
        "Custom Van Conversions",
        "Sprinter Van Builds",
        "Ford Transit Conversions",
        "Family Campervans",
        "CNC Engineered Cabinetry"
      ]
    }
  ]
});
