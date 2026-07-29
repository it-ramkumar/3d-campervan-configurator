import React from "react";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy | Big Bear Vans",
  description:
`Read how Big Bear Vans collects, uses, and protects your
personal information when you visit our website or inquire
about a custom camper van.`,
  alternates: {
    canonical: "https://www.bigbearvans.com/privacy-policy",
  },
  openGraph: {
    type: "website",
    url: "https://www.bigbearvans.com/privacy-policy",
    title: "Privacy Policy | Big Bear Vans",
  description:
`Read how Big Bear Vans collects, uses, and protects your
personal information when you visit our website or inquire
about a custom camper van.`,
  },
  twitter: {
    card: "summary",
      title: "Privacy Policy | Big Bear Vans",
  description:
`Read how Big Bear Vans collects, uses, and protects your
personal information when you visit our website or inquire
about a custom camper van.`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PrivacyPolicy />
    </main>
  );
}
