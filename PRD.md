# Product Requirements Document: Quantum Research Archive

## 1. Product Overview

### 1.1 Purpose
A comprehensive, free, ad-free quantum computing and quantum mechanics research archive that enables a learner to go from absolute beginner to genuine domain expert. Modeled after research.surajgaud.com's structure and UX philosophy.

### 1.2 Target Audience
- Self-directed learners in quantum computing/mechanics
- Undergraduate/graduate students seeking curated resources
- Researchers looking for tooling and reference materials
- Educators building quantum computing curricula

### 1.3 Core Value Proposition
"A complete, structured path from mathematical foundations to advanced quantum computing research — everything curated, verified, and freely accessible."

## 2. Site Architecture

### 2.1 Layout
- **Two-column layout**: Fixed dark sidebar (220px, slate-900) + light content area
- **Header**: Fixed top bar with brand, global search (⌘K), GitHub star link
- **Sidebar**: Navigation links, domain filter chips, collapsible curriculum tree
- **Content**: Cards with tag badges, filter bars, consistent spacing

### 2.2 Tech Stack
- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first theming)
- **Icons**: lucide-react
- **Content**: TypeScript data modules (zero runtime dependencies)
- **Search**: Client-side command palette
- **Deployment**: Static site generation

### 2.3 Page Inventory

| Route | Title | Type | Interactive Elements |
|-------|-------|------|---------------------|
| `/` | Redirect → /overview | Server | — |
| `/overview` | Curriculum Overview | Server + Client child | Expandable modules |
| `/resources` | Resources | Client | FilterBar (category), cards |
| `/community` | Community | Client | FilterBar (role), cards |
| `/articles` | Articles | Client | FilterBar (tag), cards |
| `/roadmap` | Learning Roadmap | Server | Visual timeline |
| `/tools` | Tools & Practice | Client | FilterBar (category), cards |
| `/papers` | Research Papers | Server | Curated card grid |
| `/glossary` | Glossary | Client | FilterBar (category), grid |
| `/newsletters` | Newsletters | Client | FilterBar (tag), cards |

## 3. Content Specifications

### 3.1 Curriculum (20+ Modules, 160+ Lessons)

**Phase 1 — Foundations (6 modules)**
1. Mathematical Foundations I: Linear Algebra & Complex Numbers (10 lessons)
2. Mathematical Foundations II: Probability, Statistics & Group Theory (8 lessons)
3. Classical Mechanics & Electromagnetism (6 lessons)
4. Quantum Mechanics I: Postulates & Wave Mechanics (10 lessons)
5. Quantum Mechanics II: Operators, Spin & Angular Momentum (8 lessons)
6. Quantum Mechanics III: Approximation Methods & Scattering (6 lessons)

**Phase 2 — Core Quantum Computing (5 modules)**
7. Qubits & Quantum Gates (8 lessons)
8. Quantum Circuits & Protocols (8 lessons)
9. Quantum Algorithms I: Core Algorithms (10 lessons)
10. Quantum Algorithms II: Advanced & Variational Algorithms (8 lessons)
11. Quantum Information Theory (8 lessons)

**Phase 3 — Advanced Topics (5 modules)**
12. Quantum Error Correction I: Codes & Stabilizers (8 lessons)
13. Quantum Error Correction II: Fault-Tolerance & Surface Codes (8 lessons)
14. Quantum Complexity Theory (6 lessons)
15. Quantum Cryptography & Communication (8 lessons)
16. Quantum Machine Learning (8 lessons)

**Phase 4 — Physical Implementation (4 modules)**
17. Superconducting Qubits & Circuit QED (8 lessons)
18. Trapped Ions & Photonic Qubits (6 lessons)
19. Topological Quantum Computing (6 lessons)
20. Quantum Hardware Engineering & Noise (6 lessons)

**Phase 5 — Applied & Specialized (3+ modules)**
21. Quantum Simulation & Quantum Chemistry (8 lessons)
22. Quantum Networking & the Quantum Internet (6 lessons)
23. Quantum Sensing & Metrology (6 lessons)
24. Research Frontiers & Open Problems (4 lessons)

