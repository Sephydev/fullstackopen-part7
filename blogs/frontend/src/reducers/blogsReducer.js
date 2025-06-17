import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    newBlogAction(state, action) {
      return [...state, action.payload];
    },
    likeAction(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    removeBlogAction(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { newBlogAction, setBlogs, likeAction, removeBlogAction } =
  blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(content);
    dispatch(newBlogAction(newBlog));
  };
};

export const incrementLikes = (id) => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    const blogToModify = blogs.find((blog) => blog.id === id);
    const blogModified = await blogsService.update(id, {
      ...blogToModify,
      likes: blogToModify.likes + 1,
    });
    dispatch(likeAction(blogModified));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogsService.remove(id);
    dispatch(removeBlogAction(id));
  };
};

export default blogsSlice.reducer;
