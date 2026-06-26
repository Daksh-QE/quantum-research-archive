"use client";

import React, { useState, useMemo, useEffect } from "react";
import TagBadge from "@/components/TagBadge";

interface JobItem {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  tags: string[];
  source: "static" | "remoteok" | "github";
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const allTags = useMemo(() => {
    const t = new Set(jobs.flatMap((j) => j.tags));
    return ["All", ...Array.from(t).sort()];
  }, [jobs]);

  const filtered = useMemo(() => {
    let result = jobs;
    if (filter !== "All") {
      result = result.filter((j) => j.tags.includes(filter));
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [jobs, filter, search]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Jobs</h1>
        <p className="text-slate-600 mt-1">
          Quantum computing and quantum technology jobs — live listings from across the industry.
        </p>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {allTags.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-6 h-6 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
          <p className="text-sm text-slate-500 mt-2">Loading live jobs...</p>
        </div>
      )}

      {/* Jobs grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((j) => (
            <a
              key={j.id}
              href={j.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all block"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-base font-semibold text-slate-900">{j.title}</h3>
                {j.source === "remoteok" && (
                  <span className="shrink-0 text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">LIVE</span>
                )}
              </div>
              <p className="text-sm font-medium text-slate-500">{j.company}</p>
              <p className="text-xs text-slate-400 mt-0.5">{j.location}</p>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed line-clamp-2">{j.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {j.tags.map((t) => <TagBadge key={t} tag={t} />)}
              </div>
            </a>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-slate-500 text-center py-12">
          {search || filter !== "All" ? "No matching jobs found. Try a different search." : "No jobs available at the moment."}
        </p>
      )}

      {!loading && jobs.length > 0 && (
        <p className="text-xs text-slate-400 text-center">
          Showing {filtered.length} of {jobs.length} jobs{jobs.some((j) => j.source === "remoteok") ? " — includes live listings from RemoteOK" : ""}
        </p>
      )}
    </div>
  );
}
