import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/loginReducer";

const Navbar = ({ login }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const margin = {
    marginRight: 5,
  };

  const bgColor = {
    backgroundColor: "lightgray",
  };

  return (
    <div style={bgColor}>
      <Link style={margin} to="/">
        blogs
      </Link>
      <Link style={margin} to="/users">
        users
      </Link>
      <span style={margin}>{login.name} logged in</span>
      <button style={margin} onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default Navbar;
