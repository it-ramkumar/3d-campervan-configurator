import React, { useState } from 'react';
import { ImageWithSkeleton } from "@/components/Common/Common";
export default function Detail({ setIsopen, detail }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const gallery = detail.gallery || [];
  const blocks = detail.blocks || []; // Dynamic blocks array

  // console.log(detail);

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
                src={gallery[currentImageIndex] || "/images/blackLogo.jpg"}
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

              {/* ✅ Dynamic Blocks Section */}
              {blocks.length > 0 && (
                <section className="space-y-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Full Details</h3>
                  <div className="space-y-6">
                    {blocks.sort((a, b) => a.order - b.order).map((block, idx) => (
                      <div key={block._id || idx} className="animate-fade-in">

                        {block.block_type === 'heading' && (
                          <h2 className="text-2xl font-bold text-slate-800 mt-4">{block.title}</h2>
                        )}

                        {block.block_type === 'subheading' && (
                          <h3 className="text-lg font-semibold text-slate-700 mt-2">{block.title}</h3>
                        )}

                        {block.block_type === 'paragraph' && (
                          <p className="text-slate-600 leading-relaxed mt-1">{block.content}</p>
                        )}

                       {block.block_type === "list" && (
  <div className="mt-2">
    {block.title && (
      <h4 className="font-bold text-slate-800 mb-2">
        {block.title}
      </h4>
    )}

    <ul className="list-disc list-inside space-y-1 text-slate-600">
      {(block.list_items || []).map((item, i) => (
        <li key={i}>
          {item?.text}

          {/* Sub Items */}
          {(item?.sub_items?.length > 0) && (
            <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
              {item.sub_items.map((sub, sIndex) => (
                <li key={sIndex}>{sub}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </div>
)}


                        {block.block_type === 'table' && block.table_data && (
                          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                            {block.title && <div className="bg-slate-50 p-3 border-b font-bold text-slate-700">{block.title}</div>}
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-sm">
                                <thead className="bg-slate-100 text-slate-600 font-bold">
                                  <tr>
                                    {block.table_data.headers.map((h, i) => (
                                      <th key={i} className="px-4 py-2 border-b">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                  {block.table_data.rows.map((row, ri) => (
                                    <tr key={ri} className="hover:bg-slate-50 transition-colors">
                                      {row.map((cell, ci) => (
                                        <td key={ci} className="px-4 py-2 text-slate-600">{cell}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
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
                  <p className="text-2xl font-black text-slate-900">{detail.formatted_price}</p>
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