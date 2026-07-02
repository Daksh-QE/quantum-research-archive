import { NextResponse } from "next/server";

export interface JobItem {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  tags: string[];
  postedAt?: string;
  source: "curated" | "remoteok" | "github" | "linkedin";
}

/* Curated quantum jobs (verified working links) */
const CURATED: JobItem[] = [
  { id: "cur-1", title: "Quantum Research Scientist", company: "IBM Quantum", location: "Yorktown Heights, NY", description: "Foundational research in quantum error correction, algorithms, and superconducting qubit architecture.", url: "https://www.ibm.com/quantum", tags: ["RESEARCH", "QEC", "SUPERCONDUCTING"], source: "curated" },
  { id: "cur-2", title: "Quantum ML Researcher", company: "Google Quantum AI", location: "Santa Barbara, CA", description: "Develop novel quantum machine learning algorithms and explore quantum advantage in ML tasks.", url: "https://quantumai.google/", tags: ["QML", "RESEARCH", "ALGORITHMS"], source: "curated" },
  { id: "cur-3", title: "Quantum Software Engineer", company: "IBM Quantum", location: "Toronto, Canada", description: "Build the Qiskit SDK — transpiler passes, circuit optimization, runtime primitives.", url: "https://www.ibm.com/quantum", tags: ["QISKIT", "PYTHON", "OPEN SOURCE"], source: "curated" },
  { id: "cur-4", title: "Quantum Algorithm Developer", company: "Xanadu", location: "Toronto, Canada", description: "Design quantum algorithms for photonic quantum computing using PennyLane.", url: "https://xanadu.ai/", tags: ["PHOTONIC", "PENNYLANE", "CHEMISTRY"], source: "curated" },
  { id: "cur-5", title: "Quantum Hardware Engineer", company: "Rigetti Computing", location: "Berkeley, CA", description: "Design and test superconducting quantum processor chips.", url: "https://www.rigetti.com/", tags: ["HARDWARE", "SUPERCONDUCTING", "FABRICATION"], source: "curated" },
  { id: "cur-6", title: "Quantum Cryogenics Engineer", company: "Quantinuum", location: "Cambridge, UK", description: "Operate dilution refrigeration systems for trapped-ion quantum computers.", url: "https://www.quantinuum.com/", tags: ["CRYOGENICS", "TRAPPED IONS", "HARDWARE"], source: "curated" },
  { id: "cur-7", title: "QEC Specialist", company: "AWS Center for Quantum Computing", location: "Pasadena, CA", description: "Research quantum error correcting codes for fault-tolerant architectures.", url: "https://www.amazon.science/", tags: ["QEC", "FAULT-TOLERANCE", "RESEARCH"], source: "curated" },
  { id: "cur-8", title: "Senior Quantum Software Engineer", company: "Classiq", location: "Tel Aviv, Israel", description: "Build quantum algorithm synthesis and optimization tools.", url: "https://www.classiq.io/", tags: ["SYNTHESIS", "OPTIMIZATION", "ENGINEERING"], source: "curated" },
  { id: "cur-9", title: "Quantum PhD Intern", company: "Microsoft Quantum", location: "Redmond, WA", description: "Research topological qubits, error correction, or quantum algorithms.", url: "https://azure.microsoft.com/products/quantum/", tags: ["INTERN", "TOPOLOGICAL", "RESEARCH"], source: "curated" },
  { id: "cur-10", title: "Quantum Educator", company: "Qubit by Qubit", location: "Remote", description: "Develop quantum computing curriculum for high school and university students.", url: "https://www.qubitbyqubit.org/", tags: ["EDUCATION", "CURRICULUM", "REMOTE"], source: "curated" },
  { id: "cur-11", title: "Quantum ML Engineer", company: "PennyLane / Xanadu", location: "Toronto, Canada", description: "Build QML pipelines and hybrid quantum-classical models.", url: "https://pennylane.ai/", tags: ["QML", "HYBRID", "PENNYLANE"], source: "curated" },
  { id: "cur-12", title: "Quantum Consultant", company: "McKinsey & Company", location: "Global", description: "Advise on quantum strategy and identify quantum-ready use cases.", url: "https://www.mckinsey.com/careers", tags: ["CONSULTING", "STRATEGY"], source: "curated" },
  { id: "cur-13", title: "Quantum Applications Scientist", company: "IonQ", location: "College Park, MD", description: "Develop quantum computing applications for chemistry and optimization.", url: "https://ionq.com/", tags: ["APPLICATIONS", "CHEMISTRY"], source: "curated" },
  { id: "cur-14", title: "Quantum Optical Engineer", company: "PsiQuantum", location: "Palo Alto, CA", description: "Build photonic quantum computing components.", url: "https://www.psiquantum.com/", tags: ["PHOTONIC", "HARDWARE", "OPTICS"], source: "curated" },
  { id: "cur-15", title: "Qubit Fabrication Engineer", company: "D-Wave Systems", location: "Burnaby, Canada", description: "Fabricate and test superconducting qubit devices.", url: "https://www.dwavesys.com/", tags: ["FABRICATION", "SUPERCONDUCTING"], source: "curated" },
  { id: "cur-16", title: "Quantum Software Developer", company: "Quantinuum", location: "Oxford, UK", description: "Develop quantum software tools for trapped-ion quantum computers.", url: "https://www.quantinuum.com/", tags: ["SOFTWARE", "TRAPPED IONS", "TKET"], source: "curated" },
  { id: "cur-17", title: "Quantum Algorithms Intern", company: "IBM Quantum", location: "Multiple", description: "Summer internship researching quantum algorithms and applications.", url: "https://www.ibm.com/quantum", tags: ["INTERN", "ALGORITHMS", "SUMMER"], source: "curated" },
  { id: "cur-18", title: "Research Scientist — Quantum Error Correction", company: "Google Quantum AI", location: "Santa Barbara, CA", description: "Develop next-generation quantum error correcting codes and decoders.", url: "https://quantumai.google/", tags: ["QEC", "RESEARCH", "DECODING"], source: "curated" },
  { id: "cur-19", title: "Quantum Machine Learning Intern", company: "Xanadu", location: "Toronto, Canada", description: "Research quantum machine learning algorithms and applications.", url: "https://xanadu.ai/", tags: ["QML", "INTERN", "PENNYLANE"], source: "curated" },
  { id: "cur-20", title: "Theoretical Quantum Physicist", company: "Caltech IQIM", location: "Pasadena, CA", description: "Conduct theoretical research in quantum information and quantum many-body physics.", url: "https://iqim.caltech.edu/", tags: ["THEORY", "QUANTUM INFO", "ACADEMIA"], source: "curated" },
];

