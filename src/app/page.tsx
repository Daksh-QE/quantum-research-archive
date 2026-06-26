"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Atom, Sparkles, BookOpen, Users, Newspaper, Wrench, FileText, BookMarked, Mail, GraduationCap, Github, ExternalLink } from "lucide-react";
import { resources } from "@/data/resources";
import { articles } from "@/data/articles";
import { tools } from "@/data/tools";
import { communityMembers } from "@/data/community";
import { glossaryTerms } from "@/data/glossary";
import { newsletters } from "@/data/newsletters";
import { curriculum } from "@/data/curriculum";
import TagBadge from "@/components/TagBadge";

const categories = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "papers", label: "Papers", icon: FileText },
  { id: "resources", label: "Resources", icon: BookOpen },
  { id: "articles", label: "Articles", icon: Newspaper },
  { id: "tools", label: "Tools", icon: Wrench },
  { id: "community", label: "Community", icon: Users },
];

interface CardItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  url: string;
  type: string;
  tags?: string[];
  category: string;
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Build cards from all data sources
  const allCards: CardItem[] = useMemo(() => {
    const cards: CardItem[] = [];

    // Resources as cards
    resources.slice(0, 20).forEach((r) => {
      cards.push({
        id: `res-${r.id}`,
        title: r.title,
        subtitle: r.author,
        description: r.description,
        url: r.url,
        type: r.category,
        tags: r.tags,
        category: "resources",
      });
    });

    // Articles as cards
    articles.slice(0, 15).forEach((a) => {
      cards.push({
        id: `art-${a.id}`,
        title: a.title,
        subtitle: a.author,
        description: a.description,
        url: a.url,
        type: "Article",
        tags: a.tags,
        category: "articles",
      });
    });

    // Tools as cards
    tools.slice(0, 15).forEach((t) => {
      cards.push({
        id: `tool-${t.id}`,
        title: t.title,
        subtitle: t.category,
        description: t.description,
        url: t.url,
        type: t.category,
        tags: t.tags,
        category: "tools",
      });
    });

    // Community as cards
    communityMembers.slice(0, 15).forEach((m) => {
      cards.push({
        id: `comm-${m.id}`,
        title: m.name,
        subtitle: m.role,
        description: m.description,
        url: m.url,
        type: m.role,
        tags: m.tags,
        category: "community",
      });
    });

    return cards;
  }, []);

  const filteredCards = useMemo(() => {
    if (activeCategory === "all") return allCards;
    return allCards.filter((c) => c.category === activeCategory);
  }, [activeCategory, allCards]);

  // Stats
  const totalLessons = curriculum.reduce((s, m) => s + m.lessons.length, 0);
  const stats = [
    { label: "Curriculum Modules", value: curriculum.length, icon: GraduationCap },
    { label: "Curated Resources", value: resources.length, icon: BookOpen },
    { label: "Research Tools", value: tools.length, icon: Wrench },
    { label: "Glossary Terms", value: glossaryTerms.length, icon: BookMarked },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-20 pb-16 sm:pt-28 sm:pb-20">
        {/* Animated quantum particles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />

          {/* Orbiting quantum rings */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.04]" viewBox="0 0 500 500">
            <ellipse cx="250" cy="250" rx="200" ry="80" fill="none" stroke="#60a5fa" strokeWidth="1">
              <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="20s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="250" cy="250" rx="200" ry="80" fill="none" stroke="#a78bfa" strokeWidth="1" transform="rotate(60 250 250)">
              <animateTransform attributeName="transform" type="rotate" from="60 250 250" to="420 250 250" dur="25s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="250" cy="250" rx="200" ry="80" fill="none" stroke="#22d3ee" strokeWidth="1" transform="rotate(120 250 250)">
              <animateTransform attributeName="transform" type="rotate" from="120 250 250" to="480 250 250" dur="30s" repeatCount="indefinite" />
            </ellipse>
          </svg>

          {/* Floating dots */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${5 + Math.random() * 90}%`,
                top: `${5 + Math.random() * 90}%`,
                animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Free &bull; Curated &bull; Ad-Free
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Quantum{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">
              Research Archive
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            A comprehensive, curated research archive for quantum computing and quantum mechanics.
            <br className="hidden sm:block" />
            From mathematical foundations to cutting-edge research — <span className="text-blue-300">free, calm, ad-free</span>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/overview"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all hover:shadow-lg hover:shadow-blue-600/25"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium border border-slate-700 transition-all"
            >
              Browse Resources
            </Link>
            <a
              href="https://github.com/Daksh-QE/quantum-research-archive"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 font-medium border border-slate-700/50 transition-all text-sm"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12 max-w-3xl mx-auto">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/30 px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                    <p className="text-[11px] text-slate-500 leading-tight">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== EXPLORE SECTION (Mosaic) ===== */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Explore the Archive</h2>
            <p className="text-slate-400 text-sm mt-1">
              {filteredCards.length} curated items across {allCards.length} picks
            </p>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium rounded-full transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700 border border-slate-700/50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredCards.map((card) => (
            <a
              key={card.id}
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/30 p-4 hover:bg-slate-800/60 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider shrink-0">
                  {card.subtitle || card.type}
                </span>
                <ExternalLink className="w-3 h-3 text-slate-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                {card.title}
              </h3>
              {card.description && (
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {card.description}
                </p>
              )}
              {card.tags && card.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {card.tags.slice(0, 3).map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500">No items found in this category.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/overview"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium border border-slate-700 transition-all"
          >
            View Full Curriculum
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-800 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            Quantum Research Archive &mdash; Free, curated, ad-free.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Daksh-QE/quantum-research-archive" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              <Github className="w-4 h-4 inline" /> GitHub
            </a>
            <span className="text-xs text-slate-700">Content gets updated with time.</span>
          </div>
        </div>
      </footer>


    </div>
  );
}
