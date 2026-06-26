"use client";

import React, { useState, useMemo } from "react";
import { communityMembers } from "@/data/community";
import CommunityCard from "@/components/CommunityCard";
import FilterBar from "@/components/FilterBar";

const roleLabels: Record<string, string> = {
  RES: "Researchers",
  EDU: "Educators",
  BUILD: "Builders",
  LEAD: "Institutes",
};

const roleOrder = ["RES", "EDU", "BUILD", "LEAD"];

export default function CommunityPage() {
  const [activeRole, setActiveRole] = useState("All");

  const categories = useMemo(() => {
    return roleOrder.map((r) => roleLabels[r]);
  }, []);

  // Map display label back to role code
  const activeRoleCode =
    activeRole === "All"
      ? "All"
      : roleOrder.find((r) => roleLabels[r] === activeRole) || "All";

  const filtered = useMemo(() => {
    if (activeRoleCode === "All") return communityMembers;
    return communityMembers.filter((m) => m.role === activeRoleCode);
  }, [activeRoleCode]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Community</h1>
        <p className="text-slate-600 mt-1">
          Key researchers, educators, builders, and institutes in quantum
        </p>
      </div>

      <div>
        <FilterBar
          categories={categories}
          activeCategory={activeRole}
          onCategoryChange={setActiveRole}
        />
      </div>

      <div>
        <p className="text-sm text-slate-500 mb-4">
          Showing {filtered.length} of {communityMembers.length} members
        </p>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {filtered.map((member) => (
              <CommunityCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-12">
            No community members found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
