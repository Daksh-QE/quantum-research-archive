"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Check, X } from "lucide-react";

// surface-code matching graph, one error type (X errors / Z-stabilizers;
// phase-flip is symmetric). vertices = stabilizers on a dxd grid, data qubits =
// edges, rough boundaries left/right. logical error = residual chain links the
// two boundaries (odd parity of left-boundary edges).

type EdgeType = "h" | "v" | "bl" | "br";
type Family = "surface" | "repetition";
interface Edge { id: string; type: EdgeType; r: number; c: number; }
interface Lattice { rows: number; cols: number; edges: Edge[]; byId: Map<string, Edge>; }

// rows×cols stabilizer grid. Surface code: rows=cols=d. Repetition code: rows=1
// (a single chain of d stabilizers with two boundaries — corrects bit-flips only).
function buildLattice(rows: number, cols: number): Lattice {
  const edges: Edge[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 1; c++) edges.push({ id: `h:${r}:${c}`, type: "h", r, c });   // (r,c)-(r,c+1)
    edges.push({ id: `bl:${r}`, type: "bl", r, c: 0 });                                       // LB-(r,0)
    edges.push({ id: `br:${r}`, type: "br", r, c: cols - 1 });                                // (r,cols-1)-RB
  }
  for (let r = 0; r < rows - 1; r++)
    for (let c = 0; c < cols; c++) edges.push({ id: `v:${r}:${c}`, type: "v", r, c });         // (r,c)-(r+1,c)
  return { rows, cols, edges, byId: new Map(edges.map((e) => [e.id, e])) };
}
function latticeFor(family: Family, d: number): Lattice {
  return family === "surface" ? buildLattice(d, d) : buildLattice(1, d);
}

// The interior stabilizer vertices an edge touches (boundary node excluded).
function edgeVertices(e: Edge): [number, number][] {
  switch (e.type) {
    case "h": return [[e.r, e.c], [e.r, e.c + 1]];
    case "v": return [[e.r, e.c], [e.r + 1, e.c]];
    case "bl": return [[e.r, 0]];
    case "br": return [[e.r, e.c]]; // c is already d-1
  }
}

const vkey = (r: number, c: number) => `${r},${c}`;

// Syndrome: stabilizer vertices with an odd number of incident errors.
function syndromeOf(errors: Set<string>, lat: Lattice): { r: number; c: number }[] {
  const parity = new Map<string, number>();
  for (const id of errors) {
    const e = lat.byId.get(id); if (!e) continue;
    for (const [r, c] of edgeVertices(e)) parity.set(vkey(r, c), (parity.get(vkey(r, c)) || 0) + 1);
  }
  const lit: { r: number; c: number }[] = [];
  for (const [k, p] of parity) if (p % 2 === 1) { const [r, c] = k.split(",").map(Number); lit.push({ r, c }); }
  return lit;
}

// Manhattan graph distance between two stabilizer vertices.
const vdist = (a: { r: number; c: number }, b: { r: number; c: number }) => Math.abs(a.r - b.r) + Math.abs(a.c - b.c);
// Distance to the nearest rough (left/right) boundary, and which side.
function boundaryDist(v: { r: number; c: number }, d: number): { dist: number; side: "L" | "R" } {
  const left = v.c + 1, right = d - v.c;
  return left <= right ? { dist: left, side: "L" } : { dist: right, side: "R" };
}

interface Match { pairs: [number, number][]; boundary: number[]; weight: number; }

/* Exact minimum-weight perfect matching (bitmask DP) for small syndromes; each
   vertex matches another vertex or the boundary. Greedy fallback for large sets
   and for the explicit "greedy" decoder comparison. */
function mwpm(verts: { r: number; c: number }[], d: number): Match {
  const n = verts.length;
  if (n === 0) return { pairs: [], boundary: [], weight: 0 };
  const pd = verts.map((a) => verts.map((b) => vdist(a, b)));
  const bd = verts.map((v) => boundaryDist(v, d).dist);
  if (n > 14) return greedy(verts, d);
  const memo = new Map<number, Match>();
  const solve = (mask: number): Match => {
    if (mask === 0) return { pairs: [], boundary: [], weight: 0 };
    const hit = memo.get(mask); if (hit) return hit;
    let i = 0; while (!(mask & (1 << i))) i++;
    const rest0 = mask & ~(1 << i);
    let best: Match = (() => { const r = solve(rest0); return { pairs: r.pairs, boundary: [i, ...r.boundary], weight: r.weight + bd[i] }; })();
    for (let j = i + 1; j < n; j++) {
      if (!(mask & (1 << j))) continue;
      const r = solve(rest0 & ~(1 << j));
      const w = r.weight + pd[i][j];
      // ≤ so that on tied weights we prefer pairing syndromes over routing both
      // to the boundary — the more intuitive minimum-weight correction.
      if (w <= best.weight) best = { pairs: [[i, j], ...r.pairs], boundary: r.boundary, weight: w };
    }
    memo.set(mask, best); return best;
  };
  return solve((1 << n) - 1);
}

