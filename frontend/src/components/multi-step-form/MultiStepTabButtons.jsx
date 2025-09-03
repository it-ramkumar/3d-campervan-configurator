import React, { useState } from "react";

export default function TabButtons({
  activeTab,
  setActiveTab,
  setCurrentStep,
  toggleExterior,
}) {
  const [tabs] = useState([
    { key: "interior", label: "Interior" },
    { key: "exterior", label: "Exterior" },
    { key: "system", label: "System" },
  ]);

  return (
    <div className="p-1  flex justify-between bg-dark">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => {
            setActiveTab(t.key);
            setCurrentStep(0);
            if (t.key === "interior") toggleExterior(false);
            if (t.key === "exterior") toggleExterior(true);
             if (t.key === "system") toggleExterior(true);
          }}
          aria-current={activeTab === t.key ? "page" : undefined}
          className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all cursor-pointer font-heading bg-brand duration-200 ease-in-out
            ${activeTab === t.key
             &&'bg-dark text-brand shadow-sm border-brand border'

            }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}