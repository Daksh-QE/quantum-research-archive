"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Check } from "lucide-react";
import { sdkCompare } from "@/data/sdkCompare";

export default function ComparePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Compare Quantum SDKs</h1>
        <p className="text-slate-600 mt-1">
          A vendor-neutral side-by-side of the major software development kits — because the right tool depends on your goal, not on whose brand you saw first.
        </p>
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <th className="px-4 py-3 font-semibold">SDK</th>
              <th className="px-4 py-3 font-semibold">Vendor</th>
              <th className="px-4 py-3 font-semibold">Language</th>
              <th className="px-4 py-3 font-semibold">Hardware access</th>
              <th className="px-4 py-3 font-semibold">Open source</th>
              <th className="px-4 py-3 font-semibold">Best for</th>
            </tr>
          </thead>
          <tbody>
            {sdkCompare.map((s) => (
              <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50 align-top">
                <td className="px-4 py-3">
                  <Link href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 hover:text-blue-600 inline-flex items-center gap-1">
                    {s.name} <ExternalLink className="w-3 h-3 text-slate-400" />
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-600">{s.vendor}</td>
                <td className="px-4 py-3 text-slate-600">{s.language}</td>
                <td className="px-4 py-3 text-slate-600">{s.hardware}</td>
                <td className="px-4 py-3">{s.openSource ? <Check className="w-4 h-4 text-emerald-500" /> : <span className="text-slate-400">—</span>}</td>
                <td className="px-4 py-3 text-slate-600 max-w-md">{s.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden grid grid-cols-1 gap-4">
        {sdkCompare.map((s) => (
          <div key={s.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <Link href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 hover:text-blue-600 inline-flex items-center gap-1">
              {s.name} <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
            <p className="text-xs text-slate-500 mt-0.5">{s.vendor} · {s.language} · {s.openSource ? "open source" : "proprietary"}</p>
            <p className="text-sm text-slate-600 mt-2"><span className="text-slate-400">Hardware:</span> {s.hardware}</p>
            <p className="text-sm text-slate-600 mt-1"><span className="text-slate-400">Best for:</span> {s.bestFor}</p>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-slate-600 leading-relaxed">
        <p className="font-semibold text-slate-800 mb-1">Which should a beginner pick?</p>
        <p>Start with <strong>Qiskit</strong> (largest community and learning material) or <strong>PennyLane</strong> (if you're drawn to machine learning). Both are Python, free, and run on simulators without any hardware account. You can try circuits right now in the <Link href="/quantum-sandbox" className="text-blue-600 hover:text-blue-500">Quantum Sandbox</Link> — it even exports Qiskit code.</p>
      </div>
    </div>
  );
}
