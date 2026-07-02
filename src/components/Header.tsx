"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Atom, Search, Menu } from "lucide-react";
import SearchPalette from "@/components/SearchPalette";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 lg:left-56 right-0 h-14 bg-white border-b border-slate-200 z-20 flex items-center justify-between px-4 sm:px-6">
        {/* Left: menu (mobile) + Brand */}
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-slate-600 hover:text-slate-900 p-1 -ml-1"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Atom className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-semibold text-slate-900 hidden sm:inline">
            Quantum Research Archive
          </span>
        </div>

        {/* Center: Search trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 bg-slate-100 rounded-md border border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search the archive</span>
          <span className="text-xs text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">
            ⌘K
          </span>
        </button>

        {/* Right: GitHub */}
        <Link
          href="https://github.com/Daksh-QE/quantum-research-archive"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors px-3 py-1.5 rounded-md border border-slate-200"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span className="hidden sm:inline">Star on GitHub</span>
        </Link>
      </header>

      <SearchPalette
        isOpen={isSearchOpen}
        onToggle={() => setIsSearchOpen((prev) => !prev)}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
