import "./Jobs.css";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, setCurrentPage } from "./jobsSlice";
import { Link } from "react-router";
import PaginationControls from "../PaginationControls";

function Jobs() {
  const dispatch = useDispatch();
  const { items, isLoading, error, currentPage, itemsPerPage, totalItems } =
    useSelector((state) => state.jobs);

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  }, [currentPage, dispatch]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  }, [currentPage, totalPages, dispatch]);

  useEffect(() => {
    dispatch(fetchJobs({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  if (isLoading) {
    return <div className="jobs-container">loading jobs...</div>;
  }

  if (error) {
    return <div className="error-message">Failed to load jobs: {error}</div>;
  }

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h2>
          Find Jobs <span>({totalItems})</span>
        </h2>
      </div>

      <div className="jobs-list">
        {items.map((job) => (
          <Link to={`/jobs/${job.id}`} key={job.id} className="job-card-link">
            <section className="job-main-card">
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
          </Link>
        ))}
      </div>

      {totalItems > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      )}
    </div>
  );
}

export default Jobs;
