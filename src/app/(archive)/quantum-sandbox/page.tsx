"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ChevronDown, ChevronRight, Info, Plus, Minus, Trash2, Copy, RotateCcw, Play, Pause, Film, GraduationCap, Lock, Check, ArrowRight, ArrowLeft } from "lucide-react";

/* ════════════════════════════════════════════════════════════════════
   Complex-number quantum circuit simulator (Qiskit little-endian).
   Qubit 0 is the least-significant bit; basis labels are written
   q[n-1] … q[0] left→right, matching IBM Quantum Composer.
   ════════════════════════════════════════════════════════════════════ */
type C = { re: number; im: number };
const cx = (re: number, im = 0): C => ({ re, im });
const cadd = (a: C, b: C): C => ({ re: a.re + b.re, im: a.im + b.im });
const csub = (a: C, b: C): C => ({ re: a.re - b.re, im: a.im - b.im });
const cmul = (a: C, b: C): C => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const cscale = (a: C, s: number): C => ({ re: a.re * s, im: a.im * s });
const cconj = (a: C): C => ({ re: a.re, im: -a.im });
const cabs2 = (a: C): number => a.re * a.re + a.im * a.im;
const cabs = (a: C): number => Math.sqrt(cabs2(a));
const cphase = (a: C): number => Math.atan2(a.im, a.re);
const cexp = (theta: number): C => ({ re: Math.cos(theta), im: Math.sin(theta) }); // e^{iθ}
const crec = (a: C): C => { const d = cabs2(a) || 1e-30; return { re: a.re / d, im: -a.im / d }; };
function csqrt(z: C): C {
  const r = Math.hypot(z.re, z.im);
  const re = Math.sqrt((r + z.re) / 2);
  let im = Math.sqrt((r - z.re) / 2);
  if (z.im < 0) im = -im;
  return { re, im };
}

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
    case "RX": case "CRX": { const c = Math.cos(th / 2), s = Math.sin(th / 2); return [[cx(c), cx(0, -s)], [cx(0, -s), cx(c)]]; }
    case "RY": case "CRY": { const c = Math.cos(th / 2), s = Math.sin(th / 2); return [[cx(c), cx(-s)], [cx(s), cx(c)]]; }
    case "RZ": case "CRZ": return [[cexp(-th / 2), cx(0)], [cx(0), cexp(th / 2)]];
    case "U": { const c = Math.cos(th / 2), s = Math.sin(th / 2); return [[cx(c), cmul(cexp(lam), cx(-s))], [cmul(cexp(ph), cx(s)), cmul(cexp(ph + lam), cx(c))]]; }
    default: return null;
  }
}

/* Fractional power M^f of a 2×2 (unitary) matrix, via spectral projectors.
   Gives the physically-correct geodesic interpolation of any single-qubit gate. */
function matPow2(M: C[][], f: number): C[][] {
  if (f >= 0.99999) return M;
  const tr = cadd(M[0][0], M[1][1]);
  const det = csub(cmul(M[0][0], M[1][1]), cmul(M[0][1], M[1][0]));
  const disc = csub(cmul(tr, tr), cscale(det, 4));
  const sq = csqrt(disc);
  const l1 = cscale(cadd(tr, sq), 0.5);
  const l2 = cscale(csub(tr, sq), 0.5);
  const powl = (l: C): C => { const ang = Math.atan2(l.im, l.re); const mag = Math.pow(Math.hypot(l.re, l.im), f); return cscale(cexp(ang * f), mag); };
  const diff = csub(l1, l2);
  const I: C[][] = [[cx(1), cx(0)], [cx(0), cx(1)]];
  if (cabs(diff) < 1e-9) { const lf = powl(l1); return [[lf, cx(0)], [cx(0), lf]]; }
  const l1f = powl(l1), l2f = powl(l2);
  const inv = crec(diff);
  // M^f = l1f/(l1-l2) (M - l2 I) + l2f/(l2-l1) (M - l1 I)
  const a = cmul(l1f, inv);          // coeff for (M - l2 I)
  const b = cmul(l2f, cscale(inv, -1)); // coeff for (M - l1 I)
  const out: C[][] = [[cx(0), cx(0)], [cx(0), cx(0)]];
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
    const term1 = cmul(a, csub(M[i][j], cmul(l2, I[i][j])));
    const term2 = cmul(b, csub(M[i][j], cmul(l1, I[i][j])));
    out[i][j] = cadd(term1, term2);
  }
  return out;
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
    if ((i & cmask) !== cmask) continue;
    if (((i >> target) & 1) !== 0) continue;
    const j = i ^ (1 << target);
    const a = state[i], b = state[j];
    r[i] = cadd(cmul(M[0][0], a), cmul(M[0][1], b));
    r[j] = cadd(cmul(M[1][0], a), cmul(M[1][1], b));
  }
  return r;
}
/* Fractional SWAP on {|01⟩,|10⟩} subspace (geodesic): SWAP^f. */
function applyFracSwap(state: C[], a: number, b: number, f: number, controls: number[] = []): C[] {
  const r = state.slice();
  const cmask = controls.reduce((m, c) => m | (1 << c), 0);
  const ph = cexp(Math.PI * f);
  const diag = cscale(cadd(cx(1), ph), 0.5);   // (1+e^{iπf})/2
  const off = cscale(csub(cx(1), ph), 0.5);    // (1-e^{iπf})/2
  for (let i = 0; i < state.length; i++) {
    if ((i & cmask) !== cmask) continue;
    if (((i >> a) & 1) === 0 && ((i >> b) & 1) === 1) {
      const j = i ^ (1 << a) ^ (1 << b);
      const vi = state[i], vj = state[j];
      r[i] = cadd(cmul(diag, vi), cmul(off, vj));
      r[j] = cadd(cmul(off, vi), cmul(diag, vj));
    }
  }
  return r;
}
function applyRZZ(state: C[], a: number, b: number, theta: number): C[] {
  return state.map((amp, i) => {
    const za = ((i >> a) & 1) ? -1 : 1, zb = ((i >> b) & 1) ? -1 : 1;
    return cmul(amp, cexp(-theta / 2 * za * zb));
  });
}
function applyRXX(state: C[], a: number, b: number, theta: number): C[] {
  const r = state.slice();
  const c = Math.cos(theta / 2), s = Math.sin(theta / 2);
  const seen = new Array(state.length).fill(false);
  for (let i = 0; i < state.length; i++) {
    if (seen[i]) continue;
    const j = i ^ (1 << a) ^ (1 << b);
    seen[i] = seen[j] = true;
    const ai = state[i], aj = state[j];
    r[i] = cadd(cmul(cx(c), ai), cmul(cx(0, -s), aj));
    r[j] = cadd(cmul(cx(c), aj), cmul(cx(0, -s), ai));
  }
  return r;
}

interface Op { uid: string; type: string; col: number; targets: number[]; controls: number[]; params: number[]; }
function involved(op: Op): number[] { return [...op.controls, ...op.targets]; }

/* Apply an op at fraction f∈[0,1] of its action (f=1 ⇒ full gate). */
function applyOpFractional(state: C[], op: Op, f: number): C[] {
  if (f <= 1e-6) return state;
  const t = op.targets, c = op.controls, p = op.params;
  switch (op.type) {
    case "Measure": case "Reset": case "Barrier": return state;
    case "SWAP": return applyFracSwap(state, t[0], t[1], f, c);
    case "CSWAP": return applyFracSwap(state, t[0], t[1], f, c);
    case "RZZ": return applyRZZ(state, t[0], t[1], (p[0] ?? 0) * f);
    case "RXX": return applyRXX(state, t[0], t[1], (p[0] ?? 0) * f);
    default: {
      const M = baseMatrix(op.type, p);
      if (!M) return state;
      return applyControlledSingle(state, c, t[0], matPow2(M, f));
    }
  }
}
function applyOp(state: C[], op: Op): C[] { return applyOpFractional(state, op, 1); }

function labelOf(i: number, n: number): string { let s = ""; for (let q = n - 1; q >= 0; q--) s += ((i >> q) & 1); return s; }
function measureSample(state: C[]): { outcome: number } {
  const probs = state.map(cabs2); const total = probs.reduce((s, p) => s + p, 0) || 1;
  const r = Math.random() * total; let cum = 0;
  for (let i = 0; i < state.length; i++) { cum += probs[i]; if (r < cum) return { outcome: i }; }
  return { outcome: state.length - 1 };
}

