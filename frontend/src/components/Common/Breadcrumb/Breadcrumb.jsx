"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ customItems }) => {

  const pathArray =
    typeof window !== "undefined"
      ? window.location.pathname.split("/").filter(Boolean)
      : [];

  const generateBreadcrumbs = () => {
    if (customItems) return customItems;

    return pathArray.map((segment, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      const name = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      return { name, href };
    });
  };

  const breadcrumbs = [
    { name: "Home", href: "/" },
    ...generateBreadcrumbs(),
  ];

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center text-sm text-[#001F3D]/60">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index !== breadcrumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="hover:text-[#ED985F] transition-colors"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-[#001F3D] font-semibold">
                  {crumb.name}
                </span>
              )}

              {index !== breadcrumbs.length - 1 && (
                <ChevronRight size={16} className="mx-2" />
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;