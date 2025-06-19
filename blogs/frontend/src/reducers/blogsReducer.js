import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    newBlogAction(state, action) {
      return [...state, action.payload];
    },
    modifyBlog(state, action) {
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

export const { newBlogAction, setBlogs, modifyBlog, removeBlogAction } =
  blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogsService.create(content);
      dispatch(newBlogAction(newBlog));
      dispatch(
        setNotification({
          message: `Blog created: ${newBlog.title}, ${newBlog.author}`,
          type: "success",
        })
      );
    } catch {
      dispatch(
        setNotification({ message: "Title or URL missing", type: "error" })
      );
    }
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
    dispatch(modifyBlog(blogModified));
    dispatch(
      setNotification({
        message: `You liked ${blogModified.title} by ${blogModified.author}`,
        type: "success",
      })
    );
  };
};

export const addComment = (id, newComment) => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    const blogToModify = blogs.find((blog) => blog.id === id);
    const blogModified = await blogsService.update(id, {
      ...blogToModify,
      comments: blogToModify.comments.concat(newComment),
    });
    dispatch(modifyBlog(blogModified));
    dispatch(
      setNotification({
        message: `You commented ${newComment} on ${blogModified.title}`,
        type: "success",
      })
    );
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogsService.remove(blog.id);
    dispatch(removeBlogAction(blog.id));
    dispatch(
      setNotification({
        message: `Blog ${blog.title}, by ${blog.author} removed`,
        type: "success",
      })
    );
  };
};

export default blogsSlice.reducer;
