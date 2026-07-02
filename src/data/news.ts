export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  date: string;   // ISO yyyy-mm-dd
  tag: string;    // HARDWARE | ERROR CORRECTION | ALGORITHMS | INDUSTRY | SOFTWARE | MILESTONE
  summary: string;
}

// curated milestones, newest first. summaries in-house, links go to the source.
export const news: NewsItem[] = [
  {
    id: "news-willow",
    title: "Google's Willow chip shows error correction below threshold",
    source: "Google Quantum AI (Nature)",
    url: "https://www.nature.com/articles/s41586-024-08449-y",
    date: "2024-12-09",
    tag: "ERROR CORRECTION",
    summary: "Scaling a surface code from distance 3 to 5 to 7 on the 105-qubit Willow processor drove the logical error rate down at each step — the first convincing demonstration of a quantum memory operating below the fault-tolerance threshold.",
  },
  {
    id: "news-majorana1",
    title: "Microsoft unveils Majorana 1, a topological-qubit processor",
    source: "Microsoft Azure Quantum",
    url: "https://azure.microsoft.com/en-us/blog/quantum/2025/02/19/microsoft-unveils-majorana-1/",
    date: "2025-02-19",
    tag: "HARDWARE",
    summary: "Microsoft announced a processor built on topological qubits made from a topoconductor, aiming for intrinsically more stable qubits. The claims remain debated pending further peer-reviewed evidence.",
  },
  {
    id: "news-ibm-roadmap",
    title: "IBM lays out a path to fault-tolerant quantum computing by 2029",
    source: "IBM Quantum",
    url: "https://www.ibm.com/quantum/blog/large-scale-ftqc",
    date: "2025-06-10",
    tag: "INDUSTRY",
    summary: "IBM detailed 'Starling', a planned fault-tolerant machine using qLDPC codes to cut the qubit overhead of error correction, with a modular roadmap of intermediate processors.",
  },
  {
    id: "news-ibm-utility",
    title: "Evidence for the utility of quantum computing before fault tolerance",
    source: "IBM Quantum (Nature)",
    url: "https://www.nature.com/articles/s41586-023-06096-3",
    date: "2023-06-14",
    tag: "MILESTONE",
    summary: "A 127-qubit IBM processor produced accurate expectation values for a physics simulation at a scale where brute-force classical methods struggle — a landmark 'quantum utility' result (later probed by improved classical algorithms).",
  },
  {
    id: "news-qldpc",
    title: "High-rate qLDPC codes slash error-correction overhead",
    source: "IBM Research (Nature)",
    url: "https://www.nature.com/articles/s41586-024-07107-7",
    date: "2024-03-27",
    tag: "ERROR CORRECTION",
    summary: "Quantum low-density parity-check codes encode logical qubits with far fewer physical qubits than the surface code, a key ingredient in IBM's fault-tolerance plans.",
  },
  {
    id: "news-neutral-atoms",
    title: "Logical qubits and error correction on neutral-atom arrays",
    source: "Harvard / QuEra (Nature)",
    url: "https://www.nature.com/articles/s41586-023-06927-3",
    date: "2023-12-06",
    tag: "HARDWARE",
    summary: "A reconfigurable neutral-atom processor ran algorithms on dozens of logical qubits with transversal gates, showcasing an architecture competitive with superconducting and trapped-ion approaches.",
  },
  {
    id: "news-pqc-standards",
    title: "NIST finalizes the first post-quantum cryptography standards",
    source: "NIST",
    url: "https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards",
    date: "2024-08-13",
    tag: "INDUSTRY",
    summary: "ML-KEM, ML-DSA and SLH-DSA were published as standards, kicking off the global migration to encryption designed to withstand future quantum attacks.",
  },
  {
    id: "news-quantinuum-h2",
    title: "Trapped-ion systems push two-qubit gate fidelity and volume higher",
    source: "Quantinuum",
    url: "https://www.quantinuum.com/blog",
    date: "2024-04-16",
    tag: "HARDWARE",
    summary: "Quantinuum's H-series trapped-ion machines continued to report record quantum-volume and fidelity figures, reinforcing ions as a high-quality (if slower) qubit modality.",
  },
];
