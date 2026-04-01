"use client"
import { motion } from "framer-motion";
import { RichParagraph } from "../../Common/Common";
import { Quote } from "lucide-react";

export default function TestimonialCard({ quote, author, van }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="relative bg-primary text-white p-8 md:p-12 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 group border border-white/5"
    >
      <div className="absolute -top-4 left-8 inline-flex items-center gap-2 px-4 py-1.5 bg-white text-primary rounded-full shadow-md">
        <Quote className="w-3 h-3 fill-current" />
        <span className="text-[10px] font-black uppercase tracking-[0.15em]">Testimonial</span>
      </div>

      <div className="relative z-10 space-y-8">
        <RichParagraph className="text-lg md:text-xl italic font-medium leading-relaxed text-white/90">
          "{quote}"
        </RichParagraph>

        <div className="border-t border-white/10 pt-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-sm font-bold border border-white/10">
            {author.charAt(0)}
          </div>
          <div>
            <RichParagraph className="font-bold text-white leading-none mb-1 uppercase tracking-wider">
              {author}
            </RichParagraph>
            <RichParagraph className="text-xs text-white/50 leading-none">
              Owner of {van}
            </RichParagraph>
          </div>
        </div>
      </div>
    </motion.div>
  );
}