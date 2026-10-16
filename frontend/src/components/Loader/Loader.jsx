import React from "react";

// Pine trees repeat every 80px; the strip slides exactly one period so the loop is seamless
const TREES = Array.from({ length: 9 }, (_, i) => i * 80);
// Road dashes repeat every 40px for the same reason
const DASHES = Array.from({ length: 17 }, (_, i) => i * 40);

const Wheel = ({ cx }) => (
  <g className="bbvl-wheel" style={{ transformOrigin: `${cx}px 112px` }}>
    <circle cx={cx} cy="112" r="13" fill="#001F3D" />
    <circle cx={cx} cy="112" r="6.5" fill="#FBFBF9" />
    <circle cx={cx} cy="112" r="2" fill="#ED985F" />
    {[0, 60, 120].map((deg) => (
      <rect key={deg} x={cx - 0.75} y="106" width="1.5" height="12" fill="#001F3D" transform={`rotate(${deg} ${cx} 112)`} />
    ))}
  </g>
);

/**
 * The Big Bear Vans loader: a camper van driving past the mountains. Use it for every page,
 * panel and 3D-model loading state (small button spinners excepted).
 *
 * label       what is loading
 * fullScreen  true: covers the screen (pages). false: a compact card that sits inside its
 *             parent, e.g. a panel or a 3D canvas via drei's <Html center>
 * progress    0-100 from useProgress() for 3D models; shown as a % bar while downloading,
 *             otherwise the bar runs indeterminate
 */
