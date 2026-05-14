"use client";
import React, { useState, useEffect } from 'react';
import { ImageWithSkeleton } from '@/components/Common/Common';

export default function Detail({ setIsopen, detail }) {
    const [isMounted, setIsMounted] = useState(false);
    const gallery = detail.gallery || [];
console.log(detail,"data blog");
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const closeDrawer = () => {
        setIsMounted(false);
        setTimeout(() => setIsopen(false), 300);
    };
    return (
        <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
            {/* Overlay */}
            <div
                className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                onClick={closeDrawer}
            />

            {/* Slide-over Panel */}
            <div className={`relative w-full max-w-2xl bg-white h-full shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isMounted ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Fixed Header */}
                <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
                    <h2 className="text-xl font-bold text-gray-800 truncate">{detail.title}</h2>
                    <button onClick={closeDrawer} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-2xl leading-none">&times;</button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Gallery Section */}
                    {gallery.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
                            {gallery.map((img, idx) => (
                                <div key={idx} className={idx === 0 && gallery.length % 2 !== 0 ? "col-span-2" : "col-span-1"}>
                                    <ImageWithSkeleton src={img} className="w-full h-48 object-cover" />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Main Description */}
                    <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                        <p className="text-gray-700 leading-relaxed italic">{detail.description}</p>
                    </div>

                    {/* Dynamic Content Sections */}
                    <div className="space-y-8">
                        {detail.content?.map((item, index) => {
                            switch (item.type) {
                                case 'paragraph':
                                    return (
                                        <div key={item._id} className="prose prose-blue max-w-none">
                                            <p className="text-gray-600 leading-relaxed">{item.text}</p>
                                        </div>
                                    );

                                case 'table':
                                    return (
                                        <div key={item._id} className="overflow-hidden border border-gray-200 rounded-lg">
                                            <table className="w-full text-sm text-left">
                                                <tbody className="divide-y divide-gray-200">
                                                    {item.rows.map((row, rIdx) => (
                                                        <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                            {row.map((cell, cIdx) => (
                                                                <td key={cIdx} className="px-4 py-3 text-gray-700 font-medium border-r last:border-0">{cell}</td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    );

                                case 'proscons':
                                    return (
                                        <div key={item._id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                                <h4 className="text-green-700 font-bold mb-3 flex items-center gap-2">✅ Pros</h4>
                                                <ul className="space-y-2">
                                                    {item.pros.map((pro, i) => <li key={i} className="text-sm text-green-800 flex items-start gap-2"><span>•</span> {pro}</li>)}
                                                </ul>
                                            </div>
                                            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                                <h4 className="text-red-700 font-bold mb-3 flex items-center gap-2">❌ Cons</h4>
                                                <ul className="space-y-2">
                                                    {item.cons.map((con, i) => <li key={i} className="text-sm text-red-800 flex items-start gap-2"><span>•</span> {con}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    );

                                default:
                                    return null;
                            }
                        })}
                    </div>

                    {/* Footer Info */}
                    <div className="pt-6 border-t border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest">
                        Created At: {new Date(detail.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
}