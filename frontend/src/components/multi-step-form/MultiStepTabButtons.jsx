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
    <div className="flex justify-between mt-1 bg-gray-200  rounded-full ">
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
          className={`px-4 py-2 text-xs  rounded-full w-full  text-gray-800 transition
            ${activeTab === t.key
             &&'bg-dark text-white shadow-sm '

            }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}