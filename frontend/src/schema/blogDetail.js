export const generateBlogSchema = (blog, currentUrl) => {
  if (!blog) return null;

  const publishDate = blog.date || blog.createdAt || new Date().toISOString();
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
      : ["https://www.bigbearvans.com/images/blackLogo.jpg"],

    "datePublished": publishDate,
    "dateModified": modifiedDate,

    "author": {
      "@type": "Person",
      "name": "Artur & Anna",
      "url": "https://www.bigbearvans.com/about-us"
    },

    "publisher": {
      "@type": "Organization",
      "name": "Big Bear Vans",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.bigbearvans.com/images/blackLogo.jpg"
      }
    },

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