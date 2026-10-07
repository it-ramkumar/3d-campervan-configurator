"use client";
import React, { useState } from "react";
import {
  Share2, Image as ImageIcon, ThumbsUp,
  ThumbsDown, ChevronRight, ChevronDown, HelpCircle, ArrowRight
} from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {
  Heading1,
  RichParagraph
} from '@/components/Common/Common';
import Image from "next/image";

function FaqAccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bbv-glass border border-primary/10 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <Heading1 as="h3" variant="sub" text={question} />
        <ChevronDown
          size={18}
          className={`text-hover flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <RichParagraph variant="card">{answer}</RichParagraph>
        </div>
      )}
    </div>
  );
}

const CTA_BUTTON_STYLES = {
  primary: "bg-hover text-primary hover:opacity-90 shadow-lg",
  secondary: "bg-primary text-secondary hover:opacity-90",
  outline: "bg-transparent border-2 border-hover text-hover hover:bg-hover hover:text-primary",
};

export default function BlogContentUI({ blog }) {
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);

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

  // --- ORIGINAL FORMATTING LOGIC ---
  const formatBoldTags = (text) => {
    if (!text) return text;
    const parts = text.split(/(#[^\s#]+)/g);
    return parts.map((part, i) =>
      part.startsWith("#") ? (
        <strong key={i}>{part.substring(1)}</strong>
      ) : (
        part
      )
    );
  };


  // --- ORIGINAL BLOCKS (Dark-themed) ---
  const renderSingleBlock = (block, index) => {
    switch (block.type) {
      case "heading":
        return (
          <div key={index} className="mb-10 mt-16 group">
            <RichParagraph variant="sub" className="mb-2">Section {index + 1}</RichParagraph>
            <Heading1 as="h2" variant="section" text={formatBoldTags(block.text)} />
            <div className="w-20 h-1 bg-hover mt-4 rounded-full transition-all group-hover:w-32" />
          </div>
        );

      case "subheading":
        return (
          <div key={index} className="mb-6 mt-12">
            <Heading1 as="h3" variant="card" text={formatBoldTags(block.text)} />
          </div>
        );

      case "paragraph":
        return (
          <RichParagraph key={index} variant="body" className="mb-6">
            {formatBoldTags(block.text)}
          </RichParagraph>
        );


      case "image":
        return (
          <div key={index} className="my-12 w-full">
            <div className="rounded-lg overflow-hidden shadow-2xl border border-primary/10">
              <Image src={block.image} alt="Detail" className="w-full h-auto object-cover" width={800} height={600} />
            </div>
            {block.caption && <RichParagraph variant="sub" className="text-center mt-4">{block.caption}</RichParagraph>}
          </div>
        );

      case "list":
        return (
          <div key={index} className="mb-8 p-0 lg:pr-12">
            <ul className="space-y-4 ml-2">
              {block.items?.map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-hover flex-shrink-0" />
                  <RichParagraph variant="body">{formatBoldTags(item)}</RichParagraph>
                </li>
              ))}
            </ul>
          </div>
        );

      case "proscons":
        return (
          <div key={index} className="my-16 grid grid-cols-1 md:grid-cols-2 gap-0 rounded-lg overflow-hidden shadow-xl border border-primary/10">
            <div className="bbv-glass p-10 border-b md:border-b-0 md:border-r border-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <ThumbsUp className="text-emerald-400" size={24} />
                <Heading1 as="h3" variant="sub" text="The Benefits" />
              </div>
              <ul className="space-y-4">
                {block.pros?.map((p, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-emerald-400">+</span>
                    <RichParagraph variant="card">{p}</RichParagraph>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bbv-glass p-10">
              <div className="flex items-center gap-3 mb-6">
                <ThumbsDown className="text-red-400" size={24} />
                <Heading1 as="h3" variant="sub" text="Considerations" />
              </div>
              <ul className="space-y-4">
                {block.cons?.map((c, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-red-400">−</span>
                    <RichParagraph variant="card">{c}</RichParagraph>
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
            <div key={index} className="my-12 bbv-glass p-8 rounded-lg border-l-4 border-hover">
              <Heading1 as="h3" variant="sub" text="At a Glance" className="mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <ChevronRight size={14} className="text-hover" />
                    <RichParagraph variant="card">{formatBoldTags(item)}</RichParagraph>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return (
          <div key={index} className="my-12 overflow-x-auto rounded-lg border border-primary/10 shadow-lg">
            <table className="w-full text-left">
              <thead className="bg-primary/80">
                <tr>{block.rows?.[0]?.map((h, idx) => <th key={idx} className="p-5"><RichParagraph variant="sub" textColor="text-secondary">{formatBoldTags(h)}</RichParagraph></th>)}</tr>
              </thead>
              <tbody className="divide-y divide-primary/10 bg-white">
                {block.rows?.slice(1).map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-primary/5 transition-colors">
                    {row.map((cell, cIdx) => <td key={cIdx} className="p-5"><RichParagraph variant="card">{formatBoldTags(cell)}</RichParagraph></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "button": {
        const isExternal = block.buttonUrl?.startsWith("http");
        return (
          <div key={index} className="my-12 flex justify-center">
            <a
              href={block.buttonUrl}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={`inline-flex items-center gap-2 px-10 py-4 rounded-lg font-black uppercase text-[11px] tracking-widest transition-all ${CTA_BUTTON_STYLES[block.buttonStyle] || CTA_BUTTON_STYLES.primary}`}
            >
              {block.buttonText}
              <ArrowRight size={14} />
            </a>
          </div>
        );
      }

      case "faq":
        return (
          <div key={index} className="my-16">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="text-hover" size={24} />
              <Heading1 as="h2" variant="card" text="Frequently Asked Questions" />
            </div>
            <div className="space-y-4">
              {block.faqs?.map((faq, idx) => (
                <FaqAccordionItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        );

      case "divider":
        return (
          <div key={index} className="my-16 flex items-center gap-4">
            <div className="flex-1 h-px bg-primary/10" />
            <div className="w-2 h-2 rounded-full bg-hover" />
            <div className="flex-1 h-px bg-primary/10" />
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
                className="rounded-lg shadow-2xl overflow-hidden aspect-[16/9]"
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
              <RichParagraph variant="sub" className="mb-2">Deep Dive</RichParagraph>
              <Heading1 as="h2" variant="section" text={block.text} />
            </div>
            <div className="w-full lg:w-1/2 rounded-lg overflow-hidden shadow-xl border border-primary/10">
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
      <div className="lg:col-span-8 bbv-glass p-8 lg:p-20 rounded-lg border border-primary/10">
        <div className="prose prose-lg max-w-none">
          {renderContent()}
        </div>

        {/* Bottom Share */}
        <div className="mt-24 pt-12 border-t border-primary/10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-hover/40"
            style={{ background: "rgba(237,152,95,0.12)" }}>
            <Share2 size={24} className="text-hover" />
          </div>
          <Heading1 as="h2" variant="card" text="Found this helpful?" className="mb-2" />
          <RichParagraph variant="card" className="mb-8">Spread the knowledge with your fellow van-lifers.</RichParagraph>
          <button
            onClick={handleShare}
            className="bg-hover text-primary px-12 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg font-black uppercase text-[10px] tracking-widest"
          >
            Share This Article
          </button>
        </div>
      </div>

      {/* Sidebar Right */}
      <aside className="lg:col-span-3 space-y-10">
        <div className="sticky top-32 space-y-10">
          {blog.gallery?.length > 0 && (
            <div className="bbv-glass p-6 rounded-lg border border-primary/10">
              <div className="flex items-center gap-2 mb-6 border-b border-primary/10 pb-4">
                <ImageIcon size={16} className="text-hover" />
                <RichParagraph variant="sub">Visual Gallery</RichParagraph>
              </div>
              <div className="relative rounded-lg overflow-hidden aspect-square mb-4 border border-primary/10">
                <Image
                  src={blog.gallery[currentGalleryImage]}
                  fill
                  sizes="(max-width: 1024px) 90vw, 320px"
                  className="object-cover"
                  alt="Active gallery"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {blog.gallery.slice(0, 8).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentGalleryImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${currentGalleryImage === idx ? 'border-hover scale-90' : 'border-transparent opacity-40 hover:opacity-100'}`}
                  >
                    <Image src={img} fill sizes="100px" className="object-cover" alt="thumb" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
