import React from 'react';

export default function SpanTag({ text, icon: Icon, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 font-ui font-semibold text-[10px] uppercase tracking-[0.28em] text-[#ED985F] border-l-2 border-[#ED985F] pl-3 py-0.5 ${className}`}>
      {Icon && <Icon className="w-4 h-4 opacity-80" />}
      <span>{text}</span>
    </span>
  );
}