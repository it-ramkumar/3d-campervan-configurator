import { useState } from "react";
import RichParagraph from "../Paragraph/RichParagraph";

export default function DescriptionToggle({ text }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <RichParagraph  className={`text-lg font-normal leading-relaxed whitespace-pre-line transition-all duration-300 ${
          isExpanded ? "line-clamp-none" : "line-clamp-3"
        }`}>{text}</RichParagraph>
      {/* See More / See Less Button */}
      <button
        onClick={toggle}
        className="text-blue-500 my-2 underline hover:text-blue-600"
      >
        {isExpanded ? "See Less" : "See More"}
      </button>
    </div>
  );
}
