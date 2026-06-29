"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ChevronDown, ChevronRight, Info, Plus, Minus, Trash2, Copy, RotateCcw } from "lucide-react";

/* ════════════════════════════════════════════════════════════════════
   Complex-number quantum circuit simulator (Qiskit little-endian).
   Qubit 0 is the least-significant bit; basis labels are written
   q[n-1] … q[0] left→right, matching IBM Quantum Composer.
   ════════════════════════════════════════════════════════════════════ */
type C = { re: number; im: number };
const cx = (re: number, im = 0): C => ({ re, im });
const cadd = (a: C, b: C): C => ({ re: a.re + b.re, im: a.im + b.im });
const cmul = (a: C, b: C): C => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const cabs2 = (a: C): number => a.re * a.re + a.im * a.im;
const cabs = (a: C): number => Math.sqrt(cabs2(a));
const cphase = (a: C): number => Math.atan2(a.im, a.re);
const cexp = (theta: number): C => ({ re: Math.cos(theta), im: Math.sin(theta) }); // e^{iθ}

/* ── Single-qubit gate matrices ── */
const SQ = 1 / Math.SQRT2;
function baseMatrix(type: string, p: number[]): C[][] | null {
  const th = p[0] ?? 0, ph = p[1] ?? 0, lam = p[2] ?? 0;
  switch (type) {
    case "H": return [[cx(SQ), cx(SQ)], [cx(SQ), cx(-SQ)]];
    case "X": case "CX": case "CCX": return [[cx(0), cx(1)], [cx(1), cx(0)]];
    case "Y": case "CY": return [[cx(0), cx(0, -1)], [cx(0, 1), cx(0)]];
    case "Z": case "CZ": return [[cx(1), cx(0)], [cx(0), cx(-1)]];
    case "S": return [[cx(1), cx(0)], [cx(0), cx(0, 1)]];
    case "Sdg": return [[cx(1), cx(0)], [cx(0), cx(0, -1)]];
    case "T": return [[cx(1), cx(0)], [cx(0), cexp(Math.PI / 4)]];
    case "Tdg": return [[cx(1), cx(0)], [cx(0), cexp(-Math.PI / 4)]];
    case "SX": return [[cx(0.5, 0.5), cx(0.5, -0.5)], [cx(0.5, -0.5), cx(0.5, 0.5)]];
    case "SXdg": return [[cx(0.5, -0.5), cx(0.5, 0.5)], [cx(0.5, 0.5), cx(0.5, -0.5)]];
    case "ID": return [[cx(1), cx(0)], [cx(0), cx(1)]];
    case "P": case "CP": return [[cx(1), cx(0)], [cx(0), cexp(lam)]];
    case "RX": case "CRX": {
      const c = Math.cos(th / 2), s = Math.sin(th / 2);
      return [[cx(c), cx(0, -s)], [cx(0, -s), cx(c)]];
    }
    case "RY": case "CRY": {
      const c = Math.cos(th / 2), s = Math.sin(th / 2);
      return [[cx(c), cx(-s)], [cx(s), cx(c)]];
    }
    case "RZ": case "CRZ": return [[cexp(-th / 2), cx(0)], [cx(0), cexp(th / 2)]];
    case "U": {
      const c = Math.cos(th / 2), s = Math.sin(th / 2);
      return [
        [cx(c), cmul(cexp(lam), cx(-s))],
        [cmul(cexp(ph), cx(s)), cmul(cexp(ph + lam), cx(c))],
      ];
    }
    default: return null;
  }
}

function initialState(n: number): C[] {
  const v: C[] = new Array(1 << n).fill(0).map(() => cx(0));
  v[0] = cx(1);
  return v;
}

function applyControlledSingle(state: C[], controls: number[], target: number, M: C[][]): C[] {
  const r = state.slice();
  const cmask = controls.reduce((m, c) => m | (1 << c), 0);
  for (let i = 0; i < state.length; i++) {
    if ((i & cmask) !== cmask) continue;            // controls must all be 1
    if (((i >> target) & 1) !== 0) continue;        // act once, on target-bit-0 index
    const j = i ^ (1 << target);
    const a = state[i], b = state[j];
    r[i] = cadd(cmul(M[0][0], a), cmul(M[0][1], b));
    r[j] = cadd(cmul(M[1][0], a), cmul(M[1][1], b));
  }
  return r;
}

