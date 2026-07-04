"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/lib/useBookmarks";

// small personal micro-stat — the one honest "analytics" we have (localStorage).
export default function OverviewSaved() {
  const { items } = useBookmarks();
  return (
    <Link href="/saved" className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-indigo-600 transition-colors">
      <Bookmark className="w-4 h-4" />
      {items.length > 0 ? (
        <span><strong className="font-semibold text-slate-900">{items.length}</strong> saved for later</span>
      ) : (
        <span>Nothing saved yet — bookmark as you browse</span>
      )}
    </Link>
  );
}
