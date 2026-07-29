import React from "react";
import axios from "axios";
import QuickLinksClient from "../../components/QuickLinks/QuickLinks";

// ✅ 1. SEO Metadata (Server Side)
export const metadata = {
  title: "Quick Links - All Big Bear Vans Resources | Big Bear Vans",
  description: `Jump to Big Bear Vans' inventory, layouts, configurator,
and social channels - all official links and resources
 in one place.`,
  alternates: {
    canonical: "https://www.bigbearvans.com/quick-links",
  },
  openGraph: {
     title: "Quick Links - All Big Bear Vans Resources | Big Bear Vans",
  description: `Jump to Big Bear Vans' inventory, layouts, configurator,
and social channels - all official links and resources
 in one place.`,
    url: "https://www.bigbearvans.com/quick-links",
    type: "website",
    images: ["https://www.bigbearvans.com/images/blackLogo.webp"],
  },
};

// ✅ 2. Schema Generator function
const generateQuickLinksSchema = (links) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Quick Links - All Big Bear Vans Resources | Big Bear Vans",
  "description":`Jump to Big Bear Vans' inventory, layouts, configurator,
and social channels - all official links and resources
 in one place.`,
  "url": "https://www.bigbearvans.com/quick-links",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": links.length,
    "itemListElement": links.map((link, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "WebPage",
        "name": link.title,
        "url": link.url
      }
    }))
  }
});

// ✅ 3. Data Fetching (Server Side)
async function getLinks() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/quick-links`);
    return res.data.links || [];
  } catch (err) {
    console.error("Failed to fetch links on server", err);
    return [];
  }
}

export default async function QuickLinksPage() {
  const links = await getLinks();
  const schema = generateQuickLinksSchema(links);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />


      {/* Passing data to Client Component for animations */}
      <QuickLinksClient initialLinks={links} />

    </>
  );
}