function greedy(verts: { r: number; c: number }[], d: number): Match {
  const n = verts.length; const used = new Array(n).fill(false);
  const pairs: [number, number][] = []; const boundary: number[] = []; let weight = 0;
  for (let i = 0; i < n; i++) {
    if (used[i]) continue;
    let bestJ = -1, bestW = boundaryDist(verts[i], d).dist;
    for (let j = i + 1; j < n; j++) { if (used[j]) continue; const w = vdist(verts[i], verts[j]); if (w < bestW) { bestW = w; bestJ = j; } }
    used[i] = true;
    if (bestJ >= 0) { used[bestJ] = true; pairs.push([i, bestJ]); weight += vdist(verts[i], verts[bestJ]); }
    else { boundary.push(i); weight += boundaryDist(verts[i], d).dist; }
  }
  return { pairs, boundary, weight };
}

// Edges along the shortest path between two vertices (horizontal then vertical).
function pathEdges(a: { r: number; c: number }, b: { r: number; c: number }): string[] {
  const ids: string[] = [];
  const r0 = a.r, c0 = a.c, r1 = b.r, c1 = b.c;
  for (let c = Math.min(c0, c1); c < Math.max(c0, c1); c++) ids.push(`h:${r0}:${c}`);
  for (let r = Math.min(r0, r1); r < Math.max(r0, r1); r++) ids.push(`v:${r}:${c1}`);
  return ids;
}
// Edges from a vertex out to its nearest rough boundary.
function boundaryPathEdges(v: { r: number; c: number }, d: number): string[] {
  const { side } = boundaryDist(v, d); const ids: string[] = [];
  if (side === "L") { for (let c = 0; c < v.c; c++) ids.push(`h:${v.r}:${c}`); ids.push(`bl:${v.r}`); }
  else { for (let c = v.c; c < d - 1; c++) ids.push(`h:${v.r}:${c}`); ids.push(`br:${v.r}`); }
  return ids;
}

interface Decoded { correction: Set<string>; match: Match; verts: { r: number; c: number }[]; logicalError: boolean; }

function decode(errors: Set<string>, lat: Lattice, kind: "mwpm" | "greedy"): Decoded {
  const verts = syndromeOf(errors, lat);
  const match = kind === "mwpm" ? mwpm(verts, lat.cols) : greedy(verts, lat.cols);
  const correction = new Set<string>();
  const toggle = (id: string) => (correction.has(id) ? correction.delete(id) : correction.add(id));
  for (const [i, j] of match.pairs) for (const id of pathEdges(verts[i], verts[j])) toggle(id);
  for (const i of match.boundary) for (const id of boundaryPathEdges(verts[i], lat.cols)) toggle(id);
  // Residual = error XOR correction; logical error = odd # of left-boundary edges.
  const residual = new Set<string>(errors);
  for (const id of correction) residual.has(id) ? residual.delete(id) : residual.add(id);
  let blParity = 0;
  for (const id of residual) if (id.startsWith("bl:")) blParity ^= 1;
  return { correction, match, verts, logicalError: blParity === 1 };
}

/* Toy analytic logical-error rate — only used before a Monte-Carlo run exists. */
function logicalRate(phys: number, d: number): number {
  const threshold = 0.1;
  if (phys >= 0.5) return 0.5;
  const ratio = phys / threshold;
  if (ratio >= 1) return Math.min(0.5, phys);
  return 0.5 * Math.pow(ratio, (d + 1) / 2);
}

/* Real Monte-Carlo: sample independent per-edge errors at rate p, decode with
   MWPM, and measure the empirical logical-error rate. Repeated across a sweep of
   p for several distances, the curves cross at the code's true threshold. */
function monteCarlo(family: Family, d: number, p: number, trials: number, rng: () => number): number {
  const lat = latticeFor(family, d);
  let fails = 0;
  for (let t = 0; t < trials; t++) {
    const errors = new Set<string>();
    for (const e of lat.edges) if (rng() < p) errors.add(e.id);
    if (decode(errors, lat, "mwpm").logicalError) fails++;
  }
  return fails / trials;
}
interface MCSeries { d: number; points: { p: number; rate: number }[]; }

/* #1/#2 Measurement errors + multi-round space-time decoding    A measurement error makes a stabilizer report the wrong value in one round.
   A naive "single-shot" decoder trusts a single round and mistakes measurement
   errors for data errors. A space-time decoder repeats the measurement R times
   (+ one perfect final round) and matches DETECTION EVENTS — differences between
   consecutive rounds — in a 3D (space × time) graph, so measurement errors show
   up as short time-like pairs that carry no spatial correction. */
