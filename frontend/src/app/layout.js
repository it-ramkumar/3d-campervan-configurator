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
        {/* Ahrefs Analytics - Strategy 'afterInteractive' use karein */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="6pOfSpraP52vmd3qvXHD0w"
          strategy="lazyOnload"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (GTM) */}
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`
            (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({"gtm.start": new Date().getTime(), event: "gtm.js" });
                var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != "dataLayer" ? "&l=" + l : "";
                j.async = true;
                j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
                f.parentNode.insertBefore(j, f);
            })(window, document, "script", "dataLayer", "GTM-M9K8MZPF");
          `}
        </Script>
        {/* 2. GTM Noscript (Body part - For browsers with disabled JS) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M9K8MZPF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}