import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost, selectPostById } from '../redux/slices/blogSlice';
import BlogForm from '../components/BlogForm';

export default function EditBlog() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector(selectPostById(id));

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🔍</p>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>Post not found</h2>
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

  const handleSubmit = (values) => {
    dispatch(updatePost({ ...post, ...values }));
    navigate(`/post/${post.id}`);
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to={`/post/${post.id}`}
        className="inline-flex items-center gap-1 text-sm mb-8 transition-colors hover:opacity-75"
        style={{ color: 'var(--accent)' }}
      >
        ← Back to Post
      </Link>

      <div
        className="rounded-2xl border p-8"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
          Edit Post
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          Update and save your changes.
        </p>

        <BlogForm
          initialValues={{
            ...post,
            tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags,
          }}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </div>
    </main>
  );
}
