import React from "react";
import Link from "next/link";
import { Newsletter } from "@/data/types";
import TagBadge from "./TagBadge";
import BookmarkButton from "./BookmarkButton";

interface NewsletterCardProps {
  newsletter: Newsletter;
}

export default function NewsletterCard({ newsletter }: NewsletterCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <Link
          href={newsletter.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
        >
          {newsletter.name}
        </Link>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {newsletter.frequency}
          </span>
          <BookmarkButton type="newsletter" id={newsletter.id} title={newsletter.name} url={newsletter.url} />
        </div>
      </div>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
        {newsletter.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {newsletter.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}
