import React from "react";
import ReturnsPolicy from "../../components/ReturnsPolicy/ReturnsPolicy";

export const metadata = {
  title: "Returns & Cancellation Policy | Big Bear Vans",
  description:
`Learn about Big Bear Vans' returns and cancellation policy
for custom-built camper vans, including deposits and order
cancellations.`,
  alternates: {
    canonical: "https://www.bigbearvans.com/returns-cancellation-policy",
  },
  openGraph: {
    type: "website",
    url: "https://www.bigbearvans.com/returns-cancellation-policy",
    title: "Returns & Cancellation Policy | Big Bear Vans",
    description:
`Learn about Big Bear Vans' returns and cancellation policy
for custom-built camper vans, including deposits and order
cancellations.`,
  },
  twitter: {
    card: "summary",
    title: "Returns & Cancellation Policy | Big Bear Vans",
    description:
`Learn about Big Bear Vans' returns and cancellation policy
for custom-built camper vans, including deposits and order
cancellations.`,
  },
};

export default function ReturnsPolicyPage() {
  return (
    <main>
      <ReturnsPolicy />
    </main>
  );
}
