import "./JobDetails.css";
import { NavLink, useParams } from "react-router";
import { useEffect, useState } from "react";
import { experienceClassName } from "../../utils/colors";
import { useSelector } from "react-redux";
import supabase from "../../utils/supabase";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { items } = useSelector((state) => state.jobs);

  useEffect(() => {
    const jobFromStore = items.find((job) => job.id === id);

    if (jobFromStore) {
      setJob(jobFromStore);
      setIsLoading(false);
      return;
    }

    const fetchSingleJob = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleJob();
  }, [id, items]);

  if (isLoading) {
    return <div className="loading-message">Loading job details...</div>;
  }

  if (error || !job) {
    return (
      <div className="job-details-container">
        <nav className="job-details-nav">
          <NavLink to="/jobs" className="back-link">
            &larr; Back to Jobs
          </NavLink>
        </nav>
        <div className="error-message">
          {error ? `Failed to load job: ${error}` : "Job not found!"}
        </div>
      </div>
    );
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
          className={`job-main-card ${experienceClassName(job.experience)}`}
        >
          <div className="job-main-header">
            <img
              src={`/${job.company.toLowerCase()}.png`}
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
            <p>{new Date(job.created_at).toLocaleDateString()}</p>
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
        <button
          className={`job-details-btn apply-button ${experienceClassName(job.experience)}`}
        >
          Apply Now
        </button>
        <button className="job-details-btn save-button">Save Job</button>
      </div>
    </div>
  );
}

export default JobDetails;
