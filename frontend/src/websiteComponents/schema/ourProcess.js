export const generateProcessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How We Build Your Custom Camper Van",
  "description": "A 5-month comprehensive process from vehicle sourcing and 3D design to precision engineering and final delivery.",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "Varies by build"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Vehicle Sourcing",
      "text": "Bring your own Sprinter or let us source a new one with up to $10,000 off MSRP."
    },
    {
      "@type": "HowToStep",
      "name": "Collaborative Design",
      "text": "Consultations and photorealistic 3D renderings to visualize your layout."
    },
    {
      "@type": "HowToStep",
      "name": "Engineering",
      "text": "Optimizing electrical, plumbing, and weight distribution for safety."
    },
    {
      "@type": "HowToStep",
      "name": "Build & Assembly",
      "text": "2-4 months of interior craftsmanship and exterior upgrades with weekly updates."
    },
    {
      "@type": "HowToStep",
      "name": "Fly in, Drive out",
      "text": "Pick up your van in Big Bear, California, with 2 nights of camping on us."
    }
  ]
});