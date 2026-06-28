import { Article } from "./types";

export const articles: Article[] = [
  {
    id: "qc-for-the-very-curious",
    title: "Quantum Computing for the Very Curious",
    author: "Andy Matuschak & Michael Nielsen",
    description:
      "An immersive, interactive essay using mnemonic techniques to explain quantum computing fundamentals — qubits, superposition, and quantum gates.",
    url: "https://quantum.country/qcvc",
    tags: ["GUIDE", "TUT", "INTERACTIVE"],
    domain: "Quantum Computing",
  },
  {
    id: "preskill-quantum-supremacy",
    title: "Quantum Supremacy and the Complexity of Quantum Simulation",
    author: "John Preskill",
    description:
      "The lecture that coined 'quantum supremacy' — explaining why simulating quantum systems on classical computers is hard.",
    url: "https://www.quantamagazine.org/john-preskill-explains-quantum-supremacy-20191002/",
    tags: ["PAPER", "GUIDE"],
    domain: "Quantum Computing",
  },
  {
    id: "quantum-country",
    title: "Quantum Country: A Free Quantum Computing Course",
    author: "Andy Matuschak & Michael Nielsen",
    description:
      "A spaced-repetition-powered interactive textbook covering the basics of quantum computing and quantum mechanics.",
    url: "https://quantum.country/",
    tags: ["COURSE", "INTERACTIVE", "GUIDE"],
    domain: "Both",
  },
  {
    id: "shtetl-optimized",
    title: "Shtetl-Optimized: Scott Aaronson's Blog",
    author: "Scott Aaronson",
    description:
      "A must-read blog covering quantum computing theory, complexity, philosophy, and meta-science with deep insight and humor.",
    url: "https://www.scottaaronson.com/blog/",
    tags: ["BLOG", "GUIDE", "OPINION"],
    domain: "Both",
  },
  {
    id: "quantum-computing-stack-exchange",
    title: "Quantum Computing Stack Exchange",
    author: "Community",
    description:
      "A Q&A platform for quantum computing researchers, engineers, and enthusiasts. High-quality technical discussions.",
    url: "https://quantumcomputing.stackexchange.com/",
    tags: ["FORUM", "Q&A", "COMMUNITY"],
    domain: "Quantum Computing",
  },
  {
    id: "qiskit-textbook",
    title: "IBM Quantum Learning — Official Tutorials",
    author: "IBM Quantum",
    description:
      "A comprehensive, interactive textbook teaching quantum computing through the Qiskit SDK with hands-on coding exercises.",
    url: "https://learning.quantum.ibm.com/",
    tags: ["GUIDE", "TUT", "INTERACTIVE", "COURSE"],
    domain: "Quantum Computing",
  },
  {
    id: "deutsch-quantum-thesis",
    title: "Quantum Theory, the Church-Turing Principle and the Universal Quantum Computer",
    author: "David Deutsch",
    description:
      "The seminal 1985 paper that first proposed the concept of a universal quantum computer and the quantum Church-Turing thesis.",
    url: "https://royalsocietypublishing.org/doi/10.1098/rspa.1985.0070",
    tags: ["PAPER", "PIONEER", "THEORY"],
    domain: "Quantum Computing",
  },
  {
    id: "feynman-quantum-simulator",
    title: "Simulating Physics with Computers",
    author: "Richard Feynman",
    description:
      "Feynman's visionary 1982 paper that first suggested using quantum systems to simulate other quantum systems — the birth of quantum computing.",
    url: "https://link.springer.com/article/10.1007/BF02650179",
    tags: ["PAPER", "PIONEER", "THEORY"],
    domain: "Both",
  },
  {
    id: "gottesman-stabilizer-review",
    title: "An Introduction to Quantum Error Correction and Fault-Tolerant Quantum Computation",
    author: "Daniel Gottesman",
    description:
      "A comprehensive technical introduction to quantum error correction, stabilizer codes, and fault-tolerant architectures.",
    url: "https://arxiv.org/abs/0904.2557",
    tags: ["PAPER", "GUIDE"],
    domain: "Quantum Computing",
  },
  {
    id: "preskill-nisq",
    title: "Quantum Computing in the NISQ Era and Beyond",
    author: "John Preskill",
    description:
      "The seminal paper that defined the NISQ (Noisy Intermediate-Scale Quantum) era. Explains what we can expect from near-term quantum devices.",
    url: "https://arxiv.org/abs/1801.00862",
    tags: ["PAPER", "GUIDE", "NISQ"],
    domain: "Quantum Computing",
  },
  {
    id: "aaronson-limits",
    title: "The Limits of Quantum Computers",
    author: "Scott Aaronson",
    description:
      "A sharp, accessible Scientific American article on what quantum computers can and cannot do, and the fundamental complexity barriers they face.",
    url: "https://www.scientificamerican.com/article/the-limits-of-quantum-computers/",
    tags: ["ARTICLE", "GUIDE", "COMPLEXITY"],
    domain: "Quantum Computing",
  },
  {
    id: "diVincenzo-physical-implementation",
    title: "The Physical Implementation of Quantum Computation",
    author: "David P. DiVincenzo",
    description:
      "The foundational paper that lays out DiVincenzo's criteria for building a quantum computer — the five requirements every physical implementation must meet.",
    url: "https://arxiv.org/abs/quant-ph/0002077",
    tags: ["PAPER", "GUIDE", "HARDWARE"],
    domain: "Quantum Computing",
  },
  {
    id: "quantum-supremacy-nature",
    title: "Quantum Supremacy Using a Programmable Superconducting Processor",
    author: "Frank Arute et al. (Google Quantum AI)",
    description:
      "The landmark 2019 Nature paper demonstrating quantum supremacy for the first time using Google's 53-qubit Sycamore processor.",
    url: "https://www.nature.com/articles/s41586-019-1666-5",
    tags: ["PAPER", "SUPREMACY", "EXPERIMENT"],
    domain: "Quantum Computing",
  },
  {
    id: "qml-review",
    title: "Quantum Machine Learning: A Review and Outlook",
    author: "Biamonte, Wittek, Pancotti, et al.",
    description:
      "A comprehensive review of quantum machine learning methods, covering variational quantum classifiers, quantum kernel methods, and the potential for quantum advantage.",
    url: "https://arxiv.org/abs/1611.09347",
    tags: ["PAPER", "QML", "REVIEW"],
    domain: "Quantum Computing",
  },
  {
    id: "quantum-volume-ibm",
    title: "Demonstrating Quantum Volume 64 on a 27-Qubit System",
    author: "Jurcevic et al. (IBM Quantum)",
    description:
      "IBM's demonstration of Quantum Volume 64 on a 27-qubit processor, explaining the quantum volume metric and its significance for benchmarking.",
    url: "https://arxiv.org/abs/2008.08571",
    tags: ["PAPER", "BENCHMARK", "HARDWARE"],
    domain: "Quantum Computing",
  },
  {
    id: "fault-tolerant-microsoft",
    title: "Building a Fault-Tolerant Quantum Computer",
    author: "Microsoft Quantum",
    description:
      "An overview of Microsoft's approach to building a fault-tolerant quantum computer using topological qubits, covering the roadmap and key milestones.",
    url: "https://azure.microsoft.com/en-us/resources/quantum-computing/",
    tags: ["ARTICLE", "FAULT-TOLERANCE", "ROADMAP"],
    domain: "Quantum Computing",
  },
  {
    id: "quantum-computing-for-everyone",
    title: "Quantum Computing for Everyone",
    author: "IBM Research",
    description:
      "An accessible introduction to quantum computing concepts aimed at a general audience, covering qubits, superposition, entanglement, and quantum algorithms.",
    url: "https://www.ibm.com/think/topics/quantum-computing",
    tags: ["GUIDE", "INTRO", "IBM"],
    domain: "Quantum Computing",
  },
  {
    id: "qec-for-beginners",
    title: "Quantum Error Correction for Beginners",
    author: "Google Quantum AI",
    description:
      "An introductory guide to quantum error correction, explaining the repetition code, stabilizer formalism, and how surface codes enable fault-tolerant computation.",
    url: "https://quantumai.google/education/quantum-error-correction",
    tags: ["GUIDE", "QEC", "BEGINNER"],
    domain: "Quantum Computing",
  },
  {
    id: "quantum-algorithms-scientific",
    title: "Quantum Algorithms for Scientific Computing",
    author: "Google Research",
    description:
      "An overview of quantum algorithms with applications to scientific computing, including quantum simulation, linear systems (HHL), and quantum optimization.",
    url: "https://research.google/pubs/pub48619/",
    tags: ["PAPER", "ALGORITHMS", "SIMULATION"],
    domain: "Quantum Computing",
  },
  {
    id: "quantum-real-world",
    title: "Quantum Computing in the Real World",
    author: "Quanta Magazine",
    description:
      "A Quanta Magazine article on the current state of quantum computing, the challenges of building scalable quantum systems, and what to expect in the near future.",
    url: "https://www.quantamagazine.org/tag/quantum-computing/",
    tags: ["ARTICLE", "JOURNALISM", "OVERVIEW"],
    domain: "Quantum Computing",
  },
  {
    id: "practical-intro-qc",
    title: "A Practical Introduction to Quantum Computing",
    author: "IBM Research",
    description:
      "A practical guide that walks through building and running quantum circuits using Qiskit, from basic gates through to variational algorithms on real hardware.",
    url: "https://learning.quantum.ibm.com/catalog/basics",
    tags: ["GUIDE", "TUT", "PRACTICAL", "QISKIT"],
    domain: "Quantum Computing",
  },
  {
    id: "bird-eye-view-aaronson",
    title: "Quantum Computing: A Bird's Eye View",
    author: "Scott Aaronson",
    description:
      "A high-level overview of quantum computing aimed at non-specialists, covering the key ideas and why researchers believe quantum computers will be powerful.",
    url: "https://www.scottaaronson.com/blog/?p=208",
    tags: ["ARTICLE", "OVERVIEW", "BLOG"],
    domain: "Quantum Computing",
  },
  {
    id: "variational-quantum-algorithms",
    title: "Variational Quantum Algorithms",
    author: "Cerezo, Arrasmith, Babbush, et al.",
    description:
      "A comprehensive review of variational quantum algorithms (VQE, QAOA), their theory, applications, and the challenges of barren plateaus and trainability.",
    url: "https://arxiv.org/abs/2012.09265",
    tags: ["PAPER", "VARIATIONAL", "REVIEW"],
    domain: "Quantum Computing",
  },
  {
    id: "quantum-software-stack",
    title: "The Quantum Software Stack",
    author: "Various",
    description:
      "An overview of the quantum software stack, from hardware control to high-level algorithms, on Wikipedia's quantum programming page.",
    url: "https://en.wikipedia.org/wiki/Quantum_programming",
    tags: ["ARTICLE", "SOFTWARE", "STACK"],
    domain: "Quantum Computing",
  },
  {
    id: "shor-1997-original",
    title: "Polynomial-Time Algorithms for Prime Factorization and Discrete Logarithms on a Quantum Computer",
    author: "Peter Shor",
    description:
      "The original 1997 paper presenting Shor's algorithm for integer factorization, with broad implications for cryptography and complexity theory.",
    url: "https://arxiv.org/abs/quant-ph/9508027",
    tags: ["PAPER", "PIONEER", "ALGORITHM"],
    domain: "Quantum Computing",
  },
  {
    id: "grover-original",
    title: "A Fast Quantum Mechanical Algorithm for Database Search",
    author: "Lov Grover",
    description:
      "The original paper presenting Grover's search algorithm, demonstrating a quadratic speedup for unstructured search on quantum computers.",
    url: "https://arxiv.org/abs/quant-ph/9605043",
    tags: ["PAPER", "PIONEER", "ALGORITHM"],
    domain: "Quantum Computing",
  },
  {
    id: "bb84-original",
    title: "Quantum Cryptography: Public Key Distribution and Coin Tossing",
    author: "Charles H. Bennett & Gilles Brassard",
    description:
      "The original 1984 paper introducing the BB84 quantum key distribution protocol — the first and most widely implemented quantum cryptographic scheme.",
    url: "https://arxiv.org/abs/2003.06557",
    tags: ["PAPER", "PIONEER", "CRYPTOGRAPHY"],
    domain: "Quantum Computing",
  },
  {
    id: "qec-shor",
    title: "Scheme for Reducing Decoherence in Quantum Computer Memory",
    author: "Peter Shor",
    description:
      "The seminal 1995 paper that introduced the first quantum error correcting code — the 9-qubit Shor code. Published in Physical Review A 52, R2493 (it predates routine arXiv posting).",
    url: "https://journals.aps.org/pra/abstract/10.1103/PhysRevA.52.R2493",
    tags: ["PAPER", "PIONEER", "QEC"],
    domain: "Quantum Computing",
  },
  {
    id: "steane-qec",
    title: "Multiple Particle Interference and Quantum Error Correction",
    author: "Andrew Steane",
    description:
      "Steane's 1996 paper (Proc. R. Soc. A 452, 2551) introducing the [[7,1,3]] Steane code, one of the most widely studied quantum error correcting codes alongside Shor's code.",
    url: "https://arxiv.org/abs/quant-ph/9601029",
    tags: ["PAPER", "QEC", "CODE"],
    domain: "Quantum Computing",
  },
  {
    id: "superdense-coding-original",
    title: "Communication via One- and Two-Particle Operators on Einstein-Podolsky-Rosen States",
    author: "Charles H. Bennett & Stephen J. Wiesner",
    description:
      "The original 1992 paper on superdense coding: transmitting two classical bits by sending one entangled qubit.",
    url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.69.2881",
    tags: ["PAPER", "PIONEER", "COMMUNICATION"],
    domain: "Quantum Computing",
  },
  {
    id: "teleportation-original",
    title: "Teleporting an Unknown Quantum State via Dual Classical and Einstein-Podolsky-Rosen Channels",
    author: "Bennett, Brassard, Crépeau, Jozsa, Peres, Wootters",
    description:
      "The original 1993 paper on quantum teleportation, demonstrating how an unknown quantum state can be transmitted using entanglement and classical communication.",
    url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.70.1895",
    tags: ["PAPER", "PIONEER", "TELEPORTATION"],
    domain: "Quantum Computing",
  },
  {
    id: "hhl-original",
    title: "Quantum Algorithm for Linear Systems of Equations",
    author: "Harrow, Hassidim, Lloyd",
    description:
      "The original HHL paper presenting an exponential speedup for solving linear systems on a quantum computer, with applications in machine learning and scientific computing.",
    url: "https://arxiv.org/abs/0811.3171",
    tags: ["PAPER", "ALGORITHM", "HHL"],
    domain: "Quantum Computing",
  },
];
