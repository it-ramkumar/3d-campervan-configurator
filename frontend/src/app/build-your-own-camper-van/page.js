import React from 'react'
import InquiryForm from '@/components/InquiryForm/InqueryForm'
import { generateInquirySchema } from "@/schema/inquerySchema"

// ✅ Next.js Metadata API for SEO
export const metadata = {
  title: 'Build Your Own Custom Camper Van - Get a Quote | Big Bear Vans',
  description: `Configure your dream Mercedes Sprinter or Ford
Transit camper van. Choose your layout, electrical system,
and off-grid power needs, then get a custom quote.`,
  keywords: ['van build configurator', 'custom van conversion quote', 'sprinter van layout tool', 'campervan build cost', 'Big Bear Vans inquiry'],
  alternates: {
    canonical: 'https://www.bigbearvans.com/build-your-own-camper-van',
  },
  // ✅ Open Graph (Facebook/LinkedIn)
  openGraph: {
    title: 'Build Your Own Custom Camper Van | Big Bear Vans Configurator',
    description: `Configure your dream Mercedes Sprinter or Ford
Transit camper van. Choose your layout, electrical system,
and off-grid power needs, then get a custom quote.`,
    url: 'https://www.bigbearvans.com/build-your-own-camper-van',
    siteName: 'Big Bear Vans',
    images: [
      {
        url: 'https://www.bigbearvans.com/images/w2.webp',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // ✅ Twitter Card
  twitter: {
    card: 'summary_large_image',
       title: 'Build Your Own Custom Camper Van | Big Bear Vans Configurator',
    description: `Configure your dream Mercedes Sprinter or Ford
Transit camper van. Choose your layout, electrical system,
and off-grid power needs, then get a custom quote.`,
    site: '@bigbearvans',
    images: ['https://www.bigbearvans.com/images/w2.webp'],
  },
}
const schemaData = generateInquirySchema();
export default function Page() {
  // JSON-LD Schema Data
  return (
    <div>
      {/* ✅ JSON-LD Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <InquiryForm />
    </div>
  )
}