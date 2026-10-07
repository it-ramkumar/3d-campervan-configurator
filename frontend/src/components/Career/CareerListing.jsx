"use client";
import React, { useState } from "react";
import Link from "next/link";
import {  ChevronRight } from "lucide-react";
import { Heading1, RichParagraph } from "@/components/Common/Common";

export default function CareersClient({ initialJobs }) {
  const [filter, setFilter] = useState("all");
  const jobTypes = ["all", "Full Time", "Part Time", "Remote", "Internship"];

  const cleanText = (text) => text?.replace(/hashtag#/g, '').replace(/#/g, '');

  const filteredJobs = filter === "all"
    ? initialJobs
    : initialJobs.filter(job =>
        job.type?.toLowerCase() === filter.toLowerCase() ||
        job.workMode?.toLowerCase() === filter.toLowerCase()
      );

  return (
    <div id="opportunities">
      {/* Filter Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <Heading1 as="h2" variant="section"
          text={`Open Positions (${filteredJobs.length})`}

        />

        <div className="flex flex-wrap gap-2">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                filter === type
                  ? "bg-hover text-primary"
                  : "bbv-card text-primary/60 border border-primary/10 hover:border-hover/40 hover:text-primary"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="group bbv-card rounded-lg p-6 border border-primary/10 hover:border-l-4 hover:border-l-hover transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <RichParagraph variant="sub" className=" bg-hover/10 border border-hover/30 text-hover px-2 py-1 rounded uppercase">
                    {job.department}
                  </RichParagraph>
<RichParagraph variant="sub" className="uppercase tracking-wider">
                    {job.experienceLevel}
                  </RichParagraph>


                </div>

                <Heading1 as="h3"
                  variant="card"
                  text={cleanText(job.title)}
                  className="y uppercase tracking-wide group-hover:text-hover transition-colors"
                />

                <div className="flex flex-wrap gap-4 mt-3 mb-4">
                  <RichParagraph variant="sub" >
                    {job.workMode}
                  </RichParagraph>
                  <RichParagraph variant="sub">
                    {job.type}
                  </RichParagraph>
                </div>

                <RichParagraph variant="card">
                  {cleanText(job.description)}
                </RichParagraph>
              </div>

              <div className="flex flex-col gap-2 justify-center">
                <Link
                  href={`/apply/${job._id}`}
                  className="bg-hover text-primary text-center py-2.5 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity text-sm uppercase tracking-wider"
                >
                  Apply
                </Link>
                <Link
                  href={`/careers/${job._id}`}
                  className="text-center text-primary/40 text-xs font-bold hover:text-hover flex items-center justify-center gap-1 transition-colors"
                >
                  Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="py-20 text-center bbv-card rounded-lg border border-dashed border-primary/20">
            <RichParagraph className="text-primary/40 uppercase  tracking-widest">
              No positions found for this category.
            </RichParagraph>
          </div>
        )}
      </div>
    </div>
  );
}
