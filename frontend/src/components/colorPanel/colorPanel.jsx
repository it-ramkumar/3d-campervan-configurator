import React, { useState } from "react";

const ColorButton = () => {
  const [brandColor, setBrandColor] = useState("#e6e4e1");
  const [darkColor, setDarkColor] = useState("#553e7a");

  // CSS variables update karne ka function
  const updateCSSVariable = (variable, value) => {
    document.documentElement.style.setProperty(variable, value);
  };

  return (
    <div className="p-4 flex flex-col gap-4 items-start rounded-2xl shadow bg-white w-fit">
      <h2 className="text-lg font-bold">🎨 Select Theme Colors</h2>

      {/* Brand Color */}
      <div className="flex items-center gap-2">
        <label className="font-medium">Brand:</label>
        <input
          type="color"
          value={brandColor}
          onChange={(e) => {
            setBrandColor(e.target.value);
            updateCSSVariable("--color-brand", e.target.value);
          }}
          className="w-10 h-10 rounded cursor-pointer border"
        />
      </div>

      {/* Dark Color */}
      <div className="flex items-center gap-2">
        <label className="font-medium">Dark:</label>
        <input
          type="color"
          value={darkColor}
          onChange={(e) => {
            setDarkColor(e.target.value);
            updateCSSVariable("--color-dark", e.target.value);
          }}
          className="w-10 h-10 rounded cursor-pointer border"
        />
      </div>

      {/* Demo Button */}
      <button
        className="px-4 py-2 rounded-lg shadow text-white"
        style={{
          background: `linear-gradient(45deg, var(--color-brand), var(--color-dark))`,
        }}
      >
        Themed Button
      </button>
    </div>
  );
};

export default ColorButton;
