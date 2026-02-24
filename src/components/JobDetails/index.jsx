import "./JobDetails.css";
import { NavLink } from "react-router";

const job = {
  id: "1",
  created_at: "2 days ago",
  title: "Graphic Designer",
  company: "Spotify",
  location: "Remote",
  experience: "Junior",
  employment_type: "Fulltime",
  salary: "$50K/mo",
  description:
    "Join our marketing team to create compelling visual assets that resonate with our global audience of listeners and creators.",
  requirements: [
    "A strong portfolio of illustrations or other graphics",
    "Familiarity with design software and technologies",
    "A keen eye for aesthetics and details",
  ],
  role_description:
    "You will create visual concepts, by hand or using computer software, to communicate ideas that inspire, inform, or captivate consumers.",
};

function JobDetails() {
  return (
    <div className="job-details-container">
      <nav className="job-details-nav">
        <NavLink to="/jobs" className="back-link">
          &larr; Back to Jobs
        </NavLink>
      </nav>

      <main className="job-details-page">
        <section className="job-main-card">
          <div className="job-main-header">
            <img
              src="http://localhost:5173/logo.png"
              alt="Company Logo"
              className="job-logo"
            />
            <div>
              <h2>{job.title}</h2>
              <p>{job.company}</p>
            </div>
          </div>

          <div className="job-tags">
            <span className="tag">{job.location}</span>
            <span className="tag">{job.experience}</span>
            <span className="tag">{job.employment_type}</span>
          </div>

          <div className="job-salary">
            <p>{job.created_at}</p>
            <p>{job.salary}</p>
          </div>
        </section>

        <section className="job-description">
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </section>

        <section className="job-requirements">
          <h3>Skills & Requirements</h3>
          <ul>
            {job.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </section>

        <section className="job-role">
          <h3>Your Role</h3>
          <p>{job.role_description}</p>
        </section>
      </main>

      <div className="job-details-actions">
        <button className="job-details-btn apply-button">Apply Now</button>
        <button className="job-details-btn save-button">Save Job</button>
      </div>
    </div>
  );
}

export default JobDetails;
