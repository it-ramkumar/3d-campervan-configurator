"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setEditData, clearEditData } from "@/redux/slices/editData";
import { getAllPortfolio } from "@/api/portfolio/getAllPortfolio";
import { deletePortfolio } from "@/api/portfolio/deletePortfolio";
import Detail from "./Detail";
import toast from "react-hot-toast";
import { Search, Plus, Eye, Pencil, FileText } from "lucide-react";
import AdminDataTable from "../shared/AdminDataTable";
import { useUrlPage } from "@/hooks/useUrlPage";

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  HeadingLevel,
  ShadingType,
} from "docx";
import { saveAs } from "file-saver";

const getPortfolioImage = (portfolio) => {
  const img = portfolio.gallery?.[0];
  if (!img) return null;
  return typeof img === "string" ? img : img?.url;
};

// Helper: Safely format text containing "Title — Description" or "✓" into styled bullet runs
const parseBulletText = (text) => {
  if (!text) return null;

  // Remove leading checkmarks if present
  const cleanText = text.replace(/^[✓\s]+/, "").trim();
  const parts = cleanText.split("—");

  if (parts.length > 1) {
    return new Paragraph({
      bullet: { level: 0 },
      children: [
        new TextRun({ text: parts[0].trim() + " — ", bold: true, size: 19 }),
        new TextRun({ text: parts.slice(1).join("—").trim(), size: 19 }),
      ],
      spacing: { after: 60 },
    });
  }

  return new Paragraph({
    bullet: { level: 0 },
    children: [new TextRun({ text: cleanText, size: 19 })],
    spacing: { after: 60 },
  });
};

// Helper: Derives a short, readable label for an image URL so we can show text in place
// of the image itself — e.g. "https://.../1234_Photo Aug 29.webp" -> "Photo Aug 29"
const getImageAltText = (url, explicitLabel) => {
  if (explicitLabel) return explicitLabel;
  if (!url) return "Image";
  try {
    const rawName = decodeURIComponent(url.split("/").pop().split("?")[0]);
    const withoutId = rawName.replace(/^\d+_/, ""); // strip leading "1783750505876_" style prefix
    return withoutId.replace(/\.[a-zA-Z0-9]+$/, "") || "Image"; // strip file extension
  } catch {
    return "Image";
  }
};

// Helper: Turns a project title into a safe filename fragment
const slugifyTitle = (title) =>
  (title || "portfolio-export")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "portfolio-export";

