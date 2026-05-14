"use client";
import React, { useState } from "react";
import {
  Share2, Image as ImageIcon, FileText, ThumbsUp,
  ThumbsDown, ChevronRight
} from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Aapke wahi Common Components
import {
  Heading2, Heading4, Heading3,
  RichParagraph, SecondaryButton
} from '@/components/Common/Common';
import Image from "next/image";

export default function BlogContentUI({ blog }) {
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  console.log(blog);
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.description,
          url: window.location.href,
        });
      } catch (err) { console.log('Error sharing:', err); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // --- AAPKI ORIGINAL FORMATTING LOGIC ---
  const formatBoldTags = (text) => {
    if (!text) return text;
    const parts = text.split(/(#[^\s#]+)/g);
    return parts.map((part, i) =>
      part.startsWith("#") ? (
        <strong key={i} className="font-bold text-primary">{part.substring(1)}</strong>
      ) : (
        part
      )
    );
  };

  const formatRichText = (text) => {
    if (!text) return null;

    // Check if it's a list (either contains ":" with following items OR starts with bullet points)
    const hasColonList = text.includes(":") && (text.includes("\n") || text.split(":").length > 1);
    const hasBulletPoints = text.includes("\n•") || text.includes("\n-") || text.startsWith("•") || text.startsWith("-");

    if (hasColonList || hasBulletPoints) {
      let introText = "";
      let listPart = text;

      if (hasColonList) {
        const parts = text.split(":");
        introText = parts[0] + ":";
        listPart = parts.slice(1).join(":"); // Handle multiple colons
      }

      const listItems = listPart
        .split(/[,\n•\-\*]/) // Splitting by comma, newline, or common bullet symbols
        .map(item => item.trim())
        .filter(item => item.length > 0);

      if (listItems.length > 0) {
        return (
          <>
            {introText && (
              <p className="mb-4 text-primary/90 font-semibold">{formatBoldTags(introText)}</p>
            )}
            <ul className="space-y-4 ml-2 mb-6">
              {listItems.map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start text-primary/80">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-hover flex-shrink-0" />
                  <span className="leading-relaxed text-lg">{formatBoldTags(item)}</span>
                </li>
              ))}
            </ul>
          </>
        );
      }
    }
    return formatBoldTags(text);
  };
  // --- AAPKE ORIGINAL BLOCKS (Design intact) ---
  const renderSingleBlock = (block, index) => {
    switch (block.type) {
      case "heading":
        return (
          <div key={index} className="mb-10 mt-16 group">
            <p className="!text-hover font-black text-[10px] tracking-[0.4em] uppercase mb-2">Section {index + 1}</p>
            <Heading2 text={formatBoldTags(block.text)} className="!text-left !text-primary" />
            <div className="w-20 h-1 bg-hover mt-4 rounded-full transition-all group-hover:w-32" />
          </div>
        );

      case "subheading":
        return (
          <div key={index} className="mb-6 mt-12">
            <Heading4 text={formatBoldTags(block.text)} className="!text-left !text-primary/90" />
          </div>
        );

      case "paragraph":
        return (
          <div key={index} className="mb-8 p-0 lg:pr-12">
            {/* Paragraph wraps formatRichText which now handles lists internally */}
            <div className="text-primary/80 leading-[1.8] text-lg font-sans">
              {formatRichText(block.text)}
            </div>
          </div>
        );

      case "image":
        return (
          <div key={index} className="my-12 w-full">
            <div className="rounded-[var(--radius-lg)] overflow-hidden shadow-2xl border border-primary/5">
              <Image src={block.image} alt="Detail" className="w-full h-auto object-cover" width={800} height={600} />
            </div>
            {block.caption && <p className="text-center text-sm text-primary/40 mt-4 italic">{block.caption}</p>}
          </div>
        );
      case "list":
        return (
          <div key={index} className="mb-8 p-0 lg:pr-12">
            <ul className="space-y-4 ml-2">
              {block.items?.map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start text-primary/80">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-hover flex-shrink-0" />
                  <span className="leading-relaxed text-lg">{formatBoldTags(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case "proscons":
        return (
          <div key={index} className="my-16 grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[var(--radius-lg)] overflow-hidden shadow-xl border border-primary/5">
            <div className="bg-white p-10 border-b md:border-b-0 md:border-r border-secondary">
              <div className="flex items-center gap-3 mb-6"><ThumbsUp className="text-green-600" size={24} /><Heading4 text="The Benefits" className="!mb-0" /></div>
              <ul className="space-y-4">
                {block.pros?.map((p, idx) => (
                  <li key={idx} className="text-primary/70 text-sm leading-relaxed flex gap-3 italic">
                    <span className="text-green-500 font-bold">+</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#FAF9F6] p-10">
              <div className="flex items-center gap-3 mb-6"><ThumbsDown className="text-red-600" size={24} /><Heading4 text="Considerations" className="!mb-0" /></div>
              <ul className="space-y-4">
                {block.cons?.map((c, idx) => (
                  <li key={idx} className="text-primary/70 text-sm leading-relaxed flex gap-3 italic">
                    <span className="text-red-400 font-bold">−</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case "table":
        if (block.rows?.length === 2) {
          const values = block.rows[1];
          return (
            <div key={index} className="my-12 bg-white p-8 rounded-[var(--radius-md)] border-l-4 border-hover shadow-sm">
              <h3 className="font-bold text-primary mb-6 text-lg uppercase tracking-widest">At a Glance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-secondary rounded-[var(--radius-sm)]">
                    <ChevronRight size={14} className="!text-hover" />
                    <span className="text-sm font-medium text-primary/80">{formatBoldTags(item)}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return (
          <div key={index} className="my-12 overflow-x-auto rounded-[var(--radius-md)] border border-primary/10 shadow-lg">
            <table className="w-full text-left">
              <thead className="bg-primary text-white">
                <tr>{block.rows?.[0]?.map((h, idx) => <th key={idx} className="p-5 text-xs uppercase tracking-[0.2em] font-black">{formatBoldTags(h)}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-secondary bg-white">
                {block.rows?.slice(1).map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-secondary/50 transition-colors">
                    {row.map((cell, cIdx) => <td key={cIdx} className="p-5 text-sm text-primary/70 font-medium">{formatBoldTags(cell)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default: return null;
    }
  };

  // --- CONTENT LOOP ---
  const renderContent = () => {
    const content = blog.content || [];
    const elements = [];
    for (let i = 0; i < content.length; i++) {
      const block = content[i];

      // Slider Logic
      if (block.type === "image") {
        const sliderImages = [];
        let j = i;
        while (j < content.length && content[j].type === "image") {
          sliderImages.push(content[j]);
          j++;
        }
        if (sliderImages.length > 1) {
          elements.push(
            <div key={`slider-${i}`} className="my-16 group relative">
              <Swiper
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="rounded-[var(--radius-lg)] shadow-2xl overflow-hidden aspect-[16/9]"
              >
                {sliderImages.map((imgBlock, idx) => (
                  <SwiperSlide key={idx}>
                    <Image src={imgBlock.image} alt={`Gallery ${idx}`} className="w-full h-full object-cover" width={800} height={600} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          );
          i = j - 1; continue;
        }
      }

      // Side-by-Side Logic
      if (block.type === "heading" && content[i + 1]?.type === "image") {
        const nextBlock = content[i + 1];
        elements.push(
          <div key={i} className="my-20 flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <p className="!text-hover font-black text-[10px] tracking-[0.4em] uppercase mb-2">Deep Dive</p>
              <Heading2 text={block.text} className="!text-left !text-primary !mb-0" />
            </div>
            <div className="w-full lg:w-1/2 rounded-[var(--radius-lg)] overflow-hidden shadow-xl border border-primary/5">
              <Image src={nextBlock.image} alt={block.text} className="w-full h-full object-cover aspect-video" width={800} height={600} />
            </div>
          </div>
        );
        i++; continue;
      }
      elements.push(renderSingleBlock(block, i));
    }
    return elements;
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-10 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
      {/* Main Body */}
      <main className="lg:col-span-8 bg-white p-8 lg:p-20 rounded-[var(--radius-lg)] shadow-sm border border-primary/5">
        <div className="prose prose-lg max-w-none">
          {renderContent()}
        </div>

        {/* Bottom Share */}
        <div className="mt-24 pt-12 border-t border-secondary flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6">
            <Share2 size={24} className="!text-hover" />
          </div>
          <Heading3 text="Found this helpful?" className="!mb-2" />
          <p className="text-primary/50 text-sm mb-8 font-sans">Spread the knowledge with your fellow van-lifers.</p>
          <button
            onClick={handleShare}
            className="bg-primary text-white px-12 py-4 rounded-[var(--radius-md)] hover:bg-hover transition-all shadow-lg font-black uppercase text-[10px] tracking-widest"
          >
            Share This Article
          </button>
        </div>
      </main>

      {/* Sidebar Right */}
      <aside className="lg:col-span-3 space-y-10">
        <div className="sticky top-32 space-y-10">
          {blog.gallery?.length > 0 && (
            <div className="bg-white p-6 rounded-[var(--radius-md)] shadow-sm border border-primary/5">
              <div className="flex items-center gap-2 mb-6 border-b border-secondary pb-4">
                <ImageIcon size={16} className="!text-hover" />
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Visual Gallery</p>
              </div>
              <div className="rounded-[var(--radius-sm)] overflow-hidden aspect-square mb-4 border border-secondary">
                <Image src={blog.gallery[currentGalleryImage]} className="w-full h-full object-cover" alt="Active gallery" width={800} height={600} />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {blog.gallery.slice(0, 8).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentGalleryImage(idx)}
                    className={`aspect-square rounded-[var(--radius-sm)] overflow-hidden border-2 transition-all ${currentGalleryImage === idx ? 'border-hover scale-90' : 'border-transparent opacity-40 hover:opacity-100'}`}
                  >
                    <Image src={img} className="w-full h-full object-cover" alt="thumb" width={200} height={200} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stats Box */}

        </div>
      </aside>
    </div>
  );
}