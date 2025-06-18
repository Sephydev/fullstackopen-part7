import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router";

import { setAutoUser, loginUser, logout } from "./reducers/loginReducer";

import Login from "./components/Login";
import Notification from "./components/Notification";
import BlogsSection from "./components/BlogsSection";
import UsersSection from "./components/UsersSection";

const App = () => {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAutoUser());
  }, [dispatch]);

  const handleLogin = (credentials) => {
    dispatch(loginUser(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

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
        <Route path="/users" element={<UsersSection />} />
      </Routes>
    </div>
  );
};

export default App;