Each lesson must include a real, working URL to a relevant video, paper, tutorial, or notes.

### 3.2 Resources (60+)

| Category | Target Count | Verification Required |
|----------|-------------|---------------------|
| Books | 15+ | Amazon/Cambridge/Springer direct links |
| Courses | 12+ | MIT OCW, Coursera, edX, university pages |
| Video Playlists | 15+ | YouTube channel/playlist links |
| Platforms | 8+ | Official platform URLs |
| Research Guides | 5+ | Direct links to guide content |
| Tools & Simulators | 10+ | Official tool pages |

Every resource must be the best-of-breed in its category. No filler.

### 3.3 Articles (30+)

Categories:
- Foundational explainers (6+)
- Research deep-dives (6+)
- Industry perspectives (4+)
- Tutorial-style walkthroughs (6+)
- Historical/pioneer papers (4+)
- Blog posts from leading researchers (4+)

Every article URL must resolve to the actual content (no dead links).

### 3.4 Tools (25+)

| Category | Target Count |
|----------|-------------|
| SDKs (Qiskit, Cirq, Braket, PennyLane, etc.) | 8+ |
| Simulators (QuTiP, Stim, qsim, etc.) | 6+ |
| Languages (Q#, Quipper, etc.) | 4+ |
| Platforms (IBM, Azure, AWS, etc.) | 5+ |
| Specialized (QML, optimization, etc.) | 4+ |

All URLs → official GitHub repos or documentation pages.

### 3.5 Community (25+)

| Role | Target | Examples |
|------|--------|---------|
| Researchers (RES) | 10+ | Shor, Preskill, Aaronson, Kitaev, etc. |
| Educators (EDU) | 5+ | Nielsen, Vazirani, etc. |
| Builders (BUILD) | 6+ | IBM Quantum, Google AI, Rigetti, etc. |
| Institutes (LEAD) | 5+ | MIT CQE, Caltech IQIM, Waterloo IQC, etc. |

URLs must point to official profiles, university pages, or Wikipedia entries.

### 3.6 Glossary (60+)

Categories: Fundamentals, Formalism, Gates & Circuits, Algorithms, Communication, Cryptography, Hardware, Theory, Quantum Mechanics

Each definition should be 2-3 sentences with mathematical notation where appropriate.

### 3.7 Newsletters (12+)

All newsletter URLs must point to actual subscription pages or archives.

## 4. Functional Requirements

### 4.1 Search (⌘K Palette)
- Cross-category search across ALL expanded data
- Keyboard navigation (↑↓ arrows, Enter, Escape)
- Group results by type
- Auto-focus input, body scroll lock
- ⌘K / Ctrl+K global keyboard shortcut

### 4.2 Filter Bars
- Resources: Filter by category (Book, Course, Video Playlist, Platform)
- Community: Filter by role (RES, EDU, BUILD, LEAD)
- Articles: Filter by tag
- Tools: Filter by category (SDK, Simulator, Language, Platform, Framework)
- Glossary: Filter by category
- Newsletters: Filter by tag

### 4.3 Sidebar
- Active link highlighting via usePathname()
- Domain filter chips (Quantum Computing, Quantum Mechanics, Both)
- Collapsible curriculum tree with lesson type indicators
- Social links at bottom

### 4.4 Link Verification
Every single external URL in the codebase must be manually verified:
- No 404s or dead links
- Points to the actual best resource available
- Uses official pages (not aggregators) where possible

## 5. Quality Standards

### 5.1 Code Quality
- 0 TypeScript errors (strict mode)
- 0 ESLint errors
- All components typed with interfaces
- Proper client/server component boundaries

### 5.2 Performance
- All pages statically generated
- Client-side filtering only (no API calls)
- Minimal JS bundle

### 5.3 Accessibility
- Semantic HTML (nav, header, main)
- aria-labels on interactive elements
- Keyboard navigable search
- Proper heading hierarchy

## 6. Future Roadmap
- Mobile responsive sidebar toggle
- Progressive web app (PWA) support
- Dark mode toggle
- Community contribution workflow
- Search analytics
- Study progress tracking
