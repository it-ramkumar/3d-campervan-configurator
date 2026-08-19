"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEditData, clearEditData } from "@/redux/slices/editData";
import { getAllVans } from "@/api/van/getAllVans";
import { deleteVan } from "@/api/van/deleteVan";
import Detail from "./Detail";
import toast from "react-hot-toast";
import { ImageWithSkeleton } from "@/components/Common/Common";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Search, Plus, Trash2, Eye, Pencil, GripVertical, Download, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import ConfirmDialog from "../shared/ConfirmDialog";
import { downloadImage } from "@/utils/downloadImage";
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

// Helper: Formats "Title — Description" into bold heading + regular text bullet point
const parseBulletText = (text) => {
  if (!text) return null;
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
// of the image itself — e.g. "https://.../van/gallery/1234_Photo Aug 29.webp" -> "Photo Aug 29"
const getImageAltText = (url, explicitLabel) => {
  if (explicitLabel) return explicitLabel;
  if (!url) return "Image";
  try {
    const rawName = decodeURIComponent(url.split("/").pop().split("?")[0]);
    // Strip a leading numeric upload timestamp/id prefix like "1783750505876_"
    const withoutId = rawName.replace(/^\d+_/, "");
    // Strip the file extension
    return withoutId.replace(/\.[a-zA-Z0-9]+$/, "") || "Image";
  } catch {
    return "Image";
  }
};

// Helper: Turns a van/project title into a safe filename fragment
const slugifyTitle = (title) =>
  (title || "van-export")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "van-export";

export default function VanListing({ setSelected }) {
  const dispatch = useDispatch();
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [isOpen, setIsopen] = useState(false);
  const [page, setPage] = useUrlPage();
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelectedRows] = useState(new Set());
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [working, setWorking] = useState(false);
  const [exportingWord, setExportingWord] = useState(false);
  const limit = 8;

  useEffect(() => {
    fetchVans(page, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchVans = async (currentPage = 1, query = "") => {
    setLoading(true);
    try {
      const result = await getAllVans(currentPage, limit, query);
      if (result.success && Array.isArray(result.data)) {
        setVans(result.data);
        setPages(result.pages || 1);
      } else {
        setVans([]);
        setPages(1);
      }
      setSelectedRows(new Set());
    } catch (err) {
      console.error("Error fetching vans:", err);
      setVans([]);
      toast.error("Failed to load vans.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchVans(1, search);
  };

  const handleEdit = (van) => {
    dispatch(setEditData(van));
    setSelected("vans-form");
  };

  const handleView = (van) => {
    setDetail(van);
    setIsopen(true);
  };

  const toggleAll = () => {
    if (selected.size === vans.length) setSelectedRows(new Set());
    else setSelectedRows(new Set(vans.map((v) => v._id)));
  };

  const toggleRow = (id) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleConfirmDelete = async () => {
    if (!confirmTarget) return;
    setWorking(true);
    try {
      if (confirmTarget.type === "single") {
        await deleteVan(confirmTarget.van.slug);
        toast.success("Van deleted.");
      } else {
        const targets = vans.filter((v) => selected.has(v._id));
        const results = await Promise.allSettled(targets.map((v) => deleteVan(v.slug)));
        const failed = results.filter((r) => r.status === "rejected").length;
        const succeeded = results.length - failed;
        if (failed === 0) toast.success(`${succeeded} van${succeeded > 1 ? "s" : ""} deleted.`);
        else toast.error(`${succeeded} deleted, ${failed} failed.`);
      }
      setConfirmTarget(null);
      fetchVans(page, search);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed.");
    } finally {
      setWorking(false);
    }
  };

  // --- WORD EXPORT GENERATOR ---
  const handleExportWord = async () => {
    try {
      setExportingWord(true);
      toast.loading("Generating Word document... this can take a bit longer if there are lots of images.", {
        id: "word-van-export",
      });

      const result = await getAllVans(1, 10000, search);
      if (!result.success || !result.data.length) {
        toast.error("Nothing to export.", { id: "word-van-export" });
        return;
      }

      const items = selected.size > 0 ? result.data.filter((v) => selected.has(v._id)) : result.data;

      if (!items.length) {
        toast.error("Nothing to export.", { id: "word-van-export" });
        return;
      }

      const docChildren = [];

      // Document Title Header
      docChildren.push(
        new Paragraph({
          text: "Fleet Vans Inventory & Specifications",
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Total Units: ${items.length}  |  Exported: ${new Date().toLocaleDateString()}`,
              color: "64748B",
              size: 20,
              italic: true,
            }),
          ],
          spacing: { after: 300 },
        })
      );

      // Render Each Van (for...of so we can await image embeds in sequence)
      let index = 0;
      for (const p of items) {
        const van = p.van_listing || {};
        const specs = van.specifications || {};
        const cap = specs.capacity || {};

        // Van Index Header
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `VAN UNIT #${index + 1}`,
                bold: true,
                color: "2563EB",
                size: 18,
              }),
            ],
            spacing: { before: 200, after: 60 },
          }),
          new Paragraph({
            text: van.title || "Untitled Van",
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 },
          })
        );

        // General Info Sub-header
        const statusStr = p.status || "N/A";
        const publishedStr = p.is_published ? "Published" : "Unpublished";
        const priceStr = van.price ? `$${van.price}` : "N/A";

        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Price: ${priceStr}  |  Status: ${statusStr} (${publishedStr})  |  Roof: ${van.roof || "N/A"}`,
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

        if (p.delivery_date) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({ text: `Delivery Date: `, bold: true, size: 18 }),
                new TextRun({ text: p.delivery_date, size: 18 }),
              ],
              spacing: { after: 120 },
            })
          );
        }

        // --- SPECIFICATIONS TABLE ---
        docChildren.push(
          new Paragraph({
            children: [new TextRun({ text: "Specifications Overview", bold: true, size: 20, color: "0F172A" })],
            spacing: { before: 100, after: 80 },
          })
        );

        const specData = [
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
                  width: { size: 35, type: WidthType.PERCENTAGE },
                  shading: { fill: "F8FAFC", type: ShadingType.CLEAR },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: label, bold: true, size: 18, color: "1E293B" })],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: 65, type: WidthType.PERCENTAGE },
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

        // --- GALLERY (listed as text labels instead of embedded images) ---
        if (Array.isArray(p.gallery) && p.gallery.length > 0) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({ text: `Gallery (${p.gallery.length} images)`, bold: true, size: 20, color: "0F172A" }),
              ],
              spacing: { before: 220, after: 100 },
            })
          );

          p.gallery.forEach((imgUrl) => {
            docChildren.push(
              new Paragraph({
                bullet: { level: 0 },
                children: [
                  new TextRun({ text: `[Image: ${getImageAltText(imgUrl)}]`, italics: true, size: 18, color: "64748B" }),
                ],
                spacing: { after: 40 },
              })
            );
          });
        }

        // --- DYNAMIC BLOCKS (HEADINGS, SUBHEADINGS, TABLES, LISTS, PARAGRAPHS & FEATURE GRIDS) ---
        if (Array.isArray(p.blocks) && p.blocks.length > 0) {
          const activeBlocks = p.blocks.filter((block) => block.is_active !== false);

          for (const block of activeBlocks) {
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
              // Subtitle was previously dropped entirely — headings often carry the real copy here
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
              // Section Title (fallback for any other block type that has a title)
              docChildren.push(
                new Paragraph({
                  children: [new TextRun({ text: block.title, bold: true, size: 20, color: "1E3A8A" })],
                  spacing: { before: 200, after: 100 },
                })
              );
            }

            // Text / Paragraph Block Type
            // NOTE: previously only checked block.text, but paragraph blocks in your data store
            // their copy in block.content — that's why paragraph text was silently disappearing.
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

            // Feature Grid Block Type — previously not handled at all, this is where most
            // of your actual marketing copy (layouts, highlights) lives.
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

              // Block-level media (images that belong to the whole grid, not one item)
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
          }
        }

        // --- DETAILED FEATURES ---
        if (Array.isArray(p.detailed_features) && p.detailed_features.length > 0) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({ text: "Detailed Specs & Features", bold: true, size: 20, color: "0F172A" }),
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

        // Divider
        docChildren.push(
          new Paragraph({
            text: "----------------------------------------------------------------------------------------------------",
            color: "CBD5E1",
            spacing: { before: 250, after: 300 },
          })
        );

        index += 1;
      }

      // Save Word File
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: docChildren,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      // Include the time so re-exporting doesn't collide with a previous download.
      const now = new Date();
      const datePart = now.toISOString().slice(0, 10);
      const timePart = now.toTimeString().slice(0, 8).replace(/:/g, "-"); // HH-MM-SS

      // Filename: use the van's title when exporting a single van; when exporting
      // several at once, fall back to a combined "fleet export" name since there's
      // no single project title to use.
      const fileBaseName =
        items.length === 1
          ? slugifyTitle(items[0].van_listing?.title)
          : `van-fleet-export-${items.length}-vans`;

      saveAs(blob, `${fileBaseName}_${datePart}_${timePart}.docx`);

      toast.success("Word document exported successfully!", { id: "word-van-export" });
    } catch (error) {
      console.error("Error exporting Word document:", error);
      toast.error("Failed to generate Word document.", { id: "word-van-export" });
    } finally {
      setExportingWord(false);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(vans);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setVans(items);

    const updatedOrder = items.map((van, index) => ({
      _id: van._id,
      order: index,
    }));

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_URL}/van/reorder`, { newOrder: updatedOrder }, { withCredentials: true });
    } catch (err) {
      console.error("Failed to save order");
      toast.error("Failed to save new order.");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-slate-400 font-medium italic">
      <div className="animate-pulse">Loading fleet data...</div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* --- Top Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Fleet Management</h2>
          <p className="text-sm text-slate-500">Manage and monitor your van listings</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Export Word Button */}
          <button
            onClick={handleExportWord}
            disabled={exportingWord}
            className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <FileText size={18} />
            {exportingWord ? "Exporting Word..." : selected.size > 0 ? `Export Selected (${selected.size})` : "Export Word (.docx)"}
          </button>

          <button
            onClick={() => {
              setSelected("vans-form");
              dispatch(clearEditData());
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2 self-start md:self-auto"
          >
            <Plus size={18} /> Add New Van
          </button>
        </div>
      </div>

      {/* --- Search Bar Section --- */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search vans by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-white border-none rounded-xl pl-11 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
        >
          Search
        </button>
        {search && (
          <button
            onClick={() => { setSearch(""); handleSearch(); }}
            className="text-slate-400 hover:text-slate-600 text-sm font-semibold px-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* --- Bulk Delete action toolbar --- */}
      {selected.size > 0 && (
        <div className="flex items-center min-h-[40px]">
          <button
            onClick={() => setConfirmTarget({ type: "bulk" })}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold text-sm transition-all"
          >
            <Trash2 size={15} /> Delete Selected ({selected.size})
          </button>
        </div>
      )}

      {/* --- Fleet Table with DND --- */}
      {vans.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">No vans found in your fleet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f8fafc] border-b border-slate-100">
                <tr>
                  <th className="px-4 py-4 w-10">
                    <input
                      type="checkbox"
                      checked={vans.length > 0 && selected.size === vans.length}
                      onChange={toggleAll}
                      className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-4 text-[10px] font-black uppercase text-slate-400">Image</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Title</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 hidden md:table-cell">Description</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Price</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase text-slate-400">Actions</th>
                  <th className="px-4 py-4 w-10" />
                </tr>
              </thead>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="vans-table">
                  {(provided) => (
                    <tbody {...provided.droppableProps} ref={provided.innerRef} className="divide-y divide-slate-50">
                      {vans.map((van, index) => (
                        <Draggable key={van._id} draggableId={van._id} index={index}>
                          {(dragProvided, snapshot) => (
                            <tr
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              className={`group hover:bg-blue-50/30 transition-colors ${snapshot.isDragging ? "bg-blue-50 shadow-lg" : ""}`}
                            >
                              <td className="px-4 py-4">
                                <input
                                  type="checkbox"
                                  checked={selected.has(van._id)}
                                  onChange={() => toggleRow(van._id)}
                                  className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                                />
                              </td>
                              <td className="px-4 py-4">
                                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 group/img">
                                  {van.gallery?.length > 0 ? (
                                    <>
                                      <ImageWithSkeleton
                                        src={van.gallery[0]?.url || van.gallery[0]}
                                        alt={van.van_listing?.title}
                                        className="w-full h-full object-cover"
                                      />
                                      <button
                                        onClick={() => downloadImage(van.gallery[0]?.url || van.gallery[0], van.van_listing?.title || van.slug)}
                                        title="Download image"
                                        className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white"
                                      >
                                        <Download size={16} />
                                      </button>
                                    </>
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[8px] text-slate-300 font-bold uppercase">None</div>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-blue-600">
                                  {van.van_listing?.title || "Untitled Unit"}
                                </span>
                              </td>
                              <td className="px-6 py-4 hidden md:table-cell">
                                <p className="text-slate-500 text-sm line-clamp-1 max-w-xs">{van.van_listing?.description}</p>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-blue-700 font-black text-sm">${van.van_listing?.price}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end items-center gap-2">
                                  <button onClick={() => handleView(van)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all" title="View">
                                    <Eye size={16} />
                                  </button>
                                  <button onClick={() => handleEdit(van)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all" title="Edit">
                                    <Pencil size={16} />
                                  </button>
                                  <button onClick={() => setConfirmTarget({ type: "single", van })} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all" title="Delete">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-slate-300 cursor-grab active:cursor-grabbing" {...dragProvided.dragHandleProps} title="Drag to reorder">
                                <GripVertical size={18} />
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </tbody>
                  )}
                </Droppable>
              </DragDropContext>
            </table>
          </div>
        </div>
      )}

      {/* --- Pagination --- */}
      {pages > 1 && (
        <div className="flex justify-center items-center py-4">
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            <button
              onClick={() => setPage(Math.max(page - 1, 1))}
              disabled={page === 1}
              className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="px-4 text-sm font-bold text-slate-700">
              {page} <span className="text-slate-300 mx-1">/</span> {pages}
            </span>
            <button
              onClick={() => setPage(Math.min(page + 1, pages))}
              disabled={page === pages}
              className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {isOpen && <Detail setIsopen={setIsopen} detail={detail} />}

      <ConfirmDialog
        open={!!confirmTarget}
        title={confirmTarget?.type === "bulk" ? "Delete selected vans?" : "Delete this van?"}
        message={
          confirmTarget?.type === "bulk"
            ? `Delete ${selected.size} selected van${selected.size > 1 ? "s" : ""}? This action cannot be undone.`
            : `Delete "${confirmTarget?.van?.van_listing?.title || "this van"}"? This action cannot be undone.`
        }
        loading={working}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}