export default function PortfolioListing({ setSelected }) {
  const dispatch = useDispatch();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [isOpen, setIsopen] = useState(false);
  const [page, setPage] = useUrlPage();
  const [pages, setPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [exportingWord, setExportingWord] = useState(false);
  const limit = 9;

  useEffect(() => {
    fetchData(page, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchData = async (pageNum = 1, searchQuery = "") => {
    setLoading(true);
    try {
      const res = await getAllPortfolio({
        page: pageNum,
        limit,
        search: searchQuery,
      });

      if (res.success && Array.isArray(res.data?.data)) {
        setPortfolios(res.data.data);
        setPages(res.data.pages || 1);
      } else {
        setPortfolios([]);
        setPages(1);
      }
    } catch (err) {
      console.error("Error fetching portfolios:", err);
      setPortfolios([]);
      setPages(1);
      toast.error("Failed to load portfolio items.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearch(searchTerm);
    setPage(1);
    fetchData(1, searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearch("");
    setPage(1);
    fetchData(1, "");
  };

  const handleDelete = async (portfolio) => {
    await deletePortfolio(portfolio.slug);
    setPortfolios((prev) => prev.filter((p) => p._id !== portfolio._id));
  };

  const handleEdit = (portfolio) => {
    dispatch(setEditData(portfolio));
    setSelected("portfolio-form");
  };

  const handleView = (portfolio) => {
    setDetail(portfolio);
    setIsopen(true);
  };

  // --- COMPLETE WORD EXPORT GENERATOR (text-only — no embedded images) ---
  const generateWordDocument = async () => {
    try {
      setExportingWord(true);
      toast.loading("Generating complete Word document...", { id: "word-export" });

      const res = await getAllPortfolio({ page: 1, limit: 10000, search });
      const items = res.success && Array.isArray(res.data?.data) ? res.data.data : [];

      if (items.length === 0) {
        toast.error("No data available to export.", { id: "word-export" });
        setExportingWord(false);
        return;
      }

      const docChildren = [];

      // Document Header
      docChildren.push(
        new Paragraph({
          text: "Portfolio Projects Showcase",
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Total Projects: ${items.length}  |  Exported on: ${new Date().toLocaleDateString()}`,
              color: "64748B",
              size: 20,
              italic: true,
            }),
          ],
          spacing: { after: 300 },
        })
      );

      // Loop through each Portfolio Item
      items.forEach((p, index) => {
        const van = p.van_listing || {};
        const specs = van.specifications || {};
        const cap = specs.capacity || {};

        // Project Header
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `PROJECT #${index + 1}`,
                bold: true,
                color: "2563EB",
                size: 18,
              }),
            ],
            spacing: { before: 200, after: 60 },
          }),
          new Paragraph({
            text: van.title || "Untitled Project",
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 },
          })
        );

        // Subtitle & General Metadata
        const categoryStr = Array.isArray(p.category) ? p.category.join(", ") : "Uncategorized";
        const publishedStr = p.is_published ? "Published" : "Unpublished";
        const soldStr = p.sold ? "Yes" : "No";

        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Category: ${categoryStr}  |  Status: ${publishedStr}  |  Sold: ${soldStr}  |  Price: ${
                  van.price ? `$${van.price}` : "N/A"
                }`,
                bold: true,
                color: "334155",
                size: 19,
              }),
            ],
            spacing: { after: 120 },
          })
        );

        if (van.tagline) {
          docChildren.push(
            new Paragraph({
              children: [new TextRun({ text: van.tagline, italic: true, color: "475569", size: 20 })],
              spacing: { after: 100 },
            })
          );
        }

        if (van.subtitle) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: van.subtitle,
                  italic: true,
                  color: "475569",
                  size: 20,
                }),
              ],
              spacing: { after: 120 },
            })
          );
        }

        if (van.description) {
          docChildren.push(
            new Paragraph({
              children: [new TextRun({ text: van.description, size: 20 })],
              spacing: { after: 200 },
            })
          );
        }

        // --- SECTION 1: SPECIFICATIONS OVERVIEW TABLE ---
        docChildren.push(
          new Paragraph({
            children: [new TextRun({ text: "Specifications Overview", bold: true, size: 20, color: "0F172A" })],
            spacing: { before: 100, after: 80 },
          })
        );

        const specData = [
          ["Client Name", van.clientName || "N/A"],
          ["Bathroom Type", van.bathroomType || "N/A"],
          ["Bed Type", van.bedType || "N/A"],
          ["Size & Roof", `${van.size || "N/A"} - ${van.roof || "N/A"}`],
          ["Make / Model", specs.make_model || "N/A"],
          ["Wheelbase & Drivetrain", `${specs.wheelbase || "N/A"} (${specs.drivetrain || "N/A"})`],
          ["Engine & Transmission", `${specs.engine || "N/A"} / ${specs.transmission || "N/A"}`],
          ["Exterior / Interior Color", `${specs.exterior_color || "N/A"} / ${specs.interior_color || "N/A"}`],
          ["Capacity", `Sits ${cap.sits || 0} / Sleeps ${cap.sleeps || 0}`],
          ["Slug", p.slug || "N/A"],
        ];

        const specTableRows = specData.map(
          ([label, val]) =>
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 30, type: WidthType.PERCENTAGE },
                  shading: { fill: "F8FAFC", type: ShadingType.CLEAR },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: label, bold: true, size: 18, color: "1E293B" })],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: 70, type: WidthType.PERCENTAGE },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: String(val), size: 18, color: "334155" })],
                    }),
                  ],
                }),
              ],
            })
        );

        docChildren.push(
          new Table({
            rows: specTableRows,
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" },
              insideVertical: { style: BorderStyle.NONE },
            },
          })
        );

        // --- SECTION 2: GALLERY (listed as text labels instead of embedded images) ---
        if (Array.isArray(p.gallery) && p.gallery.length > 0) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({ text: `Gallery (${p.gallery.length} images)`, bold: true, size: 20, color: "0F172A" }),
              ],
              spacing: { before: 220, after: 100 },
            })
          );

          p.gallery.forEach((img) => {
            const url = typeof img === "string" ? img : img?.url;
            docChildren.push(
              new Paragraph({
                bullet: { level: 0 },
                children: [
                  new TextRun({ text: `[Image: ${getImageAltText(url)}]`, italics: true, size: 18, color: "64748B" }),
                ],
                spacing: { after: 40 },
              })
            );
          });
        }

        // --- SECTION 3: DYNAMIC BLOCKS (HEADINGS, SUBHEADINGS, TABLES, LISTS, PARAGRAPHS & FEATURE GRIDS) ---
        if (Array.isArray(p.blocks) && p.blocks.length > 0) {
          p.blocks
            .filter((block) => block.is_active !== false)
            .forEach((block) => {
              // Heading Block Types
              if (block.block_type === "heading" || block.block_type === "title") {
                docChildren.push(
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: block.title || block.text || "",
                        bold: true,
                        size: 22,
                        color: "0F172A",
                      }),
                    ],
                    spacing: { before: 200, after: block.subtitle ? 40 : 80 },
                  })
                );
                if (block.subtitle) {
                  docChildren.push(
                    new Paragraph({
                      children: [
                        new TextRun({ text: block.subtitle, italics: true, size: 19, color: "475569" }),
                      ],
                      spacing: { after: 120 },
                    })
                  );
                }
              } else if (block.block_type === "subheading") {
                docChildren.push(
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: block.title || block.text || "",
                        bold: true,
                        size: 20,
                        color: "2563EB",
                      }),
                    ],
                    spacing: { before: 160, after: 60 },
                  })
                );
              } else if (block.title) {
                // Fallback: any other block type that still carries a title
                docChildren.push(
                  new Paragraph({
                    children: [new TextRun({ text: block.title, bold: true, size: 20, color: "1E3A8A" })],
                    spacing: { before: 200, after: 100 },
                  })
                );
              }

              // Text / Paragraph Block Type — copy can live in either block.text or block.content
              if ((block.block_type === "text" || block.block_type === "paragraph") && (block.text || block.content)) {
                docChildren.push(
                  new Paragraph({
                    children: [new TextRun({ text: block.text || block.content, size: 20 })],
                    spacing: { after: 100 },
                  })
                );
              }

              // Table Block Type
              if (block.block_type === "table" && block.table_data) {
                const headers = block.table_data.headers || [];
                const rows = block.table_data.rows || [];

                const tableRows = [];

                if (headers.length > 0) {
                  tableRows.push(
                    new TableRow({
                      children: headers.map(
                        (h) =>
                          new TableCell({
                            shading: { fill: "2563EB", type: ShadingType.CLEAR },
                            children: [
                              new Paragraph({
                                children: [new TextRun({ text: String(h), bold: true, color: "FFFFFF", size: 18 })],
                              }),
                            ],
                          })
                      ),
                    })
                  );
                }

                rows.forEach((row, rIndex) => {
                  tableRows.push(
                    new TableRow({
                      children: row.map(
                        (cellVal) =>
                          new TableCell({
                            shading: {
                              fill: rIndex % 2 === 0 ? "FFFFFF" : "F8FAFC",
                              type: ShadingType.CLEAR,
                            },
                            children: [
                              new Paragraph({
                                children: [new TextRun({ text: String(cellVal), size: 18, color: "334155" })],
                              }),
                            ],
                          })
                      ),
                    })
                  );
                });

                docChildren.push(
                  new Table({
                    rows: tableRows,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: {
                      top: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
                      bottom: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
                      left: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
                      right: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
                      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" },
                      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" },
                    },
                  })
                );
              }

              // List Block Type
              if (block.block_type === "list" && Array.isArray(block.list_items)) {
                block.list_items.forEach((item) => {
                  if (item.text) {
                    const bullet = parseBulletText(item.text);
                    if (bullet) docChildren.push(bullet);
                  }
                  if (Array.isArray(item.sub_items)) {
                    item.sub_items.forEach((sub) => {
                      docChildren.push(
                        new Paragraph({
                          bullet: { level: 1 },
                          children: [new TextRun({ text: String(sub), size: 18 })],
                          spacing: { after: 40 },
                        })
                      );
                    });
                  }
                });
              }

              // Feature Grid Block Type — this is where most layout/highlight copy lives
              if (block.block_type === "feature-grid") {
                if (block.title) {
                  docChildren.push(
                    new Paragraph({
                      children: [new TextRun({ text: block.title, bold: true, size: 21, color: "1E3A8A" })],
                      spacing: { before: 220, after: block.subtitle ? 30 : 100 },
                    })
                  );
                }
                if (block.subtitle) {
                  docChildren.push(
                    new Paragraph({
                      children: [
                        new TextRun({ text: block.subtitle, italics: true, size: 19, color: "2563EB" }),
                      ],
                      spacing: { after: 120 },
                    })
                  );
                }

                // Block-level media (images belonging to the whole grid, not one item)
                if (Array.isArray(block.block_media)) {
                  block.block_media.forEach((m) => {
                    if (m.url) {
                      docChildren.push(
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `[Image: ${getImageAltText(m.url, m.caption || m.alt)}]`,
                              italics: true,
                              size: 18,
                              color: "64748B",
                            }),
                          ],
                          spacing: { after: 100 },
                        })
                      );
                    }
                  });
                }

                // Individual feature items
                if (Array.isArray(block.items)) {
                  block.items.forEach((item) => {
                    if (item.title) {
                      docChildren.push(
                        new Paragraph({
                          children: [new TextRun({ text: item.title, bold: true, size: 19, color: "0F172A" })],
                          spacing: { before: 100, after: 40 },
                        })
                      );
                    }
                    if (item.description) {
                      docChildren.push(
                        new Paragraph({
                          children: [new TextRun({ text: item.description, size: 19 })],
                          spacing: { after: 80 },
                        })
                      );
                    }
                    if (item.value) {
                      docChildren.push(
                        new Paragraph({
                          children: [new TextRun({ text: item.value, size: 19, bold: true, color: "2563EB" })],
                          spacing: { after: 80 },
                        })
                      );
                    }
                    if (item.media) {
                      docChildren.push(
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `[Image: ${getImageAltText(item.media)}]`,
                              italics: true,
                              size: 18,
                              color: "64748B",
                            }),
                          ],
                          spacing: { after: 100 },
                        })
                      );
                    }
                  });
                }
              }
            });
        }

        // --- SECTION 4: DETAILED FEATURES LIST ---
        if (Array.isArray(p.detailed_features) && p.detailed_features.length > 0) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({ text: "Detailed Specifications & Build Features", bold: true, size: 20, color: "0F172A" }),
              ],
              spacing: { before: 220, after: 100 },
            })
          );

          p.detailed_features.forEach((f) => {
            if (f.category) {
              docChildren.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: f.category.toUpperCase(),
                      bold: true,
                      color: "2563EB",
                      size: 18,
                    }),
                  ],
                  spacing: { before: 120, after: 60 },
                })
              );
            }

            if (Array.isArray(f.items)) {
              f.items.forEach((itemStr) => {
                const bullet = parseBulletText(itemStr);
                if (bullet) docChildren.push(bullet);
              });
            } else if (typeof f.items === "string") {
              const bullet = parseBulletText(f.items);
              if (bullet) docChildren.push(bullet);
            }
          });
        }

        // Section Divider Line
        docChildren.push(
          new Paragraph({
            text: "----------------------------------------------------------------------------------------------------",
            color: "CBD5E1",
            spacing: { before: 250, after: 300 },
          })
        );
      });

      // Build Document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: docChildren,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);

      // Filename: use the project's title when exporting a single item; when exporting
      // several at once, fall back to a combined name since there's no single title to use.
      const now = new Date();
      const datePart = now.toISOString().slice(0, 10);
      const timePart = now.toTimeString().slice(0, 8).replace(/:/g, "-"); // HH-MM-SS
      const fileBaseName =
        items.length === 1
          ? slugifyTitle(items[0].van_listing?.title)
          : `portfolio-export-${items.length}-projects`;

      saveAs(blob, `${fileBaseName}_${datePart}_${timePart}.docx`);

      toast.success("Word document exported successfully!", { id: "word-export" });
    } catch (error) {
      console.error("Error exporting Word document:", error);
      toast.error("Failed to generate Word document.", { id: "word-export" });
    } finally {
      setExportingWord(false);
    }
  };

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (p) => (
        <span className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-blue-600">
          {p.van_listing?.title || "Untitled Project"}
        </span>
      ),
    },
    {
      key: "category",
      label: "Category",
      hideOnMobile: true,
      render: (p) =>
        p.category && p.category.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {p.category.map((cat, index) => (
              <span
                key={index}
                className="text-[11px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md"
              >
                {cat}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-sm text-slate-400 italic">Uncategorized</span>
        ),
    },
    {
      key: "subtitle",
      label: "Subtitle",
      hideOnMobile: true,
      render: (p) => (
        <p className="text-slate-500 text-sm line-clamp-1 max-w-xs italic">
          {p.van_listing?.subtitle || "No subtitle provided."}
        </p>
      ),
    },
    {
      key: "is_published",
      label: "Status",
      render: (p) => (
        <span
          className={`text-[11px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full ${
            p.is_published ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
          }`}
        >
          {p.is_published ? "Published" : "Unpublished"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Portfolio Gallery</h2>
          <p className="text-sm text-slate-500">Showcase your best van conversion projects</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Word Export Button */}
          <button
            onClick={generateWordDocument}
            disabled={exportingWord}
            className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <FileText size={18} />
            {exportingWord ? "Exporting Word..." : "Export Word (.docx)"}
          </button>

          <button
            onClick={() => {
              setSelected("portfolio-form");
              dispatch(clearEditData());
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2 self-start md:self-auto"
          >
            <Plus size={18} /> Add Project
          </button>
        </div>
      </div>

      {/* --- Search Bar --- */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-white border-none rounded-xl pl-11 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400 outline-none"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
        >
          Search
        </button>
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="text-slate-400 hover:text-slate-600 text-sm font-semibold px-2"
          >
            Clear
          </button>
        )}
      </div>

      <AdminDataTable
        columns={columns}
        rows={portfolios}
        rowKey={(p) => p._id}
        loading={loading}
        emptyMessage="No portfolio items found."
        imageColumn={{
          accessor: getPortfolioImage,
          alt: (p) => p.van_listing?.title,
          filename: (p) => p.slug || p.van_listing?.title || p._id,
        }}
        renderActions={(p) => (
          <>
            <button
              onClick={() => handleView(p)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
              title="View"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => handleEdit(p)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
              title="Edit"
            >
              <Pencil size={16} />
            </button>
          </>
        )}
        onDelete={handleDelete}
        deleteMessage={(p) => `Delete "${p.van_listing?.title || "this project"}"? This action cannot be undone.`}
        page={page}
        totalPages={pages}
        onPageChange={setPage}
      />

      {/* Detail Modal */}
      {isOpen && <Detail setIsopen={setIsopen} detail={detail} />}
    </div>
  );
}