# CLAUDE.md

Project guidance for Claude Code. The full, tool-neutral instructions live in
@AGENTS.md — read that first. This file holds only Claude-Code-specific notes.

## TL;DR

Personal blog: **Vite 7 + React 19 + TypeScript 5.9 + MDX 3**. See @AGENTS.md for the
stack table, commands, layout, and the critical setup facts (especially the
`mdx()`-before-`react()` ordering — do not reorder it).

## Before you build

The owner wants to **validate the plan/design before any code is written or packages are
installed.** Propose the approach, get a thumbs-up, then implement. This applies to new
dependencies, routing, and styling decisions.

## Commands Claude can run freely

```bash
npm run dev      # dev server (http://localhost:5173/)
npm run build    # typecheck + production build
npm run lint     # eslint
npm run preview  # preview the build
```

Permissions for these are pre-approved in `.claude/settings.json`.

## Guardrails

- Already done — never redo: Vite scaffold, `npm install`, MDX wiring in `vite.config.ts`.
- No test runner exists yet; don't assume `npm test`.
- After changing the stack, update @AGENTS.md and `package.json` together.
