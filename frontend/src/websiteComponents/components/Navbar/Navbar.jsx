"use client";

import React, { useState, useEffect } from 'react';
import { 
  Bed, Armchair, Star, Truck, Shield, RotateCcw,
  ChevronLeft, ChevronRight, Play, Pause,
  ShoppingCart, CreditCard, ArrowRight, 
  Menu, X, Users, Package,
  Zap, Compass, Globe, Mountain, 
  Maximize, Minimize, RefreshCw, Settings,
  Award, Diamond, Crown, Sparkles,
  ShieldCheck, Lock,
  BookOpen, HelpCircle, FileText, UserCheck,
  Sofa, Layers, Grid, Box,
  Plus, Minus, Check, Info, AlertCircle,
  Crown as CrownIcon, Truck as Shipping,
  Sofa as SofaIcon, Award as AwardIcon,
  Zap as ZapIcon, Maximize as MaximizeIcon,
  Shield as ShieldIcon, Crown as CrownIcon2,
  MapPin, Phone, Mail, Instagram, Facebook,
  Youtube, Twitter
} from 'lucide-react';

// Seat images
const seatImages = [
  '/images/n1.jpg', '/images/n2.jpg', '/images/n3.jpg', 
  '/images/n4.jpg', '/images/n5.jpg', '/images/n6.jpg', '/images/n7.jpg'
];

// Installation videos
const installationVideos = [
  { 
    id: 1, 
    title: "NovaLux Installation Guide", 
    src: "https://drive.google.com/file/d/1QZNi1mxtuyjSCmOXte3DGECoGZ64ptTY/preview",
    Icon: Settings
  },
  { 
    id: 2, 
    title: "Bed Conversion Tutorial", 
    src: "https://drive.google.com/file/d/1ZvveWdJKpHKAGm1N28h2wn5qnqmoDO4P/preview",
    Icon: Bed
  },
  { 
    id: 3, 
    title: "Swivel Function Demo", 
    src: "https://drive.google.com/file/d/1DydurvWPt2v3EEo9-U3AL9rHxFcaFqeo/preview",
    Icon: RotateCcw
  },
  { 
    id: 4, 
    title: "Safety Features Overview", 
    src: "https://drive.google.com/file/d/1utAXJr1Ve9kCg65TUr3fzRqKjpy4WdaQ/preview",
    Icon: ShieldCheck
  }
];

// External URLs
const EXTERNAL_URLS = {
  shopAll: "https://vankea.com/collections/seats",
  contact: "https://vankea.com/pages/contact",
  addToCart: "https://vankea.com/products/novalux-triple-van-seat",
  buyNow: "https://shop.app/checkout/62131929169/cn/hWN6GVubQRSM2wQgS257y3hU/en-us/shoppay_login",
  aboutUs: "https://vankea.com/pages/about-us",
  faq: "https://vankea.com/pages/faq",
  blog: "https://vankea.com/blogs/news",
  terms: "https://vankea.com/pages/terms-of-service",
  privacy: "https://vankea.com/pages/privacy-policy",
  returnPolicy: "https://vankea.com/pages/return-policy"
};

