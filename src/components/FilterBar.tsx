"use client";

import React from "react";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export default function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
      <button
        onClick={() => onCategoryChange("All")}
        className={`shrink-0 px-4 py-1.5 text-sm font-medium rounded-full border transition-colors ${
          activeCategory === "All"
            ? "bg-slate-900 text-white border-slate-900"
            : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`shrink-0 px-4 py-1.5 text-sm font-medium rounded-full border transition-colors ${
            activeCategory === cat
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
