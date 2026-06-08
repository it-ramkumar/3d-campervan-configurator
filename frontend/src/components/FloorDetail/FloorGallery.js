import React, { useState, useCallback } from "react";
import { ChevronUp, ChevronDown, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

/* ─── THEME ─────────────────────────────────────────────────────────────── */
const T = {
  navy:        "#001F3D",
  gold:        "#C9A84C",
  cream:       "#F5F5F0",
  white:       "#FFFFFF",
  goldAlpha30: "rgba(201,168,76,0.30)",
  goldAlpha12: "rgba(201,168,76,0.12)",
  navyAlpha60: "rgba(0,31,61,0.60)",
  navyAlpha10: "rgba(0,31,61,0.10)",
  whiteAlpha80:"rgba(255,255,255,0.80)",
};

const font = {
  display: "'Bebas Neue', sans-serif",
  body:    "'DM Sans', sans-serif",
};

/* ─── THUMB STACK ───────────────────────────────────────────────────────── */
const THUMB_VISIBLE = 5;

function ThumbStack({ images, active, onSelect }) {
  const [offset, setOffset] = useState(0);

  const canUp   = offset > 0;
  const canDown = offset + THUMB_VISIBLE < images.length;
  const visible = images.slice(offset, offset + THUMB_VISIBLE);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 84, flexShrink: 0 }}>

      <button
        onClick={() => setOffset(o => Math.max(0, o - 1))}
        disabled={!canUp}
        style={navArrow(canUp)}
        aria-label="Scroll thumbnails up"
      >
        <ChevronUp size={14} />
      </button>

      {visible.map((src, i) => {
        const realIdx = offset + i;
        const isActive = realIdx === active;
        return (
          <button
            key={realIdx}
            onClick={() => onSelect(realIdx)}
            style={{
              width: 84, height: 62, padding: 0,
              border: isActive ? `2px solid ${T.gold}` : "2px solid transparent",
              borderRadius: 2, overflow: "hidden", cursor: "pointer",
              background: T.navy, flexShrink: 0,
              transition: "border-color 0.2s, transform 0.15s",
              transform: isActive ? "scale(1.04)" : "scale(1)",
              outline: "none", position: "relative",
            }}
          >
            <img
              src={src}
              alt={`View ${realIdx + 1}`}
              style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                opacity: isActive ? 1 : 0.52,
                transition: "opacity 0.2s",
              }}
            />
            {isActive && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: T.gold }} />
            )}
          </button>
        );
      })}

      <button
        onClick={() => setOffset(o => Math.min(images.length - THUMB_VISIBLE, o + 1))}
        disabled={!canDown}
        style={navArrow(canDown)}
        aria-label="Scroll thumbnails down"
      >
        <ChevronDown size={14} />
      </button>

      <div style={{
        marginTop: 4, fontFamily: font.body, fontSize: 10, fontWeight: 500,
        letterSpacing: "1.5px", textTransform: "uppercase",
        color: T.gold, textAlign: "center",
      }}>
        {active + 1} / {images.length}
      </div>
    </div>
  );
}

const navArrow = (enabled) => ({
  background: "none",
  border: `0.5px solid ${enabled ? T.goldAlpha30 : T.navyAlpha10}`,
  borderRadius: 2, width: "100%", height: 28,
  display: "flex", alignItems: "center", justifyContent: "center",
  cursor: enabled ? "pointer" : "default",
  color: enabled ? T.gold : T.navyAlpha10,
  transition: "background 0.15s", outline: "none",
});

