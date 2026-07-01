"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Copy, Check, Play } from "lucide-react";
import { snippets } from "@/data/snippets";
import FilterBar from "@/components/FilterBar";

export default function SnippetsPage() {
  const [active, setActive] = useState("All");
  const [copied, setCopied] = useState<string | null>(null);
  const categories = useMemo(() => Array.from(new Set(snippets.map((s) => s.framework))).sort(), []);
  const filtered = useMemo(() => (active === "All" ? snippets : snippets.filter((s) => s.framework === active)), [active]);

  const copy = (id: string, code: string) => {
    navigator.clipboard?.writeText(code).then(() => { setCopied(id); setTimeout(() => setCopied(null), 1500); });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Code Snippets</h1>
        <p className="text-slate-600 mt-1">
          Copy-paste, runnable examples of the circuits you learn about here. Where a circuit is visual, open it live in the Quantum Sandbox.
        </p>
      </div>

      <FilterBar categories={categories} activeCategory={active} onCategoryChange={setActive} />

      <div className="grid grid-cols-1 gap-5">
        {filtered.map((s) => (
          <div key={s.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">{s.framework}</span>
                <span className="text-[11px] text-slate-400">{s.level}</span>
              </div>
              <h3 className="text-base font-semibold text-slate-900">{s.title}</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{s.explanation}</p>
              <div className="flex items-center gap-2 mt-2">
                {s.sandbox && (
                  <Link href={`/quantum-sandbox?circuit=${encodeURIComponent(s.sandbox)}`}
                    className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors">
                    <Play className="w-3 h-3" /> Open in Sandbox
                  </Link>
                )}
                <button onClick={() => copy(s.id, s.code)}
                  className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                  {copied === s.id ? <><Check className="w-3 h-3 text-emerald-500" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              </div>
            </div>
            <pre className="bg-slate-900 text-emerald-300 text-[12.5px] leading-relaxed font-mono p-4 overflow-x-auto whitespace-pre">{s.code}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