/* ════════ Entanglement math (validated: product C=0, Bell C=1, GHZ pairwise C=0) ════════ */
function reduced1(state: C[], q: number): C[][] {
  const rho = [[cx(0), cx(0)], [cx(0), cx(0)]];
  const mask = ~(1 << q);
  for (let i = 0; i < state.length; i++) for (let j = 0; j < state.length; j++) {
    if ((i & mask) !== (j & mask)) continue;
    const a = (i >> q) & 1, b = (j >> q) & 1;
    rho[a][b] = cadd(rho[a][b], cmul(state[i], cconj(state[j])));
  }
  return rho;
}
function blochOf(rho: C[][]) {
  const x = 2 * rho[0][1].re, y = -2 * rho[0][1].im, z = rho[0][0].re - rho[1][1].re;
  return { x, y, z, r: Math.min(1, Math.sqrt(x * x + y * y + z * z)) };
}
function entropy1(rho: C[][]): number {
  const r = blochOf(rho).r; const l1 = (1 + r) / 2, l2 = (1 - r) / 2;
  const h = (x: number) => (x > 1e-12 ? -x * Math.log2(x) : 0);
  return h(l1) + h(l2);
}
function reduced2(state: C[], qa: number, qb: number): C[][] {
  const R = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => cx(0)));
  const mask = ~((1 << qa) | (1 << qb));
  for (let i = 0; i < state.length; i++) for (let j = 0; j < state.length; j++) {
    if ((i & mask) !== (j & mask)) continue;
    const r = (((i >> qa) & 1) << 1) | ((i >> qb) & 1);
    const c = (((j >> qa) & 1) << 1) | ((j >> qb) & 1);
    R[r][c] = cadd(R[r][c], cmul(state[i], cconj(state[j])));
  }
  return R;
}
const N4 = 4;
function mm4(A: C[][], B: C[][]): C[][] { const R = Array.from({ length: N4 }, () => Array.from({ length: N4 }, () => cx(0))); for (let i = 0; i < N4; i++) for (let j = 0; j < N4; j++) { let s = cx(0); for (let k = 0; k < N4; k++) s = cadd(s, cmul(A[i][k], B[k][j])); R[i][j] = s; } return R; }
function id4(): C[][] { const R = Array.from({ length: N4 }, () => Array.from({ length: N4 }, () => cx(0))); for (let i = 0; i < N4; i++) R[i][i] = cx(1); return R; }
function inv4(A: C[][]): C[][] {
  const a = A.map((r) => r.map((c) => ({ ...c }))); const I = id4();
  for (let col = 0; col < N4; col++) {
    let piv = col, best = cabs2(a[col][col]);
    for (let r = col + 1; r < N4; r++) { const m = cabs2(a[r][col]); if (m > best) { best = m; piv = r; } }
    if (piv !== col) { [a[col], a[piv]] = [a[piv], a[col]];[I[col], I[piv]] = [I[piv], I[col]]; }
    const invd = crec(a[col][col]);
    for (let j = 0; j < N4; j++) { a[col][j] = cmul(a[col][j], invd); I[col][j] = cmul(I[col][j], invd); }
    for (let r = 0; r < N4; r++) { if (r === col) continue; const f = a[r][col]; for (let j = 0; j < N4; j++) { a[r][j] = csub(a[r][j], cmul(f, a[col][j])); I[r][j] = csub(I[r][j], cmul(f, I[col][j])); } }
  }
  return I;
}
function sqrtPSD4(A: C[][]): C[][] {
  let Y = A.map((r) => r.map((c) => ({ ...c }))); for (let i = 0; i < N4; i++) Y[i][i] = cadd(Y[i][i], cx(1e-12));
  let Z = id4();
  for (let k = 0; k < 40; k++) {
    const Yi = inv4(Y), Zi = inv4(Z);
    const Yn = Array.from({ length: N4 }, (_, i) => Array.from({ length: N4 }, (_, j) => cscale(cadd(Y[i][j], Zi[i][j]), 0.5)));
    const Zn = Array.from({ length: N4 }, (_, i) => Array.from({ length: N4 }, (_, j) => cscale(cadd(Z[i][j], Yi[i][j]), 0.5)));
    Y = Yn; Z = Zn;
  }
  return Y;
}
function jacobiEigReal(M: number[][]): number[] {
  const n = M.length; const a = M.map((r) => r.slice());
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0; for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += a[p][q] * a[p][q];
    if (off < 1e-22) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      if (Math.abs(a[p][q]) < 1e-16) continue;
      const th = 0.5 * Math.atan2(2 * a[p][q], a[q][q] - a[p][p]); const c = Math.cos(th), s = Math.sin(th);
      for (let k = 0; k < n; k++) { const akp = a[k][p], akq = a[k][q]; a[k][p] = c * akp - s * akq; a[k][q] = s * akp + c * akq; }
      for (let k = 0; k < n; k++) { const apk = a[p][k], aqk = a[q][k]; a[p][k] = c * apk - s * aqk; a[q][k] = s * apk + c * aqk; }
    }
  }
  return Array.from({ length: n }, (_, i) => a[i][i]);
}
function hermEigvals4(H: C[][]): number[] { // 8×8 real embedding
  const n = N4; const B = Array.from({ length: 2 * n }, () => Array(2 * n).fill(0));
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { B[i][j] = H[i][j].re; B[i + n][j + n] = H[i][j].re; B[i][j + n] = -H[i][j].im; B[i + n][j] = H[i][j].im; }
  const ev = jacobiEigReal(B).sort((a, b) => a - b);
  const out: number[] = []; for (let i = 0; i < 2 * n; i += 2) out.push((ev[i] + ev[i + 1]) / 2);
  return out;
}
const YY = [[0, 0, 0, -1], [0, 0, 1, 0], [0, 1, 0, 0], [-1, 0, 0, 0]];
function concurrence(rho: C[][]): number {
  const cr = rho.map((r) => r.map(cconj));
  const t1 = Array.from({ length: N4 }, (_, i) => Array.from({ length: N4 }, (_, j) => { let s = cx(0); for (let k = 0; k < N4; k++) s = cadd(s, cscale(cr[k][j], YY[i][k])); return s; }));
  const rt = Array.from({ length: N4 }, (_, i) => Array.from({ length: N4 }, (_, j) => { let s = cx(0); for (let k = 0; k < N4; k++) s = cadd(s, cscale(t1[i][k], YY[k][j])); return s; }));
  const sr = sqrtPSD4(rho);
  const Rh = mm4(mm4(sr, rt), sr);
  const H = Array.from({ length: N4 }, (_, i) => Array.from({ length: N4 }, (_, j) => cscale(cadd(Rh[i][j], cconj(Rh[j][i])), 0.5)));
  const mu = hermEigvals4(H).map((x) => Math.sqrt(Math.max(x, 0))).sort((a, b) => b - a);
  return Math.max(0, mu[0] - mu[1] - mu[2] - mu[3]);
}

interface EntData { blochs: { x: number; y: number; z: number; r: number; S: number }[]; conc: number[][]; label: string; }
function analyzeEntanglement(state: C[], n: number): EntData {
  const blochs = Array.from({ length: n }, (_, q) => { const rho = reduced1(state, q); const b = blochOf(rho); return { ...b, S: entropy1(rho) }; });
  const conc = Array.from({ length: n }, () => Array(n).fill(0));
  if (n <= 5) for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) { const cval = concurrence(reduced2(state, a, b)); conc[a][b] = cval; conc[b][a] = cval; }
  // classify
  const anyMixed = blochs.some((b) => b.r < 0.98);
  let label = "Product state — no entanglement";
  if (anyMixed) {
    let maxC = 0, mi = -1, mj = -1;
    for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) if (conc[a][b] > maxC) { maxC = conc[a][b]; mi = a; mj = b; }
    if (maxC > 0.9) label = `Bell-type entanglement on q${mi}–q${mj}`;
    else if (maxC < 0.1) label = "Multipartite (GHZ-type) — qubits individually mixed, no pairwise bonds";
    else label = "Entangled (mixed) state";
  }
  return { blochs, conc, label };
}

/* ── Palette ── */
interface GateDef { type: string; label: string; cat: string; color: string; ctrls: number; tgts: number; params: { name: string; def: number }[]; }
const PI = Math.PI;
const PALETTE: GateDef[] = [
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
  { type: "P", label: "P(λ)", cat: "Parametric", color: "#14b8a6", ctrls: 0, tgts: 1, params: [{ name: "λ", def: PI / 2 }] },
  { type: "RX", label: "RX(θ)", cat: "Parametric", color: "#14b8a6", ctrls: 0, tgts: 1, params: [{ name: "θ", def: PI / 2 }] },
  { type: "RY", label: "RY(θ)", cat: "Parametric", color: "#14b8a6", ctrls: 0, tgts: 1, params: [{ name: "θ", def: PI / 2 }] },
  { type: "RZ", label: "RZ(θ)", cat: "Parametric", color: "#14b8a6", ctrls: 0, tgts: 1, params: [{ name: "θ", def: PI / 2 }] },
  { type: "U", label: "U", cat: "Parametric", color: "#14b8a6", ctrls: 0, tgts: 1, params: [{ name: "θ", def: PI / 2 }, { name: "φ", def: 0 }, { name: "λ", def: 0 }] },
  { type: "CX", label: "CX", cat: "Controlled", color: "#ec4899", ctrls: 1, tgts: 1, params: [] },
  { type: "CY", label: "CY", cat: "Controlled", color: "#ec4899", ctrls: 1, tgts: 1, params: [] },
  { type: "CZ", label: "CZ", cat: "Controlled", color: "#ec4899", ctrls: 1, tgts: 1, params: [] },
  { type: "CH", label: "CH", cat: "Controlled", color: "#ec4899", ctrls: 1, tgts: 1, params: [] },
  { type: "CP", label: "CP(λ)", cat: "Controlled", color: "#ec4899", ctrls: 1, tgts: 1, params: [{ name: "λ", def: PI / 2 }] },
  { type: "CRX", label: "CRX(θ)", cat: "Controlled", color: "#ec4899", ctrls: 1, tgts: 1, params: [{ name: "θ", def: PI / 2 }] },
  { type: "CRZ", label: "CRZ(θ)", cat: "Controlled", color: "#ec4899", ctrls: 1, tgts: 1, params: [{ name: "θ", def: PI / 2 }] },
  { type: "SWAP", label: "SWAP", cat: "Multi-qubit", color: "#f97316", ctrls: 0, tgts: 2, params: [] },
  { type: "RXX", label: "RXX(θ)", cat: "Multi-qubit", color: "#f97316", ctrls: 0, tgts: 2, params: [{ name: "θ", def: PI / 2 }] },
  { type: "RZZ", label: "RZZ(θ)", cat: "Multi-qubit", color: "#f97316", ctrls: 0, tgts: 2, params: [{ name: "θ", def: PI / 2 }] },
  { type: "CCX", label: "CCX", cat: "Multi-qubit", color: "#f59e0b", ctrls: 2, tgts: 1, params: [] },
  { type: "CSWAP", label: "CSWAP", cat: "Multi-qubit", color: "#f59e0b", ctrls: 1, tgts: 2, params: [] },
  { type: "Reset", label: "|0⟩", cat: "Operations", color: "#64748b", ctrls: 0, tgts: 1, params: [] },
  { type: "Measure", label: "M", cat: "Operations", color: "#475569", ctrls: 0, tgts: 1, params: [] },
];
const DEF: Record<string, GateDef> = Object.fromEntries(PALETTE.map((g) => [g.type, g]));

