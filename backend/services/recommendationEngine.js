const Van = require('../models/vanModel');
const PortfolioVan = require('../models/portfolio');

// Keyword index definitions mapping infrastructure keywords to database description vectors
const STYLE_KEYWORDS = {
  luxury:    ['leather', 'premium', 'luxury', 'heated floor', 'marble', 'quartz', 'high-end', 'alcantara'],
  rugged:    ['off-grid', '4x4', 'awd', 'roof rack', 'skid plate', 'all terrain', 'winch', 'safari'],
  minimal:   ['compact', 'minimal', 'efficient', 'lightweight', 'clean line', 'stowaway']
};

const PRIORITY_KEYWORDS = {
  comfort:   ['heated', 'climate', 'air conditioning', 'memory foam', 'leather seat', 'sound system', 'boondocker'],
  adventure: ['solar', 'battery', 'off-grid', 'water tank', 'generator', 'roof rack', 'lithium'],
  space:     ['storage', 'garage', 'closet', 'wardrobe', 'organization', 'cabinet', 'moto-garage']
};

function determineBathroomVariant(detailed_features = [], blueprintType = '') {
  const text = detailed_features.flatMap(f => f.items || []).join(' ').toLowerCase();

  if (blueprintType) return blueprintType; // Fallback mapping hook if explicitly recorded in schema
  if (text.includes('aluminum')) return 'full_aluminum';
  if (text.includes('acrylic')) return 'full_acrylic';
  if (text.includes('tile')) return 'full_real_tile';
  if (text.includes('rear shower')) return 'rear_shower';
  if (text.includes('bench')) return 'shower_in_a_bench';
  if (text.includes('folding')) return 'folding_shower';
  if (text.includes('rear bathroom')) return 'rear_bathroom';

  return text.includes('shower') || text.includes('bath') ? 'full_acrylic' : '';
}

function normalizeInventoryVan(van) {
  const specs = van.van_listing?.specifications;
  const sits  = parseInt(specs?.capacity?.sits) || 0;
  const allFeatures = (van.detailed_features || []).flatMap(f => f.items || []);
  const bathVariant = determineBathroomVariant(van.detailed_features, van.van_listing?.bathroomType);

  return {
    _id:      van._id,
    title:    van.van_listing?.title || 'Untitled Build Asset',
    slug:     van.slug,
    type:     'inventory',
    seats:    sits,
    bathroom: bathVariant !== '',
    bathroom_type: bathVariant,
    features: allFeatures,
    images:   van.gallery || [],
    status:   van.status || 'Available',
    glbFile:  van.glbFile || null,
    chassis:  van.van_listing?.chassisType?.toLowerCase() || ''
  };
}

function normalizePortfolioVan(van) {
  const specs = van.van_listing?.specifications;
  const sits  = parseInt(specs?.capacity?.sits) || 0;
  const allFeatures = (van.detailed_features || []).flatMap(f => f.items || []);
  const bathVariant = determineBathroomVariant(van.detailed_features, van.van_listing?.bathroomType);

  return {
    _id:      van._id,
    title:    van.van_listing?.title || 'Custom Portfolio Layout',
    slug:     van.slug,
    type:     'portfolio',
    seats:    sits,
    bathroom: bathVariant !== '',
    bathroom_type: bathVariant,
    features: allFeatures,
    images:   [...(van.rendering || []), ...(van.gallery || [])],
    status:   van.sold ? 'Built Variant' : 'Blueprint Reference',
    glbFile:  null,
    chassis:  van.van_listing?.chassisType?.toLowerCase() || ''
  };
}

