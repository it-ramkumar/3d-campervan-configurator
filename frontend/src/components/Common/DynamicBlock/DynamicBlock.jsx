"use client";
import React from "react";

const BLOCK_TYPES = [
  "heading", "subheading", "paragraph", "list", "table",
  "media", "feature-grid", "stats", "quote", "cta",
];
const LAYOUTS    = ["left", "right", "center", "full", "grid"];
const MEDIA_TYPES = ["image", "video", "pdf", "iframe"];

/* colour badge per block type */
const TYPE_COLOR = {
  heading:        "bg-purple-100 text-purple-700",
  subheading:     "bg-purple-50  text-purple-600",
  paragraph:      "bg-blue-50    text-blue-700",
  list:           "bg-green-50   text-green-700",
  table:          "bg-yellow-50  text-yellow-700",
  media:          "bg-pink-50    text-pink-700",
  "feature-grid": "bg-orange-50  text-orange-700",
  stats:          "bg-teal-50    text-teal-700",
  quote:          "bg-gray-100   text-gray-700",
  cta:            "bg-red-50     text-red-700",
};

/* blocks whose layout field makes no sense */
const NO_LAYOUT = ["list", "table", "cta"];

/* default shape per type */
const defaultBlock = (type, order) => {
  const base = { block_type: type, order, is_active: true };
  switch (type) {
    case "heading":       return { ...base, title: "", subtitle: "", layout: "left" };
    case "subheading":    return { ...base, title: "",              layout: "left" };
    case "paragraph":     return { ...base, content: "",            layout: "left" };
    case "list":          return { ...base, title: "", list_items: [] };
    case "table":         return { ...base, title: "", table_data: { headers: ["Column 1"], rows: [[""]] } };
    case "media":         return { ...base, block_media: [],        layout: "center" };
    case "feature-grid":  return { ...base, title: "", subtitle: "", items: [], layout: "grid" };
    case "stats":         return { ...base, title: "", subtitle: "", items: [], layout: "grid" };
    case "quote":         return { ...base, content: "", title: "", layout: "center" };
    case "cta":           return { ...base, title: "", subtitle: "", content: "",
                                   button: { label: "", url: "", target: "self" } };
    default:              return base;
  }
};

/* ─────────────────────────────────────────────────────────────────────────── */

