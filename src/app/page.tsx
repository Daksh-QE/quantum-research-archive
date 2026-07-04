"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Atom } from "lucide-react";

/* helpers */
function shuffle<T>(arr: T[], seed: number): T[] {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    const s = (seed * 16807 + i * 17239) % 2147483647;
    const j = s % (i + 1);
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

/* tile: a decorative card. h sizes it, ox/oy nudge it organically, rot tilts it. */
interface Tile { uid: string; html: string; h: number; ox: number; oy: number; }

const H = { BOOK: 250, YT: 156, REPO: 150, PAPER: 118, PERSON: 84, COMPANY: 72, COURSE: 72, TOOL: 72, ARTICLE: 104, CHALLENGE: 104, HUB: 72, JOB: 92 };

function buildTiles(): Tile[] {
  const T: Tile[] = [];
  let u = 0;
  // content + height + background -> a tilted, slightly-nudged tile
  const add = (inner: string, h: number, bg: string) => {
    const seed = (u * 2654435761) >>> 0;
    const rot = ((seed % 640) / 100 - 3.2).toFixed(2);       // -3.2°..3.2°
    const ox = ((seed >>> 7) % 13) - 6;                       // -6..6 px
    const oy = ((seed >>> 15) % 13) - 6;                      // -6..6 px
    T.push({
      uid: `t${u}`, h, ox, oy,
      html: `<div class="lc" style="background:${bg};transform:rotate(${rot}deg)">${inner}</div>`,
    });
    u++;
  };

  /* videos — thumbnail + title */
  const YT: [string, string][] = [
    ["https://i.ytimg.com/vi/fNk_zzaMoSs/mqdefault.jpg", "Some light quantum mechanics · 3Blue1Brown"],
    ["https://i.ytimg.com/vi/k7RM-ot2NWY/mqdefault.jpg", "The Schrödinger equation"],
    ["https://i.ytimg.com/vi/kYB8IZa5AuE/mqdefault.jpg", "Bell's inequality · 3Blue1Brown"],
    ["https://i.ytimg.com/vi/JhHMJCUmq28/mqdefault.jpg", "What is quantum computing? · Kurzgesagt"],
  ];
  for (const [thumb, title] of YT)
    add(`<img src="${thumb}" alt="" loading="lazy" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" onerror="this.remove()"/><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M8 5v14l11-7z"/></svg></div><div style="position:absolute;left:0;right:0;bottom:0;padding:8px 11px 8px;background:linear-gradient(transparent,rgba(0,0,0,0.82));color:#fff;font-size:11px;line-height:1.3">${title}</div>`, H.YT, "#111");

  /* books — covers (title is on the cover) */
  const BOOKS: [string, string][] = [
    ["https://covers.openlibrary.org/b/id/14614256-L.jpg", "Nielsen & Chuang"],
    ["https://covers.openlibrary.org/b/id/258369-L.jpg", "Principles of QM"],
    ["https://covers.openlibrary.org/b/id/10442491-L.jpg", "Griffiths QM"],
    ["https://covers.openlibrary.org/b/id/12618219-L.jpg", "Sakurai"],
    ["https://covers.openlibrary.org/b/id/10136939-L.jpg", "QC for CS"],
    ["https://covers.openlibrary.org/b/id/14327819-L.jpg", "Quantum Info Theory"],
  ];
  for (const [img] of BOOKS)
    add(`<img src="${img}" alt="" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;display:block" onerror="this.parentElement.innerHTML='<div style=&quot;position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#9ca3af;font-size:10px&quot;>book</div>'"/>`, H.BOOK, "#e9e9ef");

  /* repos — github preview cards */
  const REPS = ["qiskit/qiskit", "quantumlib/Stim", "PennyLaneAI/pennylane", "qutip/qutip", "aws/amazon-braket-sdk-python"];
  for (const repo of REPS)
    add(`<img src="https://opengraph.githubassets.com/1/${repo}" alt="" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;display:block" onerror="this.parentElement.innerHTML='<div style=&quot;position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#8b949e;font-size:10px&quot;>${repo}</div>'"/>`, H.REPO, "#0d1117");

  /* key people */
  const PEOPLE: [string, string, string][] = [
    ["Peter Shor", "PS", "#6366f1"], ["John Preskill", "JP", "#6366f1"], ["Scott Aaronson", "SA", "#22c55e"],
    ["David Deutsch", "DD", "#6366f1"], ["Alexei Kitaev", "AK", "#6366f1"], ["Charles Bennett", "CB", "#6366f1"],
    ["Michael Nielsen", "MN", "#22c55e"], ["Richard Feynman", "RF", "#8b5cf6"], ["Anton Zeilinger", "AZ", "#6366f1"],
    ["Daniel Gottesman", "DG", "#6366f1"], ["Lov Grover", "LG", "#6366f1"], ["Dorit Aharonov", "DA", "#22c55e"],
  ];
  for (const [name, init, color] of PEOPLE)
    add(`<div style="position:absolute;inset:0;display:flex;align-items:center;gap:8px;padding:0 14px;background:#f8f8ff"><div style="width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:white;flex-shrink:0;background:${color}">${init}</div><span class="lc-name">${name}</span></div>`, H.PERSON, "#f8f8ff");

  /* landmark papers — title + author */
  const PAPERS: [string, string][] = [
    ["Polynomial-time factoring on a quantum computer", "Shor · 1994"],
    ["A fast quantum algorithm for database search", "Grover · 1996"],
    ["Teleporting an unknown quantum state", "Bennett et al. · 1993"],
    ["Fault-tolerant computation by anyons", "Kitaev · 1997"],
    ["Quantum supremacy with a programmable processor", "Arute et al. · 2019"],
    ["Simulating Physics with Computers", "Feynman · 1982"],
    ["Quantum Computing in the NISQ era and beyond", "Preskill · 2018"],
    ["Error correcting codes in quantum theory", "Steane · 1996"],
  ];
  for (const [t, a] of PAPERS)
    add(`<div style="position:absolute;inset:0;padding:12px 14px;display:flex;flex-direction:column;gap:3px;background:#fafaff"><div style="display:flex;gap:6px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.5" style="flex-shrink:0;margin-top:1px"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg><div class="lc-title">${t}</div></div><div class="lc-sub">${a}</div></div>`, H.PAPER, "#fafaff");

  /* labs / companies */
  const LABS: [string, string][] = [
    ["IBM Quantum", "#6366f1"], ["Google Quantum AI", "#4285F4"], ["AWS Braket", "#FF9900"], ["Microsoft Quantum", "#00A4EF"],
    ["Xanadu", "#06b6d4"], ["IonQ", "#8b5cf6"], ["Rigetti", "#f59e0b"], ["Quantinuum", "#ef4444"], ["D-Wave", "#22c55e"], ["PsiQuantum", "#06b6d4"],
  ];
  for (const [name, color] of LABS)
    add(`<div style="position:absolute;inset:0;display:flex;align-items:center;gap:7px;padding:0 14px;background:${color}12;border-left:2px solid ${color}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" style="flex-shrink:0"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/></svg><span class="lc-name">${name}</span></div>`, H.COMPANY, `${color}12`);

  /* tools / SDKs */
  const TOOLS: [string, string][] = [
    ["Qiskit", "#6366f1"], ["Cirq", "#4285F4"], ["PennyLane", "#06b6d4"], ["QuTiP", "#22c55e"], ["Stim", "#8b5cf6"],
    ["Q#", "#00A4EF"], ["Amazon Braket", "#FF9900"], ["tket", "#ef4444"], ["OpenQASM", "#111"], ["Ocean SDK", "#22c55e"],
  ];
  for (const [name, color] of TOOLS)
    add(`<div style="position:absolute;inset:0;display:flex;align-items:center;gap:7px;padding:0 14px;background:${color}12;border-left:2px solid ${color}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" style="flex-shrink:0"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg><span class="lc-name">${name}</span></div>`, H.TOOL, `${color}12`);

  /* courses */
  const COURSES = ["MIT 8.04 — Quantum Physics I", "MIT 8.05 — Quantum Physics II", "IBM Quantum Learning", "Caltech Ph 219 — Preskill", "PennyLane Codebook", "Waterloo IQC"];
  for (const name of COURSES)
    add(`<div style="position:absolute;inset:0;display:flex;align-items:center;gap:7px;padding:0 14px;background:#fefce8"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a16207" stroke-width="1.5" style="flex-shrink:0"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg><span class="lc-name">${name}</span></div>`, H.COURSE, "#fefce8");

  /* articles / explainers */
  const ARTICLES: [string, string][] = [
    ["Quantum Computing for the Very Curious", "Matuschak & Nielsen"],
    ["The Limits of Quantum Computers", "Scott Aaronson"],
    ["Introduction to Quantum Error Correction", "Daniel Gottesman"],
    ["Quantum Machine Learning: A Review", "Biamonte et al."],
    ["The Physical Implementation of QC", "DiVincenzo"],
  ];
  for (const [t, a] of ARTICLES)
    add(`<div style="position:absolute;inset:0;padding:12px 14px;display:flex;flex-direction:column;gap:3px;background:#fffdf8"><div class="lc-title">${t}</div><div class="lc-sub">${a}</div></div>`, H.ARTICLE, "#fffdf8");

  /* challenges */
  const CHALLENGES: [string, string, string][] = [
    ["Create a Bell State Circuit", "beginner", "#22c55e"], ["Grover's Search Algorithm", "intermediate", "#f59e0b"],
    ["Quantum Teleportation Protocol", "intermediate", "#f59e0b"], ["Shor's Algorithm — Factor 15", "advanced", "#ef4444"],
    ["Surface Code Distance-3", "advanced", "#ef4444"], ["VQE for Hydrogen Molecule", "intermediate", "#f59e0b"],
  ];
  for (const [t, d, c] of CHALLENGES)
    add(`<div style="position:absolute;inset:0;padding:12px 14px;display:flex;flex-direction:column;gap:3px;background:#faf8f0"><div class="lc-title">${t}</div><div class="lc-sub" style="color:${c};font-weight:600;text-transform:uppercase;font-size:9px">${d}</div></div>`, H.CHALLENGE, "#faf8f0");

  /* community hubs */
  const HUBS: [string, string][] = [
    ["r/QuantumComputing", "#FF4500"], ["Quantum Computing SE", "#6366f1"], ["Unitary Fund Discord", "#5865F2"],
    ["PennyLane Forum", "#6366f1"], ["Qiskit Slack", "#4A154B"], ["r/QuantumPhysics", "#FF4500"],
  ];
  for (const [name, color] of HUBS)
    add(`<div style="position:absolute;inset:0;display:flex;align-items:center;gap:8px;padding:0 14px;background:${color}12"><div style="width:8px;height:8px;border-radius:50%;background:${color};flex-shrink:0"></div><span class="lc-name">${name}</span></div>`, H.HUB, `${color}12`);

  return shuffle(T, 13);
}

/* component */
export default function LandingPage() {
  const tiles = useMemo(() => buildTiles(), []);
  const vpRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<Tile[]>([]);
  const activeRef = useRef<Map<string, { el: HTMLDivElement; item: Tile }>>(new Map());
  const freeRef = useRef<HTMLDivElement[]>([]);
  const camRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: -220, y: -120 });
  const dragRef = useRef(false);
  const rafRef = useRef(0);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/repos/Daksh-QE/quantum-research-archive", { cache: "no-store" })
      .then((r) => r.json()).then((d) => setStars(d.stargazers_count || 0)).catch(() => {});
  }, []);

  const COLS = 9, GAP = 3, W = 264;

  useEffect(() => { layoutRef.current = tiles; }, [tiles]);

  useEffect(() => {
    const vp = vpRef.current, canvas = canvasRef.current;
    if (!vp || !canvas) return;
    const acquire = () => freeRef.current.pop() ?? (() => {
      const el = document.createElement("div");
      el.style.position = "absolute"; el.style.width = W + "px";
      canvas.appendChild(el);
      return el;
    })();
    const release = (el: HTMLDivElement) => { el.style.display = "none"; freeRef.current.push(el); };
    const items = layoutRef.current;
    const cols = COLS, cw = W + GAP;
    // masonry: spread tiles across columns, each column stacks flush
    const colTiles: Tile[][] = Array.from({ length: cols }, () => []);
    items.forEach((t, i) => colTiles[i % cols].push(t));
    const colTops: number[][] = [];
    const colCycle: number[] = [];
    for (let c = 0; c < cols; c++) {
      const tops: number[] = []; let y = 0;
      for (const t of colTiles[c]) { tops.push(y); y += t.h + GAP; }
      colTops.push(tops); colCycle.push(y || 1);
    }

    // tiles are placed once at fixed WORLD coordinates; the canvas layer is
    // what moves each frame, so per-frame work is one transform + edge churn.
    const render = () => {
      const vw = window.innerWidth, vh = window.innerHeight, cam = camRef.current, buf = 360;
      const sc = Math.floor((-cam.x - buf) / cw), ec = Math.ceil((-cam.x + vw + buf) / cw);
      const wy0 = -cam.y - buf, wy1 = -cam.y + vh + buf;
      const vis = new Set<string>();
      for (let c = sc; c < ec; c++) {
        const b = ((c % cols) + cols) % cols;
        const ts = colTiles[b]; if (!ts.length) continue;
        const tops = colTops[b], cycle = colCycle[b], colX = c * cw;
        const kStart = Math.floor(wy0 / cycle) - 1, kEnd = Math.ceil(wy1 / cycle) + 1;
        for (let k = kStart; k <= kEnd; k++) {
          for (let i = 0; i < ts.length; i++) {
            const tile = ts[i];
            const wy = k * cycle + tops[i] + tile.oy;
            if (wy + tile.h < wy0 || wy > wy1) continue;
            const vk = `${c}_${i}_${k}`;
            vis.add(vk);
            if (activeRef.current.has(vk)) continue; // already placed in world space
            const el = acquire();
            el.innerHTML = tile.html; el.style.height = tile.h + "px";
            el.style.transform = `translate3d(${colX + tile.ox}px,${wy}px,0)`; el.style.display = "";
            activeRef.current.set(vk, { el, item: tile });
          }
        }
      }
      for (const [k, e] of activeRef.current) { if (!vis.has(k)) { release(e.el); activeRef.current.delete(k); } }
    };
    const anim = () => {
      if (!dragRef.current) { targetRef.current.x -= 0.12; targetRef.current.y -= 0.05; } // gentle drift
      const dx = targetRef.current.x - camRef.current.x, dy = targetRef.current.y - camRef.current.y;
      camRef.current.x += dx * 0.1; camRef.current.y += dy * 0.1;
      canvas.style.transform = `translate3d(${camRef.current.x.toFixed(2)}px,${camRef.current.y.toFixed(2)}px,0)`;
      render();
      rafRef.current = requestAnimationFrame(anim);
    };
    let px = 0, py = 0;
    const md = (e: MouseEvent) => { if (e.button !== 0) return; dragRef.current = true; px = e.clientX; py = e.clientY; vp.classList.add("grabbing"); };
    const mm = (e: MouseEvent) => { if (!dragRef.current) return; targetRef.current.x += e.clientX - px; targetRef.current.y += e.clientY - py; px = e.clientX; py = e.clientY; };
    const mu = () => { dragRef.current = false; vp.classList.remove("grabbing"); };
    const mw = (e: WheelEvent) => { e.preventDefault(); targetRef.current.x -= e.deltaX; targetRef.current.y -= e.deltaY; };
    const vis = () => { cancelAnimationFrame(rafRef.current); if (!document.hidden) rafRef.current = requestAnimationFrame(anim); };
    vp.addEventListener("mousedown", md); window.addEventListener("mousemove", mm); window.addEventListener("mouseup", mu); vp.addEventListener("wheel", mw, { passive: false });
    document.addEventListener("visibilitychange", vis);
    render(); rafRef.current = requestAnimationFrame(anim);
    return () => {
      cancelAnimationFrame(rafRef.current);
      vp.removeEventListener("mousedown", md); window.removeEventListener("mousemove", mm); window.removeEventListener("mouseup", mu);
      vp.removeEventListener("wheel", mw); document.removeEventListener("visibilitychange", vis);
      for (const [, e] of activeRef.current) e.el.remove();
      activeRef.current.clear(); freeRef.current.forEach((e) => e.remove()); freeRef.current = [];
    };
  }, [tiles]);

  return (
    <>
      <style>{`
        .landing-vp { position:fixed; inset:0; background:#f3f2ef; overflow:hidden; cursor:grab; user-select:none }
        .landing-vp.grabbing { cursor:grabbing }
        .landing-grid-canvas { position:absolute; inset:0; pointer-events:none; will-change:transform; transform:translateZ(0) }
        .lc { position:relative; width:100%; height:100%; border-radius:8px; overflow:hidden; border:1px solid rgba(0,0,0,0.05); box-shadow:0 1px 4px rgba(0,0,0,0.10); box-sizing:border-box }
        .lc-title { font-size:14px; font-weight:600; color:rgba(0,0,0,0.7); line-height:1.3; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden }
        .lc-sub { font-size:11px; color:rgba(0,0,0,0.42); overflow:hidden; text-overflow:ellipsis; white-space:nowrap }
        .lc-name { font-size:14px; font-weight:600; color:rgba(0,0,0,0.7); overflow:hidden; text-overflow:ellipsis; white-space:nowrap }
        .hero-card { background:rgba(246,245,242,0.94); border:1px solid rgba(0,0,0,0.07); box-shadow:0 4px 30px rgba(0,0,0,0.12); border-radius:18px }
      `}</style>
      <div className="landing-vp" ref={vpRef}><div className="landing-grid-canvas" ref={canvasRef} /></div>
      <Link href="/overview" aria-label="Enter the archive" className="fixed top-4 left-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white/90 px-3 py-1.5 text-[#1D1D1D] shadow-sm hover:bg-white transition-colors">
        <Atom className="w-4 h-4 text-indigo-600" />
        <span className="text-[12px] font-semibold tracking-tight">quantum research archive</span>
      </Link>
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className="hero-card px-8 py-8 sm:px-10 sm:py-9 max-w-sm mx-4 text-center pointer-events-auto">
          <h1 className="text-[20px] sm:text-[23px] font-bold text-[#1D1D1D] leading-tight tracking-tight">quantum research archive</h1>
          <p className="mt-1.5 text-sm text-[#6E6E6E]">Everything you need to go from zero to quantum — curated, free, and jargon-explained.</p>
        </div>
        <div className="pointer-events-auto mt-4 flex flex-wrap items-center justify-center gap-2">
          <Link href="/start" className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#1D1D1D] text-white text-[11px] font-semibold hover:bg-[#2a2a2a] transition-colors shadow-sm">
            Get Started <ArrowRight className="w-2.5 h-2.5" />
          </Link>
          <Link href="/overview" className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white text-[#4A4A4A] text-[11px] font-medium hover:bg-[#f3f3f3] transition-colors border border-[#E1E1E1] shadow-sm">
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
