# Codebase Map

Created: 2026-06-24T22:44:40.666Z
Updated: 2026-06-25T03:15:00.000Z

## Purpose
Quantum Computing + Mechanics Research Archive — a comprehensive, free, ad-free research archive to take a learner from absolute beginner to domain expert. Modeled after research.surajgaud.com/overview.

## Architecture
- **Framework**: Next.js 16.2.9 (App Router) + TypeScript strict mode
- **Styling**: Tailwind CSS v4 (CSS-first via `@import "tailwindcss"`, no tailwind.config.js)
- **Content**: TypeScript data modules in `src/data/` — massively expanded
- **Components**: Reusable UI components in `src/components/`
- **Layout**: Fixed sidebar (w-56, slate-900) + fixed header (h-14) + scrollable main content area (ml-56 pt-14)
- **Icons**: lucide-react v1.21

## Expanded Data Layer (src/data/)

| File | Entries | Key Categories |
|------|---------|----------------|
| `curriculum.ts` | **24 modules, 181 lessons** | 5 phases: Foundations (6), Core QC (5), Advanced (5), Hardware (4), Applied (4) |
| `resources.ts` | **87 items** | Book (24), Course (18), Video Playlist (22), Platform (13), Research Guide (10) |
| `articles.ts` | **34 items** | Foundational explainers, research deep-dives, industry perspectives, blog posts |
| `tools.ts` | **27 items** | SDK (9), Framework (5), Language (5), Simulator (8) |
| `community.ts` | **37 members** | Researcher (16), Educator (6), Builder (8), Institute/Lead (7) |
| `glossary.ts` | **65 terms** | Fundamentals, Formalism, Gates & Circuits, Algorithms, Communication, Cryptography, Hardware, Theory |
| `newsletters.ts` | **18 items** | Daily through Quarterly frequency |

### Curriculum Structure (PRD-aligned)
- **Phase 1 — Foundations** (6 modules): Math I & II, Classical Physics, QM I/II/III
- **Phase 2 — Core QC** (5 modules): Qubits/Gates, Circuits, Algorithms I & II, Quantum Information Theory
- **Phase 3 — Advanced** (5 modules): Error Correction I & II, Complexity Theory, Cryptography, QML
- **Phase 4 — Hardware** (4 modules): Superconducting Qubits, Trapped Ions/Photonic, Topological QC, Hardware Engineering
- **Phase 5 — Applied** (4 modules): Quantum Chemistry, Quantum Networking, Quantum Sensing, Research Frontiers

### Key Component Changes from Previous Review
- Overview page now dynamically computes lesson count (`totalLessons = curriculum.reduce(...)`)
- SearchPalette input now has `aria-label="Search the archive"`
- Stats show "85+" resources and "100% Free" (improved from previous "Curated"/"Free")
- SearchPalette handles 470+ searchable items via useMemo

## Build Status
- `npm run build` — passes with 0 TypeScript errors, all 11 routes static
- `npm run lint` — passes with 0 warnings/errors
- Build time ~1.1s compile + ~1.1s TypeScript check

## Known Issues
1. **3 placeholder YouTube URLs** in resources.ts: video-ryan-odonnell-qm, video-john-watrous-qis, video-microsoft-quantum use repeated-pattern fake playlist IDs that need real URLs
2. **Duplicate tool entries**: PennyLane appears as both SDK and FRAMEWORK; QuTiP appears as both FRAMEWORK and SIMULATOR — both point to same URLs with slightly different descriptions
3. **Duplicate community initials**: "Alain Aspect" and "Abraham Asfaw" both have initials "AA" (cosmetic only, ids are unique)
4. **Unnecessary "+" in lessons stat**: Shows "181+" despite being exact count
5. **Hardcoded resource count**: "85+" stat should ideally be computed from resources.length
6. **Sidebar curriculum tree**: With 24 modules the sidebar is content-heavy; only one module expandable at a time mitigates this
7. **Domain filter chips**: Still local-only state, not wired to pages
8. **No mobile sidebar toggle**: Fixed sidebar overlaps on small viewports

## Recent Agent Updates
- 2026-06-26T10:35:53.976Z — Updated .gitignore. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-26T10:30:22.205Z — Updated next.config.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-25T14:06:00.883Z — Updated src/app/glossary/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-25T14:05:43.997Z — Updated src/app/layout.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-25T13:56:41.774Z — Updated src/app/overview/page.tsx. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-25T13:56:36.367Z — Updated src/data/resources.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-25T13:56:11.652Z — Updated src/data/curriculum.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-06-25T13:54:45.498Z — Updated for expanded site review: added massive data counts, curriculum phase structure, known issues discovered during review, and build/lint status.