/* Helpers */

/** Check if a job title/description seems quantum-related */
function isQuantumRelated(title: string, desc: string): boolean {
  const keywords = [
    "quantum", "qubit", "qiskit", "pennylane", "cirq", "superconducting", "trapped ion",
    "topological", "photonic", "error correction", "qec", "quantum computing",
    "quantum ml", "quantum machine learning", "quantum algorithm", "quantum hardware",
    "quantum software", "quantum engineer", "quantum scientist",
    "ionq", "rigetti", "xanadu", "quantinuum", "d-wave",
  ];
  const lower = (title + " " + desc).toLowerCase();
  return keywords.some((k) => lower.includes(k));
}

/** Extract location from a RemoteOK job object */
function extractLocation(item: any): string {
  // RemoteOK has location in various fields
  return item.location || item.canonical_location || "Remote";
}

/** Truncate HTML and limit description length */
function cleanDesc(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .slice(0, 250);
}

/* Fetch from RemoteOK */
async function fetchRemoteOK(): Promise<JobItem[]> {
  const jobs: JobItem[] = [];
  try {
    const resp = await fetch("https://remoteok.com/api", {
      headers: { "User-Agent": "QuantumResearchArchive/1.0 (job-aggregator)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!resp.ok) return jobs;
    const data = await resp.json();
    const items = Array.isArray(data) ? data.slice(1) : []; // first item is metadata
    for (const item of items) {
      const title = item.position || item.title || "";
      const desc = cleanDesc(item.description || "");
      if (!title || !isQuantumRelated(title, desc)) continue;
      jobs.push({
        id: `rok-${item.id || jobs.length}`,
        title,
        company: item.company || "Unknown",
        location: extractLocation(item),
        description: desc,
        url: item.url || item.apply_url || "",
        tags: ["QUANTUM", "REMOTEOK"],
        postedAt: item.date,
        source: "remoteok",
      });
    }
  } catch {
    // RemoteOK unavailable
  }
  return jobs;
}

/* Fetch from GitHub Jobs via Search API */
async function fetchGitHubJobs(): Promise<JobItem[]> {
  const jobs: JobItem[] = [];
  const searchTerms = ["quantum+computing", "quantum+engineer", "quantum+developer"];
  for (const term of searchTerms) {
    try {
      const resp = await fetch(
        `https://api.github.com/search/issues?q=${term}+type:issue+state:open&sort=created&per_page=10`,
        {
          headers: { "Accept": "application/vnd.github.v3+json", "User-Agent": "QuantumResearchArchive/1.0" },
          signal: AbortSignal.timeout(5000),
        }
      );
      if (!resp.ok) continue;
      const data = await resp.json();
      for (const item of (data.items || []).slice(0, 5)) {
        const title = item.title || "";
        const body = (item.body || "").slice(0, 200).replace(/<[^>]+>/g, "");
        if (!isQuantumRelated(title, body)) continue;
        jobs.push({
          id: `gh-${item.id || jobs.length}`,
          title,
          company: item.repository_url?.split("/").slice(-2).join("/") || "GitHub",
          location: "Remote / Open Source",
          description: body.slice(0, 200),
          url: item.html_url || "",
          tags: ["QUANTUM", "GITHUB"],
          postedAt: item.created_at,
          source: "github",
        });
      }
    } catch {
      continue;
    }
  }
  return jobs;
}

/* Main handler */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const source = searchParams.get("source") || "all";

  // Start with curated jobs
  let allJobs: JobItem[] = [...CURATED];

  // Fetch live jobs — RemoteOK only (GitHub Issues feed was unreliable)
  if (source === "all" || source === "live") {
    const remoteOkJobs = await fetchRemoteOK().catch(() => []);
    allJobs.push(...remoteOkJobs);
  }

  // Deduplicate by URL
  const seen = new Set<string>();
  allJobs = allJobs.filter((j) => {
    if (seen.has(j.url)) return false;
    seen.add(j.url);
    return true;
  });

  // Filter by query
  if (query) {
    allJobs = allJobs.filter(
      (j) =>
        j.title.toLowerCase().includes(query) ||
        j.company.toLowerCase().includes(query) ||
        j.description.toLowerCase().includes(query) ||
        j.tags.some((t) => t.toLowerCase().includes(query)) ||
        j.location.toLowerCase().includes(query)
    );
  }

  // Sort: curated first, then by date if available
  allJobs.sort((a, b) => {
    if (a.source === "curated" && b.source !== "curated") return -1;
    if (a.source !== "curated" && b.source === "curated") return 1;
    if (a.postedAt && b.postedAt) return b.postedAt.localeCompare(a.postedAt);
    return 0;
  });

  return NextResponse.json({
    jobs: allJobs,
    count: allJobs.length,
    sources: {
      curated: CURATED.length,
      remoteok: allJobs.filter((j) => j.source === "remoteok").length,
      github: allJobs.filter((j) => j.source === "github").length,
    },
  });
}
