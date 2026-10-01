import { SITE_URL, BUSINESS } from "./business";

export const generateHomeSchema = (faqData) => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": SITE_URL,
        "name": "Big Bear Vans",
        "inLanguage": "en-US",
        "publisher": { "@id": BUSINESS["@id"] }
      },
      BUSINESS
    ]
  };

  // ✅ FAQ Logic: Agar faqData hai toh usay @graph mein push karein
  if (faqData && faqData.length > 0) {
    schema["@graph"].push({
      "@type": "FAQPage",
      "mainEntity": faqData.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    });
  }

  return schema;
};
