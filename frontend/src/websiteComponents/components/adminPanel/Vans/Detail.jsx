import React, { useState } from 'react';
import ImageWithSkeleton from '../../Common/ImageWithSkeleton/ImageWithSkeleton';

export default function Detail({ setIsopen, detail }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const gallery = detail.gallery || [];

  const getYouTubeVideoId = (url) => {
    try {
      if (!url || typeof url !== "string") return null;
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      return match ? match[1] : null;
    } catch { return null; }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-slate-900/40 backdrop-blur-sm transition-opacity">
      {/* Clickable Backdrop to close */}
      <div className="absolute inset-0" onClick={() => setIsopen(false)} />

      {/* Main Panel */}
      <div className="relative w-full max-w-4xl bg-[#f8fafc] h-full shadow-2xl flex flex-col animate-slide-in">

        {/* Fixed Header */}
        <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 truncate max-w-md">
              {detail.van_listing?.title}
            </h2>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              ID: {detail._id?.slice(-6)} • {detail.category?.[0]}
            </p>
          </div>
          <button
            onClick={() => setIsopen(false)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">

          {/* Hero Gallery Section */}
          <div className="space-y-4">
            <div className="relative aspect-video bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              {detail.sold && (
                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  SOLD
                </div>
              )}

              <ImageWithSkeleton
                src={gallery[currentImageIndex]}
                alt="Main view"
                className="w-full h-full object-cover"
              />

              {gallery.length > 1 && (
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? gallery.length - 1 : prev - 1)}
                    className="p-2 rounded-full bg-white/90 shadow-md pointer-events-auto hover:bg-white text-slate-800 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === gallery.length - 1 ? 0 : prev + 1)}
                    className="p-2 rounded-full bg-white/90 shadow-md pointer-events-auto hover:bg-white text-slate-800 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === i ? 'border-blue-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="thumb" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <section>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Description</h3>
                <p className="text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  {detail.van_listing?.description}
                </p>
              </section>

              {/* Detailed Features */}
              {detail.detailed_features?.length > 0 && (
                <section>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Detailed Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {detail.detailed_features.map((feat, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-slate-800 text-sm mb-2">{feat.category}</h4>
                        <ul className="space-y-1">
                          {feat.items.map((item, i) => (
                            <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sticky Sidebar Specs */}
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <p className="text-xs text-slate-500 font-medium">Listing Price</p>
                  <p className="text-2xl font-black text-slate-900">{detail.formatted_price}</p>
                </div>

                <div className="space-y-3">
                  <SpecItem label="Drivetrain" value={detail.van_listing?.specifications?.drivetrain} />
                  <SpecItem label="Wheelbase" value={detail.van_listing?.specifications?.wheelbase} />
                  <SpecItem label="Capacity" value={`${detail.van_listing?.specifications?.capacity?.sits} Sits / ${detail.van_listing?.specifications?.capacity?.sleeps} Sleeps`} />
                  <SpecItem label="Updated" value={formatDate(detail.updatedAt)} />
                </div>
              </div>

              {/* Media Preview */}
              {detail.media?.length > 0 && detail.media[0] !== "" && (
                <div className="bg-slate-900 rounded-xl overflow-hidden aspect-video shadow-lg group relative">
                  {getYouTubeVideoId(detail.media[0]) ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(detail.media[0])}`}
                      className="w-full h-full"
                      title="Video"
                      allowFullScreen
                    />
                  ) : (
                    <div className="p-4 text-white text-xs truncate">{detail.media[0]}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact Spec Item Sub-component
const SpecItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-slate-500">{label}</span>
    <span className="font-semibold text-slate-800 text-right ml-2">{value || 'N/A'}</span>
  </div>
);