const BRAND = "Big Bear Vans";
const MAX_LENGTH = 65;

// Drops a brand the admin already typed ("... at Big Bear Vans", "... | Big Bear Vans")
// so appending the suffix never doubles it
function stripBrand(text = "") {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s*(?:[|\-–—]|\bat|\bby|\bfrom)?\s*Big Bear Vans\s*$/i, "")
    .trim();
}

// "<text> | Big Bear Vans", falling back to the bare text when the suffix
// would push the title past the length limit
export function withBrand(text) {
  const base = stripBrand(text);
  if (!base) return BRAND;
  const full = `${base} | ${BRAND}`;
  return full.length <= MAX_LENGTH ? full : base;
}

// Short van names like "Phenix" say nothing about the page, so names without a
// van keyword get a descriptor: "Phenix Sprinter Camper Van for Sale | Big Bear Vans"
export function vanTitle(listing, kind) {
  // An admin-written SEO title always wins over the generated one
  if (listing?.seo_title?.trim()) return withBrand(listing.seo_title);

  const base = stripBrand(listing?.title);
  if (!base) return BRAND;
  if (/camper|sprinter|transit/i.test(base)) return withBrand(base);

  const makeModel = listing?.specifications?.make_model || "";
  const chassis = /transit/i.test(makeModel) ? "Transit " : /sprinter/i.test(makeModel) ? "Sprinter " : "";
  const descriptor = kind === "sale" ? `${chassis}Camper Van for Sale` : `${chassis}Camper Van Layout`;

  const expanded = `${base} ${descriptor} | ${BRAND}`;
  return expanded.length <= MAX_LENGTH ? expanded : withBrand(base);
}

// Meta description for van pages: admin-written SEO description, else the subtitle
export function vanDescription(listing) {
  return (
    listing?.seo_description?.trim() ||
    listing?.subtitle ||
    `Explore the custom ${listing?.title}. High-quality conversion with premium specs.`
  );
}
