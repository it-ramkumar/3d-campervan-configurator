// helpers/blogSchema.js

export const generateBlogSchema = (blog) => {
  if (!blog) return null;

  const url = window.location.href;
  const publishDate = new Date(blog.createdAt).toISOString();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.description || blog.title,
    "image": blog.gallery?.[0] || "",
    "datePublished": publishDate,
    "dateModified": blog.updatedAt ? new Date(blog.updatedAt).toISOString() : publishDate,
    "author": {
      "@type": "Organization",
      "name": "Big Bear Vans",
      "url": "https://bigbearvans.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Big Bear Vans",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bigbearvans.com/logo.png" // Replace with your actual logo URL
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "wordCount": blog.content?.length * 50, // Approximation
    "articleBody": blog.content
      ?.filter(block => block.type === 'paragraph' || block.type === 'heading')
      .map(block => block.text)
      .join(" ")
  };
};