export default function BigBearLoader({ label = "Loading your next adventure", fullScreen = true, progress }) {
  const pct = Number.isFinite(progress) ? Math.min(100, Math.max(0, Math.round(progress))) : null;
  const downloading = pct !== null && pct > 0 && pct < 100;

  return (
    <div
      role="status"
      aria-live="polite"
      className={
        fullScreen
          ? "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-secondary px-6"
          : "flex w-72 max-w-[90vw] flex-col items-center rounded-2xl bg-secondary px-6 py-5 shadow-2xl pointer-events-none select-none"
      }
    >
      <svg viewBox="0 0 320 150" className={`w-full h-auto ${fullScreen ? "max-w-[420px]" : ""}`} aria-hidden="true">
        {/* Sun + mountains (static backdrop) */}
        <circle cx="250" cy="44" r="16" fill="#ED985F" opacity="0.18" />
        <path d="M0 126 L58 62 L96 98 L140 50 L196 106 L236 72 L320 126 Z" fill="#001F3D" opacity="0.06" />
        <path d="M140 50 L156 68 L148 66 L140 74 L132 66 L124 68 Z" fill="#FBFBF9" opacity="0.9" />
        <path d="M0 126 L40 96 L84 118 L130 88 L176 120 L228 92 L280 116 L320 100 L320 126 Z" fill="#001F3D" opacity="0.08" />

        {/* Pine trees (parallax) */}
        <g className="bbvl-trees">
          {TREES.map((x) => (
            <g key={x} fill="#001F3D" opacity="0.12">
              <path d={`M${x + 20} 92 L${x + 30} 110 L${x + 10} 110 Z`} />
              <path d={`M${x + 20} 100 L${x + 33} 122 L${x + 7} 122 Z`} />
              <rect x={x + 18.5} y="122" width="3" height="4" />
              <path d={`M${x + 58} 104 L${x + 65} 116 L${x + 51} 116 Z`} />
              <path d={`M${x + 58} 110 L${x + 67} 124 L${x + 49} 124 Z`} />
            </g>
          ))}
        </g>

        {/* Road */}
        <rect x="0" y="126" width="320" height="24" fill="#001F3D" opacity="0.05" />
        <line x1="0" y1="126" x2="320" y2="126" stroke="#001F3D" strokeOpacity="0.25" strokeWidth="1.5" />
        <g className="bbvl-road">
          {DASHES.map((x) => (
            <rect key={x} x={x} y="137" width="20" height="2.5" rx="1.25" fill="#ED985F" opacity="0.7" />
          ))}
        </g>

        {/* Headlight beam */}
        <path className="bbvl-beam" d="M252 97 L312 86 L312 112 Z" fill="#ED985F" />

        {/* Camper van */}
        <g className="bbvl-van">
          {/* shadow */}
          <ellipse cx="160" cy="126" rx="92" ry="3" fill="#001F3D" opacity="0.15" />

          {/* roof rack + solar panel */}
          <rect x="84" y="47" width="2" height="6" fill="#001F3D" />
          <rect x="190" y="47" width="2" height="6" fill="#001F3D" />
          <rect x="88" y="43" width="102" height="6" rx="1" fill="#001F3D" />
          {[105, 122, 139, 156, 173].map((x) => (
            <rect key={x} x={x} y="44" width="0.8" height="4" fill="#FBFBF9" opacity="0.5" />
          ))}

          {/* body */}
          <path
            d="M70 112 L70 61 Q70 52 79 52 L200 52 Q209 52 215 59 L231 84 L245 89 Q252 92 252 100 L252 112 Z"
            fill="#001F3D"
          />
          {/* amber stripe */}
          <rect x="70" y="94" width="182" height="4" fill="#ED985F" />

          {/* windows */}
          <rect x="82" y="62" width="52" height="19" rx="3" fill="#FBFBF9" opacity="0.92" />
          <rect x="146" y="62" width="40" height="19" rx="3" fill="#FBFBF9" opacity="0.92" />
          <path d="M202 58 L213 58 L227 82 L202 82 Z" fill="#FBFBF9" opacity="0.92" />
          {/* warm interior glow */}
          <rect x="86" y="72" width="44" height="7" rx="2" fill="#ED985F" opacity="0.35" />

          {/* sliding door seam + handle */}
          <line x1="195" y1="57" x2="195" y2="110" stroke="#FBFBF9" strokeOpacity="0.18" strokeWidth="1" />
          <rect x="188" y="86" width="5" height="1.6" rx="0.8" fill="#FBFBF9" opacity="0.5" />

          {/* headlight + bumper */}
          <rect x="244" y="94" width="7" height="5" rx="1.5" fill="#ED985F" />
          <rect x="248" y="106" width="6" height="5" rx="1" fill="#001F3D" />

          {/* wheel arches */}
          <circle cx="100" cy="112" r="16" fill="#FBFBF9" />
          <circle cx="218" cy="112" r="16" fill="#FBFBF9" />
          <Wheel cx={100} />
          <Wheel cx={218} />
        </g>
      </svg>

      <p className={`${fullScreen ? "mt-6" : "mt-3"} font-display text-primary uppercase font-bold tracking-[0.3em] text-sm`}>
        Big Bear Vans
      </p>
      <p className="mt-2 font-body text-primary/60 text-xs uppercase tracking-[0.2em] text-center">
        {label}
        {downloading && ` · ${pct}%`}
      </p>

      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={downloading ? pct : undefined}
        className="mt-4 w-40 h-1 rounded-full bg-primary/10 overflow-hidden"
      >
        {downloading ? (
          <div className="h-full rounded-full bg-hover transition-[width] duration-300" style={{ width: `${pct}%` }} />
        ) : (
          <div className="bbvl-progress h-full w-1/3 rounded-full bg-hover" />
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .bbvl-wheel { animation: bbvl-spin 0.6s linear infinite; }
            .bbvl-van { animation: bbvl-bounce 0.45s ease-in-out infinite alternate; }
            .bbvl-trees { animation: bbvl-slide-80 2.4s linear infinite; }
            .bbvl-road { animation: bbvl-slide-40 0.5s linear infinite; }
            .bbvl-beam { opacity: 0.12; animation: bbvl-beam 1.6s ease-in-out infinite; }
            .bbvl-progress { animation: bbvl-progress 1.4s ease-in-out infinite; }
            @keyframes bbvl-spin { to { transform: rotate(360deg); } }
            @keyframes bbvl-bounce { to { transform: translateY(-1.5px); } }
            @keyframes bbvl-slide-80 { to { transform: translateX(-80px); } }
            @keyframes bbvl-slide-40 { to { transform: translateX(-40px); } }
            @keyframes bbvl-beam { 50% { opacity: 0.22; } }
            @keyframes bbvl-progress { 0% { transform: translateX(-110%); } 100% { transform: translateX(320%); } }
            @media (prefers-reduced-motion: reduce) {
              .bbvl-wheel, .bbvl-van, .bbvl-trees, .bbvl-road, .bbvl-beam, .bbvl-progress { animation: none; }
            }
          `,
        }}
      />
    </div>
  );
}
