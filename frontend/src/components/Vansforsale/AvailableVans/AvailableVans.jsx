import Link from "next/link";
import {
  Heading2, RichParagraph, Heading3,
  ImageWithSkeleton, PrimaryButton, SecondaryButton, CustomLink
} from '../../Common/Common';

// --- Icons (Adventure Ready) ---
const PowerIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const BathroomIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v18M19 3v18M5 11h14M8 11V8a4 4 0 018 0v3" />
  </svg>
);
const KitchenIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);
const BedIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

  const filteredVans = availableVans?.filter((van) => {
  const title = van?.van_listing?.title?.toLowerCase();

  return ![
    "santa monica white",
    "ford transit t-350 2026..",
  ].includes(title);
})
  return (
    <section className="bg-secondary py-16 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto  px-6">

        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <RichParagraph className="uppercase mb-4 !text-sm tracking-wider !text-hover font-bold">
              Ready for adventure
            </RichParagraph>
            <Heading2 text='In-Stock Vans for sale' />
            <div className="mt-4">
              <RichParagraph>
              Whether you need a high roof cargo van for sale for extra standing space or a compact mini van for sale, we offer bespoke builds on 144, 148, and 170 wheelbases. Explore our latest Ford vans for sale and Mercedes-Benz Sprinter van for sale listings. Every sprinter camper van for sale and ford transit camper van for sale we build is designed for durability, comfort, and the ultimate van life experience.            </RichParagraph>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            {FEATURES.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-3 border border-white/20" style={{ borderRadius: 'var(--radius-md)' }}>
                <div className="text-primary bg-white p-2 shadow-sm rounded-lg">{feat.icon}</div>
                <RichParagraph className="text-primary">{feat.text}</RichParagraph>
              </div>
            ))}
          </div>
        </div>

        {/* --- Main Inventory Grid --- */}
        {filteredVans && filteredVans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {filteredVans.map((van) => (
              <div
                key={van._id}
                className="group relative flex flex-col bg-white overflow-hidden transition-all duration-500 hover:shadow-2xl"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <Link href={`/van-detail/${van.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
                  {/* Logic: Image or Coming Soon Placeholder */}
                  {van.gallery?.[0] ? (
                    <ImageWithSkeleton
                      src={van.gallery[0]}
                      alt={`${van?.van_listing?.title} - Luxury Custom Camper Van by Big Bear Vans`}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                      <div className="mb-2 text-[var(--color-primary)]/20">
                        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] opacity-40">
                        Image Coming Soon
                      </span>
                    </div>
                  )}

                  {/* SOLD Badge */}
                  {van?.status === "sold" && (
                    <div className="absolute top-4 left-4 z-20 bg-red-600 text-white text-[10px] font-black px-4 py-1.5 uppercase tracking-widest shadow-lg" style={{ borderRadius: 'var(--radius-md)' }}>
                      Sold Out
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Hover Icon */}
                  <div className="absolute bottom-6 right-6 z-20 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white text-[var(--color-primary)] p-4 shadow-xl" style={{ borderRadius: 'var(--radius-md)' }}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                </Link>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <Heading3 text={van?.van_listing?.title || "Custom Build"} />
                    {van.van_listing.price > 100 && <Heading3 text={`$${Number(van.van_listing.price).toLocaleString()}`} className='!text-hover' />
                    }                    {/* <RichParagraph className=' font-bold !text-hover'>{`$${Number(van?.van_listing?.price).toLocaleString()}`}</RichParagraph> */}
                  </div>
                  <RichParagraph className="line-clamp-2 mb-6">
                    {van?.van_listing?.subtitle || "A premium camper conversion crafted for the ultimate freedom."}
                  </RichParagraph>
                  <div className="h-[1px] w-full bg-slate-100 mb-6" />
                  <CustomLink href={`/van-detail/${van.slug}`} text={"Explore Details +"} />

                </div>
              </div>
            ))}
          </div>
        ) : (
          /* --- Pipeline / Coming Soon Section --- */
          <div className="mt-10">
            <div className="text-center mb-12">
              <Heading2 text="Upcoming Builds In Progress" />
              <RichParagraph className="opacity-70">Securing the next generation of adventure vans.</RichParagraph>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2].map((_, idx) => (
                <div key={idx} className="bg-white/40 border-2 border-dashed border-gray-300 p-10 flex flex-col items-center text-center justify-center space-y-4" style={{ borderRadius: 'var(--radius-md)' }}>
                  <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
              <div className="bg-[var(--color-primary)] p-10 flex flex-col items-center text-center justify-center shadow-2xl" style={{ borderRadius: 'var(--radius-md)' }}>
                <Heading3 text="Want a custom build?" className="text-white mb-4" />
                <p className="text-white/60 text-sm mb-8 italic">Don't wait for these to finish. Secure your spot now.</p>
                <PrimaryButton label="Inquire Now" link="/inquiry" />
              </div>
            </div>
          </div>
        )}

        <div className="mt-20 flex flex-col items-center">
          <div className="w-20 h-[1px] bg-[var(--color-primary)]/20 mb-8" />
          <SecondaryButton
          aria-label="Load more posts"
            onClick={onLoadMore}
            disabled={loading || !hasMore}
            label={loading ? "Refreshing Inventory..." : !hasMore ? "End of Listing" : "View More Available Vans"}
          />
        </div>
      </div>
    </section>
  );
}