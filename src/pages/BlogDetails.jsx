import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost, selectPostById } from '../redux/slices/blogSlice';

export default function BlogDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector(selectPostById(id));

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🔍</p>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>Post not found</h2>
        <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
          This post may have been deleted or the URL is incorrect.
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

  const handleDelete = () => {
    if (window.confirm('Delete this post permanently?')) {
      dispatch(deletePost(post.id));
      navigate('/');
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm mb-8 transition-colors hover:opacity-75"
        style={{ color: 'var(--accent)' }}
      >
        ← All Posts
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-2.5 py-0.5 rounded-full text-white"
            style={{ backgroundColor: 'var(--accent)', opacity: 0.85 }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4" style={{ color: 'var(--text)' }}>
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>
        <span>{post.author}</span>
        <span>·</span>
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readTime}</span>
        <span>·</span>
        <span>♥ {post.likes} likes</span>
      </div>

      {/* Divider */}
      <hr className="mb-8" style={{ borderColor: 'var(--border)' }} />

      {/* Content */}
      <div
        className="prose max-w-none text-base leading-8 whitespace-pre-wrap mb-10"
        style={{ color: 'var(--text)' }}
      >
        {post.content}
      </div>

      {/* Action bar */}
      <div
        className="flex flex-wrap items-center gap-3 pt-6 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <button
          onClick={() => dispatch(likePost(post.id))}
          className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors hover:bg-red-50 hover:text-red-500 hover:border-red-300"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
        >
          ♥ Like <span className="font-bold">{post.likes}</span>
        </button>

        <div className="flex-1" />

        <Link
          to={`/edit/${post.id}`}
          className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-blue-50"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
        >
          Edit Post
        </Link>

        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-300"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
        >
          Delete Post
        </button>
      </div>
    </main>
  );
}
