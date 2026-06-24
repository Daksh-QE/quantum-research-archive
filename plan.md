# Project Plan

Created: 2026-06-24T22:44:40.666Z

This file is maintained by the stratum orchestrator. It logs manager decisions, worker assignments, worker summaries, checks, repairs, and phase notes.

## Manager
- 2026-06-24T22:59:38.270Z — **planned** Quantum Research Archive — Project Architecture
  ## Goal
  Build a quantum computing + mechanics research archive website modeled after research.surajgaud.com/overview.
  
  ## Tech Stack
  - **Framework**: Next.js 14 (App Router) with TypeScript
  - **Styling**: Tailwind CSS
  - **Content**: TypeScript data modules + JSON
  - **Search**: Client-side command palette (⌘K)
  - **Deployment**: Static export-ready
  
  ## Pages
  1. `/overview` — Curriculum overview with module sections
  2. `/resources` — Books, courses, videos, platforms
  3. `/community` — Key researchers, labs, organizations
  4. `/articles` — Must-read articles
  5. `/roadmap` — Learning roadmap
  6. `/tools` — Tools, simulators, SDKs
  7. `/papers` — Research papers
  8. `/glossary` — Quantum computing terminology
  9. `/newsletters` — Newsletters
  
  ## Layout
  - Two-column layout: dark sidebar (190px) + light content area
  - Fixed header with logo, search (⌘K), GitHub star
  - Left sidebar with navigation links, domain filters, collapsible curriculum tree
  - Content cards with colored tag badges (PAPER, VIDEO, TUT, GUIDE, NOTES, etc.)
  - Category filter buttons on each content page
  
  ## Phases
  1. **Phase 1** — Project scaffolding + data layer (Runtime)
  2. **Phase 2** — Core UI components + layout (Frontend)
  3. **Phase 3** — All pages implementation (Frontend)
  4. **Phase 4** — Search + interactivity (Runtime)
  5. **Phase 5** — Testing + review (Test + Review)
- 2026-06-24T22:44:40.672Z — **started** Desktop orchestrator session started
  Selected project folder: /Users/dakshjain/Documents/Quantum Research Archive
- [x] Plan initialized for this project.

## Frontend
- _No entries yet._

