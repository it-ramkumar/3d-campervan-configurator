export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center" style={{ backgroundColor: '#020C18' }}>
      {/* Van animation container */}
      <div className="w-48 h-48 mb-4">
        {/* Slot for GIF or animation asset */}
      </div>

      <div className="flex flex-col items-center">
        <h2 className="font-display text-secondary uppercase tracking-wide text-2xl font-bold animate-pulse">
          Initializing Your Van
        </h2>
        <p className="text-secondary/40 mt-2 text-sm">Loading 3D Assets &amp; Configuration...</p>

        {/* Amber progress bar */}
        <div className="w-64 h-[2px] mt-6 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}>
          <div className="h-full bg-hover rounded-full animate-loading-bar"></div>
        </div>

        {/* Amber dot pulse */}
        <div className="flex gap-2 mt-6">
          <span className="w-2 h-2 rounded-full bg-hover animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-hover animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-hover animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-loading-bar {
          animation: loading-bar 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
