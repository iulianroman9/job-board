import "./Admin.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addJob } from "../../store/jobsSlice";
import Navbar from "../Navbar";

function Admin() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    experience: "Junior",
    employment_type: "Fulltime",
    salary: "",
    description: "",
    role_description: "",
    requirements: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await dispatch(addJob(formData)).unwrap();
      setStatus("success");
      setFormData({
        title: "",
        company: "",
        location: "",
        experience: "Junior",
        employment_type: "Fulltime",
        salary: "",
        description: "",
        role_description: "",
        requirements: "",
      });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      console.error(err);
    }
  };

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-container">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <p className="admin-subtitle">Post a new job opening to the board.</p>
        </div>

        {status === "success" && (
          <div className="alert success">Job posted successfully!</div>
        )}
        {status === "error" && (
          <div className="alert error">
            Failed to post job. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Job Title</label>
              <input
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Senior DevOps Engineer"
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                required
                value={formData.company}
                onChange={handleChange}
                placeholder="Cognizant"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="Remote or Iasi"
              />
            </div>
            <div className="form-group">
              <label htmlFor="salary">Salary</label>
              <input
                id="salary"
                required
                placeholder="$10K/mo"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="experience">Experience Level</label>
              <select
                id="experience"
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="Junior">Junior</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="employment_type">Employment Type</label>
              <select
                id="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
              >
                <option value="Fulltime">Fulltime</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Company Description</label>
            <textarea
              id="description"
              required
              rows="2"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the company..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="role_description">Role Description</label>
            <textarea
              id="role_description"
              required
              rows="2"
              value={formData.role_description}
              onChange={handleChange}
              placeholder="What will this person be doing?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="requirements">Requirements (Comma separated)</label>
            <textarea
              id="requirements"
              required
              rows="2"
              placeholder="React, Node.js, 3+ years experience"
              value={formData.requirements}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