## Backend / Runtime
- 2026-06-24T23:00:00.412Z — **assigned** Assigned to Runtime Worker: Phase 1: Scaffold Next.js + Data Layer
  ## Task: Scaffold a Next.js 14 project with TypeScript and Tailwind CSS for a Quantum Computing + Mechanics Research Archive
  
  ### Requirements
  Scaffold a complete Next.js 14 (App Router) project with TypeScript and Tailwind CSS in the project folder: `/Users/dakshjain/Documents/Quantum Research Archive`
  
  ### What to do:
  
  #### 1. Initialize the project
  - Use `npx create-next-app@latest` with TypeScript, Tailwind CSS, App Router, ESLint, and the `src/` directory
  - Project name: `quantum-research-archive` (since the folder already exists, set up the project inside it — if create-next-app creates a subfolder, move contents up or work inside the subfolder. The project root should be `/Users/dakshjain/Documents/Quantum Research Archive`)
  
  #### 2. Configure Tailwind
  - Ensure Tailwind is properly configured with a clean, modern design system
  - Set up a custom color palette that matches the reference site:
    - Dark sidebar/header: slate-900 or similar dark shade
    - Primary background: white (#fff)
    - Accent colors for tag badges (blue-600, emerald-600, amber-600, purple-600, rose-600)
    - Text: slate-900 headings, slate-600 body
  
  #### 3. Create the data model layer
  Create a `src/data/` directory with TypeScript data files:
  
  **a) `src/data/types.ts`** — Core types:
  ```typescript
  export interface Resource {
    id: string;
    title: string;
    description: string;
    url: string;
    tags: string[];  // e.g. "VIDEO", "PAPER", "TUT", "GUIDE", "NOTES", "BOOK", "COURSE"
    category: string;
    author?: string;
    domain?: string; // "Quantum Computing" | "Quantum Mechanics" | "Both"
  }
  
  export interface Lesson {
    id: string;
    title: string;
    type: 'video' | 'notes' | 'tutorial' | 'paper' | 'guide';
    url: string;
  }
  
  export interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
  }
  
  export interface CommunityMember {
    id: string;
    name: string;
    initials: string;
    role: string; // "RES" | "EDU" | "BUILD" | "LEAD"
    description: string;
    url: string;
    tags: string[];
  }
  
  export interface Tool {
    id: string;
    title: string;
    description: string;
    url: string;
    category: string; // "SIMULATOR" | "SDK" | "PLATFORM" | "FRAMEWORK" | "LANGUAGE"
    tags: string[];
  }
  ```
  
  **b) `src/data/resources.ts`** — Curated quantum computing resources:
  - Books (at least 8): "Quantum Computation and Quantum Information" by Nielsen & Chuang, "Principles of Quantum Mechanics" by Shankar, etc.
  - Courses (at least 6): Qiskit Summer School, MIT 8.04, Caltech Quantum Mechanics, etc.
  - Video playlists (at least 6): Quantum Computing playlist by 3Blue1Brown, Qiskit YouTube, etc.
  - Platforms (at least 4): IBM Quantum Experience, Amazon Braket, Google Quantum AI, Microsoft Quantum
  
  Tag them appropriately: BOOK, COURSE, VIDEO, PLATFORM, GUIDE, PAPER, TUT
  
  **c) `src/data/curriculum.ts`** — Learning modules (like the reference with 8-10 modules):
  1. 01 Mathematical Foundations (Linear Algebra, Complex Numbers, Probability)
  2. 02 Quantum Mechanics Fundamentals (Postulates, Wavefunctions, Operators)
  3. 03 Qubits & Quantum Gates (Single qubit, Multi-qubit gates, Bloch sphere)
  4. 04 Quantum Circuits (Circuit model, Teleportation, Superdense coding)
  5. 05 Quantum Algorithms (Deutsch-Jozsa, Grover's, Shor's, QFT)
  6. 06 Quantum Error Correction (Shor code, Steane code, Surface codes)
  7. 07 Quantum Computing Platforms (IBM Qiskit, Google Cirq, Amazon Braket)
  8. 08 Quantum Information Theory (Entropy, Channel capacity, No-cloning)
  9. 09 Advanced Topics (Quantum cryptography, Quantum machine learning, Topological QC)
  
  Each module should have 3-8 lessons with appropriate types.
  
  **d) `src/data/community.ts`** — Key researchers and organizations (at least 12):
  - Peter Shor, John Preskill, Scott Aaronson, David Deutsch, etc.
  - Organizations: IBM Quantum, Google Quantum AI, MIT CQE, etc.
  
  **e) `src/data/articles.ts`** — Must-read articles (at least 10):
  - "Quantum computing for the very curious" by Matuschak & Nielsen
  - Scott Aaronson's blog posts
  - Various quantum computing explainers
  
  **f) `src/data/tools.ts`** — Tools and SDKs (at least 8):
  - Qiskit, Cirq, Braket SDK, Quipper, Q#, Forest SDK, PennyLane, QuTiP
  
  **g) `src/data/glossary.ts`** — Quantum computing terms (at least 25):
  - Qubit, Superposition, Entanglement, Measurement, Bloch sphere, etc.
  
  **h) `src/data/newsletters.ts`** — Newsletters (at least 5):
  - Quantum Weekly, IBM Qiskit Newsletter, Quantum Computing Report, etc.
  
  #### 4. Basic routing structure
  Set up the App Router with these routes:
  - `src/app/layout.tsx` (root layout - will be updated later by frontend worker)
  - `src/app/page.tsx` (redirect to /overview)
  - `src/app/overview/page.tsx`
  - `src/app/resources/page.tsx`
  - `src/app/community/page.tsx`
  - `src/app/articles/page.tsx`
  - `src/app/roadmap/page.tsx`
  - `src/app/tools/page.tsx`
  - `src/app/papers/page.tsx`
  - `src/app/glossary/page.tsx`
  - `src/app/newsletters/page.tsx`
  
  Each page should have a basic placeholder with just "Page Name" heading. The layout.tsx should have the bare minimum HTML structure with Tailwind classes.
  
  #### 5. Install additional dependencies
  - `lucide-react` for icons (used by the reference site)
  
  #### 6. Git init
  After creating everything, initialize git with `git init` and make an initial commit.
  
  ### Important Notes
  - The project root must be `/Users/dakshjain/Documents/Quantum Research Archive`
  - Make sure `next.config.js` has `output: 'export'` for static site generation (or leave it dynamic for dev mode)
  - Ensure the project can run with `npm run dev`
  - The data should be comprehensive and realistic — this is a real research archive
  - Write clean, well-typed TypeScript
  
  ### Expected Output
  Please confirm:
  1. ✅ Next.js project initialized
  2. ✅ Tailwind configured with custom theme
  3. ✅ All data files created with realistic content
  4. ✅ All routes created as placeholders
  5. ✅ Dependencies installed (lucide-react)
  6. ✅ Git initialized
  7. ✅ Project runs successfully with `npm run dev` (no build errors)
  
## Testing
- _No entries yet._

## Review
- _No entries yet._

## Workers
- worker-frontend: Frontend Worker (frontend)
- worker-runtime: Runtime Worker (runtime)
- worker-tests: Test Worker (tester)
- worker-review: Review Worker (reviewer)

## Activity Log
- 2026-06-24T23:00:00.412Z — Backend / Runtime: Assigned to Runtime Worker: Phase 1: Scaffold Next.js + Data Layer (assigned)
- 2026-06-24T22:59:38.270Z — Manager: Quantum Research Archive — Project Architecture (planned)
- 2026-06-24T22:44:40.673Z — Manager: Desktop orchestrator session started (started)
- 2026-06-24T22:44:40.666Z — Plan created.
