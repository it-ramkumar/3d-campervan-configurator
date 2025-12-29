"use client";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Premium Custom Icons for Interior Categories ---
// (Icons remain unchanged)
const WallIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 9H21M3 15H21M9 3V21M15 3V21" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const FloorIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 12H21M8 7V17M16 7V17" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const CeilingIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M3 9H21M3 15H21M12 3V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 6V6.01M18 6V6.01M6 18V18.01M18 18V18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DoorIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M4 20H10C11.1046 20 12 19.1046 12 18V6C12 4.89543 11.1046 4 10 4H4V20Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M14 12H16M4 4H20M4 20H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const BedIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M2 6V20M22 6V20M2 10H22M2 14H22M2 18H22" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6 6V10M18 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CushionIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="8" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 8V6C8 4.89543 8.89543 4 10 4H14C15.1046 4 16 4.89543 16 6V8" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const ShowerIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M17 17H7C7 14.2386 9.23858 12 12 12C14.7614 12 17 14.2386 17 17Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M17 17V21H7V17" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 12V7C12 5.34315 13.3431 4 15 4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 8V4" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const ToiletIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M7 4H17C18.1046 4 19 4.89543 19 6V10C19 11.1046 18.1046 12 17 12H7C5.89543 12 5 11.1046 5 10V6C5 4.89543 5.89543 4 7 4Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 12V20M16 12V20M12 16V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CabinetIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 3V21M16 3V21M3 8H21M3 16H21" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const KitchenIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 4V20M16 4V20M12 4V20" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="6" cy="9" r="1" fill="currentColor"/>
    <circle cx="18" cy="9" r="1" fill="currentColor"/>
  </svg>
);

const SeatIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M4 8V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 16V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V16" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="4" y="8" width="16" height="8" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const TableIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6 6V20M18 6V20M12 6V20" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 20H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PartitionIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M3 3V21M21 3V21M12 3V21" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="8" cy="8" r="1" fill="currentColor"/>
    <circle cx="16" cy="16" r="1" fill="currentColor"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
  </svg>
);

// --- Graphic Mapping Functions ---
const getGraphicForDescription = (text, index) => {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('wood') || lowerText.includes('paneling') || lowerText.includes('plank')) return WallIcon;
  if (lowerText.includes('floor') || lowerText.includes('bamboo') || lowerText.includes('laminate')) return FloorIcon;
  if (lowerText.includes('ceiling') || lowerText.includes('bed') || lowerText.includes('under')) return CeilingIcon;
  if (lowerText.includes('door') || lowerText.includes('rear') || lowerText.includes('panel')) return DoorIcon;
  if (lowerText.includes('sleep') || lowerText.includes('bed') || lowerText.includes('mattress')) return BedIcon;
  if (lowerText.includes('cushion') || lowerText.includes('fabric') || lowerText.includes('velvet')) return CushionIcon;
  if (lowerText.includes('shower') || lowerText.includes('water') || lowerText.includes('bath')) return ShowerIcon;
  if (lowerText.includes('toilet') || lowerText.includes('flush') || lowerText.includes('bathroom')) return ToiletIcon;
  if (lowerText.includes('cabinet') || lowerText.includes('storage') || lowerText.includes('door')) return CabinetIcon;
  if (lowerText.includes('kitchen') || lowerText.includes('sink') || lowerText.includes('counter')) return KitchenIcon;
  if (lowerText.includes('seat') || lowerText.includes('swivel') || lowerText.includes('front')) return SeatIcon;
  if (lowerText.includes('table') || lowerText.includes('swivel') || lowerText.includes('dining')) return TableIcon;

  // Add a specific check for refrigerator
  if (lowerText.includes('refrigerator') || lowerText.includes('recpro') || lowerText.includes('vankea') || lowerText.includes('vertifrigo')) return KitchenIcon;

  const defaultIcons = [WallIcon, FloorIcon, CeilingIcon, DoorIcon];
  return defaultIcons[index % defaultIcons.length];
};

// --- Interior Icon Mapping ---
const getInteriorIcon = (title) => {
  const iconMap = {
    "Wall Paneling": WallIcon,
    "Flooring Options": FloorIcon,
    "Ceiling & Under-the-Bed Ceiling": CeilingIcon,
    "Rear Doors": DoorIcon,
    "Sleeping Options": BedIcon,
    "Dinette Cushions": CushionIcon,
    "Shower Options": ShowerIcon,
    "Toilet Options": ToiletIcon,
    "Cabinetry Options": CabinetIcon,
    "Kitchen Options": KitchenIcon,
    "Front Seating Options": SeatIcon,
    "Swivel Table Options": TableIcon,
    "Partition Wall": PartitionIcon
  };
  return iconMap[title] || WallIcon;
};

// --- DATA DEFINITIONS ---
// (All data remains unchanged except cushionData)
const wallPanelingData = [
  {
    id: 'slatted_wood',
    title: 'Slatted Wood Paneling (Stained)',
    description: ['Planks are evenly spaced to expose wide black grooves for bold contrast.', '<strong>Finish:</strong> Hand-stained with gel stains.'],
    image: "/Interior Choices/wall paneling/Slatted wood paneling.jpg"
  },
  {
    id: 'shiplap',
    title: 'Shiplap Imitation (Stained)',
    description: ['Features horizontal planks with narrow grooves between them.', 'You can choose between narrow shiplap or wide shiplap wall paneling.', '<strong>Finish:</strong> Hand-stained with gel-stains.'],
    image: "/Interior Choices/wall paneling/shiplap imitation.jpg"
  },
  {
    id: 'upholstered',
    title: 'Upholstered Wall Paneling',
    description: ['Features fabric-covered wall panels.', 'Choose between <strong>textured tweed </strong> (in neutral tones like beige, gray) or <strong>Alcantara suede-like fabric</strong.'],
    image: "/Interior Choices/wall paneling/Upholstered wall paneling.jpg"
  }
];

const flooringData = [
  {
    id: 'bamboo',
    title: 'AquaGuard Bamboo Flooring',
    description: ['Highly water and scratch-resistant due to its multi-layer aluminum oxide coating.', 'Sustainable and eco-friendly for a natural aesthetic look.'],
    image: "/Interior Choices/flooring/Bamboo flooring.jpg"
  },
  {
    id: 'laminate',
    title: 'AquaGuard Performance Laminate Flooring',
    description: ['100% waterproof and scratch-resistant flooring.', 'Available in different colors, textures, and finishes.', 'Features sound-reducing, anti-microbial pre-attached underlayment for sound insulation.'],
    image: "/Interior Choices/flooring/Aquaguard performance laminate flooring.jpg"
  }
];

const ceilingData = [
  {
    id: 'white_walnut',
    title: 'White Painted Shiplap with Walnut-Stained Ceiling',
    description: ['White painted shiplap walls with a walnut-stained ceiling.', 'Creates a beautiful contrast for visual interest.'],
    image: "/Interior Choices/ceiling and under-the-bed ceiling/White shiplap walls with a walnut-stained ceiling..jpg"
  },
  {
    id: 'tweed_slatted',
    title: 'Beige Tweed with Stained Wooden Slatted Ceiling',
    description: ['Beige tweed-upholstered walls and stained wooden slatted ceiling with black background.', 'Modern and sophisticated combination.'],
    image: "/Interior Choices/ceiling and under-the-bed ceiling/Tweed-upholstered walls with stained wooden slatted ceiling.jpg"
  }
];

