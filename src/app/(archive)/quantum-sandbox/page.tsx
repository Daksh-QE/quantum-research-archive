"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, ChevronRight, Info, RotateCcw, Play, BarChart3 } from "lucide-react";

/* ── Types ── */
type Gate = { type: "H" | "X" | "Y" | "Z" | "S" | "T" | "CNOT" | "SWAP" | "Measure" | "Rx" | "Ry" | "Rz"; qubit: number; target?: number; angle?: number };

/* ── Complex number helpers ──
   Amplitudes are genuine complex numbers so phase gates (S, T, Y, Rz) and
   interference are physically correct, not approximated. */
type C = { re: number; im: number };
const c = (re: number, im = 0): C => ({ re, im });
const cadd = (a: C, b: C): C => ({ re: a.re + b.re, im: a.im + b.im });
const cmul = (a: C, b: C): C => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const cconj = (a: C): C => ({ re: a.re, im: -a.im });
const cabs2 = (a: C): number => a.re * a.re + a.im * a.im;
const cabs = (a: C): number => Math.sqrt(cabs2(a));
const cphase = (a: C): number => Math.atan2(a.im, a.re);

/* ── Single-qubit gate matrices (correct, complex) ── */
const S2 = 1 / Math.SQRT2;
const H: C[][] = [[c(S2), c(S2)], [c(S2), c(-S2)]];
const X: C[][] = [[c(0), c(1)], [c(1), c(0)]];
const Y: C[][] = [[c(0), c(0, -1)], [c(0, 1), c(0)]];
const Z: C[][] = [[c(1), c(0)], [c(0), c(-1)]];
const S: C[][] = [[c(1), c(0)], [c(0), c(0, 1)]];                                  // diag(1, i)
const T: C[][] = [[c(1), c(0)], [c(0), c(Math.cos(Math.PI / 4), Math.sin(Math.PI / 4))]]; // diag(1, e^{iπ/4})

/* ── Statevector utilities (2^n complex amplitudes) ── */
function initialVector(n: number): C[] {
  const v: C[] = new Array(1 << n).fill(0).map(() => c(0));
  v[0] = c(1);
  return v;
}

function applySingleQubitGate(state: C[], target: number, matrix: C[][]): C[] {
  const result = state.map((z) => c(z.re, z.im));
  for (let i = 0; i < state.length; i++) {
    const bit = (i >> target) & 1;
    const pair = i ^ (1 << target);
    if (bit === 0) {
      // |...0...> row
      result[i] = cadd(cmul(matrix[0][0], state[i]), cmul(matrix[0][1], state[pair]));
    } else {
      // |...1...> row
      result[i] = cadd(cmul(matrix[1][0], state[pair]), cmul(matrix[1][1], state[i]));
    }
  }
  return result;
}

function applyCNOT(state: C[], control: number, target: number): C[] {
  const result = state.map((z) => c(z.re, z.im));
  for (let i = 0; i < state.length; i++) {
    const cBit = (i >> control) & 1;
    if (cBit === 1) {
      const flipped = i ^ (1 << target);
      result[i] = state[flipped];
    }
  }
  return result;
}

function applySWAP(state: C[], q0: number, q1: number): C[] {
  let result = state.map((z) => c(z.re, z.im));
  result = applyCNOT(result, q0, q1);
  result = applyCNOT(result, q1, q0);
  result = applyCNOT(result, q0, q1);
  return result;
}

function measureState(state: C[]): { outcome: number; prob: number } {
  const probs = state.map(cabs2);
  const total = probs.reduce((s, p) => s + p, 0) || 1;
  const r = Math.random() * total;
  let cum = 0;
  for (let i = 0; i < state.length; i++) {
    cum += probs[i];
    if (r < cum) return { outcome: i, prob: probs[i] / total };
  }
  return { outcome: state.length - 1, prob: 0 };
}

/* Reduced density matrix of qubit 0 → Bloch vector (x, y, z) and P(|0⟩). */
function blochVector(state: C[]): { x: number; y: number; z: number; prob0: number } {
  let rho00 = 0, rho11 = 0;
  let rho01 = c(0);
  for (let i = 0; i < state.length; i += 2) {
    rho00 += cabs2(state[i]);
    rho11 += cabs2(state[i + 1]);
    rho01 = cadd(rho01, cmul(state[i], cconj(state[i + 1])));
  }
  // ρ = (I + r·σ)/2  ⇒  ρ01 = (x − i y)/2
  const x = 2 * rho01.re;
  const y = -2 * rho01.im;
  const z = rho00 - rho11;
  return { x, y, z, prob0: rho00 };
}

