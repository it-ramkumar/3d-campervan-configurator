import React, { useState } from 'react';
import { ImageWithSkeleton } from "@/components/Common/Common";
export default function Detail({ setIsopen, detail }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // gallery is string[]; normalise legacy { url } objects from old data
  const gallery = (detail.gallery || []).map((item) =>
    typeof item === "string" ? item : item?.url
  ).filter(Boolean);
  const blocks = detail.blocks || []; // Dynamic blocks array

  console.log(detail);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-slate-900/40 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-0" onClick={() => setIsopen(false)} />

      <div className="relative w-full max-w-4xl bg-[#f8fafc] h-full shadow-2xl flex flex-col animate-slide-in">
        {/* Fixed Header */}
        <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 truncate max-w-md">
              {detail.van_listing?.title}
            </h2>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              ID: {detail._id?.slice(-6)} • {detail.category?.[0] || 'Van'}
            </p>
          </div>
          <button
            onClick={() => setIsopen(false)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">

          {/* Hero Gallery Section */}
          <div className="space-y-4">
            <div className="relative aspect-video bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              {detail.status === "sold" && (
                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  SOLD
                </div>
              )}
              <ImageWithSkeleton
                src={gallery[currentImageIndex] || "/images/blackLogo.webp"}
                alt="Main view"
                className="w-full h-full object-cover"
              />
              {gallery.length > 1 && (
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button onClick={() => setCurrentImageIndex(prev => prev === 0 ? gallery.length - 1 : prev - 1)} className="p-2 rounded-full bg-white/90 shadow-md pointer-events-auto hover:bg-white text-slate-800"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
                  <button onClick={() => setCurrentImageIndex(prev => prev === gallery.length - 1 ? 0 : prev + 1)} className="p-2 rounded-full bg-white/90 shadow-md pointer-events-auto hover:bg-white text-slate-800"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
                </div>
              )}
            </div>
            {/* Thumbnail strip */}
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {gallery.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex ? "border-blue-500" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={item} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-8">
              {/* Basic Description */}
              <section>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Description</h3>
                <p className="text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  {detail.van_listing?.description}
                </p>
              </section>

              {/* Dynamic Blocks Section */}
              {blocks.filter(b => b.is_active !== false).length > 0 && (
                <section className="space-y-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Full Details</h3>
                  <div className="space-y-6">
                    {[...blocks]
                      .filter(b => b.is_active !== false)
                      .sort((a, b) => a.order - b.order)
                      .map((block, idx) => (
                      <div key={block._id || idx}>

                        {/* HEADING */}
                        {block.block_type === "heading" && (
                          <div className="mt-4">
                            <h2 className="text-2xl font-bold text-slate-800">{block.title}</h2>
                            {block.subtitle && <p className="text-slate-500 mt-1">{block.subtitle}</p>}
                          </div>
                        )}

                        {/* SUBHEADING */}
                        {block.block_type === "subheading" && (
                          <h3 className="text-lg font-semibold text-slate-700 mt-2">{block.title}</h3>
                        )}

                        {/* PARAGRAPH */}
                        {block.block_type === "paragraph" && (
                          <p className="text-slate-600 leading-relaxed">{block.content}</p>
                        )}

                        {/* LIST */}
                        {block.block_type === "list" && (
                          <div>
                            {block.title && <h4 className="font-bold text-slate-800 mb-2">{block.title}</h4>}
                            <ul className="list-disc list-inside space-y-1 text-slate-600">
                              {(block.list_items || []).map((item, i) => (
                                <li key={i}>
                                  {item?.text}
                                  {item?.sub_items?.length > 0 && (
                                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                                      {item.sub_items.map((sub, si) => <li key={si}>{sub}</li>)}
                                    </ul>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* TABLE */}
                        {block.block_type === "table" && block.table_data && (
                          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                            {block.title && <div className="bg-slate-50 p-3 border-b font-bold text-slate-700">{block.title}</div>}
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-sm">
                                <thead className="bg-slate-100 text-slate-600 font-bold">
                                  <tr>{block.table_data.headers.map((h, i) => <th key={i} className="px-4 py-2 border-b">{h}</th>)}</tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                  {block.table_data.rows.map((row, ri) => (
                                    <tr key={ri} className="hover:bg-slate-50">
                                      {row.map((cell, ci) => <td key={ci} className="px-4 py-2 text-slate-600">{cell}</td>)}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* MEDIA */}
                        {block.block_type === "media" && (block.block_media || []).length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {block.block_media.map((m, mi) => (
                              <div key={mi} className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                {m.type === "image" && (
                                  <img src={m.url} alt={m.alt || ""} className="w-full h-48 object-cover" />
                                )}
                                {m.type === "video" && (
                                  <video src={m.url} controls poster={m.thumbnail} className="w-full h-48 object-cover" />
                                )}
                                {m.type === "iframe" && (
                                  <iframe src={m.url} title={m.alt || "embed"} className="w-full h-48 border-0" allowFullScreen />
                                )}
                                {m.type === "pdf" && (
                                  <a href={m.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-4 text-blue-600 font-medium hover:underline">
                                    <span>📄</span> {m.alt || "View PDF"}
                                  </a>
                                )}
                                {m.caption && <p className="text-xs text-slate-500 p-2 bg-slate-50">{m.caption}</p>}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* FEATURE-GRID */}
                        {block.block_type === "feature-grid" && (
                          <div>
                            {block.title && <h3 className="text-lg font-bold text-slate-800 mb-1">{block.title}</h3>}
                            {block.subtitle && <p className="text-sm text-slate-500 mb-3">{block.subtitle}</p>}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {(block.items || []).map((item, ii) => (
                                <div key={ii} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                                  {item.icon && <span className="text-2xl shrink-0">{item.icon}</span>}
                                  <div>
                                    {item.title && <p className="font-semibold text-slate-800 text-sm">{item.title}</p>}
                                    {item.description && <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* STATS */}
                        {block.block_type === "stats" && (
                          <div>
                            {block.title && <h3 className="text-lg font-bold text-slate-800 mb-1">{block.title}</h3>}
                            {block.subtitle && <p className="text-sm text-slate-500 mb-3">{block.subtitle}</p>}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {(block.items || []).map((item, ii) => (
                                <div key={ii} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
                                  <p className="text-2xl font-black text-slate-900">{item.value}</p>
                                  <p className="text-xs font-semibold text-slate-600 mt-1">{item.title}</p>
                                  {item.description && <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* QUOTE */}
                        {block.block_type === "quote" && (
                          <blockquote className="border-l-4 border-slate-300 pl-4 py-1">
                            <p className="text-slate-600 italic leading-relaxed">"{block.content}"</p>
                            {block.title && <footer className="text-xs text-slate-400 mt-2 font-semibold">— {block.title}</footer>}
                          </blockquote>
                        )}

                        {/* CTA */}
                        {block.block_type === "cta" && (
                          <div className="p-6 bg-slate-800 text-white rounded-xl text-center space-y-3">
                            {block.title && <h3 className="text-xl font-bold">{block.title}</h3>}
                            {block.subtitle && <p className="text-slate-300 text-sm">{block.subtitle}</p>}
                            {block.content && <p className="text-slate-400 text-sm">{block.content}</p>}
                            {block.button?.label && (
                              <a
                                href={block.button.url || "#"}
                                target={block.button.target === "blank" ? "_blank" : "_self"}
                                rel="noreferrer"
                                className="inline-block mt-2 px-6 py-2 bg-white text-slate-800 font-bold rounded-lg hover:bg-slate-100 transition-colors"
                              >
                                {block.button.label}
                              </a>
                            )}
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Detailed Features (Old Section) */}
              {detail.detailed_features?.length > 0 && (
                <section>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Features Overview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {detail.detailed_features.map((feat, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-slate-800 text-sm mb-2">{feat.category}</h4>
                        <ul className="space-y-1">
                          {feat.items.map((item, i) => (
                            <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 sticky top-20">
                <div className="border-b border-slate-100 pb-3">
                  <p className="text-xs text-slate-500 font-medium">Listing Price</p>
                  {detail.van_listing?.sale_price ? (
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-black text-slate-900">{detail.formatted_sale_price}</p>
                      <p className="text-sm line-through text-slate-400">{detail.formatted_price}</p>
                    </div>
                  ) : (
                    <p className="text-2xl font-black text-slate-900">{detail.formatted_price}</p>
                  )}
                </div>
                <div className="space-y-3">
                  <SpecItem label="Drivetrain" value={detail.van_listing?.specifications?.drivetrain} />
                  <SpecItem label="Wheelbase" value={detail.van_listing?.specifications?.wheelbase} />
                  <SpecItem label="Capacity" value={`${detail.van_listing?.specifications?.capacity?.sits} Sits / ${detail.van_listing?.specifications?.capacity?.sleeps} Sleeps`} />
                  <SpecItem label="Updated" value={formatDate(detail.updatedAt)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SpecItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-slate-500">{label}</span>
    <span className="font-semibold text-slate-800 text-right ml-2">{value || 'N/A'}</span>
  </div>
);