const rearDoorsData = [
  {
    id: 'slatted',
    title: 'Slatted Door Panels',
    description: ['Install full-size or partial pre-cut plywood panels after insulation.', 'Stained to match the wall paneling with slatted design.'],
    image: "/Interior Choices/rear doors/Slatted door panels.jpg"
  },
  {
    id: 'shiplap_doors',
    title: 'Shiplap Door Panels',
    description: ['Install full-size or partial pre-cut plywood panels after insulation.', 'Stained to match the wall paneling with shiplap design.'],
    image: "/Interior Choices/rear doors/Shiplap door panels.jpg"
  },
  {
    id: 'upholstered_doors',
    title: 'Upholstered Door Covers',
    description: ['Install full-size or partial pre-cut plywood panels after insulation.', 'Upholstered to match the wall paneling.'],
    image: "/Interior Choices/rear doors/Upholstered door covers.jpg"
  }
];

const sleepingData = [
  {
    id: 'elevator',
    title: 'Elevator Beds',
    description: [
      'Operated by a button, the electric elevator bed is the most space-saving sleeping option.',
      'The East-to-west elevator bed has a 73" × 52" dimension, with a standard dinette bed underneath.',
      'The South-to-North elevator bed is a front-to-back bed that has a 74.5" × 69" dimension, with an extendable dinette bed underneath.'
    ],
    image: "/Interior Choices/sleeping options/Elevator bed.jpg"
  },
  {
    id: 'stationary',
    title: 'Stationary Beds',
    description: [
      'A stationary bed offers under-the-bed garage storage.',
      'You can choose between a King-size and a queen-size mattress.'
    ],
    image: "/Interior Choices/sleeping options/Stationary bed.jpg"
  },
  {
    id: 'dinette',
    title: 'Dinette Benches',
    description: [
      'Dinette benches are for sitting & dining, and can also be converted into another bed.',
      'The standard dinette bed pairs well with the east-to-west elevator bed with a 54" × 68" dimension.',
      'Extendable Dinette bed works with the south-north elevator bed with a 58" × 69" dimension.'
    ],
    image: "/Interior Choices/sleeping options/Dinetted benches.jpg"
  }
];

// --- UPDATED CUSHION DATA - No subdivisions, all content in description ---
const cushionData = [
  {
    id: 'cushions',
    title: 'Premium Cushion Fabrics',
    description: [
      '<strong>Chenille Fleece Cushion Set:</strong> Durable, smooth to the touch, and low-maintenance fabric.',
      '<strong>Dutch Velvet Cushion Set:</strong> Luxurious and resistant to wear and tear cushion fabric.',
      '<strong>Faux Leather Cushion Set:</strong> Resistant to wear & tear, stains, and fading cushion fabric.',
      '<strong>Imitation Linen Cushion Set:</strong> Shrinkage-resistant and easy-to-clean fabric.',
      '<strong>Waterproof Oxford Cushion Set:</strong> Lightweight, easy-to-maintain, and PU-coated fabric.',
      '<strong>Waterproof Chenille Cushion Set:</strong> Woven, thick, water & stain-resistant fabric.',
      '<strong>Warp Knitted Polyester Chenille Cushion Set:</strong> Easy to maintain, soft, and plush-textured fabric.'
    ],
    images: [
      "/Interior Choices/Dinette cushions/1.jpg",
      "/Interior Choices/Dinette cushions/2.jpg",
      "/Interior Choices/Dinette cushions/3.jpg",
      "/Interior Choices/Dinette cushions/4.jpg"
    ]
  }
];

const showerData = [
  {
    id: 'aluminum',
    title: 'Aluminum Shower Box',
    description: [
      'Our exclusive Aluminum shower box comes in different sizes, including 25" XS, 28" S, 32" M, and 36" L.',
      'Features a black or silver shower faucet, Shampoo dispensers, L-tracks, and a rolling curtain (white and black).'
    ],
    image: "/Interior Choices/Shower options/Aluminum shower box.jpg"
  },
  {
    id: 'pull_out',
    title: 'Pull-out Shower',
    description: [
      'A space-saving shower design that normally hides behind the countertop or under-the-bed garage, and you can pull it out when needed.',
      'Also comes with a curtain for privacy.'
    ],
    image: "/Interior Choices/Shower options/Pull-out shower.jpg"
  },
  {
    id: 'bench',
    title: 'Inside the Bench Shower',
    description: [
      'Inside the bench is another space-saving shower option.',
      'Shower and toilet (if you want) are hidden inside the bench with a pull-out curtain.'
    ],
    image: "/Interior Choices/Shower options/Inside the bench shower.jpg"
  },
  {
    id: 'outdoor',
    title: 'Outdoor Shower',
    description: [
      'Usually installed in most of our custom builds, the outdoor shower is for your dirty gear and beach days.',
      'Have access to both hot and cold water.',
      'You can also use a pull-out curtain & a Bamboo mat for convenience.'
    ],
    image: "/Interior Choices/Shower options/Outdoor shower.jpg"
  }
];

const toiletData = [
  {
    id: 'trelino',
    title: 'Trelino Evo - Portable Toilet',
    description: [
      'This portable toilet has a large separator that keeps the solids and liquids separate to prevent any kind of odor.',
      'The urine holder has a capacity of 1.2 gallons, and the solid waste holder has a capacity of 1.6 gallons.',
      'Easy to clean and separately emptyable.'
    ],
    image: "/Interior Choices/toilet options/Trelino Evo S - Portable Toilet.jpg"
  },
  {
    id: 'laveo',
    title: 'Laveo Dry Flush Electric Toilet',
    description: [
      'Waterless & chemical-free, this electric toilet uses a cartridge system. Each cartridge (comes with 11 cartridges) is usable for 15 solid flushes or 28 flushes when using the included pee powder.',
      '100% Odorless and easy to use. After use, the motor tightly twists and seals the bag containing the waste, locking in moisture and odor completely. With each flush, a new, clean bag lines the bowl.',
      'When a cartridge is full, just remove and throw out the black air-tight bag.'
    ],
    image: "/Interior Choices/toilet options/Laveo Dry Flush Electric toilet.jpg"
  },
  {
    id: 'seaflo',
    title: 'Seaflo Cassette Toilet',
    description: [
      'Cassette toilet features 15L freshwater capacity with up to 150 flushes, while the large 22L sewage tank reduces emptying frequency.',
      'This portable toilet has a built-in storage bin for supplies, a removable seat for easy cleaning, and a rotating elbow for clean, distant waste disposal.',
      'A scrolling color display shows the sewage tank level to prevent overflows effectively.'
    ],
    image: "/Interior Choices/toilet options/Seaflo cassette Toilet.jpg"
  },
  {
    id: 'dry_flush',
    title: 'Self-Sealing Dry Flush Toilet',
    description: [
      'The dry Flush toilet is a self-sealing, odorless, and waterless toilet that uses Automatic Thermal Waste Disposal Technology.',
      'After use, you simply have to press the "Start" button, and it will automatically seal the waste bag, which you have to dispose of.',
      'The toilet comes with 2 rolls of garbage bags (30 uses per roll), 60 coagulant pouches, a charging cable (14V/2A), and an instruction manual.'
    ],
    image: "/Interior Choices/toilet options/Smart Dry Flush toilet.jpg"
  },
  {
    id: 'modular',
    title: 'Modular Separating Toilet',
    description: [
      'You can use the modular separating toilet in three ways:',
      'Use it as a chemical toilet, where there are dump points (~19 uses).',
      'Use it as a bag toilet, where there are no dump points (~12-15 uses)',
      'Use it as a composting toilet (~23 uses)',
      'You can also choose to have a real flush toilet with a 10-gallon black water tank in extended vans.'
    ],
    image: "/Interior Choices/toilet options/Modular separating toilet.jpg"
  }
];

