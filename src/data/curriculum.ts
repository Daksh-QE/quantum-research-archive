import { Module } from "./types";

export const curriculum: Module[] = [
  // MODULE 0 — QUANTUM IN 10 MINUTES (zero prerequisites)
  {
    id: "00-quantum-in-10-minutes",
    title: "00. Quantum in a Nutshell — A Gentle Introduction",
    description:
      "No math, no prerequisites. A soft-landing introduction to quantum computing with 4 short explainer videos. Start here if you're brand new to quantum.",
    lessons: [
      {
        id: "00-what-is-quantum",
        title: "What is Quantum Computing? (Kurzgesagt)",
        type: "video",
        url: "https://www.youtube.com/watch?v=JhHMJCUmq28",
      },
      {
        id: "00-qubit-explained-ibm",
        title: "The Qubit Explained",
        type: "guide",
        url: "https://quantum.microsoft.com/en-us/insights/education/concepts/what-is-a-qubit",
      },
      {
        id: "00-superposition-minutephysics",
        title: "Quantum Superposition",
        type: "guide",
        url: "https://quantum.microsoft.com/en-us/insights/education/concepts/superposition",
      },
      {
        id: "00-quantum-computing-veritasium",
        title: "How Quantum Computers Work",
        type: "guide",
        url: "https://learn.microsoft.com/en-us/azure/quantum/overview-understanding-quantum-computing",
      },
    ],
  },
  // PHASE 1 — FOUNDATIONS (6 modules, ~48 lessons)
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
        type: "video",
        url: "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/resources/lecture-9-diracs-bra-and-ket-notation/",
      },
      {
        id: "01j-tensor-products",
        title: "Tensor Products and Multi-partite Vector Spaces",
        type: "video",
        url: "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/resources/lecture-19-multiparticle-states-and-tensor-products-cont/",
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
        url: "https://ocw.mit.edu/courses/res-6-012-introduction-to-probability-spring-2018/",
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
        type: "notes",
        url: "https://maths.dur.ac.uk/users/kasper.peeters/pdf/groups.pdf",
      },
      {
        id: "02d-lie-groups",
        title: "Lie Groups and Lie Algebras: An Introduction",
        type: "notes",
        url: "https://arxiv.org/abs/math-ph/0005032",
      },
      {
        id: "02e-representation-theory",
        title: "Representation Theory: How Groups Act on Vector Spaces",
        type: "notes",
        url: "https://www.maths.gla.ac.uk/~abartel/docs/reptheory.pdf",
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
        type: "notes",
        url: "https://arxiv.org/abs/2211.12742",
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
        type: "guide",
        url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/",
      },
      {
        id: "03b-hamiltonian-mechanics",
        title: "Hamiltonian Mechanics: Phase Space and Canonical Equations",
        type: "notes",
        url: "https://live.ocw.mit.edu/courses/8-223-classical-mechanics-ii-january-iap-2017/09ab68ae8e7987debc025892e00c0f1f_MIT8_223IAP17_Lec15.pdf",
      },
      {
        id: "03c-harmonic-oscillator",
        title: "The Harmonic Oscillator — From Classical to Quantum",
        type: "video",
        url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2013/resources/lecture-8/",
      },
      {
        id: "03d-wave-equation",
        title: "The Wave Equation and Its Solutions",
        type: "guide",
        url: "https://tutorial.math.lamar.edu/classes/de/TheWaveEquation.aspx",
      },
      {
        id: "03e-maxwell-equations",
        title: "Maxwell's Equations and Electromagnetic Waves",
        type: "guide",
        url: "https://www.feynmanlectures.caltech.edu/II_18.html",
      },
      {
        id: "03f-classical-info-theory",
        title: "Classical Information Theory: Entropy and Communication",
        type: "notes",
        url: "https://web.stanford.edu/class/ee376a/files/scribes/lecture_notes.pdf",
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
        type: "guide",
        url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/",
      },
      {
        id: "04b-wave-particle-duality",
        title: "Wave-Particle Duality: Double-Slit Experiment",
        type: "guide",
        url: "http://hyperphysics.gsu.edu/hbase/mod1.html",
      },
      {
        id: "04c-wavefunctions",
        title: "The Wavefunction and the Born Rule",
        type: "guide",
        url: "https://plato.stanford.edu/entries/qm/",
      },
      {
        id: "04d-schrodinger-equation",
        title: "The Schrödinger Equation: Derivation and Meaning",
        type: "notes",
        url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/resources/mit8_04s16_lecnotes5/",
      },
      {
        id: "04e-infinite-square-well",
        title: "Infinite Square Well: Quantized Energy Levels",
        type: "notes",
        url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/resources/mit8_04s16_lecnotes11/",
      },
      {
        id: "04f-harmonic-oscillator-qm",
        title: "Quantum Harmonic Oscillator: Raising and Lowering Operators",
        type: "notes",
        url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/resources/mit8_04s16_lecnotes14_15/",
      },
      {
        id: "04g-postulates-qm",
        title: "The Four Postulates of Quantum Mechanics",
        type: "notes",
        url: "https://www.preskill.caltech.edu/ph219/chap2_15.pdf",
      },
      {
        id: "04h-expectation-values",
        title: "Expectation Values and Operators",
        type: "notes",
        url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/resources/mit8_04s16_lecnotes8/",
      },
      {
        id: "04i-commutation-relations",
        title: "Commutation Relations and the Uncertainty Principle",
        type: "notes",
        url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/resources/mit8_04s16_lecnotes9/",
      },
      {
        id: "04j-uncertainty-principle",
        title: "Heisenberg Uncertainty Principle: Proof and Applications",
        type: "guide",
        url: "https://plato.stanford.edu/entries/qt-uncertainty/",
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
        url: "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/",
      },
      {
        id: "05b-hermitian-operators",
        title: "Hermitian Operators and Observables",
        type: "notes",
        url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/resources/mit8_04s16_lecnotes9/",
      },
      {
        id: "05c-spin-half",
        title: "Spin-½ Systems and the Pauli Matrices",
        type: "notes",
        url: "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/resources/lecture-notes-2/",
      },
      {
        id: "05d-pauli-matrices",
        title: "Pauli Matrices: Properties and Physical Meaning",
        type: "notes",
        url: "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/resources/lecture-notes-2/",
      },
      {
        id: "05e-angular-momentum",
        title: "Orbital Angular Momentum Operators",
        type: "notes",
        url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/resources/mit8_04s16_lecnotes20_21/",
      },
      {
        id: "05f-addition-angular-momentum",
        title: "Addition of Angular Momentum and Clebsch-Gordan Coefficients",
        type: "notes",
        url: "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/resources/lecture-notes-10/",
      },
      {
        id: "05g-hydrogen-atom",
        title: "The Hydrogen Atom: Radial and Angular Solutions",
        type: "notes",
        url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/resources/mit8_04s16_lecnotes22/",
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
        type: "guide",
        url: "https://ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2018/",
      },
      {
        id: "06b-degenerate-perturbation",
        title: "Degenerate Perturbation Theory and the Stark Effect",
        type: "notes",
        url: "https://ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2018/resources/chapter-1-non-degenerate-and-degenerate-perturbation-theory/",
      },
      {
        id: "06c-time-dependent-perturbation",
        title: "Time-Dependent Perturbation Theory and Fermi's Golden Rule",
        type: "notes",
        url: "https://ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2018/resources/chapter-4-time-dependent-perturbation-theory/",
      },
      {
        id: "06d-variational-method",
        title: "The Variational Method: Estimating Ground State Energies",
        type: "notes",
        url: "https://ocw.mit.edu/courses/5-73-quantum-mechanics-i-fall-2018/424b2de8086caf32fadfb5e17db09302_MIT5_73F18_Lec18.pdf",
      },
      {
        id: "06e-wkb-approximation",
        title: "The WKB Approximation: Semiclassical Quantum Mechanics",
        type: "notes",
        url: "https://ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2018/resources/chapter-3-semiclassical-approximation/",
      },
      {
        id: "06f-identical-particles",
        title: "Identical Particles, Bosons, and Fermions",
        type: "guide",
        url: "https://plato.stanford.edu/entries/qt-idind/",
      },
    ],
  },
  // PHASE 2 — CORE QUANTUM COMPUTING (5 modules, ~42 lessons)
  {
    id: "07-qubits-gates",
    title: "07. Qubits & Quantum Gates",
    description:
      "The qubit, Bloch sphere representation, single-qubit gates (X, Y, Z, H, S, T), multi-qubit states, controlled gates (CNOT, Toffoli, SWAP), universal gate sets, gate decomposition, and the Solovay-Kitaev theorem.",
    lessons: [
      {
        id: "07a-qubit-intro",
        title: "The Qubit: A Two-Level Quantum System",
        type: "tutorial",
        url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/single-systems/quantum-information",
      },
      {
        id: "07b-bloch-sphere",
        title: "The Bloch Sphere: Visualizing Qubit States",
        type: "tutorial",
        url: "https://pennylane.ai/qml/demos/tutorial_qubit_rotation/",
      },
      {
        id: "07c-single-qubit-gates",
        title: "Single-Qubit Gates: Pauli, Hadamard, Phase, and T Gates",
        type: "tutorial",
        url: "https://learning.quantum.ibm.com/catalog/courses",
      },
      {
        id: "07d-multi-qubit-states",
        title: "Multi-Qubit States and Entanglement",
        type: "tutorial",
        url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/multiple-systems/quantum-information",
      },
      {
        id: "07e-cnot-gate",
        title: "The CNOT Gate: Creating Entanglement in Circuits",
        type: "tutorial",
        url: "https://learning.quantum.ibm.com/catalog/courses",
      },
      {
        id: "07f-toffoli-swap",
        title: "Toffoli, Fredkin, and SWAP Gates",
        type: "notes",
        url: "https://www.scottaaronson.com/qclec/16.pdf",
      },
      {
        id: "07g-universal-gate-sets",
        title: "Universal Gate Sets and Approximation",
        type: "notes",
        url: "https://ilorentz.org/quantumcomputers/literature/preskill_5_update.pdf",
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
        type: "tutorial",
        url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/quantum-circuits/circuits",
      },
      {
        id: "08b-quantum-teleportation",
        title: "Quantum Teleportation: How It Works",
        type: "tutorial",
        url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/entanglement-in-action/quantum-teleportation",
      },
      {
        id: "08c-superdense-coding",
        title: "Superdense Coding Protocol",
        type: "tutorial",
        url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/entanglement-in-action/superdense-coding",
      },
      {
        id: "08d-deutsch-circuit",
        title: "Deutsch's Algorithm: The First Quantum Advantage",
        type: "tutorial",
        url: "https://learning.quantum.ibm.com/catalog/courses",
      },
      {
        id: "08e-circuit-optimization",
        title: "Quantum Circuit Optimization and Compilation",
        type: "guide",
        url: "https://docs.quantum.ibm.com/guides",
      },
      {
        id: "08f-reversible-computation",
        title: "Reversible Computation: Landauer's Principle",
        type: "notes",
        url: "https://arxiv.org/abs/physics/0210005",
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
        type: "tutorial",
        url: "https://quantum.cloud.ibm.com/learning/en/courses/fundamentals-of-quantum-algorithms/quantum-query-algorithms/deutsch-jozsa-algorithm",
      },
      {
        id: "09b-bernstein-vazirani",
        title: "Bernstein-Vazirani Algorithm",
        type: "guide",
        url: "https://learning.quantum.ibm.com/catalog/courses",
      },
      {
        id: "09c-simons-algorithm",
        title: "Simon's Algorithm: Period Finding",
        type: "tutorial",
        url: "https://quantum.cloud.ibm.com/learning/en/courses/fundamentals-of-quantum-algorithms/quantum-query-algorithms/simon-algorithm",
      },
      {
        id: "09d-quantum-fourier-transform",
        title: "The Quantum Fourier Transform: Circuit and Applications",
        type: "tutorial",
        url: "https://quantum.cloud.ibm.com/learning/en/modules/computer-science/qft",
      },
      {
        id: "09e-phase-estimation",
        title: "Quantum Phase Estimation Algorithm",
        type: "tutorial",
        url: "https://learning.quantum.ibm.com/catalog/courses",
      },
      {
        id: "09f-grovers-search",
        title: "Grover's Search Algorithm: Quadratic Speedup",
        type: "tutorial",
        url: "https://quantum.cloud.ibm.com/learning/en/courses/fundamentals-of-quantum-algorithms/grover-algorithm/grover-algorithm-description",
      },
      {
        id: "09g-amplitude-amplification",
        title: "Amplitude Amplification: Generalizing Grover",
        type: "tutorial",
        url: "https://pennylane.ai/demos/tutorial_intro_amplitude_amplification",
      },
      {
        id: "09h-shors-algorithm",
        title: "Shor's Factoring Algorithm: The Full Circuit",
        type: "tutorial",
        url: "https://github.com/Qiskit/textbook/blob/main/notebooks/ch-algorithms/shor.ipynb",
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
        url: "https://www.daniellowengrub.com/blog/2025/04/23/hidden-subgroup",
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
        url: "https://learning.quantum.ibm.com/catalog/courses",
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
        type: "tutorial",
        url: "https://pennylane.ai/demos/linear_equations_hhl_qrisp_catalyst",
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
        type: "tutorial",
        url: "https://pennylane.ai/codebook/hamiltonian-simulation/trotterization",
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
        type: "tutorial",
        url: "https://pennylane.ai/qml/demos/tutorial_QUBO",
      },
      {
        id: "10h-tensor-networks",
        title: "Tensor Networks: MPS, PEPS, and MERA",
        type: "tutorial",
        url: "https://pennylane.ai/demos/tutorial_mps",
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
        type: "notes",
        url: "https://www.preskill.caltech.edu/ph219/chap10_6A_2025.pdf",
      },
      {
        id: "11b-quantum-channels",
        title: "Quantum Channels and the Operator-Sum Representation",
        type: "notes",
        url: "https://cs.uwaterloo.ca/~watrous/TQI/TQI.pdf",
      },
      {
        id: "11c-kraus-operators",
        title: "Kraus Operators: The Most General Quantum Evolution",
        type: "notes",
        url: "https://www.preskill.caltech.edu/ph219/chap3_15.pdf",
      },
      {
        id: "11d-holevo-bound",
        title: "The Holevo Bound: Limits on Accessible Information",
        type: "notes",
        url: "https://www.scottaaronson.com/qclec.pdf",
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
        type: "tutorial",
        url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/quantum-circuits/limitations-on-quantum-information",
      },
      {
        id: "11g-quantum-data-compression",
        title: "Quantum Data Compression and Schumacher's Theorem",
        type: "notes",
        url: "https://arxiv.org/abs/1106.1445",
      },
      {
        id: "11h-shannon-vs-von-neumann",
        title: "Shannon vs Von Neumann Entropy: Classical and Quantum",
        type: "guide",
        url: "https://ncatlab.org/nlab/show/von+Neumann+entropy",
      },
    ],
  },
  // PHASE 3 — ADVANCED TOPICS (5 modules, ~38 lessons)
  {
    id: "12-quantum-error-correction-i",
    title: "12. Quantum Error Correction I — Codes & Stabilizers",
    description:
      "Classical error correction review, the 3-qubit bit-flip code, the Shor 9-qubit code, the Steane [[7,1,3]] code, the stabilizer formalism, the Gottesman-Knill theorem, CSS codes, and logical gate operations on encoded states.",
    lessons: [
      {
        id: "12a-classical-ec",
        title: "Classical Error Correction: Repetition and Hamming Codes",
        type: "notes",
        url: "https://math.mit.edu/~goemans/18310S15/Hamming-code-notes.pdf",
      },
      {
        id: "12b-3-qubit-code",
        title: "The 3-Qubit Bit-Flip and Phase-Flip Codes",
        type: "guide",
        url: "https://errorcorrectionzoo.org/c/quantum_repetition",
      },
      {
        id: "12c-shor-9-qubit",
        title: "The Shor 9-Qubit Code: Correcting Any Single Error",
        type: "guide",
        url: "https://errorcorrectionzoo.org/c/shor_nine",
      },
      {
        id: "12d-steane-7-qubit",
        title: "The Steane [[7,1,3]] Code",
        type: "guide",
        url: "https://errorcorrectionzoo.org/c/steane",
      },
      {
        id: "12e-stabilizer-formalism",
        title: "The Stabilizer Formalism: Pauli Group and Stabilizers",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/9705052",
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
        url: "https://errorcorrectionzoo.org/c/css",
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
        type: "guide",
        url: "https://errorcorrectionzoo.org/c/toric",
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
        url: "https://errorcorrectionzoo.org/c/surface",
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
        type: "notes",
        url: "https://www.preskill.caltech.edu/ph219/chap7_26_6A.pdf",
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
        type: "notes",
        url: "https://arxiv.org/abs/1907.09415",
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
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/9701001",
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
        type: "guide",
        url: "https://plato.stanford.edu/entries/bell-theorem/",
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
        type: "paper",
        url: "https://arxiv.org/abs/2003.06557",
      },
      {
        id: "15b-e91-protocol",
        title: "E91: Ekert's Entanglement-Based QKD",
        type: "tutorial",
        url: "https://github.com/qiskit-community/qiskit-community-tutorials/blob/master/awards/teach_me_qiskit_2018/e91_qkd/e91_quantum_key_distribution_protocol.ipynb",
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
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/9806063",
      },
      {
        id: "15g-post-quantum-crypto",
        title: "Post-Quantum Cryptography: Classical Alternatives",
        type: "guide",
        url: "https://csrc.nist.gov/projects/post-quantum-cryptography",
      },
      {
        id: "15h-quantum-crypto-hardware",
        title: "Practical QKD Systems and Satellite Quantum Communication",
        type: "paper",
        url: "https://arxiv.org/abs/2208.10236",
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
        type: "tutorial",
        url: "https://pennylane.ai/qml/demos/tutorial_variational_classifier",
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
        type: "paper",
        url: "https://arxiv.org/abs/2307.00908",
      },
    ],
  },
  // PHASE 4 — PHYSICAL IMPLEMENTATION (4 modules, ~26 lessons)
  {
    id: "17-superconducting-qubits",
    title: "17. Superconducting Qubits & Circuit QED",
    description:
      "LC oscillators, Josephson junctions, transmon qubits, charge/flux/phase qubits, circuit quantum electrodynamics (cQED), dispersive readout, gate implementation, and coherence/decoherence mechanisms in superconducting qubits.",
    lessons: [
      {
        id: "17a-lc-oscillator",
        title: "The LC Oscillator: Quantum Mechanical Treatment",
        type: "paper",
        url: "https://arxiv.org/abs/cond-mat/0411174",
      },
      {
        id: "17b-josephson-junction",
        title: "The Josephson Junction: The Nonlinear Element for Qubits",
        type: "paper",
        url: "https://arxiv.org/abs/1905.13641",
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
        type: "paper",
        url: "https://arxiv.org/abs/1904.06560",
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
        type: "paper",
        url: "https://arxiv.org/abs/2005.12667",
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
        type: "paper",
        url: "https://arxiv.org/abs/1706.06562",
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
        type: "paper",
        url: "https://arxiv.org/abs/0809.4368",
      },
      {
        id: "18b-laser-cooling",
        title: "Laser Cooling: Doppler and Resolved Sideband Cooling",
        type: "paper",
        url: "https://arxiv.org/abs/1904.04178",
      },
      {
        id: "18c-hyperfine-qubits",
        title: "Hyperfine Qubits in Trapped Ions",
        type: "paper",
        url: "https://arxiv.org/abs/2003.01293",
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
        type: "paper",
        url: "https://arxiv.org/abs/1803.02790",
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
        type: "paper",
        url: "https://arxiv.org/abs/0707.1889",
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
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/9707021",
      },
      {
        id: "19d-majorana-fermions",
        title: "Majorana Fermions in Quantum Computation",
        type: "paper",
        url: "https://arxiv.org/abs/cond-mat/0010440",
      },
      {
        id: "19e-topological-qubits-microsoft",
        title: "Microsoft's Topological Qubit Approach",
        type: "paper",
        url: "https://www.microsoft.com/en-us/research/publication/interferometric-single-shot-parity-measurement-in-an-inas-al-hybrid-device/",
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
        type: "paper",
        url: "https://arxiv.org/abs/0810.4729",
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
        type: "paper",
        url: "https://arxiv.org/abs/1806.07862",
      },
      {
        id: "20f-scalability-challenges",
        title: "Scalability Challenges: Wiring, Crosstalk, and Integration",
        type: "paper",
        url: "https://arxiv.org/abs/1904.06560",
      },
    ],
  },
  // PHASE 5 — APPLIED & SPECIALIZED (4 modules, ~24 lessons)
  {
    id: "21-quantum-chemistry",
    title: "21. Quantum Simulation & Quantum Chemistry",
    description:
      "Molecular Hamiltonians for quantum chemistry, the Hartree-Fock method, Jordan-Wigner and Bravyi-Kitaev transformations for fermionic systems, VQE for chemistry, phase estimation for chemical accuracy, NISQ-era quantum chemistry, materials science applications, and quantum chemistry software.",
    lessons: [
      {
        id: "21a-molecular-hamiltonians",
        title: "Molecular Hamiltonians: From Born-Oppenheimer to Second Quantization",
        type: "tutorial",
        url: "https://pennylane.ai/qml/demos/tutorial_quantum_chemistry",
      },
      {
        id: "21b-hartree-fock",
        title: "The Hartree-Fock Method as a Starting Point",
        type: "tutorial",
        url: "https://learning.quantum.ibm.com/catalog/courses",
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
        url: "https://learning.quantum.ibm.com/catalog/courses",
      },
      {
        id: "21e-phase-estimation-chemistry",
        title: "Phase Estimation for Chemical Accuracy",
        type: "tutorial",
        url: "https://pennylane.ai/demos/tutorial_qpe",
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
        type: "tutorial",
        url: "https://pennylane.ai/qml/demos/tutorial_resource_estimation",
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
        type: "paper",
        url: "https://arxiv.org/abs/0705.4165",
      },
      {
        id: "22c-quantum-memory",
        title: "Quantum Memory: Storing Quantum Information",
        type: "paper",
        url: "https://arxiv.org/abs/1002.4659",
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
        type: "paper",
        url: "https://arxiv.org/abs/2112.07092",
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
        type: "paper",
        url: "https://arxiv.org/abs/2309.00221",
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
        type: "paper",
        url: "https://arxiv.org/abs/1102.2318",
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
        type: "paper",
        url: "https://arxiv.org/abs/1511.03250",
      },
      {
        id: "23d-nv-centers",
        title: "NV Centers in Diamond: Room Temperature Quantum Sensing",
        type: "paper",
        url: "https://arxiv.org/abs/1311.5214",
      },
      {
        id: "23e-atomic-clocks",
        title: "Atomic Clocks: Quantum Metrology at the Frontier",
        type: "guide",
        url: "https://www.nist.gov/atomic-clocks/how-do-atomic-clocks-work",
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
        type: "paper",
        url: "https://arxiv.org/abs/1612.07330",
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
        type: "notes",
        url: "https://www.scottaaronson.com/blog/",
      },
    ],
  },
];
