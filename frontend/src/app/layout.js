import "./globals.css";
import Providers from "@/components/Providers/Providers";
import ConditionalLayout from "@/components/ConditionalLayout/ConditionalLayout";
import Script from "next/script"; // 1. Script component import karein

export const metadata = {
  title: "Big Bear Vans | Custom Van Layouts",
  description: "High-fidelity 3D van configurator and custom layouts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="yandex-verification" content="94c87c5e22615ea1" />
        {/* Ahrefs Analytics - Strategy 'afterInteractive' use karein */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="6pOfSpraP52vmd3qvXHD0w"
          strategy="lazyOnload"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z1310D2000"
          strategy="afterInteractive"
        />

        <Script id="ga4" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Z1310D2000');
        `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">

        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}