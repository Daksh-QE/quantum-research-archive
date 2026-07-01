"use client";

import React from "react";
import { Bookmark as BookmarkIcon } from "lucide-react";
import { useBookmarks } from "@/lib/useBookmarks";

export default function BookmarkButton({ type, id, title, url }: { type: string; id: string; title: string; url: string }) {
  const { has, toggle } = useBookmarks();
  const saved = has(id);
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle({ type, id, title, url }); }}
      title={saved ? "Saved — click to remove" : "Save to your list"}
      aria-label={saved ? "Remove from saved" : "Save to your list"}
      className={`shrink-0 p-1 rounded-md transition-colors ${saved ? "text-amber-500 hover:text-amber-600" : "text-slate-300 hover:text-slate-500"}`}
    >
      <BookmarkIcon className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
