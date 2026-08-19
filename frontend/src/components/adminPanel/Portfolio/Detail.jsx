"use client";
import React, { useState, useEffect } from 'react';
import { ImageWithSkeleton } from '@/components/Common/Common';
export default function Detail({ setIsopen, detail }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [gallery, setGallery] = useState(detail.gallery || []);
    const [isMounted, setIsMounted] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // Trigger slide-in animation on mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const closeDrawer = () => {
        setIsMounted(false);
        setTimeout(() => setIsopen(false), 300); // Wait for slide-out animation
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Navigation Logic
    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
    };

    // Extracts a filename from an image URL, falling back to a listing-based name
    const getImageFilename = (url, index) => {
        try {
            const pathname = new URL(url, window.location.origin).pathname;
            const base = pathname.split('/').pop();
            if (base && base.includes('.')) return base;
        } catch { /* fall through to default */ }
        const slugPart = detail?.slug || detail?.van_listing?.title || 'image';
        return `${slugPart}-${index + 1}.jpg`;
    };

    // Downloads the current (or a specific) gallery image as a file, not a new tab.
    // Cross-origin <a download> links get ignored by the browser and just open the
    // image instead, so we fetch the bytes ourselves and save from a blob URL.
    const downloadImage = async (e, url = gallery[currentImageIndex], index = currentImageIndex) => {
        if (e) e.stopPropagation();
        if (!url || isDownloading) return;
        setIsDownloading(true);
        try {
            const res = await fetch(url, { mode: 'cors' });
            if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = getImageFilename(url, index);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (err) {
            // Fallback: open in a new tab so the user can save it manually
            // (handles CORS-blocked hosts that don't send Access-Control-Allow-Origin)
            console.error('Image download failed, falling back to opening the image:', err);
            window.open(url, '_blank', 'noopener,noreferrer');
        } finally {
            setIsDownloading(false);
        }
    };

    // Video ID extractor
    function getYouTubeVideoId(url) {
        try {
            if (!url || typeof url !== "string") return null;
            if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
            const urlObj = new URL(url);
            return urlObj.searchParams.get("v") || urlObj.pathname.split("/").pop();
        } catch { return null; }
    }

    const videoIds = (detail?.media || []).map(getYouTubeVideoId).filter(Boolean);
    const blocks = [...(detail.blocks || [])].filter((b) => b.is_active !== false).sort((a, b) => a.order - b.order);
    const rendering = detail.rendering || [];

    return (
        <div
            className="fixed inset-0 z-[100] flex justify-end overflow-hidden"
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                onClick={closeDrawer}
            />

            {/* Slide-over Panel */}
            <div
                className={`relative w-full max-w-2xl md:max-w-3xl lg:max-w-4xl bg-[#f8fafc] h-full shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isMounted ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header/Close Button */}
                <div className="absolute top-4 right-4 z-50">
                    <button
                        onClick={closeDrawer}
                        className="bg-white/90 hover:bg-red-500 hover:text-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group"
                    >
                        <span className="text-2xl font-bold group-hover:rotate-90 transition-transform">&times;</span>
                    </button>
                </div>

                {/* Content Container */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">

                    {/* Image Gallery Header */}
                    {gallery.length > 0 && (
                        <div className="relative w-full h-[300px] md:h-[450px] bg-gray-900 group">
                            <ImageWithSkeleton
                                src={gallery[currentImageIndex]}
                                alt={detail.van_listing?.title}
                                className="w-full h-full object-contain"
                            />

                            {/* Download Button */}
                            <button
                                onClick={(e) => downloadImage(e)}
                                disabled={isDownloading}
                                title="Download image"
                                aria-label="Download image"
                                className="absolute top-4 left-4 bg-black/40 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all disabled:opacity-50 disabled:cursor-wait"
                            >
                                {isDownloading ? (
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                                    </svg>
                                )}
                            </button>

                            {/* Navigation Controls */}
                            {gallery.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                                        aria-label="Previous Image"
                                    >
                                        <span className="text-2xl">❮</span>
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                                        aria-label="Next Image"
                                    >
                                        <span className="text-2xl">❯</span>
                                    </button>
                                </>
                            )}

                            {/* Sold Status */}
                            {detail.sold && (
                                <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-1.5 rounded-md font-bold text-sm shadow-xl">
                                    SOLD OUT
                                </div>
                            )}

                            {/* Image Counter Indicator */}
                            {gallery.length > 1 && (
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                                    <div className="bg-black/50 backdrop-blur-md px-4 py-1 rounded-full text-white text-xs font-medium border border-white/20">
                                        {currentImageIndex + 1} / {gallery.length}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Content Body */}
                    <div className="p-6 md:p-10">
                        {/* Title & Price */}
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-2">
                                {detail.van_listing?.title}
                            </h1>
                            <p className="text-xl text-gray-500 mb-4">{detail.van_listing?.subtitle}</p>
                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-bold text-green-600">
                                    {detail.formatted_price || detail.van_listing?.price}
                                </span>
                            </div>
                        </div>

                        {/* Summary Info Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Slug</span>
                                <span className="font-bold text-gray-800 break-all">{detail.slug}</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Status</span>
                                <span className="font-bold text-gray-800">
                                    {detail.is_published ? "Published" : "Draft"}{detail.sold ? " · Sold" : ""}
                                </span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Categories</span>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                    {detail.category?.length > 0
                                        ? detail.category.map((cat, i) => (
                                            <span key={i} className="text-[11px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md">{cat}</span>
                                        ))
                                        : <span className="font-bold text-gray-800">Uncategorized</span>}
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Created / Updated</span>
                                <span className="font-bold text-gray-800">{formatDate(detail.createdAt)}</span>
                                <span className="text-gray-400"> / </span>
                                <span className="font-bold text-gray-800">{formatDate(detail.updatedAt)}</span>
                            </div>
                        </div>

                        {/* Description */}
                        {detail.van_listing?.description && (
                            <div className="mb-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> Description
                                </h3>
                                <div className="text-gray-600 leading-relaxed bg-blue-50/30 p-5 rounded-2xl border border-blue-100 italic">
                                    "{detail.van_listing.description}"
                                </div>
                            </div>
                        )}

                        {/* Specs Grid */}
                        {(detail.van_listing?.specifications || detail.van_listing?.bathroomType || detail.van_listing?.bedType || detail.van_listing?.size || detail.van_listing?.roof) && (
                            <div className="mb-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-green-600 rounded-full" /> Specifications
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <CompactSpec icon="🚐" label="Model" value={detail.van_listing.specifications?.make_model} />
                                    <CompactSpec icon="📏" label="Wheelbase" value={detail.van_listing.specifications?.wheelbase ? `${detail.van_listing.specifications.wheelbase}"` : null} />
                                    <CompactSpec icon="⚡" label="Drivetrain" value={detail.van_listing.specifications?.drivetrain} />
                                    <CompactSpec icon="💺" label="Sits" value={detail.van_listing.specifications?.capacity?.sits} />
                                    <CompactSpec icon="🛏️" label="Sleeps" value={detail.van_listing.specifications?.capacity?.sleeps} />
                                    <CompactSpec icon="🏠" label="Roof" value={detail.van_listing.roof} />
                                    <CompactSpec icon="🚿" label="Bathroom" value={detail.van_listing.bathroomType} />
                                    <CompactSpec icon="🛌" label="Bed Type" value={detail.van_listing.bedType} />
                                    <CompactSpec icon="📐" label="Size" value={detail.van_listing.size} />
                                </div>
                            </div>
                        )}

                        {/* Renderings */}
                        {rendering.length > 0 && (
                            <div className="mb-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-cyan-600 rounded-full" /> Renderings
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {rendering.map((url, i) => (
                                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-100 group/render">
                                            <ImageWithSkeleton src={url} alt={`Rendering ${i + 1}`} className="w-full h-full object-cover" />
                                            <button
                                                onClick={(e) => downloadImage(e, url, i)}
                                                title="Download rendering"
                                                aria-label="Download rendering"
                                                className="absolute top-2 right-2 bg-black/50 hover:bg-black/80 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover/render:opacity-100"
                                            >
                                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Dynamic Blocks */}
                        {blocks.length > 0 && (
                            <div className="mb-10 space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-slate-700 rounded-full" /> Full Details
                                </h3>
                                {blocks.map((block, idx) => (
                                    <div key={block._id || idx}>
                                        {block.block_type === "heading" && (
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900">{block.title}</h2>
                                                {block.subtitle && <p className="text-gray-500 mt-1">{block.subtitle}</p>}
                                            </div>
                                        )}
                                        {block.block_type === "subheading" && (
                                            <h3 className="text-lg font-semibold text-gray-700">{block.title}</h3>
                                        )}
                                        {block.block_type === "paragraph" && (
                                            <p className="text-gray-600 leading-relaxed">{block.content}</p>
                                        )}
                                        {block.block_type === "list" && (
                                            <div>
                                                {block.title && <h4 className="font-bold text-gray-800 mb-2">{block.title}</h4>}
                                                <ul className="list-disc list-inside space-y-1 text-gray-600">
                                                    {(block.list_items || []).map((item, i) => (
                                                        <li key={i}>
                                                            {item?.text}
                                                            {item?.sub_items?.length > 0 && (
                                                                <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                                                                    {item.sub_items.map((sub, si) => <li key={si}>{sub}</li>)}
                                                                </ul>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {block.block_type === "table" && block.table_data && (
                                            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                                                {block.title && <div className="bg-gray-50 p-3 border-b font-bold text-gray-700">{block.title}</div>}
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-left text-sm">
                                                        <thead className="bg-gray-100 text-gray-600 font-bold">
                                                            <tr>{block.table_data.headers.map((h, i) => <th key={i} className="px-4 py-2 border-b">{h}</th>)}</tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-100 bg-white">
                                                            {block.table_data.rows.map((row, ri) => (
                                                                <tr key={ri} className="hover:bg-gray-50">
                                                                    {row.map((cell, ci) => <td key={ci} className="px-4 py-2 text-gray-600">{cell}</td>)}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
                                        {block.block_type === "media" && (block.block_media || []).length > 0 && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {block.block_media.map((m, mi) => (
                                                    <div key={mi} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                                        {m.type === "image" && <img src={m.url} alt={m.alt || ""} className="w-full h-48 object-cover" />}
                                                        {m.type === "video" && <video src={m.url} controls poster={m.thumbnail} className="w-full h-48 object-cover" />}
                                                        {m.type === "iframe" && <iframe src={m.url} title={m.alt || "embed"} className="w-full h-48 border-0" allowFullScreen />}
                                                        {m.type === "pdf" && (
                                                            <a href={m.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-4 text-blue-600 font-medium hover:underline">
                                                                <span>📄</span> {m.alt || "View PDF"}
                                                            </a>
                                                        )}
                                                        {m.caption && <p className="text-xs text-gray-500 p-2 bg-gray-50">{m.caption}</p>}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {block.block_type === "feature-grid" && (
                                            <div>
                                                {block.title && <h3 className="text-lg font-bold text-gray-800 mb-1">{block.title}</h3>}
                                                {block.subtitle && <p className="text-sm text-gray-500 mb-3">{block.subtitle}</p>}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {(block.items || []).map((item, ii) => (
                                                        <div key={ii} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                                                            {item.icon && <span className="text-2xl shrink-0">{item.icon}</span>}
                                                            <div>
                                                                {item.title && <p className="font-semibold text-gray-800 text-sm">{item.title}</p>}
                                                                {item.description && <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {block.block_type === "stats" && (
                                            <div>
                                                {block.title && <h3 className="text-lg font-bold text-gray-800 mb-1">{block.title}</h3>}
                                                {block.subtitle && <p className="text-sm text-gray-500 mb-3">{block.subtitle}</p>}
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                    {(block.items || []).map((item, ii) => (
                                                        <div key={ii} className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm text-center">
                                                            <p className="text-2xl font-black text-gray-900">{item.value}</p>
                                                            <p className="text-xs font-semibold text-gray-600 mt-1">{item.title}</p>
                                                            {item.description && <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {block.block_type === "quote" && (
                                            <blockquote className="border-l-4 border-gray-300 pl-4 py-1">
                                                <p className="text-gray-600 italic leading-relaxed">&ldquo;{block.content}&rdquo;</p>
                                                {block.title && <footer className="text-xs text-gray-400 mt-2 font-semibold">— {block.title}</footer>}
                                            </blockquote>
                                        )}
                                        {block.block_type === "cta" && (
                                            <div className="p-6 bg-gray-800 text-white rounded-xl text-center space-y-3">
                                                {block.title && <h3 className="text-xl font-bold">{block.title}</h3>}
                                                {block.subtitle && <p className="text-gray-300 text-sm">{block.subtitle}</p>}
                                                {block.content && <p className="text-gray-400 text-sm">{block.content}</p>}
                                                {block.button?.label && (
                                                    <a
                                                        href={block.button.url || "#"}
                                                        target={block.button.target === "blank" ? "_blank" : "_self"}
                                                        rel="noreferrer"
                                                        className="inline-block mt-2 px-6 py-2 bg-white text-gray-800 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                                                    >
                                                        {block.button.label}
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Detailed Features */}
                        {detail.detailed_features?.map((feature, i) => (
                            <div key={i} className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-purple-600 rounded-full" /> {feature.category}
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4">
                                    {feature.items?.map((item, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-700 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                                            <span className="text-purple-500 mr-2 font-bold bg-purple-50 w-6 h-6 flex items-center justify-center rounded-full">✓</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Video tour(s) */}
                        {videoIds.length > 0 && (
                            <div className="mt-12 space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Video Walkthrough{videoIds.length > 1 ? "s" : ""}
                                </h3>
                                {videoIds.map((id, i) => (
                                    <div key={id + i} className="rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black border-4 border-white">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${id}`}
                                            className="w-full h-full"
                                            allowFullScreen
                                            title={`Tour ${i + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Compact UI Helper
function CompactSpec({ icon, label, value }) {
    if (!value || value === "null" || value === "") return null;
    return (
        <div className="flex items-center p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all cursor-default group">
            <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">{icon}</span>
            <div>
                <p className="text-[10px] uppercase text-gray-400 font-bold leading-none mb-1">{label}</p>
                <p className="text-sm font-bold text-gray-800 leading-tight">{value}</p>
            </div>
        </div>
    );
}