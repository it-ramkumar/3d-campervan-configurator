"use client";
import React from "react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { scrollToConsultation } from "@/utils/scrollToConsultation";

// Contact CTA for server components (which can't pass onClick): scrolls to the consultation
// section on the page, falling back to the /contact link when the section isn't there
export default function ConsultationButton({ label, variant = "secondary", className }) {
  const Button = variant === "primary" ? PrimaryButton : SecondaryButton;
  return <Button link="/contact" label={label} className={className} onClick={scrollToConsultation} />;
}
