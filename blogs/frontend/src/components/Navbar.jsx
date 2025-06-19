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

  const navbarStyle = {
    backgroundColor: "gray",
    padding: "1em",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  return (
    <div style={navbarStyle}>
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
