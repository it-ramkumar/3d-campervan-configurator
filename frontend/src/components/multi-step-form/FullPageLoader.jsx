export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f8fafc] text-dark">
      {/* Yahan aap apna GIF ya CSS Animation dal sakte hain */}
      <div className="w-48 h-48 mb-4">
         {/* Example: Aapka existing GIFVanLoader yahan use ho sakta hai */}
         {/* <img src="/path-to-your-cool-van-anim.gif" alt="Loading..." className="w-full h-full object-contain" /> */}
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold animate-pulse text-gray-800">Initializing Your Van</h2>
        <p className="text-gray-500 mt-2">Loading 3D Assets & Configuration...</p>

        {/* Progress bar (Optional) */}
        <div className="w-64 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
          <div className="h-full bg-dark animate-loading-bar"></div>
        </div>
      </div>

      <style >{`
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
};