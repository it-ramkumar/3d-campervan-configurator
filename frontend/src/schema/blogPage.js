export const generateBlogListingSchema = (blogs, currentPage) => {

  const baseUrl = "https://www.bigbearvans.com/blog";
  const currentUrl = currentPage > 1 ? `${baseUrl}?page=${currentPage}` : baseUrl;

  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${currentUrl}#blog`,
    "name": currentPage > 1
      ? `Big Bear Vans Journal - Page ${currentPage}`
      : "Big Bear Vans Journal | Van Conversion Expert Guides",

    "description":
      "Expert guides on camper van materials, custom layout designs, and off-grid electrical systems.",

    "url": currentUrl,

    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },

    "publisher": {
      "@type": "Organization",
      "name": "Big Bear Vans",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.bigbearvans.com/images/blackLogo.jpg"
      }
    },

    // 👇 Google ko ordered content structure milta hai
    "blogPost": blogs.map((blog, index) => {

      const publishDate =
        blog.date ||
        blog.createdAt ||
        blog.updatedAt;

      const modifiedDate =
        blog.updatedAt ||
        blog.createdAt ||
        blog.date;

      return {
        "@type": "BlogPosting",
        "@id": `https://www.bigbearvans.com/blog-detail/${blog.slug}#blogposting`,

        "headline": blog.title,

        "description": blog.description
          ? blog.description.substring(0, 160)
          : "Expert camper van conversion guide by Big Bear Vans.",

        "image":
          blog.gallery?.[0] ||
          "https://www.bigbearvans.com/heroSlider/bloghero.webp",

        "url": `https://www.bigbearvans.com/blog-detail/${blog.slug}`,

        "datePublished": publishDate,
        "dateModified": modifiedDate,

        "author": {
          "@type": "Person",
          "name": "Artur & Anna"
        },

        "publisher": {
          "@type": "Organization",
          "name": "Big Bear Vans",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.bigbearvans.com/images/blackLogo.jpg"
          }
        },

        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://www.bigbearvans.com/blog-detail/${blog.slug}`
        }
      };
    })
  };
};