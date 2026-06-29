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
- 2026-06-29T22:37:17.355Z — Updated src/app/layout.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:24:18.885Z — Updated src/app/(archive)/quantum-sandbox/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:24:07.833Z — Updated src/app/(archive)/quantum-sandbox/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:24:04.538Z — Updated src/app/(archive)/quantum-sandbox/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:23:49.962Z — Updated src/app/(archive)/quantum-sandbox/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:23:33.550Z — Updated src/app/(archive)/quantum-sandbox/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:23:18.781Z — Updated src/app/(archive)/error-correction/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:23:13.434Z — Updated src/app/(archive)/quantum-sandbox/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:23:09.893Z — Updated src/app/(archive)/error-correction/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:23:06.311Z — Updated src/app/(archive)/quantum-sandbox/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:23:04.719Z — Updated src/app/(archive)/error-correction/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:22:55.188Z — Updated src/app/(archive)/error-correction/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:22:44.607Z — Updated src/app/(archive)/error-correction/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:22:41.124Z — Updated src/app/(archive)/error-correction/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:19:03.051Z — Updated src/app/(archive)/error-correction/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:17:37.620Z — Updated src/app/(archive)/quantum-sandbox/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:04:38.309Z — Updated src/app/(archive)/error-correction/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:04:18.388Z — Updated src/app/(archive)/error-correction/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:03:57.840Z — Updated src/app/(archive)/quantum-sandbox/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:03:40.166Z — Updated src/data/curriculum.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:03:12.273Z — Updated src/app/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T01:03:05.916Z — Updated src/app/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:50:44.910Z — Updated src/app/(archive)/error-correction/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:50:41.264Z — Updated src/app/(archive)/error-correction/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:50:35.305Z — Updated src/app/(archive)/error-correction/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:50:30.105Z — Updated src/app/(archive)/error-correction/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:50:26.243Z — Updated src/app/(archive)/quantum-sandbox/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:50:19.048Z — Updated src/app/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:50:12.407Z — Updated src/app/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:50:07.315Z — Updated src/data/curriculum.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:17:45.148Z — Updated src/app/(archive)/glossary/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:17:39.612Z — Updated src/app/(archive)/jobs/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:17:27.996Z — Added src/app/(archive)/start/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:17:20.070Z — Updated src/app/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:16:48.470Z — Updated src/components/Sidebar.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:08:33.008Z — Updated src/components/Sidebar.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:04:24.855Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:04:14.669Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:04:11.202Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:04:00.426Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:03:42.697Z — Updated src/app/(archive)/error-correction/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:03:34.064Z — Updated src/app/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:03:29.881Z — Updated src/app/api/jobs/route.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:03:26.262Z — Updated src/data/communityHubs.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:03:21.867Z — Updated src/components/Header.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:03:18.916Z — Updated src/components/Sidebar.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:02:51.136Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:02:33.740Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:01:50.856Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:01:43.961Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:00:57.910Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-28T00:00:48.218Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T23:20:55.338Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T23:20:43.902Z — Updated src/app/(archive)/quantum-sandbox/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T23:20:38.258Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T23:20:25.156Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T23:20:23.553Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T23:20:17.597Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T23:20:12.512Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T23:20:10.429Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T23:20:05.725Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T23:20:00.270Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T23:19:54.019Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T23:19:52.645Z — Updated src/app/(archive)/qec-dashboard/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T23:19:48.123Z — Updated src/app/(archive)/research-copilot/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:52:51.177Z — Updated src/data/glossary.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:52:31.359Z — Updated src/data/community.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:52:00.937Z — Updated src/data/glossary.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:51:21.730Z — Updated src/app/api/jobs/route.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:50:49.801Z — Updated src/data/community.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:50:37.777Z — Updated src/data/tools.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:50:09.428Z — Updated src/app/(archive)/papers/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:49:50.957Z — Updated src/data/challenges.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-27T22:49:25.527Z — Fixed all 6 Research Copilot critical issues
