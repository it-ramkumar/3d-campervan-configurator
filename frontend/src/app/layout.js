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
      {/* Apollo Tracker - Inline Script correctly formatted */}
        <Script id="apollo-tracker" strategy="afterInteractive">
          {`
            function initApollo(){
              var n=Math.random().toString(36).substring(7),
              o=document.createElement("script");
              o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n;
              o.async=!0;
              o.defer=!0;
              o.onload=function(){
                if(window.trackingFunctions) {
                  window.trackingFunctions.onLoad({appId:"69e9d6e771c73800119bcfc0"});
                }
              };
              document.head.appendChild(o);
            }
            initApollo();
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