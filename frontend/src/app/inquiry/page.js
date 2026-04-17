import React from 'react'
import InquiryForm from '@/components/InquiryForm/InqueryForm'
import { generateInquirySchema } from "@/schema/inquerySchema"

// ✅ Next.js Metadata API for SEO
export const metadata = {
  title: 'Build Your Dream Van | Custom Van Configurator | Big Bear Vans',
  description: 'Use our custom van configurator to design your dream Mercedes Sprinter or Ford Transit build. Choose your layout, electrical systems, and get a custom quote today.',
  keywords: ['van build configurator', 'custom van conversion quote', 'sprinter van layout tool', 'campervan build cost', 'Big Bear Vans inquiry'],
  alternates: {
    canonical: 'https://www.bigbearvans.com/inquiry',
  },
  // ✅ Open Graph (Facebook/LinkedIn)
  openGraph: {
    title: 'Design Your Custom Van | Big Bear Vans Configurator',
    description: 'Start your journey with Big Bear Vans. Configure your van layout, shower options, and off-grid power needs in minutes.',
    url: 'https://www.bigbearvans.com/inquiry',
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
    title: 'Build Your Dream Van | Custom Configurator',
    description: 'Configure your Mercedes Sprinter or Ford Transit layout and get an instant quote.',
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