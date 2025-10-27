import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { getAllBlogs } from "../../../api/blog/getAllBlogs";
import { CalendarDays, Clock, Search, Filter, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export default function BlogsListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const containerRef = useRef(null);
  const [blogs ,setBlogs]=useState()

  const heroImage = "/heroSlider/bloghero.png";

  // Exact blog data with your content only
  const blogData = [
    {
      id: 1,
      title: "Campervan with Toilets",
      des: "Campervan Toilets Pros and Cons of Different Camper Van Toilet Options The Best Toilets for Your Journey! Embarking on a...",
      excerpt: "Campervan Toilets Pros and Cons of Different Camper Van Toilet Options The Best Toilets for Your Journey! Embarking on a...",
      image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?auto=format&fit=crop&w=800&q=80",
      date: "October 2, 2025",
      readTime: "6 min read",
      author: "Van Life Expert",
      category: "Vanlife Tips & Advice",
      featured: true,
      views: 1247,
      likes: 89
    },
    {
      id: 2,
      title: "Camper Van Bathroom",
      des: "Off-Grid Living Hero Section Guide Off-Grid Living, Where Inspiration Meets Independence. Sprinter Van Bathroom Options Guide 6 Most Common Sprinter...",
      excerpt: "Off-Grid Living Hero Section Guide Off-Grid Living, Where Inspiration Meets Independence. Sprinter Van Bathroom Options Guide 6 Most Common Sprinter...",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      date: "September 22, 2025",
      readTime: "8 min read",
      author: "Van Life Expert",
      category: "Custom Vans and Conversions",
      featured: true,
      views: 987,
      likes: 76
    },
    {
      id: 3,
      title: "Campervan Water Systems Guide",
      des: "Big Bear Vans's CampervanWater Systems Everything You Need to Know Campervan Water System – Everything You Need to Know Welcome...",
      excerpt: "Big Bear Vans's CampervanWater Systems Everything You Need to Know Campervan Water System – Everything You Need to Know Welcome...",
      image: "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?auto=format&fit=crop&w=800&q=80",
      date: "September 19, 2025",
      readTime: "7 min read",
      author: "Van Life Expert",
      category: "Vanlife Tips & Advice",
      featured: false,
      views: 856,
      likes: 64
    },
    {
      id: 4,
      title: "18 Must-Have Accessories for Your Camper Van",
      des: "18 Must-Have Camper Van Accessories 18 Must-Have Accessories for Your Camper Van A Comprehensive Guide When it comes to camper...",
      excerpt: "18 Must-Have Camper Van Accessories 18 Must-Have Accessories for Your Camper Van A Comprehensive Guide When it comes to camper...",
      image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80",
      date: "September 18, 2025",
      readTime: "5 min read",
      author: "Van Life Expert",
      category: "Camper Van Buying Guides",
      featured: false,
      views: 1123,
      likes: 92
    },
    {
      id: 5,
      title: "FWD vs RWD vs AWD vs 4WD",
      des: "Fwd vs RWD vs AWD vs 4WD Which drivetrain is right for your campervan? Practical advice to help you choose...",
      excerpt: "Fwd vs RWD vs AWD vs 4WD Which drivetrain is right for your campervan? Practical advice to help you choose...",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
      date: "September 17, 2025",
      readTime: "4 min read",
      author: "Van Life Expert",
      category: "Camper Van Buying Guides",
      featured: false,
      views: 734,
      likes: 58
    },
    {
      id: 6,
      title: "Sprinter vs. Transit vs. Promaster",
      des: "Navigating the Road to Van Life Choosing the Ultimate Adventure Van: Sprinter vs. Transit vs. Promaster Choosing the ideal van...",
      excerpt: "Navigating the Road to Van Life Choosing the Ultimate Adventure Van: Sprinter vs. Transit vs. Promaster Choosing the ideal van...",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80",
      date: "September 17, 2025",
      readTime: "9 min read",
      author: "Van Life Expert",
      category: "Camper Van Buying Guides",
      featured: true,
      views: 1567,
      likes: 104
    }
  ];

  const categories = [
    "All Categories",
    "Camper Van Buying Guides",
    "Custom Vans and Conversions",
    "Lifestyle",
    "RV Living",
    "Travel & Adventure",
    "Travel Services",
    "Vanlife Tips & Advice"
  ];

  const popularTags = [
    "VanLife", "Big bear vans", "my custom vans", "CamperVans", "big bear van life",
    "van life", "van adventure", "Mercedes Sprinter van", "Camper van buying tips", "Custom Sprinter conversion"
  ];

  // const recentPosts = blogData.slice(0, 4);
const recentPosts = blogs
  ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest first
  .slice(0, 3); // sirf 3 blogs

  // Filter blogs based on search and category
  const filteredBlogs = blogData.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlogs = filteredBlogs.filter(blog => blog.featured);
  const regularBlogs = filteredBlogs.filter(blog => !blog.featured);

  useEffect(() => {
    // GSAP context for safe cleanup
    const ctx = gsap.context(() => {
      // Background image animation (Ken Burns effect)
      gsap.fromTo(
        ".bg-image",
        { scale: 1, x: 0, y: 0 },
        {
          scale: 1.1,
          x: "random(-3%, 3%)",
          y: "random(-3%, 3%)",
          duration: 15,
          ease: "none",
          repeat: -1,
          yoyo: true,
        }
      );

      // Text animation timeline
      const tl = gsap.timeline();

      // Animate the new content elements sequentially
      tl.from(".anim-content", {
        y: 80, // Animate from bottom
        opacity: 0,
        stagger: 0.2, // Small delay between each element
        duration: 1.2,
        ease: "power3.out",
      });
    }, containerRef);

    // Cleanup function to revert animations when the component unmounts
    return () => ctx.revert();
  }, []);
useEffect(()=>{
const fetch =async ()=>{
const data = await getAllBlogs()
setBlogs(data.data)
}
fetch()
},[])
  return (
     <>
  <Navbar />

  {/* ✅ Hero Section */}
  <div
    ref={containerRef}
    className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden"
  >
    <img
      src={heroImage}
      alt="Blogs Hero Section"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/60"></div>

    <div className="relative flex flex-col items-center justify-center h-full text-center px-6 pb-20">
      <h1 className="font-serif font-extrabold text-4xl md:text-6xl text-white mb-4 drop-shadow-xl">
        Blogs
      </h1>
      <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light drop-shadow-lg">
        Read our latest articles, tips, and insights
      </p>
    </div>
  </div>

  {/* ✅ Main Content */}
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <div className="max-w-[95%] mx-auto px-4 lg:px-8 py-16">
      {/* Search + Filter */}
      <div className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase">
            Search Articles
          </label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-800 text-lg shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase">
            Filter by Category
          </label>
          <select
            className="w-full pl-3 pr-8 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-800 text-lg shadow-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Van Life</option>
            <option>Travel</option>
            <option>Guides</option>
          </select>
        </div>
      </div>

      {/* ✅ Latest Articles */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full border">
            {blogs?.length} articles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8 w-full">
          {blogs?.map((blog) => (
            <article
              key={blog._id}
              className="group bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <img
                src={blog.gallery[0]}
                alt={blog.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-gray-700">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {blog.des}
                </p>
                <a
                  href={`/blog-detail/${blog.slug}`}
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-all"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {blogs?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No articles found.</p>
          </div>
        )}
      </div>
    </div>
  </div>

  <Footer />
</>


  );
}