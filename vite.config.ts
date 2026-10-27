import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // mdx must run before the React plugin so React can transform MDX's JSX output.
    // remark-frontmatter parses the YAML `---` block; remark-mdx-frontmatter exposes it
    // as a named `frontmatter` export we read in src/lib/posts.ts.
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    react(),
  ],
})
