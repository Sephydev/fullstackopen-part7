import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    newBlogAction(state, action) {
      return [...state, action.payload];
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { newBlogAction, setBlogs } = blogsSlice.actions;

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

export default blogsSlice.reducer;
