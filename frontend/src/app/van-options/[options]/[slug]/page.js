import { notFound } from "next/navigation";
import OptionDetail from "@/components/Options/OptionDetail";
import { PAGE_CONFIG, fetchOptionItems } from "@/components/Options/optionsConfig";
import { getItemTitle, getItemText } from "@/components/Options/optionBlocks";

const BASE_URL = "https://www.bigbearvans.com";

// resolves the listing config + the item for this URL, or null
async function getOption(params) {
  const { options, slug } = await params;
  const current = PAGE_CONFIG[options];
  if (!current) return null;

  const items = await fetchOptionItems(current.api);
  const item = items.find((i) => i.slug === slug);
  if (!item) return null;

  return { options, current, items, item };
}

// same subcategory first, then the rest of the category
function getRelated(items, item, limit = 4) {
  const sameId = (a, b) => a && b && (a._id || a) === (b._id || b);
  const others = items.filter((i) => i._id !== item._id && sameId(i.categoryId, item.categoryId));
  const sameSub = others.filter((i) => sameId(i.subCategoryId, item.subCategoryId));
  const rest = others.filter((i) => !sameSub.includes(i));
  return [...sameSub, ...rest].slice(0, limit);
}

export async function generateMetadata({ params }) {
  const data = await getOption(params);
  if (!data) return { title: "Option not found | Big Bear Vans", robots: { index: false, follow: false } };

  const { options, current, item } = data;
  const title = `${getItemTitle(item)} | ${current.label} | Big Bear Vans`;
  const description = getItemText(item) || current.desc;
  const canonical = `${BASE_URL}/van-options/${options}/${item.slug}`;
  const ogImage = item.images?.[0] || current.heroImage || "/images/blackLogo.webp";

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Big Bear Vans",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }) {
  const data = await getOption(params);
  if (!data) notFound();

  const { options, current, items, item } = data;
  const basePath = `/van-options/${options}`;
  const title = getItemTitle(item);
  const url = `${BASE_URL}${basePath}/${item.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}/#webpage`,
        url,
        name: title,
        description: getItemText(item) || current.desc,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: current.label, item: `${BASE_URL}${basePath}` },
            { "@type": "ListItem", position: 3, name: title, item: url },
          ],
        },
      },
      {
        "@type": "Product",
        name: title,
        url,
        image: item.images?.length ? item.images : [`${BASE_URL}/images/blackLogo.webp`],
        description: getItemText(item, 500) || current.desc,
        category: [item.categoryId?.title, item.subCategoryId?.title].filter(Boolean).join(" > ") || current.label,
        brand: { "@type": "Brand", name: "Big Bear Vans" },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OptionDetail
        item={item}
        basePath={basePath}
        listingLabel={current.label}
        related={getRelated(items, item)}
      />
    </>
  );
}
