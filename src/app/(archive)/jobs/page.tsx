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
  postedAt?: string;
  source: "curated" | "remoteok" | "github" | "linkedin";
}

const SOURCE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  curated: { label: "CURATED", color: "text-blue-600", bg: "bg-blue-50" },
  remoteok: { label: "LIVE · REMOTEOK", color: "text-green-600", bg: "bg-green-50" },
  github: { label: "LIVE · GITHUB", color: "text-purple-600", bg: "bg-purple-50" },
  linkedin: { label: "LIVE · LINKEDIN", color: "text-sky-600", bg: "bg-sky-50" },
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sourceCounts, setSourceCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter !== "All") params.set("q", filter);
    fetch(`/api/jobs?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setSourceCounts(data.sources || {});
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
      result = result.filter((j) => j.tags.includes(filter) || j.source === filter.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q)
      );
    }
    return result;
  }, [jobs, filter, search]);

  const refresh = () => {
    setLoading(true);
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setSourceCounts(data.sources || {});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Jobs</h1>
          <p className="text-slate-600 mt-1">
            Live quantum computing job listings aggregated from multiple sources.
          </p>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="shrink-0 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "↻ Refresh"}
        </button>
      </div>

      {/* Source stats */}
      {!loading && jobs.length > 0 && (
        <div className="flex flex-wrap gap-3 text-xs">
          <span className="text-slate-500 font-medium">Sources:</span>
          {Object.entries(sourceCounts).map(([key, count]) => {
            const cfg = SOURCE_CONFIG[key];
            if (!cfg || count === 0) return null;
            return (
              <span key={key} className={`px-2.5 py-1 rounded-full font-medium ${cfg.bg} ${cfg.color}`}>
                {cfg.label}: {count}
              </span>
            );
          })}
          <span className="text-slate-400 font-medium">
            Total: {jobs.length}
          </span>
        </div>
      )}

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search jobs by title, company, keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {allTags.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16">
          <div className="inline-block w-7 h-7 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
          <p className="text-sm text-slate-500 mt-3">Fetching live job listings...</p>
          <p className="text-xs text-slate-400 mt-1">Checking RemoteOK + GitHub Jobs</p>
        </div>
      )}

      {/* Jobs grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((j) => {
            const cfg = SOURCE_CONFIG[j.source] || SOURCE_CONFIG.curated;
            return (
              <a
                key={j.id}
                href={j.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all block"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base font-semibold text-slate-900 leading-snug">{j.title}</h3>
                  <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                    {cfg.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-slate-600">{j.company}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-400">{j.location}</span>
                </div>
                <p className="text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-2">{j.description}</p>
                {j.postedAt && (
                  <p className="text-xs text-slate-400 mt-2">
                    Posted: {new Date(j.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {j.tags.slice(0, 4).map((t) => <TagBadge key={t} tag={t} />)}
                  {j.source === "remoteok" && (
                    <span className="inline-block px-2 py-0.5 rounded font-medium text-[10px] bg-green-50 text-green-700">APPLY ↗</span>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500">
            {search || filter !== "All"
              ? "No matching jobs found. Try a different search."
              : "No job listings available at the moment. Try refreshing."}
          </p>
          {(search || filter !== "All") && (
            <button
              onClick={() => { setSearch(""); setFilter("All"); }}
              className="mt-3 text-sm text-blue-600 hover:text-blue-500"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Footer note */}
      {!loading && jobs.length > 0 && (
        <div className="text-center border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-400">
            Live jobs from RemoteOK API + GitHub Jobs &middot; Curated listings from leading quantum companies
            &middot; <button onClick={refresh} className="text-blue-500 hover:text-blue-400">Refresh now</button>
          </p>
        </div>
      )}
    </div>
  );
}