const cabinetryData = [
  {
    id: 'plank',
    title: 'Plank-Style Cabinets',
    description: ['Modern plank-style cabinet doors with clean lines.', 'Available in bamboo (stain) or MDF (paint in any color).'],
    image: "/Interior Choices/cabinetry options/Plank-style cabinets.jpg"
  },
  {
    id: 'shaker',
    title: 'Shaker Painted MDF Cabinets',
    description: ['Classic shaker-style cabinet doors with timeless appeal.', 'Available in bamboo (stain) or MDF (paint in any color).'],
    image: "/Interior Choices/cabinetry options/Shaker painted MDF cabinets.jpg"
  },
  {
    id: 'tideflow',
    title: 'Tideflow Cabinets',
    description: ['Contemporary tideflow design with flowing lines.', 'Available in bamboo (stain) or MDF (paint in any color).'],
    image: "/Interior Choices/cabinetry options/tideflow cabinets.jpg"
  },
  {
    id: 'rattan',
    title: 'Rattan Inserts Cabinets',
    description: ['Rattan or plexiglass inserts for a rustic look.', 'Adds texture and visual interest to your cabinetry.'],
    image: "/Interior Choices/cabinetry options/rattan inserts cabinets.jpg"
  },
  {
    id: 'bamboo',
    title: 'Bamboo Cabinets',
    description: ['Natural bamboo cabinets with beautiful grain patterns.', 'Sustainable and eco-friendly option for your van interior.'],
    image: "/Interior Choices/cabinetry options/Bamboo cabinets.jpg"
  }
];

