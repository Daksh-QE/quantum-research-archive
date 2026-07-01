/*
 * Local, LLM-free paper answerer. Produces genuinely useful, paper-grounded
 * answers by combining (a) glossary definitions for any recognised term, (b)
 * intent detection (summary / result / how / why), and (c) a retrieval step
 * that returns the abstract sentence(s) most relevant to the question.
 *
 * Used both server-side (as the /api/copilot fallback when no model key is
 * configured) and client-side (when the API is unreachable), so the chat always
 * responds with something on-topic instead of a canned line.
 */
export interface AnswerablePaper {
  title: string;
  authors?: string;
  abstract: string;
  categories?: string[];
}
interface GlossaryTerm { term: string; definition: string }

const STOP = new Set([
  "the", "a", "an", "of", "to", "in", "is", "it", "and", "or", "for", "on", "with", "how",
  "does", "do", "what", "why", "this", "that", "these", "those", "paper", "about", "can",
  "you", "explain", "tell", "me", "which", "are", "was", "were", "be", "as", "by", "at",
  "from", "into", "its", "it's", "their", "there", "here", "when", "where", "who", "whom",
  "i", "we", "they", "he", "she", "please", "would", "could", "should", "will", "than",
]);

function sentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15);
}

function keywords(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

/** Rank abstract sentences by keyword overlap with the question. */
function mostRelevantSentences(question: string, abstract: string, n = 2): string[] {
  const kws = keywords(question);
  const sents = sentences(abstract);
  if (kws.length === 0 || sents.length === 0) return sents.slice(0, n);
  const scored = sents.map((s) => {
    const low = s.toLowerCase();
    let score = 0;
    for (const k of kws) if (low.includes(k)) score += 1;
    return { s, score };
  });
  const hits = scored.filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
  if (hits.length === 0) return [];
  return hits.slice(0, n).map((x) => x.s);
}

export function answerFromPaper(
  question: string,
  paper: AnswerablePaper,
  glossary: GlossaryTerm[]
): string {
  const q = question.toLowerCase().trim();
  const abstract = paper.abstract || "";
  const sents = sentences(abstract);
  const cats = (paper.categories || []).map((c) => c.toLowerCase());

  // 1) Glossary terms mentioned in the question (longest first, up to 2).
  const matched = glossary
    .filter((t) => q.includes(t.term.toLowerCase()))
    .sort((a, b) => b.term.length - a.term.length)
    .slice(0, 2);
  if (matched.length > 0) {
    const parts = matched.map((t) => {
      const inPaper = abstract.toLowerCase().includes(t.term.toLowerCase());
      return `**${t.term}:** ${t.definition}${inPaper ? ` It appears directly in this paper.` : ""}`;
    });
    return parts.join("\n\n");
  }

  // 2) Intent handlers.
  const has = (...ws: string[]) => ws.some((w) => q.includes(w));

  if (has("summar", "overview", "tldr", "tl;dr", "gist", "about", "what is this", "what's this")) {
    if (sents.length) return `Here's the gist of "${paper.title}": ${sents.slice(0, 3).join(" ")}`;
  }

  if (has("main result", "key result", "the result", "finding", "achiev", "contribut", "conclusion", "prove", "proves", "demonstrat", "show that")) {
    if (sents.length) return `The core result of "${paper.title}"${paper.authors ? ` (${paper.authors})` : ""}: ${sents.slice(0, 2).join(" ")}`;
  }

  if (has("how", "work", "method", "technique", "approach", "algorithm", "implement", "procedure", "mechanism")) {
    const rel = mostRelevantSentences(question, abstract, 2);
    if (rel.length) return `In short, the paper's approach — ${rel.join(" ")}`;
    if (sents.length) return `The paper's method, from its abstract: ${sents.slice(0, 2).join(" ")}`;
  }

  if (has("why", "matter", "important", "significan", "impact", "useful", "so what", "point of")) {
    let why = "";
    if (cats.includes("cryptography")) why = "It bears on the security of modern cryptography — quantum methods can break or protect it.";
    else if (cats.includes("qec") || cats.includes("surface code")) why = "It's a step toward fault-tolerant quantum computers, which need error correction to run long algorithms.";
    else if (cats.includes("nisq")) why = "It frames what today's noisy, pre-error-correction devices can and can't usefully do.";
    else if (cats.includes("pioneer") || cats.includes("foundations")) why = "It laid conceptual groundwork the whole field still builds on.";
    else why = "It expands what quantum computers are known to be able to do.";
    const rel = mostRelevantSentences(question, abstract, 1);
    return `${why}${rel.length ? ` From the paper: ${rel[0]}` : ""}`;
  }

  if (has("prerequisite", "background", "need to know", "before reading", "what should i know")) {
    return `To follow "${paper.title}", it helps to know the concepts named in the abstract. Open the Prerequisites tab for curriculum lessons matched to this paper.`;
  }

  // 3) Retrieval fallback: answer with the most relevant abstract sentence(s).
  const rel = mostRelevantSentences(question, abstract, 2);
  if (rel.length) return `From the paper: ${rel.join(" ")}`;

  // 4) Nothing matched — offer a grounded prompt.
  const firstSentence = sents[0] || paper.title;
  return `That isn't spelled out in the abstract, which focuses on: ${firstSentence} Try asking about a specific term, "summarize this," "what's the main result?", or "how does it work?"`;
}
