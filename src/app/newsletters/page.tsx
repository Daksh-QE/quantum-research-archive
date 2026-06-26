"use client";

import React, { useState, useMemo } from "react";
import { newsletters } from "@/data/newsletters";
import NewsletterCard from "@/components/NewsletterCard";
import FilterBar from "@/components/FilterBar";

export default function NewslettersPage() {
  const [activeTag, setActiveTag] = useState("All");

  const categories = useMemo(() => {
    const tags = new Set(newsletters.flatMap((n) => n.tags));
    return Array.from(tags).sort();
  }, []);

  const filtered = useMemo(() => {
    if (activeTag === "All") return newsletters;
    return newsletters.filter((n) =>
      n.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
    );
  }, [activeTag]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Newsletters</h1>
        <p className="text-slate-600 mt-1">
          Stay updated with the latest in quantum computing and mechanics
        </p>
      </div>

      <div>
        <FilterBar
          categories={categories}
          activeCategory={activeTag}
          onCategoryChange={setActiveTag}
        />
      </div>

      <div>
        <p className="text-sm text-slate-500 mb-4">
          Showing {filtered.length} of {newsletters.length} newsletters
        </p>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {filtered.map((newsletter) => (
              <NewsletterCard key={newsletter.id} newsletter={newsletter} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-12">
            No newsletters found with this tag.
          </p>
        )}
      </div>
    </div>
  );
}