// --- UPDATED kitchenData ---
const kitchenData = [
  {
    sectionTitle: 'Microwave Options',
    options: [
      {
        id: 'standard_microwave',
        title: 'Microwave',
        description: [
          'Offers 10 heating settings, including 6 pre-programmed menus, a defrost function, and quick 1-6 minute express cook options.',
          'Features an LED control panel for heating up to 99 minutes, with an audible signal to indicate when cooking is complete.',
          'Includes additions like a push-button door, a built-in kitchen clock, a child safety lock, and a glass turntable.',
          'We usually use the smallest 0.7 cu ft microwave for Sprinters and a bigger 1.1 cu ft microwave for Transits. A microwave is usually built-in in a wall-mounted cabinet behind the driver\'s side and sometimes over the countertop cabinet.'
        ],
        image: "/Interior Choices/kitchen options/microwave options/COMMERCIAL CHEF Microwave_2_11zon.jpg"
      },
      {
        id: 'ninja_oven',
        title: 'Ninja Digital Oven',
        description: [
          '8-IN-1 Functionality: Air Fry, Air Roast, Air Broil, Bake, Bagel, Toast, Dehydrate, and Keep Warm all in one 1800W appliance.',
          'With Air Roast, it heats in 60 seconds and cooks meals in as little as 20 minutes.',
          'The package contains a countertop oven, an air fry basket, a sheet pan, a wire rack, and a removable crumb tray.',
          'The Ninja oven is usually placed under the countertop.'
        ],
        image: "/Interior Choices/kitchen options/microwave options/Ninja Digital Air Fry Oven_3_11zon.jpg"
      }
    ]
  },
  {
    sectionTitle: 'Stove Options',
    options: [
      {
        id: 'single_induction',
        title: 'Single Induction Cooktop',
        description: [
          'Single built-in induction cooktop for cooking.',
          'In a solid surface countertop, we can cut with CNC an exact nesting to make it flush with the countertop surface.'
        ],
        image: "/Interior Choices/kitchen options/Stove options/Single induction cooktop_6_11zon.jpg"
      },
      {
        id: 'double_induction',
        title: 'Double Induction Cooktop',
        description: [
          'A double built-in induction cooktop for cooking.',
          'In a solid surface countertop, we can cut with CNC an exact nesting to make it flush with the countertop surface.'
        ],
        image: "/Interior Choices/kitchen options/Stove options/Double induction cooktop_1_11zon.jpg"
      },
      {
        id: 'portable_single_induction',
        title: 'Portable Single Cooktop',
        description: [
          'A portable single induction cooktop for your kitchen.',
          'Can be stored away when not in use for flexible cooking.'
        ],
        image: "/Interior Choices/kitchen options/Stove options/Portable single cooktop_3_11zon.jpg"
      },
      {
        id: 'portable_double_induction',
        title: 'Portable Double Induction Cooktop',
        description: [
          'A portable double induction cooktop for your kitchen setup.',
          'Offers more cooking space while remaining portable.'
        ],
        image: "/Interior Choices/kitchen options/Stove options/Portable double induction cooktop_2_11zon.jpg" // NOTE: Using same image, update path if needed
      },
      {
        id: 'portable_propane_burner',
        title: 'Single Portable Propane Burner',
        description: [
          'A single portable propane burner for off-grid cooking.',
          'Provides consistent heat even without electrical power.'
        ],
        image: "/Interior Choices/kitchen options/Stove options/Single portable propane burner_7_11zon.jpg" // NOTE: Using same image, update path if needed
      },
      {
        id: 'propane_double_cooktop',
        title: 'Propane Double Cooktop',
        description: [
          'Double built-in propane cooktop for the kitchen.',
          'In a solid surface countertop, we can cut with CNC an exact nesting to make it flush with the countertop surface.'
        ],
        image: "/Interior Choices/kitchen options/Stove options/Propane double cooktop_4_11zon.jpg"
      }
    ]
  },
  {
    sectionTitle: 'Sink Options',
    options: [
      {
        id: 'bar_sink',
        title: '13 Inch Undermount Bar Sink',
        description: [
          'Exterior: 13"(wide)x15"(front-to back)',
          'Interior: 11"(wide)x13"(front-to back)',
          'Bowl Depth: 8"',
          'It features a nano coating for scratch and stain resistance, along with a stainless steel basket strainer that traps food waste.'
        ],
        image: "/Interior Choices/kitchen options/Sink options/13 Inch Undermount Bar Sink_1_11zon.jpg"
      },
      {
        id: 'kitchen_sink',
        title: '15 Inch Undermount Kitchen Sink',
        description: [
          'Exterior: 15" x 15" (back to front)',
          'Interior bowl: 13" x 13" (back to front)',
          'Bowl depth: 8"',
          'The sink is resistant to corrosion and denting and has a sloped bottom that prevents standing water inside the bowl.'
        ],
        image: "/Interior Choices/kitchen options/Sink options/15 Inch Undermount Kitchen Sink_4_11zon.jpg"
      },
      {
        id: 'gunmetal_sink',
        title: '13"x15" Gunmetal Under Counter Bar Kitchen Sink',
        description: [
          'Exterior: 13" W(wide to wide) x 15" D(front to back) x 9" H(bottom to top)',
          'Interior: 11" W(wide to wide) x 13" D(front to back) x 8.75" H(bottom to top)',
          'This durable sink is made from dent-resistant stainless steel and includes a rinse grid, drain strainer, and roll-up rack.'
        ],
        image: "/Interior Choices/kitchen options/Sink options/13x15 Gunmetal Under Counter Bar Kitchen Sink_2_11zon.jpg"
      },
      {
        id: 'black_sink',
        title: '15×17 Inch Black Bar Sink',
        description: [
          'Exterior: 15" x 17" (Back to front)',
          'Interior: 13" x 15" (Back to front)',
          'Made from 18-gauge, rust-resistant stainless steel, this single-bowl sink features sound-absorbing pads and a non-toxic bottom coating to reduce noise and prevent condensation.'
        ],
        image: "/Interior Choices/kitchen options/Sink options/15 17 Inch Black Bar Sink_5.jpg"
      },
      {
        id: 'glass_rinser',
        title: 'Black Bar Sink with Glass Rinser',
        description: [
          'Exterior: 23"L x 15"W x 9"D',
          'Interior: 13 1/2"L x 13"W x 8 5/8"D',
          'This rinser thoroughly rinses cups, glasses, and bottles in seconds with a powerful water flow. The package includes a bottom grid, stainless steel drain boards, a rinser adapter, and a basket drainer set.'
        ],
        image: "/Interior Choices/kitchen options/Sink options/Black Bar Sink with Glass Rinser_6_11zon.jpg"
      },
      {
        id: 'workstation_sink',
        title: '14-Inch Workstation Undermount Kitchen Sink',
        description: [
          'Exterior: 14" (wide) x 19" (front-to-back).',
          'Interior: 12" (wide) x 17" (front-to-back)',
          'Bowl depth: 10"',
          'The sink features easy-to-clean curved corners and comes complete with a bamboo cutting board, drain assembly, mounting clips, and a dishcloth.'
        ],
        image: "/Interior Choices/kitchen options/Sink options/14-Inch Workstation Undermount Kitchen Sink_3_11zon.jpg"
      }
    ]
  },
  {
    sectionTitle: 'Faucet Options',
    options: [
      {
        id: 'standard_faucet',
        title: 'Kitchen Faucet',
        description: [
          'The stainless steel kitchen sink faucet is available in matte-black, chrome, and gold colors.',
          'The faucet features 3 spray settings (stream, spray, pause), a high arc, an 18-inch retractable hose, a 360° swivel spout, and a single handle.'
        ],
        image: "/Interior Choices/kitchen options/faucet options/FURIOUS Kitchen Faucet_2_11zon.jpg"
      },
      {
        id: 'filter_faucet',
        title: 'Kitchen Faucet with Water Filter',
        description: [
          'This faucet combines a pull-down kitchen faucet and a built-in water filter faucet into one unit. Get filtered water easily without a separate faucet.',
          'The faucet has three settings (Stream, Spray, Pause) for various cleaning tasks. An 18-inch retractable hose and 360° swivel spout fit single or dual sinks, offering enough space for kitchen jobs.'
        ],
        image: "/Interior Choices/kitchen options/faucet options/Kitchen faucets with a water filter_4_11zon.jpg"
      },
      {
        id: 'commercial_faucet',
        title: '3-in-1 Commercial Style Faucet',
        description: [
          'Has a main faucet and a dedicated water lever for filtered water.',
          'Have three water modes, spray, stream, and pause, and thus makes dish washing and sink cleaning easier.',
          'Provide hot, cold, and filtered water and eliminate the need for separate fixtures.'
        ],
        image: "/Interior Choices/kitchen options/faucet options/3-in-1 commercial-style faucet_1_11zon.jpg"
      },
      {
        id: 'soap_faucet',
        title: 'Kitchen Faucet with Soap Dispenser',
        description: [
          'High-arch gooseneck kitchen faucets come with a kitchen soap dispenser. The kitchen faucet with pull-down sprayer has two modes of spray and stream, which adapt to different needs.',
          'The faucet for the kitchen sink with an 18-inch pull-out hose and 360° swivel design provides a flexible range of use.',
          'You can also choose any other faucet for your kitchen if you want.'
        ],
        image: "/Interior Choices/kitchen options/faucet options/Kitchen faucet with soap dispenser.JPG"
      }
    ]
  },
  {
    sectionTitle: 'Water Filter Options',
    options: [
      {
        id: 'pureal',
        title: 'Pureal Hybrid Home Filter',
        description: [
          'Pureal Hybrid home filter removes chlorine, rust, dust, heavy metals, odor, and bad tastes.',
          'It can filter up to 10K gallons of water.',
          'The filter has a higher flow rate of up to 1.5 gallons per minute.',
          'It is a compact design measuring 95mm (W), 97mm (D), and 326mm (H).',
          'We mount the filter under the kitchen sink and connect it directly to your freshwater tank and faucet. Due to its compact size, you will have extra storage under the sink to store your kitchen accessories.'
        ],
        image: "/Interior Choices/kitchen options/water filter options/Pureal Hybrid Home Filter _2_11zon.jpg"
      },
      {
        id: 'guzzle',
        title: 'Guzzle H2O Flex filter',
        description: [
          'The Guzzle H2O Flex filter effectively removes sediments, chlorine, chemicals, bad taste, and odor.',
          'The filter is available in two sizes, Flex 5 and Flex 10, which makes it ideal for tight spaces.',
          'Its LED UV-C purification can inactivate 99.99% of bacteria, protozoa, and viruses.',
          'The filter takes up less space than a shoebox, leaving plenty of cabinet space for you.'
        ],
        image: "/Interior Choices/kitchen options/water filter options/Guzzle H2O Flex filter_1_11zon.jpg"
      }
    ]
  },
  {
    sectionTitle: 'Refrigerator Options',
    options: [
      {
        id: 'small_fridge',
        title: 'Small Refrigerator (3.2 cu ft)',
        description: [
          'At Big Bear Vans, we usually use a 3.2 cu ft refrigerator with 19" depth, allowing a nice pass-through width. We place this in the kitchen cabinet.',
          'We normally use refrigerators from:',
          '<strong><a href="https://recpro.com/rv-refrigerator-3-3-cubic-feet-12v-stainless-steel/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">RecPro:</a></strong> <em>Without freezer.</em>',
          '<strong><a href="https://vankea.com/products/van-refrigerator" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Vankea:</a></strong> <em>Similar parameters but with a freezer.</em>',
          '<strong><a href="https://www.etrailer.com/RV-Refrigerators/Vitrifrigo/VT58FR.html" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Vertifrigo:</a></strong> <em>With fridge/freezer (costs $800 more).</em>'
        ],
        image: "/Interior Choices/kitchen options/kitchen refrigerator/Small refrigerator (3.3 cu ft)(1)_1_11zon.jpg"
      },
      {
        id: 'tall_fridge',
        title: 'Tall Refrigerator',
        description: [
          'You can also choose to have a taller refrigerator (4.5 cu ft, 4.8 cu ft, 5 cu ft).',
          'We will put the tall refrigerator in front of the kitchen, beside the bathroom.'
        ],
        image: "/Interior Choices/kitchen options/kitchen refrigerator/Tall refrigerator (1)_3_11zon.jpg"
      }
    ]
  },
  {
    sectionTitle: 'Countertop Options',
    options: [
      {
        id: 'bamboo_counter',
        title: 'Bamboo Countertop',
        description: ['Natural bamboo countertops with beautiful grain patterns.', 'Sustainable and eco-friendly option.', 'Warm and inviting aesthetic.'],
        image: "/Interior Choices/kitchen options/kitchen countertop/Bamboo countertop_2_11zon.jpg"
      },
      {
        id: 'acrylic_counter',
        title: 'Acrylic Countertop with Stone-like Finish',
        description: ['Solid-surface acrylic countertops with a stone-like finish.', 'Durable and easy to clean.', 'Available in various colors and patterns.'],
        image: "/Interior Choices/kitchen options/kitchen countertop/Acrylic countertop with stone-like finish_1_11zon.jpg"
      },
      {
        id: 'live_edge',
        title: 'Live-Edge Wood Slab',
        description: ['Natural live-edge wood slab countertops.', 'Unique and rustic appearance.', 'Each piece is one-of-a-kind.'],
        image: "/Interior Choices/kitchen options/kitchen countertop/Live-edge wood slab_5_11zon.jpg"
      },
      {
        id: 'butcher_block',
        title: 'Butcher Block Countertop with an Oiled Finish',
        description: ['Butcher block countertops with an oiled finish.', 'Perfect for food preparation.', 'Warm and traditional look.'],
        image: "/Interior Choices/kitchen options/kitchen countertop/Butcher block countertop with an oiled finish_4_11zon.jpg"
      }
    ]
  },
  {
    sectionTitle: 'Backsplash Options',
    options: [
      {
        id: 'pvc_tiles',
        title: 'Peel-and-stick PVC Tiles',
        description: ['Peel-and-stick PVC tiles (Anti-scratch, waterproof, & heat-resistant).', 'Easy to install and maintain.', 'Available in various patterns and colors.'],
        image: "/Interior Choices/kitchen options/kitchen backsplash/Peel-and-stick PVC tiles.JPG"
      },
      {
        id: 'hexagon',
        title: 'Hexagon Peel-and-stick Backsplash',
        description: ['Modern hexagon pattern backsplash.', 'Creates visual interest in the kitchen.', 'Easy to clean and maintain.'],
        image: "/Interior Choices/kitchen options/kitchen backsplash/Hexagon peel-and-stick backsplash_4_11zon.jpg"
      },
      {
        id: 'stone_tile',
        title: 'Stone Peel-and-stick Tile',
        description: ['Stone-look peel-and-stick tile backsplash.', 'Adds a natural, rustic feel to the kitchen.', 'Durable and easy to install.'],
        image: "/Interior Choices/kitchen options/kitchen backsplash/Stone peel-and-stick tile_7_11zon.jpg"
      },
      {
        id: '3d_hexagon',
        title: '3D Hexagon Peel-and-stick Backsplash',
        description: ['3D hexagon peel-and-stick backsplash tiles.', 'Adds depth and texture to the kitchen.', 'Modern and sophisticated look.'],
        image: "/Interior Choices/kitchen options/kitchen backsplash/3D Hexagon peel-and-stick backsplash tiles(1)_1_11zon.jpg"
      },
      {
        id: 'subway',
        title: 'Peel and Stick Subway Tiles',
        description: ['Classic subway tile pattern backsplash.', 'Timeless and versatile design.', 'Easy to install with peel-and-stick application.'],
        image: "/Interior Choices/kitchen options/kitchen backsplash/Peel-and-stick subway tiles_6_11zon.jpg"
      },
      {
        id: 'bamboo_panels',
        title: 'Bamboo Panels',
        description: ['Natural bamboo panels for backsplash.', 'Sustainable and eco-friendly option.', 'Warm and natural aesthetic.'],
        image: "/Interior Choices/kitchen options/kitchen backsplash/Bamboo panels_3_11zon.jpg"
      }
    ]
  }
];

