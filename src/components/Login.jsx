import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [voterId, setVoterId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedId = voterId.trim();
    const isValid = /^[a-zA-Z0-9]{10}$/.test(trimmedId);

    if (isValid) {
      onLogin(trimmedId);
    } else {
      alert("Voter ID must be exactly 10 alphanumeric characters.");
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
          placeholder="Voter ID"
          required
          pattern="[a-zA-Z0-9]{10}"
          maxLength={10}
          title="Voter ID must be exactly 10 alphanumeric characters"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
