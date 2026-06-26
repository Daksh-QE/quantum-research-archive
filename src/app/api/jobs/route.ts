import { NextResponse } from "next/server";

interface JobResult {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  tags: string[];
  source: "static" | "remoteok" | "github";
}

const STATIC_JOBS: JobResult[] = [
  { id: "static-1", title: "Quantum Research Scientist", company: "IBM Quantum", location: "Yorktown Heights, NY / Remote", description: "Conduct foundational research in quantum error correction, quantum algorithms, and superconducting qubit architecture.", url: "https://www.ibm.com/quantum", tags: ["RESEARCH", "QUANTUM", "QEC"], source: "static" },
  { id: "static-2", title: "Quantum Machine Learning Researcher", company: "Google Quantum AI", location: "Santa Barbara, CA / Remote", description: "Develop novel quantum machine learning algorithms and explore quantum advantage in ML tasks.", url: "https://quantumai.google/", tags: ["QML", "RESEARCH", "ALGORITHMS"], source: "static" },
  { id: "static-3", title: "Quantum Software Engineer", company: "IBM Quantum", location: "Toronto, Canada / Remote", description: "Build and maintain the Qiskit SDK. Implement new transpiler passes and circuit optimization.", url: "https://www.ibm.com/quantum", tags: ["ENGINEERING", "QISKIT", "PYTHON"], source: "static" },
  { id: "static-4", title: "Quantum Algorithm Developer", company: "Xanadu", location: "Toronto, Canada / Remote", description: "Design and implement quantum algorithms for photonic quantum computing using PennyLane.", url: "https://xanadu.ai/", tags: ["ALGORITHMS", "PHOTONIC", "PENNYLANE"], source: "static" },
  { id: "static-5", title: "Quantum Hardware Engineer", company: "Rigetti Computing", location: "Berkeley, CA", description: "Design and test superconducting quantum processor chips. Optimize gate fidelities and coherence times.", url: "https://www.rigetti.com/", tags: ["HARDWARE", "SUPERCONDUCTING"], source: "static" },
  { id: "static-6", title: "Quantum Cryogenics Engineer", company: "Quantinuum", location: "Cambridge, UK / Broomfield, CO", description: "Operate and maintain dilution refrigeration systems for trapped-ion quantum computers.", url: "https://www.quantinuum.com/", tags: ["HARDWARE", "CRYOGENICS", "TRAPPED IONS"], source: "static" },
  { id: "static-7", title: "Quantum Error Correction Specialist", company: "AWS Center for Quantum Computing", location: "Pasadena, CA", description: "Research and implement novel quantum error correcting codes for fault-tolerant architectures.", url: "https://www.amazon.science/", tags: ["QEC", "FAULT-TOLERANCE", "RESEARCH"], source: "static" },
  { id: "static-8", title: "Senior Quantum Software Engineer", company: "Classiq", location: "Tel Aviv, Israel / Remote", description: "Build next-gen quantum algorithm synthesis and optimization tools.", url: "https://www.classiq.io/", tags: ["ENGINEERING", "SYNTHESIS"], source: "static" },
  { id: "static-9", title: "Quantum Computing PhD Intern", company: "Microsoft Quantum", location: "Redmond, WA / Remote", description: "Contribute to research on topological qubits, quantum error correction, or quantum algorithms.", url: "https://azure.microsoft.com/en-us/products/quantum/", tags: ["INTERN", "RESEARCH", "TOPOLOGICAL"], source: "static" },
  { id: "static-10", title: "Quantum Computing Curriculum Developer", company: "The Coding School — Qubit by Qubit", location: "Remote", description: "Develop quantum computing educational content for high school and undergraduate students.", url: "https://www.qubitbyqubit.org/", tags: ["EDUCATION", "CURRICULUM", "TEACHING"], source: "static" },
  { id: "static-11", title: "Quantum ML Engineer", company: "PennyLane / Xanadu", location: "Toronto / Remote", description: "Build quantum machine learning pipelines using PennyLane. Develop hybrid quantum-classical models.", url: "https://pennylane.ai/", tags: ["QML", "ENGINEERING", "HYBRID"], source: "static" },
  { id: "static-12", title: "Quantum Strategy Consultant", company: "McKinsey & Company", location: "Multiple (Global)", description: "Advise Fortune 500 companies on quantum computing strategy and identify quantum-ready use cases.", url: "https://www.mckinsey.com/careers", tags: ["CONSULTING", "STRATEGY", "BUSINESS"], source: "static" },
  { id: "static-13", title: "Quantum Application Scientist", company: "IonQ", location: "College Park, MD / Remote", description: "Develop quantum computing applications for quantum chemistry, optimization, and machine learning.", url: "https://ionq.com/", tags: ["APPLICATIONS", "CHEMISTRY", "OPTIMIZATION"], source: "static" },
  { id: "static-14", title: "Quantum Optical Engineer", company: "PsiQuantum", location: "Palo Alto, CA", description: "Build photonic quantum computing components including single-photon sources, detectors, and interconnects.", url: "https://www.psiquantum.com/", tags: ["PHOTONIC", "HARDWARE", "OPTICS"], source: "static" },
  { id: "static-15", title: "Qubit Fabrication Engineer", company: "D-Wave Systems", location: "Burnaby, Canada", description: "Fabricate and test superconducting qubit devices for quantum annealing processors.", url: "https://www.dwavesys.com/", tags: ["HARDWARE", "FABRICATION", "SUPERCONDUCTING"], source: "static" },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const source = searchParams.get("source") || "all";

  let jobs: JobResult[] = [...STATIC_JOBS];

  // Try RemoteOK API for live quantum jobs (no API key needed)
  if (source === "all" || source === "live") {
    try {
      const remoteOkUrl = "https://remoteok.com/api?tag=quantum";
      const resp = await fetch(remoteOkUrl, {
        headers: { "User-Agent": "Mozilla/5.0" },
        signal: AbortSignal.timeout(5000),
      });
      if (resp.ok) {
        const data = await resp.json();
        // First item is often metadata, skip it
        const items = Array.isArray(data) ? data.slice(1) : [];
        for (const item of items) {
          jobs.push({
            id: `live-${item.id || jobs.length}`,
            title: item.position || item.title || "Quantum Role",
            company: item.company || "Unknown",
            location: item.location || "Remote",
            description: (item.description || "").replace(/<[^>]+>/g, "").slice(0, 200),
            url: item.url || item.apply_url || "",
            tags: ["LIVE", "QUANTUM"],
            source: "remoteok",
          });
        }
      }
    } catch {
      // Live API failed — just return static jobs
    }
  }

  // Filter by query
  if (query) {
    jobs = jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(query) ||
        j.company.toLowerCase().includes(query) ||
        j.description.toLowerCase().includes(query) ||
        j.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  return NextResponse.json({ jobs, count: jobs.length, source });
}
