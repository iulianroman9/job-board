import "./Jobs.css";
import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, setCurrentPage, deleteJob } from "../../store/jobsSlice";
import { Link } from "react-router";
import PaginationControls from "../PaginationControls";
import JobFilters from "../JobFilters";
import {
  filterByExperience,
  filterBySearch,
  sortByDate,
} from "../../utils/jobFilters";
import Navbar from "../Navbar";
import JobCard from "../JobCard";

function Jobs() {
  const dispatch = useDispatch();
  const { items, isLoading, error, currentPage, itemsPerPage, filters } =
    useSelector((state) => state.jobs);
  const { isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchJobs());
    }
  }, [dispatch, currentPage, items.length]);

  useEffect(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    [currentPage],
  );

  const filteredItems = useMemo(() => {
    let result = items;
    result = filterBySearch(result, filters.search);
    result = filterByExperience(result, filters.experience);
    result = sortByDate(result, filters.sortDate);
    return result;
  }, [items, filters]);

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexFirst = (currentPage - 1) * itemsPerPage;
  const indexLast = indexFirst + itemsPerPage;
  const currentItems = filteredItems.slice(indexFirst, indexLast);

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

  const handleDelete = (e, jobId) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("Are you sure?")) {
      dispatch(deleteJob(jobId));
    }
  };

  if (isLoading) {
    return <div className="loading-message">Loading jobs...</div>;
  }

  if (error) {
    return <div className="error-message">Failed to load jobs: {error}</div>;
  }

  return (
    <main className="jobs-container">
      <Navbar />
      <div className="jobs-header">
        <h2>
          Find Jobs <span>({totalItems})</span>
        </h2>
      </div>

      <JobFilters />

      {currentItems.length === 0 && (
        <div className="no-results">No jobs that match your criteria.</div>
      )}

      <div className="jobs-list">
        {currentItems.map((job) => (
          <Link to={`/jobs/${job.id}`} key={job.id} className="job-card-link">
            <JobCard
              job={job}
              isAdmin={isAdmin}
              onDelete={(e) => handleDelete(e, job.id)}
            />
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
    </main>
  );
}

export default Jobs;