function matchGeneric(n: number, dist: (i: number, j: number) => number, bnd: (i: number) => number): { pairs: [number, number][]; boundary: number[] } {
  if (n === 0) return { pairs: [], boundary: [] };
  if (n > 14) {
    const used = new Array(n).fill(false); const pairs: [number, number][] = []; const boundary: number[] = [];
    for (let i = 0; i < n; i++) { if (used[i]) continue; let bj = -1, bw = bnd(i); for (let j = i + 1; j < n; j++) { if (used[j]) continue; const w = dist(i, j); if (w < bw) { bw = w; bj = j; } } used[i] = true; if (bj >= 0) { used[bj] = true; pairs.push([i, bj]); } else boundary.push(i); }
    return { pairs, boundary };
  }
  const memo = new Map<number, { pairs: [number, number][]; boundary: number[]; weight: number }>();
  const solve = (mask: number): { pairs: [number, number][]; boundary: number[]; weight: number } => {
    if (mask === 0) return { pairs: [], boundary: [], weight: 0 };
    const hit = memo.get(mask); if (hit) return hit;
    let i = 0; while (!(mask & (1 << i))) i++;
    const r0 = mask & ~(1 << i);
    let best = (() => { const r = solve(r0); return { pairs: r.pairs, boundary: [i, ...r.boundary], weight: r.weight + bnd(i) }; })();
    for (let j = i + 1; j < n; j++) { if (!(mask & (1 << j))) continue; const r = solve(r0 & ~(1 << j)); const w = r.weight + dist(i, j); if (w <= best.weight) best = { pairs: [[i, j], ...r.pairs], boundary: r.boundary, weight: w }; }
    memo.set(mask, best); return best;
  };
  const r = solve((1 << n) - 1); return { pairs: r.pairs, boundary: r.boundary };
}
function allStabsList(lat: Lattice): { r: number; c: number }[] { const o: { r: number; c: number }[] = []; for (let r = 0; r < lat.rows; r++) for (let c = 0; c < lat.cols; c++) o.push({ r, c }); return o; }
function litKeysOf(errors: Set<string>, lat: Lattice): Set<string> { return new Set(syndromeOf(errors, lat).map((v) => vkey(v.r, v.c))); }
function corrFromMatch(verts: { r: number; c: number }[], m: { pairs: [number, number][]; boundary: number[] }, cols: number): Set<string> {
  const corr = new Set<string>(); const t = (id: string) => (corr.has(id) ? corr.delete(id) : corr.add(id));
  for (const [i, j] of m.pairs) for (const id of pathEdges(verts[i], verts[j])) t(id);
  for (const i of m.boundary) for (const id of boundaryPathEdges(verts[i], cols)) t(id);
  return corr;
}
function logicalFrom(trueError: Set<string>, corr: Set<string>): boolean {
  const res = new Set(trueError); for (const id of corr) res.has(id) ? res.delete(id) : res.add(id);
  let bl = 0; for (const id of res) if (id.startsWith("bl:")) bl ^= 1; return bl === 1;
}
// Returns whether each decoder produced a logical error on the same noisy data.
function simulateCompare(lat: Lattice, R: number, pData: number, pMeas: number, rng: () => number): { single: boolean; spacetime: boolean } {
  const trueError = new Set<string>();
  for (const e of lat.edges) if (rng() < pData) trueError.add(e.id);
  const trueLit = litKeysOf(trueError, lat);
  const stabs = allStabsList(lat);
  const meas: Set<string>[] = [];
  for (let t = 0; t < R; t++) { const m = new Set(trueLit); for (const s of stabs) if (rng() < pMeas) { const k = vkey(s.r, s.c); m.has(k) ? m.delete(k) : m.add(k); } meas.push(m); }
  meas.push(new Set(trueLit)); // perfect final readout closes the time boundary
  // single-shot: trust round 0 as if perfect
  const v0 = [...meas[0]].map((k) => { const [r, c] = k.split(",").map(Number); return { r, c }; });
  const m0 = matchGeneric(v0.length, (i, j) => vdist(v0[i], v0[j]), (i) => boundaryDist(v0[i], lat.cols).dist);
  const single = logicalFrom(trueError, corrFromMatch(v0, m0, lat.cols));
  // space-time: detection events = symmetric difference between consecutive rounds
  const events: { r: number; c: number; t: number }[] = [];
  for (let t = 0; t <= R; t++) {
    const prev = t === 0 ? new Set<string>() : meas[t - 1]; const cur = meas[t];
    for (const k of cur) if (!prev.has(k)) { const [r, c] = k.split(",").map(Number); events.push({ r, c, t }); }
    for (const k of prev) if (!cur.has(k)) { const [r, c] = k.split(",").map(Number); events.push({ r, c, t }); }
  }
  const me = matchGeneric(events.length, (i, j) => vdist(events[i], events[j]) + Math.abs(events[i].t - events[j].t), (i) => boundaryDist(events[i], lat.cols).dist);
  const corr = new Set<string>(); const tog = (id: string) => (corr.has(id) ? corr.delete(id) : corr.add(id));
  for (const [i, j] of me.pairs) for (const id of pathEdges(events[i], events[j])) tog(id); // spatial part only
  for (const i of me.boundary) for (const id of boundaryPathEdges(events[i], lat.cols)) tog(id);
  const spacetime = logicalFrom(trueError, corr);
  return { single, spacetime };
}
interface MRPoint { pMeas: number; single: number; spacetime: number; }
function measurementStudy(family: Family, d: number, R: number, pData: number, trials: number, rng: () => number): MRPoint[] {
  const lat = latticeFor(family, d);
  const pts: MRPoint[] = [];
  for (let pm = 0; pm <= 0.2001; pm += 0.025) {
    let s = 0, st = 0;
    for (let t = 0; t < trials; t++) { const r = simulateCompare(lat, R, pData, Math.round(pm * 1000) / 1000, rng); if (r.single) s++; if (r.spacetime) st++; }
    pts.push({ pMeas: Math.round(pm * 1000) / 1000, single: s / trials, spacetime: st / trials });
  }
  return pts;
}

/* Render geometry */
const SIZE = 500;
function edgeMid(e: Edge): { r: number; c: number } {
  switch (e.type) {
    case "h": return { r: e.r, c: e.c + 0.5 };
    case "v": return { r: e.r + 0.5, c: e.c };
    case "bl": return { r: e.r, c: -0.5 };
    case "br": return { r: e.r, c: e.c + 0.5 }; // c=d-1 → d-0.5
  }
}

