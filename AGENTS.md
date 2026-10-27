# AGENTS.md

Source-of-truth instructions for AI coding agents working in this repo. Tool-specific
files (e.g. `CLAUDE.md`) point here instead of duplicating content.

## What this is

A personal blog, built from scratch with Vite + React + TypeScript + MDX. Content is
authored in MDX so posts can mix Markdown prose with React components.

## Stack

| Concern     | Choice                                           | Version (as installed) |
| ----------- | ------------------------------------------------ | ---------------------- |
| Build/dev   | Vite                                             | 7.3.x                  |
| UI          | React + React DOM                                | 19.2.x                 |
| Language    | TypeScript                                       | 5.9.x                  |
| Content     | MDX via `@mdx-js/rollup`                          | 3.1.x                  |
| Frontmatter | `remark-frontmatter` + `remark-mdx-frontmatter`  | 5.x / 6.x              |
| Routing     | `react-router`                                   | 8.5.x                  |
| Lint        | ESLint (flat config)                             | 9.39.x                 |
| Node types  | `@types/node`                                    | 24.x                   |

Exact versions live in `package.json` / `package-lock.json` — treat those as authoritative.

## Commands

```bash
npm run dev      # Vite dev server at http://localhost:5173/
npm run build    # tsc -b (typecheck) then vite build  → dist/
npm run lint     # eslint over the repo
npm run preview  # serve the production build locally
```

There is no test runner wired up yet. Don't invent `npm test`.

## Critical setup facts — do NOT "fix" these

These are deliberate and already working. Changing them will break the build.

1. **MDX plugin ordering.** In `vite.config.ts`, `mdx()` MUST come before `react()`:
   ```ts
   plugins: [mdx(), react()]
   ```
   MDX emits JSX; the React plugin has to run after to transform it. Reversing the
   order breaks `.mdx` compilation.

2. **`create-vite` was pinned to `8.3.0`.** `create-vite@latest` (9.x) is a broken npm
   publish that ships no templates. The scaffold used `create-vite@8.3.0`. This only
   matters if someone re-scaffolds; don't "upgrade" the scaffolder expecting it to work.

3. **`~/.npm/_cacache` has root-owned files** from an old npm bug, so `npm cache clean`
   fails on this machine. Not blocking. Permanent fix (run manually, not via an agent):
   ```bash
   sudo chown -R 501:20 ~/.npm
   ```

## Project layout

```
index.html              # Vite entry HTML
vite.config.ts          # mdx() (w/ frontmatter remark plugins) before react()
eslint.config.js        # ESLint 9 flat config
tsconfig*.json          # app / node / root TS configs
public/                 # static assets served at /
src/
  main.tsx              # React entry — createBrowserRouter + RouterProvider
  index.css             # global styles (light/dark, blog layout)
  components/
    Layout.tsx          # shared chrome (header/nav, <Outlet/>, footer)
  pages/
    PostList.tsx        # "/" — index of all posts
    Post.tsx            # "/posts/:slug" — single post
  lib/
    posts.ts            # post discovery via import.meta.glob + metadata
  posts/
    *.mdx               # the posts themselves (YAML frontmatter + MDX body)
```

## Routing & post discovery

- Routes are defined in `src/main.tsx` with `createBrowserRouter`:
  `/` → `PostList`, `/posts/:slug` → `Post`, both nested under `Layout`.
- `src/lib/posts.ts` discovers posts with `import.meta.glob('../posts/*.mdx')` — no
  manual registry. Add a post by dropping a new `.mdx` file in `src/posts/`.
- Slug = the `.mdx` filename (without extension). `posts` is sorted newest-first by date.
- Post components are imported eagerly (not code-split): reading frontmatter already
  pulls each module into the graph, so there's nothing to split away. Revisit only if
  the post count grows large enough to matter.

## Authoring a post

Create `src/posts/<slug>.mdx` with YAML frontmatter, then MDX body:

```mdx
---
title: My Post Title
date: "2026-10-27"      # quote it so YAML keeps it a string
description: One-line summary shown in the index.
---

# My Post Title

Prose, and <AnyReactComponent /> too.
```

- `title`, `date` required; `description` optional.
- Use `{/* ... */}` for comments inside MDX (HTML `<!-- -->` is invalid in MDX).

## Conventions

- **TypeScript everywhere.** `.tsx` for components, `.ts` for logic, `.mdx` for posts.
- **ESLint flat config** (`eslint.config.js`). Keep `npm run lint` clean; don't disable
  rules inline without a reason in a comment.
- **ES modules only** (`"type": "module"`). Use `import`/`export`, not `require`.
- **Match surrounding style.** 2-space indent, no semicolons are not enforced — follow
  whatever the nearest existing file does.
- Prefer small, composable components. Posts are MDX; shared UI is `.tsx`.

## Working agreements for agents

- **Validate the plan before installing packages or writing feature code.** The owner
  wants to approve design decisions (routing lib, styling approach, etc.) first.
- Don't redo the scaffold, the MDX wiring, or `npm install` — they're done and verified.
- When adding a dependency, say why and what it costs before running `npm install`.
- Keep this file and `package.json` in sync when the stack changes.
