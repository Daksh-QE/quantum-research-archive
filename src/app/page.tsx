"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* helpers */
function shuffle<T>(arr: T[], seed: number): T[] {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    let s = (seed * 16807 + (i * 17239)) % 2147483647;
    const j = s % (i + 1);
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

/* size tiers (height px) */
const H = {
  BOOK: 180, YT: 120, REPO: 110, PAPER: 78,
  PERSON: 62, COMPANY: 50, COURSE: 50, TOOL: 50,
  ARTICLE: 64, CHALLENGE: 68, HUB: 52, JOB: 66,
};

interface Tile { uid: string; url: string; html: string; h: number; }

// tile data (checked URLs)

function buildTiles(): Tile[] {
  const T: Tile[] = [];
  let u = 0;
  const add = (html: string, url: string, h: number) => T.push({ uid: `t${u++}`, url, html, h });

  /* 3Blue1Brown quantum videos (only videos on canvas) */
  const YT = [
    ["https://i.ytimg.com/vi/fNk_zzaMoSs/mqdefault.jpg", "Some light quantum mechanics | 3Blue1Brown", "https://www.youtube.com/watch?v=fNk_zzaMoSs"],
    ["https://i.ytimg.com/vi/k7RM-ot2NWY/mqdefault.jpg", "Quantum mechanics and the Schrödinger equation", "https://www.youtube.com/watch?v=k7RM-ot2NWY"],
    ["https://i.ytimg.com/vi/kYB8IZa5AuE/mqdefault.jpg", "Bell's inequality | 3Blue1Brown", "https://www.youtube.com/watch?v=kYB8IZa5AuE"],
  ];
  for (const [thumb, , url] of YT)
    add(`<div class="lc lc-yt"><img class="lc-yt-img" src="${thumb}" alt="" loading="lazy" onerror="this.parentElement.style.display='none'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"/><div class="lc-play"><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg></div></div>`, url, H.YT);

  /* Book covers (large) */
  const BOOKS: [string, string, string][] = [
    ["Quantum Computation and Quantum Information", "https://covers.openlibrary.org/b/id/14614256-L.jpg", "https://www.cambridge.org/9781107002173"],
    ["Principles of Quantum Mechanics", "https://covers.openlibrary.org/b/id/258369-L.jpg", "https://www.springer.com/9780306447907"],
    ["Introduction to Quantum Mechanics", "https://covers.openlibrary.org/b/id/10442491-L.jpg", "https://www.cambridge.org/9781107189638"],
    ["Modern Quantum Mechanics", "https://covers.openlibrary.org/b/id/12618219-L.jpg", "https://www.cambridge.org/9781108422413"],
    ["Quantum Computing for Computer Scientists", "https://covers.openlibrary.org/b/id/10136939-L.jpg", "https://www.cambridge.org/9780521879965"],
    ["Quantum Information Theory", "https://covers.openlibrary.org/b/id/14327819-L.jpg", "https://www.cambridge.org/9781316809976"],
    ["Dancing with Qubits", "https://covers.openlibrary.org/b/id/12983665-L.jpg", "https://www.packtpub.com/product/dancing-with-qubits/9781838827366"],
  ];
  for (const [, img, url] of BOOKS)
    add(`<div class="lc lc-book"><img src="${img}" alt="" loading="lazy" style="display:block;width:100%;height:100%;object-fit:contain" onerror="this.parentElement.style.display='none'"/></div>`, url, H.BOOK);

  /* GitHub repos */
  const REPS: [string, string, string][] = [
    ["qiskit/qiskit", "#000", "https://opengraph.githubassets.com/1/qiskit/qiskit"],
    ["quantumlib/Stim", "#000", "https://opengraph.githubassets.com/1/quantumlib/Stim"],
    ["PennyLaneAI/pennylane", "#000", "https://opengraph.githubassets.com/1/PennyLaneAI/pennylane"],
    ["aws/amazon-braket-sdk-python", "#000", "https://opengraph.githubassets.com/1/aws/amazon-braket-sdk-python"],
    ["qutip/qutip", "#000", "https://opengraph.githubassets.com/1/qutip/qutip"],
    ["quantumai/qsim", "#000", "https://opengraph.githubassets.com/1/quantumai/qsim"],
    ["ProjectQ-Framework/ProjectQ", "#000", "https://opengraph.githubassets.com/1/ProjectQ-Framework/ProjectQ"],
    ["quil-lang/pyquil", "#000", "https://opengraph.githubassets.com/1/quil-lang/pyquil"],
  ];
  for (const [repo, , og] of REPS)
    add(`<div class="lc" style="background:#0d1117;border:none;border-radius:5px;overflow:hidden;position:relative"><img src="${og}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block" onerror="this.parentElement.style.display='none'"/><div style="position:absolute;bottom:4px;left:6px;display:flex;align-items:center;gap:4px"><svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg><span style="color:white;font-size:9px;font-weight:500;overflow:hidden;text-overflow:ellipsis">${repo}</span></div></div>`, `https://github.com/${repo}`, H.REPO);

  /* Quantum labs / companies (branded) */
  const LABS: [string, string, string][] = [
    ["IBM Quantum", "#6366f1", "https://www.ibm.com/quantum"],
    ["Google Quantum AI", "#4285F4", "https://quantumai.google/"],
    ["AWS Braket", "#FF9900", "https://aws.amazon.com/braket/"],
    ["Microsoft Quantum", "#00A4EF", "https://azure.microsoft.com/products/quantum/"],
    ["Xanadu", "#06b6d4", "https://xanadu.ai/"],
    ["IonQ", "#8b5cf6", "https://ionq.com/"],
    ["Rigetti", "#f59e0b", "https://www.rigetti.com/"],
    ["Quantinuum", "#ef4444", "https://www.quantinuum.com/"],
    ["D-Wave", "#22c55e", "https://www.dwavesys.com/"],
    ["PsiQuantum", "#06b6d4", "https://www.psiquantum.com/"],
    ["Classiq", "#8b5cf6", "https://www.classiq.io/"],
    ["Oxford Quantum Circuits", "#6366f1", "https://oxfordquantumcircuits.com/"],
  ];
  for (const [name, color, url] of LABS)
    add(`<div class="lc" style="display:flex;align-items:center;gap:6px;padding:0 10px;background:${color}10;height:100%;box-sizing:border-box;border-left:2px solid ${color}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" style="flex-shrink:0"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/></svg><span class="lc-name" style="font-size:11px;font-weight:500">${name}</span></div>`, url, H.COMPANY);

  /* University courses */
  const COURSES: [string, string][] = [
    ["MIT 8.04 — Quantum Physics I", "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/"],
    ["MIT 8.05 — Quantum Physics II", "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/"],
    ["MIT 8.06 — Quantum Physics III", "https://ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2018/"],
    ["Caltech Ph 125 — QM", "https://en.wikipedia.org/wiki/John_Preskill"],
    ["Stanford QM", "https://theoreticalminimum.com/courses/quantum-mechanics/2012/winter"],
    ["Oxford Quantum Computing", "https://www.cs.ox.ac.uk/people/username/"],
    ["Berkeley CS 294", "https://inst.eecs.berkeley.edu/~cs294-2/fa24/"],
    ["Delft TU Quantum", "https://qutech.nl/"],
    ["Waterloo IQC", "https://uwaterloo.ca/institute-for-quantum-computing/"],
  ];
  for (const [name, url] of COURSES) {
    const d = new URL(url).hostname;
    add(`<div class="lc" style="display:flex;align-items:center;gap:6px;padding:0 10px;background:#fefce8;height:100%;box-sizing:border-box"><img src="https://www.google.com/s2/favicons?domain=${d}&sz=32" alt="" style="width:16px;height:16px;border-radius:3px;flex-shrink:0" onerror="this.style.display='none'"/><span class="lc-name" style="font-size:11px">${name}</span></div>`, url, H.COURSE);
  }

  /* People / researchers */
  const PEOPLE: [string, string, string, string][] = [
    ["Peter Shor", "PS", "RES", "https://math.mit.edu/~shor/"],
    ["John Preskill", "JP", "RES", "https://en.wikipedia.org/wiki/John_Preskill"],
    ["Scott Aaronson", "SA", "EDU", "https://www.scottaaronson.com/"],
    ["David Deutsch", "DD", "RES", "https://en.wikipedia.org/wiki/David_Deutsch"],
    ["Alexei Kitaev", "AK", "RES", "https://en.wikipedia.org/wiki/Alexei_Kitaev"],
    ["Charles Bennett", "CB", "RES", "https://en.wikipedia.org/wiki/Charles_H._Bennett_(physicist)"],
    ["Michael Nielsen", "MN", "EDU", "https://michaelnielsen.org/"],
    ["Anton Zeilinger", "AZ", "RES", "https://en.wikipedia.org/wiki/Anton_Zeilinger"],
    ["Richard Feynman", "RF", "RES", "https://en.wikipedia.org/wiki/Richard_Feynman"],
    ["Daniel Gottesman", "DG", "RES", "https://en.wikipedia.org/wiki/Daniel_Gottesman"],
  ];
  const PC = { RES: "#6366f1", EDU: "#22c55e", BUILD: "#f59e0b", LEAD: "#8b5cf6" } as Record<string, string>;
  for (const [name, init, role, url] of PEOPLE)
    add(`<div class="lc" style="display:flex;align-items:center;gap:8px;padding:7px 10px;background:#f8f8ff;height:100%;box-sizing:border-box"><div style="width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:white;flex-shrink:0;background:${PC[role]||"#6366f1"}">${init}</div><div style="min-width:0"><div class="lc-name" style="font-size:11px">${name}</div><div class="lc-sub" style="font-size:8px">${role}</div></div></div>`, url, H.PERSON);

  /* Papers */
  const PAPERS: [string, string, string][] = [
    ["Quantum theory, the Church–Turing principle", "Deutsch", "https://royalsocietypublishing.org/doi/10.1098/rspa.1985.0070"],
    ["A fast quantum mechanical algorithm for database search", "Grover", "https://arxiv.org/abs/quant-ph/9605043"],
    ["Polynomial-time algorithms for prime factorization", "Shor", "https://arxiv.org/abs/quant-ph/9508027"],
    ["Teleporting an unknown quantum state", "Bennett et al.", "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.70.1895"],
    ["Quantum computational complexity", "Bernstein & Vazirani", "https://arxiv.org/abs/quant-ph/9701008"],
    ["Fault-tolerant quantum computation by anyons", "Kitaev", "https://arxiv.org/abs/quant-ph/9707021"],
    ["Quantum supremacy", "Arute et al.", "https://www.nature.com/articles/s41586-019-1666-5"],
    ["Error correcting codes in quantum theory", "Steane", "https://arxiv.org/abs/quant-ph/9608021"],
    ["Superdense coding", "Bennett & Wiesner", "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.69.2881"],
  ];
  for (const [t, a, u] of PAPERS)
    add(`<div class="lc" style="padding:8px 10px;display:flex;align-items:flex-start;gap:6px;background:#fafaff;height:100%;box-sizing:border-box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.5" style="flex-shrink:0;margin-top:2px"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg><div style="min-width:0"><div class="lc-title" style="font-size:11px">${t}</div><div class="lc-sub" style="font-size:9px">${a}</div></div></div>`, u, H.PAPER);

  /* Jobs with company brand icons */
  const JOBS: [string, string, string, string][] = [
    ["Quantum Research Scientist", "IBM Quantum", "#6366f1", "https://www.ibm.com/quantum"],
    ["Quantum ML Researcher", "Google AI", "#4285F4", "https://quantumai.google/"],
    ["Quantum Software Engineer", "IBM Qiskit", "#6366f1", "https://www.ibm.com/quantum"],
    ["Algorithm Developer", "Xanadu", "#06b6d4", "https://xanadu.ai/"],
    ["Hardware Engineer", "Rigetti", "#f59e0b", "https://www.rigetti.com/"],
    ["Cryogenics Engineer", "Quantinuum", "#ef4444", "https://www.quantinuum.com/"],
    ["QEC Specialist", "AWS Center", "#FF9900", "https://www.amazon.science/"],
    ["Quantum Engineer", "Classiq", "#8b5cf6", "https://www.classiq.io/"],
    ["PhD Intern", "Microsoft Quantum", "#00A4EF", "https://azure.microsoft.com/products/quantum/"],
    ["Applications Scientist", "IonQ", "#8b5cf6", "https://ionq.com/"],
    ["Quantum Consultant", "McKinsey", "#000", "https://www.mckinsey.com/careers"],
    ["Fabrication Engineer", "D-Wave", "#22c55e", "https://www.dwavesys.com/"],
    ["Optical Engineer", "PsiQuantum", "#06b6d4", "https://www.psiquantum.com/"],
    ["Quantum Educator", "Qubit by Qubit", "#f59e0b", "https://www.qubitbyqubit.org/"],
    ["Research Intern", "Google AI", "#4285F4", "https://quantumai.google/"],
  ];
  for (const [title, company, color, url] of JOBS)
    add(`<div class="lc" style="padding:8px 10px;display:flex;align-items:center;gap:8px;background:${color}08;height:100%;box-sizing:border-box;border-left:2px solid ${color}"><div style="width:20px;height:20px;border-radius:4px;display:flex;align-items:center;justify-content:center;background:${color};flex-shrink:0;color:white;font-size:9px;font-weight:700">${company.charAt(0)}</div><div style="min-width:0"><div class="lc-title" style="font-size:10px">${title}</div><div class="lc-sub" style="font-size:8px;color:${color};font-weight:500">${company}</div></div></div>`, url, H.JOB);

  /* Tools (with proper icons) */
  const TOOLS: [string, string, string][] = [
    ["Qiskit", "#6366f1", "https://qiskit.org/"],
    ["Cirq", "#4285F4", "https://quantumai.google/cirq"],
    ["PennyLane", "#06b6d4", "https://pennylane.ai/"],
    ["QuTiP", "#22c55e", "https://qutip.org/"],
    ["Stim", "#8b5cf6", "https://github.com/quantumlib/Stim"],
    ["Q#", "#00A4EF", "https://azure.microsoft.com/products/quantum/"],
    ["Amazon Braket", "#FF9900", "https://aws.amazon.com/braket/"],
    ["tket", "#ef4444", "https://github.com/CQCL/tket"],
    ["Ocean SDK", "#22c55e", "https://github.com/dwavesystems/dwave-ocean-sdk"],
    ["Qiskit Aer", "#6366f1", "https://github.com/Qiskit/qiskit-aer"],
    ["qsim", "#4285F4", "https://quantumai.google/qsim"],
    ["Qulacs", "#f59e0b", "https://github.com/qulacs/qulacs"],
    ["ProjectQ", "#06b6d4", "https://projectq.ch/"],
    ["Silq", "#8b5cf6", "https://silq.ethz.ch/"],
    ["Qibo", "#ef4444", "https://qibo.science/"],
    ["Yaon", "#6366f1", "https://yaoquantum.org/"],
    ["QuEST", "#22c55e", "https://quest.qtechtheory.org/"],
    ["OpenQASM", "#000", "https://github.com/openqasm/openqasm"],
  ];
  for (const [name, color, url] of TOOLS)
    add(`<div class="lc" style="display:flex;align-items:center;gap:6px;padding:0 10px;background:${color}10;height:100%;box-sizing:border-box;border-left:2px solid ${color}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" style="flex-shrink:0"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg><span class="lc-name" style="font-size:11px;font-weight:500">${name}</span></div>`, url, H.TOOL);

  /* Articles */
  const ARTICLES: [string, string, string][] = [
    ["Quantum Computing for the Very Curious", "Matuschak & Nielsen", "https://quantum.country/qcvc"],
    ["Quantum Computing in the NISQ era", "John Preskill", "https://arxiv.org/abs/1801.00862"],
    ["The Limits of Quantum Computers", "Scott Aaronson", "https://www.scientificamerican.com/article/the-limits-of-quantum-computers/"],
    ["Quantum Supremacy Using a Programmable Superconducting Processor", "Arute et al.", "https://www.nature.com/articles/s41586-019-1666-5"],
    ["Simulating Physics with Computers", "Richard Feynman", "https://link.springer.com/article/10.1007/BF02650179"],
    ["Introduction to Quantum Error Correction", "Daniel Gottesman", "https://arxiv.org/abs/0904.2557"],
    ["Quantum Machine Learning: A Review", "Biamonte et al.", "https://arxiv.org/abs/1611.09347"],
    ["The Physical Implementation of Quantum Computation", "DiVincenzo", "https://arxiv.org/abs/quant-ph/0002077"],
  ];
  for (const [t, a, u] of ARTICLES)
    add(`<div class="lc" style="padding:8px 10px;display:flex;flex-direction:column;gap:2px;background:#fffdf8;height:100%;box-sizing:border-box"><div class="lc-title" style="font-size:11px">${t}</div><div class="lc-sub" style="font-size:9px">${a}</div></div>`, u, H.ARTICLE);

  /* Challenges */
  const CHALLENGES: [string, string, string, string][] = [
    ["Visualize a Qubit on the Bloch Sphere", "beginner", "#22c55e", "https://quantum.ibm.com/composer"],
    ["Create a Bell State Circuit", "beginner", "#22c55e", "https://learning.quantum.ibm.com/"],
    ["Implement Deutsch-Jozsa Algorithm", "beginner", "#22c55e", "https://learning.quantum.ibm.com/"],
    ["Grover's Search Algorithm", "intermediate", "#f59e0b", "https://docs.quantum.ibm.com/guides/grovers-algorithm"],
    ["Quantum Fourier Transform", "intermediate", "#f59e0b", "https://learning.quantum.ibm.com/"],
    ["Quantum Teleportation Protocol", "intermediate", "#f59e0b", "https://learning.quantum.ibm.com/"],
    ["VQE for Hydrogen Molecule", "intermediate", "#f59e0b", "https://learning.quantum.ibm.com/"],
    ["BB84 Quantum Key Distribution", "intermediate", "#f59e0b", "https://learning.quantum.ibm.com/"],
    ["Repetition Code Error Correction", "intermediate", "#f59e0b", "https://arxiv.org/abs/0904.2557"],
    ["Shor's Algorithm — Factor 15", "advanced", "#ef4444", "https://learning.quantum.ibm.com/"],
    ["Surface Code Distance-3", "advanced", "#ef4444", "https://github.com/quantumlib/Stim"],
    ["HHL Algorithm for Linear Systems", "advanced", "#ef4444", "https://arxiv.org/abs/0811.3171"],
  ];
  for (const [t, d, c, u] of CHALLENGES)
    add(`<div class="lc" style="padding:8px 10px;display:flex;align-items:flex-start;gap:6px;background:#faf8f0;height:100%;box-sizing:border-box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" style="flex-shrink:0;margin-top:2px"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg><div style="min-width:0"><div class="lc-title" style="font-size:11px">${t}</div><div class="lc-sub" style="font-size:8px;color:${c};font-weight:600;text-transform:uppercase">${d}</div></div></div>`, u, H.CHALLENGE);

  /* Community hubs (Discord / Reddit / X) */
  const HUBS: [string, string, string, string][] = [
    ["Qiskit Slack", "#4A154B", "slack", "https://qisk.it/join-slack"],
    ["Quantum Computing SE", "#6366f1", "forum", "https://quantumcomputing.stackexchange.com/"],
    ["r/QuantumComputing", "#FF4500", "reddit", "https://www.reddit.com/r/QuantumComputing/"],
    ["r/QuantumPhysics", "#FF4500", "reddit", "https://www.reddit.com/r/QuantumPhysics/"],
    ["Scott Aaronson (X)", "#000", "x", "https://x.com/scottaaronson"],
    ["John Preskill (X)", "#000", "x", "https://x.com/preskill"],
    ["Unitary Fund Discord", "#5865F2", "discord", "https://discord.gg/unitaryfund"],
    ["QOSF Slack", "#4A154B", "slack", "https://qosf.org/"],
    ["PennyLane Forum", "#6366f1", "forum", "https://discuss.pennylane.ai/"],
  ];
  for (const [name, bg, plat, url] of HUBS)
    add(`<div class="lc" style="display:flex;align-items:center;gap:8px;padding:0 10px;background:${bg}10;height:100%;box-sizing:border-box"><div style="width:22px;height:22px;border-radius:4px;display:flex;align-items:center;justify-content:center;background:${bg};flex-shrink:0"><svg width="13" height="13" viewBox="0 0 256 199" fill="white"><path d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632c5.642-3.76 5.356-4.237 5.356-4.237 42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36Z"/></svg></div><span class="lc-name" style="font-size:11px">${name}</span></div>`, url, H.HUB);

  return shuffle(T, 7);
}

// component

export default function LandingPage() {
  const tiles = useMemo(() => buildTiles(), []);
  const vpRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<Tile[]>([]);
  const activeRef = useRef<Map<string, { el: HTMLDivElement; item: Tile }>>(new Map());
  const freeRef = useRef<HTMLDivElement[]>([]);
  const camRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: -200, y: -100 });
  const rafRef = useRef(0);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/repos/Daksh-QE/quantum-research-archive", { cache: "no-store" })
      .then((r) => r.json()).then((d) => setStars(d.stargazers_count || 0)).catch(() => {});
  }, []);

  const COLS = 10, GAP = 2, W = 200;

  useEffect(() => { layoutRef.current = tiles; }, [tiles]);

  useEffect(() => {
    const vp = vpRef.current, canvas = canvasRef.current;
    if (!vp || !canvas) return;
    const acquire = () => freeRef.current.pop() ?? (() => {
      const el = document.createElement("div");
      el.className = "lc-pool";
      el.style.position = "absolute"; el.style.width = W + "px";
      el.style.borderRadius = "5px"; el.style.overflow = "hidden"; el.style.cursor = "pointer";
      canvas.appendChild(el);
      return el;
    })();
    const release = (el: HTMLDivElement) => { el.style.display = "none"; freeRef.current.push(el); };
    const items = layoutRef.current;
    const total = items.length, cw = W + GAP;
    const rows = Math.ceil(total / COLS);
    const rowH: number[] = [];
    for (let r = 0; r < rows; r++) {
      let mx = 0;
      for (let c = 0; c < COLS; c++) { const i = r * COLS + c; if (i < total) mx = Math.max(mx, items[i].h); }
      rowH.push(mx || 100);
    }
    const stripH = rowH.reduce((a, b) => a + b + GAP, 0);

    const render = () => {
      const vw = window.innerWidth, vh = window.innerHeight, cam = camRef.current, buf = 600;
      const sc = Math.floor((-cam.x - buf) / cw), ec = Math.ceil((-cam.x + vw + buf) / cw);
      const ss = Math.floor((-cam.y - buf) / stripH), se = Math.ceil((-cam.y + vh + buf) / stripH);
      const vis = new Set<string>();
      for (let si = ss; si < se; si++) {
        let yo = 0;
        for (let r = 0; r < rows; r++) {
          for (let c = sc; c < ec; c++) {
            const ti = (r * COLS + c) % total;
            const tile = items[ti];
            if (!tile) continue;
            const sx = c * cw + cam.x, sy = si * stripH + yo + cam.y;
            if (sx + cw < -buf || sx > vw + buf || sy + rowH[r] < -buf || sy > vh + buf) continue;
            const vk = `${c}_${si}_${r}`;
            vis.add(vk);
            const ex = activeRef.current.get(vk);
            if (ex) {
              if (ex.item.uid !== tile.uid) { ex.el.innerHTML = tile.html; ex.el.style.height = tile.h + "px"; ex.item = tile; }
              ex.el.style.transform = `translate3d(${sx}px,${sy}px,0)`;
            } else {
              const el = acquire();
              el.innerHTML = tile.html; el.style.height = tile.h + "px";
              el.style.transform = `translate3d(${sx}px,${sy}px,0)`; el.style.display = "";
              el.onclick = () => { window.open(tile.url, "_blank"); };
              activeRef.current.set(vk, { el, item: tile });
            }
          }
          yo += rowH[r] + GAP;
        }
      }
      for (const [k, e] of activeRef.current) { if (!vis.has(k)) { release(e.el); activeRef.current.delete(k); } }
    };
    const anim = () => {
      const dx = targetRef.current.x - camRef.current.x, dy = targetRef.current.y - camRef.current.y;
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) { camRef.current.x += dx * 0.12; camRef.current.y += dy * 0.12; render(); }
      rafRef.current = requestAnimationFrame(anim);
    };
    let drag = false, px = 0, py = 0;
    const md = (e: MouseEvent) => { if (e.button !== 0) return; drag = true; px = e.clientX; py = e.clientY; vp.classList.add("grabbing"); };
    const mm = (e: MouseEvent) => { if (!drag) return; targetRef.current.x += e.clientX - px; targetRef.current.y += e.clientY - py; px = e.clientX; py = e.clientY; };
    const mu = () => { drag = false; vp.classList.remove("grabbing"); };
    const mw = (e: WheelEvent) => { e.preventDefault(); targetRef.current.x -= e.deltaX; targetRef.current.y -= e.deltaY; };
    vp.addEventListener("mousedown", md); window.addEventListener("mousemove", mm); window.addEventListener("mouseup", mu); vp.addEventListener("wheel", mw, { passive: false });
    render(); rafRef.current = requestAnimationFrame(anim);
    return () => {
      cancelAnimationFrame(rafRef.current);
      vp.removeEventListener("mousedown", md); window.removeEventListener("mousemove", mm); window.removeEventListener("mouseup", mu);
      vp.removeEventListener("wheel", mw);
      for (const [, e] of activeRef.current) e.el.remove();
      activeRef.current.clear(); freeRef.current.forEach((e) => e.remove()); freeRef.current = [];
    };
  }, [tiles]);

  return (
    <>
      <style>{`
        .landing-vp { position:fixed; inset:0; background:#f2f2f2; overflow:hidden; cursor:grab; user-select:none }
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
        .hero-card { background:rgba(242,242,242,0.95); backdrop-filter:blur(6px); border:1px solid rgba(0,0,0,0.06); box-shadow:0 2px 20px rgba(0,0,0,0.06); border-radius:16px }
        @keyframes scroll { 0% { transform:translateX(0) } 100% { transform:translateX(-50%) } }
      `}</style>
      <div className="landing-vp" ref={vpRef}><div className="landing-grid-canvas" ref={canvasRef} /></div>
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        {/* Quantum news ticker (marquee) */}
        <div className="absolute top-4 left-0 right-0 z-20 overflow-hidden pointer-events-none">
          <div className="pointer-events-auto bg-white/90 backdrop-blur-sm rounded-full py-2 border border-slate-200 shadow-sm mx-4 overflow-hidden">
            <div className="flex whitespace-nowrap animate-[scroll_30s_linear_infinite]">
              <span className="flex items-center gap-4 px-5 text-xs">
                <span className="font-semibold text-indigo-600 shrink-0">📰 Quantum News</span>
                <span className="text-slate-500">Google's Willow chip: error correction below threshold</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">Microsoft topological qubit milestone</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">IBM 1121-qubit Condor processor</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">Xanadu photonic quantum computing breakthrough</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">IonQ achieves 99.9% gate fidelity</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">Google's Willow chip: error correction below threshold</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">Microsoft topological qubit milestone</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">IBM 1121-qubit Condor processor</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">Xanadu photonic quantum computing breakthrough</span>
              </span>
            </div>
          </div>
        </div>
        <div className="hero-card px-8 py-8 sm:px-10 sm:py-9 max-w-sm mx-4 text-center pointer-events-auto">
          <h1 className="text-[20px] sm:text-[23px] font-bold text-[#1D1D1D] leading-tight tracking-tight">quantum research archive</h1>
          <p className="mt-1.5 text-sm text-[#6E6E6E]">Everything you need to go from zero to quantum — curated, free, and jargon-explained.</p>
        </div>
        <div className="pointer-events-auto mt-4 flex flex-wrap items-center justify-center gap-2">
          <Link href="/start" className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#1D1D1D] text-white text-[11px] font-semibold hover:bg-[#2a2a2a] transition-colors shadow-sm">
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
