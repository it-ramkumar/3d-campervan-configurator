"use client";
import React, { useState, useEffect } from 'react';
import ImageWithSkeleton from '../../Common/ImageWithSkeleton/ImageWithSkeleton';

export default function Detail({ setIsopen, detail }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [gallery, setGallery] = useState(detail.gallery || []);
    const [isMounted, setIsMounted] = useState(false);

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
            {/* Backdrop - darkens the background */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                onClick={closeDrawer}
            />

            {/* Slide-over Panel */}
            <div
                className={`relative w-full max-w-2xl md:max-w-3xl lg:max-w-4xl bg-white h-full shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isMounted ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header/Close Action */}
                <div className="absolute top-4 right-4 z-50">
                    <button
                        onClick={closeDrawer}
                        className="bg-white/90 hover:bg-red-500 hover:text-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group"
                    >
                        <span className="text-2xl font-bold group-hover:rotate-90 transition-transform">&times;</span>
                    </button>
                </div>

                {/* Content Container (Scrollable) */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">

                    {/* Image Gallery Header */}
                    {gallery.length > 0 && (
                        <div className="relative w-full h-[300px] md:h-[450px] bg-gray-900">
                            <ImageWithSkeleton
                                src={gallery[currentImageIndex]}
                                alt={detail.van_listing?.title}
                                className="w-full h-full object-contain"
                            />

                            {/* Sold Status */}
                            {detail.sold && (
                                <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-1.5 rounded-md font-bold text-sm shadow-xl">
                                    SOLD OUT
                                </div>
                            )}

                            {gallery.length > 1 && (
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                    <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs">
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

                        {/* Summary Info */}
                        <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="text-gray-500 block">Published</span>
                                <span className="font-semibold text-gray-800">{formatDate(detail.createdAt)}</span>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="text-gray-500 block">Category</span>
                                <span className="font-semibold text-gray-800">{detail.category?.[0] || 'Uncategorized'}</span>
                            </div>
                        </div>

                        {/* Description Section */}
                        {detail.van_listing?.description && (
                            <div className="mb-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> Description
                                </h3>
                                <p className="text-gray-600 leading-relaxed bg-blue-50/30 p-4 rounded-xl border border-blue-100">
                                    {detail.van_listing.description}
                                </p>
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

                        {/* Features List */}
                        {detail.detailed_features?.map((feature, i) => (
                            <div key={i} className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-purple-600 rounded-full" /> {feature.category}
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                                    {feature.items?.map((item, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-gray-700">
                                            <span className="text-purple-500 mr-2 font-bold">✓</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Video tour */}
                        {videoId && (
                            <div className="mt-12">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Video Walkthrough</h3>
                                <div className="rounded-2xl overflow-hidden shadow-xl aspect-video bg-black">
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
        <div className="flex items-center p-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
            <span className="text-2xl mr-3">{icon}</span>
            <div>
                <p className="text-[10px] uppercase text-gray-400 font-bold leading-none">{label}</p>
                <p className="text-sm font-bold text-gray-800 leading-tight">{value}</p>
            </div>
        </div>
    );
}