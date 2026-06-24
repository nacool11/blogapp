import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllPosts } from '../redux/slices/blogSlice';
import BlogCard from '../components/BlogCard';

export default function Home() {
  const posts = useSelector(selectAllPosts);
  const [search, setSearch] = useState('');

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--text)' }}>
          Dev<span style={{ color: 'var(--accent)' }}>Blog</span>
        </h1>
        <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
          Thoughts on React, Redux, architecture, and modern web development.
        </p>

        {/* Search */}
        <div className="mt-6 max-w-md mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts by title or tag..."
            className="w-full rounded-full border px-5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--text)',
            }}
          />
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}{search ? ` matching "${search}"` : ''}
        </p>
        <Link
          to="/create"
          className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-colors"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          + New Post
        </Link>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">✍️</p>
          <p className="text-lg font-semibold" style={{ color: 'var(--text)' }}>No posts found</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {search ? 'Try a different search term.' : 'Be the first to write something!'}
          </p>
          {!search && (
            <Link
              to="/create"
              className="inline-block mt-4 text-sm font-semibold px-5 py-2.5 rounded-lg text-white"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Write your first post
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {filtered.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
