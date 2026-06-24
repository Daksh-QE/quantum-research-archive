import { GlossaryTerm } from "./types";

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "qubit",
    term: "Qubit",
    definition:
      "The fundamental unit of quantum information. Unlike a classical bit (0 or 1), a qubit exists in a superposition of both basis states |0⟩ and |1⟩ simultaneously. Physically realized by two-level quantum systems such as photon polarization, electron spin, or superconducting circuits.",
    category: "Fundamentals",
  },
  {
    id: "superposition",
    term: "Superposition",
    definition:
      "A core principle of quantum mechanics where a quantum system exists in multiple states at once. For a qubit, superposition means it can be in a linear combination α|0⟩ + β|1⟩ where |α|² + |β|² = 1. Measurement collapses superposition to a definite state.",
    category: "Fundamentals",
  },
  {
    id: "entanglement",
    term: "Entanglement",
    definition:
      "A uniquely quantum correlation between two or more particles where their states cannot be described independently. Measuring one entangled particle instantly determines the state of its partner, regardless of distance. Essential for quantum teleportation and quantum key distribution.",
    category: "Fundamentals",
  },
  {
    id: "measurement",
    term: "Measurement",
    definition:
      "The process of extracting classical information from a quantum system. In quantum mechanics, measurement collapses the wavefunction to a definite basis state. The probabilities are given by the Born rule: the probability of outcome i is |⟨i|ψ⟩|².",
    category: "Fundamentals",
  },
  {
    id: "bloch-sphere",
    term: "Bloch Sphere",
    definition:
      "A geometric representation of a single qubit's state as a point on a unit sphere. The north and south poles represent |0⟩ and |1⟩, while points on the equator represent equal superpositions. Any single-qubit gate corresponds to a rotation of the sphere.",
    category: "Fundamentals",
  },
  {
    id: "born-rule",
    term: "Born Rule",
    definition:
      "A fundamental law of quantum mechanics stating that the probability of measuring a quantum system in a particular state is the squared absolute value of the probability amplitude (wavefunction coefficient) for that state.",
    category: "Fundamentals",
  },
  {
    id: "density-matrix",
    term: "Density Matrix",
    definition:
      "A mathematical formalism for describing mixed quantum states (statistical ensembles) as well as pure states. The density matrix ρ generalizes the state vector and is essential for describing open quantum systems and decoherence.",
    category: "Formalism",
  },
  {
    id: "quantum-gate",
    term: "Quantum Gate",
    definition:
      "A reversible unitary operation acting on one or more qubits. Common gates include Pauli gates (X, Y, Z), Hadamard (H), phase gates (S, T), and two-qubit gates like CNOT. Quantum gates form the building blocks of quantum circuits.",
    category: "Gates & Circuits",
  },
  {
    id: "cnot-gate",
    term: "CNOT Gate (Controlled-NOT)",
    definition:
      "A fundamental two-qubit quantum gate that flips the target qubit if the control qubit is |1⟩. The CNOT gate together with single-qubit gates forms a universal set for quantum computation. It can create entanglement between two qubits.",
    category: "Gates & Circuits",
  },
  {
    id: "hadamard-gate",
    term: "Hadamard Gate (H)",
    definition:
      "A single-qubit gate that creates superposition by mapping |0⟩ → (|0⟩+|1⟩)/√2 and |1⟩ → (|0⟩-|1⟩)/√2. The Hadamard gate is essential for quantum algorithms and is its own inverse.",
    category: "Gates & Circuits",
  },
  {
    id: "toffoli-gate",
    term: "Toffoli Gate (CCNOT)",
    definition:
      "A three-qubit quantum gate that is universal for reversible classical computation. It flips the target qubit only if both control qubits are |1⟩. The Toffoli gate is essential for constructing classical logic in quantum circuits.",
    category: "Gates & Circuits",
  },
  {
    id: "unitary-operator",
    term: "Unitary Operator",
    definition:
      "A linear operator U satisfying U†U = UU† = I, where † denotes the conjugate transpose. Unitary operators preserve inner products and represent reversible quantum evolution. All quantum gates are unitary operators.",
    category: "Formalism",
  },
  {
    id: "hamiltonian",
    term: "Hamiltonian",
    definition:
      "The operator representing the total energy of a quantum system. The Hamiltonian H generates time evolution via the Schrödinger equation iℏ ∂|ψ⟩/∂t = H|ψ⟩. Finding eigenvalues of the Hamiltonian is the central goal of many quantum algorithms.",
    category: "Formalism",
  },
  {
    id: "schrodinger-equation",
    term: "Schrödinger Equation",
    definition:
      "The fundamental equation of quantum mechanics describing how quantum states evolve in time. The time-dependent form is iℏ ∂|ψ⟩/∂t = H|ψ⟩, where H is the Hamiltonian.",
    category: "Formalism",
  },
  {
    id: "quantum-fourier-transform",
    term: "Quantum Fourier Transform (QFT)",
    definition:
      "The quantum analogue of the discrete Fourier transform. The QFT maps a quantum state to its Fourier representation exponentially faster than the classical FFT. It is a key subroutine in Shor's algorithm, phase estimation, and many other quantum algorithms.",
    category: "Algorithms",
  },
  {
    id: "grovers-algorithm",
    term: "Grover's Algorithm",
    definition:
      "A quantum search algorithm that finds a marked element in an unsorted database of N items in O(√N) time, a quadratic speedup over classical O(N). It uses amplitude amplification and is optimal for unstructured search.",
    category: "Algorithms",
  },
  {
    id: "shors-algorithm",
    term: "Shor's Algorithm",
    definition:
      "A polynomial-time quantum algorithm for integer factorization, developed by Peter Shor in 1994. It threatens RSA cryptography by factoring large numbers exponentially faster than the best known classical algorithms.",
    category: "Algorithms",
  },
  {
    id: "quantum-phase-estimation",
    term: "Quantum Phase Estimation (QPE)",
    definition:
      "A fundamental quantum algorithm that estimates the eigenvalue (phase) of a unitary operator. It is a key subroutine in Shor's algorithm, quantum chemistry, and quantum machine learning.",
    category: "Algorithms",
  },
  {
    id: "deutsch-jozsa-algorithm",
    term: "Deutsch-Jozsa Algorithm",
    definition:
      "One of the first quantum algorithms to demonstrate exponential advantage over classical computation. It determines whether a boolean function is constant or balanced using only one query.",
    category: "Algorithms",
  },
  {
    id: "quantum-teleportation",
    term: "Quantum Teleportation",
    definition:
      "A protocol that transfers a quantum state from one location to another using entanglement and classical communication. It does not transfer matter or energy faster than light, but enables quantum communication and quantum networks.",
    category: "Communication",
  },
  {
    id: "superdense-coding",
    term: "Superdense Coding",
    definition:
      "A quantum communication protocol that transmits two classical bits of information by sending a single entangled qubit. It demonstrates the information-carrying capacity advantage of entanglement.",
    category: "Communication",
  },
  {
    id: "bb84",
    term: "BB84 (Quantum Key Distribution)",
    definition:
      "The first and most widely implemented quantum cryptography protocol, invented by Bennett and Brassard in 1984. It enables two parties to generate a shared secret key with security guaranteed by quantum mechanics.",
    category: "Cryptography",
  },
  {
    id: "no-cloning-theorem",
    term: "No-Cloning Theorem",
    definition:
      "A fundamental theorem in quantum mechanics stating that it is impossible to create an identical copy of an unknown arbitrary quantum state. This theorem underlies the security of quantum cryptography.",
    category: "Fundamentals",
  },
  {
    id: "decoherence",
    term: "Decoherence",
    definition:
      "The process by which a quantum system loses its quantum properties through interaction with its environment. Decoherence is the primary obstacle to building large-scale quantum computers and is countered by quantum error correction.",
    category: "Hardware",
  },
  {
    id: "quantum-error-correction",
    term: "Quantum Error Correction (QEC)",
    definition:
      "Techniques to protect quantum information from decoherence and other noise. QEC encodes logical qubits into multiple physical qubits using codes like the Shor code and surface codes. Essential for fault-tolerant quantum computation.",
    category: "Hardware",
  },
  {
    id: "stabilizer-formalism",
    term: "Stabilizer Formalism",
    definition:
      "A powerful mathematical framework for describing quantum error-correcting codes using Pauli group operators. The Gottesman-Knill theorem shows that stabilizer circuits can be efficiently simulated classically.",
    category: "Hardware",
  },
  {
    id: "surface-code",
    term: "Surface Code",
    definition:
      "A leading quantum error-correcting code based on a 2D lattice of physical qubits. The surface code has high error thresholds (~1%) and requires only nearest-neighbor interactions, making it the most promising approach for scalable quantum computing.",
    category: "Hardware",
  },
  {
    id: "quantum-supremacy",
    term: "Quantum Supremacy",
    definition:
      "A term coined by John Preskill describing the point at which a quantum computer can perform a calculation that is infeasible for any classical computer. First demonstrated by Google's Sycamore processor in 2019.",
    category: "Theory",
  },
  {
    id: "nisq",
    term: "NISQ (Noisy Intermediate-Scale Quantum)",
    definition:
      "The current era of quantum computing, characterized by quantum processors with 50-1000 qubits that are too noisy for full error correction but can still demonstrate quantum advantage. Coined by John Preskill in 2018.",
    category: "Hardware",
  },
  {
    id: "qaoa",
    term: "QAOA (Quantum Approximate Optimization Algorithm)",
    definition:
      "A variational quantum algorithm for solving combinatorial optimization problems. QAOA is considered a leading candidate for demonstrating quantum advantage on NISQ devices.",
    category: "Algorithms",
  },
];
