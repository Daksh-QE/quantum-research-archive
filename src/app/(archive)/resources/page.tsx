"use client";

import React, { useState, useMemo } from "react";
import { resources } from "@/data/resources";
import ResourceCard from "@/components/ResourceCard";
import FilterBar from "@/components/FilterBar";
import FreshnessNote from "@/components/FreshnessNote";

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(resources.map((r) => r.category));
    return Array.from(cats).sort();
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return resources;
    return resources.filter(
      (r) => r.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Resources</h1>
        <p className="text-slate-600 mt-1">
          Books, courses, videos, and platforms for quantum computing and
          mechanics
        </p>
        <FreshnessNote />
      </div>

      <div>
        <FilterBar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      <div>
        <p className="text-sm text-slate-500 mb-4">
          Showing {filtered.length} of {resources.length} resources
        </p>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {filtered.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-12">
            No resources found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
