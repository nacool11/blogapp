import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addPost } from '../redux/slices/blogSlice';
import BlogForm from '../components/BlogForm';

export default function CreateBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const newPost = {
      ...values,
      id: Date.now().toString(),
      likes: 0,
    };
    dispatch(addPost(newPost));
    navigate('/');
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm mb-8 transition-colors hover:opacity-75"
        style={{ color: 'var(--accent)' }}
      >
        ← Back to Home
      </Link>

      <div
        className="rounded-2xl border p-8"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
          Write a New Post
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          Share your thoughts with the world.
        </p>

        <BlogForm onSubmit={handleSubmit} submitLabel="Publish Post" />
      </div>
    </main>
  );
}