// Product data
const product = {
  title: "NovaLux Triple Van Seat with Recline & Bed Conversion",
  subtitle: "Premium 3-in-1 Seat | Bed | Storage System",
  description: "Upgrade your camper van with a premium seat-bed engineered for real travel. This modular system provides secure automotive seating and a true 6-foot sleeping surface — all within a compact 47.2\" width perfect for narrow layouts and modern van conversions.",
  fullDescription: "The NovaLux Convertible Triple Van Seat transforms from comfortable seating for three into a full 6-foot bed in seconds. Featuring premium black leather upholstery, integrated 3-point seat belts, swivel function, and built-in storage base. Designed specifically for camper vans with bolt-in installation and no specialty subfloor required.",
  price: "$3,550.00 USD",
  monthlyPayment: "From $320.42/mo with",
  soldOut: true,
  dimensions: "120 cm / 47.2\" Wide",
  features: [
    "Convertible triple seat to 6-foot bed",
    "Premium black leather upholstery",
    "Integrated 3-point seat belts",
    "360° swivel function",
    "Reclinable backrest",
    "Bolt-in installation (no specialty subfloor)",
    "Black metal storage base included",
    "Flush-sliding headrests",
    "Rear child-seat anchor points",
    "Drop-down rear support panel"
  ],
  keyFeatures: [
    {
      title: "Practical, Secure Seating",
      items: [
        "Integrated 3-point seat belts",
        "Rear child-seat anchor points (upper tether anchors)",
        "Automotive-grade safety standards"
      ],
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      title: "Smart, Space-Efficient Design",
      items: [
        "Reclinable backrest — converts into a bed in seconds",
        "Swivel function — rotate the seat for flexible space usage",
        "Flush-sliding headrests designed specifically for vans",
        "6-foot bed length when fully extended",
        "Drop-down rear support panel (47\" wide) for extra stability",
        "Approx. 8\" slider adjustment to fine-tune position"
      ],
      icon: <MaximizeIcon className="w-5 h-5" />
    },
    {
      title: "Clean, Comfortable Sleeping Surface",
      items: [
        "Separate sitting and sleeping surfaces for comfort and hygiene",
        "Dedicated flat sleeping side — not the seating surface",
        "Smooth, even, true flat bed without bumps or gaps",
        "Automotive support structure remains only on the seating side"
      ],
      icon: <Bed className="w-5 h-5" />
    },
    {
      title: "Camper-Van Friendly Installation",
      items: [
        "Slim 120 cm (47.2\") width fits compact layouts",
        "Bolt-in installation for maximum safety*",
        "No specialty subfloor required",
        "* Installation location must be structurally reinforced"
      ],
      icon: <Settings className="w-5 h-5" />
    }
  ],
  upholstery: {
    title: "Upholstery Finish",
    description: "All-Black Leather — Durable, easy to clean, and designed for modern camper van interiors."
  },
  installationOptions: [
    {
      id: "seat-only",
      title: "Seat Only",
      description: "Purchase the seat for self-installation",
      price: "$3,550.00",
      features: ["Seat unit", "Storage base", "All mounting hardware", "Installation manual"]
    },
    {
      id: "with-installation",
      title: "Seat + Professional Installation",
      description: "Full professional installation at our Big Bear shop",
      price: "$4,550.00",
      features: ["Seat unit", "Storage base", "All mounting hardware", "Professional installation", "Quality assurance check"],
      installPrice: "$1,000"
    }
  ],
  installationNote: "Installation Cost: $190/hour — Available as an add-on option at checkout",
  perfectFor: [
    "Camper vans, Sprinters, Transits, ProMasters",
    "Adventure vans & family travel setups",
    "Narrow layouts needing space-efficient seat-bed",
    "Anyone wanting clean, flat, comfortable sleeping surface"
  ]
};

// Related products
const relatedProducts = [
  {
    id: 1,
    title: "Swivel Passenger & Driver Seats",
    description: "A swivel driver and passenger seat that allows for flexible seating arrangements and creates additional living space when rotated.",
    image: "/images/related-1.jpg",
    price: "$1,850.00",
    features: ["360° rotation", "Adjustable height", "Premium upholstery"]
  },
  {
    id: 2,
    title: "Upgraded Double Passenger Seats",
    description: "Upgraded double seats at the passenger side that recline and can be flat to convert into an extra bed.",
    image: "/images/related-2.jpg",
    price: "$2,450.00",
    features: ["Reclining backrest", "Bed conversion", "Built-in storage"]
  },
  {
    id: 3,
    title: "Double Swivel Seats",
    description: "Double swivel seats in two sizes, 80 cm wide and 90 cm wide, with a recline feature for flexible seating and sleeping options.",
    image: "/images/related-3.jpg",
    price: "$2,950.00",
    features: ["Two sizes available", "Swivel function", "Reclining feature"]
  },
  {
    id: 4,
    title: "Front Bench Seat",
    description: "A front bench seating option that provides additional seating capacity and can convert to additional sleeping space.",
    image: "/images/related-4.jpg",
    price: "$3,250.00",
    features: ["3-person seating", "Storage underneath", "Convertible design"]
  }
];

