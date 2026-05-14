const Vans = require('../models/vanModel');
const Portfolio = require("../models/portfolio");
const Blog = require("../models/testBlog");

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const staticPages = ['', '/custom-build', '/configurator', '/inquiry', '/van-options/exterior-options', '/van-options/interior-options', '/van-options/system-options', '/sprinter-guide', '/van-layouts', '/layout-by-category', '/contact', '/our-process', '/showroom', '/financing', '/about-us', '/our-clients', '/blog', '/quick-links', '/faq', '/careers', '/camper-vans-for-sale', '/where-to-camp'];

        // Data fetch karein
        const [VansLink, PortfolioLink, BlogLink] = await Promise.all([
            Vans.find({}).select('slug updatedAt'),
            Portfolio.find({}).select('slug updatedAt van_listing.specifications.wheelbase').lean(),
            Blog.find({}).select('slug updatedAt')


        ]);

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        // Static Pages
        staticPages.forEach(page => {
            xml += `  <url><loc>https://www.bigbearvans.com${page}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
        });

        // Helper function taake code ganda na ho aur crash se bachein
        const addLinks = (links, path) => {
            links.forEach(item => {
                // Safety Check: Agar updatedAt nahi hai toh aaj ki date use karein
                const date = item.updatedAt ? item.updatedAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
                xml += `  <url><loc>https://www.bigbearvans.com/${path}/${item.slug}</loc><lastmod>${date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
            });
        };

        addLinks(VansLink, 'van-detail');
        addLinks(PortfolioLink, 'layout-detail');
        addLinks(BlogLink, 'blog-detail');
        // wheelBase(PortfolioLink, 'wheel-base');



        xml += `</urlset>`;

        res.header('Content-Type', 'application/xml');
        res.send(xml);
    } catch (error) {
        console.error('Sitemap Detailed Error:', error); // Console check karein asli error dekhne ke liye
        res.status(500).send('Error generating sitemap: ' + error.message);
    }
});

module.exports = router;