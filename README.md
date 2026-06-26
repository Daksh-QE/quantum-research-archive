# Quantum Research Archive

A comprehensive, free, ad-free quantum computing and quantum mechanics research archive. From mathematical foundations to cutting-edge research papers — everything you need to become a quantum expert.

**Live site:** https://quantum-research-archive.vercel.app

## Features

- **24 Modules / 181 Lessons** — Structured curriculum across 5 phases
- **86 Curated Resources** — Books, courses, video playlists, platforms, research guides
- **34 Must-Read Articles** — Foundational papers, deep-dives, industry perspectives
- **27 Quantum Tools** — SDKs, simulators, languages, platforms, frameworks
- **37 Community Members** — Key researchers, educators, builders, and institutes
- **65 Glossary Terms** — Comprehensive quantum terminology
- **⌘K Search** — Cross-category command palette search
- **Filterable Pages** — Category-based filtering on all content pages
- **Dark Sidebar** — Navigation, domain filters, collapsible curriculum tree

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** lucide-react
- **Content:** TypeScript data modules (zero runtime dependencies)
- **Build:** Static site generation
- **Hosting:** Vercel App

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Daksh-QE/quantum-research-archive.git
cd quantum-research-archive

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── app/             # Next.js App Router pages
│   ├── page.tsx     # Landing page / homepage
│   ├── layout.tsx   # Root layout (sidebar + header)
│   ├── overview/    # Curriculum overview
│   ├── resources/   # Resources page
│   ├── community/   # Community page
│   ├── articles/    # Articles page
│   ├── roadmap/     # Learning roadmap timeline
│   ├── tools/       # Tools & practice
│   ├── papers/      # Curated research papers
│   ├── glossary/    # Quantum terminology
│   └── newsletters/ # Newsletters
├── components/      # Reusable React components
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   ├── SearchPalette.tsx
│   ├── FilterBar.tsx
│   ├── TagBadge.tsx
│   ├── CurriculumSection.tsx
│   └── Card components (ResourceCard, ArticleCard, etc.)
└── data/            # Content data files
    ├── types.ts
    ├── curriculum.ts
    ├── resources.ts
    ├── articles.ts
    ├── tools.ts
    ├── community.ts
    ├── glossary.ts
    └── newsletters.ts
```

## Deployment

The site is automatically deployed to GitHub Pages via the `docs/` folder on the `main` branch.

To redeploy:
```bash
npm run build
cp -r out docs
git add docs/
git commit -m "Update static build"
git push
```

## License

n/a for now