const advantages = [
  { 
    title: "Premium Craftsmanship", 
    desc: "Handcrafted with aerospace-grade aluminum frame and premium automotive upholstery.",
    icon: <Award className="w-6 h-6" />,
    color: "text-amber-400",
    bgColor: "from-amber-900/30 to-yellow-900/10"
  },
  { 
    title: "Multi-Functional Design", 
    desc: "Triple seat, full bed, and storage system combined into one sleek unit.",
    icon: <Layers className="w-6 h-6" />,
    color: "text-amber-300",
    bgColor: "from-amber-900/20 to-yellow-900/10"
  },
  { 
    title: "Easy Conversion", 
    desc: "Transform from seat to bed in under 30 seconds with our intuitive mechanism.",
    icon: <Zap className="w-6 h-6" />,
    color: "text-amber-400",
    bgColor: "from-amber-900/30 to-orange-900/10"
  },
  { 
    title: "Space Optimized", 
    desc: "Designed specifically for narrow van layouts without compromising comfort.",
    icon: <Maximize className="w-6 h-6" />,
    color: "text-amber-300",
    bgColor: "from-amber-900/20 to-yellow-900/10"
  },
  { 
    title: "Safety First", 
    desc: "Integrated 3-point seat belts and reinforced steel frame for maximum safety.",
    icon: <Shield className="w-6 h-6" />,
    color: "text-amber-400",
    bgColor: "from-amber-900/30 to-red-900/10"
  },
  { 
    title: "Luxury Comfort", 
    desc: "Premium memory foam padding and breathable leather for ultimate comfort.",
    icon: <Crown className="w-6 h-6" />,
    color: "text-amber-300",
    bgColor: "from-amber-900/20 to-yellow-900/10"
  }
];

const technicalSpecs = [
  { label: "Width", value: "120 cm / 47.2 inches" },
  { label: "Bed Length", value: "183 cm / 72 inches (6 feet)" },
  { label: "Seat Depth", value: "50 cm / 19.7 inches" },
  { label: "Backrest Height", value: "65 cm / 25.6 inches" },
  { label: "Frame Material", value: "Aerospace-Grade Aluminum & Steel" },
  { label: "Upholstery", value: "Premium Automotive Leather" },
  { label: "Padding", value: "High-Density Memory Foam" },
  { label: "Weight Capacity", value: "330 kg / 727 lbs (seated)" },
  { label: "Swivel Range", value: "360° Continuous Rotation" },
  { label: "Recline Angle", value: "0° to 180° (Flat)" },
  { label: "Installation", value: "Bolt-In (No welding required)" },
  { label: "Warranty", value: "5-Year Structural, 3-Year Upholstery" }
];

