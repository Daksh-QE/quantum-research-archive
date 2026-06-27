import React from "react";
import { curriculum } from "@/data/curriculum";
import { Play, FileText, BookOpen, FileBadge, Compass } from "lucide-react";

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
      return "text-blue-600 bg-blue-100";
    case "notes":
      return "text-rose-600 bg-rose-100";
    case "tutorial":
      return "text-emerald-600 bg-emerald-100";
    case "paper":
      return "text-purple-600 bg-purple-100";
    case "guide":
      return "text-amber-600 bg-amber-100";
    default:
      return "text-slate-400 bg-slate-100";
  }
};

export default function RoadmapPage() {
  const totalLessons = curriculum.reduce((sum, m) => sum + m.lessons.length, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Learning Roadmap
        </h1>
        <p className="text-slate-600 mt-1">
          A structured path from mathematical foundations to advanced quantum
          computing
        </p>
        <p className="text-sm text-slate-500 mt-1">
          {curriculum.length} modules &middot; {totalLessons} lessons
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-slate-200" />

        <div className="space-y-8">
          {curriculum.map((mod, index) => (
            <div key={mod.id} className="relative flex gap-6">
              {/* Module number circle */}
              <div className="relative z-10 shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Content card */}
              <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-slate-900">
                  {mod.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {mod.description}
                </p>

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Lessons ({mod.lessons.length})
                  </p>
                  <ul className="space-y-1.5">
                    {mod.lessons.map((lesson) => (
                      <li key={lesson.id} className="flex items-start gap-2">
                        <a href={lesson.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 flex-1 min-w-0 group">
                          <span
                            className={`shrink-0 mt-0.5 w-5 h-5 rounded flex items-center justify-center ${lessonTypeColor(
                              lesson.type
                            )}`}
                          >
                            {lessonTypeIcon(lesson.type)}
                          </span>
                          <span className="text-sm text-slate-700 group-hover:text-blue-600 transition-colors">
                            {lesson.title}
                          </span>
                          <span className="shrink-0 text-xs text-slate-400 capitalize group-hover:text-blue-500 transition-colors">
                            {lesson.type}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
