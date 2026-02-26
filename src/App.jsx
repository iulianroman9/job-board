import "./App.css";
import { Outlet, NavLink, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "./store/themeSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);

  return (
    <div className="app">
      <Outlet />
      <footer className="footer">
        <p>&copy; All rights reserved.</p>
        {location.pathname !== "/contact" && (
          <NavLink to="/contact" className="contact-link">
            Contact us
          </NavLink>
        )}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="theme-toggle-btn"
        >
          {themeMode === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </footer>
    </div>
  );
}

export default App;
