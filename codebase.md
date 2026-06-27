# Codebase Map

## Purpose
Quantum Computing + Mechanics Research Archive. Research Copilot at `src/app/(archive)/research-copilot/page.tsx`.

## Recent Fixes (Research Copilot)
### 6 issues fixed in `src/app/(archive)/research-copilot/page.tsx` + `src/data/resources.ts`:

1. **arXiv regex** — Now matches both new-style IDs (`1801.00862`) and classic arXiv IDs (`quant-ph/9508027`, `cond-mat/...`, etc.) via pattern: `\d{4}\.\d{4,5}|(?:quant-ph|cond-mat|hep-th|...)/\d{7}`

2. **Chat closure bug** — Added `selectedPaperRef` (useRef) that's kept in sync with `selectedPaper`. setTimeout now reads `selectedPaperRef.current` instead of capturing stale `selectedPaper` state, fixing second-message chat drop.

3. **Branding update** — "Research Copilot" → "Paper Reader", "AI Explanation" → "Summary", "Ask the Copilot" → "Ask a Question", Bot icon → MessageSquareText, hero text → "Read and understand quantum papers."

4. **Non-papers removed** — Removed "PAPER" tag from 5 non-paper resources in resources.ts: book-wilde (textbook), book-desurvire (textbook), course-coursera-quantum-cryptography (course), course-grovers-algorithm-course (course), video-institute-qc (lecture series)

5. **Markdown rendering** — Added `renderMarkdown()` function that converts `**bold**` → `<strong>` and `*italic*` → `<em>` in chat messages

6. **Useful Summary** — Replaced generic AI Explanation with proper 3-part breakdown: "What this paper achieves", "The key technique", "Why it matters" — content dynamically generated from paper title, authors, year, abstract, and categories

## Recent Agent Updates
- 2026-06-27T22:52:51.177Z — Updated src/data/glossary.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:52:31.359Z — Updated src/data/community.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:52:00.937Z — Updated src/data/glossary.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:51:21.730Z — Updated src/app/api/jobs/route.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:50:49.801Z — Updated src/data/community.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:50:37.777Z — Updated src/data/tools.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:50:09.428Z — Updated src/app/(archive)/papers/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:49:50.957Z — Updated src/data/challenges.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:49:25.527Z — Fixed all 6 Research Copilot critical issues
