"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

/* ── Surface code simulation ── */
interface Coord { x: number; y: number; }
interface Defect { pos: Coord; type: "X" | "Z"; round: number; }
interface MatchingEdge { from: Coord; to: Coord; color: string; }

function generateSyndrome(d: number, errorRate: number, seed: number): { defects: Defect[]; plaquettes: Coord[] } {
  const defects: Defect[] = [];
  const plaquettes: Coord[] = [];
  let s = seed;
  const rand = () => { s = (s * 16807 + 0) % 2147483647; return (s & 0x7fffffff) / 0x7fffffff; };

  // Generate plaquette positions
  for (let x = 1; x < d * 2; x += 2) {
    for (let y = 1; y < d * 2; y += 2) {
      plaquettes.push({ x, y });
    }
  }

  // Generate defects with some error rate
  for (const p of plaquettes) {
    if (rand() < errorRate) {
      defects.push({ pos: p, type: rand() > 0.5 ? "X" : "Z", round: 0 });
    }
  }

  // Add extra scattered defects for visual interest
  const extraCount = Math.floor(d * 1.5);
  for (let i = 0; i < extraCount; i++) {
    const x = Math.floor(rand() * d * 2);
    const y = Math.floor(rand() * d * 2);
    if (x % 2 === 1 && y % 2 === 1) {
      defects.push({ pos: { x, y }, type: rand() > 0.5 ? "X" : "Z", round: 1 });
    }
  }

  return { defects, plaquettes };
}

function generateMatching(defects: Defect[], d: number): MatchingEdge[] {
  const edges: MatchingEdge[] = [];
  const xDefects = defects.filter((dd) => dd.type === "X");
  const zDefects = defects.filter((dd) => dd.type === "Z");

  // Pair nearby X defects
  for (let i = 0; i < xDefects.length - 1; i += 2) {
    const a = xDefects[i].pos;
    const b = xDefects[i + 1].pos;
    edges.push({ from: a, to: b, color: "#ef4444" });
  }

  // Pair nearby Z defects
  for (let i = 0; i < zDefects.length - 1; i += 2) {
    const a = zDefects[i].pos;
    const b = zDefects[i + 1].pos;
    edges.push({ from: a, to: b, color: "#6366f1" });
  }

  // Boundary matching for unpaired defects
  for (const dd of defects) {
    const paired = edges.some((e) =>
      (e.from.x === dd.pos.x && e.from.y === dd.pos.y) ||
      (e.to.x === dd.pos.x && e.to.y === dd.pos.y)
    );
    if (!paired) {
      const boundary = { x: dd.pos.x < d ? -1 : d * 2 + 1, y: dd.pos.y };
      edges.push({ from: dd.pos, to: boundary, color: dd.type === "X" ? "#fca5a5" : "#a5b4fc" });
    }
  }

  return edges;
}

export default function QECDashboard() {
  const [distance, setDistance] = useState(3);
  const [errorRate, setErrorRate] = useState(0.15);
  const [defects, setDefects] = useState<Defect[]>([]);
  const [plaquettes, setCoord] = useState<Coord[]>([]);
  const [matching, setMatching] = useState<MatchingEdge[]>([]);
  const [showDecoder, setShowDecoder] = useState(false);
  const [animStep, setAnimStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredDefect, setHoveredDefect] = useState<number | null>(null);

  const runSimulation = useCallback(() => {
    const result = generateSyndrome(distance, errorRate, Date.now());
    setDefects(result.defects);
    setCoord(result.plaquettes);
    setMatching([]);
    setShowDecoder(false);
    setAnimStep(0);
  }, [distance, errorRate]);

  const runDecoder = useCallback(() => {
    const edges = generateMatching(defects, distance);
    setMatching(edges);
    setShowDecoder(true);
    setAnimStep(0);
  }, [defects, distance]);

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
      for (let i = 0; i < Math.min(matching.length, edgeCount); i++) {
        const e = matching[i];
        const fx = e.from.x >= 0 ? e.from.x * cell + cell / 2 : (e.from.x < 0 ? 0 : size);
        const fy = e.from.y >= 0 ? e.from.y * cell + cell / 2 : cell / 2;
        const tx = e.to.x >= 0 ? e.to.x * cell + cell / 2 : (e.to.x > distance * 2 ? size : 0);
        const ty = e.to.y >= 0 ? e.to.y * cell + cell / 2 : cell / 2;

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
  }, [defects, plaquettes, matching, showDecoder, animStep, distance, hoveredDefect]);

  // Animation timer
  useEffect(() => {
    if (!showDecoder && defects.length === 0) return;
    const interval = setInterval(() => {
      setAnimStep((prev) => {
        const max = showDecoder ? matching.length * 3 + 3 : defects.length * 2 + 3;
        return prev < max ? prev + 1 : prev;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [showDecoder, defects.length, matching.length]);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">⊕</div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">QEC Error Decoding Dashboard</h1>
          <p className="text-sm text-slate-500">Visualize surface code syndromes and watch the decoder match errors in real time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Code Distance</label>
              <div className="flex gap-2 mt-2">
                {[3, 5, 7].map((d) => (
                  <button key={d} onClick={() => setDistance(d)}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      distance === d ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}>{d}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Error Rate: {Math.round(errorRate * 100)}%
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
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-xs space-y-2">
            <p className="font-semibold text-slate-900">Legend</p>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /><span className="text-slate-600">X syndrome</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500" /><span className="text-slate-600">Z syndrome</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 border-t-2 border-dashed border-slate-400" style={{ width: 16 }} /><span className="text-slate-600">Matching edge</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-300" /><span className="text-slate-600">Data qubit</span></div>
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
        </div>
      </div>

      {/* Decoder output */}
      {showDecoder && (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Decoder Output</h3>
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
            {matching.slice(0, 6).map((e, i) => (
              <div key={i}>
                Edge {i + 1}: ({e.from.x},{e.from.y}) → ({e.to.x},{e.to.y}) [{e.color}]
              </div>
            ))}
            {matching.length > 6 && <div>... and {matching.length - 6} more edges</div>}
            {matching.length === 0 && <div>No errors detected — perfect round!</div>}
          </div>
        </div>
      )}
    </div>
  );
}