/* ════════ Tutorial Mode: gate explanation stack (single source of truth) ════════
   Each gate's words describe the SAME rotation the engine applies, so the
   explanation cannot drift from what the simulator actually does. */
interface GateInfo { slogan: string; mechanism: string; whyResult?: string; purpose: string; job: string; breaksModel: boolean; unlock: number; }
const GATE_INFO: Record<string, GateInfo> = {
  X: { slogan: "Sets a qubit to 1 — a bit flip.", mechanism: "A half-turn (180°) about the X-axis: it points the arrow from straight-up to straight-down.", whyResult: "Straight-up (definite 0) becomes straight-down (definite 1), so the probability bar moves fully onto 1.", purpose: "Prepares known inputs and flips bits — the quantum NOT, the setup step of most circuits.", job: "Prepare the starting state", breaksModel: false, unlock: 2 },
  H: { slogan: "Creates superposition — a definite 0 becomes a 50/50 maybe.", mechanism: "A half-turn about the diagonal axis (halfway between vertical and left–right); it swaps the up/down lean with the front/back lean.", whyResult: "A straight-up arrow gets tipped onto the equator, and an equator arrow is 50/50 by the height rule — so the bars split evenly.", purpose: "Opens up quantum parallelism; the first move of almost every algorithm. It also converts hidden phase into measurable outcomes (the H…Z…H trick).", job: "Create superposition", breaksModel: false, unlock: 3 },
  Z: { slogan: "Flips a state's hidden phase (the sign of |1⟩).", mechanism: "A half-turn about the vertical Z-axis — it spins the arrow halfway around the equator.", whyResult: "The odds don't change (the bars stay put); only the phase flips, which is invisible to a direct measurement until later interference.", purpose: "How an algorithm secretly 'marks' an answer; the heart of interference-based search and the QFT.", job: "Write and mark phase", breaksModel: false, unlock: 4 },
  CX: { slogan: "A controlled flip — flips the target only when the control is 1.", mechanism: "Rotates the target's arrow 180° about the left–right axis, but only in the part of the situation where the control qubit is 1.", whyResult: "When the control is itself in superposition, this ties the two qubits together so neither has its own arrow anymore — their individual arrows collapse to the centre. That is entanglement.", purpose: "Entanglement is the resource classical computers can't cheaply fake. CX plus single-qubit gates is universal, and it's the core of Bell/GHZ states, teleportation, the QFT, and error correction.", job: "Entangle and interact", breaksModel: true, unlock: 5 },
  Measure: { slogan: "Reads the qubit — forces it to 0 or 1.", mechanism: "Not a rotation: the arrow snaps to a pole, with the odds set by how far up or down it was leaning.", whyResult: "The superposition collapses to one definite outcome and the in-between information is gone — the only irreversible move.", purpose: "Produces the classical answer; because it can happen mid-circuit it also enables feedback and the syndrome checks error correction depends on.", job: "Read the answer", breaksModel: false, unlock: 1 },
  Y: { slogan: "A combined bit-and-phase flip.", mechanism: "A half-turn (180°) about the Y-axis.", purpose: "Acts like X and Z together; appears in noise models and rotations.", job: "Write and mark phase", breaksModel: false, unlock: 6 },
  S: { slogan: "A quarter phase turn.", mechanism: "90° about the Z-axis (√Z).", purpose: "A precise, small phase for setting up interference.", job: "Write and mark phase", breaksModel: false, unlock: 6 },
  Sdg: { slogan: "An inverse quarter phase turn.", mechanism: "−90° about the Z-axis.", purpose: "Undoes S; precise phase control.", job: "Write and mark phase", breaksModel: false, unlock: 6 },
  T: { slogan: "An eighth phase turn.", mechanism: "45° about the Z-axis.", purpose: "The 'expensive' gate: H, S and CX alone can be imitated classically — T is the ingredient that gives a quantum computer its genuine edge, so it's the costly gate in fault-tolerant hardware.", job: "Write and mark phase", breaksModel: false, unlock: 6 },
  Tdg: { slogan: "An inverse eighth phase turn.", mechanism: "−45° about the Z-axis.", purpose: "Undoes T.", job: "Write and mark phase", breaksModel: false, unlock: 6 },
  SX: { slogan: "Half of an X flip — hardware-native on IBM chips.", mechanism: "90° about the X-axis (√X).", purpose: "A native building block on real hardware; two √X make an X.", job: "Create superposition", breaksModel: false, unlock: 6 },
  SXdg: { slogan: "The inverse half-X.", mechanism: "−90° about the X-axis.", purpose: "Undoes √X.", job: "Create superposition", breaksModel: false, unlock: 6 },
  ID: { slogan: "Do nothing — a deliberate wait.", mechanism: "No rotation at all.", purpose: "Used for timing and to model idle decay on real hardware.", job: "Prepare the starting state", breaksModel: false, unlock: 6 },
  P: { slogan: "The general phase dial.", mechanism: "Rotates by an angle λ you choose about the Z-axis.", purpose: "Sets any phase; generalises Z, S and T.", job: "Write and mark phase", breaksModel: false, unlock: 6 },
  RX: { slogan: "A tunable rotation about the X-axis.", mechanism: "Turns the arrow by an angle θ you choose about X.", purpose: "A trainable knob for VQE, QAOA and quantum ML — angles are parameters you optimise, like network weights.", job: "Tunable rotations", breaksModel: false, unlock: 6 },
  RY: { slogan: "A tunable rotation about the Y-axis.", mechanism: "Turns the arrow by an angle θ about Y (stays real-valued).", purpose: "A trainable knob for variational circuits.", job: "Tunable rotations", breaksModel: false, unlock: 6 },
  RZ: { slogan: "A tunable phase rotation about the Z-axis.", mechanism: "Turns the arrow by θ around the equator.", purpose: "A trainable phase knob for variational circuits.", job: "Tunable rotations", breaksModel: false, unlock: 6 },
  U: { slogan: "The fully general single-qubit rotation.", mechanism: "Any rotation, set by three angles (θ, φ, λ).", purpose: "Can produce any single-qubit gate; the universal single-qubit building block.", job: "Tunable rotations", breaksModel: false, unlock: 6 },
  CY: { slogan: "Controlled-Y — a Y flip only when the control is 1.", mechanism: "Applies Y to the target in the part of the state where the control is 1.", purpose: "A conditional bit-and-phase flip; an entangler.", job: "Entangle and interact", breaksModel: true, unlock: 6 },
  CZ: { slogan: "Controlled-Z — entangles via phase.", mechanism: "Flips the sign of |11⟩ only.", purpose: "Symmetric entangler; underpins cluster states for measurement-based computing.", job: "Entangle and interact", breaksModel: true, unlock: 6 },
  CH: { slogan: "Controlled-H — superposition only when the control is 1.", mechanism: "Applies H to the target where the control is 1.", purpose: "A conditional superposition; an entangler.", job: "Entangle and interact", breaksModel: true, unlock: 6 },
  CP: { slogan: "Controlled phase (λ).", mechanism: "Adds phase λ only when both qubits are 1.", purpose: "The key entangling gate inside the Quantum Fourier Transform.", job: "Entangle and interact", breaksModel: true, unlock: 6 },
  CRX: { slogan: "Controlled X-rotation (θ).", mechanism: "Turns the target by θ about X only when the control is 1.", purpose: "A tunable conditional rotation for variational circuits.", job: "Entangle and interact", breaksModel: true, unlock: 6 },
  CRZ: { slogan: "Controlled Z-rotation (θ).", mechanism: "Turns the target by θ about Z only when the control is 1.", purpose: "A tunable conditional phase for variational circuits.", job: "Entangle and interact", breaksModel: true, unlock: 6 },
  RXX: { slogan: "Dials up a real XX interaction (θ).", mechanism: "Rotates the two qubits together in the X⊗X direction.", purpose: "Native on trapped-ion hardware; the natural way to simulate real molecules.", job: "Entangle and interact", breaksModel: true, unlock: 6 },
  RZZ: { slogan: "Dials up a real ZZ interaction (θ).", mechanism: "Adds a joint phase depending on whether the two qubits agree.", purpose: "Native two-qubit interaction; used in molecular simulation and QAOA.", job: "Entangle and interact", breaksModel: true, unlock: 6 },
  CCX: { slogan: "Toffoli — the reversible AND.", mechanism: "Flips the target only when both controls are 1.", purpose: "Rebuilds ordinary logic reversibly; the oracle inside Grover's search, and quantum adders.", job: "Reversible classical logic", breaksModel: true, unlock: 6 },
  CSWAP: { slogan: "Fredkin — a controlled swap.", mechanism: "Swaps two qubits only when the control is 1.", purpose: "Reversible logic; the swap test in quantum machine learning.", job: "Reversible classical logic", breaksModel: true, unlock: 6 },
  SWAP: { slogan: "Exchanges two qubits.", mechanism: "Moves the state of one wire onto the other and vice-versa.", purpose: "Routes states across a real chip where the qubits that must interact aren't physically adjacent (the QFT ends in swaps).", job: "Move information", breaksModel: false, unlock: 6 },
  Reset: { slogan: "Forces a qubit back to |0⟩.", mechanism: "A non-unitary reset to the top of the sphere.", purpose: "Re-prepares a qubit mid-circuit for reuse.", job: "Prepare the starting state", breaksModel: false, unlock: 6 },
};

