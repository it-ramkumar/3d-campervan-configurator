
import HeroSection from "../HeroSection/HeroSection"
import Portfolio from "../HomePage/Portfolio/Portfolio";

import { generateConsultationSchema } from "../../schema/consultationSchema";


export default function Contact() {
  const heroImage = "/images2/contact.webp";
  const newTitleText = "Contact Us | Custom Van Builders in Big Bear City,CA";
  const newDescriptionText = "Contact Big Bear Vans today for your custom van conversion. Our team of expert van builders in Big Bear City, California, is ready to help you begin your dream van life.";



  const jsonld = generateConsultationSchema()
  return (
    <>

        {/* ✅ 1. Standard SEO Meta Tags */}
        <title>Book a Consultation | Custom Van Building & Inquiry | Big Bear Vans</title>
        <meta name="description" content="Schedule your free consultation with Big Bear Vans. Book a showroom visit, discuss financing, or start your custom 3D van design journey in Big Bear City, CA." />
        <meta name="keywords" content="book van consultation, campervan build inquiry, schedule showroom tour, Big Bear Vans contact, custom van building quote, Mercedes Sprinter conversion California" />
        <link rel="canonical" href="https://bigbearvans.com/contact" />

        {/* ✅ 2. Open Graph (Facebook/WhatsApp/LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bigbearvans.com/contact" />
        <meta property="og:title" content="Ready to Start Your Adventure? | Big Bear Vans Consultation" />
        <meta property="og:description" content="Talk to our experts about your dream rig. Schedule a call or visit our California workshop for a personalized tour." />
        <meta property="og:image" content="https://bigbearvans.com/images/mission.webp" />

        {/* ✅ 3. Twitter Card Tags (Added Missing Social Media Metadata) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Schedule Your Free Van Build Consultation" />
        <meta name="twitter:description" content="From 15-year financing to 3D layouts, let's discuss your custom Sprinter build today." />
        <meta name="twitter:image" content="https://bigbearvans.com/images/mission.webp" />

        {/* ✅ 4. JSON-LD Schema (Kept your existing jsonld integration) */}
        <script type="application/ld+json">
          {JSON.stringify(jsonld)}
        </script>

      <div className="tour-hero">
        <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} showButton={false} />
      </div>

      <div className="tour-portfolioc">
        <Portfolio />
      </div>
    </>
  );
}