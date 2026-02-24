import "./Landing.css";
import { NavLink } from "react-router";

function Landing() {
  return (
    <main className="landing-page" aria-labelledby="main-heading">
      <div className="landing-page-description">
        <img src="/logo.png" alt="logo" className="logo-img" />
        <h1 id="main-heading">Your search for the next dream job is over.</h1>
        <p>
          Whether you are entering the workforce or seeking a strategic career
          move, our platform provides a focused and efficient environment for
          discovering relevant job openings.
        </p>

        <ul className="features-list" aria-label="Key Features">
          <li>
            Visitors can efficiently navigate the job table using intuitive
            filtering tools.
          </li>
          <li>
            Full job details are readily available without account registration.
          </li>
          <li>
            Actively managed by administrators ensuring the board remains
            current.
          </li>
          <li>We utilize local storage to remember user interface settings.</li>
        </ul>
      </div>

      <nav className="landing-page-navigation">
        <div className="landing-navlinks-container">
          <NavLink to="/jobs" className="landing-page-link primary-link">
            Start searching &rarr;
          </NavLink>
          <NavLink to="/admin" className="landing-page-link secondary-link">
            Admin portal
          </NavLink>
        </div>
      </nav>
    </main>
  );
}

export default Landing;
