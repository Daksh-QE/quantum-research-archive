"use client";

import React, { useState } from "react";
import { Module } from "@/data/types";
import { ChevronDown, ChevronRight, FileText, Play, BookOpen, FileBadge, Compass } from "lucide-react";

interface CurriculumSectionProps {
  modules: Module[];
}

const lessonTypeIcon = (type: string) => {
  switch (type) {
    case "video":
      return <Play className="w-3 h-3" />;
    case "notes":
      return <FileText className="w-3 h-3" />;
    case "tutorial":
      return <BookOpen className="w-3 h-3" />;
    case "paper":
      return <FileBadge className="w-3 h-3" />;
    case "guide":
      return <Compass className="w-3 h-3" />;
    default:
      return <FileText className="w-3 h-3" />;
  }
};

const lessonTypeColor = (type: string) => {
  switch (type) {
    case "video":
      return "text-blue-600";
    case "notes":
      return "text-rose-600";
    case "tutorial":
      return "text-emerald-600";
    case "paper":
      return "text-purple-600";
    case "guide":
      return "text-amber-600";
    default:
      return "text-slate-400";
  }
};

export default function CurriculumSection({ modules }: CurriculumSectionProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(
    modules.length > 0 ? modules[0].id : null
  );

  const toggleModule = (id: string) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {modules.map((mod) => (
        <div
          key={mod.id}
          className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => toggleModule(mod.id)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-slate-900">
                {mod.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{mod.description}</p>
              <span className="inline-block mt-2 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {mod.lessons.length} lesson{mod.lessons.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="shrink-0 ml-4 text-slate-400">
              {expandedModule === mod.id ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </div>
          </button>

          {expandedModule === mod.id && (
            <div className="border-t border-slate-100 divide-y divide-slate-50">
              {mod.lessons.map((lesson) => (
                <a
                  key={lesson.id}
                  href={lesson.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span className={`shrink-0 ${lessonTypeColor(lesson.type)}`}>
                    {lessonTypeIcon(lesson.type)}
                  </span>
                  <span className="flex-1 min-w-0">{lesson.title}</span>
                  <span className="shrink-0 text-xs font-medium text-slate-400 capitalize">
                    {lesson.type}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
