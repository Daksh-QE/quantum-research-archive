import { Newsletter } from "./types";

export const newsletters: Newsletter[] = [
  {
    id: "quantum-weekly",
    name: "Quantum Weekly",
    description:
      "A curated roundup of the most important quantum computing news, research papers, and community updates delivered every Monday.",
    url: "https://quantumweekly.com/",
    frequency: "Weekly",
    tags: ["NEWS", "CURATED", "PAPERS"],
  },
  {
    id: "qiskit-newsletter",
    name: "IBM Qiskit Newsletter",
    description:
      "Official newsletter from the IBM Quantum team featuring new Qiskit releases, tutorials, research breakthroughs, and community events.",
    url: "https://qiskit.org/newsletter/",
    frequency: "Monthly",
    tags: ["QISKIT", "IBM", "TUTORIALS", "EVENTS"],
  },
  {
    id: "quantum-computing-report",
    name: "Quantum Computing Report",
    description:
      "In-depth analysis of the quantum computing industry, funding news, technology comparisons, and expert commentary on market trends.",
    url: "https://quantumcomputingreport.com/",
    frequency: "Biweekly",
    tags: ["INDUSTRY", "ANALYSIS", "FUNDING"],
  },
  {
    id: "quantum-insider",
    name: "The Quantum Insider",
    description:
      "Daily news and insights on the quantum computing ecosystem, including startup coverage, research breakthroughs, and policy developments.",
    url: "https://thequantuminsider.com/",
    frequency: "Daily",
    tags: ["NEWS", "STARTUPS", "RESEARCH", "POLICY"],
  },
  {
    id: "quantum-magazine",
    name: "Quanta Magazine — Quantum Physics",
    description:
      "High-quality journalism covering the latest discoveries in quantum physics and quantum computing, written for a broad scientific audience.",
    url: "https://www.quantamagazine.org/tag/quantum-physics/",
    frequency: "Weekly",
    tags: ["JOURNALISM", "PHYSICS", "EXPLAINERS"],
  },
  {
    id: "inside-quantum-technology",
    name: "Inside Quantum Technology",
    description:
      "A newsletter focused on the business and commercialization of quantum technologies, including quantum computing, sensing, and cryptography.",
    url: "https://insidequantumtechnology.com/",
    frequency: "Weekly",
    tags: ["BUSINESS", "COMMERCIALIZATION", "INDUSTRY"],
  },
];
