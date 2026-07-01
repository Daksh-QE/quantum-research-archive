"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Search, Sparkles, BookOpen, Lightbulb, ChevronRight, ArrowRight, MessageSquareText, FileText, GraduationCap, X, CheckCircle, HelpCircle, Loader2 } from "lucide-react";
import { glossaryTerms } from "@/data/glossary";
import { curriculum } from "@/data/curriculum";
import { resources } from "@/data/resources";
import { answerFromPaper } from "@/lib/paperAnswer";

/* ── Interfaces ── */
interface PaperData {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  url: string;
  year: string;
  categories?: string[];
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface CopilotMessage {
  role: "user" | "assistant";
  content: string;
}

/* ── Pre-loaded quantum papers (from our existing data) ── */
const PRESET_PAPERS: PaperData[] = [
  {
    id: "shor-1997",
    title: "Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer",
    authors: "Peter Shor",
    abstract: "A digital computer is generally believed to be an efficient universal computing device; that is, it is believed able to simulate any physical computing device with an increase in computation time by at most a polynomial factor. This may not be true when quantum mechanics is taken into consideration. This paper considers factoring integers and finding discrete logarithms, two problems that are generally thought to be hard on a classical computer and have been used as the basis of several proposed cryptosystems. Efficient randomized algorithms are given for these two problems on a hypothetical quantum computer. These algorithms take a number of steps polynomial in the input size, e.g., factoring n takes O(log n)^3 steps.",
    url: "https://arxiv.org/abs/quant-ph/9508027",
    year: "1997",
    categories: ["ALGORITHMS", "CRYPTOGRAPHY"],
  },
  {
    id: "grover-1996",
    title: "A fast quantum mechanical algorithm for database search",
    authors: "Lov Grover",
    abstract: "Imagine a phone directory containing N names arranged in completely random order. In order to find someone's phone number with a probability of 1/2, any classical algorithm (whether deterministic or probabilistic) will need to look at a minimum of O(N) names. If we are able to use quantum computation, we can solve this problem with a high probability of success using only O(sqrt(N)) operations, by exploiting the superposition and entanglement properties of quantum mechanics.",
    url: "https://arxiv.org/abs/quant-ph/9605043",
    year: "1996",
    categories: ["ALGORITHMS", "SEARCH"],
  },
  {
    id: "preskill-nisq",
    title: "Quantum Computing in the NISQ era and beyond",
    authors: "John Preskill",
    abstract: "Noisy Intermediate-Scale Quantum (NISQ) technology will be available in the near future. NISQ devices will be subject to noise and will not be able to sustain quantum error correction. Nonetheless, they might be able to perform useful tasks that are beyond the reach of classical computers. I survey the emerging NISQ landscape and discuss what we might expect from quantum computing in the next decade.",
    url: "https://arxiv.org/abs/1801.00862",
    year: "2018",
    categories: ["NISQ", "HARDWARE", "ALGORITHMS"],
  },
  {
    id: "feynman-simulating",
    title: "Simulating Physics with Computers",
    authors: "Richard Feynman",
    abstract: "Classical computers cannot efficiently simulate quantum mechanical systems. We need a new kind of computer that operates on quantum mechanical principles. This paper, from 1982, is widely considered the starting point of quantum computing, where Feynman first suggested that a quantum computer could efficiently simulate quantum physics.",
    url: "https://link.springer.com/article/10.1007/BF02650179",
    year: "1982",
    categories: ["PIONEER", "SIMULATION", "THEORY"],
  },
  {
    id: "bb84-1984",
    title: "Quantum cryptography: Public key distribution and coin tossing",
    authors: "Charles H. Bennett, Gilles Brassard",
    abstract: "A new method for secure communication is proposed, based on the principles of quantum mechanics. The method, now known as BB84, allows two parties to generate a shared random secret key known only to them, which can then be used to encrypt and decrypt messages. The security of the protocol relies on the fundamental quantum mechanical properties of non-cloning and measurement disturbance.",
    // BB84 (1984) predates arXiv. Link to the canonical published version
    // (Theoretical Computer Science 560, 2014 reprint) via its stable DOI.
    url: "https://doi.org/10.1016/j.tcs.2014.05.025",
    year: "1984",
    categories: ["CRYPTOGRAPHY", "PIONEER", "COMMUNICATION"],
  },
  {
    id: "no-cloning-1982",
    title: "A single quantum cannot be cloned",
    authors: "William K. Wootters, Wojciech H. Zurek",
    abstract: "If an unknown quantum state could be cloned perfectly, then many fundamental quantum phenomena would be impossible. This paper proves that it is impossible to create an identical copy of an arbitrary unknown quantum state. The no-cloning theorem is a cornerstone of quantum cryptography and quantum information theory.",
    url: "https://www.nature.com/articles/299802a0",
    year: "1982",
    categories: ["FOUNDATIONS", "CRYPTOGRAPHY", "THEORY"],
  },
  {
    id: "chsh-1969",
    title: "Proposed experiment to test local hidden-variable theories",
    authors: "John F. Clauser, Michael A. Horne, Abner Shimony, Richard A. Holt",
    abstract: "A generalized Bell inequality is derived that can be tested experimentally. The CHSH inequality provides a practical test to distinguish between quantum mechanics and local hidden-variable theories. Violation of the inequality would confirm the predictions of quantum mechanics and rule out local realism.",
    url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.23.880",
    year: "1969",
    categories: ["FOUNDATIONS", "PIONEER", "BELL INEQUALITIES"],
  },
  {
    id: "hhl-2009",
    title: "Quantum algorithm for linear systems of equations",
    authors: "Aram W. Harrow, Avinatan Hassidim, Seth Lloyd",
    abstract: "Solving linear systems of equations is a fundamental problem in science and engineering. This paper presents a quantum algorithm that solves linear systems exponentially faster than classical methods for certain well-conditioned matrices. The HHL algorithm has become a cornerstone of quantum machine learning and quantum data analysis.",
    url: "https://arxiv.org/abs/0811.3171",
    year: "2009",
    categories: ["ALGORITHMS", "QML", "LINEAR SYSTEMS"],
  },
  {
    id: "qaoa-2014",
    title: "A quantum approximate optimization algorithm",
    authors: "Edward Farhi, Jeffrey Goldstone, Sam Gutmann",
    abstract: "We introduce a quantum algorithm that produces approximate solutions for combinatorial optimization problems. The algorithm depends on a positive integer p and the quality of the approximation improves as p increases. The quantum circuit that implements the algorithm is shallow, making it suitable for near-term quantum devices.",
    url: "https://arxiv.org/abs/1411.4028",
    year: "2014",
    categories: ["ALGORITHMS", "OPTIMIZATION", "VARIATIONAL"],
  },
  {
    id: "vqe-2014",
    title: "A variational eigenvalue solver on a photonic quantum processor",
    authors: "Alberto Peruzzo, Jarrod McClean, Peter Shadbolt, Man-Hong Yung, Xiao-Qi Zhou, Peter J. Love, Alán Aspuru-Guzik, Jeremy L. O'Brien",
    abstract: "We propose and experimentally demonstrate a variational quantum eigensolver (VQE) that uses a photonic quantum processor to find the eigenvalues of the Heisenberg and hydrogen molecular Hamiltonians. VQE combines a classical optimization routine with a quantum state preparation circuit, enabling the computation of ground state energies on near-term quantum hardware.",
    url: "https://arxiv.org/abs/1304.3061",
    year: "2014",
    categories: ["ALGORITHMS", "CHEMISTRY", "VARIATIONAL"],
  },
  {
    id: "google-surface-2023",
    title: "Suppressing quantum errors by scaling a surface code logical qubit",
    authors: "Google Quantum AI",
    abstract: "A major milestone in quantum error correction is demonstrated: a surface code logical qubit on Google's Sycamore processor where increasing the code distance from d=3 to d=5 reduces the logical error rate below the physical error rate. This below-threshold demonstration is a key step toward building a fault-tolerant quantum computer.",
    url: "https://www.nature.com/articles/s41586-022-05434-1",
    year: "2023",
    categories: ["QEC", "HARDWARE", "SURFACE CODE"],
  },
];

/* ── Extract highlighted terms from text (case-insensitive substring match) ── */
function findTerms(text: string): string[] {
  const found = new Set<string>();
  const lower = text.toLowerCase();
  for (const term of glossaryTerms) {
    if (lower.includes(term.term.toLowerCase())) {
      found.add(term.term);
    }
  }
  return Array.from(found).slice(0, 8);
}

/* ── Escape a string for safe use inside a RegExp ── */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/*
 * Render an abstract, wrapping any matched glossary term (including multi-word
 * and capitalized terms) with a highlight + hover tooltip. We build a single
 * case-insensitive regex from the matched term strings, sorted longest-first so
 * that e.g. "quantum error correction" wins over "error". Word boundaries keep
 * us from highlighting inside larger words.
 */
function renderHighlightedAbstract(
  abstract: string,
  terms: string[],
  glossary: { term: string; definition: string }[]
): React.ReactNode {
  if (terms.length === 0) return abstract;
  const sorted = [...terms].sort((a, b) => b.length - a.length);
  const pattern = sorted.map((t) => escapeRegExp(t)).join("|");
  const regex = new RegExp(`\\b(${pattern})\\b`, "gi");
  const lookup = new Map(glossary.map((g) => [g.term.toLowerCase(), g.definition]));

  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = regex.exec(abstract)) !== null) {
    if (m.index > last) out.push(abstract.slice(last, m.index));
    const matched = m[0];
    const def = lookup.get(matched.toLowerCase());
    out.push(
      <span
        key={`hl-${key++}`}
        className="border-b border-dotted border-violet-400 text-violet-700 cursor-help relative group"
      >
        {matched}
        {def && (
          <span className="absolute bottom-full left-0 mb-1 hidden group-hover:block bg-slate-900 text-white text-[10px] p-2 rounded-lg w-48 z-10 font-normal">
            {def}
          </span>
        )}
      </span>
    );
    last = m.index + matched.length;
    if (m.index === regex.lastIndex) regex.lastIndex++; // guard zero-length
  }
  if (last < abstract.length) out.push(abstract.slice(last));
  return out;
}

