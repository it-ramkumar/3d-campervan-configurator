import React from "react";
import axios from "axios";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Briefcase,
  ArrowLeft,
  Clock,
  DollarSign,
  CheckCircle
} from "lucide-react";
import { Heading1, RichParagraph } from "@/components/Common/Common";
import JobDetailsClient from "../../../components/Career/CareerDetail";
import { generateJobPostingSchema } from "@/schema/jobPosting";

// ✅ 1. Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { id } = params;
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/jobs/${id}`);
    const job = res.data;
    return {
      title: `${job.title} | Careers at Big Bear Vans`,
      description: job.description.substring(0, 160),
      openGraph: {
        title: job.title,
        description: job.description,
      },
    };
  } catch (err) {
    return { title: "Job Details | Big Bear Vans", robots: { index: false, follow: false } };
  }
}

// ✅ 2. Server-side Data Fetching
async function getJob(id) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/jobs/${id}`);
    return res.data;

  } catch (err) {
    return null;
  }
}

export default async function JobPage({ params }) {
  const { id } =await params;

  const job = await getJob(id);
  if (!job) notFound();

  const jobSchema = generateJobPostingSchema(job, id);
  const cleanText = (text) => text?.replace(/#/g, "");

  return (
    <div className="min-h-screen bg-secondary">
      {jobSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
        />
      )}
      {/* Header Section */}
      <div className="bg-white border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-primary/40 hover:text-hover mb-6 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO CAREERS
          </Link>

          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <RichParagraph variant="sub" className=" bg-hover/10 border border-hover/30 text-hover px-2 py-1 rounded uppercase">
                  {job.department}
                </RichParagraph>
                <RichParagraph variant="sub" className="uppercase flex gap-2 tracking-wider">
                  <Clock className="w-3.5 h-3.5 mt-0.5" />
                  {new Date(job.createdAt).toLocaleDateString()}
                </RichParagraph>



              </div>

              <Heading1
                as="h1"
                variant="section"
                text={cleanText(job.title)}
                className="uppercase text-primary"
              />

              <div className="flex flex-wrap gap-5 pt-2 text-primary/70">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-5 h-5 text-hover" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-5 h-5 text-hover" />
                  {job.type}
                </div>
                <div className="flex items-center gap-1.5 bg-secondary px-3 py-1 rounded-lg">
                  <DollarSign className="w-5 h-5 text-hover" />
                  ${job.salaryMin} - ${job.salaryMax}
                </div>
              </div>
            </div>

            {/* ✅ Interactive Client Actions */}
            <JobDetailsClient job={job} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Column */}
          <div className="lg:w-2/3 space-y-10">
            <section>
              <Heading1 as="h2" variant="card" text="Overview" className="text-primary" />
              <RichParagraph variant="body" textColor="text-primary/70" className="mt-4 whitespace-pre-line">
                {cleanText(job.description)}
              </RichParagraph>
            </section>

            <section className="bg-white rounded-lg p-8 border border-primary/10">
              <Heading1 as="h2" variant="card" text="Responsibilities" className="text-primary" />
              <ul className="space-y-4 mt-6">
                {job.responsibilities?.map((item, index) => (
                  <li key={index} className="flex gap-3 text-primary/70">
                    <div className="mt-2 w-2 h-2 shrink-0 bg-hover rounded-full"></div>
                    <RichParagraph variant="card" textColor="text-primary/70">{cleanText(item)}</RichParagraph>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <Heading1 as="h2" variant="card" text="Requirements" className="text-primary" />
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {job.requirements?.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white p-4 rounded-lg border border-primary/10"
                  >
                    <CheckCircle className="w-5 h-5 text-hover shrink-0" />
                    <RichParagraph variant="card" textColor="text-primary/70">
                      {cleanText(req)}
                    </RichParagraph>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-6">
            <div className="bg-primary text-secondary rounded-lg p-8">
              <Heading1 as="h3" variant="sub" text="Perks & Benefits" className="text-secondary" />
              <ul className="space-y-4 mt-6">
                {job.benefits?.map((benefit, index) => (
                  <li key={index} className="text-secondary/80 text-sm">
                    • {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-secondary/20">
                <RichParagraph variant="sub" textColor="text-secondary/50" className="uppercase mb-2">
                  Experience Level
                </RichParagraph>
                <span className="bg-secondary/20 px-3 py-1 rounded text-sm">
                  {job.experienceLevel}
                </span>
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-8 border border-primary/10">
              <Heading1 as="h3" variant="sub" text="Ready to apply?" className="text-primary" />
              <RichParagraph variant="card" textColor="text-primary/60" className="mt-2">
                Applications close on {new Date(job.deadline).toLocaleDateString()}.
              </RichParagraph>
              <Link
                href={`/apply/${job._id}`}
                className="block w-full bg-primary text-secondary text-center py-4 rounded-lg font-bold mt-6 hover:bg-hover hover:text-primary transition-all uppercase tracking-wider"
              >
                Submit Application
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}