function formatBinary(n: number, bits: number): string {
  return "|" + n.toString(2).padStart(bits, "0") + "⟩";
}

const GATE_COLORS: Record<string, string> = {
  H: "#6366f1", X: "#ef4444", Y: "#22c55e", Z: "#f59e0b",
  S: "#06b6d4", T: "#8b5cf6", CNOT: "#ec4899", SWAP: "#f97316", Measure: "#6b7280",
  Rx: "#8b5cf6", Ry: "#8b5cf6", Rz: "#8b5cf6",
};

function rotationMatrix(axis: "Rx" | "Ry" | "Rz", theta: number): C[][] {
  const cos = Math.cos(theta / 2);
  const sin = Math.sin(theta / 2);
  if (axis === "Rx") return [[c(cos), c(0, -sin)], [c(0, -sin), c(cos)]];
  if (axis === "Ry") return [[c(cos), c(-sin)], [c(sin), c(cos)]];
  // Rz = diag(e^{-iθ/2}, e^{iθ/2})
  return [[c(cos, -sin), c(0)], [c(0), c(cos, sin)]];
}

function gateMatrix(type: Gate["type"]): C[][] | null {
  switch (type) {
    case "H": return H;
    case "X": return X;
    case "Y": return Y;
    case "Z": return Z;
    case "S": return S;
    case "T": return T;
    default: return null;
  }
}

const GATE_TOOLTIPS: Record<string, string> = {
  H: "Hadamard — creates an equal superposition: |0⟩ → (|0⟩+|1⟩)/√2",
  X: "Pauli-X (bit flip) — the quantum NOT: |0⟩ ↔ |1⟩",
  Y: "Pauli-Y — a combined bit flip and phase flip (introduces an i phase)",
  Z: "Pauli-Z (phase flip) — leaves |0⟩ alone, flips the sign of |1⟩",
  S: "S (phase) gate — adds a 90° (i) phase to |1⟩",
  T: "T (π/8) gate — adds a 45° phase to |1⟩",
  CNOT: "Controlled-NOT — flips the target qubit when the control is |1⟩. Creates entanglement.",
  SWAP: "Swaps the states of two qubits",
  Measure: "Measures — collapses the superposition to |0⟩ or |1⟩ at random",
  Rx: "Rotation about the X-axis by an angle you set with the slider",
  Ry: "Rotation about the Y-axis by an angle you set with the slider",
  Rz: "Rotation about the Z-axis (a pure phase rotation) by the angle you set",
};

