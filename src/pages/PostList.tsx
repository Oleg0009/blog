import { Link } from 'react-router'
import { posts } from '../lib/posts'

export default function PostList() {
  return (
    <section>
      <h1>Posts</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`} className="post-list-title">
                {post.title}
              </Link>
              <time dateTime={post.date} className="post-list-date">
                {post.date}
              </time>
              {post.description && (
                <p className="post-list-desc">{post.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
