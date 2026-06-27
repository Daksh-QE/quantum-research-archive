"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Atom,
  LayoutDashboard,
  BookOpen,
  Users,
  Newspaper,
  Map,
  Wrench,
  FileText,
  BookMarked,
  Mail,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { curriculum } from "@/data/curriculum";

const navItems = [
  { label: "Research Copilot", href: "/research-copilot", icon: Sparkles },
  { label: "Quantum Sandbox", href: "/quantum-sandbox", icon: Wrench },
  { label: "QEC Dashboard", href: "/qec-dashboard", icon: FileText },
  { label: "Overview", href: "/overview", icon: LayoutDashboard },
  { label: "Resources", href: "/resources", icon: BookOpen },
  { label: "Community", href: "/community", icon: Users },
  { label: "Hubs", href: "/hubs", icon: Users },
  { label: "Articles", href: "/articles", icon: Newspaper },
  { label: "Roadmap", href: "/roadmap", icon: Map },
  { label: "Tools & Practice", href: "/tools", icon: Wrench },
  { label: "Research Papers", href: "/papers", icon: FileText },
  { label: "Challenges", href: "/challenges", icon: FileText },
  { label: "Jobs", href: "/jobs", icon: Wrench },
  { label: "Glossary", href: "/glossary", icon: BookMarked },
  { label: "Newsletters", href: "/newsletters", icon: Mail },
];

const domainFilters = ["Quantum Computing", "Quantum Mechanics", "Both"];

const lessonTypeColor = (type: string) => {
  switch (type) {
    case "video":
      return "bg-blue-500";
    case "notes":
      return "bg-rose-500";
    case "tutorial":
      return "bg-emerald-500";
    case "paper":
      return "bg-purple-500";
    case "guide":
      return "bg-amber-500";
    default:
      return "bg-slate-400";
  }
};

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedModule, setExpandedModule] = useState<string | null>(null);


  const toggleModule = (id: string) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-slate-900 z-30 flex flex-col overflow-y-auto">
      {/* Brand */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-slate-700/50 shrink-0">
        <Atom className="w-5 h-5 text-blue-400" />
        <span className="text-sm font-semibold text-white leading-tight">
          Quantum Research Archive
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                isActive
                  ? "text-white bg-slate-800 border-r-2 border-blue-400"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>



      {/* Curriculum tree */}
      <div className="py-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-4 mb-1">
          Curriculum
        </h3>
        {curriculum.map((mod) => (
          <div key={mod.id}>
            <button
              onClick={() => toggleModule(mod.id)}
              className="w-full flex items-center gap-2 px-4 py-1.5 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors text-left"
            >
              {expandedModule === mod.id ? (
                <ChevronDown className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              )}
              <span className="truncate">{mod.title.replace(/^\d+\.\s*/, "")}</span>
            </button>
            {expandedModule === mod.id && (
              <div className="ml-4 border-l border-slate-700/30">
                {mod.lessons.map((lesson) => (
                  <a
                    key={lesson.id}
                    href={lesson.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 pl-4 pr-2 py-1 text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800/30 transition-colors"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${lessonTypeColor(
                        lesson.type
                      )}`}
                    />
                    <span className="truncate">{lesson.title}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Separator */}
      <div className="border-t border-slate-700/50" />

      {/* Bottom social links */}
      <div className="px-4 py-4 space-y-2">
        <a
          href="https://x.com/quantum_research"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Follow @quantum_research
        </a>
        <a
          href="https://github.com/Daksh-QE/quantum-research-archive"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          GitHub
        </a>
      </div>
    </aside>
  );
}
