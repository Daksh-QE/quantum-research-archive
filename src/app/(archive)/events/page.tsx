"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ExternalLink, Calendar } from "lucide-react";
import { events } from "@/data/events";
import FilterBar from "@/components/FilterBar";
import BookmarkButton from "@/components/BookmarkButton";
import FreshnessNote from "@/components/FreshnessNote";

const typeColor: Record<string, string> = {
  conference: "bg-blue-100 text-blue-700",
  hackathon: "bg-emerald-100 text-emerald-700",
  "summer school": "bg-violet-100 text-violet-700",
  meetup: "bg-amber-100 text-amber-700",
  competition: "bg-rose-100 text-rose-700",
};

export default function EventsPage() {
  const [activeType, setActiveType] = useState("All");
  const categories = useMemo(() => Array.from(new Set(events.map((e) => e.type))).sort(), []);
  const sorted = useMemo(() => [...events].sort((a, b) => a.month - b.month), []);
  const filtered = useMemo(
    () => (activeType === "All" ? sorted : sorted.filter((e) => e.type === activeType)),
    [activeType, sorted]
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Events &amp; Hackathons</h1>
        <p className="text-slate-600 mt-1">
          Conferences, hackathons, summer schools, and competitions across the quantum year. Dates shift annually — follow each link for the current schedule.
        </p>
        <FreshnessNote />
      </div>

      <FilterBar categories={categories} activeCategory={activeType} onCategoryChange={setActiveType} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((e) => (
          <div key={e.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${typeColor[e.type] || "bg-slate-100 text-slate-600"}`}>{e.type}</span>
                  {e.recurring && <span className="text-[10px] text-slate-400">recurring</span>}
                </div>
                <Link href={e.url} target="_blank" rel="noopener noreferrer"
                  className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                  {e.name}
                </Link>
              </div>
              <BookmarkButton type="event" id={e.id} title={e.name} url={e.url} />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <Calendar className="w-3.5 h-3.5" /> {e.when} · {e.location}
            </div>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{e.summary}</p>
            <Link href={e.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-500 mt-2">
              Official page <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400">
        Looking for local, in-person groups? Browse{" "}
        <Link href="https://www.meetup.com/topics/quantum-computing/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">quantum meetups on Meetup</Link>.
      </p>
    </div>
  );
}
