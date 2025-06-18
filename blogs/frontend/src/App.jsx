import { useEffect, createRef } from "react";
import { useDispatch } from "react-redux";
import {
  initializeBlogs,
  createBlog,
  incrementLikes,
  removeBlog,
} from "./reducers/blogsReducer";
import { setAutoUser, loginUser, logout } from "./reducers/userReducer";
import { useSelector } from "react-redux";

import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setAutoUser());
  }, [dispatch]);

  const blogFormRef = createRef();

  const handleLogin = (credentials) => {
    dispatch(loginUser(credentials));
  };

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog));
    blogFormRef.current.toggleVisibility();
  };

  const handleVote = async (blog) => {
    dispatch(incrementLikes(blog.id));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
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
    </div>
  );
};

export default App;
