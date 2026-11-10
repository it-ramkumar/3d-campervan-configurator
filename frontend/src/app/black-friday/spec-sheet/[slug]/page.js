import { notFound } from "next/navigation";
import Link from "next/link";
import { hasSale } from "@/utils/salePrice";
import { SITE_URL } from "@/schema/business";
import PrintButton from "@/components/BlackFriday/PrintButton";

// Printable spec sheet for one van (/black-friday/spec-sheet/<slug>).
// Built from the van's "detailed_features" in the dashboard, so editing the van
// there updates this sheet. Linked from the Black Friday spec-sheet form and the
// CRM email that sends it. Not indexed: the van page is the SEO page.

export const dynamic = "force-dynamic";

const PHONE = "951-441-9719";
const PHONE_HREF = "tel:+19514419719";
const NON_IMAGE_EXT = /\.(mp4|mov|webm|m4v|pdf|glb|gltf)(\?|#|$)/i;
const money = (n) => `$${Number(n).toLocaleString("en-US")}`;

async function getVan(slug) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/van/${encodeURIComponent(slug)}`, { cache: "no-store" })
    .then((r) => r.json())
    .catch(() => null);
  return data?.van || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const van = await getVan(slug);
  const title = van?.van_listing?.title ? `${van.van_listing.title} Spec Sheet | Big Bear Vans` : "Spec Sheet | Big Bear Vans";
  return {
    title,
    robots: { index: false, follow: false },
    alternates: { canonical: `${SITE_URL}/camper-vans-for-sale/${slug}` },
  };
}

export default async function SpecSheetPage({ params, searchParams }) {
  const { slug } = await params;
  const sp = (await searchParams) || {};
  const van = await getVan(slug);
  if (!van?.van_listing) return notFound();

  const l = van.van_listing;
  const sale = hasSale(l);
  const price = Number(l.price);
  const salePrice = Number(l.sale_price);
  const specs = l.specifications || {};
  const features = (Array.isArray(van.detailed_features) ? van.detailed_features : []).filter(
    (c) => c?.category && Array.isArray(c.items) && c.items.length
  );
  const photos = (Array.isArray(van.gallery) ? van.gallery : [])
    .filter((src) => typeof src === "string" && src.trim() && !NON_IMAGE_EXT.test(src))
    .slice(0, 3);
  const quick = [
    specs.make_model && ["Chassis", specs.make_model + (specs.wheelbase ? ` ${specs.wheelbase}"` : "")],
    specs.drivetrain && ["Drivetrain", specs.drivetrain],
    l.roof && ["Roof", l.roof],
    specs.engine && ["Engine", specs.engine],
    specs.transmission && ["Transmission", specs.transmission],
    specs.capacity?.sleeps && ["Sleeps", specs.capacity.sleeps],
  ].filter(Boolean);
  const vanPage = `/camper-vans-for-sale/${slug}`;

  return (
    <main className="bg-secondary py-8 print:bg-white print:py-0">
      <style>{`@media print { header, nav, footer, .no-print { display: none !important; } @page { margin: 12mm; } }`}</style>
      <div className="mx-auto max-w-4xl px-4">
        {sp.sent && (
          <p className="no-print mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
            Here is your spec sheet. We also emailed you a copy. Want to see this van live? Book a FaceTime walkthrough below.
          </p>
        )}

        <article className="overflow-hidden rounded-2xl bg-white shadow-xl print:rounded-none print:shadow-none">
          <header className="flex flex-wrap items-start justify-between gap-4 border-b border-primary/10 p-6 md:p-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-hover">Big Bear Vans · Spec sheet</p>
              <h1 className="mt-2 text-3xl font-black text-primary md:text-4xl">{l.title}</h1>
              {l.subtitle && <p className="mt-2 max-w-2xl text-primary/70">{l.subtitle}</p>}
            </div>
            <div className="text-right">
              {sale ? (
                <>
                  <p className="text-xs font-black uppercase tracking-widest text-[#E11D48]">Black Friday price</p>
                  <p className="text-3xl font-black text-primary">{money(salePrice)}</p>
                  <p className="text-sm text-primary/50">
                    <span className="line-through">{money(price)}</span> · save {money(price - salePrice)}
                  </p>
                  <p className="mt-1 text-xs text-primary/60">Ends Nov 28 (Pacific)</p>
                </>
              ) : price > 99 ? (
                <p className="text-3xl font-black text-primary">{money(price)}</p>
              ) : null}
            </div>
          </header>

          {photos.length > 0 && (
            <div className="grid grid-cols-3 gap-1 bg-primary/5">
              {photos.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt={`${l.title} photo ${i + 1}`} className="aspect-[4/3] w-full object-cover" />
              ))}
            </div>
          )}

          {quick.length > 0 && (
            <dl className="grid grid-cols-2 gap-px border-b border-primary/10 bg-primary/10 md:grid-cols-3">
              {quick.map(([k, v]) => (
                <div key={k} className="bg-white px-5 py-3">
                  <dt className="text-[11px] font-bold uppercase tracking-widest text-primary/50">{k}</dt>
                  <dd className="font-bold text-primary">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="grid gap-x-10 gap-y-6 p-6 md:grid-cols-2 md:p-8 print:grid-cols-2">
            {features.length ? (
              features.map((c) => (
                <section key={c.category} className="break-inside-avoid">
                  <h2 className="border-b-2 border-hover pb-1 text-sm font-black uppercase tracking-widest text-primary">{c.category}</h2>
                  <ul className="mt-2 space-y-1 text-sm text-primary/85">
                    {c.items.map((it) => (
                      <li key={it} className="flex gap-2">
                        <span className="text-hover" aria-hidden="true">✓</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))
            ) : (
              <p className="text-primary/70">
                The full equipment list for this van is on its page. <Link href={vanPage} className="font-bold underline">See photos and details</Link>.
              </p>
            )}
          </div>

          {typeof van.delivery_date === "string" && van.delivery_date && (
            <p className="mx-6 mb-6 rounded-lg bg-secondary px-4 py-3 text-sm font-semibold text-primary/80 md:mx-8">{van.delivery_date}</p>
          )}

          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-primary/10 bg-primary p-6 text-white md:px-8">
            <div className="text-sm">
              <p className="font-black">Big Bear Vans · Built in Big Bear, CA</p>
              <p className="text-white/80">
                Call or text <a href={PHONE_HREF} className="font-bold underline">{PHONE}</a> · bigbearvans.com
              </p>
            </div>
            <p className="text-xs text-white/70">A $5,000 deposit holds the Black Friday price. Delivery across the US.</p>
          </footer>
        </article>

        <div className="no-print mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/black-friday?van=${encodeURIComponent(slug)}#hold-price`}
            className="flex-1 rounded-full bg-gradient-to-r from-[#E11D48] via-[#F97316] to-[#FACC15] px-6 py-4 text-center text-sm font-black uppercase tracking-wider text-white shadow-lg"
          >
            Book a FaceTime walkthrough
          </Link>
          <PrintButton />
          <Link
            href={vanPage}
            className="rounded-full border-2 border-primary/15 bg-white px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-primary"
          >
            All photos
          </Link>
        </div>
      </div>
    </main>
  );
}
