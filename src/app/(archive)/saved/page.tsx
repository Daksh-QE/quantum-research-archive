"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink, Trash2, Bookmark } from "lucide-react";
import { useBookmarks } from "@/lib/useBookmarks";

const TYPE_LABELS: Record<string, string> = {
  resource: "Resources", article: "Articles", tool: "Tools", paper: "Papers",
  news: "News", event: "Events", newsletter: "Newsletters",
};

export default function SavedPage() {
  const { items, remove, clear } = useBookmarks();
  const [completedPapers, setCompletedPapers] = useState<string[]>([]);

  useEffect(() => {
    try { setCompletedPapers(JSON.parse(localStorage.getItem("qra-completed-papers") || "[]")); } catch { }
  }, []);

  const groups = items.reduce<Record<string, typeof items>>((acc, b) => {
    (acc[b.type] ||= []).push(b); return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Your Saved Items</h1>
          <p className="text-slate-600 mt-1">Everything you&apos;ve bookmarked, plus your progress. Stored in this browser — no account needed.</p>
        </div>
        {items.length > 0 && (
          <button onClick={clear} className="shrink-0 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 border border-slate-200 rounded-lg px-3 py-1.5">
            <Trash2 className="w-3.5 h-3.5" /> Clear all
          </button>
        )}
      </div>

      {/* Progress */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-slate-900">{items.length}</p>
          <p className="text-xs text-slate-500">items saved</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-slate-900">{completedPapers.length}</p>
          <p className="text-xs text-slate-500">papers completed (Copilot)</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-slate-900">{Object.keys(groups).length}</p>
          <p className="text-xs text-slate-500">categories</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Bookmark className="w-8 h-8 mx-auto text-slate-300 mb-3" />
          <p className="font-medium text-slate-600">Nothing saved yet.</p>
          <p className="text-sm mt-1">Click the bookmark icon on any resource, article, tool, news item, or event to save it here.</p>
          <div className="flex gap-2 justify-center mt-4 text-sm">
            <Link href="/resources" className="text-blue-600 hover:text-blue-500">Browse resources</Link>
            <span className="text-slate-300">·</span>
            <Link href="/news" className="text-blue-600 hover:text-blue-500">See the news</Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groups).map(([type, list]) => (
            <div key={type}>
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">{TYPE_LABELS[type] || type}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {list.map((b) => (
                  <div key={b.id} className="bg-white rounded-lg border border-slate-200 shadow-sm p-3 flex items-center justify-between gap-2">
                    <Link href={b.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-800 hover:text-blue-600 truncate inline-flex items-center gap-1">
                      {b.title} <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                    </Link>
                    <button onClick={() => remove(b.id)} className="shrink-0 text-slate-300 hover:text-red-500" aria-label="Remove"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
