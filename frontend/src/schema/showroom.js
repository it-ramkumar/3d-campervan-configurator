import { SITE_URL, BUSINESS } from "./business";

// Showroom is the same physical location as the business, so it reuses the
// main entity instead of declaring a second LocalBusiness at the same address
export const generateShowroomSchema = (heroImage) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/showroom/#webpage`,
      "url": `${SITE_URL}/showroom`,
      "name": "Big Bear Vans Showroom & Workshop",
      "description": `Tour Big Bear Vans' California showroom and workshop.
 See finished camper van builds in person, meet our team,
and start your custom conversion.`,
      "inLanguage": "en-US",
      "about": { "@id": BUSINESS["@id"] },
      ...(heroImage && {
        "primaryImageOfPage": heroImage.startsWith("http") ? heroImage : `${SITE_URL}${heroImage}`
      })
    },
    BUSINESS
  ]
});
