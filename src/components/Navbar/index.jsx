import "./Navbar.css";
import { NavLink, Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/jobs");
  };

  return (
    <nav className="main-navbar">
      <div className="nav-links">
        <NavLink to="/jobs" className="nav-link">
          Jobs
        </NavLink>

        <div className="nav-actions">
          {!isLoggedIn ? (
            <Link to="/login" className="nav-btn login-btn">
              Log in
            </Link>
          ) : (
            <>
              {isAdmin && (
                <NavLink to="/admin" className="nav-link">
                  Dashboard
                </NavLink>
              )}
              <button onClick={handleLogout} className="nav-btn logout-btn">
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
