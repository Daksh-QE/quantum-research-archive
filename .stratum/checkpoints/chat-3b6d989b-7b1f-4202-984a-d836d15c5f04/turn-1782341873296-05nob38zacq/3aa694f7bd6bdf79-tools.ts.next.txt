import { Tool } from "./types";

export const tools: Tool[] = [
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
    id: "pennylane",
    title: "PennyLane",
    description:
      "Cross-platform quantum machine learning library with automatic differentiation. Integrates with PyTorch, TensorFlow, and JAX.",
    url: "https://pennylane.ai/",
    category: "FRAMEWORK",
    tags: ["OPEN-SOURCE", "PYTHON", "QML", "DIFFERENTIATION"],
  },
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
    id: "forest-sdk",
    title: "Forest SDK (Rigetti)",
    description:
      "Rigetti's Quantum Cloud Services SDK featuring the Quil quantum instruction language and pyQuil library for hybrid quantum-classical computing.",
    url: "https://www.rigetti.com/forest",
    category: "SDK",
    tags: ["RIGETTI", "QUIL", "PYTHON", "HYBRID"],
  },
  {
    id: "qutip",
    title: "QuTiP (Quantum Toolbox in Python)",
    description:
      "A powerful open-source library for simulating quantum systems, including master equations, Bloch-Redfield, and quantum stochastic processes.",
    url: "https://qutip.org/",
    category: "SIMULATOR",
    tags: ["OPEN-SOURCE", "PYTHON", "SIMULATION", "OPEN-SYSTEMS"],
  },
  {
    id: "quipper",
    title: "Quipper",
    description:
      "A scalable, functional programming language for quantum computing embedded in Haskell. Used for circuit description and verification.",
    url: "https://quantum.phys.cmu.edu/quipper/",
    category: "LANGUAGE",
    tags: ["HASKELL", "FUNCTIONAL", "CIRCUITS", "VERIFICATION"],
  },
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
];