const seatingData = [
  {
    id: 'swivel',
    title: 'Swivel Passenger & Driver Seats',
    description: ['A swivel driver and passenger seat.', 'Allows for flexible seating arrangements.', 'Creates additional living space when rotated.'],
    image: "/Interior Choices/front seating options/Swivel passenger & driver seat.jpg"
  },
  {
    id: 'upgraded_double',
    title: 'Upgraded Double Passenger Seats',
    description: ['Upgraded double seats at the passenger side that recline and can be flat to convert into an extra bed.', 'Provides additional sleeping space.', 'Comfortable for long journeys.'],
    image: "/Interior Choices/front seating options/Upgraded double passenger seats.jpg"
  },
  {
    id: 'double_swivel',
    title: 'Double Swivel Seats',
    description: ['Double swivel seats in two sizes, 80 cm wide and 90 cm wide, with a recline feature.', 'Offers flexible seating and sleeping options.', 'Perfect for socializing and relaxing.'],
    image: "/Interior Choices/front seating options/Double Swivel seats.jpg"
  },
  {
    id: 'convertible',
    title: 'Double Swivel Seats that Convert into a Bed',
    description: ['Double swivel seats that can unfold, recline, and convert into another bed.', 'Maximizes sleeping capacity.', 'Versatile and space-efficient.'],
    image: "/Interior Choices/front seating options/Double swivel seats that convert into a bed.jpg"
  },
  {
    id: 'front_bench',
    title: 'Front Bench',
    description: ['A front bench seating option.', 'Provides additional seating capacity.', 'Can often convert to additional sleeping space.'],
    image: "/Interior Choices/front seating options/Front bench.jpg"
  },

];

const tableData = [
  {
    id: 'bamboo_table',
    title: 'Bamboo Swivel Table',
    description: ['Natural bamboo swivel table with beautiful grain patterns.', 'Sustainable and eco-friendly material.', 'Warm and inviting aesthetic.'],
    image: "/Interior Choices/Swivel table options/Bamboo swivel table_2_11zon.jpg"
  },
  {
    id: 'mdf_table',
    title: 'MDF (Painted) Swivel Table',
    description: ['MDF swivel table with various color options.', 'Can be painted to match your interior design.', 'Durable and versatile option.'],
    image: "/Interior Choices/Swivel table options/MDF (Painted) swivel table_3_11zon.jpg"
  }
];

const partitionData = [
  {
    id: 'leaf',
    title: 'Leaf Cutouts Style',
    description: ['Partition wall with organic leaf-shaped cutouts.', 'Natural and flowing design.', 'Creates visual interest and connection between spaces.'],
    image: "/Interior Choices/Partition wall/Partition wall.jpg"
  },
  {
    id: 'triangle',
    title: 'Triangle Cutouts Style',
    description: ['Partition wall with geometric triangle cutouts.', 'Modern and architectural design.', 'Allows light and air to flow between spaces.'],
    image: "/Interior Choices/Partition wall/Triangle cutouts style.jpg"
  },
  {
    id: 'plain',
    title: 'Plain Style',
    description: ['Solid partition wall without cutouts.', 'Provides maximum privacy and separation.', 'Clean and minimalist aesthetic.'],
    image: "/Interior Choices/Partition wall/Plain style.jpg"
  }
];

const bathroomPositionData = [
  {
    id: 'inside_van',
    title: 'Inside the Van Bathroom',
    description: ['Most of our aluminum bathrooms are inside the campervan, in front of the kitchen.', 'Space-efficient design that integrates seamlessly with the kitchen area.'],
    image: "/Interior Choices/bathroom position/Inside the van bathroom.jpg"
  },
  {
    id: 'rear_bathroom',
    title: 'Rear Bathroom',
    description: [
      'You can also choose to have a rear bathroom with a shower, toilet, vanity, bamboo mat, and a curtain.',
      'The rear bathroom can also serve as a rear garage to store your gear.',
      'Provides separate, dedicated bathroom space.'
    ],
    image: "/Interior Choices/bathroom position/rear bathroom.jpg"
  }
];

// --- Premium Feature Item with Enhanced Graphics ---
const FeatureItem = ({ text, index }) => {
  const GraphicComponent = getGraphicForDescription(text, index);

  return (
    <motion.div
      className="flex items-start gap-4 sm:gap-6 group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
    >
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out shadow-lg border border-gray-700">
          <GraphicComponent className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 -z-10"></div>
      </div>
      <p className="font-sans text-sm sm:text-base text-gray-800 leading-relaxed pt-1 sm:pt-2 group-hover:text-gray-900 transition-colors duration-300 flex-1">
        {/* Links inside the text will be styled by their own classes */}
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </p>
    </motion.div>
  );
};

// --- Premium Section Header Component ---
const PremiumSectionHeader = ({ title, description }) => (
  <motion.div
    className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 px-4"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
  >
    {/* Premium decorative element */}
    <div className="flex justify-center mb-3 sm:mb-4">
      <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 rounded-full shadow-lg"></div>
    </div>

    <h2 className="font-serif font-bold text-3xl sm:text-4xl leading-tight mb-3 sm:mb-4 bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent drop-shadow-sm px-2">
      {title}
    </h2>

    {/* Premium description with elegant border */}
    <div className="relative">
      <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-lg sm:rounded-xl opacity-80 border border-gray-200 shadow-sm"></div>
      <p className="font-sans text-sm sm:text-base text-gray-700 leading-relaxed max-w-3xl mx-auto relative z-10 px-4 py-3 sm:px-6 sm:py-4">
        {description}
      </p>
    </div>
  </motion.div>
);

