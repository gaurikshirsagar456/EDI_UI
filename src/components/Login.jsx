import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [voterId, setVoterId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (voterId.trim()) {
      onLogin(voterId.trim());
    }
  };

  return (
    <div className="login-container">
      <h2>Voter Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="voterId">Enter Voter ID:</label>
        <input
          type="text"
          id="voterId"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          placeholder="Voter Id"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