/* ── Component ── */
export default function QuantumSandbox() {
  const [numQubits, setNumQubits] = useState(1);
  const [circuit, setCircuit] = useState<Gate[]>([]);
  const [statevector, setStatevector] = useState<C[]>(initialVector(1));
  const [activeQubit, setActiveQubit] = useState(0);
  const [introOpen, setIntroOpen] = useState(true);
  const [lastAction, setLastAction] = useState("");
  const [activeRotation, setActiveRotation] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState(90);
  const [shots, setShots] = useState(0);
  const [histogram, setHistogram] = useState<Record<string, number>>({});
  const blochRef = useRef<HTMLCanvasElement>(null);
  const wireRef = useRef<HTMLCanvasElement>(null);
  const skipResetRef = useRef(false);

  // Reset on qubit change (skipped once when a preset sets the state directly)
  useEffect(() => {
    if (skipResetRef.current) { skipResetRef.current = false; return; }
    setStatevector(initialVector(numQubits));
    setCircuit([]);
    setActiveQubit(0);
    setLastAction("");
    setShots(0);
    setHistogram({});
  }, [numQubits]);

  // Load a preset circuit deterministically (no addGate/setTimeout races)
  const loadPreset = useCallback((n: number, gates: Gate[], note: string) => {
    let sv = initialVector(n);
    for (const g of gates) {
      const m = gateMatrix(g.type);
      if (m) sv = applySingleQubitGate(sv, g.qubit, m);
      else if (g.type === "CNOT" && g.target !== undefined) sv = applyCNOT(sv, g.qubit, g.target);
      else if (g.type === "SWAP" && g.target !== undefined) sv = applySWAP(sv, g.qubit, g.target);
    }
    if (n !== numQubits) { skipResetRef.current = true; setNumQubits(n); }
    setCircuit(gates);
    setStatevector(sv);
    setActiveQubit(0);
    setLastAction(note);
    setShots(0);
    setHistogram({});
  }, [numQubits]);

  const addGate = useCallback((type: Gate["type"]) => {
    const target = type === "CNOT" || type === "SWAP" ? (activeQubit + 1) % numQubits : undefined;
    if ((type === "CNOT" || type === "SWAP") && numQubits < 2) {
      setLastAction(`${type} needs at least 2 qubits. Switch to 2 or 3 qubits first.`);
      return;
    }
    const gate: Gate = { type, qubit: activeQubit, target };
    setCircuit((prev) => [...prev, gate]);

    setStatevector((prev) => {
      let newSV: C[];
      const m = gateMatrix(type);
      if (m) newSV = applySingleQubitGate(prev, activeQubit, m);
      else if (type === "CNOT" && target !== undefined) newSV = applyCNOT(prev, activeQubit, target);
      else if (type === "SWAP" && target !== undefined) newSV = applySWAP(prev, activeQubit, target);
      else if (type === "Measure") {
        const { outcome, prob } = measureState(prev);
        const result: C[] = new Array(prev.length).fill(0).map(() => c(0));
        result[outcome] = c(1);
        setLastAction(`Measured the system. The probability of |0⟩ on qubit ${activeQubit} was ${(prob * 100).toFixed(0)}% — the superposition collapsed to ${formatBinary(outcome, numQubits)}. Measure again to see it can land differently.`);
        setShots(0); setHistogram({});
        return result;
      } else {
        newSV = prev;
      }

      let explanation = "";
      if (type === "H") explanation = `Applied a Hadamard (H) to qubit ${activeQubit}. It now sits in an equal superposition of |0⟩ and |1⟩ — a 50/50 chance of each if measured.`;
      else if (type === "X") explanation = `Applied a bit flip (X) to qubit ${activeQubit}, swapping the |0⟩ and |1⟩ amplitudes.`;
      else if (type === "Y") explanation = `Applied a Pauli-Y to qubit ${activeQubit} — a bit flip plus a 90° phase (the i factor shows up in the phase disks).`;
      else if (type === "Z") explanation = `Applied a phase flip (Z) to qubit ${activeQubit}. Probabilities are unchanged, but the phase of |1⟩ flipped — watch the phase disks. This matters for interference.`;
      else if (type === "S") explanation = `Applied an S gate to qubit ${activeQubit}, adding a 90° phase to |1⟩. The measurement probabilities don't change — only the phase does.`;
      else if (type === "T") explanation = `Applied a T gate to qubit ${activeQubit}, adding a 45° phase to |1⟩. T gates are the key ingredient that makes a gate set universal.`;
      else if (type === "CNOT" && target !== undefined) explanation = `Applied CNOT (control q${activeQubit}, target q${target}). If you ran H on the control first, the two qubits are now entangled — measuring one instantly determines the other.`;
      else if (type === "SWAP" && target !== undefined) explanation = `Swapped the full states of qubits ${activeQubit} and ${target}.`;
      setLastAction(explanation);
      setShots(0); setHistogram({});
      return newSV;
    });
  }, [activeQubit, numQubits]);

  const clearCircuit = () => {
    setCircuit([]);
    setStatevector(initialVector(numQubits));
    setLastAction("");
    setShots(0);
    setHistogram({});
  };

  const runShots = useCallback((count: number) => {
    const sv = statevector;
    const results: Record<string, number> = {};
    for (let s = 0; s < count; s++) {
      const { outcome } = measureState(sv);
      const label = formatBinary(outcome, numQubits);
      results[label] = (results[label] || 0) + 1;
    }
    setShots(count);
    setHistogram(results);
  }, [statevector, numQubits]);

  // Apply a rotation gate at the current slider angle (absolute, non-compounding)
  const applyRotation = useCallback((axis: "Rx" | "Ry" | "Rz", deg: number) => {
    const matrix = rotationMatrix(axis, (deg * Math.PI) / 180);
    setStatevector((prev) => applySingleQubitGate(prev, activeQubit, matrix));
    setCircuit((prev) => [...prev, { type: axis, qubit: activeQubit, angle: deg }]);
    setLastAction(`Applied ${axis}(${deg}°) to qubit ${activeQubit} — a rotation about the ${axis[1].toLowerCase()}-axis of the Bloch sphere.`);
    setShots(0); setHistogram({});
  }, [activeQubit]);

  // Draw Bloch sphere
  useEffect(() => {
    const canvas = blochRef.current;
    if (!canvas || numQubits === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width, h = canvas.height, cx = w / 2, cy = h / 2, r = Math.min(cx, cy) - 16;

    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#cbd5e1"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.3, 0, 0, Math.PI * 2); ctx.strokeStyle = "#e2e8f0"; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.3, r, 0, 0, Math.PI * 2); ctx.strokeStyle = "#f1f5f9"; ctx.stroke();

    // Axis labels: |0⟩ top, |1⟩ bottom, |+⟩/|−⟩ on the equator
    ctx.fillStyle = "#64748b"; ctx.font = "11px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("|0⟩", cx, cy - r - 5);
    ctx.fillText("|1⟩", cx, cy + r + 14);
    ctx.textAlign = "left"; ctx.fillText("|+⟩", cx + r + 4, cy + 4);
    ctx.textAlign = "right"; ctx.fillText("|−⟩", cx - r - 4, cy + 4);

    // Correct Bloch vector from the reduced density matrix of qubit 0.
    // 2D projection: x → horizontal, z → vertical (a small y tilt adds depth).
    const { x, y, z } = blochVector(statevector);
    const vx = cx + r * (x + 0.18 * y);
    const vy = cy - r * (z - 0.12 * y);

    ctx.strokeStyle = "#6366f1"; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(vx, vy); ctx.stroke();
    ctx.beginPath(); ctx.arc(vx, vy, 5, 0, Math.PI * 2); ctx.fillStyle = "#6366f1"; ctx.fill();
  }, [statevector, numQubits]);

  // Draw wire diagram
  useEffect(() => {
    const canvas = wireRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const laneH = 40, padX = 50, gateW = 36, padY = 20;
    const w = canvas.width, h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#f8fafc"; ctx.fillRect(0, 0, w, h);

    if (circuit.length === 0) {
      ctx.fillStyle = "#94a3b8"; ctx.font = "12px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("Add gates to build your circuit...", w / 2, h / 2);
      return;
    }

    const maxGates = Math.min(circuit.length, Math.floor((w - padX) / (gateW + 8)));

    for (let q = 0; q < numQubits; q++) {
      const y = padY + q * laneH + laneH / 2;
      ctx.strokeStyle = "#cbd5e1"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(padX - 30, y); ctx.lineTo(padX + maxGates * (gateW + 8), y); ctx.stroke();
      ctx.fillStyle = "#64748b"; ctx.font = "11px sans-serif"; ctx.textAlign = "right";
      ctx.fillText(`q${q}`, padX - 34, y + 3);
    }

    for (let i = 0; i < maxGates; i++) {
      const g = circuit[i];
      const x = padX + i * (gateW + 8);

      if ((g.type === "CNOT" || g.type === "SWAP") && g.target !== undefined) {
        const cY = padY + g.qubit * laneH + laneH / 2;
        const tY = padY + g.target * laneH + laneH / 2;
        ctx.strokeStyle = GATE_COLORS[g.type]; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x + gateW / 2, cY); ctx.lineTo(x + gateW / 2, tY); ctx.stroke();
        if (g.type === "CNOT") {
          ctx.beginPath(); ctx.arc(x + gateW / 2, cY, 5, 0, Math.PI * 2); ctx.fillStyle = GATE_COLORS.CNOT; ctx.fill();
          ctx.strokeStyle = GATE_COLORS.CNOT; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(x + gateW / 2, tY, 8, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x + gateW / 2 - 5, tY); ctx.lineTo(x + gateW / 2 + 5, tY); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x + gateW / 2, tY - 5); ctx.lineTo(x + gateW / 2, tY + 5); ctx.stroke();
        } else {
          for (const yy of [cY, tY]) {
            ctx.strokeStyle = GATE_COLORS.SWAP; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(x + gateW / 2 - 5, yy - 5); ctx.lineTo(x + gateW / 2 + 5, yy + 5); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x + gateW / 2 - 5, yy + 5); ctx.lineTo(x + gateW / 2 + 5, yy - 5); ctx.stroke();
          }
        }
      } else {
        const y = padY + g.qubit * laneH + laneH / 2;
        const col = GATE_COLORS[g.type] || "#6b7280";
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.roundRect(x, y - 12, gateW, 24, 6);
        ctx.fill();
        ctx.fillStyle = "#fff"; ctx.font = "bold 10px sans-serif"; ctx.textAlign = "center";
        ctx.fillText(g.type === "Measure" ? "M" : g.type, x + gateW / 2, y + 3);
      }
    }
  }, [circuit, numQubits]);

  // Statevector amplitudes for display
  const amplitudes = statevector.map((amp, i) => ({ label: formatBinary(i, numQubits), amp }));

  // Probability of |0⟩ on qubit 0
  const { prob0 } = blochVector(statevector);
  const prob1 = 1 - prob0;

  // Parse shared circuit from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const circuitParam = params.get("circuit");
    if (circuitParam) {
      const gates = circuitParam.split("-").map((s) => {
        const parts = s.match(/([A-Za-z]+)(\d+)(?:,(\d+))?/);
        if (!parts) return null;
        return { type: parts[1] as Gate["type"], qubit: parseInt(parts[2]), target: parts[3] ? parseInt(parts[3]) : undefined };
      }).filter(Boolean) as Gate[];
      if (gates.length > 0) {
        const n = Math.max(...gates.map((g) => Math.max(g.qubit, g.target ?? 0))) + 1;
        const qc = Math.min(Math.max(n, 1), 3);
        setNumQubits(qc);
        setCircuit(gates);
        let sv = initialVector(qc);
        for (const g of gates) {
          const m = gateMatrix(g.type);
          if (m) sv = applySingleQubitGate(sv, g.qubit, m);
          else if (g.type === "CNOT" && g.target !== undefined) sv = applyCNOT(sv, g.qubit, g.target);
          else if (g.type === "SWAP" && g.target !== undefined) sv = applySWAP(sv, g.qubit, g.target);
        }
        setStatevector(sv);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shareCircuit = () => {
    const gates = circuit.map((g) => `${g.type}${g.qubit}${g.target !== undefined ? `,${g.target}` : ""}`).join("-");
    const url = `${window.location.origin}${window.location.pathname}?circuit=${encodeURIComponent(gates)}`;
    navigator.clipboard.writeText(url).then(() => {
      alert("Circuit URL copied to clipboard! Share it with anyone.");
    });
  };

  const exportToQiskit = () => {
    let code = `from qiskit import QuantumCircuit\n`;
    code += `from qiskit_aer import Aer\n\n`;
    code += `qc = QuantumCircuit(${numQubits})\n\n`;
    for (const g of circuit) {
      if (g.type === "H") code += `qc.h(${g.qubit})\n`;
      else if (g.type === "X") code += `qc.x(${g.qubit})\n`;
      else if (g.type === "Y") code += `qc.y(${g.qubit})\n`;
      else if (g.type === "Z") code += `qc.z(${g.qubit})\n`;
      else if (g.type === "S") code += `qc.s(${g.qubit})\n`;
      else if (g.type === "T") code += `qc.t(${g.qubit})\n`;
      else if (g.type === "Rx") code += `qc.rx(${((g.angle ?? 0) * Math.PI / 180).toFixed(4)}, ${g.qubit})\n`;
      else if (g.type === "Ry") code += `qc.ry(${((g.angle ?? 0) * Math.PI / 180).toFixed(4)}, ${g.qubit})\n`;
      else if (g.type === "Rz") code += `qc.rz(${((g.angle ?? 0) * Math.PI / 180).toFixed(4)}, ${g.qubit})\n`;
      else if (g.type === "CNOT" && g.target !== undefined) code += `qc.cx(${g.qubit}, ${g.target})\n`;
      else if (g.type === "SWAP" && g.target !== undefined) code += `qc.swap(${g.qubit}, ${g.target})\n`;
      else if (g.type === "Measure") { code += `qc.measure_all()\n`; break; }
    }
    code += `\n# Simulate\nsimulator = Aer.get_backend('aer_simulator')\nresult = simulator.run(qc).result()\ncounts = result.get_counts()\nprint(counts)\n`;
    navigator.clipboard.writeText(code).then(() => {
      alert("Qiskit code copied to clipboard!");
    });
  };

  const gateButtons = ["H", "X", "Y", "Z", "S", "T"] as const;
  const multiButtons = ["CNOT", "SWAP", "Measure"] as const;

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">⚛</div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quantum Sandbox</h1>
          <p className="text-sm text-slate-500">Build circuits visually and watch the qubit&apos;s real, complex state update live.</p>
        </div>
      </div>

      {/* ── Beginner intro card ── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <button onClick={() => setIntroOpen(!introOpen)}
          className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          {introOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          <Info className="w-4 h-4 text-indigo-500" />
          New to this? Start here — a plain-English guide
        </button>
        {introOpen && (
          <div className="px-4 pb-4 space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-3">
            <p><strong className="text-slate-800">Qubit:</strong> A quantum bit. Unlike a normal bit (0 or 1), it can be |0⟩, |1⟩, <em>or a blend of both at once</em> — called <em>superposition</em>.</p>
            <p><strong className="text-slate-800">Notation |0⟩:</strong> The bracket is just how physicists write a quantum state. Read &ldquo;|0⟩&rdquo; as &ldquo;the state zero.&rdquo;</p>
            <p><strong className="text-slate-800">Bloch sphere:</strong> A globe showing one qubit&apos;s state. The arrow at the <em>top</em> = |0⟩, <em>bottom</em> = |1⟩, and the <em>equator</em> = a 50/50 superposition. Gates rotate this arrow.</p>
            <p><strong className="text-slate-800">Statevector:</strong> The list of all possible outcomes and their <em>amplitudes</em>. The probability of seeing an outcome is its amplitude&apos;s size squared.</p>
            <p><strong className="text-slate-800">Phase:</strong> Each amplitude also has a direction (a phase, shown as a clock hand). You can&apos;t see phase in a single measurement, but it controls <em>interference</em> when gates combine — it&apos;s what makes quantum different.</p>
            <p><strong className="text-slate-800">Measure:</strong> Looking at a qubit forces it to randomly pick |0⟩ or |1⟩. Run many shots to see the pattern.</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-100 text-indigo-700">H = superposition</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-red-100 text-red-700">X = bit flip (NOT)</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-100 text-amber-700">Z / S / T = phase</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-pink-100 text-pink-700">CNOT = entangles 2 qubits</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">Hover any gate for its meaning</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Classic Experiments ── */}
      <div className="bg-white rounded-xl border border-indigo-100 p-3">
        <p className="text-xs font-semibold text-indigo-700 mb-2">🎯 Try a classic experiment</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => loadPreset(1, [{ type: "H", qubit: 0 }], "Loaded a superposition: one Hadamard on qubit 0 gives a 50/50 state. Run shots to see it.")}
            className="px-3 py-1.5 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-medium hover:bg-indigo-200 transition-colors">
            🌀 Superposition (one H gate)
          </button>
          <button onClick={() => loadPreset(2, [{ type: "H", qubit: 0 }, { type: "CNOT", qubit: 0, target: 1 }], "Loaded a Bell state (|00⟩+|11⟩)/√2 — the two qubits are now entangled. Measuring one instantly determines the other.")}
            className="px-3 py-1.5 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-medium hover:bg-indigo-200 transition-colors">
            🔗 Bell state (entanglement)
          </button>
          <button onClick={() => loadPreset(3, [{ type: "H", qubit: 0 }, { type: "CNOT", qubit: 0, target: 1 }, { type: "CNOT", qubit: 1, target: 2 }], "Loaded a GHZ state (|000⟩+|111⟩)/√2 — three-way entanglement.")}
            className="px-3 py-1.5 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-medium hover:bg-indigo-200 transition-colors">
            🌐 GHZ state (3-qubit entanglement)
          </button>
        </div>
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
            <p className="text-[10px] text-slate-400 mt-1">Changing the count resets the circuit.</p>
          </div>

          {/* Active qubit */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Active Qubit</label>
            <p className="text-[10px] text-slate-400 mt-0.5 mb-2">Single-qubit gates apply here. For CNOT/SWAP this is the control/first qubit.</p>
            <div className="flex gap-2">
              {Array.from({ length: numQubits }, (_, i) => (
                <button key={i} onClick={() => setActiveQubit(i)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeQubit === i ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}>Q{i}</button>
              ))}
            </div>
          </div>

          {/* Gates */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Gates</label>
            <div className="grid grid-cols-3 gap-1.5">
              {gateButtons.map((g) => (
                <button key={g} title={GATE_TOOLTIPS[g]} onClick={() => addGate(g)}
                  className="px-3 py-2 rounded-lg text-xs font-bold text-white transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: GATE_COLORS[g] }}>{g}</button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5 mt-1.5">
              {multiButtons.map((g) => (
                <button key={g} title={GATE_TOOLTIPS[g]} onClick={() => addGate(g)}
                  className="px-3 py-2 rounded-lg text-xs font-bold text-white transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: GATE_COLORS[g] }}>{g === "Measure" ? "M" : g}</button>
              ))}
            </div>
            {/* Rotation gates */}
            <div className="grid grid-cols-3 gap-1.5 mt-1.5">
              {["Rx", "Ry", "Rz"].map((g) => (
                <button key={g} title={GATE_TOOLTIPS[g]}
                  onClick={() => setActiveRotation(activeRotation === g ? null : g)}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-bold text-white transition-all hover:scale-105 active:scale-95 ${activeRotation === g ? "ring-2 ring-white ring-offset-1 ring-offset-violet-500" : ""}`}
                  style={{ backgroundColor: "#8b5cf6" }}>
                  {g}(θ)
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Hover a gate to see what it does.</p>
          </div>

          {/* Rotation slider */}
          {activeRotation && (
            <div className="bg-white rounded-xl border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-700">{activeRotation}(θ)</span>
                <span className="text-xs font-mono text-slate-500">{rotationAngle}°</span>
              </div>
              <input type="range" min="0" max="360" value={rotationAngle}
                onChange={(e) => setRotationAngle(parseInt(e.target.value))}
                className="w-full mt-1 accent-violet-600" />
              <button onClick={() => applyRotation(activeRotation as "Rx" | "Ry" | "Rz", rotationAngle)}
                className="w-full mt-2 py-1.5 rounded-lg bg-violet-100 text-violet-700 text-xs font-semibold hover:bg-violet-200 transition-colors">
                Apply {activeRotation}({rotationAngle}°)
              </button>
              <p className="text-[10px] text-slate-400 mt-1">Set the angle, then apply — the Bloch arrow rotates by that amount.</p>
            </div>
          )}

          {/* Clear + Share + Export */}
          <div className="flex gap-2">
            <button onClick={clearCircuit}
              className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" /> Clear
            </button>
            <button onClick={shareCircuit}
              className="flex-1 py-2 rounded-xl bg-indigo-100 text-indigo-600 text-xs font-medium hover:bg-indigo-200 transition-colors">
              🔗 Share
            </button>
            <button onClick={exportToQiskit}
              className="flex-1 py-2 rounded-xl bg-emerald-100 text-emerald-600 text-xs font-medium hover:bg-emerald-200 transition-colors">
              📄 Qiskit
            </button>
          </div>
        </div>

        {/* Circuit + Bloch + Statevector */}
        <div className="lg:col-span-2 space-y-4">
          {/* Wire diagram */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Circuit</h3>
            <div className="overflow-x-auto">
              <canvas ref={wireRef} width={600} height={numQubits * 40 + 40} className="w-full min-h-[80px] rounded-lg" />
            </div>
          </div>

          {/* What just happened? */}
          {lastAction && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 transition-all">
              <p className="text-xs font-semibold text-indigo-700 mb-1">💡 What just happened?</p>
              <p className="text-xs text-indigo-800 leading-relaxed">{lastAction}</p>
            </div>
          )}

          {/* Bloch sphere + statevector row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bloch sphere */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Bloch Sphere — Qubit 0</h3>
              <div className="flex justify-center">
                <canvas ref={blochRef} width={190} height={190} className="max-w-[190px]" />
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>chance of |0⟩ = {(prob0 * 100).toFixed(1)}%</span>
                  <span>chance of |1⟩ = {(prob1 * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
                  <div style={{ width: `${Math.max(prob0 * 100, 1)}%` }}
                    className="bg-indigo-500 h-full transition-all duration-300" />
                  <div style={{ width: `${Math.max(prob1 * 100, 1)}%` }}
                    className="bg-pink-500 h-full transition-all duration-300" />
                </div>
              </div>
            </div>

            {/* Statevector display */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Statevector</h3>
              <p className="text-[10px] text-slate-400 mb-2">Bar = amplitude size. Number = amplitude (with phase, if any).</p>
              <div className="space-y-1 max-h-[150px] overflow-y-auto">
                {amplitudes.map(({ label, amp }) => {
                  const mod = cabs(amp);
                  const deg = (cphase(amp) * 180 / Math.PI);
                  const disp = Math.abs(amp.im) < 1e-6
                    ? amp.re.toFixed(3)
                    : `${mod.toFixed(2)}∠${deg.toFixed(0)}°`;
                  return (
                    <div key={label} className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-slate-700 w-16 shrink-0">{label}</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div style={{ width: `${mod * 100}%` }}
                          className="bg-violet-500 h-full transition-all duration-300" />
                      </div>
                      <span className="font-mono text-slate-500 w-16 text-right">{disp}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Run shots + Histogram */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                <BarChart3 className="w-3.5 h-3.5 inline mr-1" />
                Measurement Statistics
              </h3>
              <div className="flex gap-2">
                <button onClick={() => runShots(100)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors flex items-center gap-1">
                  <Play className="w-3 h-3" /> Run 100 shots
                </button>
                <button onClick={() => runShots(1000)}
                  className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-500 transition-colors flex items-center gap-1">
                  <Play className="w-3 h-3" /> Run 1000
                </button>
              </div>
            </div>
            {shots > 0 && (
              <div>
                <div className="space-y-1.5 mb-2">
                  {Object.entries(histogram).sort(([a], [b]) => {
                    const na = parseInt(a.replace(/[^0-9]/g, ""), 2);
                    const nb = parseInt(b.replace(/[^0-9]/g, ""), 2);
                    return na - nb;
                  }).map(([label, count]) => {
                    const pct = (count / shots) * 100;
                    return (
                      <div key={label} className="flex items-center gap-2 text-xs">
                        <span className="font-mono text-slate-700 w-16 shrink-0">{label}</span>
                        <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                          <div style={{ width: `${pct}%` }}
                            className="bg-indigo-500 h-full transition-all duration-500" />
                        </div>
                        <span className="text-slate-500 w-16 text-right">{count} ({pct.toFixed(0)}%)</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mt-2">
                  Each shot is random — quantum measurement has no predetermined outcome. Run it 1000 times and a stable pattern emerges even though no single shot is predictable.
                </p>
              </div>
            )}
            {shots === 0 && (
              <p className="text-xs text-slate-400 py-2">Click &ldquo;Run 100 shots&rdquo; to measure the current state many times and see the distribution.</p>
            )}
          </div>

          {/* Phase disks */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1">Phase Visualization</h3>
            <p className="text-[10px] text-slate-400 mb-3">Each disk is one possible outcome. Fill = probability; the clock hand = phase. Phase gates (Z, S, T) rotate the hand without changing the fill.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {statevector.map((amp, i) => {
                const mag = cabs(amp);
                const phase = cphase(amp);
                const basis = i.toString(2).padStart(numQubits, "0");
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <canvas width={60} height={60} className="rounded-full bg-slate-50 border border-slate-200"
                      ref={(el) => {
                        if (!el) return;
                        const ctx = el.getContext("2d");
                        if (!ctx) return;
                        const cx = 30, cy = 30, r = 25;
                        ctx.clearRect(0, 0, 60, 60);
                        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
                        ctx.fillStyle = "#f8fafc"; ctx.fill();
                        ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1; ctx.stroke();
                        if (mag > 0.01) {
                          ctx.beginPath(); ctx.arc(cx, cy, r * mag, 0, Math.PI * 2);
                          ctx.fillStyle = `rgba(99,102,241,${0.2 + mag * 0.5})`; ctx.fill();
                          // Phase hand (screen y is inverted so negate sin)
                          ctx.beginPath(); ctx.moveTo(cx, cy);
                          ctx.lineTo(cx + r * Math.cos(phase), cy - r * Math.sin(phase));
                          ctx.strokeStyle = "#6366f1"; ctx.lineWidth = 2; ctx.stroke();
                        }
                      }} />
                    <span className="text-[10px] font-mono text-slate-500">|{basis}⟩</span>
                    {mag > 0.01 && <span className="text-[8px] text-slate-400">φ={(phase * 180 / Math.PI).toFixed(0)}°</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