// --- SPECIAL Cushion Section Component ---
function CushionSection() {
  const selectedOptionData = cushionData[0]; // Only one option now

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50 text-gray-900 relative overflow-hidden">
      {/* Premium background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-white/60"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-gray-900/5 to-gray-800/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-gray-800/5 to-gray-900/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <PremiumSectionHeader
          title="Dinette Cushions"
          description="Select from our premium cushion fabrics that combine comfort, durability, and style for your dining and seating areas."
        />

        <div className="mt-4 sm:mt-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start px-4 lg:grid-flow-dense">
              {/* Left Side - All Content */}
              <motion.div
                className="space-y-4 sm:space-y-6 md:space-y-8 lg:pl-12 lg:col-start-2"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="font-serif font-bold text-2xl sm:text-3xl bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
                  {selectedOptionData?.title}
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {selectedOptionData?.description.map((item, index) => (
                    <FeatureItem key={index} text={item} index={index} />
                  ))}
                </div>

                {/* --- UPDATED: Explore More Button positioned after the content --- */}
                <motion.div
                  className="pt-4 flex justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Link to="/cushion">
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-black text-white rounded-lg hover:from-black hover:to-black transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-3 border-gray-600 hover:border-gray-400">
                      Explore More Options
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Side - 4 Images Grid */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  {selectedOptionData?.images?.map((image, index) => (
                    <motion.div
                      key={index}
                      className="relative group"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Enhanced frame effects */}
                      <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg transform rotate-1 opacity-20 group-hover:rotate-0 transition-transform duration-500 blur-sm"></div>

                      <img
                        src={image}
                        alt={`Cushion fabric ${index + 1}`}
                        className="relative w-full h-48 sm:h-60 md:h-72 object-cover rounded-lg shadow-lg transform group-hover:scale-[1.02] transition-transform duration-500 border-2 border-gray-800/20"
                      />

                      {/* Enhanced overlay */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- PREMIUM Interactive Section Component ---
function InteractiveSection({
  sectionTitle,
  sectionDescription,
  optionsData,
  reverseLayout = false,
  bgColor = "bg-white",
  showStainLink = false,
  showPaintLink = false,
  showFlooringLink = false,
  showExploreMore = false,
  isNonPartitioned = false
}) {
  const [activeOption, setActiveOption] = useState(optionsData[0].id);
  const selectedOptionData = optionsData.find(option => option.id === activeOption);

  // Special handling for flooring links
  const showBambooLink = sectionTitle === "Flooring Options" && activeOption === 'bamboo';
  const showLaminateLink = sectionTitle === "Flooring Options" && activeOption === 'laminate';

  return (
    <section className={`py-8 sm:py-12 md:py-16 ${bgColor} text-gray-900 relative overflow-hidden`}>
      {/* Premium background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-white/60"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-gray-900/5 to-gray-800/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-gray-800/5 to-gray-900/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <PremiumSectionHeader title={sectionTitle} description={sectionDescription} />

        {/* --- UPDATED: Links for stain, paint, or flooring - ONLY for Cabinetry Options --- */}
        {(showStainLink || showPaintLink) && sectionTitle === "Cabinetry Options" && (
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {showStainLink && (
              <a
                href="https://generalfinishes.com/wood-finishes-retail/oil-based-wood-stains-sealers/gel-stains"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm font-medium border-3 border-gray-600 hover:border-gray-400 shadow-lg hover:shadow-gray-700/50 transform hover:-translate-y-0.5"
              >
                Select Stain Color
              </a>
            )}
            {showPaintLink && (
              <a
                href="https://www.dunnedwards.com/colors//"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm font-medium border-3 border-gray-600 hover:border-gray-400 shadow-lg hover:shadow-gray-700/50 transform hover:-translate-y-0.5"
              >
                Select Paint Color
              </a>
            )}
          </motion.div>
        )}

        {/* For non-partitioned sections, show content directly without tabs */}
        {isNonPartitioned ? (
          <div className="mt-4 sm:mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedOptionData ? selectedOptionData.id : 'empty'}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center ${reverseLayout ? 'lg:grid-flow-dense' : ''} px-4`}>
                  <motion.div
                    className={`space-y-4 sm:space-y-6 md:space-y-8 ${reverseLayout ? 'lg:col-start-2 lg:pl-12' : 'lg:pr-12'}`}
                    initial={{ opacity: 0, x: reverseLayout ? 60 : -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h3 className="font-serif font-bold text-2xl sm:text-3xl bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
                      {selectedOptionData?.title}
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      {selectedOptionData?.description.map((item, index) => (
                        <FeatureItem key={index} text={item} index={index} />
                      ))}
                    </div>

                    {/* --- UPDATED: Buttons positioned after content for specific sections --- */}
                    {(showStainLink || showBambooLink || showLaminateLink) && sectionTitle !== "Cabinetry Options" && (
                      <motion.div
                        className="pt-4 flex justify-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        {showStainLink && (
                          <a
                            href="https://generalfinishes.com/wood-finishes-retail/oil-based-wood-stains-sealers/gel-stains"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm font-medium border-3 border-gray-600 hover:border-gray-400 shadow-lg hover:shadow-gray-700/50 transform hover:-translate-y-0.5"
                          >
                            Select Stain Color
                          </a>
                        )}
                        {showBambooLink && (
                          <a
                            href="https://www.flooranddecor.com/aquaguard-bamboo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm font-medium border-3 border-gray-600 hover:border-gray-400 shadow-lg hover:shadow-gray-700/50 transform hover:-translate-y-0.5"
                          >
                            Browse Bamboo Flooring
                          </a>
                        )}
                        {showLaminateLink && (
                          <a
                            href="https://www.flooranddecor.com/aquaguard-performance"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm font-medium border-3 border-gray-600 hover:border-gray-400 shadow-lg hover:shadow-gray-700/50 transform hover:-translate-y-0.5"
                          >
                            Browse Laminate Flooring
                          </a>
                        )}
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    className={`relative ${reverseLayout ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                    initial={{ opacity: 0, x: reverseLayout ? -60 : 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <div className="relative group">
                      {/* Enhanced frame effects */}
                      <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg sm:rounded-2xl transform rotate-3 opacity-20 group-hover:rotate-2 transition-transform duration-700 blur-sm"></div>
                      <div className="absolute -inset-1 sm:-inset-3 bg-gradient-to-r from-gray-800 to-gray-700 rounded-md sm:rounded-xl transform rotate-2 opacity-10 group-hover:rotate-1 transition-transform duration-500"></div>

                      <img
                        src={selectedOptionData?.image}
                        alt={selectedOptionData?.title}
                        className="relative w-full h-auto object-cover rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl aspect-square transform group-hover:scale-[1.02] sm:group-hover:scale-[1.03] transition-transform duration-700 border-2 border-gray-800/20"
                      />

                      {/* Enhanced overlay */}
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-t from-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <>
            {/* --- UPDATED: Premium Navigation Tabs with Dark Borders - Mobile Optimized --- */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2 sm:px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {optionsData.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => setActiveOption(option.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-500 ease-out
                                  font-sans font-semibold relative overflow-hidden group
                                  backdrop-blur-sm border-2
                                  ${activeOption === option.id
                                    ? 'text-white shadow-xl border-gray-900 bg-gradient-to-r from-gray-900 to-gray-800 shadow-gray-900/30'
                                    : 'text-gray-700 bg-white/90 border-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:shadow-lg shadow-md'
                                  }`}
                >
                  <span className="relative z-10 whitespace-nowrap text-xs sm:text-sm">{option.title}</span>

                  {activeOption !== option.id && (
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  )}

                  {activeOption === option.id && (
                    <motion.div
                      layoutId={`activeIndicator-${sectionTitle}`} // Unique layoutId per section
                      className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 -z-10 shadow-inner"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.7 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Premium Content Area */}
            <div className="mt-4 sm:mt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedOptionData ? selectedOptionData.id : 'empty'}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center ${reverseLayout ? 'lg:grid-flow-dense' : ''} px-4`}>
                    <motion.div
                      className={`space-y-4 sm:space-y-6 md:space-y-8 ${reverseLayout ? 'lg:col-start-2 lg:pl-12' : 'lg:pr-12'}`}
                      initial={{ opacity: 0, x: reverseLayout ? 60 : -60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <h3 className="font-serif font-bold text-2xl sm:text-3xl bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
                        {selectedOptionData?.title}
                      </h3>
                      <div className="space-y-4 sm:space-y-6">
                        {selectedOptionData?.description.map((item, index) => (
                          <FeatureItem key={index} text={item} index={index} />
                        ))}
                      </div>

                      {/* --- UPDATED: Buttons positioned after content for specific sections --- */}
                      {(showStainLink || showBambooLink || showLaminateLink) && sectionTitle !== "Cabinetry Options" && (
                        <motion.div
                          className="pt-4 flex justify-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                        >
                          {showStainLink && (
                            <a
                              href="https://generalfinishes.com/wood-finishes-retail/oil-based-wood-stains-sealers/gel-stains"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm font-medium border-3 border-gray-600 hover:border-gray-400 shadow-lg hover:shadow-gray-700/50 transform hover:-translate-y-0.5"
                            >
                              Select Stain Color
                            </a>
                          )}
                          {showBambooLink && (
                            <a
                              href="https://www.flooranddecor.com/aquaguard-bamboo"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm font-medium border-3 border-gray-600 hover:border-gray-400 shadow-lg hover:shadow-gray-700/50 transform hover:-translate-y-0.5"
                            >
                              Browse Bamboo Flooring
                            </a>
                          )}
                          {showLaminateLink && (
                            <a
                              href="https://www.flooranddecor.com/aquaguard-performance"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm font-medium border-3 border-gray-600 hover:border-gray-400 shadow-lg hover:shadow-gray-700/50 transform hover:-translate-y-0.5"
                            >
                              Browse Laminate Flooring
                            </a>
                          )}
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div
                      className={`relative ${reverseLayout ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                      initial={{ opacity: 0, x: reverseLayout ? -60 : 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <div className="relative group">
                        {/* Enhanced frame effects */}
                        <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg sm:rounded-2xl transform rotate-3 opacity-20 group-hover:rotate-2 transition-transform duration-700 blur-sm"></div>
                        <div className="absolute -inset-1 sm:-inset-3 bg-gradient-to-r from-gray-800 to-gray-700 rounded-md sm:rounded-xl transform rotate-2 opacity-10 group-hover:rotate-1 transition-transform duration-500"></div>

                        <img
                          src={selectedOptionData?.image}
                          alt={selectedOptionData?.title}
                          className="relative w-full h-auto object-cover rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl aspect-square transform group-hover:scale-[1.02] sm:group-hover:scale-[1.03] transition-transform duration-700 border-2 border-gray-800/20"
                        />

                        {/* Enhanced overlay */}
                        <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-t from-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// --- PREMIUM Kitchen Section Component ---
function KitchenSection() {
  const [activeCategory, setActiveCategory] = useState(kitchenData[0].sectionTitle);
  const [activeOption, setActiveOption] = useState(kitchenData[0].options[0].id);

  const currentCategory = kitchenData.find(cat => cat.sectionTitle === activeCategory);
  const selectedOptionData = currentCategory?.options.find(option => option.id === activeOption);

  // Define descriptions for each category
  const categoryDescriptions = {
    "Microwave Options": "Choose the perfect cooking appliance for your needs, from standard microwaves to versatile digital ovens.",
    "Stove Options": "Select your ideal cooktop, from built-in induction to portable propane burners for off-grid cooking.",
    "Sink Options": "Find the right sink to match your layout, with multiple sizes and finishes available.",
    "Faucet Options": "Complete your sink with a high-quality faucet, including options with water filters and soap dispensers.",
    "Water Filter Options": "Ensure clean drinking water on the go with our compact and powerful filtration systems.",
    "Refrigerator Options": "Keep your food fresh with our selection of 12V refrigerators, available in compact or tall sizes.",
    "Countertop Options": "At Big Bear Vans, you can choose your kitchen countertop according to your interior style. You can also choose any other countertop of your choice if you want.",
    "Backsplash Options": "The options for the kitchen's backsplash are limitless. You can choose any backsplash you like. Some of the backsplashes that we use are the following:"
  };

  // Get the description for the currently active category
  const activeCategoryDescription = categoryDescriptions[activeCategory] || "Complete your campervan kitchen with our premium appliances, sinks, faucets, and countertops.";

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-gray-50 to-white text-gray-900 relative overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/60 to-white/40"></div>
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-gray-900/5 to-gray-800/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-gray-800/5 to-gray-900/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <PremiumSectionHeader
          title="Kitchen Options"
          description={activeCategoryDescription} // Use dynamic description
        />

        {/* --- UPDATED: Category Navigation (Mobile Padding) --- */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2 sm:px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {kitchenData.map((category) => (
            <motion.button
              key={category.sectionTitle}
              onClick={() => {
                setActiveCategory(category.sectionTitle);
                setActiveOption(category.options[0].id);
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-500 ease-out
                                  font-sans font-semibold relative overflow-hidden group
                                  backdrop-blur-sm border-2
                                  ${activeCategory === category.sectionTitle
                                    ? 'text-white shadow-xl border-gray-900 bg-gradient-to-r from-gray-900 to-gray-800 shadow-gray-900/30'
                                    : 'text-gray-700 bg-white/90 border-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:shadow-lg shadow-md'
                                  }`}
            >
              <span className="relative z-10 whitespace-nowrap text-xs sm:text-sm">{category.sectionTitle}</span>

              {activeCategory !== category.sectionTitle && (
                <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              )}

              {activeCategory === category.sectionTitle && (
                <motion.div
                  layoutId="categoryIndicator"
                  className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 -z-10 shadow-inner"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.7 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* --- UPDATED: Option Navigation (Mobile Padding) --- */}
        {currentCategory && (
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {currentCategory.options.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setActiveOption(option.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-500 ease-out
                                  font-sans font-semibold relative overflow-hidden group
                                  backdrop-blur-sm border
                                  ${activeOption === option.id
                                    ? 'text-white shadow-lg border-gray-800 bg-gradient-to-r from-gray-800 to-gray-700 shadow-gray-800/30'
                                    : 'text-gray-600 bg-white/80 border-gray-600 hover:bg-gray-800 hover:text-white hover:border-gray-800 hover:shadow-md shadow-sm'
                                  }`}
              >
                <span className="relative z-10 whitespace-nowrap text-xs">{option.title}</span>

                {activeOption !== option.id && (
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                )}

                {activeOption === option.id && (
                  <motion.div
                    layoutId="optionIndicator"
                    className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 -z-10 shadow-inner"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.7 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Content Display */}
        <div className="mt-4 sm:mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedOptionData ? selectedOptionData.id : 'empty'}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {selectedOptionData && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center px-4">
                  <motion.div
                    className="space-y-4 sm:space-y-6 md:space-y-8 lg:pr-12"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h3 className="font-serif font-bold text-2xl sm:text-3xl bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
                      {selectedOptionData.title}
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      {selectedOptionData.description.map((item, index) => (
                        <FeatureItem key={index} text={item} index={index} />
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className="relative lg:col-start-1 lg:row-start-1"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <div className="relative group">
                      {/* Enhanced frame effects */}
                      <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg sm:rounded-2xl transform rotate-3 opacity-20 group-hover:rotate-2 transition-transform duration-700 blur-sm"></div>
                      <div className="absolute -inset-1 sm:-inset-3 bg-gradient-to-r from-gray-800 to-gray-700 rounded-md sm:rounded-xl transform rotate-2 opacity-10 group-hover:rotate-1 transition-transform duration-500"></div>

                      <img
                        src={selectedOptionData.image}
                        alt={selectedOptionData.title}
                        className="relative w-full h-auto object-cover rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl aspect-square transform group-hover:scale-[1.02] sm:group-hover:scale-[1.03] transition-transform duration-700 border-2 border-gray-800/20"
                      />

                      {/* Enhanced overlay */}
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-t from-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// --- PREMIUM CTA Component ---
function GalleryAndCTA() {
  return (
    <section className="relative py-8 sm:py-10 md:py-12 bg-gradient-to-br from-gray-50 to-white text-white overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/90"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="font-serif font-bold text-2xl sm:text-3xl mb-4 sm:mb-6 text-white drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to Design Your Dream Van Interior?
          </motion.h3>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="inline-block"
          >
            <Link to="/contact">
              <button className="bg-gradient-to-r from-gray-800 to-gray-900 text-white font-sans font-semibold text-sm py-2 px-6 rounded-lg transition-all duration-300 ease-out
                                  hover:shadow-xl hover:from-gray-900 hover:to-black shadow-lg border-2 border-gray-700/50 hover:border-gray-600
                                  transform hover:translate-y-[-2px]">
                Start Your Interior Design Journey
              </button>
            </Link>
          </motion.div>

          <motion.p
            className="text-gray-300 font-sans text-sm sm:text-base mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Create the perfect living space for your adventures with our premium interior customization options.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function InteriorDesignPage() {
  return (
    <div className="bg-white">
      <div className="pt-12"></div>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-gray-800/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="font-serif font-bold text-4xl sm:text-6xl leading-tight mb-4 sm:mb-6 bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent drop-shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Interior Design Choices
            </motion.h1>

            <motion.p
              className="font-sans text-base sm:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Here are the interior choices we offer:
            </motion.p>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="w-32 h-1 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- UPDATED: Wall Paneling with stain button after each subsection --- */}
      <InteractiveSection
        sectionTitle="Wall Paneling"
        sectionDescription="Your van's wall paneling is the base that sets the tone of your entire campervan. Here's what you can choose from our premium options."
        optionsData={wallPanelingData}
        bgColor="bg-white"
        showStainLink={true}
      />

      {/* --- UPDATED: Flooring Options with specific buttons for each option --- */}
      <InteractiveSection
        sectionTitle="Flooring Options"
        sectionDescription="Choose from our durable and stylish flooring options that combine beauty with functionality for your adventure vehicle."
        optionsData={flooringData}
        reverseLayout={true}
        bgColor="bg-gray-50"
      />

      {/* --- UPDATED: Ceiling with stain button after each subsection --- */}
      <InteractiveSection
        sectionTitle="Ceiling & Under-the-Bed Ceiling"
        sectionDescription="For the ceiling, you have the same options as for the walls. You can either match your van's and under-bed's ceiling with the walls or create a contrast for visual interest. Here are the combinations that our clients mostly choose: White painted shiplap walls with a walnut-stained ceiling. Beige tweed-upholstered walls and stained wooden slatted ceiling with black background. You can also select any other ceiling combination of your choice."
        optionsData={ceilingData}
        bgColor="bg-white"
        showStainLink={true}
        reverseLayout={false}
      />

      <InteractiveSection
        sectionTitle="Rear Doors"
        sectionDescription="For the rear doors of your campervan, you can select to: Install full-size or partial pre-cut plywood panels after insulation. You have options to stain or upholster them to match the wall paneling."
        optionsData={rearDoorsData}
        reverseLayout={true}
        bgColor="bg-gray-50"
      />

      <InteractiveSection
        sectionTitle="Sleeping Options"
        sectionDescription="For sleeping, we offer multiple types of options to our clients, which are the following:"
        optionsData={sleepingData}
        bgColor="bg-white"
      />

      {/* --- UPDATED: CushionSection with Explore More button after content --- */}
      <CushionSection />

      <InteractiveSection
        sectionTitle="Shower Options"
        sectionDescription="Maximize your space with our innovative shower solutions, from compact aluminum boxes to space-saving pull-out designs."
        optionsData={showerData}

        bgColor="bg-white"
      />

      <InteractiveSection
        sectionTitle="Toilet Options"
        sectionDescription="Choose the perfect toilet solution for your needs, from portable options to advanced electric systems."
        optionsData={toiletData}
        reverseLayout={true}
        bgColor="bg-gray-50"
      />

      {/* --- UPDATED: Bathroom Position (now has tabs) --- */}
      <InteractiveSection
        sectionTitle="Bathroom Position"
        sectionDescription="Most of our aluminum bathrooms are inside the campervan, in front of the kitchen. You can also choose to have a rear bathroom with a shower, toilet, vanity, bamboo mat, and a curtain. The rear bathroom can also serve as a rear garage to store your gear."
        optionsData={bathroomPositionData}
        bgColor="bg-white"
      />

      {/* --- UPDATED: Cabinetry Options (buttons remain at top as requested) --- */}
      <InteractiveSection
        sectionTitle="Cabinetry Options"
        sectionDescription="Using modern CAD/CAM software, CNC routers, and 3D Scanners, we craft custom cabinets for your campervan. Doors can be plank-style, shaker-style, tideflow, or geometric 3D. Choose our designs or provide your own. Materials include: Bamboo (stain), MDF (any paint color), or Rattan/plexiglass inserts. Upper cabinets can be a lighter color to blend with walls or ceiling."
        optionsData={cabinetryData}
        bgColor="bg-gray-50"
        showStainLink={true}
        showPaintLink={true}
      />

      {/* --- KitchenSection handles its own data/tabs --- */}
      <KitchenSection />

      {/* --- UPDATED: Front Seating Options (now has tabs) --- */}
      <InteractiveSection
        sectionTitle="Front Seating Options"
        sectionDescription="For the front of the campervan, you have several options. You can choose to have: A swivel driver and passenger seat. Upgraded double seats at the passenger side that recline and can be flat to convert into an extra bed. Double swivel seats in two sizes, 80 cm wide and 90 cm wide, with a recline feature. Double swivel seats that can unfold, recline, and convert into another bed. A front bench. An extra front jump seat between the driver's and passenger's seats."
        optionsData={seatingData}
        reverseLayout={false}
        bgColor="bg-white"
      />

      {/* --- UPDATED: Swivel Table Options (now has tabs) --- */}
      <InteractiveSection
        sectionTitle="Swivel Table Options"
        sectionDescription="For the swivel table, you can choose between these two tables: Bamboo swivel table, MDF swivel table (with color options). For the front, the swivel table has a cup holder and can swivel between the front and 2nd row seats."
        optionsData={tableData}
        reverseLayout={true}
        bgColor="bg-gray-50"
      />

      {/* --- UPDATED: Partition Wall (now has tabs) --- */}
      <InteractiveSection
        sectionTitle="Partition Wall"
        sectionDescription="The partition wall is built to separate the kitchen and the dining area. We customize the partition wall according to your selected design. You can choose to have a partition wall in: Triangle cutouts style, Leaf cutouts style, Plain style. Moreover, you can select the type of wall you want: A stained bamboo partition wall, An MDF painted partition wall."
        optionsData={partitionData}
        reverseLayout={false}
        bgColor="bg-white"
      />

      <GalleryAndCTA />
    </div>
  );
}