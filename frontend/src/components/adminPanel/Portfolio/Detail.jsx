"use client";
import React, { useState, useEffect } from 'react';
import { ImageWithSkeleton } from '@/components/Common/Common';

export default function Detail({ setIsopen, detail }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // gallery/rendering are string[]; normalise legacy { url } objects from old data
    const normalizeImages = (arr) =>
        (arr || []).map((item) => (typeof item === "string" ? item : item?.url)).filter(Boolean);

    const gallery = normalizeImages(detail.gallery);
    const rendering = normalizeImages(detail.rendering);
    const blocks = [...(detail.blocks || [])].filter((b) => b.is_active !== false).sort((a, b) => a.order - b.order);

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
        return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
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
    const isPublished = Boolean(detail.is_published);
    const isSold = Boolean(detail.sold);

    const formattedPrice = detail.formatted_price
        || (Number(detail.van_listing?.price) > 0 ? `$${Number(detail.van_listing.price).toLocaleString()}` : null);

    return (
        <div className="fixed inset-0 z-[60] flex justify-end overflow-hidden" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                onClick={closeDrawer}
            />

            {/* Slide-over Panel */}
            <div className={`relative w-full max-w-2xl md:max-w-3xl lg:max-w-4xl bg-[#f8fafc] h-full shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isMounted ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Fixed Header */}
                <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 truncate max-w-md">
                            {detail.van_listing?.title || "Untitled Project"}
                        </h2>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                            Slug: {detail.slug} • {isPublished ? "Published" : "Draft"}{isSold && " • Sold"}
                        </p>
                    </div>
                    <button
                        onClick={closeDrawer}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">

                    {/* Hero Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square bg-slate-900 rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
                            {gallery.length > 0 ? (
                                <ImageWithSkeleton
                                    src={gallery[currentImageIndex]}
                                    alt={detail.van_listing?.title}
                                    className="w-full h-full object-contain"
                                    overlay={false}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm font-medium">
                                    No gallery images
                                </div>
                            )}

                            {/* Status pills */}
                            <div className="absolute top-4 left-4 z-10 flex gap-2">
                                <span className={`${isPublished ? "bg-emerald-600" : "bg-slate-500"} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase`}>
                                    {isPublished ? "Published" : "Draft"}
                                </span>
                                {isSold && (
                                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase">
                                        Sold
                                    </span>
                                )}
                            </div>

                            {/* Download current image */}
                            {gallery.length > 0 && (
                                <button
                                    onClick={(e) => downloadImage(e)}
                                    disabled={isDownloading}
                                    title="Download image"
                                    aria-label="Download image"
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 shadow-md hover:bg-white text-slate-800 transition-all disabled:opacity-50 disabled:cursor-wait"
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
                            )}

                            {/* Prev/Next */}
                            {gallery.length > 1 && (
                                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                                    <button onClick={prevImage} className="p-2 rounded-full bg-white/90 shadow-md pointer-events-auto hover:bg-white text-slate-800" aria-label="Previous Image">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    <button onClick={nextImage} className="p-2 rounded-full bg-white/90 shadow-md pointer-events-auto hover:bg-white text-slate-800" aria-label="Next Image">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                            )}

                            {/* Counter */}
                            {gallery.length > 1 && (
                                <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                                    <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium border border-white/20">
                                        {currentImageIndex + 1} / {gallery.length}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail strip */}
                        {gallery.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {gallery.map((img, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                                            idx === currentImageIndex ? "border-blue-500" : "border-transparent opacity-60 hover:opacity-100"
                                        }`}
                                    >
                                        <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-8">

                            {/* Description */}
                            {detail.van_listing?.description && (
                                <section>
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Description</h3>
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                                        {detail.van_listing?.subtitle && (
                                            <p className="text-slate-500 text-sm italic">{detail.van_listing.subtitle}</p>
                                        )}
                                        <p className="text-slate-700 leading-relaxed italic">&ldquo;{detail.van_listing.description}&rdquo;</p>
                                    </div>
                                </section>
                            )}

                            {/* Renderings / Floor Plans */}
                            {rendering.length > 0 && (
                                <section>
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Renderings</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {rendering.map((url, i) => (
                                            <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 group/render">
                                                <ImageWithSkeleton src={url} alt={`Rendering ${i + 1}`} className="w-full h-full object-cover" overlay={false} />
                                                <button
                                                    onClick={(e) => downloadImage(e, url, i)}
                                                    title="Download rendering"
                                                    aria-label="Download rendering"
                                                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 shadow-md hover:bg-white text-slate-800 transition-all opacity-0 group-hover/render:opacity-100"
                                                >
                                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Dynamic Blocks */}
                            {blocks.length > 0 && (
                                <section className="space-y-6">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Full Details</h3>
                                    <div className="space-y-6">
                                        {blocks.map((block, idx) => (
                                            <div key={block._id || idx}>

                                                {block.block_type === "heading" && (
                                                    <div className="mt-4">
                                                        <h2 className="text-2xl font-bold text-slate-800">{block.title}</h2>
                                                        {block.subtitle && <p className="text-slate-500 mt-1">{block.subtitle}</p>}
                                                    </div>
                                                )}

                                                {block.block_type === "subheading" && (
                                                    <h3 className="text-lg font-semibold text-slate-700 mt-2">{block.title}</h3>
                                                )}

                                                {block.block_type === "paragraph" && (
                                                    <p className="text-slate-600 leading-relaxed">{block.content}</p>
                                                )}

                                                {block.block_type === "list" && (
                                                    <div>
                                                        {block.title && <h4 className="font-bold text-slate-800 mb-2">{block.title}</h4>}
                                                        <ul className="list-disc list-inside space-y-1 text-slate-600">
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
                                                    <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                                                        {block.title && <div className="bg-slate-50 p-3 border-b font-bold text-slate-700">{block.title}</div>}
                                                        <div className="overflow-x-auto">
                                                            <table className="w-full text-left text-sm">
                                                                <thead className="bg-slate-100 text-slate-600 font-bold">
                                                                    <tr>{block.table_data.headers.map((h, i) => <th key={i} className="px-4 py-2 border-b">{h}</th>)}</tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-slate-100 bg-white">
                                                                    {block.table_data.rows.map((row, ri) => (
                                                                        <tr key={ri} className="hover:bg-slate-50">
                                                                            {row.map((cell, ci) => <td key={ci} className="px-4 py-2 text-slate-600">{cell}</td>)}
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
                                                            <div key={mi} className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                                                {m.type === "image" && <img src={m.url} alt={m.alt || ""} className="w-full h-48 object-cover" />}
                                                                {m.type === "video" && <video src={m.url} controls poster={m.thumbnail} className="w-full h-48 object-cover" />}
                                                                {m.type === "iframe" && <iframe src={m.url} title={m.alt || "embed"} className="w-full h-48 border-0" allowFullScreen />}
                                                                {m.type === "pdf" && (
                                                                    <a href={m.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-4 text-blue-600 font-medium hover:underline">
                                                                        <span>📄</span> {m.alt || "View PDF"}
                                                                    </a>
                                                                )}
                                                                {m.caption && <p className="text-xs text-slate-500 p-2 bg-slate-50">{m.caption}</p>}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {block.block_type === "feature-grid" && (
                                                    <div>
                                                        {block.title && <h3 className="text-lg font-bold text-slate-800 mb-1">{block.title}</h3>}
                                                        {block.subtitle && <p className="text-sm text-slate-500 mb-3">{block.subtitle}</p>}
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                            {(block.items || []).map((item, ii) => (
                                                                <div key={ii} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                                                                    {item.icon && <span className="text-2xl shrink-0">{item.icon}</span>}
                                                                    <div>
                                                                        {item.title && <p className="font-semibold text-slate-800 text-sm">{item.title}</p>}
                                                                        {item.description && <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {block.block_type === "stats" && (
                                                    <div>
                                                        {block.title && <h3 className="text-lg font-bold text-slate-800 mb-1">{block.title}</h3>}
                                                        {block.subtitle && <p className="text-sm text-slate-500 mb-3">{block.subtitle}</p>}
                                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                            {(block.items || []).map((item, ii) => (
                                                                <div key={ii} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
                                                                    <p className="text-2xl font-black text-slate-900">{item.value}</p>
                                                                    <p className="text-xs font-semibold text-slate-600 mt-1">{item.title}</p>
                                                                    {item.description && <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {block.block_type === "quote" && (
                                                    <blockquote className="border-l-4 border-slate-300 pl-4 py-1">
                                                        <p className="text-slate-600 italic leading-relaxed">&ldquo;{block.content}&rdquo;</p>
                                                        {block.title && <footer className="text-xs text-slate-400 mt-2 font-semibold">— {block.title}</footer>}
                                                    </blockquote>
                                                )}

                                                {block.block_type === "cta" && (
                                                    <div className="p-6 bg-slate-800 text-white rounded-xl text-center space-y-3">
                                                        {block.title && <h3 className="text-xl font-bold">{block.title}</h3>}
                                                        {block.subtitle && <p className="text-slate-300 text-sm">{block.subtitle}</p>}
                                                        {block.content && <p className="text-slate-400 text-sm">{block.content}</p>}
                                                        {block.button?.label && (
                                                            <a
                                                                href={block.button.url || "#"}
                                                                target={block.button.target === "blank" ? "_blank" : "_self"}
                                                                rel="noreferrer"
                                                                className="inline-block mt-2 px-6 py-2 bg-white text-slate-800 font-bold rounded-lg hover:bg-slate-100 transition-colors"
                                                            >
                                                                {block.button.label}
                                                            </a>
                                                        )}
                                                    </div>
                                                )}

                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Detailed Features */}
                            {detail.detailed_features?.filter(f => f.items?.length > 0).length > 0 && (
                                <section>
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Features Overview</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {detail.detailed_features.filter(f => f.items?.length > 0).map((feat, idx) => (
                                            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                                <h4 className="font-bold text-slate-800 text-sm mb-2">{feat.category}</h4>
                                                <ul className="space-y-1">
                                                    {feat.items.map((item, i) => (
                                                        <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0" /> {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Video Walkthrough */}
                            {videoIds.length > 0 && (
                                <section>
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                                        Video Walkthrough{videoIds.length > 1 ? "s" : ""}
                                    </h3>
                                    <div className="space-y-4">
                                        {videoIds.map((id, i) => (
                                            <div key={id + i} className="rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-video bg-black">
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${id}`}
                                                    className="w-full h-full"
                                                    allowFullScreen
                                                    title={`Tour ${i + 1}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-4">
                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 md:sticky md:top-20">
                                <div className="border-b border-slate-100 pb-3">
                                    <p className="text-xs text-slate-500 font-medium">Listing Price</p>
                                    <p className="text-2xl font-black text-slate-900">{formattedPrice || "N/A"}</p>
                                </div>

                                <div className="space-y-3">
                                    <SpecItem label="Make/Model" value={detail.van_listing?.specifications?.make_model} />
                                    <SpecItem label="Wheelbase" value={detail.van_listing?.specifications?.wheelbase} />
                                    <SpecItem label="Drivetrain" value={detail.van_listing?.specifications?.drivetrain} />
                                    <SpecItem label="Roof" value={detail.van_listing?.roof} />
                                    <SpecItem label="Bathroom" value={detail.van_listing?.bathroomType} />
                                    <SpecItem label="Bed Type" value={detail.van_listing?.bedType} />
                                    <SpecItem label="Size" value={detail.van_listing?.size} />
                                    <SpecItem label="Capacity" value={`${detail.van_listing?.specifications?.capacity?.sits ?? "?"} Sits / ${detail.van_listing?.specifications?.capacity?.sleeps ?? "?"} Sleeps`} />
                                </div>

                                <div className="border-t border-slate-100 pt-3 space-y-3">
                                    <SpecItem label="Client Name" value={detail.van_listing?.clientName} />
                                    <SpecItem label="Status" value={isPublished ? "Published" : "Draft"} />
                                    <SpecItem label="Sold" value={isSold ? "Yes" : "No"} />
                                    <SpecItem label="Created" value={formatDate(detail.createdAt)} />
                                    <SpecItem label="Updated" value={formatDate(detail.updatedAt)} />
                                </div>

                                <div className="border-t border-slate-100 pt-3">
                                    <p className="text-sm text-slate-500 mb-1.5">Categories</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {detail.category?.length > 0
                                            ? detail.category.map((cat, i) => (
                                                <span key={i} className="text-[11px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md">{cat}</span>
                                            ))
                                            : <span className="text-sm font-semibold text-slate-800">Uncategorized</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const SpecItem = ({ label, value }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-slate-500">{label}</span>
        <span className="font-semibold text-slate-800 text-right ml-2">{value || 'N/A'}</span>
    </div>
);
