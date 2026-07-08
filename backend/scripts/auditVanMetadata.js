// Guardrail script for the matchmaker engine.
// Reports Van / Portfolio documents with missing or non-numeric capacity.sits,
// or missing wheelbase — both fields the matchmaker filters on directly.
//
// Run from backend/:  node scripts/auditVanMetadata.js
require('dotenv').config();
const mongoose = require('mongoose');
const Van = require('../models/vanModel');
const PortfolioVan = require('../models/portfolio');

function hasValidCapacity(entry) {
  const sits = entry?.van_listing?.specifications?.capacity?.sits;
  const parsed = parseInt(sits, 10);
  return sits !== undefined && sits !== null && sits !== '' && !Number.isNaN(parsed) && parsed > 0;
}

function hasWheelbase(entry) {
  const wb = entry?.van_listing?.specifications?.wheelbase;
  return !!(wb && String(wb).trim() !== '');
}

function auditCollection(entries) {
  const missingCapacity = [];
  const missingWheelbase = [];

  entries.forEach((entry) => {
    const ref = { id: entry._id.toString(), slug: entry.slug, title: entry.van_listing?.title };
    if (!hasValidCapacity(entry)) missingCapacity.push(ref);
    if (!hasWheelbase(entry)) missingWheelbase.push(ref);
  });

  return { total: entries.length, missingCapacity, missingWheelbase };
}

async function run() {
  await mongoose.connect(process.env.MONGO_URL);

  const [vans, portfolioVans] = await Promise.all([Van.find({}), PortfolioVan.find({})]);

  const vanReport = auditCollection(vans);
  const portfolioReport = auditCollection(portfolioVans);

  console.log('\n=== Van (inventory) ===');
  console.log(`Total: ${vanReport.total}`);
  console.log(`Missing/invalid capacity.sits: ${vanReport.missingCapacity.length}`);
  vanReport.missingCapacity.forEach((v) => console.log(`  - ${v.slug || v.id} (${v.title})`));
  console.log(`Missing wheelbase: ${vanReport.missingWheelbase.length}`);
  vanReport.missingWheelbase.forEach((v) => console.log(`  - ${v.slug || v.id} (${v.title})`));

  console.log('\n=== Portfolio ===');
  console.log(`Total: ${portfolioReport.total}`);
  console.log(`Missing/invalid capacity.sits: ${portfolioReport.missingCapacity.length}`);
  portfolioReport.missingCapacity.forEach((v) => console.log(`  - ${v.slug || v.id} (${v.title})`));
  console.log(`Missing wheelbase: ${portfolioReport.missingWheelbase.length}`);
  portfolioReport.missingWheelbase.forEach((v) => console.log(`  - ${v.slug || v.id} (${v.title})`));

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
