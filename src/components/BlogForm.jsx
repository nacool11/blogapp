import { useState } from 'react';

const EMPTY = {
  title: '',
  excerpt: '',
  content: '',
  author: '',
  date: new Date().toISOString().slice(0, 10),
  tags: '',
  readTime: '',
};

export default function BlogForm({ initialValues = {}, onSubmit, submitLabel = 'Publish Post' }) {
  const [form, setForm] = useState({ ...EMPTY, ...initialValues });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.excerpt.trim()) e.excerpt = 'Excerpt is required';
    if (!form.content.trim()) e.content = 'Content is required';
    if (!form.author.trim()) e.author = 'Author is required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const tagsArray = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    onSubmit({ ...form, tags: tagsArray });
  };

  const fieldClass = (name) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 ${
      errors[name] ? 'border-red-400 focus:ring-red-200' : 'focus:ring-[var(--accent)]'
    }`;

  const fieldStyle = {
    backgroundColor: 'var(--bg)',
    borderColor: 'var(--border)',
    color: 'var(--text)',
  };

  const label = (text, required) => (
    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
      {text} {required && <span className="text-red-500">*</span>}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Title */}
      <div>
        {label('Title', true)}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Why I love React"
          className={fieldClass('title')}
          style={fieldStyle}
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
      </div>

      {/* Excerpt */}
      <div>
        {label('Excerpt', true)}
        <textarea
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
          placeholder="Short summary shown on the card..."
          rows={2}
          className={fieldClass('excerpt')}
          style={fieldStyle}
        />
        {errors.excerpt && <p className="mt-1 text-xs text-red-500">{errors.excerpt}</p>}
      </div>

      {/* Content */}
      <div>
        {label('Content', true)}
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Write your full article here..."
          rows={10}
          className={fieldClass('content')}
          style={fieldStyle}
        />
        {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content}</p>}
      </div>

      {/* Author + Date row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          {label('Author', true)}
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Your name"
            className={fieldClass('author')}
            style={fieldStyle}
          />
          {errors.author && <p className="mt-1 text-xs text-red-500">{errors.author}</p>}
        </div>
        <div>
          {label('Date')}
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={fieldClass('date')}
            style={fieldStyle}
          />
        </div>
      </div>

      {/* Tags + ReadTime row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          {label('Tags')}
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="React, Redux, JavaScript"
            className={fieldClass('tags')}
            style={fieldStyle}
          />
          <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
            Comma-separated
          </p>
        </div>
        <div>
          {label('Read Time')}
          <input
            name="readTime"
            value={form.readTime}
            onChange={handleChange}
            placeholder="5 min read"
            className={fieldClass('readTime')}
            style={fieldStyle}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors"
          style={{ backgroundColor: 'var(--accent)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
