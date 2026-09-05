import Link from "next/link";
import {
  Heading2, RichParagraph, Heading3,
  ImageWithSkeleton, PrimaryButton, SecondaryButton, CustomLink,
  SpanTag
} from '../../Common/Common';

// --- Icons (Adventure Ready) ---
const PowerIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const BathroomIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v18M19 3v18M5 11h14M8 11V8a4 4 0 018 0v3" />
  </svg>
);
const KitchenIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);
const BedIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const FEATURES = [
  { text: "Off-grid power", icon: <PowerIcon /> },
  { text: "Full bathroom", icon: <BathroomIcon /> },
  { text: "Pro kitchen", icon: <KitchenIcon /> },
  { text: "Elevator bed", icon: <BedIcon /> },
];

export default function AvailableVans({ availableVans, hasMore, loading, onLoadMore }) {
console.log(availableVans, "availableVans");
const filteredVans = availableVans ? [...availableVans] : [];
  return (
    <section className="bg-secondary py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <SpanTag text={"Ready for adventure"} className="mb-3"/>
            <Heading2 text='In-Stock Vans for sale' />
            <div className="mt-3">
              <RichParagraph>
                Whether you need a high roof cargo van for sale for extra standing space or a compact mini van for sale, we offer bespoke builds on 144, 148, and 170 wheelbases. Explore our latest Ford vans for sale and Mercedes-Benz Sprinter van for sale listings. Every sprinter camper van for sale and ford transit camper van for sale we build is designed for durability, comfort, and the ultimate van life experience.
              </RichParagraph>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 w-full md:w-auto" id="available-vans">
            {FEATURES.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2.5 bg-secondary/50 backdrop-blur-sm p-2.5 border border-secondary/20" style={{ borderRadius: 'var(--radius-md)' }}>
                <div className="text-primary bg-secondary p-1.5 shadow-sm rounded-md">{feat.icon}</div>
                <RichParagraph className="text-primary text-xs font-medium">{feat.text}</RichParagraph>
              </div>
            ))}
          </div>
        </div>

        {/* --- Main Inventory Grid (3 to 4 Columns with Smaller Cards) --- */}
        {filteredVans && filteredVans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
            {filteredVans.map((van) => (
              <div
                key={van._id}
                className="group relative flex flex-col bg-secondary overflow-hidden transition-all duration-300 hover:shadow-xl border border-slate-100"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                {/* Image Container with compact aspect ratio */}
                <Link href={`/camper-vans-for-sale/${van.slug}`} className="relative block aspect-square overflow-hidden bg-slate-100">
                  {van.gallery?.[0] ? (
                    <ImageWithSkeleton
                      src={van.gallery[0]}
                      alt={`${van?.van_listing?.title} - Luxury Custom Camper Van by Big Bear Vans`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-secondary-200 to-secondary-300">
                      <div className="mb-1 text-primary/20">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                      <SpanTag text={"Image Coming Soon"} className="uppercase text-[10px] opacity-40"/>
                    </div>
                  )}

                  {/* SOLD Badge */}
                  {van?.status === "sold" && (
                    <div className="absolute top-3 left-3 z-20 bg-red-600 text-secondary text-[9px] font-black px-2.5 py-1 uppercase tracking-wider shadow-md" style={{ borderRadius: 'var(--radius-md)' }}>
                      Sold Out
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/70 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Hover Icon */}
                  <div className="absolute bottom-3 right-3 z-20 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-secondary text-[var(--color-primary)] p-2.5 shadow-lg" style={{ borderRadius: 'var(--radius-md)' }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                </Link>

                {/* Card Content - Compact Padding */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <Heading3 text={van?.van_listing?.title || "Custom Build"} className="text-base font-semibold leading-tight" />
                    {van?.van_listing?.sale_price > 0 ? (
  <div className="flex flex-col items-end text-right whitespace-nowrap">
    {/* Labor Day Badge */}
    <span
      className="mb-1.5 inline-flex items-center bg-red-600 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-secondary shadow-sm"
      style={{ borderRadius: 'var(--radius-md)' }}
    >
      {van?.van_listing?.tagline || "Labor Day Special Offer"}
    </span>

    {/* Original Price */}
    <span className="text-[11px] font-medium text-primary/45 line-through">
      ${Number(van.van_listing.price).toLocaleString()}
    </span>

    {/* Sale Price */}
    <Heading3
      text={`$${Number(van.van_listing.sale_price).toLocaleString()}`}
      className="!text-hover text-lg font-bold leading-none"
    />

    {/* Savings */}
    <span className="mt-1 text-[9px] font-bold uppercase tracking-wider text-red-600">
      Save ${(
        Number(van.van_listing.price) -
        Number(van.van_listing.sale_price)
      ).toLocaleString()}
    </span>
  </div>
) : (
  van?.van_listing?.price > 100 && (
    <Heading3
      text={`$${Number(van.van_listing.price).toLocaleString()}`}
      className="!text-hover text-base font-bold whitespace-nowrap"
    />
  )
)}
                    </div>
                    <RichParagraph className="line-clamp-2 text-xs mb-4">
                      {van?.van_listing?.subtitle || "A premium camper conversion crafted for the ultimate freedom."}
                    </RichParagraph>
                  </div>

                  <div>
                    <div className="h-[1px] w-full bg-slate-100 mb-4" />
                    <CustomLink href={`/camper-vans-for-sale/${van.slug}`} text={"Explore Details +"} className="text-xs font-medium" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* --- Pipeline / Coming Soon Section --- */
          <div className="mt-8">
            <div className="text-center mb-8">
              <Heading2 text="Upcoming Builds In Progress" />
              <RichParagraph className="opacity-70 text-sm">Securing the next generation of adventure vans.</RichParagraph>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2].map((_, idx) => (
                <div key={idx} className="bg-secondary/40 border-2 border-dashed border-secondary-300 p-6 flex flex-col items-center text-center justify-center space-y-3" style={{ borderRadius: 'var(--radius-md)' }}>
                  <div className="w-10 h-10 rounded-full bg-secondary-200 animate-pulse" />
                  <div className="h-3.5 w-3/4 bg-secondary-200 rounded animate-pulse" />
                  <div className="h-2.5 w-1/2 bg-secondary-100 rounded animate-pulse" />
                </div>
              ))}
              <div className="bg-primary p-6 flex flex-col items-center text-center justify-center shadow-xl">
                <Heading3 text="Want a custom build?" className="text-secondary mb-2 text-lg" />
                <p className="text-secondary/60 text-xs mb-6 italic">Don't wait for these to finish. Secure your spot now.</p>
                <PrimaryButton label="Inquire Now" link="/build-your-own-camper-van" />
              </div>
            </div>
          </div>
        )}

        <div className="mt-14 flex flex-col items-center">
          <div className="w-16 h-[1px] bg-primary/20 mb-6" />
          <SecondaryButton
            aria-label="Load more posts"
            onClick={onLoadMore}
            disabled={loading || !hasMore}
            label={loading ? "Refreshing Inventory..." : !hasMore ? "" : "View More Available Vans"}
          />
        </div>
      </div>
    </section>
  );
}