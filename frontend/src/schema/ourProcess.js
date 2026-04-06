export const generateProcessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How We Build Your Custom Big Bear Van",
  "description": "Our transparent 5-month custom van conversion process, from 3D visualization to final handover.",
  "totalTime": "P5M", // Period: 5 Months
  "step": [
    {
      "@type": "HowToStep",
      "name": "Consultation & 3D Design",
      "text": "We start with a detailed consultation followed by 3D visualization of your layout and material selection.",
      "url": "https://www.bigbearvans.com/our-process#step1"
    },
    {
      "@type": "HowToStep",
      "name": "Vehicle Sourcing",
      "text": "We help you find the perfect Mercedes Sprinter or Ford Transit through our dealer network if you don't already have one.",
      "url": "https://www.bigbearvans.com/our-process#step2"
    },
    {
      "@type": "HowToStep",
      "name": "The 5-Month Build Phase",
      "text": "Precision engineering of your electrical, plumbing, and custom cabinetry. We keep you updated with progress photos.",
      "url": "https://www.bigbearvans.com/our-process#step3"
    },
    {
      "@type": "HowToStep",
      "name": "Quality Control & Testing",
      "text": "Rigorous off-grid testing of all systems (Solar, Water, HVAC) to ensure everything is trail-ready.",
      "url": "https://www.bigbearvans.com/our-process#step4"
    },
    {
      "@type": "HowToStep",
      "name": "Handover & LAX Valet Pickup",
      "text": "Fly in to LAX, and we provide complimentary valet pickup to bring you to your new home on wheels.",
      "url": "https://www.bigbearvans.com/our-process#step5"
    }
  ],
  "publisher": {
    "@type": "Organization",
    "name": "Big Bear Vans",
    "logo": "https://www.bigbearvans.com/images/blackLogo.jpg"
  }
})