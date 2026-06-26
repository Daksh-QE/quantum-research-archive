import React from "react";
import Link from "next/link";
import { CommunityMember } from "@/data/types";
import TagBadge from "./TagBadge";

interface CommunityCardProps {
  member: CommunityMember;
}

const roleLabels: Record<string, string> = {
  RES: "Researcher",
  EDU: "Educator",
  BUILD: "Builder",
  LEAD: "Institute",
};

export default function CommunityCard({ member }: CommunityCardProps) {
  const roleClass = `role-${member.role.toLowerCase()}`;
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm">
          {member.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={member.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
            >
              {member.name}
            </Link>
            <span
              className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${roleClass}`}
            >
              {roleLabels[member.role] || member.role}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
            {member.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {member.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
