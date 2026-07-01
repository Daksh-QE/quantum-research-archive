# Code Index Subsystems

## .stratum
- Files: 1
- Purpose hints: push, py, stratum, workflow

## docs
- Files: 21
- Purpose hints: js, docs, next, static, chunks, manifest, bg, ept, hvn, trd9, y1rj5i, 01yowrouf0wxv, 05jei15v8jtkx, 07xh42bob2, 0cz1d0mv5g, 1d7c2drhm6xm5

## eslint.config.mjs
- Files: 1
- Purpose hints: config, eslint, mjs

## next-env.d.ts
- Files: 1
- Purpose hints: env, next, ts

## next.config.ts
- Files: 1
- Purpose hints: config, next, ts

## postcss.config.mjs
- Files: 1
- Purpose hints: config, mjs, postcss

## src/app
- Files: 20
- Purpose hints: page, tsx, app, src, archive, apply, layout, papers, curated, generate, jobs, matching, community, copilot, quantum, colors
- Key symbols: applyControlledSingle, applyOp, applyRXX, applyRZZ, applySwap, ArchiveLayout, ArticlesPage, baseMatrix, buildTiles, ChallengesPage
- Entrypoints: src/app/(archive)/articles/page.tsx, src/app/(archive)/challenges/page.tsx, src/app/(archive)/community/page.tsx, src/app/(archive)/error-correction/page.tsx, src/app/(archive)/glossary/page.tsx, src/app/(archive)/hubs/page.tsx, src/app/(archive)/jobs/page.tsx, src/app/(archive)/newsletters/page.tsx
- Depends on: src/components, src/data

## src/components
- Files: 12
- Purpose hints: card, tsx, props, components, src, search, tool, article, badge, bar, community, curriculum, filter, glossary, lesson, newsletter
- Key symbols: ArticleCard, CommunityCard, CurriculumSection, FilterBar, GlossaryTerm, Header, matchScore, NewsletterCard, normalize, ResourceCard
- Depends on: src/data
- Used by: src/app

## src/data
- Files: 11
- Purpose hints: ts, community, data, src, glossary, articles, challenges, curriculum, hubs, jobs, newsletters, resources, tools, article, challenge, hub
- Key symbols: Article, articles, Challenge, challenges, CommunityHub, communityHubs, CommunityMember, communityMembers, curriculum, GlossaryTerm
- Used by: src/app, src/components
