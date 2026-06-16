const Van = require('../models/vanModel');
const PortfolioVan = require('../models/portfolio');

const BUDGET_RANGES = {
  low:     { max: 60000 },
  mid:     { min: 60000,  max: 100000 },
  high:    { min: 100000, max: 150000 },
  premium: { min: 150000 }
};

const USE_CASE_CATEGORIES = {
  solo:      ['layouts-for-solo-and-couple-travelers', 'flagship-short-van-santa-monica'],
  couple:    ['layouts-for-solo-and-couple-travelers', 'flagship-short-van-santa-monica'],
  family:    ['layouts-for-families-3-9-people', 'flagship-long-van-montreal'],
  business:  ['flagship-long-van-montreal', 'portfolio-of-custom-builds'],
  adventure: ['sugarloaf', 'portfolio-of-custom-builds']
};

const STYLE_CATEGORIES = {
  rugged:    ['sugarloaf'],
  adventure: ['sugarloaf'],
  luxury:    ['amsterdam', 'flagship-long-van-montreal'],
  minimal:   ['layouts-for-solo-and-couple-travelers'],
  mixed:     ['portfolio-of-custom-builds']
};

const STYLE_KEYWORDS = {
  luxury:    ['leather', 'premium', 'luxury', 'heated floor', 'marble', 'quartz', 'high-end'],
  rugged:    ['off-grid', '4x4', 'awd', 'roof rack', 'skid plate', 'all terrain'],
  minimal:   ['compact', 'minimal', 'efficient', 'lightweight'],
  mixed:     ['solar', 'kitchen', 'storage', 'versatile']
};

const PRIORITY_KEYWORDS = {
  comfort:   ['heated', 'climate', 'air conditioning', 'memory foam', 'leather seat', 'sound system'],
  adventure: ['solar', 'battery', 'off-grid', 'water tank', 'generator', 'roof rack'],
  space:     ['storage', 'garage', 'closet', 'wardrobe', 'organization', 'cabinet'],
  price:     []
};

function hasBathroomInFeatures(detailed_features = []) {
  const text = detailed_features.flatMap(f => f.items || []).join(' ').toLowerCase();
  return (
    text.includes('bathroom') ||
    text.includes('toilet') ||
    text.includes('shower') ||
    text.includes('wet bath') ||
    text.includes('dry bath') ||
    text.includes('cassette')
  );
}

function priceToNumber(price) {
  if (!price && price !== 0) return null;
  if (typeof price === 'number') return price;
  const n = parseFloat(String(price).replace(/[^0-9.]/g, ''));
  return isNaN(n) ? null : n;
}

function budgetFits(price, budget) {
  if (!price) return false;
  const range = BUDGET_RANGES[budget];
  if (!range) return false;
  if (range.min !== undefined && price < range.min) return false;
  if (range.max !== undefined && price > range.max) return false;
  return true;
}

function inferInventoryCategory(sits, sleeps, detailed_features = []) {
  const text = detailed_features.flatMap(f => f.items || []).join(' ').toLowerCase();
  if (sits >= 5 || sleeps >= 4) return ['layouts-for-families-3-9-people'];
  if (text.includes('4x4') || text.includes('off-road') || text.includes('awd')) return ['sugarloaf'];
  if (sits <= 2 && sleeps <= 2) return ['layouts-for-solo-and-couple-travelers'];
  return ['portfolio-of-custom-builds'];
}

function normalizeInventoryVan(van) {
  const specs = van.van_listing?.specifications;
  const sits  = parseInt(specs?.capacity?.sits)   || 0;
  const sleeps = parseInt(specs?.capacity?.sleeps) || 0;
  const hasBathroom = hasBathroomInFeatures(van.detailed_features);
  const price = priceToNumber(van.van_listing?.price);
  const allFeatures = (van.detailed_features || []).flatMap(f => f.items || []);

  return {
    _id:      van._id,
    title:    van.van_listing?.title || 'Untitled',
    slug:     van.slug,
    type:     'inventory',
    category: inferInventoryCategory(sits, sleeps, van.detailed_features),
    seats:    sits,
    sleeps,
    bathroom: hasBathroom,
    price,
    features: allFeatures,
    images:   van.gallery || [],
    status:   van.status,
    glbFile:  van.glbFile || null
  };
}

