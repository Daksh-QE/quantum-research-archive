import React from "react";
import Link from "next/link";
import { Tool } from "@/data/types";
import TagBadge from "./TagBadge";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <Link
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
        >
          {tool.title}
        </Link>
        <span className="shrink-0 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          {tool.category}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
        {tool.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tool.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}
