export const generateBlogListingSchema = (blogs) => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Big Bear Vans Conversion Blog",
  "description": "Expert guides on camper van materials, bathroom setups, kitchen layouts, and van life tips.",
  "publisher": {
    "@type": "Organization",
    "name": "Big Bear Vans"
  },
  "blogPost": blogs.map(blog => ({
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.description,
    "image": blog.gallery?.[0],
    "url": `https://bigbearvans.com/blog-detail/${blog.slug}`
  }))
});