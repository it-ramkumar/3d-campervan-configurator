import React from "react";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions";

export const metadata = {
  title: "Terms & Conditions | Big Bear Vans",
  description:
`Read the terms and conditions for using the Big Bear Vans
website, 3D configurator, and custom camper van quotes.`,
  alternates: {
    canonical: "https://www.bigbearvans.com/terms-and-conditions",
  },
  openGraph: {
    type: "website",
    url: "https://www.bigbearvans.com/terms-and-conditions",
    title: "Terms & Conditions | Big Bear Vans",
    description:
`Read the terms and conditions for using the Big Bear Vans
website, 3D configurator, and custom camper van quotes.`,
  },
  twitter: {
    card: "summary",
    title: "Terms & Conditions | Big Bear Vans",
    description:
`Read the terms and conditions for using the Big Bear Vans
website, 3D configurator, and custom camper van quotes.`,
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div>
      <TermsAndConditions />
    </div>
  );
}
