import "./Navbar.css";
import { Link, useNavigate } from "react-router";
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
        <Link to="/jobs" className="nav-link">
          Jobs
        </Link>

        <div className="nav-actions">
          {!isLoggedIn ? (
            <Link to="/login" className="nav-btn login-btn">
              Log in
            </Link>
          ) : (
            <>
              {isAdmin && (
                <Link to="/admin" className="nav-link">
                  Dashboard
                </Link>
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