/* ─── LIGHTBOX ──────────────────────────────────────────────────────────── */
function Lightbox({ images, active, onClose, onPrev, onNext }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.94)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <button
        onClick={onClose}
        style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "#fff", cursor: "pointer", opacity: 0.6 }}
        aria-label="Close"
      >
        <X size={28} />
      </button>

      <div style={{
        position: "absolute", top: 22, left: "50%", transform: "translateX(-50%)",
        fontFamily: font.body, fontSize: 11, fontWeight: 500, letterSpacing: "2px",
        color: "rgba(255,255,255,0.45)", textTransform: "uppercase",
      }}>
        {active + 1} &nbsp;/&nbsp; {images.length}
      </div>

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: T.gold }} />

      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); onPrev(); }} style={lbArrow("left")} aria-label="Previous">
          <ChevronLeft size={22} />
        </button>
      )}

      <img
        src={images[active]}
        alt={`Rendering ${active + 1}`}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: "82vw", maxHeight: "82vh",
          objectFit: "contain", borderRadius: 2,
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      />

      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); onNext(); }} style={lbArrow("right")} aria-label="Next">
          <ChevronRight size={22} />
        </button>
      )}

      {images.length > 1 && (
        <div style={{
          position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 8,
        }}>
          {images.map((src, i) => (
            <button
              key={i}
              onClick={e => e.stopPropagation()}
              style={{
                width: 48, height: 34, padding: 0,
                border: i === active ? `2px solid ${T.gold}` : "2px solid rgba(255,255,255,0.18)",
                borderRadius: 2, overflow: "hidden", cursor: "pointer",
                background: "none", opacity: i === active ? 1 : 0.5,
                transition: "opacity 0.2s, border-color 0.2s",
              }}
            >
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const lbArrow = (side) => ({
  position: "absolute", [side]: 28, top: "50%", transform: "translateY(-50%)",
  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)",
  color: "#fff", width: 48, height: 48, borderRadius: "50%",
  display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer", transition: "background 0.2s", outline: "none", zIndex: 1,
});

/* ─── MAIN GALLERY ──────────────────────────────────────────────────────── */
export default function VanGallery({ gallery = [], title = "" }) {
  const [active, setActive]     = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [zoomed, setZoomed]     = useState(false);

  const prev = useCallback(() => setActive(a => (a - 1 + gallery.length) % gallery.length), [gallery.length]);
  const next = useCallback(() => setActive(a => (a + 1) % gallery.length), [gallery.length]);

  if (!gallery.length) {
    return (
      <div style={{
        width: "100%", aspectRatio: "4/3", background: T.navy, borderRadius: 2,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ fontFamily: font.display, fontSize: 28, letterSpacing: 2, color: T.gold, opacity: 0.35 }}>
          No Renderings Yet
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", gap: 10, alignItems: "stretch", width: "100%" }}>

        {/* Main image */}
        <div
          style={{ flex: 1, position: "relative", overflow: "hidden", borderRadius: 2, background: T.navy, cursor: "zoom-in" }}
          onClick={() => setLightbox(true)}
        >
          <img
            key={active}
            src={gallery[active]}
            alt={`${title} — rendering ${active + 1}`}
            style={{
              width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block",
              transition: "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
              transform: zoomed ? "scale(1.06)" : "scale(1)",
            }}
            onMouseEnter={() => setZoomed(true)}
            onMouseLeave={() => setZoomed(false)}
          />

          {/* Gold bottom line */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: T.gold }} />

          {/* Label */}
          <div style={{
            position: "absolute", top: 14, left: 14,
            fontFamily: font.body, fontSize: 9, fontWeight: 500,
            letterSpacing: "2.5px", textTransform: "uppercase",
            color: T.gold, background: "rgba(0,0,0,0.55)",
            padding: "5px 10px", borderRadius: 2,
          }}>
            Rendering
          </div>

          {/* Zoom icon */}
          <div style={{
            position: "absolute", top: 14, right: 14,
            background: "rgba(0,0,0,0.45)", color: T.whiteAlpha80,
            width: 34, height: 34, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: zoomed ? 1 : 0.5, transition: "opacity 0.2s",
          }}>
            <ZoomIn size={15} />
          </div>

          {/* Prev / Next */}
          {gallery.length > 1 && (
            <>
              <button onClick={e => { e.stopPropagation(); prev(); }} style={mainArrow("left")} aria-label="Previous">
                <ChevronLeft size={16} />
              </button>
              <button onClick={e => { e.stopPropagation(); next(); }} style={mainArrow("right")} aria-label="Next">
                <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail stack */}
        {gallery.length > 1 && (
          <ThumbStack images={gallery} active={active} onSelect={setActive} />
        )}
      </div>

      {lightbox && (
        <Lightbox images={gallery} active={active} onClose={() => setLightbox(false)} onPrev={prev} onNext={next} />
      )}
    </>
  );
}

const mainArrow = (side) => ({
  position: "absolute", [side]: 10, top: "50%", transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.42)", border: "none", color: "#fff",
  width: 32, height: 32, borderRadius: "50%",
  display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer", transition: "background 0.2s", outline: "none", zIndex: 2,
});