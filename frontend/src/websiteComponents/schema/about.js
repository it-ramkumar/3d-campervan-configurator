export const generateAboutSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": "Big Bear Vans",
    "description": "Specializing in family-friendly custom campervan builds with innovative space-saving solutions like elevator beds and compact aluminum bathrooms.",
    "founder": [
      {
        "@type": "Person",
        "name": "Artur"
      },
      {
        "@type": "Person",
        "name": "Anna"
      }
    ],
    "image": "https://bigbearvans.com/images/anna.webp",
    "knowsAbout": ["Custom Van Conversions", "Sprinter Van Builds", "RV Innovation", "Family Campervans"]
  }
});