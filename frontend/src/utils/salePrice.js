// A van is "on sale" when the dashboard's Sale Price field is set and is
// lower than the regular price. Clear the Sale Price field to end a sale.
export function hasSale(listing) {
  const price = Number(listing?.price);
  const sale = Number(listing?.sale_price);
  return price > 99 && sale > 99 && sale < price;
}

// Price customers actually pay: the sale price during a sale, else the list price.
export function effectivePrice(listing) {
  return hasSale(listing) ? Number(listing.sale_price) : listing?.price;
}

// Black Friday 2026 runs through Nov 28 (Pacific). After this moment the
// homepage banner and the "Black Friday Deal" badges hide on their own;
// sale prices keep showing until the Sale Price field is cleared.
export const BLACK_FRIDAY_END = new Date("2026-11-29T00:00:00-08:00");

export function isBlackFriday(now = new Date()) {
  return now < BLACK_FRIDAY_END;
}
