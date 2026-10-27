import { Link, useParams } from 'react-router'
import { getPost } from '../lib/posts'

export default function Post() {
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined

  if (!post) {
    return (
      <section>
        <p>Post not found.</p>
        <Link to="/">← Back to all posts</Link>
      </section>
    )
  }

  const { meta, Component } = post

  return (
    <article className="post">
      <Link to="/" className="post-back">
        ← All posts
      </Link>
      <time dateTime={meta.date} className="post-date">
        {meta.date}
      </time>
      <Component />
    </article>
  )
}
