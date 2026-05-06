import "./globals.css";
import Providers from "@/components/Providers/Providers";
import ConditionalLayout from "@/components/ConditionalLayout/ConditionalLayout";
import Script from "next/script";

export const metadata = {
  title: "Big Bear Vans | Custom Van Layouts",
  description: "High-fidelity 3D van configurator and custom layouts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="yandex-verification" content="94c87c5e22615ea1" />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>

        {/* ✅ Script tags body ke baad, <head> se bahar */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="6pOfSpraP52vmd3qvXHD0w"
          strategy="lazyOnload"
        />

        {/* ✅ GTM - pehle main script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16677332528"
          strategy="lazyOnload"
        />

        {/* ✅ GTM config - afterLoading */}
        <Script id="google-ads-script" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16677332528');
          `}
        </Script>
      </body>
    </html>
  );
}