function applySwap(state: C[], a: number, b: number, controls: number[] = []): C[] {
  const r = state.slice();
  const cmask = controls.reduce((m, c) => m | (1 << c), 0);
  for (let i = 0; i < state.length; i++) {
    if ((i & cmask) !== cmask) continue;
    const bitA = (i >> a) & 1, bitB = (i >> b) & 1;
    if (bitA === 0 && bitB === 1) {
      const j = i ^ (1 << a) ^ (1 << b);
      r[i] = state[j]; r[j] = state[i];
    }
  }
  return r;
}

function applyRZZ(state: C[], a: number, b: number, theta: number): C[] {
  return state.map((amp, i) => {
    const za = ((i >> a) & 1) ? -1 : 1;
    const zb = ((i >> b) & 1) ? -1 : 1;
    return cmul(amp, cexp(-theta / 2 * za * zb));
  });
}

function applyRXX(state: C[], a: number, b: number, theta: number): C[] {
  const r = state.slice();
  const c = Math.cos(theta / 2), s = Math.sin(theta / 2);
  const seen = new Array(state.length).fill(false);
  for (let i = 0; i < state.length; i++) {
    if (seen[i]) continue;
    const j = i ^ (1 << a) ^ (1 << b); // flip both
    seen[i] = seen[j] = true;
    const ai = state[i], aj = state[j];
    // exp(-iθ/2 XX): |x⟩ -> c|x⟩ - i s |x flipped on both⟩
    r[i] = cadd(cmul(cx(c), ai), cmul(cx(0, -s), aj));
    r[j] = cadd(cmul(cx(c), aj), cmul(cx(0, -s), ai));
  }
  return r;
}

/* ── Operation instance ── */
interface Op {
  uid: string;
  type: string;
  col: number;
  targets: number[];
  controls: number[];
  params: number[];
}

function involved(op: Op): number[] { return [...op.controls, ...op.targets]; }

function applyOp(state: C[], op: Op): C[] {
  const t = op.targets, c = op.controls, p = op.params;
  switch (op.type) {
    case "Measure": case "Reset": case "Barrier": return state; // shown pre-measurement
    case "SWAP": return applySwap(state, t[0], t[1], c);
    case "CSWAP": return applySwap(state, t[0], t[1], c);
    case "RZZ": return applyRZZ(state, t[0], t[1], p[0] ?? 0);
    case "RXX": return applyRXX(state, t[0], t[1], p[0] ?? 0);
    default: {
      const M = baseMatrix(op.type, p);
      if (!M) return state;
      return applyControlledSingle(state, c, t[0], M);
    }
  }
}

function simulate(ops: Op[], n: number): C[] {
  let s = initialState(n);
  const sorted = [...ops].sort((a, b) => a.col - b.col);
  for (const op of sorted) s = applyOp(s, op);
  return s;
}

function labelOf(i: number, n: number): string {
  let str = "";
  for (let q = n - 1; q >= 0; q--) str += ((i >> q) & 1);
  return str;
}