export default function QECDashboard() {
  const [distance, setDistance] = useState(3);
  const [family, setFamily] = useState<Family>("surface");
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [errorRate, setErrorRate] = useState(0.1);
  const [decoderKind, setDecoderKind] = useState<"mwpm" | "greedy">("mwpm");
  const [decoded, setDecoded] = useState<Decoded | null>(null);
  const [showCurve, setShowCurve] = useState(true);
  const [targetLogError, setTargetLogError] = useState(1e-6);
  const [mcData, setMcData] = useState<MCSeries[] | null>(null);
  const [mcRunning, setMcRunning] = useState(false);
  const mcSeedRef = useRef(777);
  const [rounds, setRounds] = useState(5);
  const [mrData, setMrData] = useState<MRPoint[] | null>(null);
  const [mrRunning, setMrRunning] = useState(false);
  const mrRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const curveRef = useRef<HTMLCanvasElement>(null);

  const lat = useMemo(() => latticeFor(family, distance), [family, distance]);
  const seedRef = useRef(12345);
  const rand = () => { seedRef.current = (seedRef.current * 16807) % 2147483647; return (seedRef.current & 0x7fffffff) / 0x7fffffff; };

  // Reset when the code changes.
  useEffect(() => { setErrors(new Set()); setDecoded(null); }, [distance, family]);

  const syndrome = useMemo(() => syndromeOf(errors, lat), [errors, lat]);

  const randomErrors = useCallback(() => {
    const s = new Set<string>();
    for (const e of lat.edges) if (rand() < errorRate) s.add(e.id);
    setErrors(s); setDecoded(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, errorRate]);

  const clearErrors = () => { setErrors(new Set()); setDecoded(null); };
  const runDecoder = useCallback(() => { setDecoded(decode(errors, lat, decoderKind)); }, [errors, lat, decoderKind]);

  const download = (name: string, text: string, type = "text/plain") => {
    const blob = new Blob([text], { type }); const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const exportJSON = () => {
    const data = {
      code: "rotated surface code (single error type)", distance, decoder: decoderKind,
      dataQubits: lat.edges.map((e) => e.id),
      errors: [...errors],
      syndromes: syndrome.map((v) => ({ detector: v.r * distance + v.c, r: v.r, c: v.c })),
      correction: decoded ? [...decoded.correction] : null,
      matchWeight: decoded ? decoded.match.weight : null,
      logicalError: decoded ? decoded.logicalError : null,
    };
    download(`surface-d${distance}.json`, JSON.stringify(data, null, 2), "application/json");
  };
  const exportDEM = () => {
    // Stim-style detector error model: the decoding graph PyMatching consumes.
    const det = (r: number, c: number) => `D${r * lat.cols + c}`;
    const p = errorRate.toFixed(4);
    let s = `# Stim-style detector error model — ${family} code (one error type)\n`;
    s += `# distance=${distance}, per-edge error probability p=${p}\n`;
    s += `# D0..D${lat.rows * lat.cols - 1} are stabilizers; L0 is the logical observable\n`;
    for (const e of lat.edges) {
      const dets = edgeVertices(e).map(([r, c]) => det(r, c)).join(" ");
      s += `error(${p}) ${dets}${e.type === "bl" ? " L0" : ""}\n`;
    }
    download(`surface-d${distance}.dem`, s);
  };

  const runMonteCarlo = useCallback(() => {
    setMcRunning(true);
    // Defer a frame so the "Running…" state paints before the (synchronous) sweep.
    requestAnimationFrame(() => {
      let s = (mcSeedRef.current = (mcSeedRef.current * 16807 + 13) % 2147483647) || 1;
      const rng = () => { s = (s * 16807) % 2147483647; return (s & 0x7fffffff) / 0x7fffffff; };
      const ps: number[] = [];
      for (let p = 0.02; p <= 0.2001; p += 0.018) ps.push(Math.round(p * 1000) / 1000);
      const series: MCSeries[] = [3, 5, 7].map((d) => ({ d, points: ps.map((p) => ({ p, rate: monteCarlo(family, d, p, 400, rng) })) }));
      setMcData(series);
      setMcRunning(false);
    });
  }, [family]);

  const runStudy = useCallback(() => {
    setMrRunning(true);
    requestAnimationFrame(() => {
      let s = (mcSeedRef.current = (mcSeedRef.current * 16807 + 7) % 2147483647) || 1;
      const rng = () => { s = (s * 16807) % 2147483647; return (s & 0x7fffffff) / 0x7fffffff; };
      setMrData(measurementStudy(family, distance, rounds, errorRate, 300, rng));
      setMrRunning(false);
    });
  }, [family, distance, rounds, errorRate]);

  const toPx = (r: number, c: number) => {
    const cellX = SIZE / (lat.cols + 1), cellY = SIZE / (lat.rows + 1);
    return { x: (c + 1) * cellX, y: (r + 1) * cellY };
  };

  // Draw the lattice.
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.fillStyle = "#f8fafc"; ctx.fillRect(0, 0, SIZE, SIZE);
    const cellX = SIZE / (lat.cols + 1), cellY = SIZE / (lat.rows + 1);
    const cell = Math.min(cellX, cellY);
    const lit = new Set(syndrome.map((v) => vkey(v.r, v.c)));

    // rough boundary bars (left/right)
    ctx.fillStyle = "#fde68a";
    ctx.fillRect(0, 0, cell * 0.28, SIZE);
    ctx.fillRect(SIZE - cell * 0.28, 0, cell * 0.28, SIZE);

    // grid links (faint) between vertices
    ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1;
    for (const e of lat.edges) {
      const m = edgeMid(e);
      const vs = edgeVertices(e).map(([r, c]) => toPx(r, c));
      if (e.type === "bl") { const p = toPx(e.r, 0); ctx.beginPath(); ctx.moveTo(cell * 0.28, p.y); ctx.lineTo(p.x, p.y); ctx.stroke(); }
      else if (e.type === "br") { const p = toPx(e.r, lat.cols - 1); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(SIZE - cell * 0.28, p.y); ctx.stroke(); }
      else { ctx.beginPath(); ctx.moveTo(vs[0].x, vs[0].y); ctx.lineTo(vs[1].x, vs[1].y); ctx.stroke(); }
      void m;
    }

    // correction (green) — draw first so errors sit on top
    if (decoded) {
      ctx.strokeStyle = "#22c55e"; ctx.lineWidth = 4; ctx.setLineDash([]);
      for (const id of decoded.correction) {
        const e = lat.byId.get(id)!; const vs = edgeVertices(e).map(([r, c]) => toPx(r, c));
        if (e.type === "bl") { const p = toPx(e.r, 0); ctx.beginPath(); ctx.moveTo(cell * 0.28, p.y); ctx.lineTo(p.x, p.y); ctx.stroke(); }
        else if (e.type === "br") { const p = toPx(e.r, lat.cols - 1); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(SIZE - cell * 0.28, p.y); ctx.stroke(); }
        else { ctx.beginPath(); ctx.moveTo(vs[0].x, vs[0].y); ctx.lineTo(vs[1].x, vs[1].y); ctx.stroke(); }
      }
    }

    // data qubits (dots) + error highlight
    for (const e of lat.edges) {
      const m = edgeMid(e); const p = toPx(m.r, m.c);
      const hasErr = errors.has(e.id);
      ctx.beginPath(); ctx.arc(p.x, p.y, hasErr ? cell * 0.16 : cell * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = hasErr ? "#ef4444" : "#cbd5e1"; ctx.fill();
      if (hasErr) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke(); }
    }

    // stabilizer vertices (squares), lit if in syndrome
    for (let r = 0; r < lat.rows; r++) for (let c = 0; c < lat.cols; c++) {
      const p = toPx(r, c); const on = lit.has(vkey(r, c)); const s = cell * 0.26;
      ctx.fillStyle = on ? "#6366f1" : "#fff";
      ctx.strokeStyle = on ? "#4338ca" : "#94a3b8"; ctx.lineWidth = on ? 2 : 1;
      ctx.beginPath(); ctx.roundRect(p.x - s, p.y - s, s * 2, s * 2, 4); ctx.fill(); ctx.stroke();
      if (on) { ctx.fillStyle = "#fff"; ctx.font = `bold ${cell * 0.22}px sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("!", p.x, p.y); }
    }

    // matching lines (after decode)
    if (decoded) {
      ctx.strokeStyle = "#0ea5e9"; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
      for (const [i, j] of decoded.match.pairs) {
        const a = toPx(decoded.verts[i].r, decoded.verts[i].c), b = toPx(decoded.verts[j].r, decoded.verts[j].c);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      for (const i of decoded.match.boundary) {
        const v = decoded.verts[i]; const { side } = boundaryDist(v, lat.cols); const a = toPx(v.r, v.c);
        const bx = side === "L" ? cell * 0.28 : SIZE - cell * 0.28;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(bx, a.y); ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    // labels
    ctx.fillStyle = "#475569"; ctx.font = "12px sans-serif"; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
    ctx.fillText(`d = ${distance}`, 8, 16);
    ctx.fillText(`errors: ${errors.size} · syndromes: ${syndrome.length}`, 8, SIZE - 8);
  }, [errors, syndrome, decoded, distance, lat]);

  // Threshold curve.
  useEffect(() => {
    const canvas = curveRef.current; if (!canvas || !showCurve) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const w = canvas.width, h = canvas.height; ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#f8fafc"; ctx.fillRect(0, 0, w, h);
    const ml = 46, mr = 16, mt = 16, mb = 26, pw = w - ml - mr, ph = h - mt - mb;
    const xMax = mcData ? 0.21 : 0.4;
    ctx.strokeStyle = "#cbd5e1"; ctx.beginPath(); ctx.moveTo(ml, mt); ctx.lineTo(ml, h - mb); ctx.lineTo(w - mr, h - mb); ctx.stroke();
    const yOf = (v: number) => mt + ph - (Math.log10(Math.max(v * 100, 0.001)) + 3) / 3 * ph;
    const xOf = (p: number) => ml + (p / xMax) * pw;
    const colors = ["#3b82f6", "#22c55e", "#ef4444"];
    // y gridlines (decades)
    ctx.fillStyle = "#94a3b8"; ctx.font = "9px sans-serif"; ctx.textAlign = "right";
    for (const v of [0.001, 0.01, 0.1, 1]) { const y = yOf(v); ctx.fillText(`${v * 100}%`, ml - 4, y + 3); }
    ctx.textAlign = "left";
    if (mcData) {
      mcData.forEach((s, di) => {
        ctx.strokeStyle = colors[di]; ctx.fillStyle = colors[di]; ctx.lineWidth = 2; ctx.beginPath();
        s.points.forEach((pt, i) => { const x = xOf(pt.p), y = yOf(pt.rate); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
        ctx.stroke();
        for (const pt of s.points) { const x = xOf(pt.p), y = yOf(pt.rate); ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill(); }
        const last = s.points[s.points.length - 1]; ctx.fillText(`d=${s.d}`, xOf(last.p) - 4, yOf(last.rate) - 5);
      });
    } else {
      [3, 5, 7].forEach((d, di) => {
        ctx.strokeStyle = colors[di]; ctx.lineWidth = 2; ctx.beginPath();
        for (let px = 0; px <= pw; px++) { const phys = (px / pw) * xMax; const y = yOf(logicalRate(phys, d)); px === 0 ? ctx.moveTo(ml + px, y) : ctx.lineTo(ml + px, y); }
        ctx.stroke(); ctx.fillStyle = colors[di]; ctx.fillText(`d=${d}`, ml + pw * 0.8, yOf(logicalRate(0.32, d)) - 3);
      });
    }
    ctx.fillStyle = "#94a3b8"; ctx.textAlign = "center"; ctx.fillText("physical error rate", ml + pw / 2, h - 2);
    if (mcData) { ctx.fillStyle = "#334155"; ctx.font = "9px sans-serif"; ctx.fillText("empirical (sampled) — curves cross at the threshold", ml + pw / 2, mt - 4); }
  }, [showCurve, mcData]);

  // Measurement-error study plot: single-shot vs space-time logical rate vs pMeas.
  useEffect(() => {
    const canvas = mrRef.current; if (!canvas || !mrData) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const w = canvas.width, h = canvas.height; ctx.clearRect(0, 0, w, h); ctx.fillStyle = "#f8fafc"; ctx.fillRect(0, 0, w, h);
    const ml = 46, mr = 16, mt = 16, mb = 26, pw = w - ml - mr, ph = h - mt - mb;
    const xMax = 0.2, yMax = 0.55;
    ctx.strokeStyle = "#cbd5e1"; ctx.beginPath(); ctx.moveTo(ml, mt); ctx.lineTo(ml, h - mb); ctx.lineTo(w - mr, h - mb); ctx.stroke();
    const xOf = (p: number) => ml + (p / xMax) * pw, yOf = (v: number) => mt + ph - (v / yMax) * ph;
    ctx.fillStyle = "#94a3b8"; ctx.font = "9px sans-serif"; ctx.textAlign = "right";
    for (const v of [0, 0.25, 0.5]) ctx.fillText(`${Math.round(v * 100)}%`, ml - 4, yOf(v) + 3);
    const line = (key: "single" | "spacetime", color: string, label: string) => {
      ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2; ctx.beginPath();
      mrData.forEach((pt, i) => { const x = xOf(pt.pMeas), y = yOf(pt[key]); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
      ctx.stroke();
      for (const pt of mrData) { const x = xOf(pt.pMeas), y = yOf(pt[key]); ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill(); }
      const last = mrData[mrData.length - 1]; ctx.font = "10px sans-serif"; ctx.textAlign = "right"; ctx.fillText(label, xOf(last.pMeas) - 3, yOf(last[key]) - 5);
    };
    line("single", "#ef4444", "single-shot");
    line("spacetime", "#22c55e", "space-time");
    ctx.fillStyle = "#94a3b8"; ctx.textAlign = "center"; ctx.fillText("measurement error rate", ml + pw / 2, h - 2);
  }, [mrData]);

  const onCanvasClick = (ev: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const scale = SIZE / rect.width;
    const mx = (ev.clientX - rect.left) * scale, my = (ev.clientY - rect.top) * scale;
    let best: string | null = null, bestD = Infinity;
    for (const e of lat.edges) { const m = edgeMid(e); const p = toPx(m.r, m.c); const dd = Math.hypot(mx - p.x, my - p.y); if (dd < bestD) { bestD = dd; best = e.id; } }
    const cell = Math.min(SIZE / (lat.cols + 1), SIZE / (lat.rows + 1));
    if (best && bestD < cell * 0.45) {
      setErrors((prev) => { const n = new Set(prev); n.has(best!) ? n.delete(best!) : n.add(best!); return n; });
      setDecoded(null);
    }
  };

  const correctable = Math.floor((distance - 1) / 2);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">⊕</div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Surface Code Decoding Lab</h1>
          <p className="text-sm text-slate-500">Place your own errors on data qubits, run a real decoder, and see whether the logical qubit survived.</p>
        </div>
      </div>

      <details className="bg-white rounded-xl border border-slate-200 p-4 group">
        <summary className="text-sm font-semibold text-slate-900 cursor-pointer list-none flex items-center gap-2"><span className="text-indigo-600 text-base">?</span>How this works</summary>
        <div className="mt-3 text-sm text-slate-600 space-y-2 leading-relaxed">
          <p><strong>Data qubits</strong> are the small dots (the edges of the grid). <strong>Stabilizers</strong> are the squares. Click a data qubit to toggle a bit-flip <strong>error</strong> (red). Each error flips the stabilizers at its endpoints — those light up as <strong>syndromes</strong>.</p>
          <p>The <strong>decoder</strong> (MWPM = Minimum-Weight Perfect Matching) pairs syndromes along the shortest paths, or connects a lone syndrome to the nearest <strong>rough boundary</strong> (yellow bars). Its guess is the <span className="text-emerald-600 font-medium">green</span> correction.</p>
          <p>A <strong>logical error</strong> happens when your error + the decoder's correction together form a chain that crosses from the left boundary to the right — a <em>logical operator</em>. Then the data is silently corrupted. A distance-{distance} code is guaranteed to fix any {correctable} error(s).</p>
          <p className="text-slate-500">This shows one error type (bit-flip). Phase-flip decoding is identical by symmetry.</p>
        </div>
      </details>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Code Family</label>
              <div className="flex gap-2 mt-2">
                {([["surface", "Surface (2D)"], ["repetition", "Repetition (1D)"]] as const).map(([f, label]) => (
                  <button key={f} onClick={() => setFamily(f)}
                    title={f === "surface" ? "2D code; corrects both bit- and phase-flips" : "1D chain; corrects bit-flips only — a distance-d code needs d qubits in a line"}
                    className={`flex-1 px-2 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${family === f ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{label}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Code Distance</label>
              <div className="flex gap-2 mt-2">
                {[3, 5, 7].map((d) => (
                  <button key={d} onClick={() => setDistance(d)} title={`Corrects up to ${Math.floor((d - 1) / 2)} error(s)`}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${distance === d ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{d}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Decoder</label>
              <div className="flex gap-2 mt-2">
                {(["mwpm", "greedy"] as const).map((k) => (
                  <button key={k} onClick={() => { setDecoderKind(k); setDecoded(null); }}
                    title={k === "mwpm" ? "Exact minimum-weight perfect matching" : "Naive nearest-neighbour matching — sometimes wrong"}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${decoderKind === k ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                    {k === "mwpm" ? "MWPM" : "Greedy"}</button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Run both on the same errors — greedy can create a logical error where MWPM succeeds.</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Random Error Rate: {Math.round(errorRate * 100)}%</label>
              <input type="range" min="2" max="40" value={Math.round(errorRate * 100)} onChange={(e) => setErrorRate(parseInt(e.target.value) / 100)} className="w-full mt-2 accent-indigo-600" />
            </div>
            <button onClick={randomErrors} className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors">Sprinkle Random Errors</button>
            <button onClick={runDecoder} className="w-full py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors">Run {decoderKind === "mwpm" ? "MWPM" : "Greedy"} Decoder</button>
            <button onClick={clearErrors} className="w-full py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors">Clear</button>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-xs space-y-2">
            <p className="font-semibold text-slate-900">Legend</p>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-300" /><span className="text-slate-600">data qubit (click to add error)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /><span className="text-slate-600">bit-flip error</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-indigo-500" /><span className="text-slate-600">lit stabilizer (syndrome)</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-0.5 bg-emerald-500" /><span className="text-slate-600">decoder correction</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-0.5 border-t-2 border-dashed border-sky-500" /><span className="text-slate-600">matching</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-200" /><span className="text-slate-600">rough boundary</span></div>
          </div>

          {/* Physical qubit calculator (#3 corrected count) */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Physical Qubit Calculator</h3>
            <label className="text-xs text-slate-500">Target logical error rate:</label>
            <input type="range" min="1" max="15" value={-Math.log10(targetLogError)} onChange={(e) => setTargetLogError(Math.pow(10, -parseInt(e.target.value)))} className="w-full accent-indigo-600" />
            <div className="flex justify-between text-[10px] text-slate-400"><span>10⁻¹</span><span className="font-medium text-slate-600">10⁻{Math.round(-Math.log10(targetLogError))}</span><span>10⁻¹⁵</span></div>
            <div className="bg-indigo-50 rounded-lg p-3 text-xs space-y-1 mt-2">
              <p>At {Math.round(errorRate * 100)}% physical error rate:</p>
              {[3, 5, 7].map((d) => {
                const logErr = logicalRate(errorRate, d);
                const phys = 2 * d * d - 1; // rotated surface code: d² data + (d²−1) ancilla
                return <div key={d} className="flex justify-between text-slate-600"><span>Distance {d}:</span><span className="font-medium inline-flex items-center gap-1">{logErr < targetLogError ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-red-500" />} {phys} qubits</span></div>;
              })}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">A distance-d rotated surface code uses d² data + (d²−1) ancilla = 2d²−1 physical qubits.</p>
          </div>

          {/* Why it matters (#10) */}
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl border border-indigo-100 p-4 text-xs text-slate-600 leading-relaxed">
            <p className="font-semibold text-slate-800 mb-1">Why this matters</p>
            <p>Physical qubits fail ~1 in 100–1000 operations. To run a real algorithm you need a logical error rate near 10⁻¹⁵ — which means wrapping <strong>thousands</strong> of physical qubits around each logical one. Estimates put factoring RSA-2048 at roughly <strong>20 million</strong> physical qubits. That gap is why error correction, not just more qubits, is the central challenge.</p>
          </div>

          {/* Measurement errors & multi-round (#1, #2) */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1">Measurement Errors &amp; Rounds</h3>
            <p className="text-[10px] text-slate-400 mb-2">Real stabilizer measurements are themselves noisy. A single round can&apos;t tell a measurement error from a data error — you repeat the measurement and decode across time.</p>
            <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Rounds (R)</label>
            <div className="flex gap-2 mt-2 mb-3">
              {[1, 3, 5, 9].map((r) => (
                <button key={r} onClick={() => setRounds(r)}
                  className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${rounds === r ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{r}</button>
              ))}
            </div>
            <button onClick={runStudy} disabled={mrRunning}
              className="w-full py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 disabled:opacity-60 transition-colors">
              {mrRunning ? "Sampling…" : "Run measurement-error study"}
            </button>
            <p className="text-[10px] text-slate-400 mt-1">Compares a naive single-round decoder vs a space-time decoder ({rounds}-round) as measurement noise rises.</p>
          </div>

          {/* Export (#9) */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Export</h3>
            <div className="flex flex-col gap-2">
              <button onClick={exportJSON} className="py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-colors">Download instance (JSON)</button>
              <button onClick={exportDEM} className="py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-colors">Download Stim DEM (.dem)</button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">JSON captures your errors, syndromes, correction, and verdict. The .dem is the decoding graph — feed it straight to PyMatching / Stim.</p>
          </div>
        </div>

        {/* Canvas + verdict */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <canvas ref={canvasRef} width={SIZE} height={SIZE} onClick={onCanvasClick}
              className="w-full max-w-[500px] mx-auto cursor-pointer block" />
            <p className="text-xs text-slate-400 text-center mt-2">Click any data qubit (dot) to add or remove a bit-flip error, then run the decoder.</p>
          </div>

          {/* Verdict (#5) */}
          {decoded && (
            <div className={`rounded-xl border p-4 ${decoded.logicalError ? "bg-red-50 border-red-200" : "bg-emerald-50 border-emerald-200"}`}>
              <div className="flex items-center gap-2 mb-1">
                <span>{decoded.logicalError ? <X className="w-5 h-5 text-red-500" /> : <Check className="w-5 h-5 text-emerald-600" />}</span>
                <h3 className={`text-sm font-bold ${decoded.logicalError ? "text-red-700" : "text-emerald-700"}`}>
                  {decoded.logicalError ? "Logical error — the data was corrupted" : "Success — the logical qubit survived"}
                </h3>
              </div>
              <p className={`text-xs leading-relaxed ${decoded.logicalError ? "text-red-600" : "text-emerald-700"}`}>
                {decoded.logicalError
                  ? `The ${decoderKind === "mwpm" ? "MWPM" : "greedy"} decoder's correction, combined with your errors, formed a chain spanning the two boundaries — a logical operator. The stabilizers look happy, but the encoded bit silently flipped.`
                  : `Your errors + the decoder's correction cancel out to trivial loops, so the encoded information is intact. ${syndrome.length === 0 && errors.size > 0 ? "(Your errors happened to form a stabilizer — no syndrome at all.)" : ""}`}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
                <div className="bg-white/60 rounded-lg p-2"><span className="text-slate-500">Errors</span><span className="float-right font-semibold">{errors.size}</span></div>
                <div className="bg-white/60 rounded-lg p-2"><span className="text-slate-500">Syndromes</span><span className="float-right font-semibold">{decoded.verts.length}</span></div>
                <div className="bg-white/60 rounded-lg p-2"><span className="text-slate-500">Match weight</span><span className="float-right font-semibold">{decoded.match.weight}</span></div>
                <div className="bg-white/60 rounded-lg p-2"><span className="text-slate-500">Decoder</span><span className="float-right font-semibold">{decoderKind.toUpperCase()}</span></div>
              </div>
            </div>
          )}

          {/* Threshold curve */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
                <input type="checkbox" checked={showCurve} onChange={(e) => setShowCurve(e.target.checked)} className="accent-indigo-600 rounded" />
                Threshold curve {mcData ? "(real Monte-Carlo data)" : "(illustrative)"}
              </label>
              <button onClick={runMonteCarlo} disabled={mcRunning}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 disabled:opacity-60 transition-colors">
                {mcRunning ? "Sampling…" : "Run Monte-Carlo (real threshold)"}
              </button>
            </div>
            {showCurve && <canvas ref={curveRef} width={440} height={220} className="w-full max-w-[440px] mx-auto border border-slate-200 rounded-lg" />}
            <p className="text-xs text-slate-400 mt-2">
              {mcData
                ? "Each point is 400 sampled rounds decoded with MWPM. Below the threshold (where the curves cross), a bigger code gives a lower logical error rate — above it, a bigger code is worse."
                : "Illustrative curves. Click “Run Monte-Carlo” to sample real errors, decode them, and plot the empirical logical error rate — the curves will cross at the code's true threshold."}
            </p>
          </div>

          {/* Measurement-error study plot (#1, #2) */}
          {mrData && (
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Measurement Errors: single-shot vs space-time (R={rounds})</h3>
              <canvas ref={mrRef} width={440} height={220} className="w-full max-w-[440px] mx-auto border border-slate-200 rounded-lg" />
              <p className="text-xs text-slate-400 mt-2">
                As measurement noise rises, the <span className="text-red-600 font-medium">single-shot</span> decoder degrades fast — it mistakes measurement errors for data errors. The <span className="text-emerald-600 font-medium">space-time</span> decoder repeats the measurement over {rounds} rounds and matches detection events across time, staying robust. At zero measurement noise the two coincide — the whole gap is measurement error.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
