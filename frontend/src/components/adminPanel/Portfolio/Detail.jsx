"use client";
import React, { useState, useEffect } from 'react';
import { ImageWithSkeleton } from '@/components/Common/Common';
export default function Detail({ setIsopen, detail }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [gallery, setGallery] = useState(detail.gallery || []);
    const [isMounted, setIsMounted] = useState(false);

    console.log(detail,"detail data ")
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

    // Video ID extractor
    function getYouTubeVideoId(url) {
        try {
            if (!url || typeof url !== "string") return null;
            if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
            const urlObj = new URL(url);
            return urlObj.searchParams.get("v") || urlObj.pathname.split("/").pop();
        } catch { return null; }
    }

    const videoUrl = detail?.media?.[0] || "";
    const videoId = getYouTubeVideoId(videoUrl);

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
                                <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Published</span>
                                <span className="font-bold text-gray-800">{formatDate(detail.createdAt)}</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Category</span>
                                <span className="font-bold text-gray-800">{detail.category?.[0] || 'Uncategorized'}</span>
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
                        {detail.van_listing?.specifications && (
                            <div className="mb-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-green-600 rounded-full" /> Specifications
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <CompactSpec icon="🚐" label="Model" value={detail.van_listing.specifications.make_model} />
                                    <CompactSpec icon="📏" label="Wheelbase" value={detail.van_listing.specifications.wheelbase ? `${detail.van_listing.specifications.wheelbase}"` : null} />
                                    <CompactSpec icon="⚡" label="Drivetrain" value={detail.van_listing.specifications.drivetrain} />
                                    <CompactSpec icon="💺" label="Sits" value={detail.van_listing.specifications.capacity?.sits} />
                                    <CompactSpec icon="🛏️" label="Sleeps" value={detail.van_listing.specifications.capacity?.sleeps} />
                                </div>
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

                        {/* Video tour */}
                        {videoId && (
                            <div className="mt-12">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Video Walkthrough</h3>
                                <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black border-4 border-white">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        className="w-full h-full"
                                        allowFullScreen
                                        title="Tour"
                                    />
                                </div>
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