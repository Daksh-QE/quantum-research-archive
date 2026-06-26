import React from "react";
import { curriculum } from "@/data/curriculum";
import { resources } from "@/data/resources";
import { BookOpen, Users, FileText, Wrench } from "lucide-react";
import CurriculumSection from "@/components/CurriculumSection";

const totalLessons = curriculum.reduce((sum, m) => sum + m.lessons.length, 0);

const stats = [
  { label: "Modules", value: `${curriculum.length}`, icon: BookOpen },
  { label: "Lessons", value: `${totalLessons}`, icon: FileText },
  { label: "Curated Resources", value: `${resources.length}+`, icon: Users },
  { label: "Free & Ad-Free", value: "100% Free", icon: Wrench },
];

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Quantum Research Archive
        </h1>
        <p className="text-slate-600 mt-2 max-w-2xl">
          A curated research archive for quantum computing and quantum mechanics
          — resources, curriculum, tools, and community.
        </p>
        <p className="text-slate-500 mt-3 leading-relaxed max-w-2xl">
          Whether you&apos;re a student beginning your journey into quantum
          mechanics, a researcher looking for the latest tools and papers, or a
          practitioner building with quantum SDKs, this archive brings together
          the best freely available resources in one place.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg border border-slate-200 px-4 py-3 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">
                  {stat.label}
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Curriculum */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Curriculum
        </h2>
        <CurriculumSection modules={curriculum} />
      </div>
    </div>
  );
}
