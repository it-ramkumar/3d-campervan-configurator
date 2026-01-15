
export const consultationSchema = () => (
    {

        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Book a Free Custom Van Consultation | Big Bear Vans",
        "description": "Schedule a call with our experts in Big Bear, California to discuss your custom camper van build, financing, or test drives.",
        "mainEntity": {
            "@type": "LocalBusiness",
            "name": "Big Bear Vans",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Big Bear",
                "addressRegion": "CA",
                "addressCountry": "US"
            },
            "openingHours": "Mo-Fr 09:00-17:00",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1 (951) 441-9719", // Apna sahi number yahan daalein
                "contactType": "customer service"
            }
        }
    });