export default function NovaLuxSeatPage() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showPurchasingPower, setShowPurchasingPower] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [activeNavLink, setActiveNavLink] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [selectedInstallation, setSelectedInstallation] = useState('seat-only');
  
  const currentImages = seatImages;

  // Auto-play image slider
  useEffect(() => {
    if (!isAutoPlaying || currentImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  const handleExternalLink = (url) => {
    setIsMenuOpen(false); // Close menu immediately
    setTimeout(() => {
      window.open(url, '_blank');
    }, 0);
  };

  const handlePurchasingPower = () => {
    setShowPurchasingPower(!showPurchasingPower);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
      setEmail('');
      setTimeout(() => setEmailSubmitted(false), 3000);
    }
  };

  const handleNavClick = (section) => {
    setActiveNavLink(section);
    setIsMenuOpen(false); // Close menu immediately
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const basePrice = product.soldOut ? 0 : parseFloat(product.price.replace('$', '').replace(',', ''));
    const installPrice = selectedInstallation === 'with-installation' ? 1000 : 0;
    return (basePrice + installPrice) * quantity;
  };

  // Force menu closed on initial render and when clicking outside
  useEffect(() => {
    setIsMenuOpen(false);
    
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container') && !event.target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100 font-sans selection:bg-amber-600 selection:text-white overflow-x-hidden">
      
      {/* NAVBAR - Simple and clean */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-6 lg:px-8 py-4 backdrop-blur-md bg-black/80 border-b border-amber-500/10 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Diamond className="w-6 h-6 text-amber-500" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight" style={{
            fontFamily: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
            letterSpacing: '0.05em',
            color: '#fbbf24'
          }}>
            NOVALUX
          </h1>
        </div>
        
        <div className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium text-gray-300">
          {['features', 'specs', 'gallery', 'install'].map((link) => (
            <button 
              key={link}
              onClick={() => handleNavClick(link)} 
              className={`hover:text-amber-400 transition-all duration-300 relative pb-1 uppercase tracking-wider ${
                activeNavLink === link ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              {link === 'install' ? 'Installation' : link}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleExternalLink(EXTERNAL_URLS.shopAll)}
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-700 to-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-amber-600 hover:to-amber-500 transition-all border border-amber-600/30"
          >
            <ShoppingCart className="w-4 h-4" />
            Shop Now
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="menu-button md:hidden p-2 rounded-lg bg-gray-800 border border-amber-500/20 z-50 relative"
          >
            {isMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-amber-400" />}
          </button>
        </div>

        {/* Mobile Menu - COMPLETELY SEPARATE, positioned absolutely */}
        <div className={`mobile-menu-container fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-xl z-40 transition-all duration-0 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="flex flex-col gap-2 p-4 mt-16">
            {['features', 'specs', 'gallery', 'install'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-sm py-4 px-4 text-left rounded-lg uppercase tracking-wider border ${
                  activeNavLink === item 
                    ? 'text-amber-400 font-semibold bg-gray-800/50 border-amber-500/30' 
                    : 'text-gray-300 hover:text-amber-300 hover:bg-gray-800/30 border-gray-700/50'
                }`}
              >
                {item === 'install' ? 'Installation' : item}
              </button>
            ))}
            <button
              onClick={() => { 
                setIsMenuOpen(false);
                setTimeout(() => handleExternalLink(EXTERNAL_URLS.shopAll), 10);
              }}
              className="bg-gradient-to-r from-amber-700 to-amber-600 text-white py-4 rounded-lg font-semibold mt-2 text-sm border border-amber-600/30 hover:from-amber-600 hover:to-amber-500 transition-all"
            >
              Shop All Seats
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/n1.jpg"
            alt="NovaLux Triple Van Seat"
            className="w-full h-full object-cover"
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center',
              minHeight: '100vh'
            }}
            loading="eager"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop";
              setImageError(true);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto w-full">
          <div className="inline-flex items-center gap-3 mb-6 md:mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50"></div>
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
              Premium Collection
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent"></div>
          </div>
          
          <div className="mb-6 md:mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent">
                NOVALUX TRIPLE VAN SEAT
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light tracking-wide text-gray-300 mb-6">
              with Recline & Bed Conversion
            </h2>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-6"></div>
          </div>
          
          <p className="text-lg text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            Space-Saving • Camper Van Seat • 6-Foot Bed • Black Leather Finish
          </p>
          
          <div className="mb-10 md:mb-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-400">
                {product.price}
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-red-900/50 to-red-800/50 rounded-full text-gray-200 font-semibold text-sm border border-red-700/30">
                Sold Out
              </div>
            </div>
            <p className="text-amber-300/80 text-sm">
              Shipping calculated at checkout
            </p>
            <p className="text-amber-400 text-sm mt-2">
              {product.monthlyPayment}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-amber-700 to-amber-600 text-white px-8 py-4 rounded-lg text-base font-semibold hover:from-amber-600 hover:to-amber-500 transition-all border border-amber-600/30 w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-3">
                <Armchair className="w-5 h-5" />
                Explore Features
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
            
            <button 
              onClick={() => handleExternalLink(EXTERNAL_URLS.contact)}
              className="bg-gray-800/50 backdrop-blur-sm border border-amber-500/20 text-gray-200 px-8 py-4 rounded-lg text-base font-medium hover:bg-gray-700/50 hover:border-amber-400/30 transition-all w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                <UserCheck className="w-5 h-5" />
                Contact for Availability
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 max-w-7xl mx-auto" id="product">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-amber-500/10 shadow-xl">
              <div className="absolute inset-0">
                {!imageError ? (
                  <img 
                    src={currentImages[currentImageIndex]}
                    alt={`NovaLux Seat - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                    <Armchair className="w-12 h-12 text-amber-400/50" />
                  </div>
                )}
              </div>
              
              {currentImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-900/80 backdrop-blur-sm border border-amber-500/20 flex items-center justify-center hover:bg-gray-800 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-amber-400" />
                  </button>
                  
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-900/80 backdrop-blur-sm border border-amber-500/20 flex items-center justify-center hover:bg-gray-800 transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-amber-400" />
                  </button>
                  
                  <button 
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-gray-900/80 backdrop-blur-sm border border-amber-500/20 flex items-center justify-center hover:bg-amber-900/60 transition-all"
                  >
                    {isAutoPlaying ? (
                      <Pause className="w-4 h-4 text-amber-300" />
                    ) : (
                      <Play className="w-4 h-4 text-amber-300" />
                    )}
                  </button>
                  
                  <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-amber-500/20">
                    <p className="text-xs text-amber-300">
                      {currentImageIndex + 1} / {currentImages.length}
                    </p>
                  </div>
                </>
              )}
              
              <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-amber-500/20">
                <p className="text-xs text-amber-300/80 uppercase tracking-widest">Dimensions</p>
                <p className="text-sm font-bold text-white">{product.dimensions}</p>
              </div>
            </div>

            {currentImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {currentImages.slice(0, 5).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border transition-all ${
                      index === currentImageIndex 
                        ? 'border-amber-500' 
                        : 'border-gray-700 hover:border-amber-500/50'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm line-through">
                  Regular price {product.price}
                </span>
              </div>
              <div className="text-amber-300/80 text-sm">
                Shipping calculated at checkout.
              </div>
              <div className="text-amber-400 text-sm">
                {product.monthlyPayment}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  {product.title}
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-4 border border-amber-500/10">
                {product.fullDescription}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Key Features</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.slice(0, 8).map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-br from-gray-900/30 to-black/30 border border-amber-500/10 hover:border-amber-500/30 transition-all"
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex-shrink-0" />
                    <span className="text-gray-300 text-sm flex-1">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Installation Options</h3>
              </div>
              <div className="space-y-4">
                {product.installationOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedInstallation(option.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      selectedInstallation === option.id
                        ? 'border-amber-500 bg-gradient-to-r from-amber-900/30 to-yellow-900/30 shadow-lg shadow-amber-500/20'
                        : 'border-amber-500/20 bg-gradient-to-br from-gray-900/20 to-black/20 hover:border-amber-400/40'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-white text-base mb-1">{option.title}</div>
                        <div className="text-sm text-amber-300/80">{option.description}</div>
                      </div>
                      <div className="text-lg font-bold text-white">{option.price}</div>
                    </div>
                    <div className="space-y-2">
                      {option.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-amber-200/80">
                          <Check className="w-4 h-4 text-green-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    {option.installPrice && (
                      <div className="mt-3 text-sm text-amber-300">
                        + {option.installPrice} installation
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm text-amber-300/60">{product.installationNote}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-gradient-to-br from-gray-900/30 to-black/30 border border-amber-500/10 gap-4">
              <div>
                <div className="text-sm text-amber-300/80 mb-2">Quantity</div>
                <div className="flex items-center gap-2 bg-gradient-to-br from-gray-900 to-black rounded-xl p-2 border border-amber-500/20 w-fit">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-amber-900/30 text-amber-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-white">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-amber-900/30 text-amber-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-amber-300/80">Total Price</div>
                <div className="text-2xl font-bold text-white">
                  ${calculateTotalPrice().toFixed(2)}
                </div>
              </div>
            </div>

            <button 
              onClick={handlePurchasingPower}
              className="w-full text-center text-amber-400 hover:text-amber-300 text-sm transition-colors flex items-center justify-center gap-2"
            >
              {showPurchasingPower ? "Hide Purchasing Power" : "Check your purchasing power"}
              <ArrowRight className={`w-4 h-4 transition-transform ${showPurchasingPower ? 'rotate-180' : ''}`} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                disabled={product.soldOut}
                onClick={() => !product.soldOut && handleExternalLink(EXTERNAL_URLS.addToCart)}
                className={`text-white py-4 rounded-lg text-base font-semibold transition-all ${
                  product.soldOut
                    ? 'bg-gray-800 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500'
                }`}
              >
                <span className="flex items-center justify-center gap-3">
                  <ShoppingCart className="w-5 h-5" />
                  {product.soldOut ? "Notify When Available" : "Add to Cart"}
                </span>
              </button>
              
              <button
                disabled={product.soldOut}
                onClick={() => !product.soldOut && handleExternalLink(EXTERNAL_URLS.buyNow)}
                className={`py-4 rounded-lg text-base font-semibold transition-all ${
                  product.soldOut
                    ? 'bg-gray-800/50 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-800/50 border border-amber-500/20 text-gray-200 hover:bg-amber-900/30 hover:border-amber-400/30'
                }`}
              >
                <span className="flex items-center justify-center gap-3">
                  <CreditCard className="w-5 h-5" />
                  Buy Now
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED FEATURES SECTION */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-gradient-to-b from-gray-900 to-black" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/50"></div>
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                Why NovaLux
              </span>
              <div className="h-px w-16 bg-gradient-to-r from-amber-500/50 to-transparent"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
              Premium Engineering
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Designed for the modern van conversion, combining luxury, functionality, and space optimization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className={`mb-4 p-3 rounded-lg bg-gray-800/50 border border-gray-700 w-fit ${advantage.color}`}>
                  {advantage.icon}
                </div>
                
                <h3 className="text-lg font-bold text-gray-100 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {advantage.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 p-6 md:p-8 rounded-xl bg-gradient-to-r from-amber-900/20 to-yellow-900/20 border border-amber-500/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-gray-900/50 to-amber-900/50 border border-amber-500/20">
                <CrownIcon2 className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{product.upholstery.title}</h3>
                <p className="text-amber-100/90 mt-2">{product.upholstery.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL SPECS */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-black" id="specs">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50"></div>
              <Settings className="w-6 h-6 text-amber-400" />
              <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
              Technical Specifications
            </h2>
            <p className="text-gray-400">
              Premium engineering meets luxury design for unparalleled performance
            </p>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-800">
            {technicalSpecs.map((spec, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row items-start md:items-center p-4 md:p-6 ${
                  index !== technicalSpecs.length - 1 ? 'border-b border-gray-800' : ''
                } hover:bg-gray-900/50 transition-colors`}
              >
                <div className="md:w-2/5 font-medium text-gray-300 mb-2 md:mb-0">
                  {spec.label}
                </div>
                <div className="md:w-3/5 font-semibold text-gray-100">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-16 md:py-24 px-4 md:px-6" id="gallery">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
              Gallery
            </h2>
            <p className="text-gray-400">
              See the NovaLux seat in stunning detail
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {seatImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all duration-300"
              >
                <img 
                  src={image}
                  alt={`NovaLux Seat ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-gradient-to-b from-gray-900 to-black" id="install">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
              Installation & Tutorials
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Watch our step-by-step guides for installation and usage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {installationVideos.map((video) => (
              <div
                key={video.id}
                className="overflow-hidden rounded-xl border border-gray-700 bg-gradient-to-br from-gray-800/50 to-gray-900/50 shadow-xl"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-black overflow-hidden">
                  {activeVideo === video.id ? (
                    <iframe
                      src={video.src}
                      className="w-full h-full"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      title={video.title}
                    ></iframe>
                  ) : (
                    <button 
                      onClick={() => setActiveVideo(video.id)}
                      className="w-full h-full flex items-center justify-center cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-700 to-amber-600 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                    </button>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gray-800/50">
                      <video.Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{video.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">
              Complete Your Setup
            </h3>
            <p className="text-gray-400">
              Premium seating solutions for every van conversion need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-amber-500/30 transition-all"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-gray-900 to-black">
                  <div className="w-full h-full flex items-center justify-center">
                    <SofaIcon className="w-12 h-12 text-amber-400" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-100 mb-3">{item.title}</h4>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <div className="font-bold text-white">{item.price}</div>
                  <button className="text-amber-400 hover:text-amber-300 text-sm font-semibold">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERFECT FOR SECTION */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-xl bg-gradient-to-r from-amber-900/20 to-yellow-900/20 border border-amber-500/20">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
              <div className="p-6 rounded-xl bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border border-amber-500/30">
                <Armchair className="w-12 h-12 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">Perfect For</h3>
                <p className="text-gray-300 text-lg">Designed specifically for modern van lifestyles and adventure seekers</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {product.perfectFor.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-gray-900/30 to-black/30 border border-amber-500/10 hover:border-amber-500/30 transition-colors"
                >
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Diamond className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
              Ready to Elevate Your Van Experience?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Join thousands of van enthusiasts who trust NovaLux for premium seating solutions
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleExternalLink(EXTERNAL_URLS.shopAll)}
              className="bg-gradient-to-r from-amber-700 to-amber-600 text-white px-8 py-4 rounded-lg text-base font-semibold hover:from-amber-600 hover:to-amber-500 transition-all border border-amber-600/30"
            >
              Shop All NovaLux Seats
            </button>
            
            <button 
              onClick={() => handleExternalLink(EXTERNAL_URLS.contact)}
              className="bg-gray-800 border border-amber-500/20 text-gray-200 px-8 py-4 rounded-lg text-base font-medium hover:bg-gray-700/50 hover:border-amber-400/30 transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 border-t border-gray-800 pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Diamond className="w-6 h-6 text-amber-400" />
                <span className="text-xl font-bold text-gray-100">NOVALUX</span>
              </div>
              <p className="text-gray-400 text-sm">
                Premium luxury seating solutions for van conversions, engineered for comfort and built for adventure.
              </p>
            </div>

            <div>
              <h4 className="text-gray-100 font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { label: "About Us", url: EXTERNAL_URLS.aboutUs },
                  { label: "Van Seats", url: EXTERNAL_URLS.shopAll },
                  { label: "FAQ", url: EXTERNAL_URLS.faq },
                  { label: "Blog", url: EXTERNAL_URLS.blog },
                  { label: "Contact Us", url: EXTERNAL_URLS.contact }
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url} 
                      onClick={(e) => { e.preventDefault(); handleExternalLink(link.url); }}
                      className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-gray-100 font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                {[
                  { icon: <FileText className="w-4 h-4" />, label: "Terms of service", url: EXTERNAL_URLS.terms },
                  { icon: <Shipping className="w-4 h-4" />, label: "Shipping Policy", url: "#" },
                  { icon: <RotateCcw className="w-4 h-4" />, label: "Return Policy", url: EXTERNAL_URLS.returnPolicy },
                  { icon: <Shield className="w-4 h-4" />, label: "Privacy Policy", url: EXTERNAL_URLS.privacy }
                ].map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.url} 
                      onClick={(e) => { e.preventDefault(); handleExternalLink(item.url); }}
                      className="text-gray-400 hover:text-amber-400 text-sm transition-colors flex items-center gap-2"
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-gray-100 font-bold mb-4">Contact Info</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>320 W Big Bear Blvd, Big Bear City, California, 92314, USA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:help.vankea@gmail.com" className="hover:text-amber-400 transition-colors">
                    help.vankea@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+19514419719" className="hover:text-amber-400 transition-colors">
                    +1 (951) 441-9719
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 pt-8 border-t border-gray-800">
            <div className="max-w-md mx-auto text-center">
              <h4 className="text-base font-bold mb-4 text-gray-100">
                STAY UPDATED ON NOVALUX
              </h4>
              <form onSubmit={handleEmailSubmit} className="relative">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for updates"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-amber-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 text-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-700 to-amber-600 text-white px-4 py-1.5 rounded text-sm font-semibold border border-amber-600/30"
                  >
                    Subscribe
                  </button>
                </div>
                {emailSubmitted && (
                  <p className="text-amber-400 text-sm mt-2">
                    Thank you for subscribing!
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-center gap-4">
              {[
                { icon: <Instagram className="w-5 h-5" />, url: "https://www.instagram.com/vankeakits" },
                { icon: <Twitter className="w-5 h-5" />, url: "https://x.com/Vankea_07" },
                { icon: <Facebook className="w-5 h-5" />, url: "#" },
                { icon: <Youtube className="w-5 h-5" />, url: "#" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  onClick={(e) => { e.preventDefault(); handleExternalLink(social.url); }}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-amber-900/30 border border-gray-700 hover:border-amber-500/30 text-gray-400 hover:text-amber-400 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-500 text-sm">
                <span>© 2025, </span>
                <a href="/" className="hover:text-amber-400 transition-colors font-semibold text-gray-300">NOVALUX</a>
                <span className="mx-2 text-gray-600">|</span>
                <a 
                  href="https://www.shopify.com" 
                  onClick={(e) => { e.preventDefault(); handleExternalLink('https://www.shopify.com'); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Powered by Shopify
                </a>
              </div>
              <div className="flex gap-3 text-gray-500 text-xs">
                <a href="#" className="hover:text-gray-300 transition-colors hover:underline">Terms</a>
                <span className="text-gray-600">•</span>
                <a href="#" className="hover:text-gray-300 transition-colors hover:underline">Privacy</a>
                <span className="text-gray-600">•</span>
                <a href="#" className="hover:text-gray-300 transition-colors hover:underline">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        * {
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        
        img {
          max-width: 100%;
          height: auto;
        }
        
        @media (max-width: 768px) {
          html, body {
            overflow-x: hidden;
          }
          
          section {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
