"use client";

import React, { useState, useMemo } from "react";
import { articles } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";
import FilterBar from "@/components/FilterBar";

export default function ArticlesPage() {
  const [activeTag, setActiveTag] = useState("All");

  const categories = useMemo(() => {
    const tags = new Set(articles.flatMap((a) => a.tags));
    return Array.from(tags).sort();
  }, []);

  const filtered = useMemo(() => {
    if (activeTag === "All") return articles;
    return articles.filter((a) =>
      a.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
    );
  }, [activeTag]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Articles</h1>
        <p className="text-slate-600 mt-1">
          Must-read articles and essays on quantum computing and mechanics
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
          Showing {filtered.length} of {articles.length} articles
        </p>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-12">
            No articles found with this tag.
          </p>
        )}
      </div>
    </div>
  );
}
