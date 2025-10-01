import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Finishes = () => {
  const [activeSection, setActiveSection] = useState('walls');

  const wallOptions = [
    {
      id: 'A',
      name: 'Slatted Wood',
      description: 'Wooden planks with black background and wide grooves. Available in various stains using General Finishes gel stains.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'B',
      name: 'Shiplap Imitation',
      description: 'Horizontal planks with narrow grooves. Available in 2.5" or 6" widths. Can be stained or spray painted in any color.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'C',
      name: 'Upholstered Tweed',
      description: 'Soft, textured walls upholstered in tweed fabric. Typically available in beige or gray for a cozy feel.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'D',
      name: 'Flat Plywood',
      description: 'Smooth, flat plywood panels with a clean look. Available in natural UV finish or painted in your choice of color.',
      image: '/api/placeholder/300/200'
    }
  ];

  const flooringOptions = [
    {
      id: '1',
      name: 'Bamboo Flooring',
      description: 'Sustainable bamboo in narrow planks. Durable and eco-friendly with a natural aesthetic.',
      image: '/api/placeholder/300/200'
    },
    {
      id: '2',
      name: 'Heavy Duty Laminate',
      description: 'AquaGuard Performance collection - waterproof, scratch-resistant laminate in various colors.',
      image: '/api/placeholder/300/200'
    },
    {
      id: '3',
      name: 'Marine Woven Vinyl',
      description: 'Durable vinyl flooring designed for marine environments. Waterproof and easy to clean.',
      image: '/api/placeholder/300/200'
    }
  ];

  const doorOptions = [
    {
      id: 'stained',
      name: 'Stained Shiplap',
      description: 'Door panels featuring stained shiplap design that coordinates with your wall choices.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'natural',
      name: 'Natural Wood',
      description: 'Clean, natural wood panels that showcase the beauty of the grain without heavy staining.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'upholstered',
      name: 'Upholstered Covers',
      description: 'Door covers upholstered in matching tweed fabric for a seamless, soft appearance.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'slatted',
      name: 'Slatted Panels',
      description: 'Door panels with slatted wood design, creating visual interest and texture.',
      image: '/api/placeholder/300/200'
    }
  ];

  const cabinetOptions = [
    {
      id: 'bamboo',
      name: 'Bamboo Doors',
      description: 'Cabinet doors crafted from sustainable bamboo with natural grain patterns.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'shaker',
      name: 'Shaker Style',
      description: 'Classic shaker-style cabinet doors made from MDF, available in any paint color.',
      image: '/api/placeholder/300/200'
    },
    {
      id: '3d',
      name: '3D Geometric',
      description: 'Modern doors with 3D geometric patterns created using our CNC machine.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'rattan',
      name: 'Rattan Inserts',
      description: 'Cabinet doors featuring rattan inserts for a light, airy, and textured look.',
      image: '/api/placeholder/300/200'
    }
  ];

  const countertopOptions = [
    {
      id: 'A',
      name: 'Bamboo Countertops',
      description: 'Sustainable bamboo countertops that bring warmth and natural beauty to your kitchen.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'B',
      name: 'Solid Surface',
      description: 'Acrylic countertops that imitate stone with seamless installation and easy maintenance.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'C',
      name: 'Natural Edge Wood',
      description: 'Unique slab of wood with natural edges for a rustic, one-of-a-kind look.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'D',
      name: 'Butcher Block',
      description: 'Classic butcher block countertops, perfect for food preparation with proper oil treatment.',
      image: '/api/placeholder/300/200'
    }
  ];

  const backsplashOptions = [
    {
      id: 'A',
      name: 'Peel and Stick',
      description: 'Lightweight 3mm thick waterproof and heat-resistant peel and stick backsplash.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'B',
      name: 'Glass Mosaic',
      description: 'Peel and stick glass mosaic tiles that add sparkle and visual interest.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'C',
      name: 'Aluminum',
      description: 'Modern aluminum backsplash that is durable, easy to clean, and heat-resistant.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'D',
      name: 'Real Tile',
      description: 'Traditional ceramic or porcelain tile installed with thin-set mortar for a permanent solution.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'E',
      name: 'Bamboo',
      description: 'Bamboo backsplash that coordinates with your countertops and cabinets.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'F',
      name: 'Real Stone',
      description: 'Peel and stick real stone backsplash for a luxurious, natural look.',
      image: '/api/placeholder/300/200'
    }
  ];

  const renderOptions = (options) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {options.map((option) => (
          <div key={option.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">Image of {option.name}</span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{option.name}</h3>
              <p className="text-gray-600">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <><Navbar />

      <div className="max-w-7xl mx-auto px-4">
       <header
        className="relative mb-12  overflow-hidden shadow-xl"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '600px'
        }}
      >
        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full min-h-[400px] px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Your Van Interior Design Choices
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Creating the feel that suits you the most is our goal. Your custom conversion style can follow something that has caught your eye on Instagram, mimic your home color scheme, or be something absolutely new that you would like to build.
          </p>

          {/* Optional: Add a decorative element */}
          <div className="mt-8 w-24 h-1 bg-yellow-400 rounded-full"></div>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">The Design Process</h2>
        <p className="text-gray-700 mb-4">
          The first step towards your dream van is to design a rendering - a video model with the layout and interior color you choose. This helps visualize your space before we begin construction.
        </p>
        <p className="text-gray-700">
          Let's explore the different options available for your van's interior. We'll work together to select the perfect combination of materials, colors, and finishes that reflect your personal style.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveSection('walls')}
          className={`px-4 py-2 rounded-full ${activeSection === 'walls' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Wall Paneling
        </button>
        <button
          onClick={() => setActiveSection('flooring')}
          className={`px-4 py-2 rounded-full ${activeSection === 'flooring' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Flooring
        </button>
        <button
          onClick={() => setActiveSection('doors')}
          className={`px-4 py-2 rounded-full ${activeSection === 'doors' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Doors
        </button>
        <button
          onClick={() => setActiveSection('cabinetry')}
          className={`px-4 py-2 rounded-full ${activeSection === 'cabinetry' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Cabinetry
        </button>
        <button
          onClick={() => setActiveSection('countertops')}
          className={`px-4 py-2 rounded-full ${activeSection === 'countertops' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Countertops
        </button>
        <button
          onClick={() => setActiveSection('backsplash')}
          className={`px-4 py-2 rounded-full ${activeSection === 'backsplash' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Backsplash
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {activeSection === 'walls' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Wall Paneling Options</h2>
            <p className="text-gray-700 mb-6">
              Your van's walls set the tone for the entire interior. We offer several styles to match your aesthetic preferences, from rustic wood to modern upholstered looks. The ceiling can either match the walls or provide a contrasting element.
            </p>
            {renderOptions(wallOptions)}
          </div>
        )}

        {activeSection === 'flooring' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Flooring Options</h2>
            <p className="text-gray-700 mb-6">
              Choose durable, beautiful flooring that can withstand the rigors of van life while complementing your interior design. All our flooring options are selected for their durability and ease of maintenance.
            </p>
            {renderOptions(flooringOptions)}
          </div>
        )}

        {activeSection === 'doors' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Door Cover Options</h2>
            <p className="text-gray-700 mb-6">
              We can leave your van's original plastic door covers or create custom panels that match your interior design. Our door covers are insulated and can be stained, painted, or upholstered to coordinate with your wall paneling.
            </p>
            {renderOptions(doorOptions)}
          </div>
        )}

        {activeSection === 'cabinetry' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Cabinetry Options</h2>
            <p className="text-gray-700 mb-6">
              Custom cabinetry maximizes your storage while adding beauty to your van. Upper cabinets can be lighter to blend with walls or ceiling. We offer various door styles, materials, and finishes to create your perfect look.
            </p>
            {renderOptions(cabinetOptions)}
          </div>
        )}

        {activeSection === 'countertops' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Countertop Options</h2>
            <p className="text-gray-700 mb-6">
              Your kitchen countertop is both a functional workspace and a design focal point. We offer various materials that balance aesthetics with durability in a compact van kitchen environment.
            </p>
            {renderOptions(countertopOptions)}
          </div>
        )}

        {activeSection === 'backsplash' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Backsplash Options</h2>
            <p className="text-gray-700 mb-6">
              A backsplash protects your walls while adding personality to your kitchen. We offer lightweight options suitable for van applications that don't add excessive weight but provide the look you desire.
            </p>
            {renderOptions(backsplashOptions)}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Additional Design Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Hardware & Fixtures</h3>
            <p className="text-gray-700 mb-4">
              Complete your look with coordinated hardware, faucets, and fixtures. Choose from brushed nickel, matte black, gun metal, or gold finishes to complement your design aesthetic.
            </p>
            <div className="h-48 bg-gray-300 flex items-center justify-center rounded">
              <span className="text-gray-600">Hardware Options Image</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Appliances</h3>
            <p className="text-gray-700 mb-4">
              We can incorporate induction stoves (single or double), propane stoves/ovens, compact electrical ovens, and 0.7 cu ft microwaves into your design, built-in or portable based on your needs.
            </p>
            <div className="h-48 bg-gray-300 flex items-center justify-center rounded">
              <span className="text-gray-600">Appliance Options Image</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Design Your Dream Van?</h2>
        <p className="text-gray-700 mb-6">
          Use our ColorSnap app to upload inspiration images and help us determine the colors and styles you'd like to implement in your build.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          Start Your Design
        </button>
      </div>
    </div>
      <Footer/>
      </>
  );
};

export default Finishes;