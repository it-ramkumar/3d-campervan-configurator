import React from 'react';

export default function WatermarkText({ text, icon: Icon, className = "" }) {
  return (
    <span className={`text-md  text-hover leading-none pr-4 flex items-center gap-4 ${className}`}>
      {/* Agar icon pass kiya hoga toh wo yahan render hoga */}
      {Icon && <Icon className="w-[180px] h-[180px] opacity-80" />}

      {/* Aapka Text */}
      {text}
    </span>
  );
}