import "./globals.css";
import { Inter, Barlow_Condensed, DM_Sans } from "next/font/google";
import Providers from "@/components/Providers/Providers";
import ConditionalLayout from "@/components/ConditionalLayout/ConditionalLayout";
import AnalyticsInit from "@/components/AnalyticsInit/AnalyticsInit";
import Script from "next/script";
import { GoogleTagManager } from '@next/third-parties/google'
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const barlowCond = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], display: "swap", variable: "--font-barlow-cond" });
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-dm-sans" });



export const metadata = {
  title: "Big Bear Vans | Custom Van Layouts",
  description: "High-fidelity 3D van configurator and custom layouts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${barlowCond.variable} ${dmSans.variable}`}>
      <head>
        <meta name="yandex-verification" content="94c87c5e22615ea1" />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
            },
          }}
        />
        <AnalyticsInit />

        {/* ✅ Script tags body ke baad, <head> se bahar */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="6pOfSpraP52vmd3qvXHD0w"
          strategy="lazyOnload"
        />

        {/* ✅ GTM - pehle main script */}
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16677332528"
          strategy="lazyOnload"
        /> */}
        <GoogleTagManager gtmId="GTM-WCMSZ3TJ" />

        {/* ✅ GTM config - afterLoading
        <Script id="google-ads-script" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16677332528');
          `}
        </Script> */}

        {/* ✅ Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {
              if(f.fbq)return;
              n=f.fbq=function(){
                n.callMethod ?
                n.callMethod.apply(n,arguments) : n.queue.push(arguments)
              };

              if(!f._fbq)f._fbq=n;

              n.push=n;
              n.loaded=!0;
              n.version='2.0';
              n.queue=[];

              t=b.createElement(e);
              t.async=!0;
              t.src=v;

              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)

            }(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1313881125922339');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {" "}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1313881125922339&ev=PageView&noscript=1"
            alt=""
          />{" "}
        </noscript>
      </body>
    </html>
  );
}
