import "./JobDetails.css";
import { NavLink, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchJobs } from "../Jobs/jobsSlice";

function JobDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { items, isLoading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchJobs());
    }
  }, [dispatch, items.length]);

  const job = items.find((job) => String(job.id) === id);

  if (isLoading) {
    return <div className="loading-message">Loading job details...</div>;
  }

  if (error) {
    return <div className="error-message">Failed to load job: {error}</div>;
  }

  if (!job) {
    return (
      <div className="job-details-container">
        <nav className="job-details-nav">
          <NavLink to="/jobs" className="back-link">
            &larr; Back to Jobs
          </NavLink>
        </nav>
        <div className="error-message">Job not found!</div>
      </div>
    );
  }

  return (
    <div className="job-details-container">
      <nav className="job-details-nav">
        <NavLink to="/jobs" className="back-link">
          &larr; Back to Jobs
        </NavLink>
      </nav>

      <main className="job-details-page">
        <section
          className={`job-main-card ${job.experience === "Junior" ? "card-junior" : job.experience === "Mid-level" ? "card-mid" : job.experience === "Senior" ? "card-senior" : ""}`}
        >
          <div className="job-main-header">
            <img src="/logo.png" alt="Company Logo" className="job-logo" />
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
            <p>Posted: {new Date(job.created_at).toLocaleDateString()}</p>
            <p>{job.salary}</p>
          </div>
        </section>

        <section className="job-description">
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </section>

        {job.requirements && job.requirements.length > 0 && (
          <section className="job-requirements">
            <h3>Skills & Requirements</h3>
            <ul>
              {job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </section>
        )}

        {job.role_description && (
          <section className="job-role">
            <h3>Your Role</h3>
            <p>{job.role_description}</p>
          </section>
        )}
      </main>

      <div className="job-details-actions">
        <button className="job-details-btn apply-button">Apply Now</button>
        <button className="job-details-btn save-button">Save Job</button>
      </div>
    </div>
  );
}

export default JobDetails;
