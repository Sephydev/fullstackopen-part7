import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useMatch } from "react-router";

import { setAutoUser, loginUser, logout } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/usersReducer";

import Login from "./components/Login";
import Notification from "./components/Notification";
import BlogsSection from "./components/BlogsSection";
import UsersSection from "./components/UsersSection";
import User from "./components/User";

const App = () => {
  const login = useSelector((state) => state.login);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setAutoUser());
  }, [dispatch]);

  const handleLogin = (credentials) => {
    dispatch(loginUser(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const match = useMatch("/user/:id");
  console.log(users);
  const user = match
    ? users.find((user) => user.id === String(match.params.id))
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
        <Route path="/" element={<BlogsSection />} />
        <Route path="/users" element={<UsersSection users={users} />} />
        <Route path="/user/:id" element={<User user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
