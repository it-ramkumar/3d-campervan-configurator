"use client";

// "Save as PDF" on the spec sheet: opens the browser print dialog
// (every browser offers Save as PDF there).
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full border-2 border-primary/15 bg-white px-6 py-4 text-sm font-bold uppercase tracking-wider text-primary"
    >
      Save as PDF
    </button>
  );
}
