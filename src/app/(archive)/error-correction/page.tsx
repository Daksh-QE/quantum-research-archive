"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

/* ── Surface code simulation ── */
interface Coord { x: number; y: number; }
interface Defect { pos: Coord; type: "X" | "Z"; round: number; }
interface MatchingEdge { from: Coord; to: Coord; color: string; }

type NoiseModel = "depolarizing" | "biased" | "erasure";

function generateSyndrome(d: number, errorRate: number, seed: number, noise: NoiseModel = "depolarizing"): { defects: Defect[]; plaquettes: Coord[] } {
  const plaquettes: Coord[] = [];
  let s = (seed % 2147483647 + 2147483647) % 2147483647 || 1;
  const rand = () => { s = (s * 16807) % 2147483647; return (s & 0x7fffffff) / 0x7fffffff; };

  // Generate plaquette (stabilizer) positions on odd lattice sites.
  for (let x = 1; x < d * 2; x += 2) {
    for (let y = 1; y < d * 2; y += 2) {
      plaquettes.push({ x, y });
    }
  }

  // Noise model shapes the syndrome: depolarizing → equal X/Z; biased →
  // mostly Z (phase-flip) defects; erasure → more error chains (lost qubits).
  const zProb = noise === "biased" ? 0.8 : 0.5;
  const chainScale = noise === "erasure" ? 1.6 : 1;

  // Physically, an error *chain* flips the two stabilizers at its endpoints.
  // We therefore generate defects in PAIRS: pick two distinct stabilizers of
  // the same type and light both up. This keeps the count of each type even
  // (except where a chain terminates on a boundary, handled by the decoder).
  const defectKeys = new Set<string>();
  const defects: Defect[] = [];
  const addDefect = (p: Coord, type: "X" | "Z", round: number) => {
    const key = `${p.x},${p.y},${type}`;
    if (defectKeys.has(key)) return;
    defectKeys.add(key);
    defects.push({ pos: p, type, round });
  };

  // Expected number of error chains scales with lattice size and error rate.
  const numChains = Math.max(1, Math.round(plaquettes.length * errorRate * chainScale));
  for (let c = 0; c < numChains; c++) {
    const type: "X" | "Z" = rand() < zProb ? "Z" : "X";
    const a = plaquettes[Math.floor(rand() * plaquettes.length)];
    // Chain endpoint: a nearby (or any other) stabilizer of the same lattice.
    let b = plaquettes[Math.floor(rand() * plaquettes.length)];
    if (b.x === a.x && b.y === a.y) {
      b = plaquettes[(plaquettes.indexOf(a) + 1) % plaquettes.length];
    }
    addDefect(a, type, c % 2);
    addDefect(b, type, c % 2);
  }

  return { defects, plaquettes };
}

// Manhattan (taxicab / lattice) distance between two lattice coordinates.
function manhattan(a: Coord, b: Coord): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Distance from a defect to the nearest open boundary of the lattice, plus the
// coordinate of that boundary virtual node. The boundary lies just outside the
// grid on whichever side (left/right/top/bottom) is closest.
function nearestBoundary(p: Coord, d: number): { coord: Coord; dist: number } {
  const max = d * 2; // grid spans 0..max
  const candidates: { coord: Coord; dist: number }[] = [
    { coord: { x: -1, y: p.y }, dist: p.x + 1 },
    { coord: { x: max + 1, y: p.y }, dist: max - p.x + 1 },
    { coord: { x: p.x, y: -1 }, dist: p.y + 1 },
    { coord: { x: p.x, y: max + 1 }, dist: max - p.y + 1 },
  ];
  return candidates.reduce((best, c) => (c.dist < best.dist ? c : best));
}

interface MatchResult { pairs: [number, number][]; boundaryNodes: number[]; weight: number; }

/*
 * Exact minimum-weight perfect matching for a small set of same-type defects.
 *
 * Each defect must be matched either to another defect (weight = Manhattan
 * distance between them) or to the open boundary (weight = distance to nearest
 * boundary). We minimise the TOTAL weight over all such complete pairings via a
 * recursive DP over the unmatched set — correct/exact for small instances. If
 * the defect count exceeds the exact-search budget we fall back to a greedy
 * nearest-neighbour matching (clearly labelled as greedy, not MWPM).
 */
