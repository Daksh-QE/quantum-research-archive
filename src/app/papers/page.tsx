import React from "react";
import { ExternalLink } from "lucide-react";
import TagBadge from "@/components/TagBadge";

interface CuratedPaper {
  id: string;
  title: string;
  authors: string;
  year: string;
  url: string;
}

const curatedPapers: CuratedPaper[] = [
  {
    id: "deutsch-1985",
    title:
      "Quantum theory, the Church–Turing principle and the universal quantum computer",
    authors: "David Deutsch",
    year: "1985",
    url: "https://royalsocietypublishing.org/doi/10.1098/rspa.1985.0070",
  },
  {
    id: "grover-1996",
    title:
      "A fast quantum mechanical algorithm for database search",
    authors: "Lov Grover",
    year: "1996",
    url: "https://arxiv.org/abs/quant-ph/9605043",
  },
  {
    id: "shor-1997",
    title:
      "Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer",
    authors: "Peter Shor",
    year: "1997",
    url: "https://arxiv.org/abs/quant-ph/9508027",
  },
  {
    id: "shor-1995",
    title: "Scheme for reducing decoherence in quantum computer memory",
    authors: "Peter Shor",
    year: "1995",
    url: "https://arxiv.org/abs/quant-ph/9605011",
  },
  {
    id: "steane-1996",
    title: "Error correcting codes in quantum theory",
    authors: "Andrew Steane",
    year: "1996",
    url: "https://arxiv.org/abs/quant-ph/9608021",
  },
  {
    id: "bennett-1993",
    title:
      "Teleporting an unknown quantum state via dual classical and Einstein-Podolsky-Rosen channels",
    authors: "Charles H. Bennett, Gilles Brassard, Claude Crépeau, Richard Jozsa, Asher Peres, William K. Wootters",
    year: "1993",
    url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.70.1895",
  },
  {
    id: "bennett-wiesner-1992",
    title: "Communication via one- and two-particle operators on Einstein-Podolsky-Rosen states",
    authors: "Charles H. Bennett, Stephen J. Wiesner",
    year: "1992",
    url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.69.2881",
  },
  {
    id: "bernstein-vazirani-1997",
    title: "Quantum computational complexity",
    authors: "Ethan Bernstein, Umesh Vazirani",
    year: "1997",
    url: "https://arxiv.org/abs/quant-ph/9701008",
  },
  {
    id: "shor-1996-ft",
    title: "Fault-tolerant quantum computation",
    authors: "Peter Shor",
    year: "1996",
    url: "https://arxiv.org/abs/quant-ph/9605011",
  },
  {
    id: "kitaev-2003",
    title: "Fault-tolerant quantum computation by anyons",
    authors: "Alexei Kitaev",
    year: "2003",
    url: "https://arxiv.org/abs/quant-ph/9707021",
  },
  {
    id: "arute-2019",
    title:
      "Quantum supremacy using a programmable superconducting processor",
    authors: "Frank Arute et al. (Google Quantum AI)",
    year: "2019",
    url: "https://www.nature.com/articles/s41586-019-1666-5",
  },
  {
    id: "gottesman-2009",
    title:
      "An Introduction to Quantum Error Correction and Fault-Tolerant Quantum Computation",
    authors: "Daniel Gottesman",
    year: "2009",
    url: "https://arxiv.org/abs/0904.2557",
  },
];

export default function PapersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Research Papers
        </h1>
        <p className="text-slate-600 mt-1">
          Foundational and modern research papers in quantum computing and
          quantum mechanics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {curatedPapers.map((paper) => (
          <a
            key={paper.id}
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow block"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {paper.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1">{paper.authors}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400">
                {paper.year}
              </span>
              <TagBadge tag="PAPER" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
