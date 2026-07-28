const Van = require('../models/vanModel');
const PortfolioVan = require('../models/portfolio');

/* -------------------------------------------------------------------------- */
/* Frontend URL helper                                                        */
/* -------------------------------------------------------------------------- */

function buildFrontendUrl(type, slug) {
  return type === 'inventory' ? `/camper-vans-for-sale/${slug}` : `/van-layouts/${slug}`;
}

/* -------------------------------------------------------------------------- */
/* Bathroom detection (kept from legacy engine — inventory Vans only carry    */
/* bathroom info as free text inside detailed_features, Portfolio carries an  */
/* explicit bathroomType field)                                               */
/* -------------------------------------------------------------------------- */

function determineBathroomVariant(detailed_features = [], blueprintType = '') {
  const text = detailed_features.flatMap(f => f.items || []).join(' ').toLowerCase();
  if (blueprintType) return blueprintType;
  if (text.includes('aluminum')) return 'full_aluminum';
  if (text.includes('acrylic')) return 'full_acrylic';
  if (text.includes('tile')) return 'full_real_tile';
  if (text.includes('rear shower')) return 'rear_shower';
  if (text.includes('bench')) return 'shower_in_a_bench';
  if (text.includes('folding')) return 'folding_shower';
  if (text.includes('rear bathroom')) return 'rear_bathroom';
  return text.includes('shower') || text.includes('bath') ? 'full_acrylic' : '';
}

/* -------------------------------------------------------------------------- */
/* Van length classification — maps a van onto the 'long' / 'short' buckets   */
/* requested by the matchmaker (long: Sprinter 170 / Transit 148 ext /        */
/* Promaster 159, short: Sprinter 144 / Transit 148 / Promaster 130)          */
/* -------------------------------------------------------------------------- */

function classifyVanLength(van) {
  const specs = van.van_listing?.specifications || {};
  const haystack = [
    specs.make_model,
    specs.wheelbase,
    van.van_listing?.title,
    van.van_listing?.subtitle,
    van.van_listing?.tagline,
    ...(van.detailed_features || []).flatMap(f => f.items || [])
  ].filter(Boolean).join(' ').toLowerCase();

  const isPromaster = /promaster|ram/.test(haystack);
  const isSprinter = /sprinter|mercedes/.test(haystack);
  const isTransit = /transit|ford/.test(haystack);
  const isExtended = /\bext(ended)?\b/.test(haystack);

  if (isPromaster && /159/.test(haystack)) return 'long';
  if (isPromaster && /130/.test(haystack)) return 'short';

  if (isSprinter && /170/.test(haystack)) return 'long';
  if (isSprinter && /144/.test(haystack)) return 'short';

  if (isTransit && /148/.test(haystack)) return isExtended ? 'long' : 'short';

  // Fallback purely on wheelbase digits when chassis brand text is missing/dirty
  if (/170/.test(haystack) || /159/.test(haystack)) return 'long';
  if (/144/.test(haystack) || /130/.test(haystack)) return 'short';
  if (/148/.test(haystack)) return isExtended ? 'long' : 'short';

  return null;
}

function parseWheelbaseDigits(van) {
  const specs = van.van_listing?.specifications;
  if (specs?.wheelbase) {
    const digits = String(specs.wheelbase).match(/\d+/);
    if (digits) return digits[0];
  }
  const text = [
    van.van_listing?.title || '',
    ...(van.detailed_features || []).flatMap(f => f.items || [])
  ].join(' ');
  const match = text.match(/1(30|44|48|59|70)/);
  return match ? match[0] : '';
}

/* -------------------------------------------------------------------------- */
/* Normalization                                                              */
/* -------------------------------------------------------------------------- */

function normalizeVanAsset(van, type) {
  const specs = van.van_listing?.specifications;
  const sits = parseInt(specs?.capacity?.sits) || 0;
  const allFeatures = (van.detailed_features || []).flatMap(f => f.items || []);
  const bathVariant = determineBathroomVariant(van.detailed_features, van.van_listing?.bathroomType);

  return {
    _id: van._id,
    title: van.van_listing?.title || 'BBV Custom Concept',
    slug: van.slug,
    type,
    url: buildFrontendUrl(type, van.slug),
    seats: sits,
    bathroom: bathVariant !== '',
    bathroom_type: bathVariant,
    van_length: classifyVanLength(van),
    wheelbase: parseWheelbaseDigits(van),
    features: allFeatures,
    images: type === 'inventory' ? (van.gallery || []) : [...(van.rendering || []), ...(van.gallery || [])],
    status: type === 'inventory' ? (van.status || 'available') : (van.sold ? 'Built Variant' : 'Blueprint Reference'),
    glbFile: type === 'inventory' ? (van.glbFile || null) : null
  };
}

/* -------------------------------------------------------------------------- */
/* Scoring — length, seat closeness and bathroom alignment only               */
/* -------------------------------------------------------------------------- */

