import React from "react";
import Link from "next/link";
import { curriculum } from "@/data/curriculum";
import { resources } from "@/data/resources";
import { BookOpen, GraduationCap, Library, Wrench, BarChart3, GitCompare, ArrowRight } from "lucide-react";
import CurriculumSection from "@/components/CurriculumSection";
import OverviewSaved from "@/components/OverviewSaved";

const totalLessons = curriculum.reduce((sum, m) => sum + m.lessons.length, 0);

const stats = [
  { label: "Modules", value: `${curriculum.length}`, icon: BookOpen },
  { label: "Lessons", value: `${totalLessons}`, icon: GraduationCap },
  { label: "Curated resources", value: `${resources.length}`, icon: Library },
  { label: "Interactive tools", value: "3", icon: Wrench },
];

/* --- data-viz derived from existing data (no backend) --- */
const phaseDefs = [
  { label: "Intro (10 min)", lo: 0, hi: 0 },
  { label: "Foundations", lo: 1, hi: 6 },
  { label: "Core computing", lo: 7, hi: 11 },
  { label: "Advanced topics", lo: 12, hi: 16 },
  { label: "Hardware", lo: 17, hi: 20 },
  { label: "Applied", lo: 21, hi: 24 },
];
const lessonsByPhase = phaseDefs.map((p) => ({
  label: p.label,
  value: curriculum
    .filter((m) => { const n = parseInt(m.id, 10); return n >= p.lo && n <= p.hi; })
    .reduce((s, m) => s + m.lessons.length, 0),
}));

const catCounts: Record<string, number> = {};
resources.forEach((r) => { catCounts[r.category] = (catCounts[r.category] || 0) + 1; });
const resourcesByCat = Object.entries(catCounts)
  .map(([label, value]) => ({ label, value }))
  .sort((a, b) => b.value - a.value);

const TYPE_COLOR: Record<string, string> = {
  video: "bg-blue-500", notes: "bg-rose-500", tutorial: "bg-emerald-500", paper: "bg-purple-500", guide: "bg-amber-500",
};
const typeCounts: Record<string, number> = {};
curriculum.forEach((m) => m.lessons.forEach((l) => { typeCounts[l.type] = (typeCounts[l.type] || 0) + 1; }));
const lessonTypes = Object.entries(typeCounts)
  .map(([label, value]) => ({ label, value, color: TYPE_COLOR[label] || "bg-slate-400" }))
  .sort((a, b) => b.value - a.value);

function Bars({ rows, accent = "bg-indigo-500" }: { rows: { label: string; value: number; color?: string }[]; accent?: string }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="space-y-2.5">
      {rows.map((r) => (
        <li key={r.label} className="text-xs">
          <div className="flex justify-between mb-1">
            <span className="text-slate-600">{r.label}</span>
            <span className="text-slate-400 tabular-nums">{r.value}</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div className={`h-full rounded-full ${r.color ?? accent}`} style={{ width: `${(r.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-slate-900">Quantum Research Archive</h1>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 100% free · no ads · no login
          </span>
        </div>
        <p className="text-slate-600 mt-2 max-w-2xl">
          A curated research archive for quantum computing and quantum mechanics — resources, curriculum, tools, and community.
        </p>
        <p className="text-slate-500 mt-3 leading-relaxed max-w-2xl">
          Whether you&apos;re a student beginning your journey into quantum mechanics, a researcher looking for the latest
          tools and papers, or a practitioner building with quantum SDKs, this archive brings together the best freely
          available resources in one place.
        </p>
      </div>

      {/* KPIs — one number each, no filler */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg border border-slate-200 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900 leading-none">{stat.value}</p>
                <p className="text-xs font-medium text-slate-500 mt-1">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* At a glance — real distributions, derived from the archive itself */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-indigo-500" />
          <h2 className="text-sm font-semibold text-slate-900">At a glance</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Lessons by phase</p>
            <Bars rows={lessonsByPhase} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Resources by type</p>
            <Bars rows={resourcesByCat} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Lesson formats</p>
            <Bars rows={lessonTypes} />
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <OverviewSaved />
          <Link href="/compare" className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500">
            <GitCompare className="w-4 h-4" /> Compare the SDKs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Curriculum */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Curriculum</h2>
        <CurriculumSection modules={curriculum} />
      </div>
    </div>
  );
}