function normalizePortfolioVan(van) {
  const specs       = van.van_listing?.specifications;
  const sits        = parseInt(specs?.capacity?.sits)   || 0;
  const sleeps      = parseInt(specs?.capacity?.sleeps) || 0;
  const bathroomType = van.van_listing?.bathroomType || '';
  const hasBathroom = !!(
    bathroomType &&
    bathroomType.toLowerCase() !== 'none' &&
    bathroomType.toLowerCase() !== 'no bathroom' &&
    bathroomType.trim() !== ''
  );
  const price = priceToNumber(van.van_listing?.price);
  const allFeatures = (van.detailed_features || []).flatMap(f => f.items || []);

  return {
    _id:      van._id,
    title:    van.van_listing?.title || 'Untitled',
    slug:     van.slug,
    type:     'portfolio',
    category: van.category || [],
    seats:    sits,
    sleeps,
    bathroom: hasBathroom,
    price,
    features: allFeatures,
    images:   [...(van.rendering || []), ...(van.gallery || [])],
    status:   van.sold ? 'sold' : 'available',
    glbFile:  null
  };
}

function scoreVan(van, userInput) {
  const {
    use_case,
    seats_required  = 2,
    sleeps_required = 2,
    bathroom_required = false,
    budget,
    style,
    priority
  } = userInput;

  // Hard Filter: Agar bathroom zaroori hai aur van me nahi hai, to skip kar dein
  if (bathroom_required && !van.bathroom) {
    return -100;
  }

  let score = 0;

  // Seats (Strict Number Comparison)
  const vanSeats = Number(van.seats) || 0;
  const reqSeats = Number(seats_required) || 2;

  if (vanSeats >= reqSeats) score += 2;
  else score -= 2;

  // Sleeps (Strict Number Comparison)
  const vanSleeps = Number(van.sleeps) || 0;
  const reqSleeps = Number(sleeps_required) || 2;

  if (vanSleeps >= reqSleeps) score += 2;

  // Bathroom (Strictly enforced score boost if matched)
  if (bathroom_required && van.bathroom) {
    score += 3;
  }

  // Budget
  if (van.price && budgetFits(van.price, budget)) score += 2;

  // Use-case category match
  const vanCats   = Array.isArray(van.category) ? van.category : [van.category];
  const useCats   = USE_CASE_CATEGORIES[use_case] || [];
  if (vanCats.some(c => useCats.includes(c))) score += 2;

  // Style category match
  const styleCats = STYLE_CATEGORIES[style] || [];
  if (vanCats.some(c => styleCats.includes(c))) score += 2;

  // Feature keyword matching (max +5)
  const keywords = [
    ...(STYLE_KEYWORDS[style]      || []),
    ...(PRIORITY_KEYWORDS[priority] || [])
  ];
  if (keywords.length > 0) {
    const matched = van.features.filter(f =>
      keywords.some(kw => f.toLowerCase().includes(kw.toLowerCase()))
    );
    score += Math.min(matched.length, 5);
  }

  // Poptop boost for large sleep needs
  if (reqSleeps >= 4 && vanCats.includes('poptop')) score += 2;

  return score;
}

