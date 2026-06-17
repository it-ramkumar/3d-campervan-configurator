const Van = require('../models/vanModel');
const PortfolioVan = require('../models/portfolio');

const STYLE_KEYWORDS = {
  luxury:    ['leather', 'premium', 'luxury', 'heated floor', 'marble', 'quartz', 'high-end'],
  rugged:    ['off-grid', '4x4', 'awd', 'roof rack', 'skid plate', 'all terrain', 'safari'],
  minimal:   ['compact', 'minimal', 'efficient', 'lightweight', 'clean line']
};

const PRIORITY_KEYWORDS = {
  comfort:   ['heated', 'climate', 'air conditioning', 'memory foam', 'leather seat', 'sound system'],
  adventure: ['solar', 'battery', 'off-grid', 'water tank', 'generator', 'roof rack'],
  space:     ['storage', 'garage', 'closet', 'wardrobe', 'organization', 'cabinet']
};

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

function parseWheelbase(van) {
  // Extracting from specifications strings safely
  const text = [
    van.van_listing?.title || '',
    van.van_listing?.specifications?.notes || '',
    ...(van.detailed_features || []).flatMap(f => f.items || [])
  ].join(' ').toLowerCase();

  if (text.includes('144')) return '144';
  if (text.includes('170')) return '170';
  if (text.includes('148')) return '148';
  if (text.includes('130')) return '130';
  return '144'; // Default baseline custom layout standard
}

function normalizeVanAsset(van, type) {
  const specs = van.van_listing?.specifications;
  const sits  = parseInt(specs?.capacity?.sits) || 0;
  const allFeatures = (van.detailed_features || []).flatMap(f => f.items || []);
  const bathVariant = determineBathroomVariant(van.detailed_features, van.van_listing?.bathroomType);
  const wb = parseWheelbase(van);

  return {
    _id:      van._id,
    title:    van.van_listing?.title || 'BBV Custom Concept',
    slug:     van.slug,
    type:     type,
    seats:    sits,
    bathroom: bathVariant !== '',
    bathroom_type: bathVariant,
    wheelbase: wb,
    features: allFeatures,
    images:   type === 'inventory' ? (van.gallery || []) : [...(van.rendering || []), ...(van.gallery || [])],
    status:   type === 'inventory' ? (van.status || 'Available') : (van.sold ? 'Built Variant' : 'Blueprint Reference'),
    glbFile:  type === 'inventory' ? (van.glbFile || null) : null,
    chassis:  van.van_listing?.chassisType?.toLowerCase() || ''
  };
}

function scoreVanWithSuggestions(van, userInput) {
  // 1. STRICT SEATS CONSTRAINT
  const vanSeats = Number(van.seats) || 0;
  const reqSeats = Number(userInput.seats_required) || 2;
  if (vanSeats < reqSeats) return -100; // Physical capacity restriction drop

  let score = 20; // High base matching footprint

  // Seat closeness matching
  if (vanSeats === reqSeats) score += 10;

  // 2. WHEELBASE SOFT SELECTION
  if (userInput.wheelbase !== 'no_preference' && van.wheelbase) {
    if (van.wheelbase === userInput.wheelbase) {
      score += 15; // Heavy bonus points for matching preferred engineering chassis line
    }
  }

  // 3. BATHROOM INTERIOR LAYOUT CHECK
  if (userInput.bathroom_required) {
    if (van.bathroom) {
      score += 10;
      if (userInput.bathroom_type && van.bathroom_type === userInput.bathroom_type) {
        score += 10; // Extra alignment match
      }
    }
  }

  // 4. STYLE & CHARACTER CORRELATIONS
  const keywords = [
    ...(STYLE_KEYWORDS[userInput.style] || []),
    ...(PRIORITY_KEYWORDS[userInput.priority] || [])
  ];
  if (keywords.length > 0) {
    const matched = van.features.filter(f =>
      keywords.some(kw => f.toLowerCase().includes(kw.toLowerCase()))
    );
    score += Math.min(matched.length, 5);
  }

  return score;
}

