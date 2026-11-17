// Display order for in-stock vans (Anna, Nov 16 2026), matched by slug, not by API order.
// Vans not listed here keep their API order after these.
export const VAN_PRIORITY = [
  "santa-monica-awd-charcoal-matte-gray", // AWD Transit Santa Monica Charcoal
  "montreal-stone-gray-awd-170", // Montreal Stone Gray AWD 170
  "montreal-170-awd-pop-top-blue-gray", // Montreal 170 AWD Pop Top Blue Gray
  "poptop-adventure-family-build", // Lowroof Pop Top (Sprinter 144)
];

export function sortVansByPriority(vans = []) {
  const rank = (v) => {
    const i = VAN_PRIORITY.indexOf(v?.slug);
    return i === -1 ? VAN_PRIORITY.length : i;
  };
  // Stable: equal ranks keep their original order.
  return vans
    .map((v, i) => [v, i])
    .sort((a, b) => rank(a[0]) - rank(b[0]) || a[1] - b[1])
    .map(([v]) => v);
}
