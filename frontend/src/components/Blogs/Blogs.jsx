"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { SecondaryButton } from "@/components/Common/Common";

export default function BlogSearchUI({ initialSearch }) {
  const [input, setInput] = useState(initialSearch || "");
  const router = useRouter();

  const handleSearch = () => {
    if (input.trim()) {
      router.push(`/blog?search=${encodeURIComponent(input.trim())}&page=1`);
    } else {
      router.push(`/blog?page=1`);
    }
  };

  return (
    <div className="bbv-card p-6 rounded-lg mb-16 max-w-3xl mx-auto">
      <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3 text-center lg:text-left">
        Search the Archives
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 h-5 w-5" />
          <input
            type="text"
            placeholder="Keywords (e.g. Solar, Bathroom...)"
            className="w-full pl-12 pr-4 py-3 bg-white border border-primary/20 rounded-lg focus:ring-2 focus:ring-hover/40 focus:border-hover/50 text-primary placeholder:text-primary/30 outline-none transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <SecondaryButton
          label="Search"
          onClick={handleSearch}
          className="w-full sm:w-auto !py-3 !px-10"
        />
      </div>
    </div>
  );
}