const DynamicBlocks = ({ blocks, setBlocks }) => {

  /* ── generic ──────────────────────────────────────────────────────────── */
  const addBlock   = (type) => setBlocks(prev => [...prev, defaultBlock(type, prev.length)]);
  const removeBlock = (i)  => setBlocks(prev => prev.filter((_, idx) => idx !== i));

  const update = (i, field, value) =>
    setBlocks(prev => prev.map((b, idx) => idx === i ? { ...b, [field]: value } : b));

  /* ── list ─────────────────────────────────────────────────────────────── */
  const listMutate = (bi, fn) =>
    setBlocks(prev => prev.map((b, i) => {
      if (i !== bi) return b;
      const items = JSON.parse(JSON.stringify(b.list_items || []));
      fn(items);
      return { ...b, list_items: items };
    }));

  const addListItem    = (bi)         => listMutate(bi, it => it.push({ text: "", sub_items: [] }));
  const removeListItem = (bi, ii)     => listMutate(bi, it => it.splice(ii, 1));
  const setListText    = (bi, ii, v)  => listMutate(bi, it => { it[ii].text = v; });
  const addSubItem     = (bi, ii)     => listMutate(bi, it => it[ii].sub_items.push(""));
  const removeSubItem  = (bi, ii, si) => listMutate(bi, it => it[ii].sub_items.splice(si, 1));
  const setSubItem     = (bi, ii, si, v) => listMutate(bi, it => { it[ii].sub_items[si] = v; });

  /* ── table ────────────────────────────────────────────────────────────── */
  const tableMutate = (bi, fn) =>
    setBlocks(prev => prev.map((b, i) => {
      if (i !== bi) return b;
      const td = JSON.parse(JSON.stringify(b.table_data));
      fn(td);
      return { ...b, table_data: td };
    }));

  /* ── items (feature-grid, stats) ─────────────────────────────────────── */
  const itemMutate = (bi, fn) =>
    setBlocks(prev => prev.map((b, i) => {
      if (i !== bi) return b;
      const items = JSON.parse(JSON.stringify(b.items || []));
      fn(items);
      return { ...b, items };
    }));

  const addItem    = (bi)          => itemMutate(bi, it => it.push({ title: "", description: "", value: "", icon: "", media: "" }));
  const removeItem = (bi, ii)      => itemMutate(bi, it => it.splice(ii, 1));
  const setItem    = (bi, ii, f, v) => itemMutate(bi, it => { it[ii][f] = v; });

  /* ── block_media ──────────────────────────────────────────────────────── */
  const mediaMutate = (bi, fn) =>
    setBlocks(prev => prev.map((b, i) => {
      if (i !== bi) return b;
      const bm = JSON.parse(JSON.stringify(b.block_media || []));
      fn(bm);
      return { ...b, block_media: bm };
    }));

  const addMedia    = (bi, type = "image") => mediaMutate(bi, m => m.push({ type, url: "", alt: "", caption: "" }));
  const removeMedia = (bi, mi)      => mediaMutate(bi, m => m.splice(mi, 1));
  const setMedia    = (bi, mi, f, v) => mediaMutate(bi, m => { m[mi][f] = v; });

  /* ─────────────────────────────────────────────────────────────────────── */

  return (
    <div className="space-y-6">

      {/* ── Add-block buttons ── */}
      <div className="flex flex-wrap gap-2">
        {BLOCK_TYPES.map(type => (
          <button
            key={type}
            type="button"
            onClick={() => addBlock(type)}
            className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm uppercase tracking-wide transition-all"
          >
            + {type}
          </button>
        ))}
      </div>

      {/* ── Block list ── */}
      <div className="space-y-4">
        {blocks.map((block, bi) => (
          <div
            key={bi}
            className={`relative border rounded-lg p-5 bg-white shadow-sm transition-opacity ${!block.is_active ? "opacity-50" : ""}`}
          >

            {/* Block header row */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">

                {/* Type badge */}
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${TYPE_COLOR[block.block_type] || "bg-gray-100 text-gray-700"}`}>
                  {block.block_type}
                </span>

                {/* Layout select */}
                {!NO_LAYOUT.includes(block.block_type) && (
                  <select
                    value={block.layout || "left"}
                    onChange={(e) => update(bi, "layout", e.target.value)}
                    className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-blue-400"
                  >
                    {LAYOUTS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                )}

                {/* is_active toggle */}
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <div
                    role="switch"
                    onClick={() => update(bi, "is_active", !block.is_active)}
                    className={`relative w-8 h-4 rounded-full transition-colors cursor-pointer ${block.is_active ? "bg-green-500" : "bg-gray-300"}`}
                  >
                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-all ${block.is_active ? "left-4" : "left-0.5"}`} />
                  </div>
                  <span className="text-[10px] text-gray-500">{block.is_active ? "Active" : "Hidden"}</span>
                </label>
              </div>

              {/* Remove block */}
              <button
                type="button"
                onClick={() => removeBlock(bi)}
                className="text-gray-400 hover:text-red-500 transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>

            {/* ══ HEADING ══ */}
            {block.block_type === "heading" && (
              <div className="space-y-2">
                <input
                  type="text" placeholder="Heading text"
                  value={block.title || ""}
                  onChange={(e) => update(bi, "title", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400 text-lg font-bold"
                />
                <input
                  type="text" placeholder="Subtitle (optional)"
                  value={block.subtitle || ""}
                  onChange={(e) => update(bi, "subtitle", e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
            )}

            {/* ══ SUBHEADING ══ */}
            {block.block_type === "subheading" && (
              <input
                type="text" placeholder="Subheading text"
                value={block.title || ""}
                onChange={(e) => update(bi, "title", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400 font-semibold"
              />
            )}

            {/* ══ PARAGRAPH ══ */}
            {block.block_type === "paragraph" && (
              <textarea
                placeholder="Paragraph content..."
                value={block.content || ""}
                onChange={(e) => update(bi, "content", e.target.value)}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
              />
            )}

            {/* ══ LIST ══ */}
            {block.block_type === "list" && (
              <div className="space-y-3">
                <input
                  type="text" placeholder="List title (optional)"
                  value={block.title || ""}
                  onChange={(e) => update(bi, "title", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                />
                <div className="space-y-3 border-l-2 border-blue-100 pl-4">
                  {(block.list_items || []).map((item, ii) => (
                    <div key={ii} className="space-y-2 p-2 bg-gray-50 rounded">
                      <div className="flex gap-2 items-center">
                        <span className="text-blue-500 font-bold text-sm shrink-0">{ii + 1}.</span>
                        <input
                          type="text" placeholder={`Item ${ii + 1}`}
                          value={item?.text || ""}
                          onChange={(e) => setListText(bi, ii, e.target.value)}
                          className="flex-1 p-2 border border-gray-200 rounded text-sm focus:outline-none"
                        />
                        <button type="button" onClick={() => removeListItem(bi, ii)} className="text-red-400 hover:text-red-600 px-1">×</button>
                      </div>
                      <div className="ml-8 space-y-1.5">
                        {(item?.sub_items || []).map((sub, si) => (
                          <div key={si} className="flex gap-2 items-center">
                            <span className="text-gray-400 shrink-0">└</span>
                            <input
                              type="text" placeholder="Sub-item..."
                              value={sub || ""}
                              onChange={(e) => setSubItem(bi, ii, si, e.target.value)}
                              className="flex-1 p-1.5 border border-gray-200 rounded text-xs focus:outline-none"
                            />
                            <button type="button" onClick={() => removeSubItem(bi, ii, si)} className="text-gray-400 hover:text-red-400">−</button>
                          </div>
                        ))}
                        <button type="button" onClick={() => addSubItem(bi, ii)} className="text-[10px] font-bold text-gray-500 hover:text-blue-500 uppercase tracking-wider">
                          + Sub-item
                        </button>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addListItem(bi)} className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded hover:bg-blue-100">
                    + Add Item
                  </button>
                </div>
              </div>
            )}

            {/* ══ TABLE ══ */}
            {block.block_type === "table" && block.table_data && (
              <div className="space-y-3">
                <input
                  type="text" placeholder="Table title (optional)"
                  value={block.title || ""}
                  onChange={(e) => update(bi, "title", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                />
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr>
                        {block.table_data.headers.map((h, hi) => (
                          <th key={hi} className="border border-gray-200 p-2 bg-gray-50">
                            <input
                              type="text" value={h}
                              onChange={(e) => tableMutate(bi, td => { td.headers[hi] = e.target.value; })}
                              className="w-full text-xs font-bold bg-transparent focus:outline-none text-center"
                            />
                          </th>
                        ))}
                        <th className="border border-gray-200 p-2 bg-gray-50 w-10">
                          <button type="button"
                            onClick={() => tableMutate(bi, td => { td.headers.push(`Col ${td.headers.length + 1}`); td.rows = td.rows.map(r => [...r, ""]); })}
                            className="text-blue-600 font-bold"
                          >+</button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {block.table_data.rows.map((row, ri) => (
                        <tr key={ri}>
                          {row.map((cell, ci) => (
                            <td key={ci} className="border border-gray-200 p-2">
                              <input
                                type="text" value={cell}
                                onChange={(e) => tableMutate(bi, td => { td.rows[ri][ci] = e.target.value; })}
                                className="w-full text-sm focus:outline-none"
                              />
                            </td>
                          ))}
                          <td className="border border-gray-200 p-2 text-center">
                            <button type="button" onClick={() => tableMutate(bi, td => { td.rows.splice(ri, 1); })} className="text-red-400">×</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button type="button"
                    onClick={() => tableMutate(bi, td => { td.rows.push(new Array(td.headers.length).fill("")); })}
                    className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    + Add Row
                  </button>
                </div>
              </div>
            )}

            {/* ══ MEDIA ══ */}
            {block.block_type === "media" && (
              <div className="space-y-3">
                {(block.block_media || []).map((m, mi) => (
                  <div key={mi} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <select
                        value={m.type || "image"}
                        onChange={(e) => setMedia(bi, mi, "type", e.target.value)}
                        className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none"
                      >
                        {MEDIA_TYPES.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                      </select>
                      <button type="button" onClick={() => removeMedia(bi, mi)} className="text-red-400 hover:text-red-600 text-lg leading-none">×</button>
                    </div>
                    <input
                      type="text" placeholder="URL *"
                      value={m.url || ""}
                      onChange={(e) => setMedia(bi, mi, "url", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-400"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Alt text"
                        value={m.alt || ""}
                        onChange={(e) => setMedia(bi, mi, "alt", e.target.value)}
                        className="p-2 border border-gray-200 rounded text-xs focus:outline-none"
                      />
                      <input type="text" placeholder="Caption"
                        value={m.caption || ""}
                        onChange={(e) => setMedia(bi, mi, "caption", e.target.value)}
                        className="p-2 border border-gray-200 rounded text-xs focus:outline-none"
                      />
                    </div>
                    {(m.type === "video" || m.type === "iframe") && (
                      <input type="text" placeholder="Thumbnail URL (optional)"
                        value={m.thumbnail || ""}
                        onChange={(e) => setMedia(bi, mi, "thumbnail", e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded text-xs focus:outline-none"
                      />
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addMedia(bi)} className="text-sm font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded hover:bg-pink-100">
                  + Add Media Item
                </button>
              </div>
            )}

            {/* ══ FEATURE-GRID ══ */}
            {block.block_type === "feature-grid" && (
              <div className="space-y-4">
                <input type="text" placeholder="Section title"
                  value={block.title || ""}
                  onChange={(e) => update(bi, "title", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                />
                <input type="text" placeholder="Subtitle (optional)"
                  value={block.subtitle || ""}
                  onChange={(e) => update(bi, "subtitle", e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded text-sm focus:outline-none"
                />

                {/* Feature items */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Features (text side)</p>
                  {(block.items || []).map((item, ii) => (
                    <div key={ii} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" placeholder="Title"
                          value={item.title || ""}
                          onChange={(e) => setItem(bi, ii, "title", e.target.value)}
                          className="p-2 border border-gray-200 rounded text-sm focus:outline-none"
                        />
                        <input type="text" placeholder="Icon (emoji)"
                          value={item.icon || ""}
                          onChange={(e) => setItem(bi, ii, "icon", e.target.value)}
                          className="p-2 border border-gray-200 rounded text-sm focus:outline-none"
                        />
                        <input type="text" placeholder="Description"
                          value={item.description || ""}
                          onChange={(e) => setItem(bi, ii, "description", e.target.value)}
                          className="col-span-2 p-2 border border-gray-200 rounded text-sm focus:outline-none"
                        />
                        <input type="text" placeholder="Value (e.g. 300W)"
                          value={item.value || ""}
                          onChange={(e) => setItem(bi, ii, "value", e.target.value)}
                          className="p-2 border border-gray-200 rounded text-xs focus:outline-none"
                        />
                        <input type="text" placeholder="Image URL (right-side image)"
                          value={item.media || ""}
                          onChange={(e) => setItem(bi, ii, "media", e.target.value)}
                          className="p-2 border border-gray-200 rounded text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button type="button" onClick={() => removeItem(bi, ii)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addItem(bi)} className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded hover:bg-orange-100">
                    + Add Feature
                  </button>
                </div>

                {/* Extra images (block_media) */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Extra Images (shown alongside or after features)</p>
                  {(block.block_media || []).map((m, mi) => (
                    <div key={mi} className="flex gap-2 items-center p-2 bg-gray-50 rounded border border-gray-200">
                      <input type="text" placeholder="Image URL"
                        value={m.url || ""}
                        onChange={(e) => setMedia(bi, mi, "url", e.target.value)}
                        className="flex-1 p-2 border border-gray-200 rounded text-xs focus:outline-none"
                      />
                      <input type="text" placeholder="Alt text"
                        value={m.alt || ""}
                        onChange={(e) => setMedia(bi, mi, "alt", e.target.value)}
                        className="w-28 p-2 border border-gray-200 rounded text-xs focus:outline-none"
                      />
                      <button type="button" onClick={() => removeMedia(bi, mi)} className="text-red-400 hover:text-red-600 text-lg leading-none px-1">×</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addMedia(bi)} className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded hover:bg-pink-100">
                    + Add Image
                  </button>
                </div>
              </div>
            )}

            {/* ══ STATS ══ */}
            {block.block_type === "stats" && (
              <div className="space-y-3">
                <input type="text" placeholder="Section title"
                  value={block.title || ""}
                  onChange={(e) => update(bi, "title", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                />
                <input type="text" placeholder="Subtitle (optional)"
                  value={block.subtitle || ""}
                  onChange={(e) => update(bi, "subtitle", e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded text-sm focus:outline-none"
                />
                <div className="space-y-2">
                  {(block.items || []).map((item, ii) => (
                    <div key={ii} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <input type="text" placeholder="Label"
                          value={item.title || ""}
                          onChange={(e) => setItem(bi, ii, "title", e.target.value)}
                          className="p-2 border border-gray-200 rounded text-sm focus:outline-none"
                        />
                        <input type="text" placeholder="Value (e.g. 42 km)"
                          value={item.value || ""}
                          onChange={(e) => setItem(bi, ii, "value", e.target.value)}
                          className="p-2 border border-gray-200 rounded text-sm font-bold focus:outline-none"
                        />
                        <input type="text" placeholder="Description"
                          value={item.description || ""}
                          onChange={(e) => setItem(bi, ii, "description", e.target.value)}
                          className="p-2 border border-gray-200 rounded text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button type="button" onClick={() => removeItem(bi, ii)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addItem(bi)} className="text-sm font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded hover:bg-teal-100">
                    + Add Stat
                  </button>
                </div>
              </div>
            )}

            {/* ══ QUOTE ══ */}
            {block.block_type === "quote" && (
              <div className="space-y-2">
                <textarea
                  placeholder="Quote text..."
                  value={block.content || ""}
                  onChange={(e) => update(bi, "content", e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400 italic"
                />
                <input
                  type="text" placeholder="Attribution / Author (optional)"
                  value={block.title || ""}
                  onChange={(e) => update(bi, "title", e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded text-sm focus:outline-none"
                />
              </div>
            )}

            {/* ══ CTA ══ */}
            {block.block_type === "cta" && (
              <div className="space-y-2">
                <input type="text" placeholder="CTA Title"
                  value={block.title || ""}
                  onChange={(e) => update(bi, "title", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400 font-semibold"
                />
                <input type="text" placeholder="Subtitle (optional)"
                  value={block.subtitle || ""}
                  onChange={(e) => update(bi, "subtitle", e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded text-sm focus:outline-none"
                />
                <textarea placeholder="Description (optional)"
                  value={block.content || ""}
                  onChange={(e) => update(bi, "content", e.target.value)}
                  rows={2}
                  className="w-full p-2 border border-gray-200 rounded text-sm focus:outline-none"
                />
                {/* Button config */}
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Button</p>
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" placeholder="Label"
                      value={block.button?.label || ""}
                      onChange={(e) => update(bi, "button", { ...block.button, label: e.target.value })}
                      className="p-2 border border-gray-200 rounded text-sm focus:outline-none"
                    />
                    <input type="text" placeholder="URL"
                      value={block.button?.url || ""}
                      onChange={(e) => update(bi, "button", { ...block.button, url: e.target.value })}
                      className="p-2 border border-gray-200 rounded text-sm focus:outline-none"
                    />
                    <select
                      value={block.button?.target || "self"}
                      onChange={(e) => update(bi, "button", { ...block.button, target: e.target.value })}
                      className="p-2 border border-gray-200 rounded text-sm focus:outline-none"
                    >
                      <option value="self">Same tab</option>
                      <option value="blank">New tab</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicBlocks;
