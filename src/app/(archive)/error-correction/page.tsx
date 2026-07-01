"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";

/* ════════════════════════════════════════════════════════════════════
   Surface-code decoding lab.

   We model the planar surface code's matching graph for ONE error type
   (bit-flip / X errors detected by Z-stabilizers). Phase-flip decoding is
   identical by symmetry. This is the graph real MWPM decoders operate on:

     • Vertices  = stabilizers, on a d×d grid, indexed (r, c).
     • Data qubits = edges: horizontal (r,c)-(r,c+1), vertical (r,c)-(r+1,c),
       and rough-boundary edges on the left/right connecting a vertex to a
       virtual boundary node.
     • An error on an edge flips the syndrome at its interior endpoint(s).
     • A logical X operator is any chain connecting the left rough boundary to
       the right one. A residual (error XOR correction) causes a LOGICAL ERROR
       iff it connects the two boundaries an odd number of times — which we
       read off as the parity of residual left-boundary edges.
   ════════════════════════════════════════════════════════════════════ */

type EdgeType = "h" | "v" | "bl" | "br";
interface Edge { id: string; type: EdgeType; r: number; c: number; }
interface Lattice { d: number; edges: Edge[]; byId: Map<string, Edge>; }

function buildLattice(d: number): Lattice {
  const edges: Edge[] = [];
  for (let r = 0; r < d; r++) {
    for (let c = 0; c < d - 1; c++) edges.push({ id: `h:${r}:${c}`, type: "h", r, c });     // (r,c)-(r,c+1)
    edges.push({ id: `bl:${r}`, type: "bl", r, c: 0 });                                       // LB-(r,0)
    edges.push({ id: `br:${r}`, type: "br", r, c: d - 1 });                                   // (r,d-1)-RB
  }
  for (let r = 0; r < d - 1; r++)
    for (let c = 0; c < d; c++) edges.push({ id: `v:${r}:${c}`, type: "v", r, c });           // (r,c)-(r+1,c)
  const byId = new Map(edges.map((e) => [e.id, e]));
  return { d, edges, byId };
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
  const match = kind === "mwpm" ? mwpm(verts, lat.d) : greedy(verts, lat.d);
  const correction = new Set<string>();
  const toggle = (id: string) => (correction.has(id) ? correction.delete(id) : correction.add(id));
  for (const [i, j] of match.pairs) for (const id of pathEdges(verts[i], verts[j])) toggle(id);
  for (const i of match.boundary) for (const id of boundaryPathEdges(verts[i], lat.d)) toggle(id);
  // Residual = error XOR correction; logical error = odd # of left-boundary edges.
  const residual = new Set<string>(errors);
  for (const id of correction) residual.has(id) ? residual.delete(id) : residual.add(id);
  let blParity = 0;
  for (const id of residual) if (id.startsWith("bl:")) blParity ^= 1;
  return { correction, match, verts, logicalError: blParity === 1 };
}

/* Toy analytic logical-error rate for the threshold curve (replaced by real
   Monte-Carlo sampling in a later step). */
function logicalRate(phys: number, d: number): number {
  const threshold = 0.1; // per-edge error rate threshold for this simplified graph
  if (phys >= 0.5) return 0.5;
  const ratio = phys / threshold;
  if (ratio >= 1) return Math.min(0.5, phys);
  return 0.5 * Math.pow(ratio, (d + 1) / 2);
}

