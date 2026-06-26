"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resources } from "@/data/resources";
import { articles } from "@/data/articles";
import { tools } from "@/data/tools";
import { communityMembers } from "@/data/community";
import { curriculum } from "@/data/curriculum";
import { challenges } from "@/data/challenges";
import { communityHubs } from "@/data/communityHubs";
import { jobs } from "@/data/jobs";

function ytId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube") || u.hostname.includes("youtu.be"))
      return u.searchParams.get("v") || u.pathname.slice(1) || null;
  } catch {}
  return null;
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    let s = (seed * 16807 + (i * 17239)) % 2147483647;
    const j = s % (i + 1);
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

/* ── size tiers (height in px) ── */
const SZ = {
  BOOK: 180,     // large — portrait covers
  YT: 120,       // medium — video thumbnails
  REPO: 110,     // medium — GitHub OG images
  PAPER: 80,     // medium-small
  PERSON: 64,    // small
  LAB: 52,       // extra small — just text
  UNI: 52,       // extra small — favicon + text
  TOOL: 52,      // extra small
  ARTICLE: 68,   // small
  CHALLENGE: 72, // small
  HUB: 56,       // extra small
  JOB: 70,       // small
};

const BOOK_COVERS: [string, string, string][] = [
  ["Quantum Computation and Quantum Information", "https://covers.openlibrary.org/b/id/14614256-L.jpg", "https://www.cambridge.org/9781107002173"],
  ["Principles of Quantum Mechanics", "https://covers.openlibrary.org/b/id/258369-L.jpg", "https://www.springer.com/9780306447907"],
  ["Introduction to Quantum Mechanics", "https://covers.openlibrary.org/b/id/10442491-L.jpg", "https://www.cambridge.org/9781107189638"],
  ["Modern Quantum Mechanics", "https://covers.openlibrary.org/b/id/12618219-L.jpg", "https://www.cambridge.org/9781108422413"],
];
const GITHUB_REPOS: [string, string][] = [
  ["qiskit/qiskit", "https://opengraph.githubassets.com/1/qiskit/qiskit"],
  ["quantumlib/Stim", "https://opengraph.githubassets.com/1/quantumlib/Stim"],
  ["PennyLaneAI/pennylane", "https://opengraph.githubassets.com/1/PennyLaneAI/pennylane"],
  ["aws/amazon-braket-sdk-python", "https://opengraph.githubassets.com/1/aws/amazon-braket-sdk-python"],
  ["qutip/qutip", "https://opengraph.githubassets.com/1/qutip/qutip"],
  ["quantumai/qsim", "https://opengraph.githubassets.com/1/quantumai/qsim"],
];
const QUANTUM_LABS: [string, string][] = [
  ["IBM Quantum", "https://www.ibm.com/quantum"],
  ["Google Quantum AI", "https://quantumai.google/"],
  ["AWS Braket", "https://aws.amazon.com/braket/"],
  ["Microsoft Quantum", "https://azure.microsoft.com/products/quantum/"],
  ["Xanadu", "https://xanadu.ai/"],
  ["IonQ", "https://ionq.com/"],
  ["Rigetti", "https://www.rigetti.com/"],
  ["Quantinuum", "https://www.quantinuum.com/"],
  ["D-Wave", "https://www.dwavesys.com/"],
];
const UNIVERSITY_COURSES: [string, string][] = [
  ["MIT 8.04 — Quantum Physics I", "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/"],
  ["MIT 8.05 — Quantum Physics II", "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/"],
  ["Caltech Ph 125 — Quantum Mechanics", "https://theory.caltech.edu/people/preskill/ph125/"],
  ["Stanford QM", "https://theoreticalminimum.com/courses/quantum-mechanics/2012/winter"],
  ["Oxford Quantum", "https://www.cs.ox.ac.uk/quantum/"],
];

interface PoolItem { uid: string; url: string; html: string; h: number; }

