import React from "react";
import Link from "next/link";
import { Resource } from "@/data/types";
import TagBadge from "./TagBadge";
import BookmarkButton from "./BookmarkButton";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <Link
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
          >
            {resource.title}
          </Link>
          {resource.author && (
            <p className="text-sm text-slate-500 mt-0.5">{resource.author}</p>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {resource.category && (
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {resource.category}
            </span>
          )}
          <BookmarkButton type="resource" id={resource.id} title={resource.title} url={resource.url} />
        </div>
      </div>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
        {resource.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {resource.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}
