"use client";
import { useCallback, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

/**
 * Keeps a "page" query param in sync with the URL.
 * Pass a resetKey (e.g. a search term or section id) that, when it changes,
 * resets the page back to 1.
 */
export function useUrlPage(resetKey) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevResetKey = useRef(resetKey);

  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);

  const setPage = useCallback(
    (next) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next <= 1) params.delete("page");
      else params.set("page", String(next));
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    if (prevResetKey.current !== resetKey) {
      prevResetKey.current = resetKey;
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  return [page, setPage];
}
