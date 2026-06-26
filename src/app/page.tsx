"use client";

import React, { useMemo, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { resources } from "@/data/resources";
import { articles } from "@/data/articles";
import { tools } from "@/data/tools";
import { communityMembers } from "@/data/community";
import { curriculum } from "@/data/curriculum";

/* ── helpers ── */

function ytId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube") || u.hostname.includes("youtu.be")) {
      return u.searchParams.get("v") || u.pathname.slice(1) || null;
    }
  } catch {}
  return null;
}

function getDomain(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
}

function seededRand(seed: number): number {
  let s = (seed * 16807 + 0) % 2147483647;
  return (s & 0x7fffffff) / 0x7fffffff;
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(seededRand(seed + i) * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

/* ── tile types ── */

interface TileData {
  id: string;
  url: string;
  type: "yt" | "paper" | "book" | "person" | "tool" | "article" | "module";
  title: string;
  subtitle?: string;
  img?: string;
  initials?: string;
  color: string;
}

/* ── build tiles from real data ── */

function buildTiles(): TileData[] {
  const tiles: TileData[] = [];
  const colors = ["#6366f1", "#22c55e", "#f59e0b", "#ec4899", "#06b6d4", "#8b5cf6", "#14b8a6", "#f97316", "#e11d48", "#84cc16"];

  const rc = () => colors[Math.floor(seededRand(tiles.length + 1) * colors.length)];

  // YouTube resources
  for (const r of resources) {
    const vid = ytId(r.url);
    if (vid) {
      tiles.push({ id: r.id, url: r.url, type: "yt", title: r.title, subtitle: r.author, img: `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`, color: "#ff0000" });
    }
  }
  // YouTube from curriculum
  for (const m of curriculum) {
    for (const l of m.lessons) {
      const vid = ytId(l.url);
      if (vid && seededRand(tiles.length + 50) > 0.2)
        tiles.push({ id: l.id, url: l.url, type: "yt", title: l.title, img: `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`, color: "#ff0000" });
    }
  }

  // Paper-like entries from our papers data + curated
  const paperEntries = [
    ["Quantum theory, the Church–Turing principle", "David Deutsch", "https://royalsocietypublishing.org/doi/10.1098/rspa.1985.0070"],
    ["A fast quantum mechanical algorithm for database search", "Lov Grover", "https://arxiv.org/abs/quant-ph/9605043"],
    ["Polynomial-time algorithms for prime factorization", "Peter Shor", "https://arxiv.org/abs/quant-ph/9508027"],
    ["Teleporting an unknown quantum state", "Bennett et al.", "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.70.1895"],
    ["Quantum computational complexity", "Bernstein & Vazirani", "https://arxiv.org/abs/quant-ph/9701008"],
    ["Fault-tolerant quantum computation by anyons", "Alexei Kitaev", "https://arxiv.org/abs/quant-ph/9707021"],
    ["Quantum supremacy using a programmable superconducting processor", "Arute et al.", "https://www.nature.com/articles/s41586-019-1666-5"],
    ["Error correcting codes in quantum theory", "Andrew Steane", "https://arxiv.org/abs/quant-ph/9608021"],
    ["Superdense coding", "Bennett & Wiesner", "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.69.2881"],
  ];
  for (const [title, author, url] of paperEntries)
    tiles.push({ id: `p-${tiles.length}`, url, type: "paper", title, subtitle: author, color: "#6366f1" });

  // People — link to their Wikipedia or known URL
  for (const m of communityMembers)
    tiles.push({ id: m.id, url: m.url, type: "person", title: m.name, subtitle: m.role, initials: m.initials, color: m.role === "RES" ? "#6366f1" : m.role === "EDU" ? "#22c55e" : m.role === "BUILD" ? "#f59e0b" : "#8b5cf6" });

  // Books — link to their purchase page
  for (const r of resources.filter((x) => x.category === "Book"))
    tiles.push({ id: r.id, url: r.url, type: "book", title: r.title, subtitle: r.author, color: "#06b6d4" });

  // Tools
  for (const t of tools)
    tiles.push({ id: t.id, url: t.url, type: "tool", title: t.title, color: "#22c55e" });

  // Articles
  for (const a of articles)
    tiles.push({ id: a.id, url: a.url, type: "article", title: a.title, subtitle: a.author, color: "#ec4899" });

  // Modules
  for (const m of curriculum)
    tiles.push({ id: m.id, url: "/overview#" + m.id, type: "module", title: m.title.replace(/^\d+[\.\s]*/, ""), subtitle: `${m.lessons.length} lessons`, color: "#8b5cf6" });

  // Shuffle and duplicate heavily for density
  const s = shuffle(tiles, 7);
  return shuffle([...s, ...shuffle(tiles, 13), ...shuffle(tiles, 42), ...shuffle(tiles, 99), ...shuffle(tiles, 777)], 42);
}

/* ── GitHub icon (matches original style) ── */
function GitHubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* ── component ── */

export default function LandingPage() {
  const tiles = useMemo(() => buildTiles(), []);
  const gridRef = useRef<HTMLDivElement>(null);
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());

  const onImgError = useCallback((id: string) => {
    setImgErrors((prev) => new Set(prev).add(id));
  }, []);

  // Distribute into 6 columns for density
  const cols = 6;
  const colArrays: TileData[][] = Array.from({ length: cols }, () => []);
  tiles.forEach((t, i) => colArrays[i % cols].push(t));

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* ── infinite scrollable background canvas ── */}
      <div
        ref={gridRef}
        className="absolute inset-0 overflow-auto cursor-grab active:cursor-grabbing select-none"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Repeat columns 3x vertically so scrolling reveals more tiles */}
        <div className="flex gap-2 p-2 w-max" style={{ minHeight: "200vh" }}>
          {colArrays.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-2 w-48 shrink-0">
              {[...col, ...col, ...col].map((tile, ti) => {
                const key = `${tile.id}-${ci}-${ti}`;
                const hasImgErr = imgErrors.has(key);

                return (
                  <a
                    key={key}
                    href={tile.url}
                    target={tile.url.startsWith("http") ? "_blank" : undefined}
                    rel={tile.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block rounded-lg overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-white"
                    style={{ borderLeft: `3px solid ${tile.color}`, cursor: "pointer" }}
                    onClick={(e) => {
                      // Don't prevent default — let the link open normally
                    }}
                  >
                    {tile.type === "yt" && tile.img && !hasImgErr ? (
                      <div className="aspect-video bg-slate-100 relative">
                        <img
                          src={tile.img}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={() => onImgError(key)}
                        />
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-medium">
                          ▶ VIDEO
                        </div>
                      </div>
                    ) : tile.type === "person" ? (
                      <div className="flex items-center gap-2.5 p-2.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                          style={{ backgroundColor: tile.color }}
                        >
                          {tile.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[11px] font-medium text-slate-800 truncate">{tile.title}</div>
                          <div className="text-[9px] text-slate-400">@{tile.subtitle}</div>
                        </div>
                      </div>
                    ) : tile.type === "paper" ? (
                      <div className="p-2.5">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: tile.color }} />
                          <div className="min-w-0">
                            <div className="text-[11px] font-medium text-slate-800 leading-tight line-clamp-2">{tile.title}</div>
                            <div className="text-[9px] text-slate-400 mt-0.5 truncate">{tile.subtitle}</div>
                          </div>
                        </div>
                      </div>
                    ) : tile.type === "book" ? (
                      <div className="p-2.5 flex items-center gap-2">
                        <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: tile.color }}>
                          B
                        </div>
                        <div className="min-w-0">
                          <div className="text-[11px] font-medium text-slate-800 line-clamp-1">{tile.title}</div>
                          {tile.subtitle && <div className="text-[9px] text-slate-400 truncate">{tile.subtitle}</div>}
                        </div>
                      </div>
                    ) : tile.type === "tool" ? (
                      <div className="p-2.5 flex items-center gap-2">
                        <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ backgroundColor: tile.color }}>
                          T
                        </div>
                        <span className="text-[11px] font-medium text-slate-800 truncate">{tile.title}</span>
                      </div>
                    ) : tile.type === "article" ? (
                      <div className="p-2.5">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[9px] text-slate-400 truncate">{tile.subtitle || getDomain(tile.url)}</span>
                        </div>
                        <div className="text-[11px] text-slate-700 line-clamp-2 leading-tight font-medium">{tile.title}</div>
                      </div>
                    ) : tile.type === "module" ? (
                      <div className="p-2.5 flex items-center gap-2">
                        <div className="w-6 h-6 rounded flex items-center justify-center text-[9px] font-bold text-white shrink-0" style={{ backgroundColor: tile.color }}>
                          M
                        </div>
                        <div className="min-w-0">
                          <div className="text-[11px] text-slate-700 line-clamp-1 font-medium">{tile.title}</div>
                          <div className="text-[9px] text-slate-400">{tile.subtitle}</div>
                        </div>
                      </div>
                    ) : null}
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── hero overlay (75% opacity box) ── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        {/* Semi-transparent hero card */}
        <div className="pointer-events-auto bg-white/75 backdrop-blur-[2px] rounded-2xl shadow-xl border border-slate-200/60 px-8 py-10 sm:px-10 sm:py-10 max-w-md mx-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
            quantum research archive
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            the biggest quantum research archive on the internet. free, calm, ad-free.
          </p>
        </div>

        {/* Buttons + GitHub links — below the box, left-aligned */}
        <div className="pointer-events-auto w-full max-w-md mx-4 mt-5 space-y-3">
          <div className="flex items-center gap-2">
            <Link
              href="/overview"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
            >
              Get Started
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 text-slate-700 text-xs font-medium hover:bg-white transition-colors border border-slate-200"
            >
              Browse Archive
            </Link>
          </div>

          {/* GitHub boxes — 2 mini boxes like the original */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Daksh-QE/quantum-research-archive"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/90 text-slate-600 text-xs font-medium hover:bg-white transition-colors border border-slate-200 shadow-sm"
            >
              <GitHubIcon size={16} />
              Star on GitHub
            </a>
            <a
              href="https://github.com/Daksh-QE/quantum-research-archive"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/90 text-slate-600 text-xs font-medium hover:bg-white transition-colors border border-slate-200 shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Contribute
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
