import React from "react";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy | Big Bear Vans",
  description:
    "Read Big Bear Vans' Privacy Policy to understand how we collect, use, and protect your personal information when you visit our website or inquire about our custom camper vans.",
  alternates: {
    canonical: "https://www.bigbearvans.com/privacy-policy",
  },
  openGraph: {
    type: "website",
    url: "https://www.bigbearvans.com/privacy-policy",
    title: "Privacy Policy | Big Bear Vans",
    description:
      "Read Big Bear Vans' Privacy Policy to understand how we collect, use, and protect your personal information.",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Big Bear Vans",
    description:
      "Read Big Bear Vans' Privacy Policy to understand how we collect, use, and protect your personal information.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PrivacyPolicy />
    </main>
  );
}
