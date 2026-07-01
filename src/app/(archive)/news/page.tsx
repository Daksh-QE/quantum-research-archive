"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { news } from "@/data/news";
import FilterBar from "@/components/FilterBar";
import BookmarkButton from "@/components/BookmarkButton";

function fmtDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function NewsPage() {
  const [activeTag, setActiveTag] = useState("All");
  const sorted = useMemo(() => [...news].sort((a, b) => (a.date < b.date ? 1 : -1)), []);
  const categories = useMemo(() => Array.from(new Set(news.map((n) => n.tag))).sort(), []);
  const filtered = useMemo(
    () => (activeTag === "All" ? sorted : sorted.filter((n) => n.tag === activeTag)),
    [activeTag, sorted]
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Quantum in the News</h1>
        <p className="text-slate-600 mt-1">
          Landmark results and industry developments — each links to a primary source.
        </p>
      </div>

      <FilterBar categories={categories} activeCategory={activeTag} onCategoryChange={setActiveTag} />

      <div className="relative border-l-2 border-slate-200 ml-2 space-y-6">
        {filtered.map((n) => (
          <div key={n.id} className="relative pl-6">
            <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-slate-50" />
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <span>{fmtDate(n.date)}</span>
                    <span className="text-slate-300">·</span>
                    <span className="font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{n.tag}</span>
                  </div>
                  <Link href={n.url} target="_blank" rel="noopener noreferrer"
                    className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                    {n.title}
                  </Link>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{n.summary}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs">
                    <Link href={n.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-500">
                      {n.source} <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
                <BookmarkButton type="news" id={n.id} title={n.title} url={n.url} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400">Curated summaries written in-house; follow the source links for the original announcements and papers.</p>
    </div>
  );
}
