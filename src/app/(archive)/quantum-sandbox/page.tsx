"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, ChevronRight, Info } from "lucide-react";

/* ── Types ── */
type Gate = { type: "H" | "X" | "Y" | "Z" | "S" | "T" | "CNOT" | "SWAP" | "Measure"; qubit: number; target?: number };

/* ── Single-qubit gate matrices ── */
const I = [[1, 0], [0, 1]] as const;
const H = [[1 / Math.SQRT2, 1 / Math.SQRT2], [1 / Math.SQRT2, -1 / Math.SQRT2]] as const;
const X = [[0, 1], [1, 0]] as const;
const Y = [[0, -1], [1, 0]] as const; // ignoring i factor for display
const Z = [[1, 0], [0, -1]] as const;
const S = [[1, 0], [0, 1]] as const; // S = sqrt(Z) phase (real projection)
const T = [[1, 0], [0, 1]] as const; // T = 4th root of Z (real projection)

function matMul(m1: number[][], m2: number[][]): number[][] {
  const r: number[][] = [];
  for (let i = 0; i < m1.length; i++) {
    r[i] = [];
    for (let j = 0; j < m2[0].length; j++) {
      let s = 0;
      for (let k = 0; k < m1[0].length; k++) s += m1[i][k] * m2[k][j];
      r[i][j] = s;
    }
  }
  return r;
}

function applyGate(state: number[][], gate: number[][]): number[][] {
  return matMul(gate, state);
}

function initialState(): number[][] {
  return [[1], [0]]; // |0⟩
}

const GATE_COLORS: Record<string, string> = {
  H: "#6366f1", X: "#ef4444", Y: "#22c55e", Z: "#f59e0b",
  S: "#06b6d4", T: "#8b5cf6", CNOT: "#ec4899", SWAP: "#f97316", Measure: "#6b7280",
};

/* ── Gate tooltip descriptions ── */
const GATE_TOOLTIPS: Record<string, string> = {
  H: "Creates superposition — maps |0⟩ → (|0⟩+|1⟩)/√2",
  X: "Bit flip — maps |0⟩ → |1⟩, like quantum NOT",
  Y: "Combined bit+phase flip",
  Z: "Phase flip — flips the sign of |1⟩",
  S: "Phase gate — rotates by 90° around Z",
  T: "π/8 gate — rotates by 45° around Z",
  CNOT: "Controlled-NOT — flips target if control is |1⟩",
  SWAP: "Swaps two qubits",
  Measure: "Collapses qubit to |0⟩ or |1⟩",
};

