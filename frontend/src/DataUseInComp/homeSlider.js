// Hero slider content.
// title + subtitle render as one heading (subtitle in amber); slide 1 is the page <h1>.
// link = primary button, btnLink = secondary button (no btnLink → scrolls to the quiz).
export const slides = [
  // 1. Vans for sale
  {
    id: 1,
    image: "/sprinter/sphero.webp",
    mobileImage: "/images2/fn.webp",
    tag: "Vans For Sale",
    slogan: "Ready When You Are.",
    title: "Custom Camper Van Conversions in California",
    subtitle: "by Big Bear Vans",
    desc: "Premium camper vans hand-built in Big Bear, California. Browse ready-to-roll builds you can drive away in today.",
    btnText: "Shop Vans For Sale",
    link: "/camper-vans-for-sale",
    btnText2: "Build Your Own",
    btnLink: "/build-your-own-camper-van",
    objectPosition: "50% center",
    type: "sale",
  },
  // 2. 3D configurator
  {
    id: 2,
    image: "/heroSlider/Camper Van Interior Configurator.webp",
    mobileImage: "/heroSlider/Mercedes Sprinter Interior Configurator.webp",
    tag: "3D Configurator",
    slogan: "You Dream It. We Build It.",
    title: "Design Your Camper Van",
    subtitle: "in 3D",
    desc: "Choose your van, then pick flooring, finishes, power and more, and watch your build come together in real time. Save it and get a quote.",
    btnText: "Open 3D Configurator",
    link: "/configurator",
    btnText2: "Van Matchmaker Quiz",
    objectPosition: "35% center",
    mobileFade: "solid", // image has configurator UI in its lower half

    type: "configurator",
  },
  // 3. Portfolio
  {
    id: 3,
    image: "/images2/hero3.webp",
    mobileImage: "/images2/img3.webp",
    tag: "Our Portfolio",
    slogan: "Built in Big Bear. Proven on the Road.",
    title: "Our Custom Camper Van",
    subtitle: "Portfolio",
    desc: "Explore layouts from our past builds and get inspired by the craftsmanship behind every Big Bear van.",
    btnText: "View Our Portfolio",
    link: "/van-layouts",
    btnText2: "See Our Process",
    btnLink: "/our-process",
    objectPosition: "60% center",
    type: "portfolio",
  },
];
