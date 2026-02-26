import "./Admin.css";
import Navbar from "../Navbar";
import AddJobForm from "../AddJobForm";

function Admin() {
  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-container">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
        </div>

        <AddJobForm />
      </div>
    </div>
  );
}

export default Admin;
