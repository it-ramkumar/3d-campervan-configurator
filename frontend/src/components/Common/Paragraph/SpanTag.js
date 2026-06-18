import React from 'react';

export default function SpanTag({ text, icon: Icon, className = "" }) {
  return (
    // 'flex' ki jagah 'inline-flex' use karein kyunki ye ek <span> tag hai
    <span className={`inline-flex items-center gap-2 font-bold text-sm text-hover pl-1 pr-4 ${className}`}>

      {/* Icon ka size ab text ke hisab se automatic standard (w-5 h-5 yani 20px) ho jayenge */}
      {Icon && <Icon className="w-5 h-5 opacity-80 " />}

      {/* Aapka Text */}
      <span>{text}</span>
    </span>
  );
}