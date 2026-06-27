"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Search, Sparkles, BookOpen, Lightbulb, ChevronRight, ArrowRight, MessageSquareText, FileText, GraduationCap, X, CheckCircle, HelpCircle, Loader2 } from "lucide-react";
import { glossaryTerms } from "@/data/glossary";
import { curriculum } from "@/data/curriculum";
import { resources } from "@/data/resources";

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
    id: "qv-64",
    title: "Quantum advantage and the IBM Quantum roadmap",
    authors: "IBM Quantum Team",
    abstract: "IBM Quantum has developed a roadmap for building a million-qubit quantum computer by 2030. Key milestones include the 127-qubit Eagle processor, the 433-qubit Osprey, and the 1121-qubit Condor. Each generation improves gate fidelities and coherence times, paving the way toward fault-tolerant quantum computation.",
    url: "https://research.ibm.com/blog/",
    year: "2023",
    categories: ["HARDWARE", "ROADMAP", "SUPERCONDUCTING"],
  },
];

/* ── Extract highlighted terms from text ── */
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

/* ── Generate quiz questions based on paper content ── */
function generateQuiz(paper: PaperData, selectedTerms: string[]): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  // Paper content question
  const sentences = paper.abstract.split(".").filter((s) => s.trim().length > 20);
  if (sentences.length > 2) {
    const q = sentences[Math.floor(Math.random() * sentences.length)].trim();
    questions.push({
      question: `According to the paper, which of the following is true?`,
      options: [
        q.substring(0, Math.min(q.length, 80)) + "...",
        "This claim is not supported by the paper.",
        "The paper argues the opposite.",
      ],
      correct: 0,
    });
  }

  // Term definitions
  if (selectedTerms.length >= 2) {
    const term1 = selectedTerms[0];
    const term2 = selectedTerms[1];
    const def1 = glossaryTerms.find((t) => t.term === term1);
    const def2 = glossaryTerms.find((t) => t.term === term2);
    if (def1 && def2) {
      questions.push({
        question: `In quantum computing, what is "${term1}"?`,
        options: [
          def1.definition.substring(0, 120) + "...",
          def2.definition.substring(0, 120) + "...",
          "Neither of the above",
        ],
        correct: 0,
      });
    }
  }

  // Year / milestone question
  questions.push({
    question: `When was this paper published?`,
    options: [paper.year, String(parseInt(paper.year) + 2), String(parseInt(paper.year) - 3)],
    correct: 0,
  });

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
  const selectedPaperRef = useRef<PaperData | null>(null);

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
    () => (selectedPaper ? findTerms(selectedPaper.abstract) : []),
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

  const handleSelectPaper = useCallback((paper: PaperData) => {
    setSelectedPaper(paper);
    selectedPaperRef.current = paper;
    setPaperId(paper.id);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setChatMessages([]);
    setActiveTab("explain");
  }, []);

  const handleAnswer = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
  };

  const handleChatSend = async () => {
    if (!chatInput.trim() || !selectedPaperRef.current) return;
    const msg = chatInput.trim();
    const paper = selectedPaperRef.current;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: msg }]);
    setChatLoading(true);

    // Generate a response locally using our data
    setTimeout(() => {
      const termMatch = glossaryTerms.find((t) => msg.toLowerCase().includes(t.term.toLowerCase()));
      let reply = "I can help explain concepts from this paper. Try asking about specific terms or ideas mentioned in the abstract.";
      if (termMatch) {
        reply = `**${termMatch.term}**: ${termMatch.definition}`;
      } else if (msg.toLowerCase().includes("summary") || msg.toLowerCase().includes("explain")) {
        reply = `Here's a plain-English explanation: This paper by **${paper.authors}** discusses ${paper.title.toLowerCase()}. The key idea is that ${paper.abstract.split(". ")[0]}. The implications are significant for quantum computing because it addresses a fundamental challenge in the field.`;
      }
      setChatMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setChatLoading(false);
    }, 800);
  };

  const quizScore = useMemo(() => {
    if (!quizSubmitted) return 0;
    return quiz.reduce((s, q, i) => s + (quizAnswers[i] === q.correct ? 1 : 0), 0);
  }, [quizSubmitted, quizAnswers, quiz]);

  return (
    <div className="space-y-6 pb-8">
      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-violet-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Paper Reader</h1>
          <p className="text-sm text-slate-500">Read and understand quantum papers.</p>
        </div>
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
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Or paste an arXiv URL (e.g., https://arxiv.org/abs/quant-ph/9508027)"
              value={arxivInput}
              onChange={(e) => setArxivInput(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              onClick={() => {
                if (arxivInput.trim()) {
                  const match = arxivInput.match(/arxiv\.org\/abs\/(\d{4}\.\d{4,5}|(?:quant-ph|cond-mat|hep-th|math|cs|gr-qc|nucl-th|physics|astro-ph|stat|eess|q-bio|q-fin)\/\d{7})/);
                  if (match) {
                    fetch(`https://export.arxiv.org/api/query?id_list=${match[1]}`)
                      .then((r) => r.text())
                      .then((xml) => {
                        const title = xml.match(/<title>(.+?)<\/title>/)?.[1] || "Untitled";
                        const abstract = xml.match(/<summary>(.+?)<\/summary>/)?.[1]?.replace(/<[^>]+>/g, "").trim() || "";
                        const authors = xml.match(/<author><name>(.+?)<\/name><\/author>/)?.[1] || "Unknown";
                        handleSelectPaper({
                          id: match[1],
                          title: title.replace(/^arXiv:\d+\.\d+\s*/, ""),
                          authors,
                          abstract,
                          url: arxivInput.trim(),
                          year: new Date().getFullYear().toString(),
                        });
                      })
                      .catch(() => alert("Could not fetch paper. Try a different URL."));
                  } else {
                    alert("Please enter a valid arXiv URL (e.g., https://arxiv.org/abs/quant-ph/9508027)");
                  }
                }
              }}
              className="px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors shrink-0"
            >
              Load
            </button>
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
                {selectedPaper.abstract.split(" ").map((word, i) => {
                  const clean = word.replace(/[^a-zA-Z0-9-]/g, "");
                  if (highlightedTerms.includes(clean)) {
                    const def = glossaryTerms.find((t) => t.term === clean);
                    return (
                      <span
                        key={i}
                        className="inline-block border-b border-dotted border-violet-400 text-violet-700 cursor-help relative group"
                      >
                        {word}{" "}
                        <span className="absolute bottom-full left-0 mb-1 hidden group-hover:block bg-slate-900 text-white text-[10px] p-2 rounded-lg w-48 z-10 font-normal">
                          {def?.definition || clean}
                        </span>
                      </span>
                    );
                  }
                  return <span key={i}>{word} </span>;
                })}
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
                    <p className="text-xs text-slate-400 text-center pt-8">
                      Ask anything about this paper. Try "What's the main result?" or "Explain superposition."
                    </p>
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
                  onSubmit={(e) => { e.preventDefault(); handleChatSend(); }}
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
                    disabled={!chatInput.trim() || chatLoading}
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

            {/* Smart recommendations */}
            <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-xl border border-slate-200 p-4">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Next Paper</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                After this, try reading <strong>Quantum Computing in the NISQ era</strong> by John Preskill — it builds on these concepts and explores near-term quantum devices.
              </p>
              <button
                onClick={() => {
                  const next = PRESET_PAPERS.find((p) => p.id === "preskill-nisq");
                  if (next) handleSelectPaper(next);
                }}
                className="mt-2 text-xs text-violet-600 hover:text-violet-500 font-medium flex items-center gap-1"
              >
                Read now <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
