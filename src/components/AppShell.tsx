"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

// wraps the archive shell so the header hamburger and the sidebar drawer
// share one open/closed state. desktop (lg+) ignores it — sidebar is static.
export default function AppShell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  // close the drawer whenever we navigate
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  return (
    <>
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      {navOpen && (
        <div
          onClick={() => setNavOpen(false)}
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          aria-hidden
        />
      )}
      <Header onMenuClick={() => setNavOpen(true)} />
      <main className="ml-0 lg:ml-56 pt-14 p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50">
        <div className="mx-auto" style={{ maxWidth: "1400px" }}>
          {children}
        </div>
      </main>
    </>
  );
}
