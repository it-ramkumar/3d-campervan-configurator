"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getItemTitle } from "@/components/Options/optionBlocks";

const SECTIONS = [
  { key: "exterior", label: "Exterior" },
  { key: "interior", label: "Interior" },
  { key: "system", label: "System" },
];

export const EMPTY_USED_OPTIONS = { exterior: [], interior: [], system: [] };

// Builds may come back populated ({ _id, title, ... }) or as bare ids
const toUsedOptionIds = (usedOptions) =>
  Object.fromEntries(
    SECTIONS.map(({ key }) => [
      key,
      (usedOptions?.[key] || []).map((o) => (o && typeof o === "object" ? o._id : o)).filter(Boolean),
    ])
  );

/**
 * Checkbox picker for the options fitted to a build. Only option ids are stored.
 *
 * value     { exterior: [id], interior: [id], system: [id] }, or null while loading
 * onChange  receives the next value
 * loadFrom  preview URL of the build being edited; its saved selection is loaded once.
 *           Until it loads, value stays null so the form knows not to send the field.
 */
export default function UsedOptionsPicker({ value, onChange, loadFrom }) {
  const [options, setOptions] = useState({ exterior: [], interior: [], system: [] });
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState({ exterior: true, interior: false, system: false });

  // All options, grouped by section
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      SECTIONS.map(({ key }) =>
        fetch(`${process.env.NEXT_PUBLIC_URL}/${key}`, { cache: "no-store" })
          .then((r) => r.json())
          .then((j) => [key, j.data || []])
      )
    )
      .then((entries) => !cancelled && setOptions(Object.fromEntries(entries)))
      .catch(() => !cancelled && setLoadError("Could not load options."))
      .finally(() => !cancelled && setLoadingOptions(false));
    return () => {
      cancelled = true;
    };
  }, []);

  // Saved selection of the build being edited. The picker owns the null ("not loaded")
  // state so the form never sends a half-loaded selection.
  useEffect(() => {
    if (!loadFrom) return;
    let cancelled = false;
    onChange(null);
    fetch(loadFrom, { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        const build = j.van || j.data;
        if (!cancelled) onChange(toUsedOptionIds(build?.used_options));
      })
      .catch(() => !cancelled && setLoadError("Could not load this build's saved options."));
    return () => {
      cancelled = true;
    };
    // onChange is a state setter from the parent; reload only when the build changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadFrom]);

  // section -> [{ category, items }] filtered by the search box
  const grouped = useMemo(() => {
    const q = search.trim().toLowerCase();
    return Object.fromEntries(
      SECTIONS.map(({ key }) => {
        const byCategory = new Map();
        for (const item of options[key]) {
          const title = getItemTitle(item);
          if (q && !title.toLowerCase().includes(q)) continue;
          const category = item.categoryId?.title || "Other";
          if (!byCategory.has(category)) byCategory.set(category, []);
          byCategory.get(category).push({ id: item._id, title });
        }
        return [key, [...byCategory].map(([category, items]) => ({ category, items }))];
      })
    );
  }, [options, search]);

  const selected = value || EMPTY_USED_OPTIONS;
  const ready = value !== null && !loadingOptions;

  const toggle = (section, id) => {
    const current = selected[section] || [];
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    onChange({ ...selected, [section]: next });
  };

  const clearSection = (section) => onChange({ ...selected, [section]: [] });

  if (loadError) return <p className="text-sm text-red-600">{loadError}</p>;
  if (!ready) return <p className="text-sm text-gray-500">Loading options…</p>;

  const total = SECTIONS.reduce((n, { key }) => n + (selected[key]?.length || 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            // Show every section while searching so matches aren't hidden
            if (e.target.value) setOpen({ exterior: true, interior: true, system: true });
          }}
          placeholder="Search options…"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <span className="text-sm text-gray-600 shrink-0">{total} selected</span>
      </div>

      {SECTIONS.map(({ key, label }) => {
        const count = selected[key]?.length || 0;
        const groups = grouped[key];
        return (
          <div key={key} className="border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-t-lg">
              <button
                type="button"
                onClick={() => setOpen((o) => ({ ...o, [key]: !o[key] }))}
                className="flex items-center gap-2 text-sm font-semibold text-gray-800"
              >
                <span className="w-4 text-gray-500">{open[key] ? "▾" : "▸"}</span>
                {label}
                <span className="font-normal text-gray-500">({count} selected)</span>
              </button>
              {count > 0 && (
                <button
                  type="button"
                  onClick={() => clearSection(key)}
                  className="text-xs text-gray-500 hover:text-red-600"
                >
                  Clear
                </button>
              )}
            </div>

            {open[key] && (
              <div className="p-4 space-y-4">
                {groups.length === 0 && <p className="text-sm text-gray-500">No matching options.</p>}
                {groups.map(({ category, items }) => (
                  <div key={category}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">{category}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {items.map(({ id, title }) => {
                        const checked = selected[key]?.includes(id);
                        return (
                          <label
                            key={id}
                            className={`flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer text-sm transition-colors ${
                              checked ? "border-green-600 bg-green-50 text-gray-900" : "border-gray-200 text-gray-700 hover:border-gray-400"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={!!checked}
                              onChange={() => toggle(key, id)}
                              className="h-4 w-4 text-green-600 focus:ring-green-500"
                            />
                            <span className="leading-snug">{title}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
