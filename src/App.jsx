import "./App.css";
import { Outlet, NavLink, useLocation } from "react-router";

function App() {
  const location = useLocation();

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
      </footer>
    </div>
  );
}

export default App;
