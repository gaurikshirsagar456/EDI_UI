import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Survey from "./components/Survey";
import ThankYou from "./components/ThankYou";
import ChartsPage from "./admin/ChartsPage";
import HomePage from "./home/home";
import AdminDashboard from "./admin/AdminDashboard";  // Import AdminDashboard here

import "./styles.css";

function App() {
  const [voterId, setVoterId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLogin = (id) => {
    setVoterId(id);
    setIsLoggedIn(true);
  };

  // Survey flow component
  const SurveyFlow = () => {
    return !isLoggedIn ? (
      <Login onLogin={handleLogin} />
    ) : !isSubmitted ? (
      <Survey voterId={voterId} onSubmit={() => setIsSubmitted(true)} />
    ) : (
      <ThankYou />
    );
  };

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/survey" element={<SurveyFlow />} />
        <Route path="/admin/charts" element={<ChartsPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Add this */}
      </Routes>
    </Router>
  );
}

export default App;