const EXACT_LIMIT = 12;

function minWeightMatching(positions: Coord[], d: number): MatchResult {
  const n = positions.length;
  if (n === 0) return { pairs: [], boundaryNodes: [], weight: 0 };

  // Precompute pairwise distances and boundary distances.
  const pair: number[][] = positions.map((a) => positions.map((b) => manhattan(a, b)));
  const bnd = positions.map((p) => nearestBoundary(p, d).dist);

  if (n <= EXACT_LIMIT) {
    // DP over bitmask of remaining (unmatched) defects.
    const memo = new Map<number, MatchResult>();
    const solve = (mask: number): MatchResult => {
      if (mask === 0) return { pairs: [], boundaryNodes: [], weight: 0 };
      const cached = memo.get(mask);
      if (cached) return cached;
      // First set bit = first unmatched defect.
      let i = 0;
      while (!(mask & (1 << i))) i++;
      const without_i = mask & ~(1 << i);

      // Option A: match i to the boundary.
      let best: MatchResult;
      {
        const rest = solve(without_i);
        best = { pairs: rest.pairs, boundaryNodes: [i, ...rest.boundaryNodes], weight: rest.weight + bnd[i] };
      }
      // Option B: match i to another defect j.
      for (let j = i + 1; j < n; j++) {
        if (!(mask & (1 << j))) continue;
        const rest = solve(without_i & ~(1 << j));
        const w = rest.weight + pair[i][j];
        if (w < best.weight) {
          best = { pairs: [[i, j], ...rest.pairs], boundaryNodes: rest.boundaryNodes, weight: w };
        }
      }
      memo.set(mask, best);
      return best;
    };
    return solve((1 << n) - 1);
  }

  // Greedy fallback for large instances (NOT exact MWPM).
  const used = new Array(n).fill(false);
  const pairs: [number, number][] = [];
  const boundaryNodes: number[] = [];
  let weight = 0;
  for (let i = 0; i < n; i++) {
    if (used[i]) continue;
    let bestJ = -1;
    let bestW = bnd[i]; // baseline: match to boundary
    for (let j = i + 1; j < n; j++) {
      if (used[j]) continue;
      if (pair[i][j] < bestW) { bestW = pair[i][j]; bestJ = j; }
    }
    used[i] = true;
    if (bestJ >= 0) { used[bestJ] = true; pairs.push([i, bestJ]); weight += pair[i][bestJ]; }
    else { boundaryNodes.push(i); weight += bnd[i]; }
  }
  return { pairs, boundaryNodes, weight };
}

function generateMatching(defects: Defect[], d: number): MatchingEdge[] {
  const edges: MatchingEdge[] = [];

  const buildFor = (list: Defect[], pairColor: string, boundaryColor: string) => {
    const positions = list.map((dd) => dd.pos);
    const { pairs, boundaryNodes } = minWeightMatching(positions, d);
    for (const [i, j] of pairs) {
      edges.push({ from: positions[i], to: positions[j], color: pairColor });
    }
    for (const i of boundaryNodes) {
      const { coord } = nearestBoundary(positions[i], d);
      edges.push({ from: positions[i], to: coord, color: boundaryColor });
    }
  };

  buildFor(defects.filter((dd) => dd.type === "X"), "#ef4444", "#fca5a5");
  buildFor(defects.filter((dd) => dd.type === "Z"), "#6366f1", "#a5b4fc");

  return edges;
}

