"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { diyProducts } from '../../DataUseInComp/DiyProducts';

export default function DIYComponentsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...new Set(diyProducts.map(p => p.category.trim()))];
  }, []);

  const filteredCategories = categories.filter(c => c !== "All");

  return (
    <main className="bg-white min-h-screen">

      {/* Hero Banner */}
      <section className="bbv-section-light py-20 px-6 text-center relative">
        <div className="bbv-dot-grid-light" />
        <div className="relative z-10">
          <p className="text-hover text-xs uppercase tracking-widest font-bold mb-4">
            Expertly Curated for Your Build
          </p>
          <h1 className="font-display text-primary uppercase tracking-wide text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
            DIY COMPONENTS
          </h1>
          <div className="bbv-divider mx-auto mb-8" />

          <div className="max-w-2xl mx-auto space-y-4 text-primary/60">
            <p className="text-sm leading-relaxed">
              Planning to convert your van yourself? You don't have to do it alone. From cabinets and showers
              to windows, seats, and electrical components, we've curated the best gear for your build.
              These are the same high-quality products we use in our own professional conversions—proven
              for vanlife durability.
            </p>
            <p className="text-sm leading-relaxed">
              Browse our recommendations below and shop directly through our trusted partners,
              <strong className="text-primary"> VanKea</strong> and <strong className="text-primary">VanPartsOutlet</strong>, to get your project started.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-20 bg-white border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-[11px] font-black uppercase tracking-[0.15em] rounded transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-hover text-primary"
                  : "text-primary/40 hover:text-primary/80 bg-primary/5 border border-primary/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {filteredCategories.map((cat) => {
          if (activeCategory !== "All" && activeCategory !== cat) return null;

          const productsInCategory = diyProducts.filter(p => p.category.trim() === cat);

          return (
            <section key={cat}>

              {/* Category Header */}
              <div className="flex items-center gap-4 mb-10">
                <div>
                  <p className="text-hover text-xs uppercase tracking-widest font-bold mb-1">
                    Collection
                  </p>
                  <h2 className="font-display text-primary uppercase tracking-wide text-2xl sm:text-3xl font-black">
                    {cat}
                  </h2>
                </div>
                <div className="flex-1 h-px ml-4 bg-primary/10" />
              </div>

              {/* Product Grid */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {productsInCategory.map((p) => (
                  <div
                    key={p.id}
                    className="bbv-card rounded-[8px] overflow-hidden flex flex-col group hover:border-hover/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative flex justify-center h-56 w-full overflow-hidden bg-primary/5">
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={250}
                        height={250}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {p.beforeSalePrice && (
                        <span className="absolute top-3 left-3 z-10 bg-hover text-primary text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-hover text-[9px] font-black uppercase tracking-[0.2em] mb-2">
                        {p.storeName}
                      </p>
                      <h4 className="text-sm font-bold text-primary leading-snug mb-3 line-clamp-2">
                        {p.name}
                      </h4>
                      <p className="text-xs text-primary/40 leading-relaxed mb-4 line-clamp-3 flex-1">
                        {p.description}
                      </p>

                      {/* Price Row */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-lg font-black text-hover">
                          {p.Price}
                        </span>
                        {p.beforeSalePrice && (
                          <span className="text-xs text-primary/30 line-through">
                            {p.beforeSalePrice}
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center bg-hover text-primary text-[10px] font-black uppercase tracking-[0.15em] py-3 rounded hover:brightness-110 transition-all duration-200"
                      >
                        Purchase at {p.storeName}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All CTA */}
              <div className="mt-10 flex justify-start">
                <a
                  href={`https://vanpartsoutlet.com/collections/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary/60 hover:text-primary text-[11px] font-black uppercase tracking-[0.15em] px-7 py-3 rounded transition-all duration-200 border-2 border-primary/10 hover:border-primary/25"
                >
                  View All {cat} at VanPartsOutlet
                  <span className="text-hover">→</span>
                </a>
              </div>

            </section>
          );
        })}
      </div>

    </main>
  );
}
