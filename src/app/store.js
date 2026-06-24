import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../redux/slices/blogSlice';

const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});

export default store;
