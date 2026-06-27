import { GlossaryTerm } from "./types";

export const glossaryTerms: GlossaryTerm[] = [
  // ===== Fundamentals =====
  {
    id: "ancilla-qubit",
    term: "Ancilla Qubit",
    definition:
      "An auxiliary qubit used in quantum error correction to mediate interactions. Ancilla qubits are measured to extract syndrome information without disturbing the logical qubits they protect.",
    category: "Fundamentals",
  },
  {
    id: "logical-qubit",
    term: "Logical Qubit",
    definition:
      "A qubit encoded across multiple physical qubits using a quantum error-correcting code. Logical qubits are protected from noise and enable fault-tolerant quantum computation. A distance-d code uses d physical qubits per logical qubit.",
    category: "Fundamentals",
  },
  {
    id: "t1-t2-coherence",
    term: "T\u2081 and T\u2082 Coherence Times",
    definition:
      "T\u2081 (energy relaxation time) is the time for a qubit to decay from |1\u27e9 to |0\u27e9. T\u2082 (dephasing time) is the time for phase information to be lost. Together they characterize qubit coherence and gate fidelity limits.",
    category: "Hardware",
  },
  {
    id: "fault-tolerance-threshold",
    term: "Fault-Tolerance Threshold",
    definition:
      "The maximum physical error rate below which a quantum error-correcting code can suppress errors arbitrarily by increasing code distance. For surface codes the threshold is approximately 1% per gate.",
    category: "Hardware",
  },
  {
    id: "magic-state",
    term: "Magic State",
    definition:
      "A specific non-stabilizer quantum state that enables universal quantum computation when injected into a stabilizer circuit. Magic state distillation purifies many noisy magic states into a single high-fidelity one.",
    category: "Gates & Circuits",
  },
  {
    id: "transversal-gate",
    term: "Transversal Gate",
    definition:
      "A fault-tolerant gate where each physical qubit in a code block interacts only with the corresponding qubit in another block. Transversal gates don't propagate errors within a block.",
    category: "Gates & Circuits",
  },
  {
    id: "barren-plateau",
    term: "Barren Plateau",
    definition:
      "A phenomenon where the gradient of a variational quantum algorithm's cost function vanishes exponentially with qubit count, making optimization impossible. A key challenge in quantum machine learning.",
    category: "Algorithms",
  },
  {
    id: "trotterization",
    term: "Trotterization",
    definition:
      "A technique for approximating quantum time evolution by breaking the Hamiltonian into non-commuting parts and applying short-time slices in alternating order. Essential for quantum simulation on digital computers.",
    category: "Algorithms",
  },
  {
    id: "jordan-wigner",
    term: "Jordan-Wigner Transformation",
    definition:
      "A mapping between fermionic operators and Pauli spin operators that lets quantum computers simulate electrons in molecules and materials. Essential for quantum chemistry.",
    category: "Algorithms",
  },
  {
    id: "quantum-volume",
    term: "Quantum Volume",
    definition:
      "A metric measuring quantum computer capability, combining qubit count, gate fidelity, connectivity, and coherence. Quantum volume 2\u207f means the system can run all 2\u207f random circuits of width n and depth n.",
    category: "Hardware",
  },
  {
    id: "ansatz",
    term: "Ansatz",
    definition:
      "A parameterized quantum circuit optimized to solve a problem. The ansatz choice (hardware-efficient, UCCSD, QAOA) strongly affects variational algorithm performance like VQE and QAOA.",
    category: "Algorithms",
  },
  {
    id: "swap-network",
    term: "SWAP Network",
    definition:
      "A sequence of SWAP gates routing qubits on limited-connectivity hardware, enabling multi-qubit gates between non-adjacent qubits.",
    category: "Gates & Circuits",
  },
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
    id: "no-cloning-theorem",
    term: "No-Cloning Theorem",
    definition:
      "A fundamental theorem in quantum mechanics stating that it is impossible to create an identical copy of an unknown arbitrary quantum state. This theorem underlies the security of quantum cryptography.",
    category: "Fundamentals",
  },
  {
    id: "wavefunction",
    term: "Wavefunction",
    definition:
      "A mathematical description of the quantum state of a system. Represented by ψ(x), the wavefunction encodes the probability amplitude for finding a particle at a given position. The squared magnitude |ψ(x)|² gives the probability density.",
    category: "Fundamentals",
  },
  {
    id: "hilbert-space",
    term: "Hilbert Space",
    definition:
      "A complete vector space with an inner product, used as the mathematical foundation for quantum mechanics. Quantum states are represented as vectors in a Hilbert space, and observables are represented as operators acting on this space.",
    category: "Fundamentals",
  },
  {
    id: "dirac-notation",
    term: "Dirac Notation (Bra-Ket)",
    definition:
      "A convenient notation for quantum states where |ψ⟩ (ket) represents a state vector and ⟨ψ| (bra) represents its dual. Inner products are written as ⟨φ|ψ⟩ and outer products as |ψ⟩⟨φ|. Developed by Paul Dirac.",
    category: "Fundamentals",
  },

  // ===== Formalism =====
  {
    id: "density-matrix",
    term: "Density Matrix",
    definition:
      "A mathematical formalism for describing mixed quantum states (statistical ensembles) as well as pure states. The density matrix ρ generalizes the state vector and is essential for describing open quantum systems and decoherence.",
    category: "Formalism",
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
      "The fundamental equation of quantum mechanics describing how quantum states evolve in time. The time-dependent form is iℏ ∂|ψ⟩/∂t = H|ψ⟩, where H is the Hamiltonian. Developed by Erwin Schrödinger in 1925.",
    category: "Formalism",
  },
  {
    id: "heisenberg-uncertainty",
    term: "Heisenberg Uncertainty Principle",
    definition:
      "A fundamental limit stating that certain pairs of physical properties, such as position and momentum, cannot be both measured with arbitrary precision. The product of their uncertainties is at least ℏ/2.",
    category: "Formalism",
  },
  {
    id: "pauli-matrices",
    term: "Pauli Matrices",
    definition:
      "A set of three 2×2 Hermitian matrices (σx, σy, σz) that form a basis for single-qubit operations. They correspond to spin-½ observables and generate rotations around the x, y, and z axes of the Bloch sphere.",
    category: "Formalism",
  },
  {
    id: "commutator",
    term: "Commutator",
    definition:
      "An operator defined as [A, B] = AB - BA, measuring the degree to which two operators fail to commute. In quantum mechanics, non-zero commutators lead to uncertainty relations and are fundamental to quantum dynamics.",
    category: "Formalism",
  },
  {
    id: "tensor-product",
    term: "Tensor Product",
    definition:
      "A mathematical operation for combining quantum systems. If system A is in state |ψ⟩ and system B is in state |φ⟩, the combined state is |ψ⟩ ⊗ |φ⟩. The tensor product is essential for describing multi-qubit systems and entanglement.",
    category: "Formalism",
  },

  // ===== Gates & Circuits =====
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
    id: "swap-gate",
    term: "SWAP Gate",
    definition:
      "A two-qubit gate that swaps the states of two qubits. The SWAP gate can be decomposed into three CNOT gates and is used in quantum circuit routing and entanglement swapping.",
    category: "Gates & Circuits",
  },
  {
    id: "phase-gate",
    term: "Phase Gate (S Gate)",
    definition:
      "A single-qubit gate that applies a phase of i to the |1⟩ state while leaving |0⟩ unchanged. The S gate is a special case of the more general phase shift gate and is part of the Clifford gate set.",
    category: "Gates & Circuits",
  },
  {
    id: "t-gate",
    term: "T Gate (π/8 Gate)",
    definition:
      "A single-qubit gate that applies a phase of e^{iπ/4} to the |1⟩ state. The T gate is non-Clifford and is required for universal quantum computation when combined with Clifford gates.",
    category: "Gates & Circuits",
  },
  {
    id: "universal-gate-set",
    term: "Universal Gate Set",
    definition:
      "A set of quantum gates that can approximate any unitary operation to arbitrary precision. A universal set typically includes all single-qubit gates plus a two-qubit entangling gate like CNOT or CZ.",
    category: "Gates & Circuits",
  },
  {
    id: "quantum-circuit",
    term: "Quantum Circuit",
    definition:
      "A model for quantum computation where a sequence of quantum gates, measurements, and initializations are applied to qubits. Circuits are represented visually with horizontal wires for qubits and gate symbols along them.",
    category: "Gates & Circuits",
  },
  {
    id: "clifford-gates",
    term: "Clifford Gates",
    definition:
      "The set of quantum gates that map Pauli operators to Pauli operators under conjugation. Includes Hadamard, S gate, and CNOT. Clifford gates alone can be efficiently simulated classically (Gottesman-Knill theorem).",
    category: "Gates & Circuits",
  },

  // ===== Algorithms =====
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
    id: "qaoa",
    term: "QAOA (Quantum Approximate Optimization Algorithm)",
    definition:
      "A variational quantum algorithm for solving combinatorial optimization problems. QAOA is considered a leading candidate for demonstrating quantum advantage on NISQ devices.",
    category: "Algorithms",
  },
  {
    id: "vqe",
    term: "VQE (Variational Quantum Eigensolver)",
    definition:
      "A hybrid quantum-classical algorithm for finding the ground state energy of a Hamiltonian. VQE is the leading algorithm for quantum chemistry on NISQ devices.",
    category: "Algorithms",
  },
  {
    id: "amplitude-amplification",
    term: "Amplitude Amplification",
    definition:
      "A generalization of Grover's algorithm that amplifies the amplitude of desired quantum states. It provides quadratic speedup for a wide class of search and optimization problems.",
    category: "Algorithms",
  },
  {
    id: "quantum-walks",
    term: "Quantum Walks",
    definition:
      "The quantum analogue of classical random walks, where the walker evolves via unitary operations rather than probabilistic transitions. Quantum walks can provide exponential speedups for certain graph problems.",
    category: "Algorithms",
  },
  {
    id: "hhl-algorithm",
    term: "HHL Algorithm (Quantum Linear Systems)",
    definition:
      "Harrow-Hassidim-Lloyd algorithm for solving linear systems of equations exponentially faster than classical algorithms. A foundational quantum algorithm for scientific computing.",
    category: "Algorithms",
  },

  // ===== Communication =====
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
    id: "quantum-key-distribution",
    term: "Quantum Key Distribution (QKD)",
    definition:
      "A secure communication protocol that uses quantum mechanics to establish a shared secret key between two parties. Security is guaranteed by the laws of quantum mechanics rather than computational hardness.",
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
    id: "quantum-repeater",
    term: "Quantum Repeater",
    definition:
      "A device that extends the range of quantum communication by overcoming signal loss through entanglement swapping and quantum error correction. Essential for long-distance quantum networks.",
    category: "Communication",
  },
  {
    id: "entanglement-swapping",
    term: "Entanglement Swapping",
    definition:
      "A protocol that creates entanglement between two particles that have never interacted, by performing a Bell state measurement on two other entangled particles. Fundamental to quantum repeaters.",
    category: "Communication",
  },
  {
    id: "quantum-channel",
    term: "Quantum Channel",
    definition:
      "A communication channel that transmits quantum information, typically modeled as a completely positive trace-preserving (CPTP) map. Quantum channels are the most general form of quantum evolution.",
    category: "Communication",
  },

  // ===== Cryptography =====
  {
    id: "post-quantum-cryptography",
    term: "Post-Quantum Cryptography (PQC)",
    definition:
      "Cryptographic algorithms designed to be secure against attacks from both classical and quantum computers. NIST is standardizing PQC algorithms to replace RSA and ECC.",
    category: "Cryptography",
  },
  {
    id: "ekert-protocol",
    term: "E91 Protocol (Ekert's QKD)",
    definition:
      "A quantum key distribution protocol proposed by Artur Ekert in 1991 that uses entangled pairs and Bell's inequality to guarantee security. An alternative to BB84.",
    category: "Cryptography",
  },
  {
    id: "quantum-cryptography",
    term: "Quantum Cryptography",
    definition:
      "The science of using quantum mechanical properties to perform cryptographic tasks. Includes quantum key distribution, quantum coin flipping, and quantum digital signatures.",
    category: "Cryptography",
  },

  // ===== Hardware =====
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
    id: "superconducting-qubit",
    term: "Superconducting Qubit",
    definition:
      "A qubit implementation using superconducting circuits, typically based on Josephson junctions. The leading platform for quantum computing, used by IBM, Google, and Rigetti. Operates at millikelvin temperatures.",
    category: "Hardware",
  },
  {
    id: "trapped-ion-qubit",
    term: "Trapped Ion Qubit",
    definition:
      "A qubit implementation using individual ions trapped by electromagnetic fields and manipulated with lasers. Offers high gate fidelities and long coherence times. Used by IonQ, Quantinuum, and others.",
    category: "Hardware",
  },
  {
    id: "photonic-qubit",
    term: "Photonic Qubit",
    definition:
      "A qubit implementation using photons, where quantum information is encoded in properties like polarization, time-bin, or path. Well-suited for quantum communication and networking.",
    category: "Hardware",
  },
  {
    id: "topological-qubit",
    term: "Topological Qubit",
    definition:
      "A qubit that encodes quantum information in non-local topological properties, making it naturally resistant to decoherence. Being pursued by Microsoft and others for fault-tolerant quantum computing.",
    category: "Hardware",
  },
  {
    id: "nisq",
    term: "NISQ (Noisy Intermediate-Scale Quantum)",
    definition:
      "The current era of quantum computing, characterized by quantum processors with 50-1000 qubits that are too noisy for full error correction but can still demonstrate quantum advantage. Coined by John Preskill in 2018.",
    category: "Hardware",
  },
  {
    id: "cryogenic",
    term: "Cryogenic Quantum Computing",
    definition:
      "The practice of operating quantum processors at extremely low temperatures (millikelvin range) to reduce thermal noise and maintain quantum coherence. Dilution refrigerators are the primary cooling technology.",
    category: "Hardware",
  },

  // ===== Theory =====
  {
    id: "quantum-supremacy",
    term: "Quantum Supremacy",
    definition:
      "A term coined by John Preskill describing the point at which a quantum computer can perform a calculation that is infeasible for any classical computer. First demonstrated by Google's Sycamore processor in 2019.",
    category: "Theory",
  },
  {
    id: "quantum-advantage",
    term: "Quantum Advantage",
    definition:
      "A broader term than quantum supremacy, referring to any practical problem where a quantum computer can provide a meaningful speedup or better solution than classical computers. May be demonstrated sooner than full supremacy.",
    category: "Theory",
  },
  {
    id: "bell-inequality",
    term: "Bell's Inequality",
    definition:
      "A mathematical inequality derived by John Bell in 1964, showing that local hidden variable theories cannot reproduce all predictions of quantum mechanics. Violation of Bell's inequality demonstrates quantum entanglement.",
    category: "Theory",
  },
  {
    id: "quantum-complexity",
    term: "Quantum Computational Complexity",
    definition:
      "The study of computational complexity classes defined by quantum computers, including BQP (bounded-error quantum polynomial time), QMA, and QIP. Understanding these classes reveals the power and limits of quantum computation.",
    category: "Theory",
  },
  {
    id: "bqp",
    term: "BQP (Bounded-Error Quantum Polynomial Time)",
    definition:
      "The complexity class of decision problems solvable by a quantum computer in polynomial time with error probability ≤ 1/3. BQP is believed to contain problems not in P but likely does not contain NP-complete problems.",
    category: "Theory",
  },
  {
    id: "quantum-channel-capacity",
    term: "Quantum Channel Capacity",
    definition:
      "The maximum rate at which quantum information can be reliably transmitted through a noisy quantum channel. The Lloyd-Shor-Devetak theorem provides a formula for the quantum capacity.",
    category: "Theory",
  },
  {
    id: "quantum-entropy",
    term: "Quantum Entropy (Von Neumann Entropy)",
    definition:
      "A measure of uncertainty or randomness in a quantum state, defined as S(ρ) = -Tr(ρ log ρ). Generalizes classical Shannon entropy to quantum systems and is fundamental to quantum information theory.",
    category: "Theory",
  },
];
