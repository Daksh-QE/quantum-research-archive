"use client";

import React, { useState, useMemo, useEffect } from "react";
import { glossaryTerms } from "@/data/glossary";
import GlossaryTerm from "@/components/GlossaryTerm";
import FilterBar from "@/components/FilterBar";

export default function GlossaryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(glossaryTerms.map((t) => t.category));
    return Array.from(cats).sort();
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return glossaryTerms;
    return glossaryTerms.filter(
      (t) => t.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  // Deep-link support: scroll to term specified in ?term= query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const termParam = params.get("term");
    if (termParam) {
      const el = document.getElementById("term-" + termParam);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Glossary</h1>
        <p className="text-slate-600 mt-1">
          Key terms and concepts in quantum computing and quantum mechanics
        </p>
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
          Showing {filtered.length} of {glossaryTerms.length} terms
        </p>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {filtered.map((term) => (
              <div key={term.id} id={"term-" + term.id}>
                <GlossaryTerm term={term} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-12">
            No terms found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
