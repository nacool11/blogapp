import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [
    {
      id: '1',
      title: 'Getting Started with React and Redux Toolkit',
      excerpt: 'Learn how Redux Toolkit simplifies state management in React applications by eliminating boilerplate code.',
      content: `Redux Toolkit (RTK) is the official, opinionated, batteries-included toolset for efficient Redux development. It simplifies store setup, reduces boilerplate, and follows best practices out of the box.\n\nKey benefits include:\n- createSlice: Combines actions and reducers in one place\n- Immer integration: Write "mutating" logic that stays immutable under the hood\n- createAsyncThunk: Handles async operations with built-in loading/error states\n\nGetting started is straightforward — install @reduxjs/toolkit and react-redux, create a slice, add it to your store, and wrap your app with Provider. That's it!`,
      author: 'Nakul Panwar',
      date: '2024-01-15',
      tags: ['React', 'Redux', 'JavaScript'],
      likes: 12,
      readTime: '5 min read',
    },
    {
      id: '2',
      title: 'Tailwind CSS: Utility-First Design in Practice',
      excerpt: 'Discover how utility-first CSS with Tailwind accelerates UI development while keeping styles maintainable.',
      content: `Tailwind CSS takes a different approach to styling. Instead of writing custom CSS classes, you compose designs directly in your HTML using utility classes.\n\nThis approach offers several advantages:\n- No more context switching between HTML and CSS files\n- Consistent design system via configuration\n- Tiny production bundles (purges unused styles)\n- Highly responsive with built-in breakpoint utilities`,
      author: 'Nakul Panwar',
      date: '2024-02-20',
      tags: ['CSS', 'Tailwind', 'Design'],
      likes: 8,
      readTime: '4 min read',
    },
    {
      id: '3',
      title: 'React Router v7: Modern Client-Side Navigation',
      excerpt: 'A deep dive into React Router v7 features including loaders, actions, and the new file-based routing approach.',
      content: `React Router v7 brings the full power of Remix data APIs into React Router itself. Loaders, actions, and type-safe routing are now available without switching frameworks.\n\nMajor changes in v7:\n- Loaders and Actions: Co-locate data fetching with route components\n- Type Safety: Full TypeScript support with generated types\n- Nested Routes: Improved layout nesting with outlet components`,
      author: 'Nakul Panwar',
      date: '2024-03-10',
      tags: ['React', 'Routing', 'JavaScript'],
      likes: 15,
      readTime: '6 min read',
    },
    {
      id: '4',
      title: 'Dockerizing React Apps for Production',
      excerpt: 'Step-by-step guide to containerizing a Vite React application with nginx for efficient, repeatable deployments.',
      content: `Containerizing your React app ensures it runs the same way in development, staging, and production. Docker combined with nginx is the gold standard for serving static React builds.\n\nThe multi-stage Dockerfile pattern keeps your final image small:\n1. Build stage: Use Node to install dependencies and build the Vite bundle\n2. Serve stage: Copy the built files into a lean nginx image\n\nThe key nginx configuration challenge for SPAs is ensuring all routes fallback to index.html.`,
      author: 'Nakul Panwar',
      date: '2024-04-05',
      tags: ['Docker', 'DevOps', 'React'],
      likes: 20,
      readTime: '7 min read',
    },
    {
      id: '5',
      title: 'Context API vs Redux: Choosing the Right Tool',
      excerpt: 'When should you reach for Context API and when does Redux make more sense? A pragmatic guide to the decision.',
      content: `A common source of confusion in React is when to use Context API versus Redux. They solve related but different problems.\n\nContext API is ideal for:\n- Infrequently updated values (theme, locale, auth status)\n- Avoiding prop drilling in small-to-medium apps\n\nRedux is ideal for:\n- Frequently updated, complex state (large lists, real-time data)\n- State that many components need to read/write\n- When you need time-travel debugging or middleware`,
      author: 'Nakul Panwar',
      date: '2024-05-12',
      tags: ['React', 'Redux', 'Architecture'],
      likes: 25,
      readTime: '8 min read',
    },
  ],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
    likePost: (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
  },
});

export const { addPost, updatePost, deletePost, likePost } = blogSlice.actions;

export const selectAllPosts = (state) => state.blog.posts;
export const selectPostById = (id) => (state) =>
  state.blog.posts.find((p) => p.id === id);

export default blogSlice.reducer;
