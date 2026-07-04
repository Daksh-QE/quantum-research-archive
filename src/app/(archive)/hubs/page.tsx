"use client";

import React, { useState, useMemo } from "react";
import { MessageCircle, MessageSquare, Hash, AtSign, MessagesSquare } from "lucide-react";
import { communityHubs } from "@/data/communityHubs";
import TagBadge from "@/components/TagBadge";
import FreshnessNote from "@/components/FreshnessNote";

type IconType = React.ComponentType<{ className?: string }>;

const platformColors: Record<string, string> = {
  discord: "bg-indigo-100 text-indigo-700",
  reddit: "bg-orange-100 text-orange-700",
  slack: "bg-purple-100 text-purple-700",
  x: "bg-slate-100 text-slate-700",
  forum: "bg-blue-100 text-blue-700",
};

const platformIcon: Record<string, IconType> = {
  discord: MessageCircle,
  reddit: MessageSquare,
  slack: Hash,
  x: AtSign,
  forum: MessagesSquare,
};

export default function CommunityHubsPage() {
  const [filter, setFilter] = useState("All");
  const platforms = useMemo(() => ["All", "discord", "reddit", "slack", "x", "forum"], []);
  const filtered = useMemo(() => {
    if (filter === "All") return communityHubs;
    return communityHubs.filter((h) => h.platform === filter);
  }, [filter]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Community Hubs</h1>
        <p className="text-slate-600 mt-1">Discord servers, Reddit communities, X/Twitter profiles, and forums worth following in quantum computing.</p>
        <FreshnessNote />
      </div>

      {/* Where to ask — intent-based routing */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-1">Have a question? Ask in the right place</h2>
        <p className="text-xs text-slate-500 mb-3">Quantum has no single Q&amp;A site — the best answer depends on what you&apos;re asking.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {[
            { q: "Conceptual / theory question", where: "Quantum Computing Stack Exchange", url: "https://quantumcomputing.stackexchange.com/" },
            { q: "Qiskit code / errors", where: "Qiskit Slack (#help)", url: "https://qisk.it/join-slack" },
            { q: "PennyLane / QML", where: "PennyLane Discussion Forum", url: "https://discuss.pennylane.ai/" },
            { q: "Beginner / “where do I start?”", where: "r/QuantumComputing", url: "https://www.reddit.com/r/QuantumComputing/" },
            { q: "Open-source / contributing", where: "Unitary Fund Discord", url: "https://discord.gg/unitaryfund" },
            { q: "Physics fundamentals", where: "r/QuantumPhysics", url: "https://www.reddit.com/r/QuantumPhysics/" },
          ].map((r) => (
            <a key={r.q} href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 px-3 py-2 transition-colors">
              <span className="text-slate-600">{r.q}</span>
              <span className="text-blue-600 font-medium shrink-0 text-xs">{r.where} →</span>
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {platforms.map((p) => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
              filter === p ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-100"
            }`}
          >
            {p === "All" ? "All" : (() => { const Ic = platformIcon[p]; return <span className="inline-flex items-center gap-1.5">{Ic && <Ic className="w-3.5 h-3.5" />}{p.charAt(0).toUpperCase() + p.slice(1)}</span>; })()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((h) => (
          <a key={h.id} href={h.url} target="_blank" rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all block">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-base font-semibold text-slate-900">{h.name}</h3>
              <span className={`shrink-0 px-2 py-0.5 text-xs font-medium rounded ${platformColors[h.platform]}`}>
                {h.platform}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{h.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {h.tags.map((t) => <TagBadge key={t} tag={t} />)}
            </div>
          </a>
        ))}
      </div>
      {filtered.length === 0 && <p className="text-slate-500 text-center py-12">No hubs found.</p>}
    </div>
  );
}