function buildPool(): PoolItem[] {
  const items: PoolItem[] = [];
  let uid = 0;
  function push(html: string, url: string, h: number) {
    items.push({ uid: `c${uid++}`, url, html, h });
  }

  // 1. YouTube (varying heights)
  for (const r of resources) {
    const vid = ytId(r.url);
    if (vid) push(
      `<div class="lc lc-yt"><img class="lc-yt-img" src="https://i.ytimg.com/vi/${vid}/mqdefault.jpg" alt="" loading="lazy" onerror="this.parentElement.style.display='none'"/><div class="lc-play"><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg></div></div>`,
      r.url, SZ.YT);
  }
  for (const m of curriculum)
    for (const l of m.lessons) {
      const vid = ytId(l.url);
      if (vid) push(
        `<div class="lc lc-yt"><img class="lc-yt-img" src="https://i.ytimg.com/vi/${vid}/mqdefault.jpg" alt="" loading="lazy" onerror="this.parentElement.style.display='none'"/><div class="lc-play"><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg></div></div>`,
        l.url, SZ.YT);
    }

  // 2. Book covers (large)
  for (const [title, cover, url] of BOOK_COVERS)
    push(`<div class="lc lc-book"><img src="${cover}" alt="${title}" loading="lazy" style="display:block;width:100%;height:100%;object-fit:contain" onerror="this.parentElement.style.display='none'"/></div>`, url, SZ.BOOK);

  // 3. GitHub repos (medium)
  for (const [repo, og] of GITHUB_REPOS)
    push(`<div class="lc" style="background:#0d1117;border:none;border-radius:6px;overflow:hidden;position:relative"><img src="${og}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block" onerror="this.parentElement.style.display='none'"/><div style="position:absolute;bottom:4px;left:6px;display:flex;align-items:center;gap:4px"><svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg><span style="color:white;font-size:9px;font-weight:500;overflow:hidden;text-overflow:ellipsis">${repo}</span></div></div>`, `https://github.com/${repo}`, SZ.REPO);

  // 4. Quantum labs (small)
  for (const [name, url] of QUANTUM_LABS)
    push(`<div class="lc" style="display:flex;align-items:center;gap:6px;padding:0 10px;background:#f0f5ff;height:100%;box-sizing:border-box"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.5" style="flex-shrink:0"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/></svg><span class="lc-name" style="font-size:11px">${name}</span></div>`, url, SZ.LAB);

  // 5. University courses (small)
  for (const [name, url] of UNIVERSITY_COURSES) {
    const d = new URL(url).hostname;
    push(`<div class="lc" style="display:flex;align-items:center;gap:6px;padding:0 10px;background:#fefce8;height:100%;box-sizing:border-box"><img src="https://www.google.com/s2/favicons?domain=${d}&sz=32" alt="" style="width:16px;height:16px;border-radius:3px;flex-shrink:0" onerror="this.style.display='none'"/><span class="lc-name" style="font-size:11px">${name}</span></div>`, url, SZ.UNI);
  }

  // 6. People (small)
  for (const m of communityMembers)
    push(`<div class="lc" style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:#f8f8ff;height:100%;box-sizing:border-box"><div style="width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white;flex-shrink:0;background:${m.role === "RES" ? "#6366f1" : m.role === "EDU" ? "#22c55e" : m.role === "BUILD" ? "#f59e0b" : "#8b5cf6"}">${m.initials}</div><div style="min-width:0"><div class="lc-name" style="font-size:11px">${m.name}</div><div class="lc-sub" style="font-size:9px">${m.role}</div></div></div>`, m.url, SZ.PERSON);

  // 7. Papers (medium-small)
  const papers: [string, string, string][] = [
    ["Quantum theory, the Church–Turing principle", "Deutsch", "https://royalsocietypublishing.org/doi/10.1098/rspa.1985.0070"],
    ["A fast quantum mechanical algorithm for database search", "Grover", "https://arxiv.org/abs/quant-ph/9605043"],
    ["Polynomial-time algorithms for prime factorization", "Shor", "https://arxiv.org/abs/quant-ph/9508027"],
    ["Teleporting an unknown quantum state", "Bennett et al.", "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.70.1895"],
    ["Quantum computational complexity", "Bernstein & Vazirani", "https://arxiv.org/abs/quant-ph/9701008"],
    ["Fault-tolerant quantum computation by anyons", "Kitaev", "https://arxiv.org/abs/quant-ph/9707021"],
    ["Quantum supremacy", "Arute et al.", "https://www.nature.com/articles/s41586-019-1666-5"],
  ];
  for (const [t, a, u] of papers)
    push(`<div class="lc" style="padding:8px 10px;display:flex;align-items:flex-start;gap:6px;background:#fafaff;height:100%;box-sizing:border-box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.5" style="flex-shrink:0;margin-top:2px"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg><div style="min-width:0"><div class="lc-title" style="font-size:11px">${t}</div><div class="lc-sub" style="font-size:9px">${a}</div></div></div>`, u, SZ.PAPER);

  // 8. Tools (small)
  for (const t of tools)
    push(`<div class="lc" style="display:flex;align-items:center;gap:6px;padding:0 10px;background:#f0fdf4;height:100%;box-sizing:border-box"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="1.5" style="flex-shrink:0"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg><span class="lc-name" style="font-size:11px">${t.title}</span></div>`, t.url, SZ.TOOL);

  // 9. Articles (small)
  for (const a of articles)
    push(`<div class="lc" style="padding:8px 10px;display:flex;flex-direction:column;gap:2px;background:#fffdf8;height:100%;box-sizing:border-box"><div class="lc-title" style="font-size:11px">${a.title}</div><div class="lc-sub" style="font-size:9px">${a.author}</div></div>`, a.url, SZ.ARTICLE);

  // 10. Challenges (medium-small)
  for (const c of challenges) {
    const dc = c.difficulty === "beginner" ? "#22c55e" : c.difficulty === "intermediate" ? "#f59e0b" : "#ef4444";
    push(`<div class="lc" style="padding:8px 10px;display:flex;align-items:flex-start;gap:6px;background:#faf8f0;height:100%;box-sizing:border-box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${dc}" stroke-width="1.5" style="flex-shrink:0;margin-top:2px"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg><div style="min-width:0"><div class="lc-title" style="font-size:11px">${c.title}</div><div class="lc-sub" style="font-size:9px;color:${dc};font-weight:500">${c.difficulty}</div></div></div>`, c.url, SZ.CHALLENGE);
  }

  // 11. Community hubs (small)
  for (const h of communityHubs) {
    const bg = h.platform === "discord" ? "#5865F2" : h.platform === "reddit" ? "#FF4500" : h.platform === "x" ? "#000" : h.platform === "slack" ? "#4A154B" : "#6366f1";
    push(`<div class="lc" style="display:flex;align-items:center;gap:8px;padding:0 10px;background:${bg}10;height:100%;box-sizing:border-box"><div style="width:24px;height:24px;border-radius:5px;display:flex;align-items:center;justify-content:center;background:${bg};flex-shrink:0"><svg width="14" height="14" viewBox="0 0 256 199" fill="white"><path d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632c5.642-3.76 5.356-4.237 5.356-4.237 42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36Z"/></svg></div><span class="lc-name" style="font-size:11px">${h.name}</span></div>`, h.url, SZ.HUB);
  }

  // 12. Jobs (small)
  for (const j of jobs)
    push(`<div class="lc" style="padding:8px 10px;display:flex;align-items:flex-start;gap:6px;background:#f0faff;height:100%;box-sizing:border-box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="1.5" style="flex-shrink:0;margin-top:2px"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg><div style="min-width:0"><div class="lc-title" style="font-size:11px">${j.title}</div><div class="lc-sub" style="font-size:9px">${j.company}</div></div></div>`, j.url, SZ.JOB);

  return shuffle(items, 7);
}

