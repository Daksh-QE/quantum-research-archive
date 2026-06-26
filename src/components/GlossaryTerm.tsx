import React from "react";
import { GlossaryTerm as GlossaryTermType } from "@/data/types";

interface GlossaryTermProps {
  term: GlossaryTermType;
}

export default function GlossaryTerm({ term }: GlossaryTermProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-bold text-slate-900">{term.term}</h3>
        <span className="shrink-0 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          {term.category}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
        {term.definition}
      </p>
    </div>
  );
}
