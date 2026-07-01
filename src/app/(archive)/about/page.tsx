import React from "react";
import Link from "next/link";
import { ShieldCheck, RefreshCw, GitBranch, BookOpen } from "lucide-react";

const LAST_UPDATED = "July 2026";

export default function AboutPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">About &amp; Methodology</h1>
        <p className="text-slate-600 mt-1">What this archive is, how it&apos;s curated, and how we keep it accurate.</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-500 bg-white border border-slate-200 rounded-lg px-4 py-2 w-fit">
        <RefreshCw className="w-4 h-4 text-emerald-500" /> Content last reviewed: <span className="font-medium text-slate-700">{LAST_UPDATED}</span>
      </div>

      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-2"><BookOpen className="w-5 h-5 text-blue-500" /><h2 className="text-lg font-bold text-slate-900">What it is</h2></div>
        <p className="text-sm text-slate-600 leading-relaxed">A free, ad-free, <strong>vendor-neutral</strong> hub for learning and exploring quantum computing and quantum mechanics — for absolute beginners through active researchers. It indexes the whole field (every SDK, company, course, paper, job, community) and adds interactive tools you won&apos;t find on a link list: a circuit <Link href="/quantum-sandbox" className="text-blue-600 hover:text-blue-500">Sandbox</Link>, a paper-reading <Link href="/research-copilot" className="text-blue-600 hover:text-blue-500">Copilot</Link>, and a surface-code <Link href="/error-correction" className="text-blue-600 hover:text-blue-500">decoding lab</Link>.</p>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-2"><ShieldCheck className="w-5 h-5 text-emerald-500" /><h2 className="text-lg font-bold text-slate-900">How we keep it accurate</h2></div>
        <ul className="text-sm text-slate-600 leading-relaxed space-y-2 list-disc pl-5">
          <li>Every external link points to a <strong>primary source</strong> (official page, arXiv, DOI, or the project&apos;s own site).</li>
          <li>News summaries are written in-house and link to the original announcement or paper — we don&apos;t reproduce others&apos; text.</li>
          <li>The interactive tools compute real physics: the Sandbox uses a genuine complex state-vector simulator, and the decoding lab runs an exact minimum-weight matching decoder with a verified success/logical-error verdict.</li>
          <li>Links and facts are periodically re-verified; the &ldquo;last reviewed&rdquo; date above reflects the most recent sweep.</li>
          <li>Found something wrong or out of date? <Link href="https://github.com/Daksh-QE/quantum-research-archive/issues" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">Open an issue</Link>.</li>
        </ul>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-2"><GitBranch className="w-5 h-5 text-fuchsia-500" /><h2 className="text-lg font-bold text-slate-900">Open &amp; improvable</h2></div>
        <p className="text-sm text-slate-600 leading-relaxed">The archive is open on <Link href="https://github.com/Daksh-QE/quantum-research-archive" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">GitHub</Link>. Corrections, new resources, and features are welcome — see <Link href="/contribute" className="text-blue-600 hover:text-blue-500">Get Into Quantum</Link> for how to contribute here and across the wider ecosystem.</p>
      </section>
    </div>
  );
}
