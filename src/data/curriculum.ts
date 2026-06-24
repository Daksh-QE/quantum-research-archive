import { Module } from "./types";

export const curriculum: Module[] = [
  {
    id: "01-mathematical-foundations",
    title: "01. Mathematical Foundations",
    description:
      "Essential mathematics for quantum computing: linear algebra, complex numbers, probability theory, and tensor products.",
    lessons: [
      {
        id: "01-linear-algebra-review",
        title: "Linear Algebra: Vectors, Matrices, and Inner Products",
        type: "video",
        url: "https://www.youtube.com/watch?v=LyGKycYT2v0",
      },
      {
        id: "02-complex-numbers",
        title: "Complex Numbers and Hilbert Spaces",
        type: "notes",
        url: "https://quantum.country/complex-numbers",
      },
      {
        id: "03-tensor-products",
        title: "Tensor Products and Multi-partite Systems",
        type: "guide",
        url: "https://www.quantum.ufrn.edu.br/tensor-products",
      },
      {
        id: "04-probability-theory",
        title: "Probability Theory and Density Matrices",
        type: "notes",
        url: "https://quantum.country/density-matrices",
      },
      {
        id: "05-dirac-notation",
        title: "Dirac (Bra-Ket) Notation",
        type: "tutorial",
        url: "https://www.youtube.com/watch?v=Qgl4Q8J3VFA",
      },
      {
        id: "06-eigenvalues",
        title: "Eigenvalues, Eigenvectors, and Spectral Decomposition",
        type: "video",
        url: "https://www.youtube.com/watch?v=QbOWnBQT8iY",
      },
    ],
  },
  {
    id: "02-quantum-mechanics-fundamentals",
    title: "02. Quantum Mechanics Fundamentals",
    description:
      "Core postulates of quantum mechanics: wavefunctions, operators, measurement, and the Schrödinger equation.",
    lessons: [
      {
        id: "01-postulates-qm",
        title: "The Four Postulates of Quantum Mechanics",
        type: "guide",
        url: "https://www.youtube.com/watch?v=1Q4Tj4F5I6Y",
      },
      {
        id: "02-wavefunctions",
        title: "Wavefunctions and Probability Amplitudes",
        type: "video",
        url: "https://www.youtube.com/watch?v=b-5Z1w1U7M4",
      },
      {
        id: "03-operators-observables",
        title: "Operators and Observables",
        type: "notes",
        url: "https://quantum.country/operators",
      },
      {
        id: "04-schrodinger-equation",
        title: "The Schrödinger Equation and Time Evolution",
        type: "tutorial",
        url: "https://www.youtube.com/watch?v=QNvxTj2D3eg",
      },
      {
        id: "05-heisenberg-uncertainty",
        title: "Heisenberg Uncertainty Principle",
        type: "video",
        url: "https://www.youtube.com/watch?v=MBnnXbOM5S4",
      },
      {
        id: "06-measurement",
        title: "Quantum Measurement and Collapse",
        type: "guide",
        url: "https://quantum.country/measurement",
      },
    ],
  },
  {
    id: "03-qubits-quantum-gates",
    title: "03. Qubits & Quantum Gates",
    description:
      "Single and multi-qubit systems, quantum gates, the Bloch sphere representation, and universal gate sets.",
    lessons: [
      {
        id: "01-qubit-intro",
        title: "The Qubit: A Two-Level Quantum System",
        type: "video",
        url: "https://www.youtube.com/watch?v=zN7Y1Xyq7_s",
      },
      {
        id: "02-bloch-sphere",
        title: "Bloch Sphere Representation",
        type: "tutorial",
        url: "https://www.youtube.com/watch?v=z5hXqIBClfs",
      },
      {
        id: "03-single-qubit-gates",
        title: "Single-Qubit Gates: X, Y, Z, H, S, T",
        type: "video",
        url: "https://www.youtube.com/watch?v=Jj6S70G7DwE",
      },
      {
        id: "04-multi-qubit-gates",
        title: "Multi-Qubit Gates: CNOT, Toffoli, SWAP",
        type: "notes",
        url: "https://quantum.country/multi-qubit-gates",
      },
      {
        id: "05-universal-gate-set",
        title: "Universal Gate Sets and Approximation",
        type: "guide",
        url: "https://www.youtube.com/watch?v=QW1a0cHh6qA",
      },
      {
        id: "06-entangling-gates",
        title: "Creating Entanglement with Gates",
        type: "tutorial",
        url: "https://www.youtube.com/watch?v=aiJq52x3LCs",
      },
    ],
  },
  {
    id: "04-quantum-circuits",
    title: "04. Quantum Circuits",
    description:
      "The circuit model of quantum computation: teleportation, superdense coding, and circuit decomposition.",
    lessons: [
      {
        id: "01-circuit-model",
        title: "Introduction to the Circuit Model",
        type: "video",
        url: "https://www.youtube.com/watch?v=6aEkjJ8wYQY",
      },
      {
        id: "02-quantum-teleportation",
        title: "Quantum Teleportation Protocol",
        type: "tutorial",
        url: "https://www.youtube.com/watch?v=Hu1BZ5U4HT0",
      },
      {
        id: "03-superdense-coding",
        title: "Superdense Coding Protocol",
        type: "video",
        url: "https://www.youtube.com/watch?v=HbWZfD6-XMg",
      },
      {
        id: "04-swap-circuit",
        title: "Circuit Decomposition and SWAP Networks",
        type: "notes",
        url: "https://quantum.country/circuits",
      },
      {
        id: "05-deutsch-circuit",
        title: "Deutsch's Algorithm Circuit",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/9708016",
      },
      {
        id: "06-reversible-computation",
        title: "Reversible Computation and Toffoli Gates",
        type: "guide",
        url: "https://www.youtube.com/watch?v=AxNjjzCQodk",
      },
    ],
  },
  {
    id: "05-quantum-algorithms",
    title: "05. Quantum Algorithms",
    description:
      "Foundational quantum algorithms: Deutsch-Jozsa, Grover's search, Shor's factoring, and the Quantum Fourier Transform.",
    lessons: [
      {
        id: "01-qft-intro",
        title: "The Quantum Fourier Transform",
        type: "video",
        url: "https://www.youtube.com/watch?v=wV8GzN4p-kM",
      },
      {
        id: "02-deutsch-jozsa",
        title: "Deutsch-Jozsa Algorithm",
        type: "tutorial",
        url: "https://www.youtube.com/watch?v=WpGbB6m1s0w",
      },
      {
        id: "03-grovers-algorithm",
        title: "Grover's Search Algorithm",
        type: "video",
        url: "https://www.youtube.com/watch?v=0RPFWmgc-4Y",
      },
      {
        id: "04-shors-algorithm",
        title: "Shor's Factoring Algorithm",
        type: "video",
        url: "https://www.youtube.com/watch?v=MWkU3cE3lA0",
      },
      {
        id: "05-phase-estimation",
        title: "Quantum Phase Estimation",
        type: "guide",
        url: "https://www.youtube.com/watch?v=KE7HkZ4zq9s",
      },
      {
        id: "06-variational-algorithms",
        title: "Variational Quantum Eigensolver (VQE)",
        type: "tutorial",
        url: "https://learn.qiskit.org/course/ch-applications/variational-quantum-eigensolver",
      },
      {
        id: "07-quantum-optimization",
        title: "QAOA: Quantum Approximate Optimization Algorithm",
        type: "paper",
        url: "https://arxiv.org/abs/1411.4028",
      },
    ],
  },
  {
    id: "06-quantum-error-correction",
    title: "06. Quantum Error Correction",
    description:
      "Principles of quantum error correction: the Shor code, Steane code, stabilizer formalism, and surface codes.",
    lessons: [
      {
        id: "01-qec-intro",
        title: "Why Quantum Error Correction Matters",
        type: "video",
        url: "https://www.youtube.com/watch?v=0jMfCdZ_f8Q",
      },
      {
        id: "02-shor-code",
        title: "The 9-Qubit Shor Code",
        type: "guide",
        url: "https://www.youtube.com/watch?v=3f2D3H4D5Z4",
      },
      {
        id: "03-steane-code",
        title: "The Steane [[7,1,3]] Code",
        type: "notes",
        url: "https://quantum.country/error-correction",
      },
      {
        id: "04-stabilizer-formalism",
        title: "Stabilizer Formalism and Gottesman-Knill Theorem",
        type: "tutorial",
        url: "https://www.youtube.com/watch?v=3VgFNjRmGrU",
      },
      {
        id: "05-surface-codes",
        title: "Surface Codes and Topological Error Correction",
        type: "paper",
        url: "https://arxiv.org/abs/1208.0928",
      },
      {
        id: "06-fault-tolerance",
        title: "Fault-Tolerant Quantum Computation Threshold Theorem",
        type: "guide",
        url: "https://www.youtube.com/watch?v=2Zq0Lmjq0zI",
      },
    ],
  },
  {
    id: "07-quantum-computing-platforms",
    title: "07. Quantum Computing Platforms",
    description:
      "Practical quantum computing: programming with Qiskit, Cirq, Braket, and understanding quantum hardware implementations.",
    lessons: [
      {
        id: "01-qiskit-intro",
        title: "IBM Qiskit: Getting Started with Quantum Circuits",
        type: "tutorial",
        url: "https://www.youtube.com/watch?v=W_YkH6ldXqE",
      },
      {
        id: "02-cirq-intro",
        title: "Google Cirq: Programming Quantum Processors",
        type: "guide",
        url: "https://quantumai.google/cirq/start",
      },
      {
        id: "03-braket-intro",
        title: "Amazon Braket: Hybrid Quantum-Classical Workflows",
        type: "tutorial",
        url: "https://www.youtube.com/watch?v=FeVMh7dVPrM",
      },
      {
        id: "04-quantum-hardware",
        title: "Superconducting Qubits vs Ion Traps vs Photonics",
        type: "video",
        url: "https://www.youtube.com/watch?v=D1TjOq4pFp0",
      },
      {
        id: "05-noise-modeling",
        title: "Noise Modeling and Error Mitigation",
        type: "paper",
        url: "https://arxiv.org/abs/2101.08691",
      },
      {
        id: "06-q-programming",
        title: "Microsoft Q#: The Quantum Development Kit",
        type: "guide",
        url: "https://learn.microsoft.com/en-us/azure/quantum/",
      },
    ],
  },
  {
    id: "08-quantum-information-theory",
    title: "08. Quantum Information Theory",
    description:
      "Quantum entropy, channel capacity, the no-cloning theorem, and quantum communication protocols.",
    lessons: [
      {
        id: "01-von-neumann-entropy",
        title: "Von Neumann Entropy and Quantum Information",
        type: "video",
        url: "https://www.youtube.com/watch?v=7Dd0-9F0lNY",
      },
      {
        id: "02-quantum-channels",
        title: "Quantum Channels and Kraus Operators",
        type: "notes",
        url: "https://quantum.country/channels",
      },
      {
        id: "03-holevo-bound",
        title: "The Holevo Bound and Accessible Information",
        type: "guide",
        url: "https://www.youtube.com/watch?v=W2J4iM0d9wo",
      },
      {
        id: "04-quantum-channel-capacity",
        title: "Quantum Channel Capacity and the Lloyd-Shor-Devetak Theorem",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/0301108",
      },
      {
        id: "05-no-cloning",
        title: "The No-Cloning Theorem",
        type: "tutorial",
        url: "https://www.youtube.com/watch?v=MT9wjM4GbkM",
      },
      {
        id: "06-quantum-cryptography",
        title: "BB84 QKD Protocol and Quantum Cryptography",
        type: "video",
        url: "https://www.youtube.com/watch?v=Q9Pv4jVsLtA",
      },
    ],
  },
  {
    id: "09-advanced-topics",
    title: "09. Advanced Topics in Quantum Computing",
    description:
      "Cutting-edge areas: quantum machine learning, topological quantum computing, verification, and quantum supremacy.",
    lessons: [
      {
        id: "01-qml-intro",
        title: "Introduction to Quantum Machine Learning",
        type: "video",
        url: "https://www.youtube.com/watch?v=8P2P6e7hLzs",
      },
      {
        id: "02-topological-qc",
        title: "Topological Quantum Computing and Anyons",
        type: "paper",
        url: "https://arxiv.org/abs/quant-ph/0611036",
      },
      {
        id: "03-quantum-supremacy",
        title: "Quantum Supremacy: Theory and Experiments",
        type: "paper",
        url: "https://arxiv.org/abs/1910.11333",
      },
      {
        id: "04-quantum-verification",
        title: "Verification of Quantum Computation",
        type: "guide",
        url: "https://www.youtube.com/watch?v=3VgFNjRmGrU",
      },
      {
        id: "05-adiabatic-qc",
        title: "Adiabatic Quantum Computing and Quantum Annealing",
        type: "tutorial",
        url: "https://www.youtube.com/watch?v=HefiGXbwRY0",
      },
      {
        id: "06-quantum-networking",
        title: "Quantum Networks and the Quantum Internet",
        type: "video",
        url: "https://www.youtube.com/watch?v=8P2P6e7hLzs",
      },
      {
        id: "07-fault-tolerant-design",
        title: "Architecture for Fault-Tolerant Quantum Computers",
        type: "paper",
        url: "https://arxiv.org/abs/1804.03196",
      },
    ],
  },
];
