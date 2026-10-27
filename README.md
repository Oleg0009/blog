# blog

A personal blog built with **Vite + React + TypeScript + MDX**. Posts are authored in
MDX so prose and React components can live side by side.

## Stack

- [Vite](https://vite.dev/) 7 — dev server & build
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) 5.9
- [MDX](https://mdxjs.com/) 3 via [`@mdx-js/rollup`](https://mdxjs.com/packages/rollup/)
- [ESLint](https://eslint.org/) 9 (flat config)

## Getting started

```bash
npm install      # once
npm run dev      # http://localhost:5173/
```

## Scripts

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR            |
| `npm run build`   | Typecheck (`tsc -b`) then build to `dist/`    |
| `npm run lint`    | Run ESLint over the project                   |
| `npm run preview` | Serve the production build locally            |

## MDX

MDX is wired in `vite.config.ts`. The `mdx()` plugin **must** run before `react()`:

```ts
// vite.config.ts
plugins: [mdx(), react()]
```

MDX emits JSX that the React plugin then transforms — reversing the order breaks `.mdx`
compilation.

## For AI coding agents

Project instructions for AI assistants live in [`AGENTS.md`](./AGENTS.md)
(Claude Code reads [`CLAUDE.md`](./CLAUDE.md), which points there).

## Writing posts

Drop a `.mdx` file in `src/posts/` with YAML frontmatter:

```mdx
---
title: My Post Title
date: "2026-10-27"
description: One-line summary for the index.
---

# My Post Title

Prose and <Components /> here.
```

The slug is the filename. Posts are auto-discovered (no registry) and listed
newest-first at `/`, with each post at `/posts/<slug>`.

## Status

Routing + posts index + MDX rendering are working. Next up: real styling and more
content.
