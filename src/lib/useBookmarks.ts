"use client";

import { useState, useEffect, useCallback } from "react";

// save-for-later store in localStorage, synced across components/tabs via a
// custom event. no backend.
export interface Bookmark {
  type: string; // "resource" | "article" | "tool" | "paper" | "news" | "event" | ...
  id: string;
  title: string;
  url: string;
}

const KEY = "qra-bookmarks";
const EVT = "qra-bookmarks-changed";

function read(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function write(list: Bookmark[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(EVT));
}

export function useBookmarks() {
  const [items, setItems] = useState<Bookmark[]>([]);
  useEffect(() => {
    setItems(read());
    const h = () => setItems(read());
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => { window.removeEventListener(EVT, h); window.removeEventListener("storage", h); };
  }, []);

  const has = useCallback((id: string) => items.some((b) => b.id === id), [items]);
  const toggle = useCallback((b: Bookmark) => {
    const cur = read();
    write(cur.some((x) => x.id === b.id) ? cur.filter((x) => x.id !== b.id) : [...cur, b]);
  }, []);
  const remove = useCallback((id: string) => write(read().filter((x) => x.id !== id)), []);
  const clear = useCallback(() => write([]), []);

  return { items, has, toggle, remove, clear };
}
