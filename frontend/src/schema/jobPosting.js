import { SITE_URL, LOGO_URL, ADDRESS } from "./business";

const EMPLOYMENT_TYPES = {
  "full time": "FULL_TIME",
  "full-time": "FULL_TIME",
  "part time": "PART_TIME",
  "part-time": "PART_TIME",
  "contract": "CONTRACTOR",
  "contractor": "CONTRACTOR",
  "temporary": "TEMPORARY",
  "internship": "INTERN",
  "intern": "INTERN",
};

const escapeHtml = (text = "") =>
  String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const htmlList = (title, items) =>
  items?.length
    ? `<h3>${title}</h3><ul>${items.map((i) => `<li>${escapeHtml(i.replace(/#/g, ""))}</li>`).join("")}</ul>`
    : "";

// Google requires the full job description (HTML allowed) on the job's own page
const buildDescription = (job) =>
  [
    `<p>${escapeHtml(job.description?.replace(/#/g, ""))}</p>`,
    htmlList("Responsibilities", job.responsibilities),
    htmlList("Requirements", job.requirements),
    htmlList("Nice to have", job.niceToHave),
    htmlList("Benefits", job.benefits),
  ].join("");

export const generateJobPostingSchema = (job, id) => {
  if (!job || job.status !== "active") return null;

  // expired postings must not be marked up
  if (job.deadline && new Date(job.deadline) < new Date()) return null;

  const workMode = job.workMode?.toLowerCase() || "onsite";
  const isRemote = workMode === "remote";
  const isHybrid = workMode === "hybrid";

  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title?.replace(/#/g, ""),
    "description": buildDescription(job),
    ...(job.createdAt && { "datePosted": job.createdAt }),
    ...(job.deadline && { "validThrough": job.deadline }),
    "employmentType": EMPLOYMENT_TYPES[job.type?.toLowerCase()] || "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Big Bear Vans",
      "sameAs": SITE_URL,
      "logo": LOGO_URL,
    },
    "url": `${SITE_URL}/careers/${id}`,
    "identifier": {
      "@type": "PropertyValue",
      "name": "Big Bear Vans",
      "value": id,
    },
    ...(job.vacancies && { "totalJobOpenings": job.vacancies }),
    ...(job.experienceLevel && { "experienceRequirements": job.experienceLevel }),
    ...(job.department && { "occupationalCategory": job.department }),
  };

  // Onsite + hybrid → workshop address; remote + hybrid → TELECOMMUTE (US applicants only)
  if (!isRemote) {
    schema.jobLocation = { "@type": "Place", "address": ADDRESS };
  }
  if (isRemote || isHybrid) {
    schema.jobLocationType = "TELECOMMUTE";
    schema.applicantLocationRequirements = { "@type": "Country", "name": "US" };
  }

  if (job.salaryMin || job.salaryMax) {
    schema.baseSalary = {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": {
        "@type": "QuantitativeValue",
        ...(job.salaryMin && { "minValue": job.salaryMin }),
        ...(job.salaryMax && { "maxValue": job.salaryMax }),
        // salaries are entered in the admin panel as monthly amounts
        "unitText": "MONTH",
      },
    };
  }

  return schema;
};
