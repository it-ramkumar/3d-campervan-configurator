"use client";
import React, { useState } from 'react';
import ImageWithSkeleton from '../../Common/ImageWithSkeleton/ImageWithSkeleton';

export default function Detail({ setIsopen, detail }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [gallery, setGallery] = useState(detail.gallery || []);

    // Format date for better display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // ✅ Safe YouTube video ID extractor
    function getYouTubeVideoId(url) {
        try {
            if (!url || typeof url !== "string") return null;
            if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
            if (!url.startsWith("http")) return null;

            const urlObj = new URL(url);
            return urlObj.searchParams.get("v") || urlObj.pathname.split("/").pop();
        } catch {
            return null;
        }
    }

    const videoUrl = detail?.media?.video?.title || "";
    const videoId = getYouTubeVideoId(videoUrl);

    // Next image in gallery
    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === gallery.length - 1 ? 0 : prev + 1
        );
    };

    // Previous image in gallery
    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? gallery.length - 1 : prev - 1
        );
    };

    // Move image in gallery
    const moveImage = async (fromIndex, toIndex) => {
        if (toIndex >= 0 && toIndex < gallery.length) {
            const newGallery = [...gallery];
            const [movedItem] = newGallery.splice(fromIndex, 1);
            newGallery.splice(toIndex, 0, movedItem);
            setGallery(newGallery);
            setCurrentImageIndex(toIndex);
        }
    };

    // ✅ Close modal function
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsopen(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-0 animate-fadeIn"
            onClick={handleBackdropClick}
        >
            {/* Full screen modal */}
            <div className="relative bg-white w-full h-full overflow-hidden">
                {/* Close button */}
                <button
                    className="fixed top-4 right-4 md:top-6 md:right-6 z-50 bg-white hover:bg-red-500 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-2xl transition-all duration-300 hover:scale-110 hover:text-white group"
                    onClick={() => setIsopen(false)}
                    aria-label="Close"
                >
                    <span className="group-hover:rotate-90 transition-transform duration-300">
                        &times;
                    </span>
                </button>

                {/* Scrollable content */}
                <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    {/* Sold Badge */}
                    {detail.sold && (
                        <div className="absolute top-6 left-6 z-20 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl animate-pulse">
                            ⚠️ SOLD OUT
                        </div>
                    )}

                    {/* Gallery Section */}
                    {gallery.length > 0 && (
                        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] bg-gradient-to-br from-gray-900 to-black overflow-hidden">
                            {/* Main Image */}
                            <ImageWithSkeleton
                                src={gallery[currentImageIndex]}
                                alt={detail.van_listing?.title || 'Van Image'}
                                className="w-full h-full object-contain"
                            />

                            {/* Gallery Navigation */}
                            {gallery.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prevImage();
                                        }}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextImage();
                                        }}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    {/* Image counter */}
                                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold shadow-xl">
                                        📸 {currentImageIndex + 1} / {gallery.length}
                                    </div>
                                </>
                            )}

                            {/* Thumbnail gallery */}
                            <div className="absolute bottom-6 left-6 right-6 flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                                {gallery.map((image, index) => (
                                    <div key={index} className="relative group flex-shrink-0">
                                        <div
                                            className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                                                index === currentImageIndex
                                                    ? 'ring-4 ring-white shadow-2xl scale-110'
                                                    : 'ring-2 ring-white/30 opacity-60 hover:opacity-100 hover:scale-105'
                                            }`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        >
                                            <ImageWithSkeleton
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Reorder Controls */}
                                        <div className="absolute -top-10 left-0 right-0 flex justify-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    moveImage(index, index - 1);
                                                }}
                                                className="bg-blue-500 hover:bg-blue-600 text-white w-7 h-7 rounded-lg text-xs flex items-center justify-center shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
                                                disabled={index === 0}
                                            >
                                                ←
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    moveImage(index, index + 1);
                                                }}
                                                className="bg-green-500 hover:bg-green-600 text-white w-7 h-7 rounded-lg text-xs flex items-center justify-center shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
                                                disabled={index === gallery.length - 1}
                                            >
                                                →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto pb-20">
                        {/* Header Section */}
                        <div className="mb-10 md:mb-12">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                <div className="flex-1">
                                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
                                        {detail.van_listing?.title}
                                    </h1>
                                    {detail.van_listing?.subtitle && (
                                        <h2 className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-4 font-medium">
                                            {detail.van_listing.subtitle}
                                        </h2>
                                    )}
                                    <div className="flex items-center gap-4 flex-wrap">
                                        {(detail.formatted_price || detail.van_listing?.price) && (
                                            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600">
                                                {detail.formatted_price || detail.van_listing?.price}
                                            </span>
                                        )}
                                        {detail.sold && (
                                            <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                                                ❌ SOLD OUT
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-2xl shadow-md border border-gray-200">
                                    <div className="text-sm text-gray-700 space-y-2">
                                        <div className="flex items-center">
                                            <span className="mr-2">📅</span>
                                            <span className="font-semibold">Published:</span>
                                            <span className="ml-2">{formatDate(detail.createdAt)}</span>
                                        </div>
                                        {detail.updatedAt !== detail.createdAt && (
                                            <div className="flex items-center">
                                                <span className="mr-2">✏️</span>
                                                <span className="font-semibold">Updated:</span>
                                                <span className="ml-2">{formatDate(detail.updatedAt)}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Categories */}
                        {detail.category && detail.category.length > 0 && (
                            <div className="mb-8">
                                <div className="flex flex-wrap gap-2">
                                    {detail.category.map((cat, index) => (
                                        <span
                                            key={index}
                                            className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm"
                                        >
                                            🏷️ {cat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        {detail.van_listing?.description && (
                            <div className="mb-10">
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 rounded-2xl border-l-4 border-blue-600 shadow-md">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                        <span className="mr-3 text-2xl">📝</span>
                                        Description
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                                        {detail.van_listing.description}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Specifications Grid */}
                        {detail.van_listing?.specifications && (
                            <div className="mb-10">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-l-4 border-green-600 pl-4">
                                    ⚙️ Specifications
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                    {detail.van_listing.specifications.make_model && (
                                        <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                                            <h4 className="font-bold text-gray-700 mb-2 text-sm uppercase tracking-wide">🚐 Make & Model</h4>
                                            <p className="text-gray-900 text-lg font-semibold">{detail.van_listing.specifications.make_model}</p>
                                        </div>
                                    )}

                                    {detail.van_listing.specifications.wheelbase && (
                                        <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                                            <h4 className="font-bold text-gray-700 mb-2 text-sm uppercase tracking-wide">📏 Wheelbase</h4>
                                            <p className="text-gray-900 text-lg font-semibold">{detail.van_listing.specifications.wheelbase}"</p>
                                        </div>
                                    )}

                                    {detail.van_listing.specifications.drivetrain && (
                                        <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                                            <h4 className="font-bold text-gray-700 mb-2 text-sm uppercase tracking-wide">⚡ Drivetrain</h4>
                                            <p className="text-gray-900 text-lg font-semibold">{detail.van_listing.specifications.drivetrain}</p>
                                        </div>
                                    )}

                                    {detail.van_listing.specifications.capacity?.sits && (
                                        <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                                            <h4 className="font-bold text-gray-700 mb-2 text-sm uppercase tracking-wide">💺 Seating</h4>
                                            <p className="text-gray-900 text-lg font-semibold">{detail.van_listing.specifications.capacity.sits} People</p>
                                        </div>
                                    )}

                                    {detail.van_listing.specifications.capacity?.sleeps && (
                                        <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                                            <h4 className="font-bold text-gray-700 mb-2 text-sm uppercase tracking-wide">🛏️ Sleeping</h4>
                                            <p className="text-gray-900 text-lg font-semibold">{detail.van_listing.specifications.capacity.sleeps} People</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Detailed Features */}
                        {detail.detailed_features && detail.detailed_features.length > 0 && (
                            <div className="mb-10">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-l-4 border-purple-600 pl-4">
                                    ✨ Features & Amenities
                                </h3>
                                <div className="space-y-6">
                                    {detail.detailed_features.map((feature, index) => (
                                        <div key={feature._id || index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 md:p-8 shadow-md border-2 border-purple-200">
                                            {feature.category && (
                                                <h4 className="text-xl md:text-2xl font-bold text-purple-900 mb-5 flex items-center">
                                                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                                                    {feature.category}
                                                </h4>
                                            )}
                                            {feature.items && feature.items.length > 0 && (
                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {feature.items.map((item, itemIndex) => (
                                                        <li key={itemIndex} className="flex items-start text-gray-800 text-sm md:text-base">
                                                            <span className="text-purple-600 mr-3 mt-1 text-lg">✓</span>
                                                            <span className="flex-1">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Blocks Content */}
                        {detail.blocks && detail.blocks.length > 0 && (
                            <div className="mb-10">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-l-4 border-orange-600 pl-4">
                                    📋 Additional Information
                                </h3>
                                <div className="space-y-6">
                                    {detail.blocks.map((block, index) => (
                                        <div key={block._id || index} className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                                            {block.caption && (
                                                <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">{block.caption}</p>
                                            )}
                                            {block.image && (
                                                <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                                                    <ImageWithSkeleton
                                                        src={block.image}
                                                        alt={block.caption || 'Content image'}
                                                        className="w-full h-auto max-h-96 object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Media Section */}
                        {detail.media?.video && (
                            <div className="mb-10">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-l-4 border-red-600 pl-4">
                                    🎥 Video Tour
                                </h3>
                                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-red-200">
                                    <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-5 flex items-center">
                                        <svg className="w-6 h-6 mr-3 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                        </svg>
                                        {detail.media.video.title || "YouTube Video"}
                                    </h4>

                                    {/* YouTube Video Player */}
                                    <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                                        {videoId ? (
                                            <iframe
                                                src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="absolute top-0 left-0 w-full h-full"
                                            ></iframe>
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                                                ⚠️ Invalid or missing YouTube URL
                                            </div>
                                        )}
                                    </div>

                                    {/* Video Info */}
                                    <div className="mt-5 flex justify-between items-center text-sm text-gray-700">
                                        <span className="flex items-center font-semibold">
                                            <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                            </svg>
                                            YouTube Video
                                        </span>

                                        {videoUrl && (
                                            <a
                                                href={
                                                    videoUrl.startsWith("http")
                                                        ? videoUrl
                                                        : `https://www.youtube.com/watch?v=${videoId}`
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 font-semibold underline flex items-center transition-colors duration-200"
                                            >
                                                Watch on YouTube
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}