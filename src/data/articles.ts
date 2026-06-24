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
    id: "aaronson-who-can-build",
    title: "Who Can Build a Quantum Computer?",
    author: "Scott Aaronson",
    description:
      "Scott Aaronson's sharp, accessible analysis of the challenges and promises of building a scalable quantum computer.",
    url: "https://www.youtube.com/watch?v=9Qw6UJ0Ao9Y",
    tags: ["GUIDE", "TALK"],
    domain: "Quantum Computing",
  },
  {
    id: "preskill-quantum-supremacy",
    title: "Quantum Supremacy and the Complexity of Quantum Simulation",
    author: "John Preskill",
    description:
      "The lecture that coined 'quantum supremacy' — explaining why simulating quantum systems on classical computers is hard and what quantum computers can do.",
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
    title: "The Qiskit Textbook (Now Learn Quantum Computation)",
    author: "IBM Quantum",
    description:
      "A comprehensive, interactive textbook teaching quantum computing through the Qiskit SDK with hands-on coding exercises.",
    url: "https://learn.qiskit.org/",
    tags: ["GUIDE", "TUT", "INTERACTIVE", "COURSE"],
    domain: "Quantum Computing",
  },
  {
    id: "quantum-village",
    title: "Quantum Village: The Quantum Computing Community Hub",
    author: "Quantum Village",
    description:
      "A community resource aggregator for quantum computing jobs, events, news, and learning materials.",
    url: "https://www.quantumvillage.io/",
    tags: ["COMMUNITY", "NEWS", "EVENTS"],
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
    id: "quantum-volume",
    title: "Quantum Volume: A Benchmark for Quantum Computers",
    author: "IBM Quantum",
    description:
      "An explainer on quantum volume as a metric for measuring the capability and performance of quantum processors.",
    url: "https://research.ibm.com/blog/quantum-volume-64-processor",
    tags: ["GUIDE", "BENCHMARK"],
    domain: "Quantum Computing",
  },
];
