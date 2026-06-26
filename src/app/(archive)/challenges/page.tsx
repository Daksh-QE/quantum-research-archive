"use client";

import React, { useState, useMemo } from "react";
import { challenges } from "@/data/challenges";
import TagBadge from "@/components/TagBadge";

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-amber-100 text-amber-700",
  advanced: "bg-red-100 text-red-700",
};

export default function ChallengesPage() {
  const [filter, setFilter] = useState("All");
  const cats = useMemo(() => ["All", "beginner", "intermediate", "advanced"], []);
  const filtered = useMemo(() => {
    if (filter === "All") return challenges;
    return challenges.filter((c) => c.difficulty === filter);
  }, [filter]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Challenges & Interviews</h1>
        <p className="text-slate-600 mt-1">Practice problems and interview questions for quantum computing, from beginner to advanced.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
              filter === c ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-100"
            }`}
          >
            {c === "All" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <a key={c.id} href={c.url} target="_blank" rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all block">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-base font-semibold text-slate-900">{c.title}</h3>
              <span className={`shrink-0 px-2 py-0.5 text-xs font-medium rounded ${difficultyColors[c.difficulty]}`}>
                {c.difficulty}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{c.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.tags.map((t) => <TagBadge key={t} tag={t} />)}
            </div>
          </a>
        ))}
      </div>
      {filtered.length === 0 && <p className="text-slate-500 text-center py-12">No challenges found.</p>}
    </div>
  );
}
