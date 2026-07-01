"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";
import { news } from "@/data/news";
import { events } from "@/data/events";

export default function DigestPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const latest = [...news].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5);
  const upcoming = [...events].sort((a, b) => a.month - b.month).slice(0, 4);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    try {
      const list = JSON.parse(localStorage.getItem("qra-digest-signups") || "[]");
      localStorage.setItem("qra-digest-signups", JSON.stringify([...list, email]));
    } catch { }
    setDone(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">The Weekly Digest</h1>
        <p className="text-slate-600 mt-1">A short, curated roundup of what matters in quantum — the highlights, without the firehose.</p>
      </div>

      {/* Subscribe */}
      <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl border border-indigo-100 p-5">
        <div className="flex items-center gap-2 mb-1"><Mail className="w-4 h-4 text-indigo-500" /><p className="font-semibold text-slate-800">Get it in your inbox</p></div>
        {done ? (
          <p className="text-sm text-emerald-700">You&apos;re on the list — thanks! (Saved in this browser; email delivery is coming soon.)</p>
        ) : (
          <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-2 mt-2 max-w-md">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
              className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-colors">Subscribe</button>
          </form>
        )}
        <p className="text-[11px] text-slate-400 mt-2">Prefer to read now? Explore <Link href="/news" className="text-blue-600 hover:text-blue-500">the news feed</Link> or the curated <Link href="/newsletters" className="text-blue-600 hover:text-blue-500">newsletters</Link>.</p>
      </div>

      {/* This edition */}
      <div>
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Top stories</h2>
        <div className="space-y-3">
          {latest.map((n, i) => (
            <div key={n.id} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center">{i + 1}</span>
              <div>
                <Link href={n.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-900 hover:text-blue-600">{n.title}</Link>
                <p className="text-sm text-slate-600 leading-relaxed">{n.summary}</p>
                <Link href={n.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-500 inline-flex items-center gap-1">{n.source} <ExternalLink className="w-3 h-3" /></Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">On the calendar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {upcoming.map((e) => (
            <Link key={e.id} href={e.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-sm transition-shadow">
              <p className="text-sm font-medium text-slate-800">{e.name}</p>
              <p className="text-xs text-slate-500">{e.when} · {e.location}</p>
            </Link>
          ))}
        </div>
        <Link href="/events" className="text-xs text-blue-600 hover:text-blue-500 mt-2 inline-block">See all events →</Link>
      </div>
    </div>
  );
}
