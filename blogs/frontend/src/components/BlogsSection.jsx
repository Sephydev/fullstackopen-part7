import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogsReducer";
import { createRef } from "react";

import Blog from "./Blog";
import NewBlog from "./NewBlog";
import Togglable from "./Togglable";

const BlogsSection = ({ blogs }) => {
  const dispatch = useDispatch();

  const blogFormRef = createRef();

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog));
    blogFormRef.current.toggleVisibility();
  };

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {[...blogs].sort(byLikes).map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogsSection;
