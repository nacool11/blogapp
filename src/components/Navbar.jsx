import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors hover:text-[var(--accent)] ${
        pathname === to ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Brand */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight"
          style={{ color: 'var(--accent)' }}
        >
          Dev<span style={{ color: 'var(--text)' }}>Blog</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          {navLink('/', 'Home')}
          {navLink('/create', 'Write')}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border transition-colors"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--text-muted)',
            backgroundColor: 'var(--bg)',
          }}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <>
              <span>🌙</span>
              <span className="hidden sm:inline">Dark</span>
            </>
          ) : (
            <>
              <span>☀️</span>
              <span className="hidden sm:inline">Light</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
}