export default function LandingPage() {
  const pool = useMemo(() => buildPool(), []);
  const vpRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<PoolItem[]>([]);
  const activeRef = useRef<Map<string, { el: HTMLDivElement; item: PoolItem }>>(new Map());
  const freeRef = useRef<HTMLDivElement[]>([]);
  const camRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: -200, y: -100 });
  const rafRef = useRef(0);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/repos/Daksh-QE/quantum-research-archive")
      .then((r) => r.json()).then((d) => setStars(d.stargazers_count || 0)).catch(() => {});
  }, []);

  const COLS = 10;
  const GAP = 2;

  useEffect(() => { layoutRef.current = pool; }, [pool]);

  useEffect(() => {
    const vp = vpRef.current, canvas = canvasRef.current;
    if (!vp || !canvas) return;
    const acquire = () => freeRef.current.pop() ?? (() => {
      const el = document.createElement("div");
      el.className = "lc-pool";
      el.style.position = "absolute";
      el.style.width = "200px";
      el.style.borderRadius = "5px";
      el.style.overflow = "hidden";
      el.style.cursor = "pointer";
      canvas.appendChild(el);
      return el;
    })();
    const release = (el: HTMLDivElement) => { el.style.display = "none"; freeRef.current.push(el); };
    const items = layoutRef.current;
    const total = items.length;
    const cw = 200 + GAP;

    // Pre-compute one strip's row heights
    const rowsPerStrip = Math.ceil(total / COLS);
    const rowHeights: number[] = [];
    for (let r = 0; r < rowsPerStrip; r++) {
      let maxH = 0;
      for (let c = 0; c < COLS; c++) {
        const idx = r * COLS + c;
        if (idx < total) maxH = Math.max(maxH, items[idx].h);
      }
      rowHeights.push(maxH || 120);
    }
    const stripH = rowHeights.reduce((a, b) => a + b + GAP, 0);

    const render = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const cam = camRef.current;
      const buf = 600;
      const sc = Math.floor((-cam.x - buf) / cw), ec = Math.ceil((-cam.x + vw + buf) / cw);
      // For y, use strip-based scrolling
      const startStrip = Math.floor((-cam.y - buf) / stripH);
      const endStrip = Math.ceil((-cam.y + vh + buf) / stripH);
      const visible = new Set<string>();

      for (let si = startStrip; si < endStrip; si++) {
        let yOff = 0;
        for (let r = 0; r < rowsPerStrip; r++) {
          for (let c = sc; c < ec; c++) {
            const idx = r * COLS + c;
            const tileIdx = idx % total;
            const tile = items[tileIdx];
            if (!tile) continue;
            const rowH = rowHeights[r];
            const sx = c * cw + cam.x;
            const sy = si * stripH + yOff + cam.y;
            if (sx + cw < -buf || sx > vw + buf || sy + rowH < -buf || sy > vh + buf) continue;
            const vk = `${c}_${si}_${r}`;
            visible.add(vk);
            const ex = activeRef.current.get(vk);
            if (ex) {
              if (ex.item.uid !== tile.uid) {
                ex.el.innerHTML = tile.html;
                ex.el.style.height = tile.h + "px";
                ex.item = tile;
              }
              ex.el.style.transform = `translate3d(${sx}px,${sy}px,0)`;
            } else {
              const el = acquire();
              el.innerHTML = tile.html;
              el.style.height = tile.h + "px";
              el.style.transform = `translate3d(${sx}px,${sy}px,0)`;
              el.style.display = "";
              el.onclick = () => { window.open(tile.url, "_blank"); };
              activeRef.current.set(vk, { el, item: tile });
            }
          }
          yOff += rowHeights[r] + GAP;
        }
      }
      for (const [k, e] of activeRef.current) { if (!visible.has(k)) { release(e.el); activeRef.current.delete(k); } }
    };

    const animate = () => {
      const dx = targetRef.current.x - camRef.current.x, dy = targetRef.current.y - camRef.current.y;
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) { camRef.current.x += dx * 0.12; camRef.current.y += dy * 0.12; render(); }
      rafRef.current = requestAnimationFrame(animate);
    };

    let drag = false, px = 0, py = 0;
    const md = (e: MouseEvent) => { if (e.button !== 0) return; drag = true; px = e.clientX; py = e.clientY; vp.classList.add("grabbing"); };
    const mm = (e: MouseEvent) => { if (!drag) return; targetRef.current.x += e.clientX - px; targetRef.current.y += e.clientY - py; px = e.clientX; py = e.clientY; };
    const mu = () => { drag = false; vp.classList.remove("grabbing"); };
    const mw = (e: WheelEvent) => { e.preventDefault(); targetRef.current.x -= e.deltaX; targetRef.current.y -= e.deltaY; };
    vp.addEventListener("mousedown", md); window.addEventListener("mousemove", mm); window.addEventListener("mouseup", mu); vp.addEventListener("wheel", mw, { passive: false });
    render(); rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      vp.removeEventListener("mousedown", md); window.removeEventListener("mousemove", mm); window.removeEventListener("mouseup", mu); vp.removeEventListener("wheel", mw);
      for (const [, e] of activeRef.current) e.el.remove();
      activeRef.current.clear(); freeRef.current.forEach((e) => e.remove()); freeRef.current = [];
    };
  }, [pool]);

  return (
    <>
      <style>{`
        .landing-vp { position:fixed; inset:0; background:#f2f2f2; overflow:hidden; cursor:grab; user-select:none; -webkit-user-select:none }
        .landing-vp.grabbing { cursor:grabbing }
        .landing-grid-canvas { position:absolute; inset:0; pointer-events:none }
        .lc-pool { pointer-events:auto }
        .lc-pool:hover { z-index:2; box-shadow:0 3px 10px rgba(0,0,0,0.12) }
        .lc { border-radius:5px; border:1px solid rgba(0,0,0,0.04); background:#fff; overflow:hidden; box-shadow:0 1px 2px rgba(0,0,0,0.03); height:100%; width:100%; box-sizing:border-box }
        .lc-title { font-size:11px; font-weight:400; color:rgba(0,0,0,0.5); line-height:1.3; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden }
        .lc-sub { font-size:9px; color:rgba(0,0,0,0.25); overflow:hidden; text-overflow:ellipsis; white-space:nowrap }
        .lc-name { font-size:11px; font-weight:500; color:rgba(0,0,0,0.5); overflow:hidden; text-overflow:ellipsis; white-space:nowrap }
        .lc-yt { position:relative; background:#111; border:none; border-radius:5px }
        .lc-yt-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover }
        .lc-play { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.1) }
        .lc-play svg { filter:drop-shadow(0 1px 3px rgba(0,0,0,0.3)); opacity:0.8 }
        .lc-book { border:none; background:#f0f0f0; border-radius:5px }
        .hero-card { background:rgba(242,242,242,0.95); backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); border:1px solid rgba(0,0,0,0.06); box-shadow:0 2px 20px rgba(0,0,0,0.06); border-radius:16px }
      `}</style>

      <div className="landing-vp" ref={vpRef}>
        <div className="landing-grid-canvas" ref={canvasRef} />
      </div>

      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className="hero-card px-8 py-8 sm:px-10 sm:py-9 max-w-sm mx-4 text-center pointer-events-auto">
          <h1 className="text-[20px] sm:text-[23px] font-bold text-[#1D1D1D] leading-tight tracking-tight">
            quantum research archive
          </h1>
          <p className="mt-1.5 text-sm text-[#6E6E6E]">
            the biggest quantum research archive on the internet
          </p>
        </div>

        <div className="pointer-events-auto mt-4 flex flex-wrap items-center justify-center gap-2">
          <Link href="/overview" className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#1D1D1D] text-white text-[11px] font-semibold hover:bg-[#2a2a2a] transition-colors shadow-sm">
            Get Started <ArrowRight className="w-2.5 h-2.5" />
          </Link>
          <Link href="/resources" className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white text-[#4A4A4A] text-[11px] font-medium hover:bg-[#f3f3f3] transition-colors border border-[#E1E1E1] shadow-sm">
            Browse Archive
          </Link>
          <a href="https://github.com/Daksh-QE/quantum-research-archive" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/90 text-[#6E6E6E] hover:bg-white transition-colors border border-[#E1E1E1] text-[11px] font-medium">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            {stars}
          </a>
          <a href="https://github.com/Daksh-QE/quantum-research-archive" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 text-[#6E6E6E] hover:bg-white transition-colors border border-[#E1E1E1] text-[11px] font-medium">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
            Contribute
          </a>
        </div>
      </div>
    </>
  );
}