function scoreVan(van, userInput) {
  // Hard Filter 1: Strict Bathroom Requirement Enforcement
  if (userInput.bathroom_required && !van.bathroom) return -100;

  // Hard Filter 2: Specific Bathroom Variant Matching
  if (userInput.bathroom_required && userInput.bathroom_type && van.bathroom_type !== userInput.bathroom_type) {
    return -50; // De-prioritize if bathroom structure layout doesn't align natively
  }

  // Hard Filter 3: Platform Chassis mismatch bypass filter
  if (userInput.vehicle_chassis !== 'no_preference' && van.chassis && !van.chassis.includes(userInput.vehicle_chassis)) {
    return -30;
  }

  let score = 0;

  // Belted Seats Strict Verification Matrix
  const vanSeats = Number(van.seats) || 0;
  const reqSeats = Number(userInput.seats_required) || 2;
  if (vanSeats >= reqSeats) {
    score += 5;
    if (vanSeats === reqSeats) score += 2; // Perfect seat matching bonus footprint
  } else {
    return -100; // Hard fail if physical belt configuration is physically impossible
  }

  // Kitchen elements evaluation checklist array parsing
  if (userInput.kitchen_required && userInput.kitchen_items.length > 0) {
    const textFeatures = van.features.join(' ').toLowerCase();
    userInput.kitchen_items.forEach(item => {
      if (textFeatures.includes(item)) score += 3;
    });
  }

  // Keyword clustering score compilation
  const keywords = [
    ...(STYLE_KEYWORDS[userInput.style] || []),
    ...(PRIORITY_KEYWORDS[userInput.priority] || [])
  ];
  if (keywords.length > 0) {
    const matched = van.features.filter(f =>
      keywords.some(kw => f.toLowerCase().includes(kw.toLowerCase()))
    );
    score += Math.min(matched.length, 6);
  }

  return score;
}

function buildReason(van, userInput) {
  const parts = [];
  parts.push(`Configured with exactly ${van.seats} premium belted locations`);

  if (userInput.bathroom_required && van.bathroom_type) {
    parts.push(`engineered featuring a custom ${van.bathroom_type.replace(/_/g, ' ')} internal layout`);
  }
  if (userInput.kitchen_required && userInput.kitchen_items.length > 0) {
    parts.push(`integrates specialized galley configuration specs`);
  }
  if (van.chassis) {
    parts.push(`optimized natively for ${van.chassis.toUpperCase()} platforms`);
  }

  return parts.join(', ') + '.';
}

async function getRecommendation(userInput) {
  // Pull potential candidate datasets matching base constraint profiles from DB
  const [inventoryVans, portfolioVans] = await Promise.all([
    Van.find({ status: { $in: ['available', 'coming_soon'] } }),
    PortfolioVan.find({})
  ]);

  const normInventory = inventoryVans.map(normalizeInventoryVan);
  const normPortfolio = portfolioVans.map(normalizePortfolioVan);

  // Score dataset maps
  const scoredInventory = normInventory
    .map(v => ({ ...v, score: scoreVan(v, userInput) }))
    .filter(v => v.score >= 12) // Minimum confidence score threshold for high-quality standard match
    .sort((a, b) => b.score - a.score);

  const scoredPortfolio = normPortfolio
    .map(v => ({ ...v, score: scoreVan(v, userInput) }))
    .filter(v => v.score >= 12)
    .sort((a, b) => b.score - a.score);

  const topInv  = scoredInventory[0]  || null;
  const topPort = scoredPortfolio[0]  || null;

  // TRIGGER DYNAMIC FALLBACK SYSTEM IF NO MATRICES MATCH STRICT THRESHOLDS
  if (!topInv && !topPort) {
    return {
      no_match_found: true,
      message: "Hamare ready inventory templates me is waqt koi exact baseline layout majood nahi hai jo aapke is custom components configuration matrix se strictly match ho ske. Lekin as high-end custom engineers, hum aapki criteria par blueprint designs fabricate kar sakte hain!",
      cta_recommendation: 'WhatsApp'
    };
  }

  // Determine top overall match profile
  let primary = topInv && topInv.score >= topPort?.score ? topInv : (topPort || topInv);

  const alternatives = [];
  if (primary.type === 'inventory') {
    if (topPort) alternatives.push(topPort);
    if (scoredInventory[1]) alternatives.push(scoredInventory[1]);
  } else {
    if (topInv)  alternatives.push(topInv);
    if (scoredPortfolio[1]) alternatives.push(scoredPortfolio[1]);
  }

  return {
    no_match_found: false,
    primary_match: {
      title:        primary.title,
      type:         primary.type,
      slug:         primary.slug,
      score:        primary.score,
      reason:       buildReason(primary, userInput),
      images:       primary.images.slice(0, 3),
      key_features: primary.features.slice(0, 6),
      seats:        primary.seats,
      bathroom:     primary.bathroom,
      bathroom_type: primary.bathroom_type,
      status:       primary.status,
      glbFile:      primary.glbFile
    },
    alternatives: alternatives.slice(0, 2).map(v => ({
      title: v.title,
      type:  v.type,
      slug:  v.slug,
      score: v.score
    })),
    cta_recommendation: primary.type === 'inventory' ? 'Get Quote' : 'WhatsApp'
  };
}

module.exports = { getRecommendation };