/* ── Simple markdown renderer ── */
function renderMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

/* ── Seeded shuffle for quiz option randomization ── */
function shuffleArray<T>(arr: T[], seed: number): T[] {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    let s = (seed * 16807 + (i * 17239)) % 2147483647;
    const j = s % (i + 1);
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

/* ── Deterministic string hash → seed (so quiz is stable per paper) ── */
function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 2147483647 || 1;
}

/* ── Generate quiz questions based on paper content (deterministic per paper) ── */
function generateQuiz(paper: PaperData, selectedTerms: string[]): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  let qi = 0;
  const seed = hashSeed(paper.id);

  // Paper content question
  const sentences = paper.abstract.split(".").filter((s) => s.trim().length > 20);
  if (sentences.length > 2) {
    // Deterministic sentence pick (no Math.random inside useMemo).
    const q = sentences[seed % sentences.length].trim();
    const rawOptions = [
      q.substring(0, Math.min(q.length, 80)) + "...",
      "This claim is not supported by the paper.",
      "The paper argues the opposite.",
    ];
    const shuffledOptions = shuffleArray([...rawOptions], seed + qi * 7 + 42);
    const correctAnswer = rawOptions[0];
    const newCorrect = shuffledOptions.indexOf(correctAnswer);
    questions.push({
      question: `According to the paper, which of the following is true?`,
      options: shuffledOptions,
      correct: newCorrect,
    });
    qi++;
  }

  // Term definitions
  if (selectedTerms.length >= 2) {
    const term1 = selectedTerms[0];
    const term2 = selectedTerms[1];
    const def1 = glossaryTerms.find((t) => t.term === term1);
    const def2 = glossaryTerms.find((t) => t.term === term2);
    if (def1 && def2) {
      const rawOptions = [
        def1.definition.substring(0, 120) + "...",
        def2.definition.substring(0, 120) + "...",
        "Neither of the above",
      ];
      const shuffledOptions = shuffleArray([...rawOptions], seed + qi * 7 + 13);
      const correctAnswer = rawOptions[0];
      const newCorrect = shuffledOptions.indexOf(correctAnswer);
      questions.push({
        question: `In quantum computing, what is "${term1}"?`,
        options: shuffledOptions,
        correct: newCorrect,
      });
      qi++;
    }
  }

  // Year / milestone question — only when the year is a valid number.
  const yearNum = parseInt(paper.year, 10);
  if (!Number.isNaN(yearNum) && /^\d{4}$/.test(paper.year.trim())) {
    const rawOptions = [String(yearNum), String(yearNum + 2), String(yearNum - 3)];
    const shuffledOptions = shuffleArray([...rawOptions], seed + qi * 7 + 99);
    const correctAnswer = rawOptions[0];
    const newCorrect = shuffledOptions.indexOf(correctAnswer);
    questions.push({
      question: `When was this paper published?`,
      options: shuffledOptions,
      correct: newCorrect,
    });
  }

  return questions;
}

