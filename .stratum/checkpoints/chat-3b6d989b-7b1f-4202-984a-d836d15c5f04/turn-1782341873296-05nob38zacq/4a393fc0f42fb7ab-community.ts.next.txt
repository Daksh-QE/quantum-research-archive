import { CommunityMember } from "./types";

export const communityMembers: CommunityMember[] = [
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
    url: "https://theory.caltech.edu/people/preskill/",
    tags: ["QUANTUM INFORMATION", "SUPREMACY", "EDUCATION"],
  },
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
    id: "robert-rausendorf",
    name: "Robert Raussendorf",
    initials: "RR",
    role: "RES",
    description:
      "Co-inventor of measurement-based quantum computation (one-way quantum computer). Pioneered the cluster-state model of quantum computing.",
    url: "https://en.wikipedia.org/wiki/Robert_Raussendorf",
    tags: ["MEASUREMENT-BASED", "CLUSTER STATES", "PIONEER"],
  },
  {
    id: "alexei-kitaev",
    name: "Alexei Kitaev",
    initials: "AK",
    role: "RES",
    description:
      "Pioneered topological quantum computing and the stabilizer formalism. Developed the quantum phase estimation algorithm and the Kitaev model.",
    url: "https://en.wikipedia.org/wiki/Alexei_Kitaev",
    tags: ["TOPOLOGICAL", "STABILIZER", "ALGORITHMS"],
  },
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
    id: "rigetti",
    name: "Rigetti Computing",
    initials: "RC",
    role: "BUILD",
    description:
      "Pioneering hybrid quantum-classical computing. Builds superconducting quantum processors and develops the Forest SDK.",
    url: "https://www.rigetti.com/",
    tags: ["INDUSTRY", "SUPERCONDUCTING", "FOREST"],
  },
];
