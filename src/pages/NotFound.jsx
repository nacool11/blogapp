import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-7xl font-black mb-4" style={{ color: 'var(--accent)' }}>404</p>
      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>Page not found</h2>
      <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="inline-block text-sm font-semibold px-5 py-2.5 rounded-lg text-white"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        ← Back to Home
      </Link>
    </main>
  );
}
