import React from "react";
import Link from "next/link";
import { Article } from "@/data/types";
import TagBadge from "./TagBadge";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <Link
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
      >
        {article.title}
      </Link>
      <p className="text-sm text-slate-500 mt-0.5">{article.author}</p>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
        {article.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {article.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}
