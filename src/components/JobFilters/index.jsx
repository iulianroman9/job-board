import "./JobFilters.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/jobsSlice";

function JobFilters() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.jobs);
  const [searchTerm, setSearchTerm] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== filters.search) {
        dispatch(setFilters({ search: searchTerm }));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, filters.search, dispatch]);

  return (
    <div className="job-filters-container">
      <div className="filter-group search-group">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-group select-group">
        <select
          value={filters.experience}
          onChange={(e) => dispatch(setFilters({ experience: e.target.value }))}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>

        <select
          value={filters.sortDate}
          onChange={(e) => dispatch(setFilters({ sortDate: e.target.value }))}
          className="filter-select"
        >
          <option value="newest">New</option>
          <option value="oldest">Old</option>
        </select>
      </div>
    </div>
  );
}

export default JobFilters;