/* ── Prerequisite concepts from curriculum ── */
function findPrereqs(paper: PaperData) {
  const matches: { module: string; lesson: string; url: string }[] = [];
  const lower = paper.abstract.toLowerCase();
  for (const mod of curriculum) {
    for (const lesson of mod.lessons) {
      const words = lesson.title.toLowerCase().split(" ");
      for (const word of words) {
        if (word.length > 4 && lower.includes(word)) {
          matches.push({ module: mod.title.replace(/^\d+\.\s*/, ""), lesson: lesson.title, url: lesson.url });
          break;
        }
      }
      if (matches.length >= 4) break;
    }
    if (matches.length >= 4) break;
  }
  return matches.slice(0, 4);
}

/* ── Component ── */
export default function ResearchCopilotPage() {
  const [paperId, setPaperId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPaper, setSelectedPaper] = useState<PaperData | null>(null);
  const [activeTab, setActiveTab] = useState<"explain" | "quiz" | "prereqs" | "chat">("explain");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<CopilotMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [arxivInput, setArxivInput] = useState("");
  const [arxivLoading, setArxivLoading] = useState(false);
  const [arxivError, setArxivError] = useState("");
  const selectedPaperRef = useRef<PaperData | null>(null);
  const chatMessagesRef = useRef<CopilotMessage[]>([]);

  const allPapers = useMemo(() => {
    // Combine preset papers with resources that are papers
    const fromResources = resources
      .filter((r) => r.tags.includes("PAPER") && r.url)
      .map((r) => ({
        id: r.id,
        title: r.title,
        authors: r.author || "Unknown",
        abstract: r.description,
        url: r.url,
        year: "—",
      }));
    return [...PRESET_PAPERS, ...fromResources];
  }, []);

  const filtered = useMemo(() => {
    if (!searchQuery) return allPapers.slice(0, 10);
    const q = searchQuery.toLowerCase();
    return allPapers.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [searchQuery, allPapers]);

  const highlightedTerms = useMemo(
    () => (selectedPaper ? findTerms(selectedPaper.abstract + " " + selectedPaper.title + " " + (selectedPaper.categories?.join(" ") || "")) : []),
    [selectedPaper]
  );

  const prereqs = useMemo(
    () => (selectedPaper ? findPrereqs(selectedPaper) : []),
    [selectedPaper]
  );

  const quiz = useMemo(
    () => (selectedPaper ? generateQuiz(selectedPaper, highlightedTerms) : []),
    [selectedPaper, highlightedTerms]
  );

  const quizScore = useMemo(() => {
    if (!quizSubmitted) return 0;
    return quiz.reduce((s, q, i) => s + (quizAnswers[i] === q.correct ? 1 : 0), 0);
  }, [quizSubmitted, quizAnswers, quiz]);

  const [completedPapers, setCompletedPapers] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(localStorage.getItem("qra-completed-papers") || "[]");
      } catch {}
    }
    return [];
  });
  useEffect(() => {
    localStorage.setItem("qra-completed-papers", JSON.stringify(completedPapers));
  }, [completedPapers]);

  // When quiz is passed, mark paper as completed
  useEffect(() => {
    if (quizSubmitted && quiz.length > 0 && quizScore === quiz.length && selectedPaper && !completedPapers.includes(selectedPaper.id)) {
      setCompletedPapers((prev) => [...prev, selectedPaper.id]);
    }
  }, [quizSubmitted, quizScore, quiz.length, selectedPaper, completedPapers]);

  useEffect(() => {
    chatMessagesRef.current = chatMessages;
  }, [chatMessages]);

  const handleSelectPaper = useCallback((paper: PaperData) => {
    setSelectedPaper(paper);
    selectedPaperRef.current = paper;
    setPaperId(paper.id);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setChatMessages([]);
    chatMessagesRef.current = [];
    setActiveTab("explain");
  }, []);

  const loadArxiv = useCallback(async () => {
    const raw = arxivInput.trim();
    setArxivError("");
    if (!raw) { setArxivError("Paste an arXiv URL or id first."); return; }
    const match = raw.match(/(\d{4}\.\d{4,5}|[a-z-]+(?:\.[a-z-]+)*\/\d{7})(v\d+)?/i);
    if (!match) { setArxivError("That doesn't look like an arXiv id (e.g. 1801.00862 or quant-ph/9508027)."); return; }
    const id = match[1];
    setArxivLoading(true);
    try {
      const res = await fetch(`/api/arxiv?id=${encodeURIComponent(id)}`, { signal: AbortSignal.timeout(15000) });
      const data = await res.json();
      if (!res.ok || !data.title) { setArxivError(data.error || "Could not load that paper."); return; }
      handleSelectPaper({ id: data.id, title: data.title, authors: data.authors, abstract: data.abstract, url: data.url, year: data.year || "—" });
      setArxivInput("");
    } catch {
      setArxivError("Could not reach arXiv. Please try again.");
    } finally {
      setArxivLoading(false);
    }
  }, [arxivInput, handleSelectPaper]);

  const handleAnswer = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
  };

  const handleChatSend = async (rawMessage: string) => {
    const msg = rawMessage.trim();
    const paper = selectedPaperRef.current;
    if (!msg || !paper) return;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: msg }]);
    setChatLoading(true);

    // Try the AI API first
    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessagesRef.current, { role: "user", content: msg }],
          paperTitle: paper.title,
          paperAuthors: paper.authors,
          paperAbstract: paper.abstract,
        }),
        signal: AbortSignal.timeout(7000),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setChatMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
          setChatLoading(false);
          return;
        }
      }
    } catch {}

    // Fallback (API unreachable): the same paper-grounded answerer the server uses.
    const reply = answerFromPaper(
      msg,
      { title: paper.title, authors: paper.authors, abstract: paper.abstract, categories: paper.categories },
      glossaryTerms
    );
    setChatMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    setChatLoading(false);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-violet-600" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">Paper Reader</h1>
          <p className="text-sm text-slate-500">Read and understand quantum papers.</p>
        </div>
        {completedPapers.length > 0 && (
          <div className="text-right">
            <p className="text-xs font-semibold text-violet-700">{completedPapers.length} paper{completedPapers.length !== 1 ? "s" : ""} completed</p>
            <div className="w-20 h-1.5 rounded-full bg-slate-200 mt-0.5 ml-auto overflow-hidden">
              <div className="h-full bg-violet-500 rounded-full" style={{ width: `${Math.min(completedPapers.length / 20 * 100, 100)}%` }} />
            </div>
          </div>
        )}
      </div>

      {!selectedPaper ? (
        /* ── Paper Browser ── */
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search papers by title, author, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
            />
          </div>

          {/* arXiv direct link */}
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Or paste an arXiv URL (e.g., https://arxiv.org/abs/quant-ph/9508027)"
                value={arxivInput}
                onChange={(e) => { setArxivInput(e.target.value); setArxivError(""); }}
                onKeyDown={(e) => { if (e.key === "Enter") loadArxiv(); }}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                onClick={loadArxiv}
                disabled={arxivLoading}
                className="px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors shrink-0 disabled:opacity-60 inline-flex items-center gap-1.5"
              >
                {arxivLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Loading…</> : "Load"}
              </button>
            </div>
            {arxivError && <p className="text-xs text-red-600 mt-1.5">{arxivError}</p>}
          </div>

          <p className="text-xs text-slate-400">Pre-loaded papers:</p>
          <div className="grid grid-cols-1 gap-3">
            {filtered.map((paper) => (
              <button
                key={paper.id}
                onClick={() => handleSelectPaper(paper)}
                className="text-left bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-violet-200 transition-all"
              >
                <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">{paper.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{paper.authors} · {paper.year}</p>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{paper.abstract}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* ── Paper Reader ── */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Paper header */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <button
                onClick={() => setSelectedPaper(null)}
                className="text-xs text-slate-400 hover:text-slate-600 mb-2 flex items-center gap-1"
              >
                ← Back to papers
              </button>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">{selectedPaper.title}</h2>
              <p className="text-sm text-slate-500 mt-1">{selectedPaper.authors} · {selectedPaper.year}</p>
              <a href={selectedPaper.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-violet-600 hover:text-violet-500 mt-2 font-medium">
                <FileText className="w-3 h-3" />
                View full paper <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* Abstract with highlighted terms */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Abstract</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {renderHighlightedAbstract(selectedPaper.abstract, highlightedTerms, glossaryTerms)}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
              {[
                { id: "explain", label: "Summary", icon: Lightbulb },
                { id: "quiz", label: "Quiz", icon: HelpCircle },
                { id: "prereqs", label: "Prerequisites", icon: GraduationCap },
                { id: "chat", label: "Ask", icon: MessageSquareText },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                      isActive ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            {activeTab === "explain" && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center gap-2 text-violet-700">
                  <Lightbulb className="w-4 h-4" />
                  <h3 className="text-sm font-semibold">Summary</h3>
                </div>
                <div className="bg-violet-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed space-y-3">
                  <div>
                    <p className="font-semibold text-violet-800 text-xs uppercase tracking-wider mb-1">What this paper achieves</p>
                    <p>{selectedPaper.title}, published by {selectedPaper.authors} in {selectedPaper.year}, addresses a fundamental challenge in quantum computing. {selectedPaper.abstract.split(". ").slice(0, 2).join(". ")}.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-violet-800 text-xs uppercase tracking-wider mb-1">The key technique</p>
                    <p>The paper introduces a novel approach that leverages quantum mechanical properties — specifically {selectedPaper.categories?.includes("ALGORITHMS") ? "superposition and entanglement" : selectedPaper.categories?.includes("HARDWARE") ? "quantum coherence and gate operations" : "quantum mechanical phenomena"} — to achieve results that are not possible with classical methods. {selectedPaper.abstract.split(". ").slice(2, 4).join(". ") || "The methodology builds on established principles in quantum information science."}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-violet-800 text-xs uppercase tracking-wider mb-1">Why it matters</p>
                    <p>This work has significant implications for the field: it {selectedPaper.categories?.includes("CRYPTOGRAPHY") ? "impacts the security of modern cryptographic systems" : selectedPaper.categories?.includes("NISQ") ? "provides a framework for understanding near-term quantum devices" : selectedPaper.categories?.includes("PIONEER") ? "laid the conceptual foundation for the entire field of quantum computing" : "advances our understanding of what quantum computers can achieve"}. Understanding this paper is essential for anyone working in quantum {selectedPaper.categories?.[0]?.toLowerCase() || "computing"}.</p>
                  </div>
                </div>
                {highlightedTerms.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-2">Key terms in this paper:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {highlightedTerms.map((term) => {
                        const def = glossaryTerms.find((t) => t.term === term);
                        return (
                          <span
                            key={term}
                            className="px-2 py-1 rounded-md bg-violet-100 text-violet-700 text-[10px] font-medium cursor-help relative group"
                          >
                            {term}
                            {def && (
                              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-900 text-white text-[10px] p-2 rounded-lg w-56 z-10 text-center">
                                {def.definition}
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "quiz" && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center gap-2 text-emerald-700">
                  <HelpCircle className="w-4 h-4" />
                  <h3 className="text-sm font-semibold">Knowledge Check</h3>
                  {quizSubmitted && (
                    <span className="text-xs font-medium ml-auto">
                      {quizScore}/{quiz.length} correct
                    </span>
                  )}
                </div>
                {quiz.map((q, qi) => (
                  <div key={qi} className="border border-slate-100 rounded-xl p-4">
                    <p className="text-sm font-medium text-slate-900 mb-3">{qi + 1}. {q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => {
                        const selected = quizAnswers[qi] === oi;
                        const isCorrect = q.correct === oi;
                        const showResult = quizSubmitted;
                        let className = "w-full text-left px-3 py-2 rounded-lg text-sm border transition-all ";
                        if (showResult) {
                          if (isCorrect) className += "border-emerald-300 bg-emerald-50 text-emerald-700";
                          else if (selected && !isCorrect) className += "border-red-300 bg-red-50 text-red-700";
                          else className += "border-slate-200 text-slate-500 opacity-60";
                        } else {
                          className += selected
                            ? "border-violet-300 bg-violet-50 text-violet-700"
                            : "border-slate-200 text-slate-600 hover:border-slate-300";
                        }
                        return (
                          <button key={oi} onClick={() => handleAnswer(qi, oi)} className={className}>
                            <div className="flex items-center gap-2">
                              {showResult && isCorrect && <CheckCircle className="w-4 h-4 shrink-0" />}
                              <span>{opt}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {!quizSubmitted && (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(quizAnswers).length < quiz.length}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answers
                  </button>
                )}
                {quizSubmitted && (
                  <div className="text-center">
                    <p className={`text-sm font-semibold ${quizScore === quiz.length ? "text-emerald-600" : quizScore >= quiz.length / 2 ? "text-amber-600" : "text-red-600"}`}>
                      {quizScore === quiz.length ? "🎉 Perfect! You've mastered this paper." :
                       quizScore >= quiz.length / 2 ? "👍 Good job! Review the ones you missed." :
                       "📖 Review the paper and try again."}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "prereqs" && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-700">
                  <GraduationCap className="w-4 h-4" />
                  <h3 className="text-sm font-semibold">Prerequisite Concepts</h3>
                </div>
                {prereqs.length > 0 ? (
                  <div className="space-y-2">
                    {prereqs.map((pr, i) => (
                      <a key={i} href={pr.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {i + 1}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900">{pr.lesson}</p>
                          <p className="text-xs text-slate-500">from {pr.module}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 ml-auto" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No specific prerequisite concepts detected. This paper is accessible with basic quantum knowledge.</p>
                )}
                <p className="text-xs text-slate-400 mt-2">These lessons from the curriculum cover concepts mentioned in this paper.</p>
              </div>
            )}

            {activeTab === "chat" && (
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-2 text-blue-700 mb-3">
                  <MessageSquareText className="w-4 h-4" />
                  <h3 className="text-sm font-semibold">Ask a Question</h3>
                </div>
                <div className="h-48 overflow-y-auto mb-3 space-y-2 bg-slate-50 rounded-xl p-3">
                  {chatMessages.length === 0 && (
                    <div className="text-center pt-4">
                      <p className="text-xs text-slate-400 mb-2">Ask anything about this paper — try one:</p>
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {["What's the main result?", "Summarize this paper", "How does it work?", ...(highlightedTerms[0] ? [`Explain ${highlightedTerms[0]}`] : [])].map((s) => (
                          <button key={s} onClick={() => handleChatSend(s)}
                            className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11px] text-slate-600 hover:border-violet-300 hover:text-violet-700 transition-colors">
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {chatMessages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                        m.role === "user"
                          ? "bg-violet-600 text-white"
                          : "bg-white border border-slate-200 text-slate-700"
                      }`}>
                        {m.content.split("\n").map((line, j) => <p key={j}>{renderMarkdown(line)}</p>)}
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-xl px-3 py-2">
                        <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
                <form
                  onSubmit={(e) => { e.preventDefault(); handleChatSend(chatInput); }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim()}
                    className="px-3 py-2 rounded-xl bg-violet-600 text-white hover:bg-violet-500 transition-colors disabled:opacity-50"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar — paper info + terms */}
          <div className="space-y-4">
            {/* Related glossary terms */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Key Terms</h3>
              {highlightedTerms.length > 0 ? (
                <div className="space-y-2">
                  {highlightedTerms.map((term) => {
                    const def = glossaryTerms.find((t) => t.term === term);
                    return (
                      <div key={term} className="text-xs">
                        <span className="font-medium text-violet-700">{term}</span>
                        {def && <p className="text-slate-500 mt-0.5 leading-relaxed">{def.definition.slice(0, 120)}...</p>}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No glossary terms detected in this paper.</p>
              )}
            </div>

            {/* Categories */}
            {selectedPaper.categories && (
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Categories</h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPaper.categories.map((cat) => (
                    <span key={cat} className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Smart recommendations — pick a different paper, prefer a shared category */}
            {(() => {
              const cur = selectedPaper;
              const others = PRESET_PAPERS.filter((p) => p.id !== cur.id);
              const shared = others.find((p) => p.categories?.some((c) => cur.categories?.includes(c)));
              const next = shared || others[0];
              if (!next) return null;
              return (
                <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-xl border border-slate-200 p-4">
                  <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Next Paper</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    After this, try <strong>{next.title}</strong>{next.authors ? ` by ${next.authors.split(",")[0]}` : ""}{shared ? " — it shares themes with this one." : "."}
                  </p>
                  <button onClick={() => handleSelectPaper(next)}
                    className="mt-2 text-xs text-violet-600 hover:text-violet-500 font-medium flex items-center gap-1">
                    Read now <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
