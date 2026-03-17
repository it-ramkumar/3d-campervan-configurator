import React from "react";
import HeroSection from "../HeroSection/HeroSection";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { campgrounds } from "../../DataUseInComp/WhereToCamp";
import { Helmet } from "react-helmet-async";
import Cosultation from "../Consultation/Consultation";
import {
    Heading2,
    Heading3,
    Heading4,
    RichParagraph,
    ImageWithSkeleton,
    SecondaryButton
} from '../Common/Common';

const WhereToCamp = () => {
    const LocationCard = ({ loc, categoryTitle, tableData }) => {
        return (
            <section className="bg-white rounded-lg border border-[#ACBAC4]/20 shadow-sm overflow-hidden mb-16 font-body">
                <div className="flex flex-col lg:flex-row">
                    {/* Left: Image Stack */}
                    <div className="lg:w-1/2 p-4 flex flex-col gap-4 bg-[#F5F5F0]">
                        {loc.images.map((img, index) => (
                            <div key={index} className="relative rounded-lg overflow-hidden shadow-sm">
                                <ImageWithSkeleton
                                    src={img}
                                    alt={`${loc.name} view ${index + 1}`}
                                />
                                {index === 0 && (
                                    <div className="absolute top-4 left-4">
                                        <RichParagraph className="bg-primary text-secondary px-3 py-1 rounded-lg !text-sm font-bold uppercase tracking-wider">
                                            {categoryTitle.includes("RV") ? "RV Park" : "Campground"}
                                        </RichParagraph>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right: Info Section */}
                    <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
                        <Heading3 text={loc.name}  className="mb-4" />

                        <RichParagraph className=" mb-8">
                            {loc.desc}
                        </RichParagraph>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Heading4 text="Facilities" />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {loc.facilities.map((f, i) => (
                                        <RichParagraph key={i} className="px-2 py-1 bg-secondary text-primary rounded-lg !text-sm border border-primary/30">
                                            {f}
                                        </RichParagraph>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Heading4 text="Activities" />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {loc.activities.map((a, i) => (
                                        <RichParagraph key={i} className="px-2 py-1 bg-secondary text-primary rounded-lg !text-sm  border border-secondary">
                                            {a}
                                        </RichParagraph>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {loc.notes && (
                            <div className="mt-8 p-4 bg-[#F5F5F0] rounded-lg border-l-4 border-hover">
                                <RichParagraph className="text-xs italic">
                                    <strong>Note:</strong> {loc.notes}
                                </RichParagraph>
                            </div>
                        )}
                    </div>
                </div>

                {/* Logistics Table */}
                {tableData && tableData.length > 0 && (
                    <div className="border-t border-primary/20 bg-white p-6 lg:p-10">
                        <div className="mb-4">
                            <RichParagraph className="!text-sm font-bold uppercase tracking-widest !text-hover">Site Logistics</RichParagraph>
                            <div className="h-1 w-8 bg-hover mt-1 rounded-full"></div>
                        </div>

                        <div className="overflow-x-auto rounded-lg border border-gray-100">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-secondary">
                                        <th className="p-4 text-sm font-bold text-primary">Season Dates</th>
                                        <th className="p-4 text-sm font-bold text-primary">Site Type</th>
                                        <th className="p-4 text-sm font-bold text-primary">Daily Rates</th>
                                        <th className="p-4 text-sm font-bold text-primary">Max Stay</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {tableData.map((row, index) => (
                                        <tr key={index} className="hover:bg-hover/50 transition-colors">
                                            <td className="p-4 text-sm text-gray-600">{row.seasonDates || "-"}</td>
                                            <td className="p-4 text-sm">
                                                <span className="bg-gray-100 px-2 py-0.5 rounded text-sm font-bold text-gray-500 uppercase">
                                                    {row.siteType || "-"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm font-semibold text-primary">{row.dailyRates || "-"}</td>
                                            <td className="p-4 text-sm text-primary-600">{row.maximumStay || "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </section>
        );
    };
const campingSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Top Campgrounds Near Big Bear Vans Showroom",
  "description": "A curated guide to the best RV parks and campgrounds in Big Bear Lake for your new campervan adventure.",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Campground",
        "name": "Serrano Campground",
        "description": "Scenic views of Big Bear Lake with full RV hookups and multiple outdoor activities.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Big Bear Lake",
          "addressRegion": "CA"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Campground",
        "name": "Pineknot Campground",
        "description": "Located at Big Bear Lake, ideal for mountain biking and family camping."
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "RVPark",
        "name": "Holloway's Marina & RV Park",
        "description": "Lakeside RV park in Metcalf Bay with 100+ sites and full hookups."
      }
    }
  ]
};
    return (
        <>
      <Helmet>
  {/* ✅ 1. Standard SEO Meta Tags */}
  <title>Where to Camp in Big Bear | Best RV Parks & Campgrounds | Big Bear Vans</title>
  <meta name="description" content="Discover the best campgrounds and RV parks near Big Bear Lake. From Serrano's full hookups to Holcomb Valley's quiet escapes, find the perfect basecamp for your new campervan." />
  <meta name="keywords" content="Big Bear Lake camping, RV parks Big Bear, Serrano Campground, Pineknot Campground, campervan basecamp California, RV hookups Big Bear" />
  <link rel="canonical" href="https://bigbearvans.com/where-to-camp" />

  {/* ✅ 2. Open Graph (Facebook/WhatsApp/LinkedIn) */}
  <meta property="og:title" content="Best Big Bear Campgrounds for Your Van Adventure" />
  <meta property="og:description" content="Picking up your van? Here is our curated list of the best lakeside retreats and alpine escapes in Big Bear." />
  <meta property="og:image" content="https://bigbearvans.com/whereToCamp/Pineknot campground 2.png" />
  <meta property="og:url" content="https://bigbearvans.com/where-to-camp" />
  <meta property="og:type" content="article" />

  {/* ✅ 3. Twitter Card Tags (Missing Tags Added Here) */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Best Big Bear Campgrounds for Your Van Adventure" />
  <meta name="twitter:description" content="Plan your basecamp! A curated guide to RV parks and campgrounds near Big Bear Lake." />
  <meta name="twitter:image" content="https://bigbearvans.com/whereToCamp/Pineknot campground 2.png" />

  {/* ✅ 4. JSON-LD Integration */}
  <script type="application/ld+json">
    {JSON.stringify(campingSchema)}
  </script>
</Helmet>
            <div className="bg-secondary min-h-screen font-body">
                <Navbar />
                <HeroSection
                    title="Where to Camp"
                    description="From lakeside retreats to alpine escapes, discover the perfect basecamp for your Big Bear adventure."
                    image="/whereToCamp/barton flats campground 3.webp"
                    link="/inquiry"
                    showButton={false}
                />

                {/* Intro Section */}
                <section className="bg-white border-b border-primary/20">
                    <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-[#001F3D] border border-[#ACBAC4]/30 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Heading2 text="Big Bear has many tourist attractions, including its stunning mountains, Big Bear Lake, and two beautiful ski resorts." textColor="text-[#001F3D]" />

                            <div className="h-0.5 w-16 bg-hover mx-auto rounded-full" />

                            <RichParagraph className="text-primary/40 max-w-2xl mx-auto">
                                If you’re coming here to visit our showroom or to pick up your campervan, why not make a trip out of it? Big Bear has some beautiful campgrounds and RV parks nearby where you can stay to check that everything works great and meets your expectations.
                            </RichParagraph>

                            <p className="text-xs font-bold !text-hover uppercase tracking-wider pt-4">
                                Start Your Adventure Below
                            </p>
                        </div>
                    </div>
                </section>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {campgrounds.map((category, catIndex) => (
                        <div key={catIndex} className="mb-20">
                            {/* Category Heading */}
                            <div className="flex items-center gap-4 mb-10">
                                <div className="flex flex-col">
                                    <RichParagraph className="!text-sm uppercase font-bold !text-hover tracking-wider mb-1">
                                        Explore Category {String(catIndex + 1).padStart(2, '0')}
                                    </RichParagraph>
                                    <Heading2 text={category.categoryTitle} />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                {category.locations.map((loc, locIndex) => (
                                    <LocationCard
                                        key={locIndex}
                                        loc={loc}
                                        categoryTitle={category.categoryTitle}
                                        tableData={loc?.table}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Call to Action */}
                    <div className="flex flex-col items-center gap-6 py-12 bg-white rounded-lg border border-primary/20 shadow-sm">
                        <RichParagraph className="text-primary font-semibold uppercase tracking-widest text-sm">
                            Ready to visit our showroom?
                        </RichParagraph>
                        <SecondaryButton label={"Book Your Private Tour"} link={"/contact"} />
                    </div>
                </main>

                <Cosultation />
                <Footer />
            </div>
        </>);
};

export default WhereToCamp;