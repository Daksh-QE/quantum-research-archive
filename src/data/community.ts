import { CommunityMember } from "./types";

export const communityMembers: CommunityMember[] = [
  // ===== Researchers (RES) =====
  {
    id: "peter-shor",
    name: "Peter Shor",
    initials: "PS",
    role: "RES",
    description:
      "Invented Shor's algorithm for integer factorization. Pioneered quantum error correction with the Shor code. Professor at MIT.",
    url: "https://math.mit.edu/~shor/",
    tags: ["ALGORITHMS", "ERROR CORRECTION", "PIONEER"],
  },
  {
    id: "john-preskill",
    name: "John Preskill",
    initials: "JP",
    role: "RES",
    description:
      "Leading quantum information theorist. Coined the term 'quantum supremacy'. Director of the Institute for Quantum Information and Matter at Caltech.",
    url: "https://en.wikipedia.org/wiki/John_Preskill",
    tags: ["QUANTUM INFORMATION", "SUPREMACY", "EDUCATION"],
  },
  {
    id: "david-deutsch",
    name: "David Deutsch",
    initials: "DD",
    role: "RES",
    description:
      "Pioneer of quantum computing. Invented the Deutsch-Jozsa algorithm. Author of 'The Fabric of Reality' and co-inventor of quantum computational parallelism.",
    url: "https://en.wikipedia.org/wiki/David_Deutsch",
    tags: ["PIONEER", "ALGORITHMS", "PHILOSOPHY"],
  },
  {
    id: "charles-bennett",
    name: "Charles H. Bennett",
    initials: "CB",
    role: "RES",
    description:
      "Co-inventor of quantum teleportation and superdense coding. Pioneered reversible computation and quantum cryptography (BB84).",
    url: "https://en.wikipedia.org/wiki/Charles_H._Bennett_(physicist)",
    tags: ["CRYPTOGRAPHY", "TELEPORTATION", "PIONEER"],
  },
  {
    id: "gilles-brassard",
    name: "Gilles Brassard",
    initials: "GB",
    role: "RES",
    description:
      "Co-inventor of the BB84 quantum key distribution protocol. Pioneered quantum cryptography and quantum communication.",
    url: "https://en.wikipedia.org/wiki/Gilles_Brassard",
    tags: ["CRYPTOGRAPHY", "COMMUNICATION", "PIONEER"],
  },
  {
    id: "robert-rausendorf",
    name: "Robert Raussendorf",
    initials: "RR",
    role: "RES",
    description:
      "Co-inventor of measurement-based quantum computation (one-way quantum computer). Pioneered the cluster-state model of quantum computing.",
    url: "https://en.wikipedia.org/wiki/One-way_quantum_computer",
    tags: ["MEASUREMENT-BASED", "CLUSTER STATES", "PIONEER"],
  },
  {
    id: "alexei-kitaev",
    name: "Alexei Kitaev",
    initials: "AK",
    role: "RES",
    description:
      "Pioneered topological quantum computing, anyons, and the toric code. Developed the quantum phase estimation algorithm and the Kitaev model.",
    url: "https://en.wikipedia.org/wiki/Alexei_Kitaev",
    tags: ["TOPOLOGICAL", "ANYONS", "ALGORITHMS"],
  },
  {
    id: "richard-feynman",
    name: "Richard Feynman",
    initials: "RF",
    role: "RES",
    description:
      "Nobel laureate who first proposed the idea of quantum simulation. His visionary 1982 lecture laid the foundation for quantum computing.",
    url: "https://en.wikipedia.org/wiki/Richard_Feynman",
    tags: ["PIONEER", "SIMULATION", "THEORY"],
  },
  {
    id: "daniel-gottesman",
    name: "Daniel Gottesman",
    initials: "DG",
    role: "RES",
    description:
      "Developed the Gottesman-Knill theorem and stabilizer formalism. Leading researcher in quantum error correction and fault-tolerant quantum computation.",
    url: "https://en.wikipedia.org/wiki/Daniel_Gottesman",
    tags: ["ERROR CORRECTION", "STABILIZER", "FAULT TOLERANCE"],
  },
  {
    id: "john-bell",
    name: "John S. Bell",
    initials: "JB",
    role: "RES",
    description:
      "Derived Bell's theorem, proving that quantum mechanics is incompatible with local hidden variable theories. His work is fundamental to quantum information.",
    url: "https://en.wikipedia.org/wiki/John_Stewart_Bell",
    tags: ["FOUNDATIONS", "BELL INEQUALITIES", "PIONEER"],
  },
  {
    id: "asher-peres",
    name: "Asher Peres",
    initials: "AP",
    role: "RES",
    description:
      "Pioneering contributor to quantum information theory. Co-author of the teleportation paper and author of 'Quantum Theory: Concepts and Methods'.",
    url: "https://en.wikipedia.org/wiki/Asher_Peres",
    tags: ["QUANTUM INFORMATION", "TELEPORTATION", "EDUCATION"],
  },
  {
    id: "anton-zeilinger",
    name: "Anton Zeilinger",
    initials: "AZ",
    role: "RES",
    description:
      "Nobel laureate (2022) for experiments with entangled photons. Pioneered quantum teleportation and quantum communication experiments.",
    url: "https://en.wikipedia.org/wiki/Anton_Zeilinger",
    tags: ["EXPERIMENT", "ENTANGLEMENT", "TELEPORTATION", "NOBEL"],
  },
  {
    id: "alain-aspect",
    name: "Alain Aspect",
    initials: "AA",
    role: "RES",
    description:
      "Nobel laureate (2022) for experimental tests of Bell inequalities. His work established the reality of quantum entanglement.",
    url: "https://en.wikipedia.org/wiki/Alain_Aspect",
    tags: ["EXPERIMENT", "BELL INEQUALITIES", "FOUNDATIONS", "NOBEL"],
  },
  {
    id: "john-clauser",
    name: "John F. Clauser",
    initials: "JC",
    role: "RES",
    description:
      "Nobel laureate (2022) for contributions to Bell inequality experiments. Co-author of the CHSH inequality, foundational to quantum information.",
    url: "https://en.wikipedia.org/wiki/John_Clauser",
    tags: ["EXPERIMENT", "BELL INEQUALITIES", "FOUNDATIONS", "NOBEL"],
  },
  {
    id: "lov-grover",
    name: "Lov Grover",
    initials: "LG",
    role: "RES",
    description:
      "Inventor of Grover's search algorithm, one of the most important quantum algorithms. His work demonstrated that quantum computers can provide provable speedups for unstructured search.",
    url: "https://en.wikipedia.org/wiki/Lov_Grover",
    tags: ["ALGORITHMS", "SEARCH", "PIONEER"],
  },
  {
    id: "andrew-steane",
    name: "Andrew Steane",
    initials: "AS",
    role: "RES",
    description:
      "Inventor of the Steane [[7,1,3]] quantum error correcting code. Professor at Oxford University, contributing to quantum error correction and atomic physics.",
    url: "https://en.wikipedia.org/wiki/Andrew_Steane",
    tags: ["QEC", "ERROR CORRECTION", "OXFORD"],
  },
  {
    id: "seth-lloyd",
    name: "Seth Lloyd",
    initials: "SL",
    role: "RES",
    description:
      "Professor at MIT. Pioneered the first technologically feasible design for a quantum computer and contributed to quantum algorithms and quantum machine learning.",
    url: "https://en.wikipedia.org/wiki/Seth_Lloyd",
    tags: ["ALGORITHMS", "QML", "QUANTUM INFORMATION"],
  },
  {
    id: "john-watrous",
    name: "John Watrous",
    initials: "JW",
    role: "RES",
    description:
      "Leading researcher in quantum information theory, quantum computational complexity, and interactive proofs. Author of 'The Theory of Quantum Information'.",
    url: "https://en.wikipedia.org/wiki/John_Watrous_(computer_scientist)",
    tags: ["QUANTUM INFORMATION", "COMPLEXITY", "THEORY"],
  },

  // ===== Educators (EDU) =====
  {
    id: "scott-aaronson",
    name: "Scott Aaronson",
    initials: "SA",
    role: "EDU",
    description:
      "Professor at UT Austin specializing in quantum complexity theory. Author of 'Quantum Computing Since Democritus'. Runs the Shtetl-Optimized blog.",
    url: "https://www.scottaaronson.com/",
    tags: ["COMPLEXITY THEORY", "BLOGGING", "EDUCATION"],
  },
  {
    id: "michael-nielsen",
    name: "Michael A. Nielsen",
    initials: "MN",
    role: "EDU",
    description:
      "Co-author of the canonical textbook 'Quantum Computation and Quantum Information'. Pioneer of quantum computing education and interactive learning.",
    url: "https://michaelnielsen.org/",
    tags: ["EDUCATION", "BOOK", "LEARNING"],
  },
  {
    id: "leonard-susskind",
    name: "Leonard Susskind",
    initials: "LS",
    role: "EDU",
    description:
      "Stanford professor and author of 'Quantum Mechanics: The Theoretical Minimum'. Known for making quantum mechanics accessible through his lecture series.",
    url: "https://en.wikipedia.org/wiki/Leonard_Susskind",
    tags: ["EDUCATION", "THEORETICAL MINIMUM", "QM FOUNDATIONS"],
  },
  {
    id: "andy-matuschak",
    name: "Andy Matuschak",
    initials: "AM",
    role: "EDU",
    description:
      "Creator of quantum.country and pioneer of interactive quantum computing education using spaced repetition and mnemonic techniques.",
    url: "https://andymatuschak.org/",
    tags: ["EDUCATION", "INTERACTIVE", "QUANTUM COUNTRY"],
  },
  {
    id: "shannon-sessions",
    name: "Shannon Sessions",
    initials: "SS",
    role: "EDU",
    description:
      "Founder of Qubit by Qubit, a comprehensive quantum computing education program for high school and undergraduate students.",
    url: "https://www.thecodingschool.com/qubitbyqubit",
    tags: ["EDUCATION", "YOUTH", "CURRICULUM"],
  },
  {
    id: "abraham-asfaw",
    name: "Abraham Asfaw",
    initials: "AA",
    role: "EDU",
    description:
      "IBM Quantum's global lead for quantum education. Drives the Qiskit textbook, summer schools, and quantum educational initiatives worldwide.",
    url: "https://en.wikipedia.org/wiki/Abraham_Asfaw",
    tags: ["EDUCATION", "QISKIT", "SUMMER SCHOOL"],
  },

  // ===== Builders (BUILD) =====
  {
    id: "ibm-quantum",
    name: "IBM Quantum",
    initials: "IBM",
    role: "BUILD",
    description:
      "Industry leader in superconducting quantum processors. Created the Qiskit SDK. Achieved 1000+ qubit quantum processor. Operates cloud quantum access.",
    url: "https://www.ibm.com/quantum",
    tags: ["INDUSTRY", "QISKIT", "SUPERCONDUCTING", "CLOUD"],
  },
  {
    id: "google-quantum-ai",
    name: "Google Quantum AI",
    initials: "GQ",
    role: "BUILD",
    description:
      "Demonstrated quantum supremacy with Sycamore processor. Develops Cirq SDK. Pioneering fault-tolerant quantum computing with Willow chip.",
    url: "https://quantumai.google/",
    tags: ["INDUSTRY", "SUPREMACY", "SYCAMORE", "CIRQ"],
  },
  {
    id: "rigetti",
    name: "Rigetti Computing",
    initials: "RC",
    role: "BUILD",
    description:
      "Pioneering hybrid quantum-classical computing. Builds superconducting quantum processors and develops the Forest SDK.",
    url: "https://www.rigetti.com/",
    tags: ["INDUSTRY", "SUPERCONDUCTING", "FOREST"],
  },
  {
    id: "quantinuum",
    name: "Quantinuum",
    initials: "QN",
    role: "BUILD",
    description:
      "Integrated quantum computing company formed from Honeywell Quantum Solutions and Cambridge Quantum. Develops trapped-ion processors and TKET SDK.",
    url: "https://www.quantinuum.com/",
    tags: ["INDUSTRY", "TRAPPED-ION", "TKET", "CYBERSECURITY"],
  },
  {
    id: "ionq",
    name: "IonQ",
    initials: "IQ",
    role: "BUILD",
    description:
      "Industry leader in trapped-ion quantum computing. Offers cloud-accessible quantum processors with industry-leading gate fidelities.",
    url: "https://ionq.com/",
    tags: ["INDUSTRY", "TRAPPED-ION", "CLOUD", "HIGH-FIDELITY"],
  },
  {
    id: "xanadu",
    name: "Xanadu",
    initials: "XU",
    role: "BUILD",
    description:
      "Develops photonic quantum computers and the PennyLane QML framework. Pioneer of continuous-variable quantum computing and quantum machine learning.",
    url: "https://xanadu.ai/",
    tags: ["INDUSTRY", "PHOTONIC", "PENNYLANE", "QML"],
  },
  {
    id: "dwave",
    name: "D-Wave Systems",
    initials: "DW",
    role: "BUILD",
    description:
      "First commercial quantum computing company. Specializes in quantum annealing systems and hybrid quantum-classical solvers for optimization.",
    url: "https://www.dwavesys.com/",
    tags: ["INDUSTRY", "ANNEALING", "OPTIMIZATION", "PIONEER"],
  },
  {
    id: "psiquantum",
    name: "PsiQuantum",
    initials: "PQ",
    role: "BUILD",
    description:
      "Developing fault-tolerant photonic quantum computers with a focus on million-qubit-scale systems using silicon photonics.",
    url: "https://www.psiquantum.com/",
    tags: ["INDUSTRY", "PHOTONIC", "FAULT-TOLERANT", "SCALE-UP"],
  },

  // ===== Institutes / Leaders (LEAD) =====
  {
    id: "mit-cqe",
    name: "MIT Center for Quantum Engineering",
    initials: "CQE",
    role: "LEAD",
    description:
      "Interdisciplinary center advancing quantum technologies through research, education, and industry partnerships. Focus on quantum hardware and systems.",
    url: "https://cqe.mit.edu/",
    tags: ["RESEARCH", "EDUCATION", "HARDWARE"],
  },
  {
    id: "caltech-iqim",
    name: "Caltech Institute for Quantum Information and Matter",
    initials: "IQIM",
    role: "LEAD",
    description:
      "Leading academic institute for quantum information research, founded by John Preskill. Covers quantum computing, communication, and sensing.",
    url: "https://iqim.caltech.edu/",
    tags: ["RESEARCH", "QUANTUM INFORMATION", "ACADEMIA"],
  },
  {
    id: "waterloo-iqc",
    name: "University of Waterloo Institute for Quantum Computing",
    initials: "IQC",
    role: "LEAD",
    description:
      "One of the world's largest quantum computing research institutes. Expertise in quantum algorithms, cryptography, and experimental implementations.",
    url: "https://uwaterloo.ca/institute-for-quantum-computing/",
    tags: ["RESEARCH", "CRYPTOGRAPHY", "EXPERIMENTAL"],
  },
  {
    id: "oxford-quantum",
    name: "Oxford University Department of Physics — Quantum",
    initials: "OU",
    role: "LEAD",
    description:
      "One of the world's leading centers for quantum physics research, with strengths in quantum computing, quantum optics, and condensed matter physics.",
    url: "https://www.oxfordquantum.org/",
    tags: ["RESEARCH", "EDUCATION", "QUANTUM OPTICS"],
  },
  {
    id: "qutech",
    name: "QuTech (TU Delft)",
    initials: "QT",
    role: "LEAD",
    description:
      "A premier Dutch research institute for quantum computing and quantum internet. Pioneering topological qubits and quantum network protocols.",
    url: "https://qutech.nl/",
    tags: ["RESEARCH", "QUANTUM INTERNET", "TOPOLOGICAL", "HARDWARE"],
  },
  {
    id: "nist-qis",
    name: "NIST Quantum Information Science",
    initials: "NQ",
    role: "LEAD",
    description:
      "National Institute of Standards and Technology leading research in quantum metrology, quantum sensing, and post-quantum cryptography standards.",
    url: "https://www.nist.gov/quantum-information-science",
    tags: ["RESEARCH", "STANDARDS", "METROLOGY", "POST-QUANTUM"],
  },
];
