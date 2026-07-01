import React from "react";
import Link from "next/link";
import { ExternalLink, HeartHandshake, GitPullRequest, Compass } from "lucide-react";

const mentorships = [
  { name: "QOSF Mentorship Program", url: "https://qosf.org/qc_mentorship/", desc: "A free, remote program pairing newcomers with mentors to build a quantum open-source project over a few months. One of the best on-ramps into research/contribution." },
  { name: "Unitary Fund microgrants", url: "https://unitary.fund/grants/", desc: "Grants (up to a few thousand dollars) for open-source quantum projects and research. Low-friction way to get funded work started." },
  { name: "Google Summer of Code (quantum orgs)", url: "https://summerofcode.withgoogle.com/", desc: "Paid summer projects; several quantum organizations (Qiskit, PennyLane, Unitary Fund, mlpack) participate most years." },
  { name: "IBM Qiskit Advocate program", url: "https://www.ibm.com/quantum/blog", desc: "Recognition and community program for people who teach, build, and contribute around Qiskit." },
];

const firstIssues = [
  { name: "Qiskit", url: "https://github.com/Qiskit/qiskit/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22", desc: "IBM's SDK — large, well-labelled issue tracker." },
  { name: "PennyLane", url: "https://github.com/PennyLaneAI/pennylane/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22", desc: "Xanadu's QML framework." },
  { name: "Cirq", url: "https://github.com/quantumlib/Cirq/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22", desc: "Google's SDK." },
  { name: "Stim", url: "https://github.com/quantumlib/Stim/issues", desc: "The fast stabilizer / QEC simulator — great if you like error correction." },
  { name: "unitaryHACK bounties", url: "https://unitaryhack.dev/", desc: "During the annual sprint, dozens of quantum repos post paid, beginner-friendly bounties." },
];

const roadmap = [
  { step: "1", title: "Get the intuition", body: "Do the Start page and the first few curriculum modules — qubits, superposition, entanglement. Play in the Quantum Sandbox until Bell/GHZ states feel natural." },
  { step: "2", title: "Learn the math", body: "Linear algebra (vectors, matrices, eigenvalues) and basic probability. The curriculum's Foundations modules link the best free courses." },
  { step: "3", title: "Write real circuits", body: "Pick one SDK (see the Compare page) and rebuild the Code Snippets yourself. Take the Qiskit Global Summer School or a QCUK tutorial." },
  { step: "4", title: "Go deep on one area", body: "Algorithms, error correction, hardware, or QML. Read the foundational papers in the Research Copilot with its quiz + prerequisites." },
  { step: "5", title: "Contribute & connect", body: "Fix a good-first-issue, apply to a mentorship, join a hub, and go to a hackathon (QHack / iQuHACK). Contribution is the fastest way to learn and get noticed." },
];

export default function ContributePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Get Into Quantum</h1>
        <p className="text-slate-600 mt-1">A concrete path from curious beginner to open-source contributor and researcher — with the programs and projects that make it real.</p>
      </div>

      <section>
        <div className="flex items-center gap-2 mb-3"><Compass className="w-5 h-5 text-indigo-500" /><h2 className="text-xl font-bold text-slate-900">A roadmap into the field</h2></div>
        <div className="relative border-l-2 border-slate-200 ml-3 space-y-4">
          {roadmap.map((r) => (
            <div key={r.step} className="relative pl-6">
              <span className="absolute -left-[15px] top-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center ring-4 ring-slate-50">{r.step}</span>
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
                <h3 className="font-semibold text-slate-900">{r.title}</h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-3"><HeartHandshake className="w-5 h-5 text-emerald-500" /><h2 className="text-xl font-bold text-slate-900">Mentorship &amp; funding</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mentorships.map((m) => (
            <Link key={m.name} href={m.url} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg border border-slate-200 shadow-sm p-4 hover:shadow-md hover:border-emerald-200 transition-all">
              <span className="font-semibold text-slate-900 inline-flex items-center gap-1">{m.name} <ExternalLink className="w-3 h-3 text-slate-400" /></span>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{m.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-3"><GitPullRequest className="w-5 h-5 text-fuchsia-500" /><h2 className="text-xl font-bold text-slate-900">Good first issues</h2></div>
        <p className="text-sm text-slate-500 mb-3">Open-source is the most welcoming door into quantum. These repos label beginner-friendly work:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {firstIssues.map((f) => (
            <Link key={f.name} href={f.url} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg border border-slate-200 shadow-sm p-4 hover:shadow-md hover:border-fuchsia-200 transition-all">
              <span className="font-semibold text-slate-900 inline-flex items-center gap-1">{f.name} <ExternalLink className="w-3 h-3 text-slate-400" /></span>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
