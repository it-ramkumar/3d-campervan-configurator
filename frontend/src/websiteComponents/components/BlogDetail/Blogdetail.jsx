"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Assuming you use react-router-dom
import Navbar from "../Navbar/Navbar"; // Assuming you have these components
import Footer from "../Footer/Footer"; // Assuming you have these components
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  ArrowRight,
  CalendarDays,
  Clock,
  User,
  Hash, // This is no longer used by the removed TableOfContents, but other components might use it. We'll leave it for now.
} from "lucide-react";

// --- Reusable Blog Components (AESTHETICALLY ENHANCED) ---

/**
 * Section 1: Blog Intro
 */
function BlogIntro({ title, author, date, readTime, content }) {
  return (
    // UPDATED: Reduced vertical padding
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-left">
        {/* Title */}
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tighter">
          {title}
        </h2>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 border-t border-b border-gray-200 py-4">
          <div className="flex items-center gap-2 text-gray-700">
            <User className="w-4 h-4 text-gray-600" />
            <span className="font-medium">{author}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <CalendarDays className="w-4 h-4 text-gray-600" />
            <span className="font-medium">{date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="font-medium">{readTime}</span>
          </div>
        </div>

        {/* Intro Content */}
        <div className="mt-10 font-sans text-xl text-gray-800 leading-relaxed space-y-7">
          {content.map((item, index) => {
            if (item.type === "p") {
              return <p key={index}>{item.text}</p>;
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Section 2: Table of Contents (REMOVED)
 */
// The TableOfContents component function has been removed.

/**
 * Section 3: Image Carousel
 */
function BlogImageCarousel({ images }) {
  const [index, setIndex] = useState(0);

  const paginate = (direction) => {
    let newIndex = index + direction;
    if (newIndex < 0) {
      newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
      newIndex = 0;
    }
    setIndex(newIndex);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    // UPDATED: Reduced vertical padding
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl bg-gray-900">
          <AnimatePresence initial={false} custom={index}>
            <motion.img
              key={index}
              src={images[index]}
              alt={`Van appliance showcase ${index + 1}`}
              className="absolute w-full h-full object-cover"
              custom={index}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            />
          </AnimatePresence>
          <button
            onClick={() => paginate(-1)}
            className="absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full shadow-lg backdrop-blur-sm transition hover:bg-black/75 hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full shadow-lg backdrop-blur-sm transition hover:bg-black/75 hover:scale-105"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  i === index ? "bg-white scale-125 shadow" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Section 4: Text / Image Split Section (Animated)
 */
function BlogImageSection({
  title,
  id,
  content,
  imageUrl,
  reverse = false,
  bgClass = "bg-gray-50",
}) {
  const contentEl = (
    <div className="lg:py-6">
      {title && (
        <h3
          id={id}
          className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-tight scroll-mt-32 tracking-tighter"
        >
          {title}
        </h3>
      )}
      <div className="mt-6 font-sans text-lg text-gray-800 leading-relaxed space-y-6">
        {content.map((item, index) => {
          if (item.type === "p") {
            return <p key={index}>{item.text}</p>;
          }
          if (item.type === "quote") {
            return <BlogQuote key={index}>{item.text}</BlogQuote>;
          }
          return null;
        })}
      </div>
    </div>
  );

  const imageEl = (
    <div className="w-full h-full">
      <img
        src={imageUrl}
        alt={title || "Blog post image"}
        className="w-full h-full object-cover aspect-[4/3] rounded-2xl shadow-xl"
      />
    </div>
  );

  return (
    <motion.section
      // UPDATED: Reduced vertical padding
      className={`py-12 md:py-16 ${bgClass}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center`}
        >
          {reverse ? (
            <>
              {imageEl}
              {contentEl}
            </>
          ) : (
            <>
              {contentEl}
              {imageEl}
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
}

/**
 * Section 5: Full-width Centered Heading Divider
 */
function BlogHeading({ text, bgClass = "bg-white" }) {
  return (
    // UPDATED: Reduced vertical padding
    <section className={`py-12 md:py-16 ${bgClass}`}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="w-24 h-0.5 bg-gray-300 mx-auto mb-8"></div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-wider">
          {text}
        </h2>
      </div>
    </section>
  );
}

/**
 * Section 6: Pros & Cons Block
 * --- AESTHETIC UPDATE: Added stylish top border ---
 */
function BlogProsCons({ prosTitle, prosContent, consTitle, consContent }) {
  return (
    // UPDATED: Reduced vertical padding
    <section className="py-12 md:py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Pros */}
          <div className="relative bg-white rounded-2xl p-8 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            {/* Stylish top border (matches icon) */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gray-900"></div>
            <div className="flex items-center gap-4">
              <CheckCircle className="w-9 h-9 text-gray-900 flex-shrink-0" />
              <h4 className="font-serif text-2xl font-bold text-gray-900 tracking-tight">
                {prosTitle || "Pros"}
              </h4>
            </div>
            <p className="mt-6 font-sans text-lg text-gray-700 leading-relaxed">
              {prosContent}
            </p>
          </div>
          {/* Cons */}
          <div className="relative bg-gray-900 rounded-2xl p-8 shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-gray-700/50 hover:-translate-y-1">
            {/* Stylish top border (matches icon) */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gray-500"></div>
            <div className="flex items-center gap-4">
              <XCircle className="w-9 h-9 text-gray-500 flex-shrink-0" />
              <h4 className="font-serif text-2xl font-bold text-white tracking-tight">
                {consTitle || "Cons"}
              </h4>
            </div>
            <p className="mt-6 font-sans text-lg text-gray-300 leading-relaxed">
              {consContent}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Section 7: Simple Text-Only Section
 */
function BlogSection({
  title,
  id,
  content,
  bgClass = "bg-white",
}) {
  return (
    // UPDATED: Reduced vertical padding
    <section className={`py-12 md:py-16 ${bgClass}`}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-left">
        {title && (
          <h3
            id={id}
            className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-tight scroll-mt-32 tracking-tighter"
          >
            {title}
          </h3>
        )}
        <div className="mt-6 font-sans text-lg text-gray-800 leading-relaxed space-y-7">
          {content.map((item, index) => {
            if (item.type === "p") {
              return <p key={index}>{item.text}</p>;
            }
            if (item.type === "quote") {
              return <BlogQuote key={index}>{item.text}</BlogQuote>;
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Section 8: Blockquote Component
 */
function BlogQuote({ children }) {
  return (
    <blockquote className="my-10 p-6 md:p-8 bg-gray-100 border-l-4 border-gray-900 rounded-r-lg">
      <p className="font-serif text-xl md:text-2xl italic font-medium text-gray-900 leading-relaxed md:leading-loose">
        {children}
      </p>
    </blockquote>
  );
}

/**
 * Section 9: "More Posts" Card (DARK THEME)
 * This is the component styled with "dark vibes" as requested.
 */
function BlogCard({ title, excerpt, image, date, category, slug }) {
  return (
    <Link
      to={`/blog/${slug}`}
      // DARK THEME STYLING
      className="group bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden shadow-lg shadow-black/30 transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-gray-600/40 hover:border-gray-600 hover:-translate-y-1.5"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          // Added opacity for mood
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <span
          // Inverted category tag
          className="absolute top-4 left-4 bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow"
        >
          {category}
        </span>
      </div>
      <div className="p-6">
        {/* Light text for dark background */}
        <p className="mb-2 text-sm font-medium text-gray-400">{date}</p>
        <h4 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-white transition-colors tracking-tight">
          {title}
        </h4>
        <p className="font-sans text-gray-300 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        <div className="mt-5 flex items-center text-sm font-bold text-white group-hover:gap-3 transition-all">
          Read More{" "}
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

/**
 * Section 10: Small Appliance Grid
 * --- MODIFIED AS REQUESTED ---
 */
function BlogSmallApplianceGrid({ items, bgClass = "bg-gray-50" }) {
  return (
    // UPDATED: Reduced vertical padding
    <section className={`py-12 md:py-16 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.title}
              // UPDATED: Dark theme classes applied here
              className="group bg-gray-900 p-6 rounded-2xl shadow-lg shadow-black/30 border border-gray-700 flex flex-col transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-gray-600/40 hover:border-gray-600 hover:-translate-y-1.5"
            >
              <img
                src={item.img}
                alt={item.title}
                // UPDATED: Added moody opacity effect on hover
                className="w-full h-48 object-cover rounded-lg mb-6 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
              <h4 className="font-serif text-2xl font-bold text-white mb-3 tracking-tight">
                {item.title}
              </h4>
              <p className="font-sans text-gray-300 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- --- --- --- --- --- --- --- --- --- ---
// --- BLOG POST DATA OBJECT ---
// --- --- --- --- --- --- --- --- --- --- ---
// This data structure is REQUIRED to power the components.

const kitchenAppliancesData = {
  // 1. Hero Section Data
  hero: {
    image:
      "/heroSlider/blogdetailhero.png",
    title: "Essential Appliances for Your Van Kitchen",
    subtitle:
      "Choosing appliances for your van kitchen involves weighing the pros and cons of each option. Refrigerators offer convenience but consume power, while propane stoves are efficient yet electric stoves are easier to use. The decision to include an oven depends on cooking preferences and available space.",
  },

  // 2. Intro Section Data
  intro: {
    title:
      "Cooking Essentials: Choosing the Right Appliances for Your Van Kitchen",
    author: "Van Life Experts",
    date: "October 24, 2025",
    readTime: "12 min read",
    content: [
      {
        type: "p",
        text: "Embarking on van life means embracing a mobile lifestyle, and having the right appliances in your kitchen can significantly enhance your culinary adventures on the road. Transitioning from a traditional kitchen to a compact campervan galley may seem daunting, but by prioritizing the essentials—such as a reliable refrigerator, functional sink, and practical stove—you'll soon find yourself whipping up delicious meals with ease.",
      },
      {
        type: "p",
        text: "While appliances can be a significant investment, they are crucial components of your van build that greatly impact your comfort and convenience. In this guide, we'll explore the best van appliance options and other considerations to ensure your kitchen setup is optimized for life on the move.",
      },
    ],
  },

  // 3. Table of Contents Data (REMOVED)
  // tocItems array has been removed.

  // 4. Carousel Data
  carouselImages: [
    "/blogdetail/bimg1.png",
    "/blogdetail/bimg2.png",
    "/blogdetail/bimg3.png",
    "/blogdetail/bimg4.png",
    "/blogdetail/bimg5.png",
    "/blogdetail/bimg6.png",
    "/blogdetail/bimg7.png",
    "/blogdetail/bimg8.png",
  ],

  // 5. Main Body Content (Data-driven array of components)
  body: [
    {
      type: "BlogImageSection",
      props: {
        title: "Campervan Fridges",
        id: "fridges",
        bgClass: "bg-gray-50", // 1.
        imageUrl:
          "/blogdetail/fridge.png",
        content: [
          {
            type: "p",
            text: "When outfitting your van kitchen, selecting the right refrigerator is critical, especially considering power consumption and compatibility with your electrical system. Traditional refrigerators can be power-intensive, posing challenges for solar-powered setups. In contrast, RV refrigerators are purpose-built for efficiency and durability in off-grid environments.",
          },
          {
            type: "p",
            text: "These units, powered by DC, AC, and/or solar energy, feature efficient compressors that cycle as needed, minimizing power draw. This makes them the ideal choice for van conversions equipped with solar panels, ensuring reliable refrigeration without draining your power supply.",
          },
          {
            type: "quote",
            text: "By prioritizing energy-efficient appliances, you can optimize your van's kitchen space while minimizing your environmental footprint.",
          },
        ],
      },
    },
    {
      type: "BlogSection",
      props: {
        bgClass: "bg-white", // 2.
        content: [
          {
            type: "p",
            text: "Upright refrigerators present a versatile option for van kitchens, boasting both compressor and absorption technologies that cater to various power sources such as AC, DC, and 12-volt options. Offering ample storage space and precise temperature control, they are ideal companions for road trips. Their front-opening doors mimic standard house refrigerators, facilitating easy access to stored items.",
          },
          {
            type: "p",
            text: "Despite their inability to accommodate as much as chest fridges, their accessibility remains unmatched, simplifying meal preparation on the go. Additionally, upright fridges excel in maintaining consistent temperature levels regardless of outdoor conditions, ensuring reliable preservation of food and beverages even in extreme climates.",
          },
        ],
      },
    },
    {
      type: "BlogHeading",
      props: {
        text: "UPRIGHT CAMPERVAN FRIDGES",
        bgClass: "bg-white", // 3.
      },
    },
    {
      type: "BlogProsCons",
      props: {
        prosTitle: "Maximizing Convenience",
        prosContent:
          "Upright fridges stand out as a popular choice. With their shelving arrangement, these fridges offer organized storage, making it easy to arrange and locate food items. Their front-opening doors provide convenient access to stored food and drinks. Particularly advantageous for larger motorhomes, upright fridges boast spacious interiors, catering to the needs of van dwellers on extended journeys.",
        consTitle: "Key Considerations",
        consContent:
          "While upright fridges offer convenience, they also come with drawbacks. One major concern is the loss of cold air when the door is opened, potentially leading to temperature fluctuations and increased energy consumption. Additionally, upright fridges tend to consume more energy compared to chest fridges. Moreover, the initial investment cost may be higher.",
      },
    },
    {
      type: "BlogImageSection",
      props: {
        title: "Drawer Fridges",
        bgClass: "bg-white", // 4.
        imageUrl:
          "/blogdetail/dfridge.png",
        reverse: true,
        content: [
          {
            type: "p",
            text: "Drawer fridges offer a practical and organized solution for campers seeking convenience. Designed with accessibility in mind, these fridges feature a unique setup that allows users to access chilled goods without the hassle of digging through the entire fridge. Similar to upright refrigerators, drawer fridges have a front door that opens, revealing a large drawer that slides out for easy access.",
          },
          {
            type: "p",
            text: "This setup not only enhances visibility but also promotes efficient cold air distribution, minimizing temperature fluctuations. While drawer fridges may be less energy-efficient, their practicality and organization features make them a popular choice.",
          },
        ],
      },
    },
    {
      type: "BlogHeading",
      props: {
        text: "DRAWER CAMPERVAN FRIDGES",
        bgClass: "bg-white", // 5.
      },
    },
    {
      type: "BlogProsCons",
      props: {
        prosTitle: "Efficiency Meets Organization",
        prosContent:
          "With their convenient drawer design, these fridges provide organized access to items, eliminating the need to rummage through the entire fridge. This setup not only enhances convenience but also promotes efficient cold air distribution, ensuring that items stay consistently chilled. Suitable for various camping setups, drawer fridges accommodate the needs of campers seeking a hassle-free solution.",
        consTitle: "Limitations of Drawer Fridges",
        consContent:
          "While drawer fridges offer benefits, they also come with drawbacks. One limitation is their reduced portability. Additionally, drawer fridges typically have a limited storage capacity compared to chest and upright fridges. Furthermore, the initial investment cost may be slightly higher, posing a budget consideration for camping enthusiasts.",
      },
    },
    {
      type: "BlogImageSection",
      props: {
        title: "Campervan Stoves",
        id: "stoves",
        bgClass: "bg-gray-50", // 6.
        imageUrl:
          "/blogdetail/stove.png",
        reverse: true,
        content: [
          {
            type: "p",
            text: "The allure of van living lies in the freedom to savor home-cooked meals amidst breathtaking outdoor vistas. However, circumstances like urban stealth camping or adverse weather can limit outdoor cooking. We recommend having the capability to cook both indoors and outdoors.",
          },
          {
            type: "p",
            text: "Equipping your kitchen with a reliable campervan stove is key. When it comes to campervan stoves, two main options stand out: induction stoves and propane-powered stoves. Each offers distinct advantages, allowing van dwellers to choose the option that best suits their needs.",
          },
        ],
      },
    },
    {
      type: "BlogSection",
      props: {
        bgClass: "bg-white", // 7.
        content: [
          {
            type: "p",
            text: "Induction stoves offer convenience and ease of cleaning, making them ideal for quick meals. However, their power consumption demands a robust battery bank and inverter setup, which can be costly. Despite these considerations, induction stoves are favored for indoor cooking due to their safety, as they don't involve combustion of gas inside the van.",
          },
          {
            type: "quote",
            text: "Many van owners opt for a one-burner induction stove for daily use, especially for preparing coffee and simple meals.",
          },
        ],
      },
    },
    {
      type: "BlogHeading",
      props: {
        text: "INDUCTION CAMPERVAN STOVES",
        bgClass: "bg-white", // 8.
      },
    },
    {
      type: "BlogProsCons",
      props: {
        prosTitle: "Safe & Easy to Clean",
        prosContent:
          "Induction stoves are a popular option for their safety and ease of cleaning. These stoves eliminate the need for combustible gas, enhancing safety within the confined space of a van. Their flat surface facilitates effortless cleaning, simplifying maintenance in the compact kitchen environment.",
        consTitle: "Power & Cookware Limitations",
        consContent:
          "Induction stoves offer a blend of safety and convenience, but their power requirements and cookware limitations warrant careful consideration. They come with drawbacks, including high power consumption and the requirement for specific cookware. Additionally, achieving precise temperature control may pose challenges.",
      },
    },
    {
      type: "BlogImageSection",
      props: {
        title: "Fixed Propane Stoves",
        bgClass: "bg-gray-50", // 9.
        imageUrl:
          "/blogdetail/propanestove1.jpg",
        content: [
          {
            type: "p",
            text: "Fixed propane stoves offer van dwellers versatility and cost-effectiveness, making them an ideal choice for preparing complex meals without relying on electrical power. With propane being relatively inexpensive, these stoves serve as a budget-friendly option, particularly for those seeking to create a homelier atmosphere.",
          },
          {
            type: "p",
            text: "While permanently installing a propane stove may pose challenges, its ability to provide precise temperature control and longer cook times makes it invaluable.",
          },
        ],
      },
    },
    {
      type: "BlogHeading",
      props: {
        text: "FIXED PROPANE CAMPERVAN STOVES",
        bgClass: "bg-gray-50", // 10.
      },
    },
    {
      type: "BlogProsCons",
      props: {
        prosTitle: "Aesthetic & Versatile",
        prosContent:
          "Fixed propane stoves present a visually appealing and versatile cooking option, adding a touch of sophistication. Their multi-purpose nature allows for the utilization of propane tanks not only for cooking but also for water heating, maximizing space efficiency.",
        consTitle: "Space & Ventilation",
        consContent:
          "Despite their appeal, these stoves come with drawbacks, such as cleaning challenges and significant counter space consumption. Additionally, ensuring proper ventilation for propane tanks adds complexity to the installation. However, for van dwellers prioritizing convenience, they remain a practical choice.",
      },
    },
    {
      type: "BlogSection",
      props: {
        title: "Portable Propane Stoves",
        bgClass: "bg-white", // 11.
        content: [
          {
            type: "p",
            text: "Using a portable propane stove offers van dwellers a flexible and budget-friendly alternative for cooking both indoors and outdoors. These stoves offer versatility without the need for built-in installations. Setting up a camp stove on the countertop allows for efficient use of space.",
          },
          {
            type: "p",
            text: "Cooking outside during good weather minimizes odors. However, when cooking inside with propane, proper ventilation is essential to prevent carbon monoxide poisoning. Keeping windows cracked and running a fan helps ensure safe indoor cooking.",
          },
        ],
      },
    },
    {
      type: "BlogHeading",
      props: {
        text: "PORTABLE PROPANE CAMPERVAN STOVES",
        bgClass: "bg-white", // 12.
      },
    },
    {
      type: "BlogProsCons",
      props: {
        prosTitle: "Convenient & Versatile",
        prosContent:
          "Portable propane stoves offer a convenient solution, as they can be used both indoors and outdoors. This adaptability makes them well-suited for diverse activities. The ability to use these stoves indoors adds convenience. Their widespread availability of propane fuel make them accessible options.",
        consTitle: "Safety Considerations",
        consContent:
          "It's essential to acknowledge the safety considerations associated with using portable propane stoves indoors. Proper ventilation is paramount to prevent carbon monoxide buildup, emphasizing the need for van owners to ensure adequate airflow by keeping windows cracked and utilizing fans when cooking inside the vehicle.",
      },
    },
    {
      type: "BlogImageSection",
      props: {
        title: "Campervan Ovens",
        id: "ovens",
        bgClass: "bg-gray-50", // 13.
        imageUrl:
          "/blogdetail/oven.jpg",
        reverse: true,
        content: [
          {
            type: "p",
            text: "A stove is essential, but if you're looking to add an oven, there are options available that run on propane. It's important to note that an oven in a van requires constant monitoring and proper ventilation. Most RV stoves and ovens operate on propane.",
          },
          {
            type: "p",
            text: "These gas ranges are particularly advantageous for boondockers who need to conserve electricity. Typically, RV ovens are compact, so it's common to use smaller casserole dishes and baking pans. Despite their compact nature, they offer valuable baking capabilities.",
          },
        ],
      },
    },
    {
      type: "BlogSection",
      props: {
        bgClass: "bg-gray-50", // 14.
        content: [
          {
            type: "p",
            text: "Including an oven offers numerous practical and emotional benefits. It expands culinary possibilities, allowing for roasting, baking, and preparing a variety of dishes. Moreover, the warmth can contribute to a cozy atmosphere.",
          },
          {
            type: "quote",
            text: "For many, cooking in the campervan serves as a creative outlet and a source of comfort, enabling them to recreate familiar dishes and alleviate homesickness.",
          },
        ],
      },
    },
    {
      type: "BlogHeading",
      props: {
        text: "PROPANE CAMPERVAN OVEN",
        bgClass: "bg-gray-50", // 15.
      },
    },
    {
      type: "BlogProsCons",
      props: {
        prosTitle: "Ultimate Versatility",
        prosContent:
          "Having an oven/stove combo is often considered the ultimate vanlife goal, as it provides unparalleled versatility. With both sautéing and baking capabilities, van dwellers have the freedom to create a diverse array of dishes. This combination appliance significantly expands culinary options, making it easier to enjoy home-cooked meals.",
        consTitle: "Safety & Space",
        consContent:
          "The inclusion of an oven necessitates careful consideration of safety and practicality. Proper ventilation is crucial to prevent carbon monoxide buildup, requiring safety measures like CO detectors. Furthermore, the oven occupies valuable counter space, which is already limited. This can pose challenges for meal preparation and usability.",
      },
    },
    {
      type: "BlogImageSection",
      props: {
        title: "Campervan Sinks",
        id: "sinks",
        bgClass: "bg-white", // 16.
        imageUrl:
          "/blogdetail/sink.jpg",
        reverse: true,
        content: [
          {
            type: "p",
            text: "When considering campervan sinks, the primary focus is on practicality, ensuring the basin is spacious enough for various tasks. It's not necessary to splurge on an expensive option. Instead, focus on the basin's shape and how it integrates with the countertop.",
          },
          {
            type: "p",
            text: "Given the limited space, it's wise to consider space-saving features like a cover that can be inserted into the sink, creating a flat surface when not in use. This maximizes countertop space, a precious commodity.",
          },
        ],
      },
    },
    {
      type: "BlogSection",
      props: {
        bgClass: "bg-white", // 17.
        content: [
          {
            type: "p",
            text: "When choosing a stainless steel sink, it's essential to prioritize durability and quality. Pay close attention to attributes such as gauge, grade, and series. Opt for a higher gauge (around 16) for thicker steel, which offers better resistance to dents. Look for sinks made from 18/10 grade stainless steel for a balance of durability and sheen.",
          },
        ],
      },
    },
    {
      type: "BlogHeading",
      props: {
        text: "STAINLESS STEEL SINK",
        bgClass: "bg-white", // 18.
      },
    },
    {
      type: "BlogProsCons",
      props: {
        prosTitle: "Durable & Hygienic",
        prosContent:
          "Stainless steel sinks offer numerous advantages, including affordability, durability, and hygienic properties. They provide excellent value, withstand heat, and resist dents. Their inherent resistance to tarnishing and rusting adds to their appeal. Moreover, stainless steel sinks are easy to clean and naturally resistant to bacteria.",
        consTitle: "Noise & Lack of Variety",
        consContent:
          "Stainless steel sinks have some drawbacks. One notable limitation is the lack of variety in design options. Additionally, the noise factor can be a concern, as they tend to amplify sound. Furthermore, while durable, they are not immune to damage, and abrasive cleaners or harsh materials can cause scratching.",
      },
    },
    {
      type: "BlogImageSection",
      props: {
        title: "Campervan Countertops",
        id: "countertops",
        bgClass: "bg-gray-50", // 19.
        imageUrl:
          "/blogdetail/top.jpg",
        reverse: true,
        content: [
          {
            type: "p",
            text: "Introducing Corian countertops as a low-cost, high-style solid surface alternative is enticing. While no countertop material is flawless, Corian offers numerous benefits, particularly its stain-resistant properties. With its solid surface composition, Corian emerges as a durable and visually appealing option.",
          },
          {
            type: "p",
            text: "Composed of natural minerals and acrylic polymers, Corian offers a wide range of colors and patterns. Its stain-resistant nature makes it an attractive choice for kitchen surfaces.",
          },
        ],
      },
    },
    {
      type: "BlogSection",
      props: {
        bgClass: "bg-gray-50", // 20.
        content: [
          {
            type: "p",
            text: "Corian countertops are versatile and budget-friendly. One key advantage is flexibility, as it can be easily tailored to suit unique needs, whether for intricate designs or long countertops without visible seams.",
          },
          {
            type: "p",
            text: "Additionally, Corian countertops are known for their ease of repair; scratches and chips can be buffed out. They also exhibit high resistance to moisture, ensuring durability.",
          },
        ],
      },
    },
    {
      type: "BlogHeading",
      props: {
        text: "CORIAN CAMPERVAN COUNTERTOPS",
        bgClass: "bg-gray-50", // 21.
      },
    },
    {
      type: "BlogProsCons",
      props: {
        prosTitle: "Hygienic & Seamless",
        prosContent:
          "Corian countertops offer a multitude of benefits. Their nonporous nature ensures a surface that is resistant to stains and bacteria, making them highly hygienic and easy to clean. Furthermore, Corian is renowned for its durability, longevity, and extensive array of colors. Their seamless appearance adds a sleek, modern look.",
        consTitle: "Heat & Scratch Susceptible",
        consContent:
          "Despite their advantages, Corian countertops have drawbacks. While durable, they are not immune to scratches and heat damage, and their appearance may lack a glossy finish. Furthermore, Corian can be susceptible to dents and scratches over time, requiring careful maintenance to preserve their appearance.",
      },
    },
    {
      type: "BlogImageSection",
      props: {
        title: "Campervan Ventilation",
        id: "ventilation",
        bgClass: "bg-white", // 22.
        imageUrl:
          "/blogdetail/ventilation.png",
        reverse: true,
        content: [
          {
            type: "p",
            text: "Adequate ventilation is essential for maintaining a comfortable, safe, and hygienic environment. The key is ensuring a steady flow of fresh air. This can be achieved by installing air vents and fans strategically.",
          },
          {
            type: "p",
            text: "Proper ventilation not only helps regulate internal temperature but also controls humidity, enhancing your living experience. By mastering ventilation, you prevent potential damage from moisture and create a healthier living environment.",
          },
        ],
      },
    },
    {
      type: "BlogSection",
      props: {
        bgClass: "bg-white", // 23.
        content: [
          {
            type: "p",
            text: "The Maxxfan Deluxe roof fan plays a crucial role in our campervan conversion. Its ability to keep the air fresh, increase airflow, evacuate cooking odors, and control moisture is invaluable, ensuring a comfortable and hygienic environment.",
          },
          {
            type: "quote",
            text: "Whether parked or driving, day or night, the fan remains indispensable. Its absence would quickly render the van undesirable.",
          },
        ],
      },
    },
    {
      type: "BlogHeading",
      props: {
        text: "MAXXFAN DELUXE ROOF FAN",
        bgClass: "bg-white", // 24.
      },
    },
    {
      type: "BlogProsCons",
      props: {
        prosTitle: "Powerful & Weatherproof",
        prosContent:
          "The Maxxfan Deluxe boasts several advantages. One notable feature is its built-in rain cover, allowing it to be left open even during rainy conditions. Additionally, the Maxxfan is lauded for its quiet and smooth operation. With 10 speed settings for both intake and exhaust, it provides versatile ventilation.",
        consTitle: "Driving Limitations",
        consContent:
          "There are some limitations. It is not recommended to leave the fan partially opened while driving, as this may lead to potential damage. Users must ensure the fan is either fully closed or fully opened when the vehicle is in motion, which could be a drawback for those seeking adjustable airflow on the move.",
      },
    },
    {
      type: "BlogImageSection",
      props: {
        title: "Additional Cooking Appliances",
        id: "additional",
        bgClass: "bg-gray-50", // 25.
        imageUrl:
          "/blogdetail/stock.jpg",
        reverse: true,
        content: [
          {
            type: "p",
            text: "In the realm of van life, cooking preferences vary widely, and van lifers often customize their kitchen setups with additional cooking appliances to suit their culinary needs on the road.",
          },
          {
            type: "p",
            text: "Amidst our journeys, we've encountered various appliances that have proven invaluable. These fantastic campervan kitchen accessories streamline culinary adventures. By embracing these top camping appliance options, you can optimize your RV space without compromising on functionality.",
          },
        ],
      },
    },
    {
      type: "BlogSmallApplianceGrid",
      props: {
        bgClass: "bg-gray-50", // 26.
        items: [
          {
            title: "Microwave",
            text: "Ideal for adventurers seeking swift meal prep post-hike, it ensures food heats rapidly, sparing precious time and energy.",
            img: "/blogdetail/microwave.jpg",
          },
          {
            title: "Rice Cooker",
            text: "Their efficiency shines through, allowing for the preparation of bulk meals without unnecessarily heating the entire RV.",
            img: "/blogdetail/cooker.jpg",
          },
          {
            title: "Kettle",
            text: "An essential companion for jumpstarting your day. Hot water is readily available within minutes for coffee, tea, or ramen.",
            img: "/blogdetail/kettle.jpg",
          },
          {
            title: "Coffee Maker",
            text: "For those who rely on their morning cup of joe, having a coffee maker readily available is non-negotiable.",
            img: "/blogdetail/coffee.png",
          },
          {
            title: "Toaster Oven",
            text: "This compact appliance serves as a jack-of-all-trades, seamlessly replacing bulky microwaves and ovens.",
            img: "/blogdetail/toaster.png",
          },
          {
            title: "Blender",
            text: "Invaluable for whipping up sauces, smoothies, and cocktails. An immersion blender is a great space-saving alternative.",
            img: "/blogdetail/blender.jpg",
          },
          {
            title: "Air Fryer",
            text: "Allows for guilt-free indulgence in crispy favorites like fries, baked goods, and even pizza with 90% less oil.",
            img: "/blogdetail/fryer.png",
          },
          {
            title: "Mini Waffle Iron",
            text: "A compact yet indispensable addition, particularly for families. Its small size makes it highly practical for cramped spaces.",
            img: "/blogdetail/waffle.jpg",
          },
          {
            title: "Ice Maker",
            text: "Indispensable for campers braving hot weather, ensuring a constant supply of ice for refreshing beverages.",
            img: "/blogdetail/ice.jpg",
          },
        ],
      },
    },
    {
      type: "BlogSection",
      props: {
        title: "Crafting Your Perfect Van Kitchen",
        bgClass: "bg-white", // 27.
        content: [
          {
            type: "p",
            text: "Crafting a functional and enjoyable cooking space within your camper van is undoubtedly crucial for enhancing your journey's overall comfort. It's wise to acknowledge the trade-offs associated with bringing additional items on travels. Prioritizing essentials that align with your daily routines and lifestyle is key.",
          },
          {
            type: "p",
            text: "By carefully considering your needs before investing in extra appliances, you can streamline your space while maximizing utility. Remember, the size of your kitchen doesn't dictate the quality of your meals on the road. With the diverse range of RV kitchen appliance options available, you can whip up delicious dishes without sacrificing space or convenience. Here's to happy cooking and safe travels ahead!",
          },
        ],
      },
    },
    {
      type: "BlogImageSection",
      props: {
        title: "IN CONCLUSION: Tips for Success",
        id: "conclusion",
        bgClass: "bg-gray-50", // 28.
        imageUrl:
          "/blogdetail/conclusion.jpg",
        content: [
          {
            type: "p",
            text: "Designing a kitchen for your van conversion is both thrilling and fulfilling. By embracing space-saving solutions, choosing the right appliances, and prioritizing storage and organization, you can create a functional kitchen that caters to your culinary desires on the road.",
          },
          {
            type: "p",
            text: "Don't forget to add practical accessories and infuse elements that reflect your unique style. With these strategies in mind, your van kitchen will undoubtedly become the heart of your mobile home, ensuring delightful meals and memorable culinary adventures.",
          },
        ],
      },
    },
  ],
};

// --- "More Posts" Data ---
const moreBlogPostsData = [
  {
    id: 1,
    slug: "campervan-water-systems-guide",
    title: "Campervan Water Systems Guide",
    excerpt:
      "Everything You Need to Know. Welcome... A comprehensive guide to setting up water in your van.",
    image:
      "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?auto=format&fit=crop&w=800&q=80",
    date: "October 23, 2025",
    category: "Van Build",
  },
  {
    id: 2,
    slug: "18-must-have-accessories",
    title: "18 Must-Have Accessories for Your Camper Van",
    excerpt:
      "A Comprehensive Guide. When it comes to camper life, these accessories will make your journey smoother.",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80",
    date: "October 22, 2025",
    category: "Van Life",
  },
  {
    id: 3,
    slug: "sprinter-vs-transit-vs-promaster",
    title: "Sprinter vs. Transit vs. Promaster",
    excerpt:
      "Navigating the Road to Van Life: Choosing the Ultimate Adventure Van for your conversion.",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80",
    date: "October 21, 2025",
    category: "Guides",
  },
];

// --- --- --- --- --- --- --- --- --- --- ---
// --- MAIN PAGE COMPONENT (TEMPLATE) ---
// --- --- --- --- --- --- --- --- --- --- ---

// Map of component types (from data) to the actual React components
const componentMap = {
  BlogImageSection: BlogImageSection,
  BlogSection: BlogSection,
  BlogHeading: BlogHeading,
  BlogProsCons: BlogProsCons,
  BlogSmallApplianceGrid: BlogSmallApplianceGrid,
};

// Helper function to render components from the 'body' array
function renderBodyComponent(section, index) {
  const ComponentToRender = componentMap[section.type];

  if (!ComponentToRender) {
    console.warn(`No component found for type: ${section.type}`);
    return null;
  }

  // Pass the props from the data object directly to the component
  return <ComponentToRender key={index} {...section.props} />;
}

export default function KitchenAppliancesBlog() {
  const postData = kitchenAppliancesData;
  const morePosts = moreBlogPostsData;
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bg-image",
        { scale: 1.1 },
        {
          scale: 1,
          duration: 15,
          ease: "none",
          repeat: -1,
          yoyo: true,
        }
      );
      gsap.from(".anim-content", {
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white">
      <Navbar />

      {/* --- Hero Section --- */}
      <div
        ref={containerRef}
        className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden"
      >
        <img
          src={postData.hero.image}
          alt="Beautiful van kitchen at sunset"
          className="bg-image absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/20"></div>
        <div className="relative flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-8 pt-20">
          <h1 className="anim-content font-serif font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-tight drop-shadow-xl max-w-4xl mb-6 tracking-tighter">
            {postData.hero.title}
          </h1>
          <p className="anim-content text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-lg">
            {postData.hero.subtitle}
          </p>
        </div>
      </div>

      {/* --- Blog Intro --- */}
      <BlogIntro
        title={postData.intro.title}
        author={postData.intro.author}
        date={postData.intro.date}
        readTime={postData.intro.readTime}
        content={postData.intro.content}
      />

      {/* --- Table of Contents (REMOVED) --- */}
      {/* The TableOfContents component call has been removed. */}

      {/* --- Image Carousel --- */}
      <BlogImageCarousel images={postData.carouselImages} />

      {/* --- DYNAMIC BLOG BODY --- */}
      <main>
        {postData.body.map((section, index) =>
          renderBodyComponent(section, index)
        )}
      </main>

      {/* --- Final CTA --- */}
      {/* UPDATED: Reduced vertical padding (kept larger than others for emphasis) */}
      <section className="relative py-16 md:py-24 bg-gray-950">
        <img
          src="/heroSlider/heroimg3.png"
          alt="Starry night sky over a van"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
            Embark on the journey to create your perfect travel companion!
          </h2>
          <p className="mt-6 font-sans text-lg md:text-xl text-gray-300 leading-relaxed">
            Our interactive questionnaire is designed to understand your unique
            travel preferences. We'll help you determine the ideal layout for
            your custom camper van and provide you with a personalized quote for
            your dream conversion project.
          </p>
          <div className="mt-12">
            <Link
              to="/customize"
              className="inline-block bg-white text-gray-900 font-sans font-semibold text-lg py-4 px-10 rounded-lg shadow-xl transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-200"
            >
              Customize Your Van & Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* --- More Blog Posts (DARK CARDS on WHITE BG) --- */}
      {/* UPDATED: Reduced vertical padding */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-center font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-16 tracking-tight">
            Continue Your Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {morePosts.map((post) => (
              // This card is styled with the "dark vibe"
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image}
                date={post.date}
                category={post.category}
                slug={post.slug}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}