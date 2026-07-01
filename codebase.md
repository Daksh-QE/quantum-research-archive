# Codebase Map — Quantum Research Archive

## Tech Stack
- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS v3
- **Deployment**: Vercel (static export + serverless functions)

## Pages (21 routes)
- `/` — Landing/start page
- `/overview` — Curriculum overview with expandable modules
- `/resources` — Books, courses, videos, platforms (category-filtered)
- `/community` — Key researchers, labs, organizations
- `/articles` — Must-read articles
- `/roadmap` — Learning roadmap timeline
- `/tools` — Tools, simulators, SDKs
- `/papers` — Curated research papers list
- `/glossary` — Quantum computing terminology with search
- `/newsletters` — Quantum newsletters listing
- `/quantum-sandbox` — Interactive quantum circuit simulator with Bloch sphere, histogram, phase disks, Rx/Ry/Rz sliders, share URLs, Qiskit export
- `/research-copilot` — Paper reader with AI chat, quizzes, glossary highlights, arXiv import
- `/jobs`, `/start`, and more

## Data Layer (`src/data/`)
| File | Type | Items |
|------|------|-------|
| `curriculum.ts` | Modules with lesson arrays | 12 modules |
| `resources.ts` | Books, courses, videos, platforms, papers, guides | 8 categories |
| `community.ts` | Researchers, labs, orgs | — |
| `articles.ts` | Must-read articles | — |
| `roadmap.ts` | Timeline milestones | — |
| `tools.ts` | Software tools & SDKs | — |
| `papers.ts` | Research papers | — |
| `glossary.ts` | Term/definition pairs | — |
| `newsletters.ts` | Newsletter entries | — |

## Components (`src/components/`)
Sidebar, Header, TagBadge, ResourceCard, CommunityCard, ArticleCard, ToolCard, GlossaryTerm, NewsletterCard, FilterBar, CurriculumSection

## Key Features
- **⌘K Command Palette** — Cross-category search across all 8 data files with keyboard navigation
- **Quantum Sandbox** — Full circuit simulator with Bloch sphere, phase disks, Rx/Ry/Rz gates, share URLs, Qiskit export
- **Research Copilot** — Paper reader with AI chat (OpenRouter/DeepSeek), quizzes, glossary term highlighting, arXiv paper import, chat message history fix
- **Abuse Prevention** (`src/lib/rate-limit.ts`) — Origin validation, per-IP rate limiting (20/min), daily token budget (200K), concurrent request throttle (4 max), payload validation
- **Resource URLs** — All resource URLs now point to direct content pages (fixed 6 search-result URLs)

## Build & Verify
```bash
npm run build          # Full production build
npm run dev            # Dev server
npx vercel --prod      # Deploy to Vercel
```

## Data Integrity
- Resource URLs verified to point to actual content (not search pages)
- All build checks pass with 0 TypeScript errors

## Recent Agent Updates
- 2026-07-01T05:06:42.710Z — Updated src/app/api/copilot/route.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-07-01T05:06:22.942Z — Updated src/app/api/copilot/route.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-07-01T05:03:56.272Z — Updated src/app/api/copilot/route.ts. Review this entry and expand the relevant sections when the change affects architecture, commands, conventions, tests, or user-facing behavior.
- 2026-07-01T04:55:34.505Z — Updated with fixed resource URLs and abuse prevention module info