async function getRecommendation(userInput) {
  const [inventoryVans, portfolioVans] = await Promise.all([
    Van.find({ status: { $in: ['available', 'coming_soon'] } }),
    PortfolioVan.find({})
  ]);

  const normInventory = inventoryVans.map(v => normalizeVanAsset(v, 'inventory'));
  const normPortfolio = portfolioVans.map(v => normalizeVanAsset(v, 'portfolio'));

  const scoredInventory = normInventory
    .map(v => ({ ...v, score: scoreVanWithSuggestions(v, userInput) }))
    .filter(v => v.score > 0)
    .sort((a, b) => b.score - a.score);

  const scoredPortfolio = normPortfolio
    .map(v => ({ ...v, score: scoreVanWithSuggestions(v, userInput) }))
    .filter(v => v.score > 0)
    .sort((a, b) => b.score - a.score);

  const topInv  = scoredInventory[0]  || null;
  const topPort = scoredPortfolio[0]  || null;

  if (!topInv && !topPort) {
    return {
      no_match_found: true,
      message: "Hamare existing blueprint specs me is seat requirement ki koi layout nahi mili. BBV custom design team aapke specification limits ke mutabik naya map architecture ready kar sakti hai.",
      cta_recommendation: 'WhatsApp'
    };
  }

  // Prioritize primary asset matching engine
  let primary = topInv;
  if (!topInv || (topPort && topPort.score > topInv.score)) {
    primary = topPort;
  }

  // BUILD CUSTOM SUGGESTIONS ENGINE MESSAGES DYNAMICALLY
  const contextNotes = [];
  let wbAlert = false;
  let bathAlert = false;

  // Check if selected wheelbase matrix mismatch occurred
  if (userInput.wheelbase !== 'no_preference' && primary.wheelbase !== userInput.wheelbase) {
    wbAlert = true;
    contextNotes.push(`Aapne ${userInput.wheelbase}" Wheelbase select kiya tha, lekin humne pehle yeh layout design ${primary.wheelbase}" wheelbase platform par execute kiya hai. Yeh aapke pasandida ${userInput.wheelbase}" length structure par bhi easily tailor-made ho sakta hai!`);
  } else if (primary.wheelbase) {
    contextNotes.push(`This layout is engineered cleanly natively over a ${primary.wheelbase}" length platform structure.`);
  }

  // Check if chosen premium bathroom layout matches physical template build
  if (userInput.bathroom_required) {
    if (!primary.bathroom) {
      bathAlert = true;
      contextNotes.push(`Is physical template core structure me humne bathroom display nahi kiya hai, par aapka selected "${userInput.bathroom_type.replace(/_/g, ' ')}" module custom add-on integration zone me deploy ho sakta hai.`);
    } else if (userInput.bathroom_type && primary.bathroom_type !== userInput.bathroom_type) {
      bathAlert = true;
      contextNotes.push(`Aapne "${userInput.bathroom_type.replace(/_/g, ' ')}" bathroom option select kiya hai, humne pehle is build template me "${primary.bathroom_type.replace(/_/g, ' ')}" space install kiya tha. Lekin agar aap chahain to custom building k waqt aapka preferred model fix kiya ja sakta hai.`);
    }
  }

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
      title:         primary.title,
      type:          primary.type,
      slug:          primary.slug,
      score:         primary.score,
      images:        primary.images.slice(0, 3),
      key_features:  primary.features.slice(0, 6),
      seats:         primary.seats,
      wheelbase:     primary.wheelbase,
      bathroom_type: primary.bathroom_type,
      status:        primary.status,
      glbFile:       primary.glbFile
    },
    suggestions: {
      wheelbase_mismatch_alert: wbAlert,
      bathroom_mismatch_alert:  bathAlert,
      educational_logs:         contextNotes,
      compiled_pitch:           contextNotes.join(' ')
    },
    alternatives: alternatives.slice(0, 2).map(v => ({
      title: v.title,
      type:  v.type,
      slug:  v.slug
    })),
    cta_recommendation: primary.type === 'inventory' ? 'Get Quote' : 'WhatsApp'
  };
}

module.exports = { getRecommendation };