import { PUBLISHER, SITE_URL } from "./business";

export const generateBlogSchema = (blog, currentUrl) => {
  if (!blog) return null;

  // no `new Date()` fallback — a fake "today" date changes on every crawl
  const publishDate = blog.date || blog.createdAt;
  const modifiedDate = blog.updatedAt || publishDate;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${currentUrl}#blogposting`,

    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },

    "headline": blog.title,
    "description": blog.description || blog.title,

    "image": blog.gallery && blog.gallery.length > 0
      ? blog.gallery
      : ["https://www.bigbearvans.com/images/blackLogo.webp"],

    ...(publishDate && { "datePublished": publishDate }),
    ...(modifiedDate && { "dateModified": modifiedDate }),

    "author": [
      { "@type": "Person", "name": "Artur", "url": `${SITE_URL}/about-us` },
      { "@type": "Person", "name": "Anna", "url": `${SITE_URL}/about-us` }
    ],

    "publisher": PUBLISHER,

    "articleSection": "Camper Van Guides",
    "inLanguage": "en-US",

    "wordCount": blog.content
      ?.map(b => b.text || "")
      .join(" ")
      .split(" ").length,

    "articleBody": blog.content
      ?.filter(block => block.type === "paragraph" || block.type === "heading")
      .map(block => block.text)
      .join(" "),

    "keywords": "camper van conversion, custom van builds, van life tips"
  };
};