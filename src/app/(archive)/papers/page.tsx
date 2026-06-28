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
  { id: "feynman-1982", title: "Simulating Physics with Computers",
    authors: "Richard Feynman", year: "1982",
    url: "https://link.springer.com/article/10.1007/BF02650179" },
  { id: "deutsch-1985", title: "Quantum theory, the Church–Turing principle and the universal quantum computer",
    authors: "David Deutsch", year: "1985",
    url: "https://royalsocietypublishing.org/doi/10.1098/rspa.1985.0070" },
  { id: "bb84-1984", title: "Quantum Cryptography: Public Key Distribution and Coin Tossing (1984; arXiv reprint 2020)",
    authors: "Charles H. Bennett & Gilles Brassard", year: "1984",
    url: "https://arxiv.org/abs/2003.06557" },
  { id: "chsh-1969", title: "Proposed Experiment to Test Local Hidden-Variable Theories",
    authors: "John F. Clauser, Michael A. Horne, Abner Shimony, Richard A. Holt", year: "1969",
    url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.23.880" },
  { id: "shor-1994", title: "Polynomial-Time Algorithms for Prime Factorization and Discrete Logarithms",
    authors: "Peter Shor", year: "1994 (FOCS); 1997 (SIAM journal)",
    url: "https://arxiv.org/abs/quant-ph/9508027" },
  { id: "grover-1996", title: "A Fast Quantum Mechanical Algorithm for Database Search",
    authors: "Lov Grover", year: "1996",
    url: "https://arxiv.org/abs/quant-ph/9605043" },
  { id: "shor-qec-1995", title: "Scheme for Reducing Decoherence in Quantum Computer Memory (Shor Code)",
    authors: "Peter Shor", year: "1995",
    url: "https://journals.aps.org/pra/abstract/10.1103/PhysRevA.52.R2493" },
  { id: "bennett-teleportation-1993", title: "Teleporting an Unknown Quantum State via Dual Classical and EPR Channels",
    authors: "Bennett, Brassard, Crépeau, Jozsa, Peres, Wootters", year: "1993",
    url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.70.1895" },
  { id: "bennett-superdense-1992", title: "Communication via One- and Two-Particle Operators on Einstein-Podolsky-Rosen States",
    authors: "Charles H. Bennett & Stephen J. Wiesner", year: "1992",
    url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.69.2881" },
  { id: "steane-1996", title: "Multiple Particle Interference and Quantum Error Correction",
    authors: "Andrew Steane", year: "1996",
    url: "https://arxiv.org/abs/quant-ph/9601029" },
  { id: "no-cloning-1982", title: "A Single Quantum Cannot Be Cloned",
    authors: "William K. Wootters & Wojciech H. Zurek", year: "1982",
    url: "https://www.nature.com/articles/299802a0" },
  { id: "kitaev-1997", title: "Quantum Measurements and the Abelian Stabilizer Problem",
    authors: "Alexei Kitaev", year: "1995",
    url: "https://arxiv.org/abs/quant-ph/9511026" },
  { id: "preskill-nisq-2018", title: "Quantum Computing in the NISQ Era and Beyond",
    authors: "John Preskill", year: "2018",
    url: "https://arxiv.org/abs/1801.00862" },
  { id: "hhl-2009", title: "Quantum Algorithm for Linear Systems of Equations (HHL)",
    authors: "Harrow, Hassidim, Lloyd", year: "2009",
    url: "https://arxiv.org/abs/0811.3171" },
  { id: "qaoa-2014", title: "A Quantum Approximate Optimization Algorithm (QAOA)",
    authors: "Edward Farhi, Jeffrey Goldstone, Sam Gutmann", year: "2014",
    url: "https://arxiv.org/abs/1411.4028" },
  { id: "vqe-2014", title: "A Variational Eigenvalue Solver on a Photonic Quantum Processor (VQE)",
    authors: "Alberto Peruzzo, Jarrod McClean, et al.", year: "2014",
    url: "https://arxiv.org/abs/1304.3061" },
  { id: "quantum-supremacy-2019", title: "Quantum Supremacy Using a Programmable Superconducting Processor",
    authors: "Frank Arute et al. (Google)", year: "2019",
    url: "https://www.nature.com/articles/s41586-019-1666-5" },
  { id: "surface-code-below-threshold", title: "Suppressing Quantum Errors by Scaling a Surface Code Logical Qubit",
    authors: "Google Quantum AI (Nature, 2023)", year: "2023",
    url: "https://www.nature.com/articles/s41586-022-05434-1" },
  { id: "kitaev-topological-2003", title: "Fault-Tolerant Quantum Computation by Anyons",
    authors: "Alexei Kitaev", year: "2003",
    url: "https://arxiv.org/abs/quant-ph/9707021" },
  { id: "divincenzo-2000", title: "The Physical Implementation of Quantum Computation",
    authors: "David P. DiVincenzo", year: "2000",
    url: "https://arxiv.org/abs/quant-ph/0002077" },
];

export default function PapersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Research Papers</h1>
        <p className="text-slate-600 mt-1">
          Foundational and modern research papers in quantum computing and quantum mechanics — 20 landmark papers spanning 1969 to 2023.
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
              <span className="text-xs font-medium text-slate-400">{paper.year}</span>
              <TagBadge tag="PAPER" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
