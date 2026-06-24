import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import BlogDetails from '../pages/BlogDetails';
import CreateBlog from '../pages/CreateBlog';
import EditBlog from '../pages/EditBlog';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<BlogDetails />} />
      <Route path="/create" element={<CreateBlog />} />
      <Route path="/edit/:id" element={<EditBlog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
