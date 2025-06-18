import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useMatch } from "react-router";

import { setAutoUser, loginUser, logout } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { initializeBlogs } from "./reducers/blogsReducer";

import Login from "./components/Login";
import Notification from "./components/Notification";
import BlogsSection from "./components/BlogsSection";
import BlogDetail from "./components/BlogDetail";
import UsersSection from "./components/UsersSection";
import User from "./components/User";

const App = () => {
  const login = useSelector((state) => state.login);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setAutoUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLogin = (credentials) => {
    dispatch(loginUser(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const userMatch = useMatch("/user/:id");
  const user = userMatch
    ? users.find((user) => user.id === String(userMatch.params.id))
    : null;

  const blogMatch = useMatch("/blogs/:id");
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === String(blogMatch.params.id))
    : null;

  if (!login) {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <div>
        <p>{login.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Routes>
        <Route path="/" element={<BlogsSection blogs={blogs} />} />
        <Route path="/blogs/:id" element={<BlogDetail blog={blog} />} />
        <Route path="/users" element={<UsersSection users={users} />} />
        <Route path="/user/:id" element={<User user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