export default function QuantumSandbox() {
  const [numQubits, setNumQubits] = useState(1);
  const [circuit, setCircuit] = useState<Gate[]>([]);
  const [activeQubit, setActiveQubit] = useState(0);
  const [states, setStates] = useState<number[][][]>([initialState()]);
  const [introOpen, setIntroOpen] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blochRef = useRef<HTMLCanvasElement>(null);

  // Reset on qubit change
  useEffect(() => {
    setStates(Array(numQubits).fill(null).map(() => initialState()));
    setCircuit([]);
    setHistory([]);
    setActiveQubit(0);
  }, [numQubits]); // eslint-disable-line react-hooks/exhaustive-deps

  const [history, setHistory] = useState<number[][][][]>([[]]);

  const addGate = useCallback((type: Gate["type"]) => {
    const gate: Gate = { type, qubit: activeQubit, target: type === "CNOT" || type === "SWAP" ? (activeQubit + 1) % numQubits : undefined };
    setCircuit((prev) => [...prev, gate]);

    // Apply gate to state
    setStates((prev) => {
      const newStates = prev.map((s) => [...s.map((r) => [...r])]);
      if (type === "H") newStates[activeQubit] = applyGate(newStates[activeQubit], H as any);
      else if (type === "X") newStates[activeQubit] = applyGate(newStates[activeQubit], X as any);
      else if (type === "Y") newStates[activeQubit] = applyGate(newStates[activeQubit], Y as any);
      else if (type === "Z") newStates[activeQubit] = applyGate(newStates[activeQubit], Z as any);
      else if (type === "S") newStates[activeQubit] = applyGate(newStates[activeQubit], S as any);
      else if (type === "T") newStates[activeQubit] = applyGate(newStates[activeQubit], T as any);
      else if (type === "CNOT" && activeQubit !== gate.target!) {
        // Simplified CNOT: flip target if control is |1⟩
        if (Math.abs(newStates[activeQubit][0][0]) < 0.1) {
          // control is |1⟩, flip target
          const tmp = newStates[gate.target!][0][0];
          newStates[gate.target!][0][0] = newStates[gate.target!][1][0];
          newStates[gate.target!][1][0] = tmp;
        }
      } else if (type === "Measure") {
        const prob0 = Math.abs(newStates[activeQubit][0][0]) ** 2;
        if (Math.random() < prob0) {
          // collapse to |0⟩
          newStates[activeQubit] = [[1], [0]];
        } else {
          // collapse to |1⟩
          newStates[activeQubit] = [[0], [1]];
        }
      }
      return newStates;
    });
  }, [activeQubit, numQubits]);

  const clearCircuit = () => {
    setCircuit([]);
    setStates(Array(numQubits).fill(null).map(() => initialState()));
  };

  // Draw Bloch sphere
  useEffect(() => {
    const canvas = blochRef.current;
    if (!canvas || numQubits === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width, h = canvas.height, cx = w / 2, cy = h / 2, r = Math.min(cx, cy) - 10;

    ctx.clearRect(0, 0, w, h);

    // Sphere outline
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1; ctx.stroke();
    // Equator (ellipse for 3D effect)
    ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.3, 0, 0, Math.PI * 2); ctx.strokeStyle = "#e2e8f0"; ctx.stroke();
    // Vertical meridian (for 3D effect)
    ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.3, r, 0, 0, Math.PI * 2); ctx.strokeStyle = "#f1f5f9"; ctx.stroke();

    // Axis labels
    ctx.fillStyle = "#94a3b8"; ctx.font = "11px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("|0⟩", cx, cy - r - 6);
    ctx.fillText("|1⟩", cx, cy + r + 14);
    ctx.textAlign = "left"; ctx.fillText("+", cx + r + 6, cy + 4);
    ctx.textAlign = "right"; ctx.fillText("−", cx - r - 6, cy + 4);

    // State vector
    const state = states[activeQubit] || initialState();
    const a = Math.abs(state[0][0]);
    const b = Math.abs(state[1][0]);
    const norm = Math.max(a + b, 0.001);
    const theta = 2 * Math.acos(Math.min(a / norm, 1));
    const phi = Math.atan2(state[1][0], state[0][0]);

    const vx = cx + r * Math.sin(theta) * Math.cos(phi);
    const vy = cy - r * Math.cos(theta);

    // Arrow
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(vx, vy);
    ctx.strokeStyle = "#6366f1"; ctx.lineWidth = 2.5; ctx.stroke();

    // Dot
    ctx.beginPath(); ctx.arc(vx, vy, 5, 0, Math.PI * 2); ctx.fillStyle = "#6366f1"; ctx.fill();
  }, [states, activeQubit, numQubits]);

  const state0 = states[activeQubit]?.[0]?.[0] ?? 1;
  const state1 = states[activeQubit]?.[1]?.[0] ?? 0;
  const prob0 = Math.abs(state0) ** 2;
  const prob1 = Math.abs(state1) ** 2;

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">⚛</div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quantum Sandbox</h1>
          <p className="text-sm text-slate-500">Build circuits visually and watch the Bloch sphere update live.</p>
        </div>
      </div>

      {/* ── Beginner intro card ── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <button
          onClick={() => setIntroOpen(!introOpen)}
          className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          {introOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          <Info className="w-4 h-4 text-indigo-500" />
          What is this? A beginner&apos;s guide to the Quantum Sandbox
        </button>
        {introOpen && (
          <div className="px-4 pb-4 space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-3">
            <p>
              <strong className="text-slate-800">Qubit (quantum bit):</strong> Unlike a classical bit (0 or 1), a qubit can be in state |0⟩, |1⟩,{" "}
              <em>or both at once</em> — a property called <strong>superposition</strong>.
            </p>
            <p>
              <strong className="text-slate-800">Bloch sphere:</strong> A visual representation of a qubit. The north pole is |0⟩, the south pole is |1⟩, and the equator represents equal superpositions like (|0⟩+|1⟩)/√2.
            </p>
            <p>
              <strong className="text-slate-800">Gates:</strong> Operations that rotate the qubit state vector on the Bloch sphere. Different gates produce different rotations.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-100 text-indigo-700">H = Hadamard — creates superposition</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-red-100 text-red-700">X = Bit flip — like quantum NOT</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-100 text-amber-700">Z = Phase flip</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">Measure = collapse to |0⟩ or |1⟩</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          {/* Qubit selector */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Qubits</label>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3].map((n) => (
                <button key={n} onClick={() => setNumQubits(n)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    numQubits === n ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}>{n}</button>
              ))}
            </div>
          </div>

          {/* Active qubit */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Active Qubit</label>
            <div className="flex gap-2 mt-2">
              {Array.from({ length: numQubits }, (_, i) => (
                <button key={i} onClick={() => setActiveQubit(i)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeQubit === i ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}>Q{i}</button>
              ))}
            </div>
          </div>

          {/* Gates with tooltips */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Gates</label>
            <div className="grid grid-cols-3 gap-1.5">
              {["H", "X", "Y", "Z", "S", "T"].map((g) => (
                <button key={g}
                  title={GATE_TOOLTIPS[g]}
                  onClick={() => addGate(g as Gate["type"])}
                  className="px-3 py-2 rounded-lg text-xs font-bold text-white transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: GATE_COLORS[g] }}>
                  {g}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1.5 mt-1.5">
              {["CNOT", "SWAP", "Measure"].map((g) => (
                <button key={g}
                  title={GATE_TOOLTIPS[g]}
                  onClick={() => addGate(g as Gate["type"])}
                  className="px-3 py-2 rounded-lg text-xs font-bold text-white transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: GATE_COLORS[g] }}>
                  {g === "Measure" ? "M" : g}
                </button>
              ))}
            </div>
          </div>

          {/* Clear */}
          <button onClick={clearCircuit}
            className="w-full py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors">
            Clear Circuit
          </button>
        </div>

        {/* Circuit display + Bloch */}
        <div className="lg:col-span-2 space-y-4">
          {/* Circuit */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Circuit</h3>
            <div className="overflow-x-auto">
              <div className="flex gap-1.5 min-w-max">
                {circuit.length === 0 && (
                  <span className="text-xs text-slate-400 px-2 py-4">Add gates to build your circuit...</span>
                )}
                {circuit.map((g, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    <span className="text-[9px] text-slate-400">{g.qubit === g.target ? "" : `q${g.qubit}`}</span>
                    <div className="px-3 py-2 rounded-lg text-[10px] font-bold text-white text-center whitespace-nowrap"
                      title={GATE_TOOLTIPS[g.type]}
                      style={{ backgroundColor: GATE_COLORS[g.type], minWidth: 32 }}>
                      {g.type}{g.target !== undefined && g.target !== g.qubit ? `·q${g.target}` : ""}
                    </div>
                    <span className="text-[9px] text-slate-400">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bloch sphere */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
              Bloch Sphere — Qubit {activeQubit}
            </h3>
            <div className="flex justify-center">
              <canvas ref={blochRef} width={200} height={200} className="max-w-[200px]" />
            </div>
            <div className="mt-2 text-center text-xs text-slate-500 font-mono">
              |ψ⟩ = {state0.toFixed(3)} |0⟩ + {state1.toFixed(3)} |1⟩
            </div>
            {/* ── Probability bars ── */}
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>|α|² = {prob0.toFixed(3)}</span>
                <span>|β|² = {prob1.toFixed(3)}</span>
              </div>
              <div className="w-full h-4 rounded-full bg-slate-100 overflow-hidden flex">
                <div
                  style={{ width: `${Math.max(prob0 * 100, 1)}%` }}
                  className="bg-indigo-500 h-full transition-all duration-300"
                />
                <div
                  style={{ width: `${Math.max(prob1 * 100, 1)}%` }}
                  className="bg-pink-500 h-full transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* All qubit states */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">All Qubits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Array.from({ length: numQubits }, (_, i) => (
                <div key={i} className="bg-slate-50 rounded-lg p-3 text-xs">
                  <span className="font-semibold text-slate-700">Qubit {i}: </span>
                  <span className="text-slate-500 font-mono">
                    [{states[i]?.[0]?.[0]?.toFixed(2) ?? "1.00"}, {states[i]?.[1]?.[0]?.toFixed(2) ?? "0.00"}]ᵀ
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
