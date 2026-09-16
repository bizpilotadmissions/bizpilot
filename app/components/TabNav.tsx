"use client";

import { LucideIcon } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  count?: number;
  icon?: LucideIcon;
}

interface TabNavProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export default function TabNav({ tabs, activeTab, onChange }: TabNavProps) {
  return (
    <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              isActive
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
                  isActive
                    ? "bg-emerald-200/60 text-emerald-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}