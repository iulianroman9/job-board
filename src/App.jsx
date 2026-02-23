import "./App.css";
import { Outlet } from "react-router";
import { NavLink } from "react-router";
function App() {
  return (
    <div className="app">
      <Outlet />
      <footer className="footer">
        <p>&copy; All rights reserved.</p>
        <NavLink to="/contact" className="contact-link">
          Contact us
        </NavLink>
      </footer>
    </div>
  );
}

export default App;
