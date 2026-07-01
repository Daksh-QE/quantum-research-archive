export interface QEvent {
  id: string;
  name: string;
  type: "conference" | "hackathon" | "summer school" | "meetup" | "competition";
  when: string;       // human-readable timeframe
  month: number;      // 1-12, typical month (for sorting within a year)
  location: string;
  url: string;
  recurring: boolean;
  summary: string;
}

/* Recurring quantum events. Dates shift year to year, so we list the typical
   timeframe and link to the official page for exact dates/registration. */
export const events: QEvent[] = [
  { id: "ev-qhack", name: "QHack", type: "hackathon", when: "Typically Feb", month: 2, location: "Online (global)", url: "https://qhack.ai/", recurring: true, summary: "Xanadu's flagship quantum machine-learning hackathon — coding challenges, talks, and open project tracks. Beginner-friendly." },
  { id: "ev-iquhack", name: "MIT iQuHACK", type: "hackathon", when: "Typically Jan/Feb", month: 1, location: "MIT + Online", url: "https://www.iquise.mit.edu/iQuHACK", recurring: true, summary: "MIT's annual quantum hackathon with in-person and remote tracks, sponsored challenges from hardware providers." },
  { id: "ev-qgss", name: "Qiskit Global Summer School", type: "summer school", when: "Typically Jul", month: 7, location: "Online", url: "https://www.ibm.com/quantum/blog", recurring: true, summary: "A free, multi-week lecture + lab series from IBM Quantum. A structured on-ramp with certificates and hands-on notebooks." },
  { id: "ev-qce", name: "IEEE Quantum Week (QCE)", type: "conference", when: "Typically Sep", month: 9, location: "Rotating (US)", url: "https://qce.quantum.ieee.org/", recurring: true, summary: "The IEEE International Conference on Quantum Computing and Engineering — research papers, tutorials, workshops, and an industry expo." },
  { id: "ev-q2b", name: "Q2B", type: "conference", when: "Typically Dec (Silicon Valley)", month: 12, location: "Santa Clara, CA + regional", url: "https://q2b.qcware.com/", recurring: true, summary: "Industry-focused conference on practical quantum computing, use cases, and the commercial roadmap. Also runs regional editions (Tokyo, Paris)." },
  { id: "ev-aps", name: "APS Global Physics Summit (March Meeting)", type: "conference", when: "Typically Mar", month: 3, location: "Rotating (US)", url: "https://www.aps.org/meetings/march", recurring: true, summary: "The largest physics meeting; the DQI (Division of Quantum Information) sessions are a firehose of the latest quantum research." },
  { id: "ev-unitaryhack", name: "unitaryHACK", type: "hackathon", when: "Typically May/Jun", month: 5, location: "Online", url: "https://unitaryhack.dev/", recurring: true, summary: "A bounty-driven open-source sprint from Unitary Fund — get paid to fix issues across major quantum software projects. Great first contribution." },
  { id: "ev-qip", name: "QIP (Quantum Information Processing)", type: "conference", when: "Typically Jan", month: 1, location: "Rotating (global)", url: "https://qipconference.org/", recurring: true, summary: "The premier theoretical quantum information conference — foundational algorithms, complexity, and cryptography results." },
  { id: "ev-tqc", name: "TQC (Theory of Quantum Computation)", type: "conference", when: "Typically summer", month: 6, location: "Rotating (global)", url: "https://tqc-conference.org/", recurring: true, summary: "Focused conference on the theory of quantum computation, communication, and cryptography." },
  { id: "ev-womeninquantum", name: "Women in Quantum events", type: "meetup", when: "Year-round", month: 6, location: "Global + Online", url: "https://www.meetup.com/topics/quantum-computing/", recurring: true, summary: "Community meetups and summits supporting women and underrepresented groups in quantum. Browse local groups on Meetup." },
];
