import { experienceClassName } from "../../utils/colors";

function JobCard({ job, isAdmin = false, onDelete }) {
  return (
    <section className={`job-main-card ${experienceClassName(job.experience)}`}>
      {isAdmin && onDelete && (
        <button
          className="delete-job-btn"
          onClick={onDelete}
          aria-label="Delete job"
        >
          Delete
        </button>
      )}

      <div className="job-main-header">
        <img
          src={`/${job.company.toLowerCase()}.png`}
          alt={`${job.company} Logo`}
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
  );
}

export default JobCard;