/* ── Gate palette (IBM Composer-style operation set) ── */
interface GateDef {
  type: string; label: string; cat: string; color: string;
  ctrls: number; tgts: number; params: { name: string; def: number }[];
}
const PI = Math.PI;
const PALETTE: GateDef[] = [
  // Single-qubit Clifford / common
  { type: "H", label: "H", cat: "Single-qubit", color: "#6366f1", ctrls: 0, tgts: 1, params: [] },
  { type: "X", label: "X", cat: "Single-qubit", color: "#a855f7", ctrls: 0, tgts: 1, params: [] },
  { type: "Y", label: "Y", cat: "Single-qubit", color: "#a855f7", ctrls: 0, tgts: 1, params: [] },
  { type: "Z", label: "Z", cat: "Single-qubit", color: "#a855f7", ctrls: 0, tgts: 1, params: [] },
  { type: "S", label: "S", cat: "Single-qubit", color: "#0ea5e9", ctrls: 0, tgts: 1, params: [] },
  { type: "Sdg", label: "S†", cat: "Single-qubit", color: "#0ea5e9", ctrls: 0, tgts: 1, params: [] },
  { type: "T", label: "T", cat: "Single-qubit", color: "#0ea5e9", ctrls: 0, tgts: 1, params: [] },
  { type: "Tdg", label: "T†", cat: "Single-qubit", color: "#0ea5e9", ctrls: 0, tgts: 1, params: [] },
  { type: "SX", label: "√X", cat: "Single-qubit", color: "#0ea5e9", ctrls: 0, tgts: 1, params: [] },
  { type: "SXdg", label: "√X†", cat: "Single-qubit", color: "#0ea5e9", ctrls: 0, tgts: 1, params: [] },
  { type: "ID", label: "I", cat: "Single-qubit", color: "#94a3b8", ctrls: 0, tgts: 1, params: [] },
  // Parametric single-qubit
  { type: "P", label: "P(λ)", cat: "Parametric", color: "#14b8a6", ctrls: 0, tgts: 1, params: [{ name: "λ", def: PI / 2 }] },
  { type: "RX", label: "RX(θ)", cat: "Parametric", color: "#14b8a6", ctrls: 0, tgts: 1, params: [{ name: "θ", def: PI / 2 }] },
  { type: "RY", label: "RY(θ)", cat: "Parametric", color: "#14b8a6", ctrls: 0, tgts: 1, params: [{ name: "θ", def: PI / 2 }] },
  { type: "RZ", label: "RZ(θ)", cat: "Parametric", color: "#14b8a6", ctrls: 0, tgts: 1, params: [{ name: "θ", def: PI / 2 }] },
  { type: "U", label: "U", cat: "Parametric", color: "#14b8a6", ctrls: 0, tgts: 1, params: [{ name: "θ", def: PI / 2 }, { name: "φ", def: 0 }, { name: "λ", def: 0 }] },
  // Controlled two-qubit
  { type: "CX", label: "CX", cat: "Controlled", color: "#ec4899", ctrls: 1, tgts: 1, params: [] },
  { type: "CY", label: "CY", cat: "Controlled", color: "#ec4899", ctrls: 1, tgts: 1, params: [] },
  { type: "CZ", label: "CZ", cat: "Controlled", color: "#ec4899", ctrls: 1, tgts: 1, params: [] },
  { type: "CH", label: "CH", cat: "Controlled", color: "#ec4899", ctrls: 1, tgts: 1, params: [] },
  { type: "CP", label: "CP(λ)", cat: "Controlled", color: "#ec4899", ctrls: 1, tgts: 1, params: [{ name: "λ", def: PI / 2 }] },
  { type: "CRX", label: "CRX(θ)", cat: "Controlled", color: "#ec4899", ctrls: 1, tgts: 1, params: [{ name: "θ", def: PI / 2 }] },
  { type: "CRZ", label: "CRZ(θ)", cat: "Controlled", color: "#ec4899", ctrls: 1, tgts: 1, params: [{ name: "θ", def: PI / 2 }] },
  // Two-qubit non-controlled
  { type: "SWAP", label: "SWAP", cat: "Multi-qubit", color: "#f97316", ctrls: 0, tgts: 2, params: [] },
  { type: "RXX", label: "RXX(θ)", cat: "Multi-qubit", color: "#f97316", ctrls: 0, tgts: 2, params: [{ name: "θ", def: PI / 2 }] },
  { type: "RZZ", label: "RZZ(θ)", cat: "Multi-qubit", color: "#f97316", ctrls: 0, tgts: 2, params: [{ name: "θ", def: PI / 2 }] },
  // Three-qubit
  { type: "CCX", label: "CCX", cat: "Multi-qubit", color: "#f59e0b", ctrls: 2, tgts: 1, params: [] },
  { type: "CSWAP", label: "CSWAP", cat: "Multi-qubit", color: "#f59e0b", ctrls: 1, tgts: 2, params: [] },
  // Non-unitary / structural
  { type: "Reset", label: "|0⟩", cat: "Operations", color: "#64748b", ctrls: 0, tgts: 1, params: [] },
  { type: "Measure", label: "M", cat: "Operations", color: "#475569", ctrls: 0, tgts: 1, params: [] },
];
const DEF: Record<string, GateDef> = Object.fromEntries(PALETTE.map((g) => [g.type, g]));

/* ── Qiskit code generation ── */
function fmtPi(r: number): string {
  if (Math.abs(r) < 1e-9) return "0";
  for (const den of [1, 2, 3, 4, 6, 8, 12]) {
    const num = (r * den) / PI;
    if (Math.abs(num - Math.round(num)) < 1e-6) {
      let nn = Math.round(num), dd = den;
      const g = gcd(Math.abs(nn), dd); nn /= g; dd /= g;
      const sign = nn < 0 ? "-" : ""; nn = Math.abs(nn);
      const numPart = nn === 1 ? "np.pi" : `${nn}*np.pi`;
      return dd === 1 ? `${sign}${numPart}` : `${sign}${numPart}/${dd}`;
    }
  }
  return r.toFixed(5);
}
function gcd(a: number, b: number): number { return b === 0 ? (a || 1) : gcd(b, a % b); }