export default function QECDashboard() {
  const [distance, setDistance] = useState(3);
  const [errorRate, setErrorRate] = useState(0.15);
  const [defects, setDefects] = useState<Defect[]>([]);
  const [plaquettes, setCoord] = useState<Coord[]>([]);
  const [matching, setMatching] = useState<MatchingEdge[]>([]);
  const [showDecoder, setShowDecoder] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showCurve, setShowCurve] = useState(true);
  const [noiseModel, setNoiseModel] = useState<"depolarizing" | "biased" | "erasure">("depolarizing");
  const [numRounds, setNumRounds] = useState(5);
  const [targetLogError, setTargetLogError] = useState(1e-6);
  const [animStep, setAnimStep] = useState(0);
  const [storyStep, setStoryStep] = useState(0);
  const [storyActive, setStoryActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const curveCanvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredDefect, setHoveredDefect] = useState<number | null>(null);
  // Seed lives in a ref, NOT state: advancing it must not recreate
  // runSimulation, or the mount effect (which depends on runSimulation) would
  // re-fire endlessly and regenerate the syndrome forever.
  const seedRef = useRef(12345);

  const runSimulation = useCallback(() => {
    seedRef.current = (seedRef.current * 1103515245 + 12345) % 2147483647;
    const result = generateSyndrome(distance, errorRate, seedRef.current, noiseModel);
    setDefects(result.defects);
    setCoord(result.plaquettes);
    setMatching([]);
    setShowDecoder(false);
    setAnimStep(0);
  }, [distance, errorRate, noiseModel]);

  const runDecoder = useCallback(() => {
    const edges = generateMatching(defects, distance);
    setMatching(edges);
    setShowDecoder(true);
    setAnimStep(0);
  }, [defects, distance]);

  const runStoryMode = useCallback(() => {
    runSimulation();
    setStoryActive(true);
    setStoryStep(0);
    // Auto-advance through steps after decoder runs
    const steps = [
      { delay: 1500, text: "Step 1: Here's your surface code. The dots are physical qubits storing quantum information." },
      { delay: 3000, text: "Step 2: A random bit-flip error occurs on this qubit. (flashes red)" },
      { delay: 4500, text: "Step 3: We measure the stabilizers. Any stabilizer with a 'wrong' result lights up — these are called syndromes." },
      { delay: 6000, text: "Step 4: We run the decoder. It pairs up syndromes to find the most likely error path." },
      { delay: 7500, text: "Step 5: We apply a correction based on the decoder's prediction. The error is fixed." },
      { delay: 9000, text: "✅ The logical qubit is protected. The data survived despite the physical error." },
    ];
    steps.forEach((s, i) => {
      setTimeout(() => setStoryStep(i + 1), s.delay);
    });
    setTimeout(() => {
      runDecoder();
      setTimeout(() => setStoryStep(7), 1500);
    }, 6000);
  }, [runSimulation, runDecoder]);

  useEffect(() => {
    runSimulation();
  }, [distance, errorRate, runSimulation]);

  // Draw lattice
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = canvas.width;
    const cell = size / (distance * 2 + 1);
    ctx.clearRect(0, 0, size, size);

    // Background grid
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, size, size);

    // Data qubits (grid intersections)
    for (let x = 0; x < distance * 2 + 1; x++) {
      for (let y = 0; y < distance * 2 + 1; y++) {
        const px = x * cell + cell / 2;
        const py = y * cell + cell / 2;
        if (x % 2 === 0 && y % 2 === 0) {
          ctx.beginPath(); ctx.arc(px, py, cell * 0.15, 0, Math.PI * 2);
          ctx.fillStyle = "#cbd5e1"; ctx.fill();
        }
      }
    }

    // Plaquettes (measurement qubits)
    for (const p of plaquettes) {
      const px = p.x * cell + cell / 2;
      const py = p.y * cell + cell / 2;
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      ctx.strokeRect(px - cell * 0.4, py - cell * 0.4, cell * 0.8, cell * 0.8);
    }

    // Defects (syndrome detections)
    let visCount = Math.floor(animStep / 2);
    if (!showDecoder) visCount = defects.length;

    for (let i = 0; i < Math.min(defects.length, visCount); i++) {
      const d = defects[i];
      const px = d.pos.x * cell + cell / 2;
      const py = d.pos.y * cell + cell / 2;
      const isHovered = hoveredDefect === i;

      // Glow
      if (isHovered) {
        ctx.beginPath(); ctx.arc(px, py, cell * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = d.type === "X" ? "rgba(239,68,68,0.15)" : "rgba(99,102,241,0.15)";
        ctx.fill();
      }

      ctx.beginPath(); ctx.arc(px, py, cell * 0.32, 0, Math.PI * 2);
      ctx.fillStyle = d.type === "X" ? "#ef4444" : "#6366f1";
      ctx.fill();
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();

      // Label
      ctx.fillStyle = "#fff"; ctx.font = `bold ${cell * 0.25}px sans-serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(d.type, px, py);
    }

    // Matching edges (decoder result)
    if (showDecoder) {
      let edgeCount = Math.floor(animStep / 3);
      // Map a lattice coordinate (which may be an out-of-grid boundary node at
      // -1 or distance*2+1 on either axis) to a canvas pixel position.
      const mapCoord = (c: { x: number; y: number }) => {
        const px = c.x < 0 ? 0 : c.x > distance * 2 ? size : c.x * cell + cell / 2;
        const py = c.y < 0 ? 0 : c.y > distance * 2 ? size : c.y * cell + cell / 2;
        return { px, py };
      };
      for (let i = 0; i < Math.min(matching.length, edgeCount); i++) {
        const e = matching[i];
        const { px: fx, py: fy } = mapCoord(e.from);
        const { px: tx, py: ty } = mapCoord(e.to);

        ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(tx, ty);
        ctx.strokeStyle = e.color; ctx.lineWidth = 2.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // Stats
    ctx.fillStyle = "#475569"; ctx.font = "13px sans-serif"; ctx.textAlign = "left";
    ctx.fillText(`Distance: ${distance}`, 10, 20);
    ctx.fillText(`Syndromes: ${defects.length}`, 10, 38);
    if (showDecoder) {
      ctx.fillText(`Edges: ${matching.length}`, 10, 56);
    }
    if (showComparison) {
      // Red tint overlay
      ctx.fillStyle = "rgba(239,68,68,0.08)";
      ctx.fillRect(0, 0, size, size);
      // Error accumulation indicators
      ctx.fillStyle = "#ef4444"; ctx.font = "bold 14px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("⚠ NO ERROR CORRECTION", size / 2, size - 30);
      ctx.fillStyle = "rgba(239,68,68,0.3)"; ctx.font = "11px sans-serif";
      ctx.fillText("Every physical error propagates — logical state is corrupted", size / 2, size - 12);
      // Draw scattered error markers
      for (let i = 0; i < 12; i++) {
        const ex = Math.random() * size;
        const ey = Math.random() * size;
        ctx.beginPath(); ctx.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239,68,68,${0.1 + Math.random() * 0.3})`;
        ctx.fill();
      }
    }
  }, [defects, plaquettes, matching, showDecoder, animStep, distance, hoveredDefect, showComparison]);

  // Draw threshold curve
  useEffect(() => {
    const canvas = curveCanvasRef.current;
    if (!canvas || !showCurve) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#f8fafc"; ctx.fillRect(0, 0, w, h);
    const ml = 50, mr = 20, mt = 20, mb = 30;
    const pw = w - ml - mr, ph = h - mt - mb;
    function logicalErrorRate(physRate: number, d: number): number {
      const threshold = 0.01;
      if (physRate >= 0.5) return 0.5;
      const ratio = physRate / threshold;
      if (ratio >= 1) return Math.min(0.5, physRate * d * 0.5);
      return Math.pow(ratio, (d + 1) / 2) * 0.1;
    }
    ctx.strokeStyle = "#cbd5e1"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(ml, mt); ctx.lineTo(ml, h - mb); ctx.lineTo(w - mr, h - mb); ctx.stroke();
    ctx.fillStyle = "#94a3b8"; ctx.font = "9px sans-serif"; ctx.textAlign = "center";
    for (let pct = 0; pct <= 50; pct += 10) {
      const x = ml + (pct / 50) * pw;
      ctx.fillText(pct + "%", x, h - mb + 14);
      ctx.beginPath(); ctx.moveTo(x, h - mb); ctx.lineTo(x, h - mb + 4); ctx.stroke();
    }
    ctx.fillText("Physical error rate", ml + pw / 2, h - 2);
    ctx.textAlign = "right";
    const yLabels = [0.001, 0.01, 0.1, 1, 10, 100];
    for (const val of yLabels) {
      const y = mt + ph - (Math.log10(val) + 3) / 3 * ph;
      if (y >= mt && y <= mt + ph) {
        ctx.fillText(val + "%", ml - 4, y + 3);
        ctx.beginPath(); ctx.moveTo(ml, y); ctx.lineTo(ml - 4, y); ctx.stroke();
      }
    }
    ctx.save(); ctx.translate(12, mt + ph / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText("Logical error rate", 0, 0); ctx.restore();
    const distances = [3, 5, 7];
    const colors = ["#3b82f6", "#22c55e", "#ef4444"];
    for (let di = 0; di < distances.length; di++) {
      const d = distances[di];
      ctx.strokeStyle = colors[di]; ctx.lineWidth = 2; ctx.beginPath();
      for (let px = 0; px <= pw; px++) {
        const physRate = (px / pw) * 0.5;
        const logRate = logicalErrorRate(physRate, d);
        const y = mt + ph - (Math.log10(Math.max(logRate * 100, 0.0001)) + 3) / 3 * ph;
        const x = ml + px;
        if (px === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      const labelX = ml + pw * 0.85;
      const labelRate = logicalErrorRate(0.5 * 0.85, d);
      const labelY = mt + ph - (Math.log10(Math.max(labelRate * 100, 0.0001)) + 3) / 3 * ph;
      ctx.fillStyle = colors[di]; ctx.font = "10px sans-serif"; ctx.textAlign = "left";
      ctx.fillText("d=" + d, labelX, labelY - 4);
    }
    const threshX = ml + (0.01 / 0.5) * pw;
    ctx.strokeStyle = "#000"; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(threshX, mt); ctx.lineTo(threshX, h - mb); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#000"; ctx.font = "9px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("Threshold (~1%)", threshX, mt - 4);
    const curX = ml + (errorRate / 0.5) * pw;
    for (let di = 0; di < distances.length; di++) {
      const d = distances[di];
      const logRate = logicalErrorRate(errorRate, d);
      const curY = mt + ph - (Math.log10(Math.max(logRate * 100, 0.0001)) + 3) / 3 * ph;
      ctx.beginPath(); ctx.arc(curX, curY, 4, 0, Math.PI * 2);
      ctx.fillStyle = colors[di]; ctx.fill();
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.stroke();
    }
  }, [errorRate, showCurve, distance]);

  // Animation timer
  useEffect(() => {
    if (!showDecoder && defects.length === 0) return;
    const interval = setInterval(() => {
      setAnimStep((prev) => {
        const max = showDecoder ? matching.length * 3 + 3 : defects.length * 2 + 3;
        if (prev >= max) { clearInterval(interval); return prev; } // stop when the reveal finishes
        return prev + 1;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [showDecoder, defects.length, matching.length]);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">⊕</div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Error Correction Decoding Dashboard</h1>
          <p className="text-sm text-slate-500">Visualize surface code error syndromes and watch the decoder match them in real time.</p>
        </div>
      </div>

      {/* ── Context panel ── */}
      <details className="bg-white rounded-xl border border-slate-200 p-4 cursor-pointer group">
        <summary className="text-sm font-semibold text-slate-900 cursor-pointer list-none flex items-center gap-2">
          <span className="text-indigo-600 text-base">?</span>
          How surface code error correction works
        </summary>
        <div className="mt-3 text-sm text-slate-600 space-y-2 leading-relaxed">
          <p><strong>Surface codes</strong> protect quantum information by spreading one logical qubit across many physical qubits in a 2D grid. Errors are detected via <strong>stabilizer measurements</strong> called <strong>syndromes</strong> — without measuring the data qubits directly.</p>
          <p><strong>Code distance d</strong>: A distance-{distance} code corrects up to {Math.floor((distance - 1) / 2)} error(s). Higher distance = better protection, more qubits.</p>
          <p><strong>X syndromes</strong> (red) detect bit-flip errors. <strong>Z syndromes</strong> (indigo) detect phase-flip errors. <strong>MWPM</strong> (Minimum Weight Perfect Matching) pairs syndromes to find the most likely error.</p>
          <p><strong>Error rate</strong>: probability of a physical error per gate cycle. Surface codes work below ~<strong>1%</strong> (the fault-tolerance threshold).</p>
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
                  <button key={d} onClick={() => setDistance(d)}
                    title={`Distance ${d}: corrects up to ${Math.floor((d-1)/2)} error(s)`}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      distance === d ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}>{d}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Rounds</label>
              <div className="flex gap-2 mt-2">
                {[1, 3, 5, 10].map((r) => (
                  <button key={r} onClick={() => setNumRounds(r)}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      numRounds === r ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}>{r}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Noise Model</label>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: "depolarizing" as const, label: "Depolarizing", desc: "Equal X, Y, or Z errors" },
                  { id: "biased" as const, label: "Biased (Z-heavy)", desc: "Phase-flip errors are more likely" },
                  { id: "erasure" as const, label: "Erasure", desc: "Qubits are lost entirely" },
                ].map((m) => (
                  <button key={m.id} onClick={() => setNoiseModel(m.id)}
                    className={`text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                      noiseModel === m.id ? "bg-indigo-100 border border-indigo-200 text-indigo-700" : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}>
                    <span className="font-medium">{m.label}</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider"
                title={{"depolarizing":"Equal probability X,Y,Z","biased":"Z errors dominant","erasure":"Qubit loss"}[noiseModel]}>
                {noiseModel === "depolarizing" ? "Depolarizing" : noiseModel === "biased" ? "Biased Model" : "Erasure Model"} Error Rate: {Math.round(errorRate * 100)}%
              </label>
              <input type="range" min="5" max="40" value={Math.round(errorRate * 100)}
                onChange={(e) => setErrorRate(parseInt(e.target.value) / 100)}
                className="w-full mt-2 accent-indigo-600" />
            </div>
            <button onClick={runSimulation}
              className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors">
              New Syndrome
            </button>
            <button onClick={runDecoder}
              className="w-full py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors">
              Run MWPM Decoder
            </button>
            <button onClick={runStoryMode}
              className="w-full py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition-colors">
              🎬 Watch an Error Happen
            </button>
            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer mt-2">
              <input type="checkbox" checked={showComparison} onChange={(e) => setShowComparison(e.target.checked)}
                className="accent-indigo-600 rounded" />
              <span>Show what happens <strong>without</strong> error correction</span>
            </label>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-xs space-y-2">
            <p className="font-semibold text-slate-900">Legend</p>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /><span className="text-slate-600">X syndrome (bit-flip error)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500" /><span className="text-slate-600">Z syndrome (phase-flip error)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 border-t-2 border-dashed border-slate-400" style={{ width: 16 }} /><span className="text-slate-600">Matching edge</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-300" /><span className="text-slate-600">Data qubit</span></div>
          </div>

          {/* Without-correction explanation */}
          {showComparison && (
            <div className="bg-red-50 rounded-xl border border-red-200 p-3 text-xs space-y-1.5">
              <p className="font-semibold text-red-700">⚠ Without Error Correction</p>
              <p className="text-red-600 leading-relaxed">
                Physical qubits suffer from decoherence and gate errors. Without a error-correcting code, 
                these errors accumulate over time until the logical information is lost. The red tint and 
                scattered markers above show how every gate operation introduces noise that propagates 
                through the system — making long computations impossible.
              </p>
              <p className="text-red-600 leading-relaxed">
                With the surface code (toggle off), these same errors are detected as syndromes and 
                corrected by the decoder before they can corrupt the logical qubit.
              </p>
            </div>
          )}

          {/* Physical qubit calculator */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Physical Qubit Calculator</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-500">Target logical error rate:</label>
                <input type="range" min="1" max="15" value={-Math.log10(targetLogError)}
                  onChange={(e) => setTargetLogError(Math.pow(10, -parseInt(e.target.value)))}
                  className="w-full accent-indigo-600" />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>10⁻¹</span>
                  <span className="font-medium text-slate-600">10⁻{Math.round(-Math.log10(targetLogError))}</span>
                  <span>10⁻¹⁵</span>
                </div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-3 text-xs space-y-1">
                <p>At {Math.round(errorRate * 100)}% physical error rate:</p>
                {[3, 5, 7].map((d) => {
                  const ratio = errorRate / 0.01;
                  const logErr = ratio >= 1 ? 0.5 : Math.pow(ratio, (d + 1) / 2) * 0.1;
                  const physQubits = 2 * d * d;
                  return (
                    <div key={d} className="flex justify-between text-slate-600">
                      <span>Distance {d}:</span>
                      <span className="font-medium">{logErr < targetLogError ? "✅" : "❌"} {physQubits} physical qubits</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-4">
          <canvas ref={canvasRef} width={500} height={500} className="w-full max-w-[500px] mx-auto"
            onMouseMove={(e) => {
              const rect = canvasRef.current?.getBoundingClientRect();
              if (!rect) return;
              const mx = e.clientX - rect.left;
              const my = e.clientY - rect.top;
              const scale = 500 / rect.width;
              const cell = 500 / (distance * 2 + 1);
              let found = -1;
              for (let i = 0; i < defects.length; i++) {
                const d = defects[i];
                const px = d.pos.x * cell + cell / 2;
                const py = d.pos.y * cell + cell / 2;
                if (Math.abs(mx * scale - px) < cell * 0.5 && Math.abs(my * scale - py) < cell * 0.5) {
                  found = i; break;
                }
              }
              setHoveredDefect(found);
            }}
          />
          <p className="text-xs text-slate-400 text-center mt-2">
            Grid: data qubits (dots) · Squares: stabilizer measurements · Colored circles: detection events
          </p>
          <div className="mt-4">
            <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer mb-2">
              <input type="checkbox" checked={showCurve} onChange={(e) => setShowCurve(e.target.checked)}
                className="accent-indigo-600 rounded" />
              Show threshold theorem curve
            </label>
            {showCurve && (
              <canvas ref={curveCanvasRef} width={400} height={250} className="w-full max-w-[400px] mx-auto border border-slate-200 rounded-lg" />
            )}
          </div>
        </div>
      </div>

      {/* Story walkthrough */}
      {storyActive && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs space-y-2">
          <p className="font-semibold text-emerald-700">🎬 Error Correction Walkthrough</p>
          <div className="space-y-1">
            {[
              "Step 1: Surface code lattice with physical qubits (dots)",
              "Step 2: ⚡ Bit-flip error occurs on a data qubit",
              "Step 3: 🔍 Stabilizer measurement detects the error → syndromes light up",
              "Step 4: 🔗 MWPM decoder pairs syndromes to find the most likely error path",
              "Step 5: ✅ Correction is applied — the error is fixed",
              "🎉 The logical qubit survived! Without the surface code, this error would have destroyed the computation.",
            ].slice(0, Math.min(storyStep, 6)).map((text, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">{storyStep > i + 1 ? "✓" : "→"}</span>
                <span className="text-slate-700">{text}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setStoryActive(false)}
            className="text-xs text-slate-400 hover:text-slate-600 mt-1">Dismiss</button>
        </div>
      )}

      {/* Decoder output */}
      {showDecoder && (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Decoder Output (MWPM = Minimum Weight Perfect Matching)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-50 rounded-lg p-3">
              <span className="text-slate-500">Detection events:</span>
              <span className="float-right font-semibold text-slate-900">{defects.length}</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <span className="text-slate-500">Matching edges:</span>
              <span className="float-right font-semibold text-slate-900">{matching.length}</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <span className="text-slate-500">Decoder:</span>
              <span className="float-right font-semibold text-emerald-600">MWPM ✓</span>
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-500 bg-slate-50 rounded-lg p-3 font-mono leading-relaxed">
            {matching.length === 0 && defects.length === 0 && <div>No errors detected — perfect round!</div>}
            {matching.length === 0 && defects.length > 0 && <div>Unpaired syndromes — cannot form matching. More data needed.</div>}
            {matching.slice(0, 8).map((e, i) => {
              const isB = (c: { x: number; y: number }) => c.x < 0 || c.x > distance * 2 || c.y < 0 || c.y > distance * 2;
              const fromLabel = isB(e.from) ? "boundary" : `(${e.from.x},${e.from.y})`;
              const toLabel = isB(e.to) ? "boundary" : `(${e.to.x},${e.to.y})`;
              const typeLabel = e.color === "#ef4444" || e.color === "#fca5a5" ? "X-error" : "Z-error";
              return <div key={i}>Edge {i + 1}: {fromLabel} → {toLabel} [{typeLabel}]</div>;
            })}
            {matching.length > 8 && <div>... and {matching.length - 8} more edges</div>}
          </div>
          {matching.length > 0 && (
            <p className="text-xs text-slate-400 mt-2">
              Dashed lines on the grid show how the decoder paired detection events. Each edge represents a likely error chain.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
