import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import "./AdminLogin.css";

const AdminLogin = ({ onAdminLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setStatus("Logging in as Admin...");
      setTimeout(() => {
        // onAdminLogin();
        navigate("/admin-dashboard");
      }, 1500);
    } else {
      setStatus("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <ShieldCheck className="admin-icon" />
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="status-text">{status}</p>
      </div>
    </div>
  );
};

export default AdminLogin;
