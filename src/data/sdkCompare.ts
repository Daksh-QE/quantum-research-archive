export interface SDKRow {
  id: string;
  name: string;
  vendor: string;
  language: string;
  hardware: string;      // what real hardware you can reach
  openSource: boolean;
  bestFor: string;
  url: string;
}

// side-by-side of the major quantum SDKs.
export const sdkCompare: SDKRow[] = [
  { id: "qiskit", name: "Qiskit", vendor: "IBM", language: "Python", hardware: "IBM Quantum (superconducting)", openSource: true, bestFor: "General-purpose circuits, the largest ecosystem and learning material, real IBM hardware access.", url: "https://www.ibm.com/quantum/qiskit" },
  { id: "cirq", name: "Cirq", vendor: "Google", language: "Python", hardware: "Google (research) + simulators", openSource: true, bestFor: "Fine-grained control over gates, timing, and noise; NISQ experiments.", url: "https://quantumai.google/cirq" },
  { id: "pennylane", name: "PennyLane", vendor: "Xanadu", language: "Python", hardware: "Hardware-agnostic (plugins for many backends)", openSource: true, bestFor: "Quantum machine learning and differentiable/variational circuits; autodiff across backends.", url: "https://pennylane.ai/" },
  { id: "braket", name: "Amazon Braket SDK", vendor: "AWS", language: "Python", hardware: "IonQ, Rigetti, IQM, QuEra via AWS", openSource: true, bestFor: "Running the same code across multiple vendors' hardware from one cloud account.", url: "https://github.com/amazon-braket/amazon-braket-sdk-python" },
  { id: "qsharp", name: "Q# / QDK", vendor: "Microsoft", language: "Q# (+ Python interop)", hardware: "Azure Quantum providers", openSource: true, bestFor: "A dedicated quantum language with strong typing; algorithm-focused, resource estimation.", url: "https://learn.microsoft.com/en-us/azure/quantum/" },
  { id: "cudaq", name: "CUDA-Q", vendor: "NVIDIA", language: "C++ / Python", hardware: "GPU simulation + QPU backends", openSource: true, bestFor: "GPU-accelerated simulation and hybrid quantum-classical / HPC workloads at scale.", url: "https://developer.nvidia.com/cuda-q" },
  { id: "tket", name: "TKET (pytket)", vendor: "Quantinuum", language: "Python (C++ core)", hardware: "Many backends (compiler/router)", openSource: true, bestFor: "Best-in-class circuit optimization and qubit routing; retargeting circuits to real device topologies.", url: "https://github.com/CQCL/tket" },
  { id: "stim", name: "Stim", vendor: "Craig Gidney / Google", language: "Python / C++", hardware: "Stabilizer simulation only", openSource: true, bestFor: "Blazing-fast stabilizer + error-correction simulation; the standard tool for QEC research.", url: "https://github.com/quantumlib/Stim" },
];
