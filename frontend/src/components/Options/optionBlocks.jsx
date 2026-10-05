import React from "react";
import { CheckCircle2 } from "lucide-react";
import { RichParagraph, Heading1 } from "../Common/Common";

export const GLASS_LIGHT = {
  background: "rgba(0,31,61,0.05)",
  border: "1px solid rgba(0,31,61,0.1)",
};

export const BORDER = "1px solid rgba(0,31,61,0.1)";

// ── helpers ───────────────────────────────────────────────────────────────────
export const activeBlocks = (item) => (item?.blocks || []).filter((b) => b.is_active !== false);

export const getItemTitle = (item) =>
  item?.heading ||
  item?.title ||
  activeBlocks(item).find((b) => b.block_type === "heading")?.title ||
  "Untitled Option";

// plain text of an item, for meta descriptions and JSON-LD
export const getItemText = (item, max = 160) => {
  const parts = [
    ...(item?.description || []),
    ...activeBlocks(item)
      .filter((b) => b.block_type !== "heading")
      .flatMap((b) => [b.title, b.content, ...(b.list_items || []).map((li) => li.text)]),
  ].filter((t) => t?.trim());
  const text = parts.join(" ").replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max - 1).trimEnd() + "…" : text;
};

// ── RenderBlocks ──────────────────────────────────────────────────────────────
export const RenderBlocks = ({ blocks, compact = false }) => {
  if (!blocks || !Array.isArray(blocks)) return null;
  const textVariant = compact ? "card" : "body";

  return (
    <div className={compact ? "space-y-2" : "space-y-3 mt-3"}>
      {blocks
        .filter((block) => block.is_active !== false)
        .map((block, idx) => {
          switch (block.block_type) {
            case "heading":
              return null;

            case "subheading":
              return (
                <div key={idx} className="mb-1">
                  <Heading1 variant="card"
                    text={block.title}
                    textColor="text-primary"
                    className="font-bold text-[11px]"
                  />
                </div>
              );

            case "paragraph":
              return (
                <RichParagraph variant={textVariant} key={idx}>
                  {block.content}
                </RichParagraph>
              );

            case "list":
              return (
                <div key={idx} className="p-3 rounded-lg" style={GLASS_LIGHT}>
                  {block.title && (
                    <RichParagraph variant={textVariant}>{block.title}</RichParagraph>
                  )}
                  <ul className="space-y-1.5">
                    {block.list_items?.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-2.5 w-2.5 text-[#ED985F] mt-0.5 shrink-0" />
                        <RichParagraph variant={textVariant}>{item.text}</RichParagraph>
                      </li>
                    ))}
                  </ul>
                </div>
              );

            case "table":
              if (!block.table_data?.headers?.length) return null;
              return (
                <div key={idx} className="rounded-lg overflow-x-auto" style={GLASS_LIGHT}>
                  {block.title && (
                    <RichParagraph variant="body" className="px-3 pt-3">{block.title}</RichParagraph>
                  )}
                  <table className="w-full text-left text-sm font-ui text-primary">
                    <thead>
                      <tr style={{ borderBottom: BORDER }}>
                        {block.table_data.headers.map((h, i) => (
                          <th key={i} className="px-3 py-2 text-[10px] uppercase tracking-wider font-bold text-primary/60">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.table_data.rows?.map((row, r) => (
                        <tr key={r} style={{ borderBottom: BORDER }}>
                          {row.map((cell, c) => (
                            <td key={c} className="px-3 py-2 text-primary/80">{cell}</td>
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
  );
};