function scoreVan(van, userInput) {
  let score = 0;

  const overshoot = Math.max(0, van.seats - userInput.passengers);
  score += Math.max(0, 25 - overshoot * 4); // perfect seat count = 25, decays with extra capacity

  if (userInput.van_length !== 'no_preference' && van.van_length === userInput.van_length) {
    score += 20;
  }

  if (userInput.bathroom_required === 'yes' && van.bathroom) {
    score += 15;
  }

  return score;
}

/* -------------------------------------------------------------------------- */
/* DB-level minimum capacity filter                                          */
/* capacity.sits is stored as a String in both schemas, so a plain $gte would */
/* compare lexicographically — $convert makes the comparison numeric.        */
/* -------------------------------------------------------------------------- */

function capacityFilter(minPassengers) {
  return {
    $expr: {
      $gte: [
        {
          $convert: {
            input: '$van_listing.specifications.capacity.sits',
            to: 'int',
            onError: 0,
            onNull: 0
          }
        },
        minPassengers
      ]
    }
  };
}

/* -------------------------------------------------------------------------- */
/* Main entry point                                                           */
/* -------------------------------------------------------------------------- */

async function getRecommendation(userInput) {
  const [inventoryVans, portfolioVans] = await Promise.all([
    Van.find({
      status: { $in: ['available', 'coming_soon'] },
      is_published: true,
      ...capacityFilter(userInput.passengers)
    }),
    PortfolioVan.find({
      is_published: true,
      ...capacityFilter(userInput.passengers)
    })
  ]);

  let normInventory = inventoryVans.map(v => normalizeVanAsset(v, 'inventory'));
  let normPortfolio = portfolioVans.map(v => normalizeVanAsset(v, 'portfolio'));

  // Van length is a hard filter — skipped entirely on 'no_preference'
  if (userInput.van_length !== 'no_preference') {
    normInventory = normInventory.filter(v => v.van_length === userInput.van_length);
    normPortfolio = normPortfolio.filter(v => v.van_length === userInput.van_length);
  }

  // Bathroom is a hard filter — skipped entirely on 'no_preference'
  if (userInput.bathroom_required === 'yes') {
    normInventory = normInventory.filter(v => v.bathroom);
    normPortfolio = normPortfolio.filter(v => v.bathroom);
  }

  // battery_ac_required intentionally never filters — client budget indicator only

  const scoredInventory = normInventory
    .map(v => ({ ...v, score: scoreVan(v, userInput) }))
    .sort((a, b) => b.score - a.score);

  const scoredPortfolio = normPortfolio
    .map(v => ({ ...v, score: scoreVan(v, userInput) }))
    .sort((a, b) => b.score - a.score);

  const topInv = scoredInventory[0] || null;
  const topPort = scoredPortfolio[0] || null;

  if (!topInv && !topPort) {
    return {
      no_match_found: true,
      message: "No layout matching this seat requirement was found in our existing blueprint specs. The BBV custom design team can create a new map architecture tailored to your specification limits.",
      cta_recommendation: 'WhatsApp'
    };
  }

  let primary = topInv;
  if (!topInv || (topPort && topPort.score > topInv.score)) {
    primary = topPort;
  }

  const educationalLogs = [];
  educationalLogs.push(`Seats ${primary.seats} — comfortably covers your ${userInput.passengers}+ passenger requirement.`);
  if (userInput.van_length !== 'no_preference') {
    educationalLogs.push(`Built on our ${userInput.van_length} wheelbase platform lineup, matching your selected length preference.`);
  }
  if (userInput.bathroom_required === 'yes') {
    educationalLogs.push(`Includes a fitted ${primary.bathroom_type ? primary.bathroom_type.replace(/_/g, ' ') : 'onboard'} bathroom, meeting your must-have requirement.`);
  }

  const alternatives = [];
  if (primary.type === 'inventory') {
    if (topPort) alternatives.push(topPort);
    if (scoredInventory[1]) alternatives.push(scoredInventory[1]);
  } else {
    if (topInv) alternatives.push(topInv);
    if (scoredPortfolio[1]) alternatives.push(scoredPortfolio[1]);
  }

  return {
    no_match_found: false,
    primary_match: {
      title: primary.title,
      type: primary.type,
      slug: primary.slug,
      url: primary.url,
      score: primary.score,
      images: primary.images.slice(0, 3),
      key_features: primary.features.slice(0, 6),
      seats: primary.seats,
      wheelbase: primary.wheelbase,
      bathroom_type: primary.bathroom_type,
      status: primary.status,
      glbFile: primary.glbFile
    },
    suggestions: {
      educational_logs: educationalLogs,
      compiled_pitch: educationalLogs.join(' ')
    },
    alternatives: alternatives.slice(0, 2).map(v => ({
      title: v.title,
      type: v.type,
      slug: v.slug,
      url: v.url
    })),
    cta_recommendation: primary.type === 'inventory' ? 'Get Quote' : 'WhatsApp'
  };
}

module.exports = { getRecommendation };
