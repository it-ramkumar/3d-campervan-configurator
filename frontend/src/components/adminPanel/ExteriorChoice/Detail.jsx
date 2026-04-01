"use client";
import Image from "next/image";
import React from "react";

export default function DetailModal({ item, onClose }) {
  if (!item) return null;
// console.log(item,"item")
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      {/* Modal Container - Matching your #f8fafc theme palette */}
      <div className="bg-[#f8fafc] w-full max-w-3xl max-h-[90vh] rounded-lg shadow-2xl flex flex-col overflow-hidden border border-slate-200">

        {/* Fixed Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{item.title}</h2>
            <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider">
              {item.subCategoryId?.title} • {item.slug}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">

          {/* Hero Image */}
          {item.images?.[0] && (
            <div className="rounded-md overflow-hidden border border-slate-200 shadow-sm">
              <Image
                src={item.images[0]}
                alt={item.title}
                className="w-full h-64 object-cover"
                width={400}
                height={300}

              />
            </div>
          )}

          {/* Description Block */}
          <section>
            <p className="text-slate-600 leading-relaxed italic border-l-4 border-blue-500 pl-4">
              "{item.description}"
            </p>
          </section>

          {/* Dynamic Blocks Rendering */}
          <div className="space-y-6">
            {item.blocks?.map((block, idx) => {
              switch (block.block_type) {
                case "heading":
                  return <h3 key={idx} className="text-lg font-semibold text-slate-800 border-b pb-2">{block.title}</h3>;

                case "subheading":
                  return <h4 key={idx} className="text-md font-medium text-slate-700">{block.title}</h4>;

                case "paragraph":
                  return <p key={idx} className="text-slate-600 text-sm leading-relaxed">{block.content}</p>;

                case "list":
                  return (
                    <div key={idx} className="bg-white p-4 rounded-md border border-slate-100 shadow-sm">
                      <span className="text-xs font-bold text-slate-400 uppercase">{block.title}</span>
                      <ul className="mt-3 space-y-3">
                        {block.list_items.map((li, i) => (
                          <li key={i} className="text-sm text-slate-700">
                            <div className="flex items-start gap-2">
                              <span className="text-blue-500">•</span>
                              <span>{li.text}</span>
                            </div>
                            {li.sub_items?.length > 0 && (
                              <ul className="ml-6 mt-1 space-y-1">
                                {li.sub_items.map((sub, j) => (
                                  <li key={j} className="text-xs text-slate-500 list-circle">{sub}</li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );

                case "table":
                  return (
                    <div key={idx} className="overflow-hidden border border-slate-200 rounded-md">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-100 text-slate-700 font-medium">
                          <tr>
                            {block.table_data.headers.map((h, i) => (
                              <th key={i} className="px-4 py-2">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {block.table_data.rows.map((row, i) => (
                            <tr key={i} className="bg-white hover:bg-slate-50 transition-colors">
                              {row.map((cell, j) => (
                                <td key={j} className="px-4 py-2 text-slate-600">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-white flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            Close
          </button>
          <a
            href={item.link}
            target="_blank"
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            External Link
          </a>
        </div>
      </div>
    </div>
  );
}