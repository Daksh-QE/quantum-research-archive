import { Tool } from "./types";

export const tools: Tool[] = [
  // ===== SDKs =====
  {
    id: "qiskit",
    title: "Qiskit",
    description:
      "IBM's open-source SDK for programming quantum computers. Features circuit construction, transpilation, simulation, and access to IBM quantum hardware.",
    url: "https://qiskit.org/",
    category: "SDK",
    tags: ["OPEN-SOURCE", "PYTHON", "IBM", "SIMULATION"],
  },
  {
    id: "cirq",
    title: "Cirq",
    description:
      "Google's open-source framework for designing, simulating, and running quantum circuits on NISQ devices. Strong noise modeling capabilities.",
    url: "https://quantumai.google/cirq",
    category: "SDK",
    tags: ["OPEN-SOURCE", "PYTHON", "GOOGLE", "NISQ"],
  },
  {
    id: "braket-sdk",
    title: "Amazon Braket SDK",
    description:
      "AWS's open-source SDK for building quantum algorithms and running them on multiple hardware backends (IonQ, Rigetti, D-Wave).",
    url: "https://github.com/aws/amazon-braket-sdk-python",
    category: "SDK",
    tags: ["OPEN-SOURCE", "PYTHON", "AWS", "HYBRID"],
  },
  {
    id: "forest-sdk",
    title: "Forest SDK (Rigetti)",
    description:
      "Rigetti's Quantum Cloud Services SDK featuring the Quil quantum instruction language and pyQuil library for hybrid quantum-classical computing.",
    url: "https://www.rigetti.com/",
    category: "SDK",
    tags: ["RIGETTI", "QUIL", "PYTHON", "HYBRID"],
  },
  {
    id: "tket",
    title: "TKET (Quantinuum)",
    description:
      "Quantinuum's high-performance quantum SDK with advanced circuit optimization, retargeting to multiple hardware backends, and a comprehensive toolchain.",
    url: "https://github.com/CQCL/tket",
    category: "SDK",
    tags: ["OPEN-SOURCE", "PYTHON", "OPTIMIZATION", "MULTI-BACKEND"],
  },
  {
    id: "qsharp-sdk",
    title: "Azure Quantum Development Kit (Q#)",
    description:
      "Microsoft's quantum programming SDK with the Q# language, resource estimation, and integration with Azure Quantum services.",
    url: "https://learn.microsoft.com/en-us/azure/quantum/",
    category: "SDK",
    tags: ["MICROSOFT", "Q#", "AZURE", "SIMULATION"],
  },
  {
    id: "ocean-sdk",
    title: "D-Wave Ocean SDK",
    description:
      "D-Wave's open-source SDK for quantum annealing and hybrid quantum-classical solvers, with tools for optimization and sampling problems.",
    url: "https://github.com/dwavesystems/dwave-ocean-sdk",
    category: "SDK",
    tags: ["OPEN-SOURCE", "PYTHON", "D-WAVE", "ANNEALING"],
  },
  {
    id: "pennylane-sdk",
    title: "PennyLane",
    description:
      "Cross-platform quantum machine learning library with automatic differentiation. Integrates with PyTorch, TensorFlow, and JAX for hybrid QML workflows. Also functions as a full QML framework.",
    url: "https://pennylane.ai/",
    category: "SDK",
    tags: ["OPEN-SOURCE", "PYTHON", "QML", "DIFFERENTIATION"],
  },

  // ===== Frameworks =====
  {
    id: "qibo",
    title: "Qibo",
    description:
      "A full-stack quantum computing framework for quantum simulation, hardware control, and quantum algorithm development with accelerator support.",
    url: "https://qibo.science/",
    category: "FRAMEWORK",
    tags: ["OPEN-SOURCE", "PYTHON", "SIMULATION", "HARDWARE"],
  },
  {
    id: "yao",
    title: "Yao.jl",
    description:
      "A high-performance quantum computing framework written in Julia, offering flexible quantum circuit construction and GPU-accelerated simulation.",
    url: "https://yaoquantum.org/",
    category: "FRAMEWORK",
    tags: ["OPEN-SOURCE", "JULIA", "SIMULATION", "GPU"],
  },
  {
    id: "quantumoptics",
    title: "QuantumOptics.jl",
    description:
      "A Julia framework for simulating quantum optical systems and open quantum systems, including master equations and Monte Carlo simulations.",
    url: "https://github.com/qojulia/QuantumOptics.jl",
    category: "FRAMEWORK",
    tags: ["OPEN-SOURCE", "JULIA", "SIMULATION", "OPEN-SYSTEMS"],
  },
  {
    id: "qutip-framework",
    title: "QuTiP (Quantum Toolbox in Python)",
    description:
      "A powerful open-source library for simulating quantum systems, including master equations, Bloch-Redfield, and quantum stochastic processes.",
    url: "https://qutip.org/",
    category: "FRAMEWORK",
    tags: ["OPEN-SOURCE", "PYTHON", "SIMULATION", "OPEN-SYSTEMS"],
  },

  // ===== Languages =====
  {
    id: "qsharp",
    title: "Q# (QSharp)",
    description:
      "Microsoft's domain-specific programming language for quantum computing. Part of the Azure Quantum Development Kit.",
    url: "https://learn.microsoft.com/en-us/azure/quantum/",
    category: "LANGUAGE",
    tags: ["MICROSOFT", "DOMAIN-SPECIFIC", "AZURE", "SIMULATION"],
  },
  {
    id: "quipper",
    title: "Quipper",
    description:
      "A scalable, functional programming language for quantum computing embedded in Haskell. Used for circuit description and verification.",
    url: "https://github.com/quipper/quipper",
    category: "LANGUAGE",
    tags: ["HASKELL", "FUNCTIONAL", "CIRCUITS", "VERIFICATION"],
  },
  {
    id: "quil",
    title: "Quil (Quantum Instruction Language)",
    description:
      "An intermediate quantum instruction language developed by Rigetti, designed for hybrid quantum-classical computing.",
    url: "https://github.com/rigetti/quil",
    category: "LANGUAGE",
    tags: ["RIGETTI", "INSTRUCTION", "HYBRID", "OPEN-SOURCE"],
  },
  {
    id: "openqasm",
    title: "OpenQASM (IBM)",
    description:
      "IBM's open-source quantum assembly language for describing quantum circuits and protocols, widely adopted across quantum platforms.",
    url: "https://github.com/openqasm/openqasm",
    category: "LANGUAGE",
    tags: ["IBM", "STANDARD", "CIRCUITS", "OPEN-SOURCE"],
  },
  {
    id: "silq",
    title: "Silq (ETH Zurich)",
    description:
      "A high-level quantum programming language with an intuitive type system and automatic uncomputation, designed for safe quantum programming.",
    url: "https://silq.ethz.ch/",
    category: "LANGUAGE",
    tags: ["ACADEMIC", "HIGH-LEVEL", "TYPE-SYSTEM", "UNCOMPUTATION"],
  },

  // ===== Simulators =====
  {
    id: "stim",
    title: "Stim (Stabilizer Simulator)",
    description:
      "A fast stabilizer circuit simulator for quantum error correction research. Can handle millions of measurement rounds per second.",
    url: "https://github.com/quantumlib/Stim",
    category: "SIMULATOR",
    tags: ["OPEN-SOURCE", "PYTHON", "ERROR-CORRECTION", "STABILIZER"],
  },
  {
    id: "qsim",
    title: "qsim (Quantum Circuit Simulator)",
    description:
      "Google's high-performance quantum circuit simulator with support for multi-threading and GPU acceleration.",
    url: "https://quantumai.google/qsim",
    category: "SIMULATOR",
    tags: ["OPEN-SOURCE", "GOOGLE", "GPU", "HIGH-PERFORMANCE"],
  },
  {
    id: "qulacs",
    title: "Qulacs",
    description:
      "A fast quantum circuit simulator written in C++ with Python bindings, supporting GPU acceleration and variational algorithm simulation.",
    url: "https://github.com/qulacs/qulacs",
    category: "SIMULATOR",
    tags: ["OPEN-SOURCE", "C++", "PYTHON", "GPU", "HIGH-PERFORMANCE"],
  },
  {
    id: "quimb",
    title: "Quimb (Quantum Information Many-Body)",
    description:
      "A Python library for quantum information and many-body calculations, featuring tensor networks, quantum circuits, and entanglement measures.",
    url: "https://github.com/jcmgray/quimb",
    category: "SIMULATOR",
    tags: ["OPEN-SOURCE", "PYTHON", "TENSOR-NETWORKS", "QUANTUM-INFO"],
  },
  {
    id: "projectq",
    title: "ProjectQ",
    description:
      "An open-source quantum computing framework with powerful compilation capabilities, supporting various hardware backends and high-performance simulation.",
    url: "https://projectq.ch/",
    category: "SIMULATOR",
    tags: ["OPEN-SOURCE", "PYTHON", "COMPILATION", "SIMULATION"],
  },
  {
    id: "qrack",
    title: "Qrack",
    description:
      "A high-performance GPU-accelerated quantum simulator written in C++ with support for OpenCL, CUDA, and multi-threaded CPU simulation.",
    url: "https://github.com/vm6502q/qrack",
    category: "SIMULATOR",
    tags: ["OPEN-SOURCE", "C++", "GPU", "HIGH-PERFORMANCE"],
  },
  {
    id: "quantum-sdk",
    title: "IBM Quantum Simulator (Aer)",
    description:
      "IBM's high-performance Qiskit Aer simulator for quantum circuits, supporting noise models, GPU acceleration, and circuit optimization.",
    url: "https://github.com/Qiskit/qiskit-aer",
    category: "SIMULATOR",
    tags: ["OPEN-SOURCE", "PYTHON", "IBM", "NOISE", "GPU"],
  },
  {
    id: "quirk",
    title: "Quirk",
    description:
      "The most popular free browser-based visual quantum circuit simulator. Drag-and-drop gates, instant statevector updates, and shareable circuit URLs. No account or installation needed.",
    url: "https://algassert.com/quirk",
    category: "SIMULATOR",
    tags: ["WEB", "VISUAL", "BROWSER", "FREE", "BEGINNER-FRIENDLY"],
  },
  {
    id: "mitiq",
    title: "Mitiq",
    description:
      "Unitary Fund's open-source error mitigation toolkit. Implements zero-noise extrapolation, probabilistic error cancellation, Clifford data regression, and more.",
    url: "https://github.com/unitaryfund/mitiq",
    category: "FRAMEWORK",
    tags: ["OPEN-SOURCE", "PYTHON", "ERROR MITIGATION", "UNITARY FUND"],
  },
  {
    id: "pymatching",
    title: "PyMatching",
    description:
      "A fast Python/C++ library for decoding quantum error correcting codes using Minimum Weight Perfect Matching (MWPM) on the surface code.",
    url: "https://github.com/oscarhiggott/PyMatching",
    category: "SIMULATOR",
    tags: ["OPEN-SOURCE", "PYTHON", "QEC", "MWPM", "DECODING"],
  },
];
