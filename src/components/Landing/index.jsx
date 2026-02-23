import "./Landing.css";
import { NavLink } from "react-router";

function Landing() {
  return (
    <>
      <main className="landing-page" aria-labelledby="main-heading">
        <div className="landing-page-description">
          <h1 id="main-heading">Welcome to our Job Board!</h1>
          <p>
            Whether you are entering the workforce or seeking a strategic career
            move, our platform provides a focused and efficient environment for
            discovering relevant job openings. We prioritize clarity and
            accessibility, presenting a curated view of opportunities that
            allows users to evaluate roles based on their specific criteria and
            preferences.
          </p>
          <h3 id="key-features-heading">Key Features</h3>
          <ul aria-labelledby="key-features-heading">
            <li>
              <p>
                Visitors can efficiently navigate the job table using intuitive
                filtering tools to organize listings.
              </p>
            </li>
            <li>
              <p>
                Full job details and information are readily available to all
                visitors without the need for account registration or a login
                barrier.
              </p>
            </li>
            <li>
              <p>
                The platform is actively managed by administrators that add new
                positions and remove outdated listings, ensuring the board
                remains current.
              </p>
            </li>
            <li>
              <p>
                We utilize local storage to remember user interface settings,
                such as theme choices or applied filters.
              </p>
            </li>
          </ul>
        </div>
        <nav className="landing-page-navigation">
          <img src="/logo.png" alt="logo"></img>
          <div className="landing-navlinks-container">
            <NavLink to="/dashboard" className="landing-page-link">
              View jobs
            </NavLink>
            <NavLink to="/admin" className="landing-page-link">
              Admin portal
            </NavLink>
          </div>
        </nav>
      </main>
    </>
  );
}

export default Landing;
