import { Link, Outlet } from 'react-router'

export default function Layout() {
  return (
    <div className="site">
      <header className="site-header">
        <Link to="/" className="site-title">
          oleh's blog
        </Link>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <small>Built with Vite + React + MDX</small>
      </footer>
    </div>
  )
}