function buildReason(van, userInput) {
  const parts = [];

  const vanSeats = Number(van.seats) || 0;
  const reqSeats = Number(userInput.seats_required) || 2;
  const vanSleeps = Number(van.sleeps) || 0;
  const reqSleeps = Number(userInput.sleeps_required) || 2;

  if (vanSeats >= reqSeats)
    parts.push(`seats ${reqSeats}+ people`);
  if (vanSleeps >= reqSleeps)
    parts.push(`sleeps ${reqSleeps}+`);
  if (userInput.bathroom_required && van.bathroom)
    parts.push('includes bathroom');

  const vanCats = Array.isArray(van.category) ? van.category : [van.category];
  const useCats = USE_CASE_CATEGORIES[userInput.use_case] || [];
  if (vanCats.some(c => useCats.includes(c)))
    parts.push(`ideal for ${userInput.use_case} travel`);

  if (parts.length === 0) parts.push('closest available match');
  return parts.join(', ');
}

async function getRecommendation(userInput) {
  const [inventoryVans, portfolioVans] = await Promise.all([
    Van.find({
      status: { $in: ['available', 'coming_soon'] },
      'van_listing.specifications.capacity.sits': { $gte: String(userInput.seats_required) }
    }),
    PortfolioVan.find({
      'van_listing.specifications.capacity.sits': { $gte: String(userInput.seats_required) }
    })
  ]);

  const normInventory  = inventoryVans.map(normalizeInventoryVan);
  const normPortfolio  = portfolioVans.map(normalizePortfolioVan);

  const scoredInventory = normInventory
    .map(v => ({ ...v, score: scoreVan(v, userInput) }))
    .filter(v => v.score >= 0) // Discard ignored hard-filtered vans
    .sort((a, b) => b.score - a.score);

  const scoredPortfolio = normPortfolio
    .map(v => ({ ...v, score: scoreVan(v, userInput) }))
    .filter(v => v.score >= 0) // Discard ignored hard-filtered vans
    .sort((a, b) => b.score - a.score);

  const topInv  = scoredInventory[0]  || null;
  const topPort = scoredPortfolio[0]  || null;

  if (!topInv && !topPort) return null;

  let primary;
  let fallbackUsed = false;

  if (topInv && topInv.score >= 7) {
    primary = topInv;
  } else if (topPort) {
    primary = topPort;
    fallbackUsed = !topInv || topInv.score < 7;
  } else {
    primary = topInv;
  }

  // Alternatives: 1-2 from the other dataset + 2nd best of same
  const alternatives = [];
  if (primary.type === 'inventory') {
    if (topPort) alternatives.push(topPort);
    if (scoredInventory[1]?.score >= 4) alternatives.push(scoredInventory[1]);
  } else {
    if (topInv)  alternatives.push(topInv);
    if (scoredPortfolio[1]?.score >= 4) alternatives.push(scoredPortfolio[1]);
  }

  const profileSummary = [
    `${userInput.use_case} traveler`,
    `${userInput.seats_required} seats`,
    `${userInput.sleeps_required} sleeping spots`,
    userInput.bathroom_required ? 'bathroom required' : 'no bathroom needed',
    `${userInput.budget} budget`,
    `${userInput.style} style`
  ].join(', ');

  return {
    primary_match: {
      title:        primary.title,
      type:         primary.type,
      category:     Array.isArray(primary.category) ? primary.category[0] : primary.category,
      slug:         primary.slug,
      score:        primary.score,
      reason:       buildReason(primary, userInput),
      images:       primary.images.slice(0, 3),
      key_features: primary.features.slice(0, 6),
      price:        primary.price,
      seats:        primary.seats,
      sleeps:       primary.sleeps,
      bathroom:     primary.bathroom,
      status:       primary.status,
      glbFile:      primary.glbFile
    },
    alternatives: alternatives.slice(0, 2).map(v => ({
      title: v.title,
      type:  v.type,
      slug:  v.slug,
      score: v.score
    })),
    fallback_used:        fallbackUsed,
    user_profile_summary: profileSummary,
    cta_recommendation:   primary.type === 'inventory' ? 'Get Quote' : 'WhatsApp'
  };
}

module.exports = { getRecommendation };