import { SITE_URL, BUSINESS_REF } from "./business";

// Builds are custom (no price) and testimonials have no star rating, so they're
// marked up as CreativeWork case studies — Product needs offers/review and
// Review needs reviewRating, otherwise GSC flags them invalid
const caseStudy = (name, description, author) => ({
  "@type": "CreativeWork",
  "name": name,
  "description": description,
  ...(author && { "author": { "@type": "Person", "name": author } }),
  "creator": BUSINESS_REF
});

export const ClientschemaData = () => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Client Stories & Custom Build Case Studies | Big Bear Vans",
  "description": `Real Big Bear Vans client stories - pet-friendly rigs, mobile
offices, and family Sprinters with elevator beds. See how
 our clients live off-grid.`,
  "url": `${SITE_URL}/our-clients`,
  "inLanguage": "en-US",
  "publisher": BUSINESS_REF,
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      caseStudy("Lake Tahoe Campervan - Family Edition", "144 AWD Sprinter for a family of four with elevator bed system."),
      caseStudy("Blue Whale - 6 Seater Campervan", "Short campervan with seating/sleeping for six, featuring a rooftop hammock."),
      caseStudy("Cusco & Sasha Pet-Friendly Vans", "One of the big reasons we chose Big Bear Vans was for our four dogs.", "Cathy and Ben"),
      caseStudy("MotoVan - Adventure Basecamp", "Exclusive van with a dedicated garage for three motorcycles and sleeping for five."),
      caseStudy("Vermont 170 AWD Sprinter", "It feels so homey. Big Bear Vans adapted to more than two travelers.", "Client from Vermont"),
      caseStudy("San Diego Mobile Office Van", "I am a remote worker, so I wanted an office space as well as a beefy electrical system.", "Remote Worker / Architect")
    ].map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": item
    }))
  }
});
