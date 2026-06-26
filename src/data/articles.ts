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
    url: "https://research.ibm.com/blog/",
    tags: ["GUIDE", "BENCHMARK"],
    domain: "Quantum Computing",
  },
  {
    id: "preskill-nisq",
    title: "Quantum Computing in the NISQ Era and Beyond",
    author: "John Preskill",
    description:
      "The seminal paper defining the Noisy Intermediate-Scale Quantum (NISQ) era and outlining the path forward for quantum computing.",
    url: "https://arxiv.org/abs/1801.00862",
    tags: ["PAPER", "GUIDE", "THEORY"],
    domain: "Quantum Computing",
  },
  {
    id: "arute-quantum-supremacy",
    title: "Quantum Supremacy Using a Programmable Superconducting Processor",
    author: "Frank Arute et al. (Google Quantum AI)",
    description:
      "The landmark Nature paper demonstrating quantum supremacy for the first time using Google's Sycamore processor.",
    url: "https://www.nature.com/articles/s41586-019-1666-5",
    tags: ["PAPER", "PIONEER", "BENCHMARK"],
    domain: "Quantum Computing",
  },
  {
    id: "aaronson-limits-quantum",
    title: "The Limits of Quantum Computers",
    author: "Scott Aaronson",
    description:
      "A Scientific American article exploring the fundamental limitations and capabilities of quantum computation.",
    url: "https://www.scientificamerican.com/article/the-limits-of-quantum-computers/",
    tags: ["GUIDE", "OPINION"],
    domain: "Quantum Computing",
  },
  {
    id: "divincenzo-physical-implementation",
    title: "The Physical Implementation of Quantum Computation",
    author: "David P. DiVincenzo",
    description:
      "The classic paper laying out DiVincenzo's criteria for building a practical quantum computer — essential reading for quantum hardware.",
    url: "https://arxiv.org/abs/quant-ph/0002077",
    tags: ["PAPER", "GUIDE", "HARDWARE"],
    domain: "Quantum Computing",
  },
  {
    id: "ibm-quantum-for-everyone",
    title: "Quantum Computing for Everyone: An IBM Research Blog",
    author: "IBM Research",
    description:
      "An accessible introduction to quantum computing concepts from IBM Research, written for a general audience.",
    url: "https://www.ibm.com/quantum/blog/",
    tags: ["GUIDE", "BLOG"],
    domain: "Quantum Computing",
  },
  {
    id: "google-quantum-error-correction",
    title: "Quantum Error Correction for Beginners",
    author: "Google Quantum AI",
    description:
      "An accessible introduction to quantum error correction concepts from Google's Quantum AI team, covering stabilizer codes and surface codes.",
    url: "https://quantumai.google/",
    tags: ["GUIDE", "TUT"],
    domain: "Quantum Computing",
  },
  {
    id: "microsoft-azure-qc",
    title: "What is Quantum Computing? — Microsoft Azure Blog",
    author: "Microsoft Azure",
    description:
      "A comprehensive overview of quantum computing concepts, hardware approaches, and the Azure Quantum ecosystem.",
    url: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-quantum-computing/",
    tags: ["GUIDE", "BLOG"],
    domain: "Quantum Computing",
  },
  {
    id: "quantum-machine-learning-review",
    title: "Quantum Machine Learning: A Review and Outlook",
    author: "Maria Schuld & Francesco Petruccione",
    description:
      "A comprehensive survey of quantum machine learning, covering variational algorithms, kernel methods, and the potential for quantum advantage.",
    url: "https://link.springer.com/",
    tags: ["PAPER", "GUIDE", "SURVEY"],
    domain: "Quantum Computing",
  },
  {
    id: "freedman-topological-qc",
    title: "Topological Quantum Computing",
    author: "Michael Freedman, Alexei Kitaev, Michael Larsen & Zhenghan Wang",
    description:
      "An accessible explainer on topological quantum computing, anyons, and the potential for fault-tolerant quantum computation through topology.",
    url: "https://arxiv.org/abs/quant-ph/0101025",
    tags: ["PAPER", "GUIDE", "THEORY"],
    domain: "Quantum Computing",
  },
  {
    id: "google-quantum-algorithms",
    title: "Quantum Algorithms for Scientific Computing",
    author: "Google Quantum AI",
    description:
      "An overview of quantum algorithms developed at Google for scientific computing applications, including quantum chemistry and optimization.",
    url: "https://research.google/pubs/",
    tags: ["GUIDE", "PAPER"],
    domain: "Quantum Computing",
  },
  {
    id: "microsoft-fault-tolerant",
    title: "Building a Fault-Tolerant Quantum Computer",
    author: "Microsoft Quantum Research",
    description:
      "Microsoft's perspective on the path to fault-tolerant quantum computing, including topological qubits and the quantum development cycle.",
    url: "https://www.microsoft.com/en-us/research/blog/",
    tags: ["GUIDE", "BLOG", "HARDWARE"],
    domain: "Quantum Computing",
  },
  {
    id: "quanta-real-world-qc",
    title: "Quantum Computing in the Real World",
    author: "Quanta Magazine",
    description:
      "A Quanta Magazine article examining the current state of quantum computing, its achievements, and the road ahead.",
    url: "https://www.quantamagazine.org/tag/quantum-computing",
    tags: ["GUIDE", "JOURNALISM", "NEWS"],
    domain: "Quantum Computing",
  },
  {
    id: "nature-qc-revolution",
    title: "The Quantum Computing Revolution",
    author: "Nature Editorial Board",
    description:
      "Nature's editorial perspective on the quantum computing revolution, discussing milestones, challenges, and the future of the field.",
    url: "https://www.nature.com/articles/d41586-019-01995-0",
    tags: ["GUIDE", "JOURNALISM", "OPINION"],
    domain: "Quantum Computing",
  },
  {
    id: "ibm-practical-intro",
    title: "A Practical Introduction to Quantum Computing",
    author: "IBM Research",
    description:
      "A practical guide to getting started with quantum computing, covering Qiskit, circuit design, and running on real quantum hardware.",
    url: "https://research.ibm.com/blog/",
    tags: ["GUIDE", "TUT", "BLOG"],
    domain: "Quantum Computing",
  },
  {
    id: "quantum-birds-eye-view",
    title: "Quantum Computing: A Bird's Eye View",
    author: "Scott Aaronson",
    description:
      "A high-level overview of quantum computing for a broad technical audience, covering what quantum computers can and cannot do.",
    url: "https://www.scottaaronson.com/blog/",
    tags: ["GUIDE", "BLOG", "OPINION"],
    domain: "Quantum Computing",
  },
  {
    id: "quantum-computing-stack",
    title: "The Quantum Computing Software Stack",
    author: "Will Zeng",
    description:
      "An exploration of the layers of the quantum computing software stack, from quantum hardware to high-level algorithms.",
    url: "https://www.wired.com/tag/quantum-computing/",
    tags: ["GUIDE", "BLOG"],
    domain: "Quantum Computing",
  },
  {
    id: "qml-variational",
    title: "Variational Quantum Algorithms: A Gentle Introduction",
    author: "Jarrod McClean",
    description:
      "An introduction to variational quantum algorithms, including VQE and QAOA, with insights into their strengths and limitations.",
    url: "https://quantum-journal.org/",
    tags: ["GUIDE", "TUT", "PAPER"],
    domain: "Quantum Computing",
  },
  {
    id: "quantum-communication-networking",
    title: "Quantum Communication and Quantum Networking",
    author: "Stefano Pirandola",
    description:
      "A survey of quantum communication protocols, quantum key distribution, and the emerging quantum internet infrastructure.",
    url: "https://arxiv.org/abs/1910.06323",
    tags: ["PAPER", "SURVEY", "GUIDE"],
    domain: "Both",
  },
  {
    id: "quantum-sensing-review",
    title: "Quantum Sensing: A Review of Principles and Applications",
    author: "C. L. Degen, F. Reinhard & P. Cappellaro",
    description:
      "A comprehensive review of quantum sensing technologies, including NV centers, atomic clocks, and magnetometry.",
    url: "https://arxiv.org/abs/1611.02427",
    tags: ["PAPER", "SURVEY", "GUIDE"],
    domain: "Quantum Mechanics",
  },
  {
    id: "quantum-chemistry-nisq",
    title: "Quantum Chemistry in the NISQ Era",
    author: "Sam McArdle, Suguru Endo, Alán Aspuru-Guzik, Simon C. Benjamin & Xiao Yuan",
    description:
      "A review of quantum chemistry approaches for near-term quantum devices, including VQE and quantum error mitigation.",
    url: "https://arxiv.org/abs/1808.10402",
    tags: ["PAPER", "SURVEY", "GUIDE"],
    domain: "Quantum Computing",
  },
  {
    id: "qiskit-blog-intro",
    title: "Introduction to Quantum Computing with Qiskit",
    author: "IBM Quantum",
    description:
      "A blog series introducing quantum computing concepts through hands-on Qiskit examples, from basic gates to quantum algorithms.",
    url: "https://www.ibm.com/quantum/blog/",
    tags: ["GUIDE", "BLOG", "TUT"],
    domain: "Quantum Computing",
  },
  {
    id: "ibm-quantum-roadmap",
    title: "IBM Quantum Roadmap: The Path to 100,000 Qubits",
    author: "IBM Quantum",
    description:
      "IBM's detailed roadmap for scaling quantum computing from 1000 to 100,000 qubits, including error correction milestones.",
    url: "https://www.ibm.com/quantum/roadmap",
    tags: ["GUIDE", "BLOG", "HARDWARE"],
    domain: "Quantum Computing",
  },
];
