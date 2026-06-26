"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Search, X, ExternalLink, BookText } from "lucide-react";
import { resources } from "@/data/resources";
import { articles } from "@/data/articles";
import { communityMembers } from "@/data/community";
import { tools } from "@/data/tools";
import { glossaryTerms } from "@/data/glossary";
import { curriculum } from "@/data/curriculum";
import { newsletters } from "@/data/newsletters";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: string;
  category?: string;
}

interface SearchPaletteProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function matchScore(text: string, query: string): number {
  const t = normalize(text);
  const q = normalize(query);
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  if (t.includes(q)) return 60;
  // Token-based matching
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return 0;
  const matchedTokens = tokens.filter((token) => t.includes(token));
  if (matchedTokens.length === tokens.length) return 50;
  if (matchedTokens.length > 0) return 30;
  return 0;
}

export default function SearchPalette({
  isOpen,
  onToggle,
  onClose,
}: SearchPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Build search results  
  const groupedResults = useMemo(() => {
    if (!query.trim()) return {};

    const q = query.trim().toLowerCase();
    const groups: Record<string, SearchResult[]> = {};

    function addToGroup(type: string, results: SearchResult[]) {
      const filtered = results.filter((r) => {
        const titleScore = matchScore(r.title, q);
        const descScore = matchScore(r.description, q);
        return titleScore > 0 || descScore > 0;
      });
      if (filtered.length > 0) {
        groups[type] = filtered;
      }
    }

    // Resources
    const resourceResults: SearchResult[] = resources.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      url: r.url,
      type: "Resource",
      category: r.category,
    }));
    addToGroup("Resources", resourceResults);

    // Articles
    const articleResults: SearchResult[] = articles.map((a) => ({
      id: a.id,
      title: a.title,
      description: a.description,
      url: a.url,
      type: "Article",
    }));
    addToGroup("Articles", articleResults);

    // Community
    const communityResults: SearchResult[] = communityMembers.map((m) => ({
      id: m.id,
      title: m.name,
      description: m.description,
      url: m.url,
      type: "Community",
    }));
    addToGroup("Community", communityResults);

    // Tools
    const toolResults: SearchResult[] = tools.map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      url: t.url,
      type: "Tool",
      category: t.category,
    }));
    addToGroup("Tools", toolResults);

    // Glossary
    const glossaryResults: SearchResult[] = glossaryTerms.map((g) => ({
      id: g.id,
      title: g.term,
      description: g.definition,
      url: `/glossary?term=${encodeURIComponent(g.term)}`,
      type: "Glossary",
      category: g.category,
    }));
    addToGroup("Glossary", glossaryResults);

    // Curriculum — both modules and lessons
    const moduleResults: SearchResult[] = [];
    for (const mod of curriculum) {
      const modTitleScore = matchScore(mod.title, q);
      const modDescScore = matchScore(mod.description, q);
      if (modTitleScore > 0 || modDescScore > 0) {
        moduleResults.push({
          id: mod.id,
          title: mod.title,
          description: mod.description.substring(0, 140),
          url: `/overview#${mod.id}`,
          type: "Curriculum",
          category: "Module",
        });
      }
      for (const lesson of mod.lessons) {
        const lessonTitleScore = matchScore(lesson.title, q);
        if (lessonTitleScore > 0) {
          moduleResults.push({
            id: lesson.id,
            title: lesson.title,
            description: `Lesson · ${mod.title}`,
            url: lesson.url,
            type: "Curriculum",
            category: "Lesson",
          });
        }
      }
    }
    if (moduleResults.length > 0) {
      groups["Curriculum"] = moduleResults;
    }

    // Newsletters
    const newsletterResults: SearchResult[] = newsletters.map((n) => ({
      id: n.id,
      title: n.name,
      description: n.description,
      url: n.url,
      type: "Newsletter",
      category: n.frequency,
    }));
    addToGroup("Newsletters", newsletterResults);

    return groups;
  }, [query]);

  // Flatten results in consistent order for keyboard navigation
  const flatResults = useMemo(() => {
    const order = [
      "Resources",
      "Articles",
      "Community",
      "Tools",
      "Glossary",
      "Curriculum",
      "Newsletters",
    ];
    const results: SearchResult[] = [];
    for (const groupName of order) {
      const group = groupedResults[groupName];
      if (group) {
        results.push(...group);
      }
    }
    return results;
  }, [groupedResults]);

  const openResult = useCallback(
    (result: SearchResult) => {
      if (result.type === "Glossary" || result.type === "Curriculum") {
        // Internal page — navigate within the app
        window.location.href = result.url;
      } else {
        window.open(result.url, "_blank", "noopener,noreferrer");
      }
      onClose();
    },
    [onClose]
  );

  // Reset scroll state and body overflow when modal opens/closes.
  // State is already at defaults when the component mounts (it unmounts on close).
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Auto-focus after a small delay for animation
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Global keyboard listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K — always toggle
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onToggle();
        return;
      }
      // The following keys only work when the palette is open
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        return;
      }

      if (e.key === "Enter" && flatResults.length > 0) {
        e.preventDefault();
        const result = flatResults[selectedIndex];
        if (result) openResult(result);
        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, flatResults, onToggle, onClose, openResult]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll<HTMLElement>(
        "[data-index]"
      );
      const selected = items[selectedIndex];
      if (selected) {
        selected.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  const groupOrder = [
    "Resources",
    "Articles",
    "Community",
    "Tools",
    "Glossary",
    "Curriculum",
    "Newsletters",
  ];

  if (!isOpen) return null;

  let globalIndex = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 ease-out">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search resources, articles, tools, glossary..."
            aria-label="Search the archive"
            className="flex-1 text-base text-slate-900 placeholder-slate-400 bg-transparent outline-none border-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          className="max-h-[55vh] overflow-y-auto overscroll-contain"
        >
          {query.trim() === "" ? (
            <div className="flex flex-col items-center py-12 text-slate-400">
              <Search className="w-8 h-8 mb-3" />
              <p className="text-sm">Type to start searching</p>
            </div>
          ) : flatResults.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-slate-400">
              <BookText className="w-8 h-8 mb-3" />
              <p className="text-sm font-medium text-slate-500">
                No results found
              </p>
              <p className="text-xs mt-1">
                Try different keywords or check your spelling
              </p>
            </div>
          ) : (
            groupOrder.map(
              (groupName) =>
                groupedResults[groupName] && (
                  <div key={groupName}>
                    <div className="px-4 pt-3 pb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {groupName}
                    </div>
                    {groupedResults[groupName].map((result) => {
                      globalIndex++;
                      const idx = globalIndex;
                      const isSelected = idx === selectedIndex;

                      return (
                        <button
                          key={result.id}
                          data-index={idx}
                          onClick={() => openResult(result)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors ${
                            isSelected ? "bg-blue-50" : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-slate-900 truncate">
                                {result.title}
                              </span>
                              <span
                                className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                  result.type === "Resource"
                                    ? "bg-blue-100 text-blue-700"
                                    : result.type === "Article"
                                    ? "bg-purple-100 text-purple-700"
                                    : result.type === "Community"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : result.type === "Tool"
                                    ? "bg-amber-100 text-amber-700"
                                    : result.type === "Glossary"
                                    ? "bg-rose-100 text-rose-700"
                                    : result.type === "Curriculum"
                                    ? "bg-cyan-100 text-cyan-700"
                                    : result.type === "Newsletter"
                                    ? "bg-indigo-100 text-indigo-700"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {result.type === "Curriculum" && result.category
                                  ? result.category
                                  : result.type}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                              {result.description}
                            </p>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                )
            )
          )}

          {/* Footer keyboard hints */}
          {flatResults.length > 0 && (
            <div className="sticky bottom-0 border-t border-slate-100 bg-slate-50 px-4 py-2 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono">
                  ↑↓
                </kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono">
                  ↵
                </kbd>
                Open
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono">
                  Esc
                </kbd>
                Close
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
