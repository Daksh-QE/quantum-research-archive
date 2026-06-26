import { Module } from "./types";

export const curriculum: Module[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 1 — FOUNDATIONS (6 modules, ~48 lessons)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "01-mathematical-foundations-i",
    title: "01. Mathematical Foundations I — Linear Algebra & Complex Numbers",
    description:
      "The essential mathematical language of quantum mechanics: vector spaces, matrices, inner products, eigenvalues, tensor products, complex numbers, Hilbert spaces, and Dirac notation.",
    lessons: [
      {
        id: "01a-vectors-intro",
        title: "Vectors: What Even Are They?",
        type: "video",
        url: "https://www.youtube.com/watch?v=fNk_zzaMoSs",
      },
      {
        id: "01b-linear-combinations",
        title: "Linear Combinations, Span, and Basis Vectors",
        type: "video",
        url: "https://www.youtube.com/watch?v=k7RM-ot2NWY",
      },
      {
        id: "01c-matrices-transformations",
        title: "Matrices as Linear Transformations",
        type: "video",
        url: "https://www.youtube.com/watch?v=kYB8IZa5AuE",
      },
      {
        id: "01d-matrix-multiplication",
        title: "Matrix Multiplication as Composition",
        type: "video",
        url: "https://www.youtube.com/watch?v=XkY2DOUCWMU",
      },
      {
        id: "01e-inverse-matrices",
        title: "Inverse Matrices, Column Space, and Null Space",
        type: "video",
        url: "https://www.youtube.com/watch?v=uQhTuRlWMxw",
      },
      {
        id: "01f-determinant",
        title: "The Determinant and Its Geometric Meaning",
        type: "video",
        url: "https://www.youtube.com/watch?v=Ip3X9LOh2dk",
      },
      {
        id: "01g-eigenvectors",
        title: "Eigenvectors and Eigenvalues",
        type: "video",
        url: "https://www.youtube.com/watch?v=PFDu9oVAE-g",
      },
      {
        id: "01h-complex-numbers",
        title: "Complex Numbers: A Complete Introduction",
        type: "video",
        url: "https://www.youtube.com/watch?v=SP-YJe7Vldo",
      },
      {
        id: "01i-dirac-notation",
        title: "Dirac (Bra-Ket) Notation Explained",
        type: "notes",
        url: "https://www.youtube.com/watch?v=Qgl4Q8J3VFA",
      },
      {
        id: "01j-tensor-products",
        title: "Tensor Products and Multi-partite Vector Spaces",
        type: "guide",
        url: "https://www.youtube.com/watch?v=QcL1H47l6SE",
      },
    ],
  },
  {
    id: "02-mathematical-foundations-ii",
    title: "02. Mathematical Foundations II — Probability, Statistics & Group Theory",
    description:
      "Probability theory, Bayes' theorem, random variables, group theory basics, Lie algebras, representation theory, Fourier analysis, and stochastic processes used in quantum mechanics.",
    lessons: [
      {
        id: "02a-probability-basics",
        title: "Probability Theory: Axioms, Random Variables, Distributions",
        type: "video",
        url: "https://www.youtube.com/watch?v=j9W9wB5Y1nU",
      },
      {
        id: "02b-bayes-theorem",
        title: "Bayes' Theorem and Conditional Probability",
        type: "video",
        url: "https://www.youtube.com/watch?v=HZGCoVF3YvM",
      },
      {
        id: "02c-group-theory",
        title: "Group Theory for Physicists: Symmetries and Transformations",
        type: "video",
        url: "https://www.youtube.com/watch?v=U3JRmX7GjtI",
      },
      {
        id: "02d-lie-groups",
        title: "Lie Groups and Lie Algebras: An Introduction",
        type: "video",
        url: "https://www.youtube.com/watch?v=kpeP3ioiH0I",
      },
      {
        id: "02e-representation-theory",
        title: "Representation Theory: How Groups Act on Vector Spaces",
        type: "video",
        url: "https://www.youtube.com/watch?v=9D0Qf7q_9Tg",
      },
      {
        id: "02f-fourier-analysis",
        title: "Fourier Transforms and Harmonic Analysis",
        type: "video",
        url: "https://www.youtube.com/watch?v=spUNpyF58BY",
      },
      {
        id: "02g-stochastic-processes",
        title: "Stochastic Processes and Random Walks in Physics",
        type: "notes",
        url: "https://ocw.mit.edu/courses/18-445-introduction-to-stochastic-processes-spring-2015/",
      },
      {
        id: "02h-spectral-theorem",
        title: "The Spectral Theorem and Its Physical Meaning",
        type: "video",
        url: "https://www.youtube.com/watch?v=8CCFP9lLmG8",
      },
    ],
  },
  {
    id: "03-classical-physics",
    title: "03. Classical Physics — Mechanics & Electromagnetism Prerequisites",
    description:
      "Foundational classical physics needed for quantum mechanics: Lagrangian and Hamiltonian mechanics, harmonic oscillators, wave equation, Maxwell's equations, electromagnetic waves, and classical information theory.",
    lessons: [
      {
        id: "03a-lagrangian-mechanics",
        title: "Lagrangian Mechanics: Principle of Least Action",
        type: "video",
        url: "https://www.youtube.com/watch?v=Qhm4b9J3SJA",
      },
      {
        id: "03b-hamiltonian-mechanics",
        title: "Hamiltonian Mechanics: Phase Space and Canonical Equations",
        type: "video",
        url: "https://www.youtube.com/watch?v=PiR-2NdfRUk",
      },
      {
        id: "03c-harmonic-oscillator",
        title: "The Harmonic Oscillator — From Classical to Quantum",
        type: "video",
        url: "https://www.youtube.com/watch?v=0fZh2Z7CXHo",
      },
      {
        id: "03d-wave-equation",
        title: "The Wave Equation and Its Solutions",
        type: "video",
        url: "https://www.youtube.com/watch?v=JR0bKqo0HL4",
      },
      {
        id: "03e-maxwell-equations",
        title: "Maxwell's Equations and Electromagnetic Waves",
        type: "video",
        url: "https://www.youtube.com/watch?v=QN0SbU2HOM0",
      },
      {
        id: "03f-classical-info-theory",
        title: "Classical Information Theory: Entropy and Communication",
        type: "video",
        url: "https://www.youtube.com/watch?v=9D0Qf7q_9Tg",
      },
    ],
  },
  {
    id: "04-quantum-mechanics-i",
    title: "04. Quantum Mechanics I — Postulates & Wave Mechanics",
    description:
      "The foundation of quantum theory: Stern-Gerlach experiment, wave-particle duality, the wavefunction, Schrödinger equation, potential wells, the quantum harmonic oscillator, the postulates of quantum mechanics, measurement, expectation values, and commutation relations.",
    lessons: [
      {
        id: "04a-stern-gerlach",
        title: "The Stern-Gerlach Experiment: Quantization of Spin",
        type: "video",
        url: "https://www.youtube.com/watch?v=AcG9hQZusYo",
      },
      {
        id: "04b-wave-particle-duality",
        title: "Wave-Particle Duality: Double-Slit Experiment",
        type: "video",
        url: "https://www.youtube.com/watch?v=8nYH-wEuKOs",
      },
      {
        id: "04c-wavefunctions",
        title: "The Wavefunction and the Born Rule",
        type: "video",
        url: "https://www.youtube.com/watch?v=Q9vP4jVsLtA",
      },
      {
        id: "04d-schrodinger-equation",
        title: "The Schrödinger Equation: Derivation and Meaning",
        type: "video",
        url: "https://www.youtube.com/watch?v=SZJw2R0q4rI",
      },
      {
        id: "04e-infinite-square-well",
        title: "Infinite Square Well: Quantized Energy Levels",
        type: "video",
        url: "https://www.youtube.com/watch?v=7LCpb-ACwYM",
      },
      {
        id: "04f-harmonic-oscillator-qm",
        title: "Quantum Harmonic Oscillator: Raising and Lowering Operators",
        type: "video",
        url: "https://www.youtube.com/watch?v=McQxS9MkYp8",
      },
      {
        id: "04g-postulates-qm",
        title: "The Four Postulates of Quantum Mechanics",
        type: "notes",
        url: "https://www.youtube.com/watch?v=kRmHl2W1z3M",
      },
      {
        id: "04h-expectation-values",
        title: "Expectation Values and Operators",
        type: "video",
        url: "https://www.youtube.com/watch?v=b-5Z1w1U7M4",
      },
      {
        id: "04i-commutation-relations",
        title: "Commutation Relations and the Uncertainty Principle",
        type: "tutorial",
        url: "https://www.youtube.com/watch?v=MBnnXbOM5S4",
      },
      {
        id: "04j-uncertainty-principle",
        title: "Heisenberg Uncertainty Principle: Proof and Applications",
        type: "video",
        url: "https://www.youtube.com/watch?v=7vc-kbXJ1EM",
      },
    ],
  },
  {
    id: "05-quantum-mechanics-ii",
    title: "05. Quantum Mechanics II — Operators, Spin & Angular Momentum",
    description:
      "Linear and Hermitian operators, spin-½ systems, Pauli matrices, orbital angular momentum, addition of angular momentum, Clebsch-Gordan coefficients, and the hydrogen atom.",
    lessons: [
      {
        id: "05a-linear-operators",
        title: "Linear Operators in Hilbert Space",
        type: "guide",
        url: "https://www.youtube.com/watch?v=yDgq6Md5sOA",
      },
      {
        id: "05b-hermitian-operators",
        title: "Hermitian Operators and Observables",
        type: "video",
        url: "https://www.youtube.com/watch?v=yDgq6Md5sOA",
      },
      {
        id: "05c-spin-half",
        title: "Spin-½ Systems and the Pauli Matrices",
        type: "video",
        url: "https://www.youtube.com/watch?v=6VFIxW2EfpI",
      },
      {
        id: "05d-pauli-matrices",
        title: "Pauli Matrices: Properties and Physical Meaning",
        type: "guide",
        url: "https://www.youtube.com/watch?v=Jj6S70G7DwE",
      },
      {
        id: "05e-angular-momentum",
        title: "Orbital Angular Momentum Operators",
        type: "video",
        url: "https://www.youtube.com/watch?v=ZTNip78Uv6U",
      },
      {
        id: "05f-addition-angular-momentum",
        title: "Addition of Angular Momentum and Clebsch-Gordan Coefficients",
        type: "video",
        url: "https://www.youtube.com/watch?v=0J-g0bD76BU",
      },
      {
        id: "05g-hydrogen-atom",
        title: "The Hydrogen Atom: Radial and Angular Solutions",
        type: "video",
        url: "https://www.youtube.com/watch?v=8EJF4JMEiGc",
      },
      {
        id: "05h-selection-rules",
        title: "Selection Rules and Matrix Elements",
        type: "notes",
        url: "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/",
      },
    ],
  },
  {
    id: "06-quantum-mechanics-iii",
    title: "06. Quantum Mechanics III — Approximation Methods & Scattering",
    description:
      "Time-independent and time-dependent perturbation theory, variational method, WKB approximation, scattering theory, and the physics of identical particles.",
    lessons: [
      {
        id: "06a-time-independent-perturbation",
        title: "Time-Independent Perturbation Theory (Non-Degenerate)",
        type: "video",
        url: "https://www.youtube.com/watch?v=dXdWXoMEoJw",
      },
      {
        id: "06b-degenerate-perturbation",
        title: "Degenerate Perturbation Theory and the Stark Effect",
        type: "video",
        url: "https://www.youtube.com/watch?v=Iz0b2dKQkYI",
      },
      {
        id: "06c-time-dependent-perturbation",
        title: "Time-Dependent Perturbation Theory and Fermi's Golden Rule",
        type: "video",
        url: "https://www.youtube.com/watch?v=QdvA3jCFjWo",
      },
      {
        id: "06d-variational-method",
        title: "The Variational Method: Estimating Ground State Energies",
        type: "video",
        url: "https://www.youtube.com/watch?v=YFysluZVjYg",
      },
      {
        id: "06e-wkb-approximation",
        title: "The WKB Approximation: Semiclassical Quantum Mechanics",
        type: "video",
        url: "https://www.youtube.com/watch?v=UFMx_kKn7I0",
      },
      {
        id: "06f-identical-particles",
        title: "Identical Particles, Bosons, and Fermions",
        type: "video",
        url: "https://www.youtube.com/watch?v=UZ3To3bKInE",
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 2 — CORE QUANTUM COMPUTING (5 modules, ~42 lessons)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "07-qubits-gates",
    title: "07. Qubits & Quantum Gates",
    description:
      "The qubit, Bloch sphere representation, single-qubit gates (X, Y, Z, H, S, T), multi-qubit states, controlled gates (CNOT, Toffoli, SWAP), universal gate sets, gate decomposition, and the Solovay-Kitaev theorem.",
    lessons: [
      {
        id: "07a-qubit-intro",
        title: "The Qubit: A Two-Level Quantum System",
        type: "video",
        url: "https://www.youtube.com/watch?v=zN7Y1Xyq7_s",
      },
      {
        id: "07b-bloch-sphere",
        title: "The Bloch Sphere: Visualizing Qubit States",
        type: "video",
        url: "https://www.youtube.com/watch?v=z5hXqIBClfs",
      },
      {
        id: "07c-single-qubit-gates",
        title: "Single-Qubit Gates: Pauli, Hadamard, Phase, and T Gates",
        type: "tutorial",
        url: "https://learn.qiskit.org/course/ch-states/single-qubit-gates",
      },
      {
        id: "07d-multi-qubit-states",
        title: "Multi-Qubit States and Entanglement",
        type: "video",
        url: "https://www.youtube.com/watch?v=aiJq52x3LCs",
      },
      {
        id: "07e-cnot-gate",
        title: "The CNOT Gate: Creating Entanglement in Circuits",
        type: "tutorial",
        url: "https://learn.qiskit.org/course/ch-gates/introduction",
      },
      {
        id: "07f-toffoli-swap",
        title: "Toffoli, Fredkin, and SWAP Gates",
        type: "guide",
        url: "https://www.youtube.com/watch?v=QW1a0cHh6qA",
      },
      {
        id: "07g-universal-gate-sets",
        title: "Universal Gate Sets and Approximation",
        type: "notes",
        url: "https://www.youtube.com/watch?v=QW1a0cHh6qA",
      },
      {
        id: "07h-solovay-kitaev",
        title: "The Solovay-Kitaev Theorem: Efficient Gate Approximation",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/0505030",
      },
    ],
  },
  {
    id: "08-quantum-circuits",
    title: "08. Quantum Circuits & Protocols",
    description:
      "The circuit model of computation, quantum teleportation, superdense coding, Deutsch's algorithm circuit, circuit optimization, reversible computation, measurement-based quantum computing, and cluster states.",
    lessons: [
      {
        id: "08a-circuit-model",
        title: "Introduction to the Quantum Circuit Model",
        type: "video",
        url: "https://www.youtube.com/watch?v=6aEkjJ8wYQY",
      },
      {
        id: "08b-quantum-teleportation",
        title: "Quantum Teleportation: How It Works",
        type: "video",
        url: "https://www.youtube.com/watch?v=Hu1BZ5U4HT0",
      },
      {
        id: "08c-superdense-coding",
        title: "Superdense Coding Protocol",
        type: "video",
        url: "https://www.youtube.com/watch?v=HbWZfD6-XMg",
      },
      {
        id: "08d-deutsch-circuit",
        title: "Deutsch's Algorithm: The First Quantum Advantage",
        type: "tutorial",
        url: "https://learn.qiskit.org/course/ch-algorithms/deutsch-jozsa-algorithm",
      },
      {
        id: "08e-circuit-optimization",
        title: "Quantum Circuit Optimization and Compilation",
        type: "guide",
        url: "https://www.youtube.com/watch?v=AxNjjzCQodk",
      },
      {
        id: "08f-reversible-computation",
        title: "Reversible Computation: Landauer's Principle",
        type: "video",
        url: "https://www.youtube.com/watch?v=HzZ3G6mskqQ",
      },
      {
        id: "08g-measurement-based-qc",
        title: "Measurement-Based Quantum Computing (One-Way QC)",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/0301052",
      },
      {
        id: "08h-cluster-states",
        title: "Cluster States and Graph States",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/0502097",
      },
    ],
  },
  {
    id: "09-quantum-algorithms-i",
    title: "09. Quantum Algorithms I — Core Algorithms",
    description:
      "Deutsch-Jozsa, Bernstein-Vazirani, Simon's algorithm, the Quantum Fourier Transform, Quantum Phase Estimation, Grover's search, amplitude amplification, Shor's factoring algorithm, order finding, and the hidden subgroup problem.",
    lessons: [
      {
        id: "09a-deutsch-jozsa",
        title: "Deutsch-Jozsa Algorithm: Exponential Speedup",
        type: "video",
        url: "https://www.youtube.com/watch?v=WpGbB6m1s0w",
      },
      {
        id: "09b-bernstein-vazirani",
        title: "Bernstein-Vazirani Algorithm",
        type: "guide",
        url: "https://learn.qiskit.org/course/ch-algorithms/bernstein-vazirani-algorithm",
      },
      {
        id: "09c-simons-algorithm",
        title: "Simon's Algorithm: Period Finding",
        type: "video",
        url: "https://www.youtube.com/watch?v=2US4rDp2Zjs",
      },
      {
        id: "09d-quantum-fourier-transform",
        title: "The Quantum Fourier Transform: Circuit and Applications",
        type: "video",
        url: "https://www.youtube.com/watch?v=wV8GzN4p-kM",
      },
      {
        id: "09e-phase-estimation",
        title: "Quantum Phase Estimation Algorithm",
        type: "tutorial",
        url: "https://learn.qiskit.org/course/ch-algorithms/quantum-phase-estimation",
      },
      {
        id: "09f-grovers-search",
        title: "Grover's Search Algorithm: Quadratic Speedup",
        type: "video",
        url: "https://www.youtube.com/watch?v=0RPFWmgc-4Y",
      },
      {
        id: "09g-amplitude-amplification",
        title: "Amplitude Amplification: Generalizing Grover",
        type: "notes",
        url: "https://www.youtube.com/watch?v=-mM4uqDfCm4",
      },
      {
        id: "09h-shors-algorithm",
        title: "Shor's Factoring Algorithm: The Full Circuit",
        type: "video",
        url: "https://www.youtube.com/watch?v=MWkU3cE3lA0",
      },
      {
        id: "09i-order-finding",
        title: "Order Finding and the Hidden Subgroup Problem",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/9708016",
      },
      {
        id: "09j-hidden-subgroup",
        title: "The Hidden Subgroup Problem: Framework for Quantum Algorithms",
        type: "guide",
        url: "https://www.youtube.com/watch?v=oU8IZt0j7lg",
      },
    ],
  },
  {
    id: "10-quantum-algorithms-ii",
    title: "10. Quantum Algorithms II — Advanced & Variational Algorithms",
    description:
      "Variational Quantum Eigensolver (VQE), Quantum Approximate Optimization Algorithm (QAOA), HHL algorithm for linear systems, quantum random walks, Trotterization and Hamiltonian simulation, quantum optimization, and tensor networks.",
    lessons: [
      {
        id: "10a-vqe-intro",
        title: "Variational Quantum Eigensolver: Principles and Implementation",
        type: "tutorial",
        url: "https://learn.qiskit.org/course/ch-applications/variational-quantum-eigensolver",
      },
      {
        id: "10b-qaoa",
        title: "QAOA: Quantum Approximate Optimization Algorithm",
        type: "paper",
        url: "https://arxiv.org/abs/1411.4028",
      },
      {
        id: "10c-hhl-algorithm",
        title: "The HHL Algorithm: Quantum Linear Systems",
        type: "video",
        url: "https://www.youtube.com/watch?v=c6GRfqGVMic",
      },
      {
        id: "10d-quantum-random-walks",
        title: "Quantum Random Walks and Their Speedups",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/0303081",
      },
      {
        id: "10e-hamiltonian-simulation",
        title: "Hamiltonian Simulation via Trotterization",
        type: "guide",
        url: "https://www.youtube.com/watch?v=2pzlKkXn2dA",
      },
      {
        id: "10f-trotter-decomposition",
        title: "Trotter-Suzuki Decomposition and Higher-Order Methods",
        type: "tutorial",
        url: "https://pennylane.ai/qml/demos/tutorial_hamiltonian_simulate",
      },
      {
        id: "10g-quantum-optimization",
        title: "Quantum Optimization: QUBO and Ising Models",
        type: "video",
        url: "https://www.youtube.com/watch?v=8Xo2YHWZn1s",
      },
      {
        id: "10h-tensor-networks",
        title: "Tensor Networks: MPS, PEPS, and MERA",
        type: "video",
        url: "https://www.youtube.com/watch?v=9D0Qf7q_9Tg",
      },
    ],
  },
  {
    id: "11-quantum-information-theory",
    title: "11. Quantum Information Theory",
    description:
      "Von Neumann entropy, quantum channels and Kraus operators, the Holevo bound, accessible information, quantum channel capacity, the Lloyd-Shor-Devetak theorem, the no-cloning theorem, and quantum data compression.",
    lessons: [
      {
        id: "11a-von-neumann-entropy",
        title: "Von Neumann Entropy: Quantum Information Measure",
        type: "video",
        url: "https://www.youtube.com/watch?v=7Dd0-9F0lNY",
      },
      {
        id: "11b-quantum-channels",
        title: "Quantum Channels and the Operator-Sum Representation",
        type: "notes",
        url: "https://www.youtube.com/watch?v=7Dd0-9F0lNY",
      },
      {
        id: "11c-kraus-operators",
        title: "Kraus Operators: The Most General Quantum Evolution",
        type: "video",
        url: "https://www.youtube.com/watch?v=W2J4iM0d9wo",
      },
      {
        id: "11d-holevo-bound",
        title: "The Holevo Bound: Limits on Accessible Information",
        type: "video",
        url: "https://www.youtube.com/watch?v=LfWfD4I5hOs",
      },
      {
        id: "11e-channel-capacity",
        title: "Quantum Channel Capacity and the LSD Theorem",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/0301108",
      },
      {
        id: "11f-no-cloning",
        title: "The No-Cloning Theorem and Its Consequences",
        type: "video",
        url: "https://www.youtube.com/watch?v=MT9wjM4GbkM",
      },
      {
        id: "11g-quantum-data-compression",
        title: "Quantum Data Compression and Schumacher's Theorem",
        type: "guide",
        url: "https://en.wikipedia.org/wiki/John_Preskill",
      },
      {
        id: "11h-shannon-vs-von-neumann",
        title: "Shannon vs Von Neumann Entropy: Classical and Quantum",
        type: "notes",
        url: "https://www.youtube.com/watch?v=7Dd0-9F0lNY",
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 3 — ADVANCED TOPICS (5 modules, ~38 lessons)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "12-quantum-error-correction-i",
    title: "12. Quantum Error Correction I — Codes & Stabilizers",
    description:
      "Classical error correction review, the 3-qubit bit-flip code, the Shor 9-qubit code, the Steane [[7,1,3]] code, the stabilizer formalism, the Gottesman-Knill theorem, CSS codes, and logical gate operations on encoded states.",
    lessons: [
      {
        id: "12a-classical-ec",
        title: "Classical Error Correction: Repetition and Hamming Codes",
        type: "video",
        url: "https://www.youtube.com/watch?v=0jMfCdZ_f8Q",
      },
      {
        id: "12b-3-qubit-code",
        title: "The 3-Qubit Bit-Flip and Phase-Flip Codes",
        type: "guide",
        url: "https://www.youtube.com/watch?v=G7DHbkEJcYU",
      },
      {
        id: "12c-shor-9-qubit",
        title: "The Shor 9-Qubit Code: Correcting Any Single Error",
        type: "video",
        url: "https://www.youtube.com/watch?v=3f2D3H4D5Z4",
      },
      {
        id: "12d-steane-7-qubit",
        title: "The Steane [[7,1,3]] Code",
        type: "notes",
        url: "https://www.youtube.com/watch?v=3VgFNjRmGrU",
      },
      {
        id: "12e-stabilizer-formalism",
        title: "The Stabilizer Formalism: Pauli Group and Stabilizers",
        type: "video",
        url: "https://www.youtube.com/watch?v=3VgFNjRmGrU",
      },
      {
        id: "12f-gottesman-knill",
        title: "The Gottesman-Knill Theorem: Classical Simulation of Stabilizer Circuits",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/9807006",
      },
      {
        id: "12g-css-codes",
        title: "CSS Codes: Calderbank-Shor-Steane Construction",
        type: "guide",
        url: "https://www.youtube.com/watch?v=3VgFNjRmGrU",
      },
      {
        id: "12h-logical-gates",
        title: "Logical Gate Operations on Encoded Qubits",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/0110143",
      },
    ],
  },
  {
    id: "13-quantum-error-correction-ii",
    title: "13. Quantum Error Correction II — Fault-Tolerance & Surface Codes",
    description:
      "Surface codes, toric codes, color codes, error thresholds, fault-tolerant gate design, magic state distillation, the threshold theorem, and lattice surgery for logical operations.",
    lessons: [
      {
        id: "13a-surface-codes-intro",
        title: "Surface Codes: A 2D Lattice of Qubits",
        type: "paper",
        url: "https://arxiv.org/abs/1208.0928",
      },
      {
        id: "13b-toric-codes",
        title: "Toric Codes on the Torus and Their Properties",
        type: "video",
        url: "https://www.youtube.com/watch?v=2Zq0Lmjq0zI",
      },
      {
        id: "13c-color-codes",
        title: "Color Codes: A Family of Topological Codes",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/0605134",
      },
      {
        id: "13d-error-thresholds",
        title: "Error Thresholds and the Surface Code Threshold Theorem",
        type: "guide",
        url: "https://www.youtube.com/watch?v=2Zq0Lmjq0zI",
      },
      {
        id: "13e-fault-tolerant-gates",
        title: "Fault-Tolerant Gate Design: Transversal Gates and Code Deformation",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/9807006",
      },
      {
        id: "13f-magic-state-distillation",
        title: "Magic State Distillation for Universal Fault-Tolerant QC",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/0403025",
      },
      {
        id: "13g-threshold-theorem",
        title: "The Quantum Threshold Theorem: Accuracy Threshold for FTQC",
        type: "video",
        url: "https://www.youtube.com/watch?v=O_DwUOWwGXg",
      },
      {
        id: "13h-lattice-surgery",
        title: "Lattice Surgery: Joining and Splitting Surface Codes",
        type: "paper",
        url: "https://arxiv.org/abs/1111.4022",
      },
    ],
  },
  {
    id: "14-quantum-complexity",
    title: "14. Quantum Complexity Theory",
    description:
      "Complexity classes BQP and QMA, quantum query complexity, oracle separations, relation between classical and quantum complexity, quantum interactive proofs, non-locality, and Bell inequalities.",
    lessons: [
      {
        id: "14a-bqp-complexity",
        title: "BQP: Bounded-Error Quantum Polynomial Time",
        type: "video",
        url: "https://www.youtube.com/watch?v=4VSe4wtL3i0",
      },
      {
        id: "14b-qma-complexity",
        title: "QMA: Quantum Merlin-Arthur Proofs",
        type: "notes",
        url: "https://www.scottaaronson.com/",
      },
      {
        id: "14c-query-complexity",
        title: "Quantum Query Complexity and Grover's Optimality",
        type: "guide",
        url: "https://www.youtube.com/watch?v=8Xo2YHWZn1s",
      },
      {
        id: "14d-oracle-separation",
        title: "Oracle Separation Results: Bernstein-Vazirani and Beyond",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/9701001",
      },
      {
        id: "14e-bell-inequalities",
        title: "Bell's Theorem and Non-Locality: Experimental Tests",
        type: "video",
        url: "https://www.youtube.com/watch?v=zN7Y1Xyq7_s",
      },
      {
        id: "14f-quantum-interactive-proofs",
        title: "Quantum Interactive Proofs and QIP = PSPACE",
        type: "paper",
        url: "https://arxiv.org/abs/0907.4737",
      },
    ],
  },
  {
    id: "15-quantum-cryptography",
    title: "15. Quantum Cryptography & Communication",
    description:
      "BB84 and E91 quantum key distribution protocols, security proofs for QKD, device-independent QKD, quantum digital signatures, quantum secret sharing, position-based quantum cryptography, and post-quantum cryptography.",
    lessons: [
      {
        id: "15a-bb84-protocol",
        title: "BB84: Bennett-Brassard 1984 QKD Protocol",
        type: "video",
        url: "https://www.youtube.com/watch?v=Q9Pv4jVsLtA",
      },
      {
        id: "15b-e91-protocol",
        title: "E91: Ekert's Entanglement-Based QKD",
        type: "video",
        url: "https://www.youtube.com/watch?v=r5SgiqY8Q9s",
      },
      {
        id: "15c-qkd-security",
        title: "Security Proofs for Quantum Key Distribution",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/0303055",
      },
      {
        id: "15d-device-independent-qkd",
        title: "Device-Independent Quantum Key Distribution",
        type: "paper",
        url: "https://arxiv.org/abs/1110.3802",
      },
      {
        id: "15e-quantum-digital-signatures",
        title: "Quantum Digital Signatures",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/0106098",
      },
      {
        id: "15f-quantum-secret-sharing",
        title: "Quantum Secret Sharing: Splitting Secrets Among Parties",
        type: "guide",
        url: "https://www.youtube.com/watch?v=lQ4Tj4F5I6Y",
      },
      {
        id: "15g-post-quantum-crypto",
        title: "Post-Quantum Cryptography: Classical Alternatives",
        type: "video",
        url: "https://www.youtube.com/watch?v=K5BK9uR1l5c",
      },
      {
        id: "15h-quantum-crypto-hardware",
        title: "Practical QKD Systems and Satellite Quantum Communication",
        type: "video",
        url: "https://www.youtube.com/watch?v=JhXwU7FWd34",
      },
    ],
  },
  {
    id: "16-quantum-machine-learning",
    title: "16. Quantum Machine Learning",
    description:
      "Quantum neural networks, variational quantum machine learning, quantum kernel methods, quantum embeddings, quantum generative models, quantum reinforcement learning, barren plateaus, and near-term QML applications.",
    lessons: [
      {
        id: "16a-qml-intro",
        title: "Introduction to Quantum Machine Learning",
        type: "video",
        url: "https://www.youtube.com/watch?v=8P2P6e7hLzs",
      },
      {
        id: "16b-variational-qml",
        title: "Variational Quantum Circuits for Machine Learning",
        type: "tutorial",
        url: "https://pennylane.ai/qml/demos/tutorial_variational_classifier",
      },
      {
        id: "16c-quantum-kernels",
        title: "Quantum Kernel Methods: An Introduction",
        type: "guide",
        url: "https://pennylane.ai/qml/demos/tutorial_kernels_module",
      },
      {
        id: "16d-quantum-embeddings",
        title: "Quantum Feature Maps and Data Embedding",
        type: "paper",
        url: "https://arxiv.org/abs/1804.11326",
      },
      {
        id: "16e-quantum-generative-models",
        title: "Quantum Generative Adversarial Networks (QGANs)",
        type: "paper",
        url: "https://arxiv.org/abs/1804.09139",
      },
      {
        id: "16f-quantum-reinforcement-learning",
        title: "Quantum Reinforcement Learning",
        type: "paper",
        url: "https://arxiv.org/abs/2204.03615",
      },
      {
        id: "16g-barren-plateaus",
        title: "Barren Plateaus: The Trainability Problem in QML",
        type: "paper",
        url: "https://arxiv.org/abs/1803.11173",
      },
      {
        id: "16h-qml-applications",
        title: "Near-Term Applications of Quantum Machine Learning",
        type: "video",
        url: "https://www.youtube.com/watch?v=8P2P6e7hLzs",
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 4 — PHYSICAL IMPLEMENTATION (4 modules, ~26 lessons)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "17-superconducting-qubits",
    title: "17. Superconducting Qubits & Circuit QED",
    description:
      "LC oscillators, Josephson junctions, transmon qubits, charge/flux/phase qubits, circuit quantum electrodynamics (cQED), dispersive readout, gate implementation, and coherence/decoherence mechanisms in superconducting qubits.",
    lessons: [
      {
        id: "17a-lc-oscillator",
        title: "The LC Oscillator: Quantum Mechanical Treatment",
        type: "video",
        url: "https://www.youtube.com/watch?v=9g0Uu2BIDCQ",
      },
      {
        id: "17b-josephson-junction",
        title: "The Josephson Junction: The Nonlinear Element for Qubits",
        type: "video",
        url: "https://www.youtube.com/watch?v=QNvxTj2D3eg",
      },
      {
        id: "17c-transmon-qubit",
        title: "The Transmon Qubit: Design and Operation",
        type: "paper",
        url: "https://arxiv.org/abs/0902.3461",
      },
      {
        id: "17d-charge-flux-phase-qubits",
        title: "Charge, Flux, and Phase Qubits: A Comparison",
        type: "guide",
        url: "https://www.youtube.com/watch?v=D1TjOq4pFp0",
      },
      {
        id: "17e-circuit-qed",
        title: "Circuit QED: Cavity Quantum Electrodynamics on a Chip",
        type: "paper",
        url: "https://arxiv.org/abs/0812.4214",
      },
      {
        id: "17f-dispersive-readout",
        title: "Dispersive Readout of Superconducting Qubits",
        type: "guide",
        url: "https://www.youtube.com/watch?v=5kY34b6JOe4",
      },
      {
        id: "17g-coherence-decoherence",
        title: "Coherence Times, T1 and T2: Understanding Decoherence",
        type: "paper",
        url: "https://arxiv.org/abs/1904.06560",
      },
      {
        id: "17h-gate-implementation",
        title: "Implementing Gates on Superconducting Processors",
        type: "tutorial",
        url: "https://www.youtube.com/watch?v=W_YkH6ldXqE",
      },
    ],
  },
  {
    id: "18-trapped-ions-photonic",
    title: "18. Trapped Ions & Photonic Qubits",
    description:
      "Ion trap fundamentals, laser cooling, hyperfine qubits, the Mølmer-Sørensen gate, photonic qubits using polarization and time-bin encoding, linear optics quantum computing, and photonic cluster states.",
    lessons: [
      {
        id: "18a-ion-trap-fundamentals",
        title: "Ion Trap Fundamentals: The Paul Trap and RF Confinement",
        type: "video",
        url: "https://www.youtube.com/watch?v=Gxv3j_BoXJU",
      },
      {
        id: "18b-laser-cooling",
        title: "Laser Cooling: Doppler and Resolved Sideband Cooling",
        type: "video",
        url: "https://www.youtube.com/watch?v=NhuvXJj29jM",
      },
      {
        id: "18c-hyperfine-qubits",
        title: "Hyperfine Qubits in Trapped Ions",
        type: "guide",
        url: "https://www.youtube.com/watch?v=o4oV-YFp4T8",
      },
      {
        id: "18d-molmer-sorensen-gate",
        title: "The Mølmer-Sørensen Gate: Two-Qubit Gates with Ions",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/0001038",
      },
      {
        id: "18e-photonic-qubits",
        title: "Photonic Qubits: Polarization, Time-Bin, and Path Encoding",
        type: "video",
        url: "https://www.youtube.com/watch?v=O_W0b_S3z0w",
      },
      {
        id: "18f-linear-optics-qc",
        title: "Linear Optics Quantum Computing: KLM Protocol",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/0106089",
      },
    ],
  },
  {
    id: "19-topological-quantum-computing",
    title: "19. Topological Quantum Computing",
    description:
      "Anyons and braiding statistics, Fibonacci anyons, the Kitaev toric code, Majorana fermions as quasiparticles, topological qubits, Microsoft's topological approach, and measurement-only topological quantum computing.",
    lessons: [
      {
        id: "19a-anyons-braiding",
        title: "Anyons and Braiding: Beyond Bosons and Fermions",
        type: "video",
        url: "https://www.youtube.com/watch?v=A9IPgHONaCM",
      },
      {
        id: "19b-fibonacci-anyons",
        title: "Fibonacci Anyons and Universal Topological QC",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/9707021",
      },
      {
        id: "19c-kitaev-toric-code",
        title: "The Kitaev Toric Code: A Topological Error-Correcting Code",
        type: "video",
        url: "https://www.youtube.com/watch?v=KpYMIRFEJqA",
      },
      {
        id: "19d-majorana-fermions",
        title: "Majorana Fermions in Quantum Computation",
        type: "paper",
        url: "https://arxiv.org/abs/1208.0928",
      },
      {
        id: "19e-topological-qubits-microsoft",
        title: "Microsoft's Topological Qubit Approach",
        type: "guide",
        url: "https://learn.microsoft.com/en-us/azure/quantum/overview-algebra",
      },
      {
        id: "19f-measurement-only-tqc",
        title: "Measurement-Only Topological Quantum Computation",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/0611036",
      },
    ],
  },
  {
    id: "20-quantum-hardware-engineering",
    title: "20. Quantum Hardware Engineering & Noise",
    description:
      "Noise sources and characterization, randomized benchmarking, quantum volume as a benchmark, error mitigation techniques (zero-noise extrapolation, Pauli twirling), cryogenics and control electronics, qubit fabrication, and scalability challenges.",
    lessons: [
      {
        id: "20a-noise-characterization",
        title: "Noise Characterization: T1, T2, and Gate Fidelity",
        type: "guide",
        url: "https://www.youtube.com/watch?v=5kY34b6JOe4",
      },
      {
        id: "20b-randomized-benchmarking",
        title: "Randomized Benchmarking: Measuring Gate Fidelities",
        type: "paper",
        url: "https://arxiv.org/abs/1109.4023",
      },
      {
        id: "20c-quantum-volume",
        title: "Quantum Volume: A Comprehensive Hardware Benchmark",
        type: "guide",
        url: "https://research.ibm.com/blog/quantum-volume-64-processor",
      },
      {
        id: "20d-error-mitigation",
        title: "Error Mitigation: Zero-Noise Extrapolation and Twirling",
        type: "paper",
        url: "https://arxiv.org/abs/2101.08691",
      },
      {
        id: "20e-cryogenics-control",
        title: "Dilution Refrigerators and Control Electronics",
        type: "video",
        url: "https://www.youtube.com/watch?v=ElGsyAgh4-Y",
      },
      {
        id: "20f-scalability-challenges",
        title: "Scalability Challenges: Wiring, Crosstalk, and Integration",
        type: "paper",
        url: "https://arxiv.org/abs/1904.06560",
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 5 — APPLIED & SPECIALIZED (4 modules, ~24 lessons)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "21-quantum-chemistry",
    title: "21. Quantum Simulation & Quantum Chemistry",
    description:
      "Molecular Hamiltonians for quantum chemistry, the Hartree-Fock method, Jordan-Wigner and Bravyi-Kitaev transformations for fermionic systems, VQE for chemistry, phase estimation for chemical accuracy, NISQ-era quantum chemistry, materials science applications, and quantum chemistry software.",
    lessons: [
      {
        id: "21a-molecular-hamiltonians",
        title: "Molecular Hamiltonians: From Born-Oppenheimer to Second Quantization",
        type: "video",
        url: "https://www.youtube.com/watch?v=W5MbjSjB8jA",
      },
      {
        id: "21b-hartree-fock",
        title: "The Hartree-Fock Method as a Starting Point",
        type: "tutorial",
        url: "https://learn.qiskit.org/course/ch-applications/quantum-chemistry",
      },
      {
        id: "21c-jordan-wigner",
        title: "Jordan-Wigner and Bravyi-Kitaev Fermion-to-Qubit Mappings",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/0003137",
      },
      {
        id: "21d-vqe-chemistry",
        title: "VQE for Quantum Chemistry: Computing Ground State Energies",
        type: "tutorial",
        url: "https://learn.qiskit.org/course/ch-applications/variational-quantum-eigensolver",
      },
      {
        id: "21e-phase-estimation-chemistry",
        title: "Phase Estimation for Chemical Accuracy",
        type: "guide",
        url: "https://www.youtube.com/watch?v=2pzlKkXn2dA",
      },
      {
        id: "21f-nisq-chemistry",
        title: "Quantum Chemistry on NISQ Devices: Challenges and Progress",
        type: "paper",
        url: "https://arxiv.org/abs/2101.08448",
      },
      {
        id: "21g-materials-science",
        title: "Quantum Computing for Materials Science",
        type: "video",
        url: "https://www.youtube.com/watch?v=LY_vlDA_rjA",
      },
      {
        id: "21h-software-tools",
        title: "Quantum Chemistry Software: Qiskit Nature, PennyLane, and Cirq",
        type: "tutorial",
        url: "https://pennylane.ai/qml/demos/tutorial_vqe",
      },
    ],
  },
  {
    id: "22-quantum-networking",
    title: "22. Quantum Networks & The Quantum Internet",
    description:
      "Quantum repeaters and entanglement distillation, quantum memory, quantum switch architectures, quantum network protocols, quantum internet architecture, and the vision of a global quantum network.",
    lessons: [
      {
        id: "22a-quantum-repeaters",
        title: "Quantum Repeaters: Overcoming Distance in Quantum Communication",
        type: "paper",
        url: "https://arxiv.org/abs/0905.2795",
      },
      {
        id: "22b-entanglement-distillation",
        title: "Entanglement Distillation: Purifying Noisy Entanglement",
        type: "video",
        url: "https://www.youtube.com/watch?v=Gxv3j_BoXJU",
      },
      {
        id: "22c-quantum-memory",
        title: "Quantum Memory: Storing Quantum Information",
        type: "guide",
        url: "https://www.youtube.com/watch?v=o4oV-YFp4T8",
      },
      {
        id: "22d-quantum-switches",
        title: "Quantum Switch Architectures and Routing",
        type: "paper",
        url: "https://arxiv.org/abs/1901.06732",
      },
      {
        id: "22e-quantum-internet-protocols",
        title: "Quantum Network Protocols: From Teleportation to End-to-End",
        type: "paper",
        url: "https://arxiv.org/abs/1810.06917",
      },
      {
        id: "22f-quantum-internet-vision",
        title: "The Quantum Internet: Architecture and Roadmap",
        type: "video",
        url: "https://www.youtube.com/watch?v=JhXwU7FWd34",
      },
      {
        id: "22g-quantum-entanglement-distribution",
        title: "Entanglement Distribution Over Long Distances",
        type: "paper",
        url: "https://arxiv.org/abs/1810.06917",
      },
      {
        id: "22h-quantum-network-demonstrations",
        title: "Quantum Network Demonstrations: The State of the Art",
        type: "video",
        url: "https://www.youtube.com/watch?v=1zT_gPJ2MLE",
      },
    ],
  },
  {
    id: "23-quantum-sensing",
    title: "23. Quantum Sensing & Metrology",
    description:
      "Quantum metrology basics, the standard quantum limit vs the Heisenberg limit, squeezed states for precision enhancement, NV centers in diamond, atomic clocks, and practical quantum sensing applications.",
    lessons: [
      {
        id: "23a-quantum-metrology-basics",
        title: "Quantum Metrology: Precision Beyond Classical Limits",
        type: "video",
        url: "https://www.youtube.com/watch?v=4VSe4wtL3i0",
      },
      {
        id: "23b-heisenberg-limit",
        title: "The Heisenberg Limit: Ultimate Precision in Quantum Sensing",
        type: "paper",
        url: "https://arxiv.org/abs/1407.8162",
      },
      {
        id: "23c-squeezed-states",
        title: "Squeezed States of Light and Spin Squeezing",
        type: "video",
        url: "https://www.youtube.com/watch?v=mbj3q-eF1vs",
      },
      {
        id: "23d-nv-centers",
        title: "NV Centers in Diamond: Room Temperature Quantum Sensing",
        type: "video",
        url: "https://www.youtube.com/watch?v=Gxv3j_BoXJU",
      },
      {
        id: "23e-atomic-clocks",
        title: "Atomic Clocks: Quantum Metrology at the Frontier",
        type: "video",
        url: "https://www.youtube.com/watch?v=JhXwU7FWd34",
      },
      {
        id: "23f-sensing-applications",
        title: "Quantum Sensing Applications: Magnetometry, Imaging, and Beyond",
        type: "paper",
        url: "https://arxiv.org/abs/1611.02427",
      },
      {
        id: "23g-quantum-radar",
        title: "Quantum Illumination and Quantum Radar",
        type: "paper",
        url: "https://arxiv.org/abs/0810.2299",
      },
    ],
  },
  {
    id: "24-research-frontiers",
    title: "24. Research Frontiers & Open Problems",
    description:
      "The quantum fault-tolerance roadmap, demonstrations of quantum advantage, the frontier of quantum machine learning, key open problems in quantum error correction and algorithms, and where the field is heading.",
    lessons: [
      {
        id: "24a-quantum-fault-tolerance-roadmap",
        title: "The Road to Fault-Tolerant Quantum Computing",
        type: "guide",
        url: "https://www.youtube.com/watch?v=O_DwUOWwGXg",
      },
      {
        id: "24b-quantum-advantage",
        title: "Quantum Advantage: Demonstrations and Challenges",
        type: "paper",
        url: "https://arxiv.org/abs/1910.11333",
      },
      {
        id: "24c-qml-frontier",
        title: "Quantum Machine Learning: What Works and What Doesn't",
        type: "paper",
        url: "https://arxiv.org/abs/2201.08448",
      },
      {
        id: "24d-open-problems",
        title: "Open Problems in Quantum Computing and How to Contribute",
        type: "video",
        url: "https://www.youtube.com/watch?v=8Xo2YHWZn1s",
      },
    ],
  },
];
