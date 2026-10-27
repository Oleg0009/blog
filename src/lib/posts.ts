import type { ComponentType } from 'react'

/** Frontmatter authored at the top of each post's `.mdx` file. */
export interface PostMeta {
  title: string
  date: string
  description?: string
}

/** A post's metadata plus the slug derived from its filename. */
export interface PostListing extends PostMeta {
  slug: string
}

/** A resolved post: its listing metadata and the rendered MDX component. */
export interface Post {
  meta: PostListing
  Component: ComponentType
}

// Import every post's frontmatter and default-export component. Both are eager: reading
// frontmatter already pulls each module into the graph, so there's nothing to code-split
// away — keeping it eager avoids a static+dynamic import conflict and keeps lookups sync.
const metaModules = import.meta.glob('../posts/*.mdx', {
  eager: true,
  import: 'frontmatter',
}) as Record<string, PostMeta>

const componentModules = import.meta.glob('../posts/*.mdx', {
  eager: true,
  import: 'default',
}) as Record<string, ComponentType>

function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace(/\.mdx$/, '')
}

// YAML may coerce an unquoted `date:` into a Date; normalize everything to YYYY-MM-DD.
function toDateString(value: unknown): string {
  if (typeof value === 'string') return value
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return ''
}

const bySlug = new Map<string, Post>()
for (const [path, meta] of Object.entries(metaModules)) {
  const slug = slugFromPath(path)
  const Component = componentModules[path]
  if (!Component) continue
  bySlug.set(slug, {
    meta: { ...meta, date: toDateString(meta.date), slug },
    Component,
  })
}

/** All posts, newest first. */
export const posts: PostListing[] = [...bySlug.values()]
  .map((p) => p.meta)
  .sort((a, b) => (a.date < b.date ? 1 : -1))

/** Returns the post for a slug, or undefined if none exists. */
export function getPost(slug: string): Post | undefined {
  return bySlug.get(slug)
}
