import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deletePost, likePost } from '../redux/slices/blogSlice';

export default function BlogCard({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Delete this post permanently?')) {
      dispatch(deletePost(post.id));
    }
  };

  return (
    <article
      className="rounded-2xl border p-6 flex flex-col gap-4 transition-shadow hover:shadow-lg"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-2.5 py-0.5 rounded-full"
            style={{
              backgroundColor: 'var(--accent)',
              color: '#fff',
              opacity: 0.85,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <Link to={`/post/${post.id}`}>
        <h2
          className="text-xl font-bold leading-snug hover:underline"
          style={{ color: 'var(--text)' }}
        >
          {post.title}
        </h2>
      </Link>

      {/* Excerpt */}
      <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--text-muted)' }}>
        {post.excerpt}
      </p>

      {/* Meta */}
      <div
        className="flex items-center gap-3 text-xs"
        style={{ color: 'var(--text-muted)' }}
      >
        <span>{post.author}</span>
        <span>·</span>
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readTime}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
        {/* Like */}
        <button
          onClick={() => dispatch(likePost(post.id))}
          className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-colors hover:bg-red-50 hover:text-red-500"
          style={{ color: 'var(--text-muted)' }}
        >
          <span>♥</span>
          <span>{post.likes}</span>
        </button>

        <div className="flex-1" />

        {/* View */}
        <Link
          to={`/post/${post.id}`}
          className="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
          style={{ color: 'var(--accent)' }}
        >
          Read →
        </Link>

        {/* Edit */}
        <button
          onClick={() => navigate(`/edit/${post.id}`)}
          className="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors hover:bg-blue-50 hover:text-blue-600"
          style={{ color: 'var(--text-muted)' }}
        >
          Edit
        </button>

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors hover:bg-red-50 hover:text-red-600"
          style={{ color: 'var(--text-muted)' }}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
