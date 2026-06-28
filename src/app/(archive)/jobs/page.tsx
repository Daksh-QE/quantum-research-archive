"use client";

import React from "react";
import { Briefcase, ExternalLink, Search } from "lucide-react";

const JOB_BOARDS = [
  {
    name: "Quantum Computing Report Jobs",
    url: "https://quantumcomputingreport.com/jobs/",
    description: "Curated quantum computing job listings from the Quantum Computing Report team. Covers research, engineering, and business roles across the quantum ecosystem.",
    tags: ["CURATED", "INDUSTRY", "RESEARCH"],
  },
  {
    name: "QWorld Jobs",
    url: "https://qworld.net/jobs/",
    description: "Quantum computing job board from the QWorld global community. Includes academic positions, internships, and industry roles worldwide.",
    tags: ["COMMUNITY", "GLOBAL", "ACADEMIA"],
  },
  {
    name: "The Quantum Insider Jobs",
    url: "https://thequantuminsider.com/jobs/",
    description: "Quantum job listings from The Quantum Insider. Tracks quantum startup hiring, executive positions, and research opportunities.",
    tags: ["INDUSTRY", "STARTUPS", "EXECUTIVE"],
  },
  {
    name: "LinkedIn — Quantum Computing Jobs",
    url: "https://www.linkedin.com/search/results/jobs/?keywords=quantum+computing",
    description: "Live LinkedIn search for quantum computing positions at companies worldwide. Updated daily with new postings.",
    tags: ["LIVE", "GLOBAL", "ALL LEVELS"],
  },
  {
    name: "Nature Jobs — Quantum Physics",
    url: "https://www.nature.com/naturecareers/",
    description: "Academic and research positions in quantum physics, quantum computing, and related fields posted on Nature Careers.",
    tags: ["ACADEMIA", "RESEARCH", "POSTDOC"],
  },
  {
    name: "IBM Quantum Careers",
    url: "https://www.ibm.com/quantum/careers",
    description: "Direct career listings from IBM Quantum, one of the largest quantum computing employers. Research, engineering, and software roles.",
    tags: ["INDUSTRY", "IBM", "QISKIT"],
  },
  {
    name: "Google Quantum AI Careers",
    url: "https://careers.google.com/jobs/results/?q=quantum",
    description: "Google Quantum AI career opportunities. Research scientist, software engineer, and hardware roles in quantum computing.",
    tags: ["INDUSTRY", "GOOGLE", "RESEARCH"],
  },
  {
    name: "Quantinuum Careers",
    url: "https://www.quantinuum.com/careers",
    description: "Career opportunities at Quantinuum, the integrated quantum computing company. Roles in trapped-ion hardware, software, and applications.",
    tags: ["INDUSTRY", "HARDWARE", "SOFTWARE"],
  },
];

export default function JobsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Jobs</h1>
        <p className="text-slate-600 mt-1">
          Quantum computing job boards and career resources — find your next role in quantum.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {JOB_BOARDS.map((board) => (
          <a
            key={board.name}
            href={board.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-blue-200 transition-all block"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-slate-900 leading-snug">{board.name}</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{board.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {board.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-0.5 rounded font-medium text-[10px] bg-blue-50 text-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <p className="font-medium mb-1">💡 Tip</p>
        <p>Bookmark these job boards and check them regularly. Many quantum companies also post on LinkedIn — set up a saved search for &quot;quantum computing&quot; to get notified of new openings.</p>
      </div>
    </div>
  );
}