function genQiskit(ops: Op[], n: number): string {
  const sorted = [...ops].sort((a, b) => a.col - b.col);
  const hasMeasure = sorted.some((o) => o.type === "Measure");
  let code = "from qiskit import QuantumCircuit\nimport numpy as np\n\n";
  code += hasMeasure ? `qc = QuantumCircuit(${n}, ${n})\n` : `qc = QuantumCircuit(${n})\n`;
  for (const o of sorted) {
    const t = o.targets, c = o.controls, p = o.params.map(fmtPi);
    switch (o.type) {
      case "H": case "X": case "Y": case "Z": case "S": case "T":
        code += `qc.${o.type.toLowerCase()}(${t[0]})\n`; break;
      case "Sdg": code += `qc.sdg(${t[0]})\n`; break;
      case "Tdg": code += `qc.tdg(${t[0]})\n`; break;
      case "SX": code += `qc.sx(${t[0]})\n`; break;
      case "SXdg": code += `qc.sxdg(${t[0]})\n`; break;
      case "ID": code += `qc.id(${t[0]})\n`; break;
      case "P": code += `qc.p(${p[0]}, ${t[0]})\n`; break;
      case "RX": code += `qc.rx(${p[0]}, ${t[0]})\n`; break;
      case "RY": code += `qc.ry(${p[0]}, ${t[0]})\n`; break;
      case "RZ": code += `qc.rz(${p[0]}, ${t[0]})\n`; break;
      case "U": code += `qc.u(${p[0]}, ${p[1]}, ${p[2]}, ${t[0]})\n`; break;
      case "CX": code += `qc.cx(${c[0]}, ${t[0]})\n`; break;
      case "CY": code += `qc.cy(${c[0]}, ${t[0]})\n`; break;
      case "CZ": code += `qc.cz(${c[0]}, ${t[0]})\n`; break;
      case "CH": code += `qc.ch(${c[0]}, ${t[0]})\n`; break;
      case "CP": code += `qc.cp(${p[0]}, ${c[0]}, ${t[0]})\n`; break;
      case "CRX": code += `qc.crx(${p[0]}, ${c[0]}, ${t[0]})\n`; break;
      case "CRZ": code += `qc.crz(${p[0]}, ${c[0]}, ${t[0]})\n`; break;
      case "SWAP": code += `qc.swap(${t[0]}, ${t[1]})\n`; break;
      case "RXX": code += `qc.rxx(${p[0]}, ${t[0]}, ${t[1]})\n`; break;
      case "RZZ": code += `qc.rzz(${p[0]}, ${t[0]}, ${t[1]})\n`; break;
      case "CCX": code += `qc.ccx(${c[0]}, ${c[1]}, ${t[0]})\n`; break;
      case "CSWAP": code += `qc.cswap(${c[0]}, ${t[0]}, ${t[1]})\n`; break;
      case "Reset": code += `qc.reset(${t[0]})\n`; break;
      case "Measure": code += `qc.measure(${t[0]}, ${t[0]})\n`; break;
      case "Barrier": code += `qc.barrier()\n`; break;
    }
  }
  return code;
}

/* ── Layout geometry ── */
const CELL = 56, LEFT = 64, TOPP = 8;
const rowY = (q: number) => TOPP + q * CELL + CELL / 2;
const colX = (col: number) => LEFT + col * CELL + CELL / 2;

let UIDC = 0;
const uid = () => `op${UIDC++}`;