/* ── Render geometry ── */
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
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [errorRate, setErrorRate] = useState(0.1);
  const [decoderKind, setDecoderKind] = useState<"mwpm" | "greedy">("mwpm");
  const [decoded, setDecoded] = useState<Decoded | null>(null);
  const [showCurve, setShowCurve] = useState(true);
  const [targetLogError, setTargetLogError] = useState(1e-6);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const curveRef = useRef<HTMLCanvasElement>(null);

  const lat = useMemo(() => buildLattice(distance), [distance]);
  const seedRef = useRef(12345);
  const rand = () => { seedRef.current = (seedRef.current * 16807) % 2147483647; return (seedRef.current & 0x7fffffff) / 0x7fffffff; };

  // Reset when distance changes.
  useEffect(() => { setErrors(new Set()); setDecoded(null); }, [distance]);

  const syndrome = useMemo(() => syndromeOf(errors, lat), [errors, lat]);

  const randomErrors = useCallback(() => {
    const s = new Set<string>();
    for (const e of lat.edges) if (rand() < errorRate) s.add(e.id);
    setErrors(s); setDecoded(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, errorRate]);

  const clearErrors = () => { setErrors(new Set()); setDecoded(null); };
  const runDecoder = useCallback(() => { setDecoded(decode(errors, lat, decoderKind)); }, [errors, lat, decoderKind]);

  const toPx = (r: number, c: number) => {
    const cell = SIZE / (distance + 1);
    return { x: (c + 1) * cell, y: (r + 1) * cell };
  };

  // Draw the lattice.
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.fillStyle = "#f8fafc"; ctx.fillRect(0, 0, SIZE, SIZE);
    const cell = SIZE / (distance + 1);
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
      else if (e.type === "br") { const p = toPx(e.r, distance - 1); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(SIZE - cell * 0.28, p.y); ctx.stroke(); }
      else { ctx.beginPath(); ctx.moveTo(vs[0].x, vs[0].y); ctx.lineTo(vs[1].x, vs[1].y); ctx.stroke(); }
      void m;
    }

    // correction (green) — draw first so errors sit on top
    if (decoded) {
      ctx.strokeStyle = "#22c55e"; ctx.lineWidth = 4; ctx.setLineDash([]);
      for (const id of decoded.correction) {
        const e = lat.byId.get(id)!; const vs = edgeVertices(e).map(([r, c]) => toPx(r, c));
        if (e.type === "bl") { const p = toPx(e.r, 0); ctx.beginPath(); ctx.moveTo(cell * 0.28, p.y); ctx.lineTo(p.x, p.y); ctx.stroke(); }
        else if (e.type === "br") { const p = toPx(e.r, distance - 1); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(SIZE - cell * 0.28, p.y); ctx.stroke(); }
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
    for (let r = 0; r < distance; r++) for (let c = 0; c < distance; c++) {
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
        const v = decoded.verts[i]; const { side } = boundaryDist(v, distance); const a = toPx(v.r, v.c);
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
    ctx.strokeStyle = "#cbd5e1"; ctx.beginPath(); ctx.moveTo(ml, mt); ctx.lineTo(ml, h - mb); ctx.lineTo(w - mr, h - mb); ctx.stroke();
    const yOf = (v: number) => mt + ph - (Math.log10(Math.max(v * 100, 0.001)) + 3) / 3 * ph;
    const colors = ["#3b82f6", "#22c55e", "#ef4444"];
    [3, 5, 7].forEach((d, di) => {
      ctx.strokeStyle = colors[di]; ctx.lineWidth = 2; ctx.beginPath();
      for (let px = 0; px <= pw; px++) { const phys = (px / pw) * 0.4; const y = yOf(logicalRate(phys, d)); px === 0 ? ctx.moveTo(ml + px, y) : ctx.lineTo(ml + px, y); }
      ctx.stroke(); ctx.fillStyle = colors[di]; ctx.font = "10px sans-serif"; ctx.fillText(`d=${d}`, ml + pw * 0.8, yOf(logicalRate(0.32, d)) - 3);
    });
    const tx = ml + (0.1 / 0.4) * pw; ctx.strokeStyle = "#000"; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(tx, mt); ctx.lineTo(tx, h - mb); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "#000"; ctx.font = "9px sans-serif"; ctx.textAlign = "center"; ctx.fillText("threshold", tx, mt - 3);
    ctx.fillStyle = "#94a3b8"; ctx.fillText("physical error rate", ml + pw / 2, h - 2);
  }, [showCurve]);

  const onCanvasClick = (ev: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const scale = SIZE / rect.width;
    const mx = (ev.clientX - rect.left) * scale, my = (ev.clientY - rect.top) * scale;
    let best: string | null = null, bestD = Infinity;
    for (const e of lat.edges) { const m = edgeMid(e); const p = toPx(m.r, m.c); const dd = Math.hypot(mx - p.x, my - p.y); if (dd < bestD) { bestD = dd; best = e.id; } }
    const cell = SIZE / (distance + 1);
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
                return <div key={d} className="flex justify-between text-slate-600"><span>Distance {d}:</span><span className="font-medium">{logErr < targetLogError ? "✅" : "❌"} {phys} qubits</span></div>;
              })}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">A distance-d rotated surface code uses d² data + (d²−1) ancilla = 2d²−1 physical qubits.</p>
          </div>

          {/* Why it matters (#10) */}
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl border border-indigo-100 p-4 text-xs text-slate-600 leading-relaxed">
            <p className="font-semibold text-slate-800 mb-1">Why this matters</p>
            <p>Physical qubits fail ~1 in 100–1000 operations. To run a real algorithm you need a logical error rate near 10⁻¹⁵ — which means wrapping <strong>thousands</strong> of physical qubits around each logical one. Estimates put factoring RSA-2048 at roughly <strong>20 million</strong> physical qubits. That gap is why error correction, not just more qubits, is the central challenge.</p>
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
                <span className="text-lg">{decoded.logicalError ? "❌" : "✅"}</span>
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
            <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer mb-2">
              <input type="checkbox" checked={showCurve} onChange={(e) => setShowCurve(e.target.checked)} className="accent-indigo-600 rounded" />
              Show threshold curve
            </label>
            {showCurve && <canvas ref={curveRef} width={440} height={220} className="w-full max-w-[440px] mx-auto border border-slate-200 rounded-lg" />}
            <p className="text-xs text-slate-400 mt-2">Below the threshold, a bigger code (higher d) gives a <em>lower</em> logical error rate — that&apos;s what makes scaling worthwhile.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