/* ── Lessons as data (steps validate against the real circuit) ── */
interface LessonStep { concept: string; action: string; highlight?: string; shots?: boolean; validate: any; explain?: string; }
interface Lesson { id: string; title: string; qubits: number; steps: LessonStep[]; }
const LESSONS: Lesson[] = [
  {
    id: "meet-a-qubit", title: "Meet a qubit", qubits: 1, steps: [
      { concept: "A qubit is an arrow pointing out of a ball (the Bloch sphere). Straight up = a definite 0. It starts here, just like an ordinary bit.", action: "Look at q0 below — its arrow points straight up. Press Next.", validate: null },
      { concept: "Measuring reads the arrow: it snaps to a pole (0 or 1), with odds set by how far up or down it leaned.", action: "Press “Measure 100×” and watch every shot.", shots: true, validate: { ranShots: true }, explain: "Every shot came out 0 — a fresh qubit always measures 0. Measurement forced the arrow to the top pole each time." },
    ],
  },
  {
    id: "the-flip", title: "The flip (X)", qubits: 1, steps: [
      { concept: "Every single-qubit gate just rotates the arrow. X is a half-turn that flips straight-up (0) to straight-down (1).", action: "Drag the highlighted X gate onto the q0 wire.", highlight: "X", validate: { gateOnWire: { gate: "X", qubit: 0 } }, explain: "The arrow flipped to straight-down — q0 is now a definite 1. The probability bar moved fully onto |1⟩." },
      { concept: "Let's confirm by measuring.", action: "Press “Measure 100×”.", shots: true, validate: { ranShots: true }, explain: "Every shot is 1 now. A half-turn about X is exactly the classical NOT." },
    ],
  },
  {
    id: "superposition", title: "Superposition (H)", qubits: 1, steps: [
      { concept: "H tips the arrow onto the equator — a true 50/50 “maybe 0, maybe 1” at the same time.", action: "Drag the highlighted H gate onto q0.", highlight: "H", validate: { gateOnWire: { gate: "H", qubit: 0 } }, explain: "q0 is now 50% likely 0 and 50% likely 1 — both at once, until you measure. The arrow sits on the equator." },
      { concept: "Superposition gives random samples — not clean, exact halves.", action: "Press “Measure 100×” and watch the histogram.", shots: true, validate: { ranShots: true }, explain: "Roughly half 0 and half 1 — but almost never exactly 50/50. The randomness is real; only over many shots does the pattern settle." },
    ],
  },
  {
    id: "phase", title: "The hidden dimension: phase (Z)", qubits: 1, steps: [
      { concept: "Phase is which way the arrow points around the equator. Z flips the hidden phase without changing the odds.", action: "First make a superposition: drag H onto q0.", highlight: "H", validate: { gateOnWire: { gate: "H", qubit: 0 } }, explain: "q0 is on the equator (50/50)." },
      { concept: "Now add Z. Watch the probability bars — they won't move at all.", action: "Drag Z onto q0 (in the next column).", highlight: "Z", validate: { gateOnWire: { gate: "Z", qubit: 0 } }, explain: "The bars didn't budge — Z only spun the arrow around the equator. Phase is invisible to a direct measurement…" },
      { concept: "…but a second H turns that hidden phase into a real, measurable flip. That is interference.", action: "Add another H on q0 (a third gate).", highlight: "H", validate: { gateCount: { gate: "H", count: 2 } }, explain: "H…Z…H turned a 0 into a definite 1 — the invisible phase became a visible outcome. This interference is where quantum speedups come from." },
    ],
  },
  {
    id: "entanglement", title: "Two qubits & entanglement (CX)", qubits: 2, steps: [
      { concept: "Now two qubits. Put q0 into superposition first.", action: "Drag H onto q0.", highlight: "H", validate: { gateOnWire: { gate: "H", qubit: 0 } }, explain: "q0 is 50/50." },
      { concept: "CX links q1 to q0. Watch each qubit's arrow shrink to the centre and a bond appear.", action: "Drag CX so q0 is the control and q1 the target — place it in the column to the right of H.", highlight: "CX", validate: { controlledOn: { gate: "CX", control: 0, target: 1 } }, explain: "Both arrows collapsed to the centre and a pink bond lit up. This is entanglement: neither qubit has its own arrow anymore — that's the model's honest breaking point. The Q-sphere shows only |00⟩ and |11⟩." },
    ],
  },
  {
    id: "first-algorithm", title: "Your first algorithm", qubits: 1, steps: [
      { concept: "A quantum coin-flip: superposition, then read it. Start with H.", action: "Drag H onto q0.", highlight: "H", validate: { gateOnWire: { gate: "H", qubit: 0 } }, explain: "The coin is spinning — a genuine 50/50 superposition." },
      { concept: "Flip the coin by measuring.", action: "Press “Measure 100×”.", shots: true, validate: { ranShots: true }, explain: "A fair, truly-random coin — about half heads, half tails, unpredictable shot to shot. You've built and run your first quantum program. Turn Tutorial Mode off any time to build freely." },
    ],
  },
];

function fmtPi(r: number): string {
  if (Math.abs(r) < 1e-9) return "0";
  for (const den of [1, 2, 3, 4, 6, 8, 12]) {
    const num = (r * den) / PI;
    if (Math.abs(num - Math.round(num)) < 1e-6) {
      let nn = Math.round(num), dd = den; const g = gcd(Math.abs(nn), dd); nn /= g; dd /= g;
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
      case "H": case "X": case "Y": case "Z": case "S": case "T": code += `qc.${o.type.toLowerCase()}(${t[0]})\n`; break;
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
    }
  }
  return code;
}

function captionFor(opsInCol: Op[]): string {
  if (opsInCol.length === 0) return "";
  const names: Record<string, string> = {
    H: "Hadamard → superposition", X: "Pauli-X bit flip", Y: "Pauli-Y", Z: "Pauli-Z phase flip",
    S: "S phase gate", Sdg: "S† phase gate", T: "T gate", Tdg: "T† gate", SX: "√X", SXdg: "√X†", ID: "Identity",
    P: "Phase gate", RX: "X-rotation", RY: "Y-rotation", RZ: "Z-rotation", U: "General rotation",
    CX: "CNOT → entangling", CY: "Controlled-Y", CZ: "Controlled-Z → entangling", CH: "Controlled-H",
    CP: "Controlled phase", CRX: "Controlled X-rotation", CRZ: "Controlled Z-rotation",
    SWAP: "SWAP", RXX: "XX interaction", RZZ: "ZZ interaction", CCX: "Toffoli (CCX)", CSWAP: "Fredkin (CSWAP)",
    Reset: "Reset to |0⟩", Measure: "Measurement",
  };
  if (opsInCol.length === 1) return names[opsInCol[0].type] || opsInCol[0].type;
  return opsInCol.map((o) => o.type).join(", ");
}

/* layout */
const CELL = 56, LEFT = 64, TOPP = 8;
const rowY = (q: number) => TOPP + q * CELL + CELL / 2;
const colX = (col: number) => LEFT + col * CELL + CELL / 2;
let UIDC = 0; const uid = () => `op${UIDC++}`;
const phaseHue = (ph: number) => ((ph + Math.PI) / (2 * Math.PI)) * 360;