/* ════════════════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════════════════ */
export default function QuantumSandbox() {
  const [introOpen, setIntroOpen] = useState(true);
  const [numQubits, setNumQubits] = useState(3);
  const [ops, setOps] = useState<Op[]>([]);
  const [armed, setArmed] = useState<string | null>(null); // palette gate armed for click-place
  const [selected, setSelected] = useState<string | null>(null);
  const [showPhaseLabels, setShowPhaseLabels] = useState(false);
  const qsphereRef = useRef<HTMLCanvasElement>(null);

  const maxCol = ops.reduce((m, o) => Math.max(m, o.col), -1);
  const numCols = Math.max(10, maxCol + 3);

  const state = useMemo(() => simulate(ops, numQubits), [ops, numQubits]);
  const qiskit = useMemo(() => genQiskit(ops, numQubits), [ops, numQubits]);

  const cellOccupied = useCallback((q: number, col: number, ignoreUid?: string) =>
    ops.some((o) => o.col === col && o.uid !== ignoreUid && involved(o).includes(q)), [ops]);

  /* Build an op when a gate is dropped/placed on (q, col). Auto-assigns
     controls/extra targets to nearby free wires. Returns null if it can't fit. */
  const buildOp = useCallback((type: string, q: number, col: number): Op | null => {
    const def = DEF[type];
    const need = def.ctrls + def.tgts;
    if (need > numQubits) return null;
    // candidate wires: q first, then nearest neighbours
    const order: number[] = [q];
    for (let d = 1; d < numQubits; d++) {
      if (q - d >= 0) order.push(q - d);
      if (q + d < numQubits) order.push(q + d);
    }
    const free = order.filter((w) => !cellOccupied(w, col));
    if (free.length < need) return null;
    const wires = free.slice(0, need);
    let targets: number[] = [], controls: number[] = [];
    if (def.type === "CSWAP") { controls = [wires[0]]; targets = [wires[1], wires[2]]; }
    else if (def.ctrls > 0) { targets = [wires[0]]; controls = wires.slice(1, 1 + def.ctrls); }
    else { targets = wires.slice(0, def.tgts); }
    return { uid: uid(), type, col, targets, controls, params: def.params.map((p) => p.def) };
  }, [numQubits, cellOccupied]);

  const placeGate = useCallback((type: string, q: number, col: number) => {
    const op = buildOp(type, q, col);
    if (op) { setOps((prev) => [...prev, op]); setSelected(op.uid); }
  }, [buildOp]);

  const moveOp = useCallback((u: string, q: number, col: number) => {
    setOps((prev) => {
      const op = prev.find((o) => o.uid === u);
      if (!op) return prev;
      const delta = q - op.targets[0];
      const newTargets = op.targets.map((t) => t + delta);
      const newControls = op.controls.map((c) => c + delta);
      const all = [...newTargets, ...newControls];
      if (all.some((w) => w < 0 || w >= numQubits)) return prev;
      // collision check against other ops in target col
      const clash = prev.some((o) => o.uid !== u && o.col === col && involved(o).some((w) => all.includes(w)));
      if (clash) return prev;
      return prev.map((o) => o.uid === u ? { ...o, col, targets: newTargets, controls: newControls } : o);
    });
  }, [numQubits]);

  const deleteOp = useCallback((u: string) => {
    setOps((prev) => prev.filter((o) => o.uid !== u));
    setSelected((s) => (s === u ? null : s));
  }, []);

  const onCellDrop = (q: number, col: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;
    try {
      const pl = JSON.parse(data);
      if (pl.newGate) placeGate(pl.newGate, q, col);
      else if (pl.move) moveOp(pl.move, q, col);
    } catch { /* ignore */ }
  };

  const onCellClick = (q: number, col: number) => {
    if (armed && !cellOccupied(q, col)) { placeGate(armed, q, col); }
  };

  const addQubit = () => { if (numQubits < 8) setNumQubits((n) => n + 1); };
  const removeQubit = () => {
    if (numQubits <= 1) return;
    const top = numQubits - 1;
    setOps((prev) => prev.filter((o) => !involved(o).includes(top)));
    setNumQubits((n) => n - 1);
  };
  const clearAll = () => { setOps([]); setSelected(null); setArmed(null); };

  const selOp = ops.find((o) => o.uid === selected) || null;

  /* ── Q-sphere rendering ── */
  useEffect(() => {
    const canvas = qsphereRef.current;
    if (!canvas || numQubits > 5) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width, H = canvas.height, ox = W / 2, oy = H / 2, R = Math.min(ox, oy) - 28;
    ctx.clearRect(0, 0, W, H);

    // sphere wireframe
    ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(ox, oy, R, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(ox, oy, R, R * 0.32, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, oy - R); ctx.lineTo(ox, oy + R); ctx.stroke();
    // latitude rings by Hamming weight
    for (let w = 1; w < numQubits; w++) {
      const theta = Math.PI * (w / numQubits);
      const ry = R * Math.cos(theta), rad = R * Math.sin(theta);
      ctx.beginPath(); ctx.ellipse(ox, oy - ry, rad, rad * 0.32, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "#f1f5f9"; ctx.stroke();
    }

    // group basis states by Hamming weight
    const dim = 1 << numQubits;
    const groups: number[][] = Array.from({ length: numQubits + 1 }, () => []);
    for (let i = 0; i < dim; i++) {
      let w = 0; for (let q = 0; q < numQubits; q++) w += (i >> q) & 1;
      groups[w].push(i);
    }
    type Node = { x: number; y: number; depth: number; prob: number; phase: number; label: string };
    const nodes: Node[] = [];
    for (let w = 0; w <= numQubits; w++) {
      const theta = Math.PI * (w / numQubits);   // 0 = north (|0..0⟩)
      const ry = R * Math.cos(theta), rad = R * Math.sin(theta);
      const g = groups[w];
      g.forEach((i, k) => {
        const prob = cabs2(state[i]);
        const phi = g.length === 1 ? 0 : (2 * Math.PI * k) / g.length;
        const x = ox + rad * Math.cos(phi);
        const depth = Math.sin(phi); // front/back
        const y = oy - ry - rad * 0.32 * Math.sin(phi);
        nodes.push({ x, y, depth, prob, phase: cphase(state[i]), label: labelOf(i, numQubits) });
      });
    }
    // draw lines + nodes (back to front)
    nodes.sort((a, b) => a.depth - b.depth);
    for (const nd of nodes) {
      if (nd.prob < 1e-4) continue;
      const hue = ((nd.phase + Math.PI) / (2 * Math.PI)) * 360;
      ctx.strokeStyle = `hsl(${hue},70%,55%)`; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(nd.x, nd.y); ctx.stroke();
      const rr = 3 + Math.sqrt(nd.prob) * 13;
      ctx.beginPath(); ctx.arc(nd.x, nd.y, rr, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${hue},75%,55%)`; ctx.fill();
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = "#0f172a"; ctx.font = "9px ui-monospace, monospace"; ctx.textAlign = "center";
      const txt = showPhaseLabels ? `${(nd.phase * 180 / Math.PI).toFixed(0)}°` : nd.label;
      ctx.fillText(txt, nd.x, nd.y - rr - 3);
    }
  }, [state, numQubits, showPhaseLabels]);

  /* amplitudes for the statevector table */
  const amps = state.map((a, i) => ({ i, label: labelOf(i, numQubits), prob: cabs2(a), phase: cphase(a), amp: a }))
    .filter((a) => a.prob > 1e-6);

  const copyCode = () => navigator.clipboard?.writeText(qiskit);

  const cats = ["Single-qubit", "Parametric", "Controlled", "Multi-qubit", "Operations"];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">⚛</div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quantum Sandbox</h1>
          <p className="text-sm text-slate-500">A drag-and-drop quantum circuit composer with a live Q-sphere and Qiskit code.</p>
        </div>
      </div>

      {/* ── Beginner intro (kept) ── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <button onClick={() => setIntroOpen(!introOpen)}
          className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          {introOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          <Info className="w-4 h-4 text-indigo-500" />
          New to this? How the composer works
        </button>
        {introOpen && (
          <div className="px-4 pb-4 space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-3">
            <p><strong className="text-slate-800">Build a circuit:</strong> drag an operation from the palette onto a qubit wire — or click an operation to arm it, then click a cell. Many operations can share the same column across different wires.</p>
            <p><strong className="text-slate-800">Move &amp; delete:</strong> drag a placed gate to a new cell to move it, or drag it to the trash. Click a gate to select it (and edit its angle).</p>
            <p><strong className="text-slate-800">Q-sphere:</strong> a global view of the state (≤ 5 qubits). Node size ∝ the probability of that basis state; node colour reflects its phase. Toggle labels between basis state and phase angle.</p>
            <p><strong className="text-slate-800">Qiskit code:</strong> the exact Qiskit program for your circuit is generated live. Qubit ordering follows Qiskit (q0 = least-significant bit), so results match IBM Quantum.</p>
          </div>
        )}
      </div>

      {/* ════════ COMPOSER ════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr] gap-4">
        {/* Palette */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 h-fit">
          <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Operations <span className="text-slate-400 font-normal">({PALETTE.length})</span></h3>
          {cats.map((cat) => (
            <div key={cat} className="mb-3">
              <p className="text-[10px] font-semibold text-slate-400 uppercase mb-1">{cat}</p>
              <div className="flex flex-wrap gap-1.5">
                {PALETTE.filter((g) => g.cat === cat).map((g) => (
                  <button key={g.type}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", JSON.stringify({ newGate: g.type }))}
                    onClick={() => setArmed(armed === g.type ? null : g.type)}
                    title={g.label}
                    className={`px-2 h-8 min-w-[34px] rounded-md text-[11px] font-bold text-white cursor-grab active:cursor-grabbing transition-all hover:brightness-110 ${armed === g.type ? "ring-2 ring-offset-1 ring-slate-900" : ""}`}
                    style={{ backgroundColor: g.color }}>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {armed && <p className="text-[10px] text-indigo-600 mt-1">Click a cell to place <b>{DEF[armed].label}</b> · click the gate again to cancel</p>}
        </div>

        {/* Circuit + outputs */}
        <div className="space-y-4 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Qubits: {numQubits}</span>
            <button onClick={addQubit} disabled={numQubits >= 8}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 disabled:opacity-40">
              <Plus className="w-3 h-3" /> Add qubit
            </button>
            <button onClick={removeQubit} disabled={numQubits <= 1}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 disabled:opacity-40">
              <Minus className="w-3 h-3" /> Remove qubit
            </button>
            <button onClick={clearAll}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-xs font-medium hover:bg-rose-100">
              <RotateCcw className="w-3 h-3" /> Clear
            </button>
            {/* Trash drop zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); try { const pl = JSON.parse(e.dataTransfer.getData("text/plain")); if (pl.move) deleteOp(pl.move); } catch { } }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-dashed border-slate-300 text-slate-400 text-xs ml-auto">
              <Trash2 className="w-3 h-3" /> drag here to delete
            </div>
          </div>

          {/* Circuit grid */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 overflow-x-auto">
            <div className="relative" style={{ width: LEFT + numCols * CELL, height: TOPP * 2 + numQubits * CELL }}>
              {/* wires */}
              {Array.from({ length: numQubits }, (_, q) => (
                <div key={q}>
                  <div className="absolute text-[11px] font-mono text-slate-500" style={{ left: 4, top: rowY(q) - 20 }}>q[{q}]</div>
                  <div className="absolute text-[10px] font-mono text-slate-400" style={{ left: 8, top: rowY(q) + 4 }}>|0⟩</div>
                  <div className="absolute bg-slate-300" style={{ left: LEFT, top: rowY(q), width: numCols * CELL, height: 1 }} />
                </div>
              ))}
              {/* drop cells */}
              {Array.from({ length: numQubits }, (_, q) =>
                Array.from({ length: numCols }, (_, col) => (
                  <div key={`${q}-${col}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onCellDrop(q, col)}
                    onClick={() => onCellClick(q, col)}
                    className={`absolute ${armed && !cellOccupied(q, col) ? "hover:bg-indigo-50 cursor-pointer" : ""}`}
                    style={{ left: colX(col) - CELL / 2, top: rowY(q) - CELL / 2, width: CELL, height: CELL }} />
                ))
              )}
              {/* ops */}
              {ops.map((op) => {
                const wires = involved(op);
                const minQ = Math.min(...wires), maxQ = Math.max(...wires);
                const def = DEF[op.type];
                const isSel = op.uid === selected;
                return (
                  <div key={op.uid}>
                    {/* vertical connector */}
                    {maxQ !== minQ && (
                      <div className="absolute" style={{ left: colX(op.col) - 1, top: rowY(minQ), width: 2, height: rowY(maxQ) - rowY(minQ), background: def.color }} />
                    )}
                    {/* control dots */}
                    {op.controls.map((c) => (
                      <div key={c} className="absolute rounded-full" style={{ left: colX(op.col) - 6, top: rowY(c) - 6, width: 12, height: 12, background: def.color }} />
                    ))}
                    {/* targets */}
                    {op.targets.map((t, ti) => {
                      const isX = (op.type === "CX" || op.type === "CCX");
                      return (
                        <div key={t}
                          draggable
                          onDragStart={(e) => e.dataTransfer.setData("text/plain", JSON.stringify({ move: op.uid }))}
                          onClick={() => setSelected(op.uid)}
                          title={`${def.label} — click to select, drag to move`}
                          className={`absolute flex items-center justify-center rounded-md text-white text-[11px] font-bold cursor-grab active:cursor-grabbing ${isSel ? "ring-2 ring-offset-1 ring-slate-900" : ""}`}
                          style={{
                            left: colX(op.col) - (isX ? 13 : 17), top: rowY(t) - (isX ? 13 : 13),
                            width: isX ? 26 : 34, height: 26, borderRadius: isX ? 13 : 6,
                            background: (op.type === "SWAP" || op.type === "CSWAP") ? "transparent" : def.color,
                            color: (op.type === "SWAP" || op.type === "CSWAP") ? def.color : "#fff",
                            border: (op.type === "SWAP" || op.type === "CSWAP") ? "none" : undefined,
                          }}>
                          {op.type === "SWAP" || op.type === "CSWAP" ? <span style={{ fontSize: 16 }}>✕</span>
                            : isX ? <span style={{ fontSize: 16, lineHeight: 1 }}>⊕</span>
                            : (def.label.replace(/\(.*\)/, ""))}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected-op editor */}
          {selOp && (
            <div className="bg-white rounded-xl border border-slate-200 p-3 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-slate-700">{DEF[selOp.type].label}</span>
              <span className="text-[11px] text-slate-400 font-mono">
                {selOp.controls.length > 0 && `ctrl q[${selOp.controls.join(",")}] · `}target q[{selOp.targets.join(",")}]
              </span>
              {DEF[selOp.type].params.map((pd, pi) => (
                <label key={pi} className="flex items-center gap-1 text-xs text-slate-600">
                  {pd.name} =
                  <input type="number" step="0.0001" value={selOp.params[pi].toFixed(4)}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      if (Number.isNaN(v)) return;
                      setOps((prev) => prev.map((o) => o.uid === selOp.uid ? { ...o, params: o.params.map((x, k) => k === pi ? v : x) } : o));
                    }}
                    className="w-20 px-1.5 py-0.5 rounded border border-slate-300 font-mono text-xs" />
                  <span className="text-slate-400">({fmtPi(selOp.params[pi]).replace(/np\./g, "")})</span>
                </label>
              ))}
              <button onClick={() => deleteOp(selOp.uid)}
                className="ml-auto inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-50 text-rose-600 text-xs font-medium hover:bg-rose-100">
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          )}

          {/* Outputs: Q-sphere + statevector + code */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Q-sphere */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Q-sphere</h3>
                <button onClick={() => setShowPhaseLabels((v) => !v)}
                  className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-slate-200">
                  {showPhaseLabels ? "Show state labels" : "Show phase angles"}
                </button>
              </div>
              {numQubits <= 5 ? (
                <>
                  <div className="flex justify-center">
                    <canvas ref={qsphereRef} width={300} height={300} className="max-w-full" />
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-3 text-[10px] text-slate-400">
                    <span>node size ∝ probability</span>
                    <span className="inline-flex items-center gap-1">colour = phase
                      <span className="inline-block w-16 h-2 rounded" style={{ background: "linear-gradient(90deg,hsl(0,75%,55%),hsl(120,75%,55%),hsl(240,75%,55%),hsl(360,75%,55%))" }} />
                    </span>
                  </div>
                </>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-center text-sm text-slate-400 px-6">
                  The Q-sphere is limited to 5 qubits. Remove qubits to view it, or read the statevector table.
                </div>
              )}
            </div>

            {/* Statevector */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Statevector</h3>
              <p className="text-[10px] text-slate-400 mb-2">Computational basis (q[{numQubits - 1}]…q[0]). Bar = probability.</p>
              <div className="space-y-1 max-h-[240px] overflow-y-auto pr-1">
                {amps.length === 0 && <p className="text-xs text-slate-400">All amplitude is in |{"0".repeat(numQubits)}⟩.</p>}
                {amps.map(({ i, label, prob, phase }) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-slate-700 w-20 shrink-0">|{label}⟩</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div style={{ width: `${prob * 100}%` }} className="h-full bg-indigo-500" />
                    </div>
                    <span className="font-mono text-slate-500 w-14 text-right">{(prob * 100).toFixed(1)}%</span>
                    <span className="font-mono text-slate-400 w-12 text-right">{(phase * 180 / Math.PI).toFixed(0)}°</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Qiskit code */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Qiskit code</h3>
              <button onClick={copyCode} className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700">
                <Copy className="w-3 h-3" /> Copy
              </button>
            </div>
            <pre className="text-[12px] leading-relaxed text-emerald-300 font-mono overflow-x-auto whitespace-pre">{qiskit}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
