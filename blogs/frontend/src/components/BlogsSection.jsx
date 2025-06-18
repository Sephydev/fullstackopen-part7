import { useDispatch, useSelector } from "react-redux";
import {
  initializeBlogs,
  createBlog,
  incrementLikes,
  removeBlog,
} from "../reducers/blogsReducer";
import { useEffect, createRef } from "react";

import Blog from "./Blog";
import NewBlog from "./NewBlog";
import Togglable from "./Togglable";

const BlogsSection = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogFormRef = createRef();

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
    }
  };

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog));
    blogFormRef.current.toggleVisibility();
  };

  const handleVote = async (blog) => {
    dispatch(incrementLikes(blog.id));
  };

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {[...blogs].sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
};

export default BlogsSection;