/* ════════════════════════════════════════════════════════════════════ */
export default function QuantumSandbox() {
  const [introOpen, setIntroOpen] = useState(true);
  const [numQubits, setNumQubits] = useState(3);
  const [ops, setOps] = useState<Op[]>([]);
  const [armed, setArmed] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [showPhaseLabels, setShowPhaseLabels] = useState(false);
  const qsphereRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLCanvasElement>(null);

  // playback
  const [playhead, setPlayhead] = useState(0); // 0 .. numSteps (continuous)
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);       // columns per second
  const [loop, setLoop] = useState(true);
  const [recording, setRecording] = useState(false);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);

  // tutorial mode
  const [tutorial, setTutorial] = useState(false);
  const [lessonIdx, setLessonIdx] = useState<number | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [shotsResult, setShotsResult] = useState<Record<string, number> | null>(null);
  const [hoverGate, setHoverGate] = useState<string | null>(null);
  const [deeper, setDeeper] = useState(false);

  const maxCol = ops.reduce((m, o) => Math.max(m, o.col), -1);
  const numCols = Math.max(10, maxCol + 3);

  // distinct columns that actually contain ops → the animation timeline
  const columns = useMemo(() => {
    const set = new Set(ops.map((o) => o.col));
    return [...set].sort((a, b) => a - b);
  }, [ops]);
  const numSteps = columns.length;

  // cached state at each column boundary (the timeline)
  const history = useMemo(() => {
    const hist: C[][] = [initialState(numQubits)];
    let s = initialState(numQubits);
    for (const col of columns) {
      const colOps = ops.filter((o) => o.col === col);
      for (const op of colOps) s = applyOp(s, op);
      hist.push(s);
    }
    return hist;
  }, [ops, columns, numQubits]);

  // when the circuit changes, jump playhead to the end (show final state)
  useEffect(() => { setPlayhead(numSteps); setPlaying(false); }, [numSteps, numQubits]);

  // interpolated state at the current playhead
  const displayState = useMemo(() => {
    const i = Math.min(Math.floor(playhead), numSteps);
    if (i >= numSteps) return history[numSteps];
    const frac = playhead - i;
    const colOps = ops.filter((o) => o.col === columns[i]);
    let s = history[i];
    for (const op of colOps) s = applyOpFractional(s, op, frac);
    return s;
  }, [playhead, history, columns, ops, numSteps]);

  const curCaption = useMemo(() => {
    const i = Math.min(Math.floor(playhead), numSteps - 1);
    if (i < 0) return "";
    const colOps = ops.filter((o) => o.col === columns[i]);
    return captionFor(colOps);
  }, [playhead, columns, ops, numSteps]);

  const ent = useMemo(() => analyzeEntanglement(displayState, numQubits), [displayState, numQubits]);
  const qiskit = useMemo(() => genQiskit(ops, numQubits), [ops, numQubits]);

  /* playback loop */
  useEffect(() => {
    if (!playing) return;
    const tick = (ts: number) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000; lastTsRef.current = ts;
      setPlayhead((p) => {
        let np = p + dt * speed;
        if (np >= numSteps) { if (loop) np = 0; else { np = numSteps; setPlaying(false); } }
        return np;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); lastTsRef.current = 0; };
  }, [playing, speed, loop, numSteps]);

  const play = () => { if (numSteps === 0) return; if (playhead >= numSteps) setPlayhead(0); setPlaying((p) => !p); };

  /* ---- placement ---- */
  const cellOccupied = useCallback((q: number, col: number, ignoreUid?: string) =>
    ops.some((o) => o.col === col && o.uid !== ignoreUid && involved(o).includes(q)), [ops]);
  const buildOp = useCallback((type: string, q: number, col: number): Op | null => {
    const def = DEF[type]; const need = def.ctrls + def.tgts;
    if (need > numQubits) return null;
    const order: number[] = [q];
    for (let d = 1; d < numQubits; d++) { if (q - d >= 0) order.push(q - d); if (q + d < numQubits) order.push(q + d); }
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
    const op = buildOp(type, q, col); if (op) { setOps((prev) => [...prev, op]); setSelected(op.uid); }
  }, [buildOp]);
  const moveOp = useCallback((u: string, q: number, col: number) => {
    setOps((prev) => {
      const op = prev.find((o) => o.uid === u); if (!op) return prev;
      const delta = q - op.targets[0];
      const nt = op.targets.map((t) => t + delta), nc = op.controls.map((c) => c + delta);
      const all = [...nt, ...nc];
      if (all.some((w) => w < 0 || w >= numQubits)) return prev;
      if (prev.some((o) => o.uid !== u && o.col === col && involved(o).some((w) => all.includes(w)))) return prev;
      return prev.map((o) => o.uid === u ? { ...o, col, targets: nt, controls: nc } : o);
    });
  }, [numQubits]);
  const deleteOp = useCallback((u: string) => { setOps((prev) => prev.filter((o) => o.uid !== u)); setSelected((s) => (s === u ? null : s)); }, []);
  const onCellDrop = (q: number, col: number) => (e: React.DragEvent) => {
    e.preventDefault(); const data = e.dataTransfer.getData("text/plain"); if (!data) return;
    try { const pl = JSON.parse(data); if (pl.newGate) placeGate(pl.newGate, q, col); else if (pl.move) moveOp(pl.move, q, col); } catch { }
  };
  const onCellClick = (q: number, col: number) => { if (armed && !cellOccupied(q, col)) placeGate(armed, q, col); };
  const addQubit = () => { if (numQubits < 8) setNumQubits((n) => n + 1); };
  const removeQubit = () => { if (numQubits <= 1) return; const top = numQubits - 1; setOps((prev) => prev.filter((o) => !involved(o).includes(top))); setNumQubits((n) => n - 1); };
  const clearAll = () => { setOps([]); setSelected(null); setArmed(null); };
  const selOp = ops.find((o) => o.uid === selected) || null;

  /* Load a circuit shared via ?circuit=... (e.g. from the Code Snippets page).
     Format: gates joined by "-", each "TYPE<a>[,<b>]" — e.g. "H0-CX0,1-CX1,2".
     For controlled gates a=control, b=target; for SWAP/RXX/RZZ a,b are targets. */
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("circuit");
    if (!raw) return;
    const loaded: Op[] = [];
    let maxWire = 0;
    raw.split("-").forEach((tok, i) => {
      const m = tok.match(/^([A-Za-z]+)(\d+)(?:,(\d+))?$/);
      if (!m) return;
      const type = m[1].toUpperCase() === "CNOT" ? "CX" : m[1];
      const def = DEF[type];
      if (!def) return;
      const a = parseInt(m[2], 10);
      const b = m[3] !== undefined ? parseInt(m[3], 10) : undefined;
      let targets: number[], controls: number[] = [];
      if (def.ctrls > 0 && b !== undefined) { controls = [a]; targets = [b]; }
      else if (def.tgts === 2 && b !== undefined) { targets = [a, b]; }
      else { targets = [a]; }
      maxWire = Math.max(maxWire, a, b ?? 0);
      loaded.push({ uid: uid(), type, col: i, targets, controls, params: def.params.map((p) => p.def) });
    });
    if (loaded.length) {
      setNumQubits(Math.min(Math.max(maxWire + 1, 1), 8));
      setOps(loaded);
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Tutorial Mode logic ── */
  const activeLesson = lessonIdx != null ? LESSONS[lessonIdx] : null;
  const step: LessonStep | null = activeLesson ? activeLesson.steps[stepIdx] : null;

  const checkValidate = useCallback((v: any): boolean => {
    if (!v) return true;
    if (v.all) return v.all.every((x: any) => checkValidate(x));
    if (v.ranShots) return shotsResult != null;
    if (v.measured) return ops.some((o) => o.type === "Measure" && o.targets.includes(v.measured.qubit));
    if (v.gateOnWire) return ops.some((o) => o.type === v.gateOnWire.gate && o.targets.includes(v.gateOnWire.qubit));
    if (v.controlledOn) return ops.some((o) => o.type === v.controlledOn.gate && o.controls.includes(v.controlledOn.control) && o.targets.includes(v.controlledOn.target));
    if (v.gateCount) return ops.filter((o) => o.type === v.gateCount.gate).length >= v.gateCount.count;
    return false;
  }, [ops, shotsResult]);
  const stepDone = step ? checkValidate(step.validate) : false;

  const runTutorialShots = useCallback(() => {
    const res: Record<string, number> = {};
    for (let s = 0; s < 100; s++) { const { outcome } = measureSample(displayState); const lab = labelOf(outcome, numQubits); res[lab] = (res[lab] || 0) + 1; }
    setShotsResult(res);
  }, [displayState, numQubits]);

  const startLesson = (i: number) => { setTutorial(true); setLessonIdx(i); setStepIdx(0); setShotsResult(null); setDeeper(false); setNumQubits(LESSONS[i].qubits); setOps([]); setSelected(null); };
  const nextStep = () => {
    if (!activeLesson) return;
    if (stepIdx < activeLesson.steps.length - 1) { setStepIdx((s) => s + 1); setShotsResult(null); }
    else { setCompleted((c) => (c.includes(lessonIdx!) ? c : [...c, lessonIdx!])); setLessonIdx(null); setStepIdx(0); }
  };
  const prevStep = () => { if (stepIdx > 0) { setStepIdx((s) => s - 1); setShotsResult(null); } };
  const exitTutorial = () => { setTutorial(false); setLessonIdx(null); setStepIdx(0); };
  // clear shot samples whenever the circuit changes
  useEffect(() => { setShotsResult(null); }, [ops]);

  // which gate to explain in the tutorial side panel
  const explainType = hoverGate || (selOp ? selOp.type : null) || (step?.highlight ?? null);
  const gi = explainType ? GATE_INFO[explainType] : null;
  const unlockThrough = activeLesson ? lessonIdx! + 1 : (completed.length ? Math.max(...completed) + 2 : 5);

  /* ---- Q-sphere drawing (shared) ---- */
  const drawQSphere = useCallback((ctx: CanvasRenderingContext2D, ox: number, oy: number, R: number, st: C[], n: number) => {
    ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(ox, oy, R, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(ox, oy, R, R * 0.32, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, oy - R); ctx.lineTo(ox, oy + R); ctx.stroke();
    for (let w = 1; w < n; w++) { const th = Math.PI * (w / n); const ry = R * Math.cos(th), rad = R * Math.sin(th); ctx.beginPath(); ctx.ellipse(ox, oy - ry, rad, rad * 0.32, 0, 0, Math.PI * 2); ctx.strokeStyle = "#f1f5f9"; ctx.stroke(); }
    const dim = 1 << n; const groups: number[][] = Array.from({ length: n + 1 }, () => []);
    for (let i = 0; i < dim; i++) { let w = 0; for (let q = 0; q < n; q++) w += (i >> q) & 1; groups[w].push(i); }
    type Nd = { x: number; y: number; depth: number; prob: number; phase: number; label: string };
    const nodes: Nd[] = [];
    for (let w = 0; w <= n; w++) {
      const th = Math.PI * (w / n); const ry = R * Math.cos(th), rad = R * Math.sin(th); const g = groups[w];
      g.forEach((i, k) => { const phi = g.length === 1 ? 0 : (2 * Math.PI * k) / g.length; nodes.push({ x: ox + rad * Math.cos(phi), y: oy - ry - rad * 0.32 * Math.sin(phi), depth: Math.sin(phi), prob: cabs2(st[i]), phase: cphase(st[i]), label: labelOf(i, n) }); });
    }
    nodes.sort((a, b) => a.depth - b.depth);
    for (const nd of nodes) {
      if (nd.prob < 1e-4) continue;
      const hue = phaseHue(nd.phase);
      ctx.strokeStyle = `hsl(${hue},70%,55%)`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(nd.x, nd.y); ctx.stroke();
      const rr = 3 + Math.sqrt(nd.prob) * 13; ctx.beginPath(); ctx.arc(nd.x, nd.y, rr, 0, Math.PI * 2); ctx.fillStyle = `hsl(${hue},75%,55%)`; ctx.fill(); ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = "#0f172a"; ctx.font = "9px ui-monospace, monospace"; ctx.textAlign = "center";
      ctx.fillText(showPhaseLabels ? `${(nd.phase * 180 / Math.PI).toFixed(0)}°` : nd.label, nd.x, nd.y - rr - 3);
    }
  }, [showPhaseLabels]);

  /* live Q-sphere panel */
  useEffect(() => {
    const canvas = qsphereRef.current; if (!canvas || numQubits > 5) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawQSphere(ctx, canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2 - 28, displayState, numQubits);
  }, [displayState, numQubits, drawQSphere]);

  /* ---- mini Bloch sphere drawing ---- */
  const drawMiniBloch = (ctx: CanvasRenderingContext2D, ox: number, oy: number, R: number, b: { x: number; y: number; z: number; r: number }) => {
    ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(ox, oy, R, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(ox, oy, R, R * 0.32, 0, 0, Math.PI * 2); ctx.strokeStyle = "#f1f5f9"; ctx.stroke();
    const vx = ox + R * (b.x + 0.18 * b.y), vy = oy - R * (b.z - 0.12 * b.y);
    const hue = b.r < 0.02 ? 0 : phaseHue(Math.atan2(b.y, b.x));
    ctx.strokeStyle = b.r < 0.05 ? "#cbd5e1" : `hsl(${hue},70%,50%)`; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(vx, vy); ctx.stroke();
    ctx.beginPath(); ctx.arc(vx, vy, 3.5, 0, Math.PI * 2); ctx.fillStyle = ctx.strokeStyle as string; ctx.fill();
    if (b.r < 0.05) { ctx.beginPath(); ctx.arc(ox, oy, 4, 0, Math.PI * 2); ctx.fillStyle = "#ef4444"; ctx.fill(); }
  };

  /* live mini-bloch row */
  const blochRowRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = blochRowRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const W = canvas.width, H = canvas.height; ctx.clearRect(0, 0, W, H); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, W, H);
    const n = numQubits; const R = 26, gap = (W - 20) / n;
    const cyc = H / 2 - 6;
    // bonds first (behind)
    for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) {
      const cval = ent.conc[a]?.[b] || 0; if (cval < 0.02) continue;
      const xa = 10 + gap * (a + 0.5), xb = 10 + gap * (b + 0.5);
      ctx.beginPath(); ctx.moveTo(xa, cyc); ctx.quadraticCurveTo((xa + xb) / 2, cyc + 30 + (b - a) * 6, xb, cyc);
      ctx.strokeStyle = `rgba(236,72,153,${0.25 + cval * 0.65})`; ctx.lineWidth = 1 + cval * 5; ctx.stroke();
    }
    for (let q = 0; q < n; q++) {
      const cxp = 10 + gap * (q + 0.5);
      drawMiniBloch(ctx, cxp, cyc, R, ent.blochs[q]);
      ctx.fillStyle = "#64748b"; ctx.font = "10px ui-monospace, monospace"; ctx.textAlign = "center";
      ctx.fillText(`q${q}`, cxp, cyc + R + 14);
      // entropy meter
      const S = ent.blochs[q].S; const bw = 40, bx = cxp - bw / 2, by = cyc + R + 20;
      ctx.fillStyle = "#e2e8f0"; ctx.fillRect(bx, by, bw, 5);
      ctx.fillStyle = S > 0.5 ? "#ef4444" : "#6366f1"; ctx.fillRect(bx, by, bw * Math.min(S, 1), 5);
      ctx.fillStyle = "#94a3b8"; ctx.font = "8px ui-monospace, monospace"; ctx.fillText(`S=${S.toFixed(2)}`, cxp, by + 14);
    }
  }, [ent, numQubits]);

  /* ---- composite STAGE canvas (used for on-screen animation + export) ---- */
  const drawStage = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number) => {
    ctx.clearRect(0, 0, W, H); ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, W, H);
    // caption
    ctx.fillStyle = "#0f172a"; ctx.font = "bold 15px ui-sans-serif, system-ui"; ctx.textAlign = "center";
    ctx.fillText(curCaption || "Circuit state", W / 2, 24);
    ctx.fillStyle = "#64748b"; ctx.font = "11px ui-sans-serif, system-ui";
    ctx.fillText(ent.label, W / 2, 42);
    // q-sphere (left)
    if (numQubits <= 5) drawQSphere(ctx, W * 0.27, H * 0.56, Math.min(W * 0.22, H * 0.32), displayState, numQubits);
    else { ctx.fillStyle = "#94a3b8"; ctx.font = "12px sans-serif"; ctx.fillText("Q-sphere ≤ 5 qubits", W * 0.27, H * 0.56); }
    // bloch row (right)
    const n = numQubits; const areaX = W * 0.52, areaW = W * 0.45; const R = Math.min(26, areaW / n / 2.4);
    const cyc = H * 0.5;
    for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) {
      const cval = ent.conc[a]?.[b] || 0; if (cval < 0.02) continue;
      const xa = areaX + (areaW / n) * (a + 0.5), xb = areaX + (areaW / n) * (b + 0.5);
      ctx.beginPath(); ctx.moveTo(xa, cyc); ctx.quadraticCurveTo((xa + xb) / 2, cyc + 34 + (b - a) * 6, xb, cyc);
      ctx.strokeStyle = `rgba(236,72,153,${0.25 + cval * 0.65})`; ctx.lineWidth = 1 + cval * 5; ctx.stroke();
    }
    for (let q = 0; q < n; q++) {
      const cxp = areaX + (areaW / n) * (q + 0.5);
      drawMiniBloch(ctx, cxp, cyc, R, ent.blochs[q]);
      ctx.fillStyle = "#64748b"; ctx.font = "10px ui-monospace, monospace"; ctx.textAlign = "center";
      ctx.fillText(`q${q}`, cxp, cyc + R + 13);
      const S = ent.blochs[q].S, bw = 34, bx = cxp - bw / 2, by = cyc + R + 18;
      ctx.fillStyle = "#e2e8f0"; ctx.fillRect(bx, by, bw, 4);
      ctx.fillStyle = S > 0.5 ? "#ef4444" : "#6366f1"; ctx.fillRect(bx, by, bw * Math.min(S, 1), 4);
    }
    ctx.fillStyle = "#cbd5e1"; ctx.font = "10px ui-sans-serif"; ctx.textAlign = "right";
    ctx.fillText("Quantum Research Archive — Quantum Sandbox", W - 8, H - 6);
  }, [curCaption, ent, displayState, numQubits, drawQSphere]);

  useEffect(() => {
    const canvas = stageRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    drawStage(ctx, canvas.width, canvas.height);
  }, [drawStage]);

  /* ---- WebM export: record the stage canvas across one full play-through ---- */
  const exportWebM = useCallback(async () => {
    const canvas = stageRef.current; if (!canvas || numSteps === 0 || recording) return;
    const stream = (canvas as HTMLCanvasElement).captureStream(30);
    const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : "video/webm";
    const rec = new MediaRecorder(stream, { mimeType: mime });
    const chunks: BlobPart[] = [];
    rec.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
    rec.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "quantum-circuit.webm"; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      setRecording(false);
    };
    setRecording(true);
    setPlayhead(0);
    rec.start();
    // drive a deterministic playthrough at 30fps over ~ (numSteps/speed) seconds
    const durationMs = (numSteps / speed) * 1000;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const ph = Math.min(numSteps, (elapsed / durationMs) * numSteps);
      setPlayhead(ph);
      if (elapsed < durationMs + 200) requestAnimationFrame(step);
      else rec.stop();
    };
    requestAnimationFrame(step);
  }, [numSteps, speed, recording]);

  /* statevector table from displayState */
  const amps = displayState.map((a, i) => ({ i, label: labelOf(i, numQubits), prob: cabs2(a), phase: cphase(a) })).filter((a) => a.prob > 1e-6);
  const copyCode = () => navigator.clipboard?.writeText(qiskit);
  const cats = ["Single-qubit", "Parametric", "Controlled", "Multi-qubit", "Operations"];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">⚛</div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">Quantum Sandbox</h1>
          <p className="text-sm text-slate-500">Drag-and-drop circuits with gate-by-gate animation, entanglement meters, a Q-sphere, and live Qiskit code.</p>
        </div>
        <button onClick={() => (tutorial ? exitTutorial() : setTutorial(true))}
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${tutorial ? "bg-indigo-600 text-white hover:bg-indigo-500" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
          <GraduationCap className="w-4 h-4" /> Tutorial Mode: {tutorial ? "On" : "Off"}
        </button>
      </div>

      {/* ── Tutorial: lesson picker ── */}
      {tutorial && !activeLesson && (
        <div className="bg-white rounded-xl border border-indigo-200 p-4">
          <div className="flex items-center gap-2 mb-1"><GraduationCap className="w-4 h-4 text-indigo-500" /><h2 className="text-sm font-bold text-slate-900">Guided lessons</h2></div>
          <p className="text-xs text-slate-500 mb-3">One idea per lesson. Do the real action, see what changes, read why — in plain English. Turn Tutorial Mode off any time to build freely.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {LESSONS.map((l, i) => {
              const done = completed.includes(i);
              const locked = i > 0 && !completed.includes(i - 1) && !done;
              return (
                <button key={l.id} disabled={locked} onClick={() => startLesson(i)}
                  className={`text-left p-3 rounded-xl border transition-colors ${locked ? "border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed" : "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold text-slate-400">Lesson {i + 1}</span>
                    {done ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : locked ? <Lock className="w-3.5 h-3.5 text-slate-300" /> : <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />}
                  </div>
                  <p className="text-xs font-semibold text-slate-800">{l.title}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Tutorial: active lesson rail + gate explainer ── */}
      {tutorial && activeLesson && step && (
        <div className="grid md:grid-cols-[1fr_300px] gap-4">
          <div className="bg-white rounded-xl border border-indigo-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wider">Lesson {lessonIdx! + 1} of {LESSONS.length}</p>
                <h2 className="text-sm font-bold text-slate-900">{activeLesson.title}</h2>
              </div>
              <button onClick={exitTutorial} className="text-[11px] text-slate-400 hover:text-slate-600">Exit to sandbox</button>
            </div>
            <div className="flex gap-1 mb-3">
              {activeLesson.steps.map((_, si) => <div key={si} className={`h-1.5 flex-1 rounded-full ${si < stepIdx ? "bg-indigo-500" : si === stepIdx ? "bg-indigo-300" : "bg-slate-200"}`} />)}
            </div>
            <p className="text-sm text-slate-700 mb-2">{step.concept}</p>
            <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800 mb-3">
              <span className="font-semibold">Do this: </span>{step.action}
            </div>
            {step.shots && (
              <div className="mb-3">
                <button onClick={runTutorialShots} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500"><Play className="w-3 h-3" /> Measure 100×</button>
                {shotsResult && (
                  <div className="mt-2 space-y-1">
                    {Object.entries(shotsResult).sort(([a], [b]) => parseInt(a, 2) - parseInt(b, 2)).map(([lab, cnt]) => (
                      <div key={lab} className="flex items-center gap-2 text-[11px]">
                        <span className="font-mono text-slate-600 w-14">|{lab}⟩</span>
                        <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: `${cnt}%` }} /></div>
                        <span className="font-mono text-slate-500 w-12 text-right">{cnt}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {stepDone && step.explain && (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-800 mb-3 flex gap-2">
                <Check className="w-4 h-4 shrink-0 mt-0.5" /><span>{step.explain}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <button onClick={prevStep} disabled={stepIdx === 0} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 disabled:opacity-40"><ArrowLeft className="w-3 h-3" /> Back</button>
              <button onClick={nextStep} disabled={!stepDone}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${stepDone ? "bg-indigo-600 text-white hover:bg-indigo-500" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}>
                {stepIdx === activeLesson.steps.length - 1 ? "Finish lesson" : "Next"} <ArrowRight className="w-3 h-3" />
              </button>
              {!stepDone && step.validate && <span className="text-[10px] text-slate-400">complete the action to continue</span>}
            </div>
          </div>

          {/* four-layer gate explainer */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            {gi ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 h-7 inline-flex items-center rounded-md text-xs font-bold text-white" style={{ backgroundColor: DEF[explainType!]?.color || "#6366f1" }}>{DEF[explainType!]?.label}</span>
                  <span className="text-xs font-semibold text-slate-700">{gi.slogan}</span>
                </div>
                <dl className="space-y-2 text-xs">
                  <div><dt className="font-semibold text-slate-500">What it does to the arrow</dt><dd className="text-slate-600">{gi.mechanism}</dd></div>
                  {gi.whyResult && <div><dt className="font-semibold text-slate-500">Why the screen changes</dt><dd className="text-slate-600">{gi.whyResult}</dd></div>}
                  <div><dt className="font-semibold text-slate-500">Why it exists</dt><dd className="text-slate-600">{gi.purpose}</dd></div>
                  {gi.breaksModel && <div className="rounded bg-rose-50 border border-rose-200 px-2 py-1 text-rose-700">Honest note: with this gate the single-arrow picture breaks — the qubits share one state and lose their individual arrows. That&apos;s entanglement.</div>}
                </dl>
                <button onClick={() => setDeeper((d) => !d)} className="mt-2 text-[11px] text-indigo-600 hover:underline">{deeper ? "Hide the math" : "Go deeper (the math)"}</button>
                {deeper && (() => {
                  const M = baseMatrix(explainType!, DEF[explainType!]?.params.map((p) => p.def) || []);
                  if (!M) return <p className="text-[11px] text-slate-400 mt-1">Non-unitary / structural operation — no 2×2 matrix.</p>;
                  const fmt = (c: C) => `${c.re.toFixed(2)}${c.im >= 0 ? "+" : "−"}${Math.abs(c.im).toFixed(2)}i`;
                  return <pre className="mt-1 text-[10px] font-mono text-slate-500 bg-slate-50 rounded p-2 overflow-x-auto">{`[ ${fmt(M[0][0])}  ${fmt(M[0][1])} ]\n[ ${fmt(M[1][0])}  ${fmt(M[1][1])} ]`}</pre>;
                })()}
              </>
            ) : <p className="text-xs text-slate-400">Hover a gate in the palette to see what it does, in plain English and in math.</p>}
          </div>
        </div>
      )}

      {/* intro */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <button onClick={() => setIntroOpen(!introOpen)} className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          {introOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          <Info className="w-4 h-4 text-indigo-500" /> New to this? How the composer works
        </button>
        {introOpen && (
          <div className="px-4 pb-4 space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-3">
            <p><strong className="text-slate-800">Build:</strong> drag an operation onto a wire (or click to arm, then click a cell). Many operations share a column across different wires.</p>
            <p><strong className="text-slate-800">Animate:</strong> press Play to sweep through the circuit gate by gate. Rotation gates follow a smooth geodesic; entangling gates make each qubit&apos;s Bloch vector shrink toward the centre as entanglement forms. Export the animation as a video.</p>
            <p><strong className="text-slate-800">Entanglement:</strong> each qubit&apos;s mini Bloch sphere shrinks as it becomes entangled (vector length = purity); the S meter is its von-Neumann entropy; pink bonds show pairwise concurrence. A product state keeps full vectors and no bonds; a Bell pair collapses two vectors and lights a bond; a GHZ state collapses <em>all</em> vectors with <em>no</em> bonds (genuine multipartite entanglement).</p>
            <p><strong className="text-slate-800">Q-sphere &amp; code:</strong> node size ∝ probability, colour = phase (≤5 qubits). The exact Qiskit program is generated live in Qiskit little-endian order, so results match IBM Quantum.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr] gap-4">
        {/* palette */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 h-fit">
          <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Operations <span className="text-slate-400 font-normal">({PALETTE.length})</span></h3>
          {cats.map((cat) => {
            const gates = PALETTE.filter((g) => g.cat === cat && (!tutorial || GATE_INFO[g.type].unlock <= unlockThrough));
            if (gates.length === 0) return null;
            return (
              <div key={cat} className="mb-3">
                <p className="text-[10px] font-semibold text-slate-400 uppercase mb-1">{cat}</p>
                <div className="flex flex-wrap gap-1.5">
                  {gates.map((g) => {
                    const isTut = tutorial && step?.highlight === g.type;
                    return (
                      <button key={g.type} draggable
                        onDragStart={(e) => e.dataTransfer.setData("text/plain", JSON.stringify({ newGate: g.type }))}
                        onClick={() => setArmed(armed === g.type ? null : g.type)}
                        onMouseEnter={() => tutorial && setHoverGate(g.type)} onMouseLeave={() => setHoverGate(null)}
                        title={g.label}
                        className={`px-2 h-8 min-w-[34px] rounded-md text-[11px] font-bold text-white cursor-grab active:cursor-grabbing transition-all hover:brightness-110 ${armed === g.type ? "ring-2 ring-offset-1 ring-slate-900" : ""} ${isTut ? "ring-2 ring-offset-1 ring-amber-400 animate-pulse" : ""}`}
                        style={{ backgroundColor: g.color }}>{g.label}</button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {tutorial && (() => { const hidden = PALETTE.filter((g) => GATE_INFO[g.type].unlock > unlockThrough).length; return hidden > 0 ? <p className="text-[10px] text-slate-400 mt-1 px-1 py-1 rounded bg-slate-50">+ {hidden} more — unlock by completing lessons (or turn Tutorial Mode off to use them all).</p> : null; })()}
          {armed && <p className="text-[10px] text-indigo-600 mt-1">Click a cell to place <b>{DEF[armed].label}</b> · click again to cancel</p>}
        </div>

        <div className="space-y-4 min-w-0">
          {/* toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Qubits: {numQubits}</span>
            <button onClick={addQubit} disabled={numQubits >= 8} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 disabled:opacity-40"><Plus className="w-3 h-3" /> Add</button>
            <button onClick={removeQubit} disabled={numQubits <= 1} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 disabled:opacity-40"><Minus className="w-3 h-3" /> Remove</button>
            <button onClick={clearAll} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-xs font-medium hover:bg-rose-100"><RotateCcw className="w-3 h-3" /> Clear</button>
            <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); try { const pl = JSON.parse(e.dataTransfer.getData("text/plain")); if (pl.move) deleteOp(pl.move); } catch { } }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-dashed border-slate-300 text-slate-400 text-xs ml-auto"><Trash2 className="w-3 h-3" /> drag here to delete</div>
          </div>

          {/* circuit grid */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 overflow-x-auto">
            <div className="relative" style={{ width: LEFT + numCols * CELL, height: TOPP * 2 + numQubits * CELL }}>
              {Array.from({ length: numQubits }, (_, q) => (
                <div key={q}>
                  <div className="absolute text-[11px] font-mono text-slate-500" style={{ left: 4, top: rowY(q) - 20 }}>q[{q}]</div>
                  <div className="absolute text-[10px] font-mono text-slate-400" style={{ left: 8, top: rowY(q) + 4 }}>|0⟩</div>
                  <div className="absolute bg-slate-300" style={{ left: LEFT, top: rowY(q), width: numCols * CELL, height: 1 }} />
                </div>
              ))}
              {/* playhead marker */}
              {numSteps > 0 && playhead < numSteps && (
                <div className="absolute bg-indigo-400/70" style={{ left: colX(columns[Math.min(Math.floor(playhead), numSteps - 1)]) - 1, top: 0, width: 2, height: TOPP * 2 + numQubits * CELL }} />
              )}
              {Array.from({ length: numQubits }, (_, q) =>
                Array.from({ length: numCols }, (_, col) => (
                  <div key={`${q}-${col}`} onDragOver={(e) => e.preventDefault()} onDrop={onCellDrop(q, col)} onClick={() => onCellClick(q, col)}
                    className={`absolute ${armed && !cellOccupied(q, col) ? "hover:bg-indigo-50 cursor-pointer" : ""}`}
                    style={{ left: colX(col) - CELL / 2, top: rowY(q) - CELL / 2, width: CELL, height: CELL }} />
                ))
              )}
              {ops.map((op) => {
                const wires = involved(op); const minQ = Math.min(...wires), maxQ = Math.max(...wires);
                const def = DEF[op.type]; const isSel = op.uid === selected;
                return (
                  <div key={op.uid}>
                    {maxQ !== minQ && <div className="absolute" style={{ left: colX(op.col) - 1, top: rowY(minQ), width: 2, height: rowY(maxQ) - rowY(minQ), background: def.color }} />}
                    {op.controls.map((c) => <div key={c} className="absolute rounded-full" style={{ left: colX(op.col) - 6, top: rowY(c) - 6, width: 12, height: 12, background: def.color }} />)}
                    {op.targets.map((t) => {
                      const isX = (op.type === "CX" || op.type === "CCX"); const isSw = (op.type === "SWAP" || op.type === "CSWAP");
                      return (
                        <div key={t} draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", JSON.stringify({ move: op.uid }))} onClick={() => setSelected(op.uid)}
                          title={`${def.label} — click to select, drag to move`}
                          className={`absolute flex items-center justify-center text-white text-[11px] font-bold cursor-grab active:cursor-grabbing ${isSel ? "ring-2 ring-offset-1 ring-slate-900" : ""}`}
                          style={{ left: colX(op.col) - (isX ? 13 : 17), top: rowY(t) - 13, width: isX ? 26 : 34, height: 26, borderRadius: isX ? 13 : 6, background: isSw ? "transparent" : def.color, color: isSw ? def.color : "#fff" }}>
                          {isSw ? <span style={{ fontSize: 16 }}>✕</span> : isX ? <span style={{ fontSize: 16, lineHeight: 1 }}>⊕</span> : def.label.replace(/\(.*\)/, "")}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* selected-op editor */}
          {selOp && (
            <div className="bg-white rounded-xl border border-slate-200 p-3 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-slate-700">{DEF[selOp.type].label}</span>
              <span className="text-[11px] text-slate-400 font-mono">{selOp.controls.length > 0 && `ctrl q[${selOp.controls.join(",")}] · `}target q[{selOp.targets.join(",")}]</span>
              {DEF[selOp.type].params.map((pd, pi) => (
                <label key={pi} className="flex items-center gap-1 text-xs text-slate-600">{pd.name} =
                  <input type="number" step="0.0001" value={selOp.params[pi].toFixed(4)}
                    onChange={(e) => { const v = parseFloat(e.target.value); if (Number.isNaN(v)) return; setOps((prev) => prev.map((o) => o.uid === selOp.uid ? { ...o, params: o.params.map((x, k) => k === pi ? v : x) } : o)); }}
                    className="w-20 px-1.5 py-0.5 rounded border border-slate-300 font-mono text-xs" />
                  <span className="text-slate-400">({fmtPi(selOp.params[pi]).replace(/np\./g, "")})</span>
                </label>
              ))}
              <button onClick={() => deleteOp(selOp.uid)} className="ml-auto inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-50 text-rose-600 text-xs font-medium hover:bg-rose-100"><Trash2 className="w-3 h-3" /> Delete</button>
            </div>
          )}

          {/* playback bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 flex flex-wrap items-center gap-3">
            <button onClick={play} disabled={numSteps === 0} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 disabled:opacity-40">
              {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />} {playing ? "Pause" : "Play"}
            </button>
            <input type="range" min={0} max={Math.max(numSteps, 0.0001)} step={0.01} value={playhead}
              onChange={(e) => { setPlaying(false); setPlayhead(parseFloat(e.target.value)); }}
              className="flex-1 min-w-[160px] accent-indigo-600" disabled={numSteps === 0} />
            <span className="text-[11px] font-mono text-slate-500 w-20 text-right">step {Math.min(Math.ceil(playhead), numSteps)}/{numSteps}</span>
            <label className="text-xs text-slate-600 flex items-center gap-1">speed
              <select value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="rounded border border-slate-300 text-xs px-1 py-0.5">
                <option value={0.5}>0.5×</option><option value={1}>1×</option><option value={2}>2×</option><option value={4}>4×</option>
              </select>
            </label>
            <label className="text-xs text-slate-600 flex items-center gap-1"><input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} /> loop</label>
            <button onClick={exportWebM} disabled={numSteps === 0 || recording} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-medium hover:bg-emerald-200 disabled:opacity-40">
              <Film className="w-3.5 h-3.5" /> {recording ? "Recording…" : "Export WebM"}
            </button>
          </div>

          {/* animation stage */}
          <div className="bg-white rounded-xl border border-slate-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Animation Stage</h3>
              <button onClick={() => setShowPhaseLabels((v) => !v)} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-slate-200">{showPhaseLabels ? "Q-sphere: state labels" : "Q-sphere: phase angles"}</button>
            </div>
            <div className="flex justify-center">
              <canvas ref={stageRef} width={680} height={300} className="w-full max-w-[680px] rounded-lg border border-slate-100" />
            </div>
          </div>

          {/* entanglement panel */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Entanglement</h3>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{ent.label}</span>
            </div>
            <p className="text-[10px] text-slate-400 mb-2">Bloch vector length = purity (shrinks with entanglement). S = von Neumann entropy (0 = unentangled, 1 = maximal). Pink bonds = pairwise concurrence.</p>
            <div className="flex justify-center">
              <canvas ref={blochRowRef} width={Math.min(680, 90 * numQubits + 40)} height={120} className="max-w-full" />
            </div>
          </div>

          {/* outputs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Q-sphere</h3>
              {numQubits <= 5 ? (
                <>
                  <div className="flex justify-center"><canvas ref={qsphereRef} width={300} height={300} className="max-w-full" /></div>
                  <div className="mt-2 flex items-center justify-center gap-3 text-[10px] text-slate-400"><span>node size ∝ probability</span><span className="inline-flex items-center gap-1">colour = phase<span className="inline-block w-16 h-2 rounded" style={{ background: "linear-gradient(90deg,hsl(0,75%,55%),hsl(120,75%,55%),hsl(240,75%,55%),hsl(360,75%,55%))" }} /></span></div>
                </>
              ) : <div className="h-[300px] flex items-center justify-center text-center text-sm text-slate-400 px-6">The Q-sphere is limited to 5 qubits. Remove qubits to view it.</div>}
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Statevector</h3>
              <p className="text-[10px] text-slate-400 mb-2">Computational basis (q[{numQubits - 1}]…q[0]) at the current playhead.</p>
              <div className="space-y-1 max-h-[240px] overflow-y-auto pr-1">
                {amps.length === 0 && <p className="text-xs text-slate-400">All amplitude is in |{"0".repeat(numQubits)}⟩.</p>}
                {amps.map(({ i, label, prob, phase }) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-slate-700 w-20 shrink-0">|{label}⟩</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden"><div style={{ width: `${prob * 100}%` }} className="h-full bg-indigo-500" /></div>
                    <span className="font-mono text-slate-500 w-14 text-right">{(prob * 100).toFixed(1)}%</span>
                    <span className="font-mono text-slate-400 w-12 text-right">{(phase * 180 / Math.PI).toFixed(0)}°</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* qiskit */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Qiskit code</h3>
              <button onClick={copyCode} className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"><Copy className="w-3 h-3" /> Copy</button>
            </div>
            <pre className="text-[12px] leading-relaxed text-emerald-300 font-mono overflow-x-auto whitespace-pre">{qiskit}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
