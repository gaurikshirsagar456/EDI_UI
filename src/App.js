import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Survey from "./components/Survey";
import ThankYou from "./components/ThankYou";
import ChartsPage from "./admin/ChartsPage";
import HomePage from "./home/home";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";

import "./styles.css";

function App() {
  const [voterId, setVoterId] = useState("");
  const [isVoterLoggedIn, setIsVoterLoggedIn] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleVoterLogin = (id) => {
    setVoterId(id);
    setIsVoterLoggedIn(true);
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    setVoterId("");
    setIsVoterLoggedIn(false);
    setIsAdminLoggedIn(false);
    setIsSubmitted(false);
  };

  const SurveyFlow = () => {
    return !isVoterLoggedIn ? (
      <Login onLogin={handleVoterLogin} />
    ) : !isSubmitted ? (
      <Survey onSubmit={() => setIsSubmitted(true)} />
    ) : (
      <ThankYou />
    );
  };

  return (
    <Router>
      <Navbar
        isAdminLoggedIn={isAdminLoggedIn}
        isVoterLoggedIn={isVoterLoggedIn}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/survey" element={<SurveyFlow />} />
        <Route path="/admin/charts" element={<ChartsPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminLogin onAdminLogin={handleAdminLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
