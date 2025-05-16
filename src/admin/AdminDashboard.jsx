import React, { useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaChartLine } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSurveyClick = () => {
    navigate("/admin/charts");
  };

  const handleResultsClick = async () => {
  setLoading(true);
  try {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}) // Send actual data if required by API
    });

    if (!response.ok) {
      throw new Error("Failed to fetch prediction");
    }

    const result = await response.json();

    // Store in localStorage or context
    localStorage.setItem("predictResult", JSON.stringify(result));

    navigate("/admin/results");
  } catch (error) {
    console.error("Error fetching prediction:", error);
    alert("Failed to fetch prediction.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="admin-dashboard">
      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading prediction results...</p>
        </div>
      ) : (
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
            <button className="open-button" onClick={handleResultsClick}>Open</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
