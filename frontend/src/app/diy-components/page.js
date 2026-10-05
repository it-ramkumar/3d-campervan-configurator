import React from 'react'
import DIYComponentsPage from '../../components/DiyComponents/diy-components';

const title = "DIY Camper Van Components & Conversion Parts | Big Bear Vans";
const description = "Converting your van yourself? Shop our curated picks of cabinets, showers, windows, seats and electrical components from VanKea and VanPartsOutlet.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "https://www.bigbearvans.com/diy-components" },
  openGraph: {
    title,
    description,
    url: "https://www.bigbearvans.com/diy-components",
    images: ["/images/blackLogo.webp"],
  },
};

export default function page() {
  return (
    <div>
<DIYComponentsPage />
    </div>
  )
}
