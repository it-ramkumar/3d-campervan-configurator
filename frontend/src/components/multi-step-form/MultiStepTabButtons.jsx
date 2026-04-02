import React from "react";
import { Home, Sun, Settings } from "lucide-react";

export default function TabButtons({
  activeTab,
  setActiveTab,
  setCurrentStep,
  toggleExterior,
}) {
  const tabs = [
    { key: "interior", label: "Interior", icon: Home, short: "Int" },
    { key: "exterior", label: "Exterior", icon: Sun, short: "Ext" },
    { key: "system", label: "System", icon: Settings, short: "Sys" },
  ];

  return (
    <div className="flex p-1 rounded-lg bg-secondary-100 border border-primary/10">
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = activeTab === t.key;

        return (
          <button
            key={t.key}
            onClick={() => {
              setActiveTab(t.key);
              setCurrentStep(0);
              if (t.key === "interior") toggleExterior(false);
              if (t.key === "exterior") toggleExterior(true);
              if (t.key === "system") toggleExterior(true);
            }}
            className={`
              flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all
              ${isActive
                ? "bg-primary text-secondary shadow-lg"
                : "text-primary hover:text-primary/70 hover:bg-primary/5"
              }
            `}
          >
            <Icon size={14} />
            <span className="hidden sm:inline">{t.label}</span>
            <span className="sm:hidden">{t.short}</span>
          </button>
        );
      })}
    </div>
  );
}