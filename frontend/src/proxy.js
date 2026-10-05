import { NextResponse } from "next/server";

// The root loading.jsx makes every page stream, and once streaming starts a
// notFound() in the page can no longer change the 200 status. So unknown van
// slugs are checked here, before rendering, to return a real 404.
const DETAIL_ROUTES = {
  "camper-vans-for-sale": "van",
  "van-layouts": "portfolio",
};

export async function proxy(request) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  const endpoint = DETAIL_ROUTES[section];
  if (!endpoint || !slug) return NextResponse.next();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/${endpoint}/${encodeURIComponent(slug)}`);
    // Only a confirmed 404 counts; an API outage should not 404 real vans
    if (res.status === 404) {
      return NextResponse.rewrite(new URL("/_van-not-found", request.url), { status: 404 });
    }
  } catch {}

  return NextResponse.next();
}

export const config = {
  matcher: ["/camper-vans-for-sale/:slug", "/van-layouts/:slug"],
};
