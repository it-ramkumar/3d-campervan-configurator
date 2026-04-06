import React from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { RichParagraph, Heading2, Heading3, Heading4 } from "@/components/Common/Common";
import CareersClient from "../../components/Career/CareerListing";
import { Heart, Users } from "lucide-react";

// ✅ 1. SEO Metadata
export const metadata = {
  title: "Careers | Join the Big Bear Vans Team",
  description: "Build the future of mobile living. Explore open positions at Big Bear Vans and join our team of expert van builders and designers.",
  openGraph: {
    title: "Careers at Big Bear Vans",
    description: "Join us in redefining mobile living through precision engineering.",
    images: ["/images/blackLogo.jpg"], // Replace with actual OG image
  },
};

// ✅ 2. Server-side Data Fetching
async function getJobs() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/jobs`);
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error("Error fetching jobs on server:", err);
    return [];
  }
}

export default async function CareersPage() {
  const initialJobs = await getJobs();

  const companyThoughts = [
    {
      id: 1,
      icon: <Heart className="w-6 h-6" />,
      title: "Our Culture",
      content: "We believe in creating an environment where creativity meets purpose.",
    },
    {
      id: 2,
      icon: <Users className="w-6 h-6" />,
      title: "Growth Mindset",
      content: "Dedicated development budgets and mentorship for every team member.",
    }
  ];
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Careers at Big Bear Vans",
  "description": "Explore remote job opportunities and join the Big Bear Vans team.",
  "url": "https://www.bigbearvans.com/careers",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": initialJobs.length,
    "itemListElement": initialJobs.map((job, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description,
        "datePosted": job.createdAt || new Date().toISOString(),
        "employmentType": job.type || "FULL_TIME",

        // ✅ Remote job key field
        "jobLocationType": "TELECOMMUTE",

        // ✅ Optional (global applicants allowed)
        "applicantLocationRequirements": {
          "@type": "Country",
          "name": "Worldwide"
        },

        "hiringOrganization": {
          "@type": "Organization",
          "name": "Big Bear Vans",
          "sameAs": "https://www.bigbearvans.com",
          "logo": "https://www.bigbearvans.com/logo.png"
        },

        "url": "https://www.bigbearvans.com/careers"
      }
    }))
  }
};
  return (
    <>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="relative bg-primary text-secondary py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <Heading2
            className="text-5xl md:text-7xl uppercase tracking-tight"
            text="Build the Future"
            textColor="text-secondary"
          />
          <RichParagraph className="mt-6 max-w-2xl mx-auto text-secondary/70">
            Join Big Bear Vans and help us redefine mobile living through precision engineering and design.
          </RichParagraph>
          <a
            href="#opportunities"
            className="inline-flex items-center gap-2 bg-hover text-primary px-8 py-4 rounded-lg font-bold mt-8 hover:opacity-90 transition-all"
          >
            Open Roles <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sidebar (Static Content) */}
          <aside className="lg:w-1/3 space-y-8">
            <div className="bg-white p-8 rounded-lg border border-primary/10 shadow-sm">
              <Heading3 text="Why Join Us?" textColor="text-primary" />
              <div className="space-y-6 mt-6">
                {companyThoughts.map((thought) => (
                  <div key={thought.id} className="flex gap-4">
                    <div className="bg-secondary p-3 rounded-lg text-primary">
                      {thought.icon}
                    </div>
                    <div>
                      <Heading4 text={thought.title} textColor="text-primary" />
                      <RichParagraph className="text-primary/60 text-sm">
                        {thought.content}
                      </RichParagraph>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary text-secondary p-8 rounded-lg shadow-lg">
              <Heading4 text="Benefits" textColor="text-secondary" />
              <ul className="space-y-3 text-sm mt-4">
                <li className="flex items-center gap-2">✔ 100% Remote Workflow</li>
                <li className="flex items-center gap-2">✔ Competitive Salary (USD)</li>
                <li className="flex items-center gap-2">✔ Global Impact</li>
              </ul>
            </div>
          </aside>

          {/* Jobs List (Interactive Client Component) */}
          <main className="lg:w-2/3">
            <CareersClient initialJobs={initialJobs} />
          </main>
        </div>
      </div>
    </div>
    </>
  );
}