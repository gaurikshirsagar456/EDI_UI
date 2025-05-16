import React from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaChartLine } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

 const handleSurveyClick = () => {
  navigate("/admin/charts");
};

  return (
    <div className="admin-dashboard">
      <div className="card-container">
        <div className="dashboard-card">
          <FaClipboardList className="card-icon survey-icon" />
          <h3>Survey Analysis</h3>
          <p>Analyze and manage exit poll survey data.</p>
          <button className="open-button" onClick={handleSurveyClick}>Open</button>
        </div>
        <div className="dashboard-card">
          <FaChartLine className="card-icon results-icon" />
          <h3>Results</h3>
          <p>Explore and review exit poll results.</p>
          <button className="open-button">Open</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
