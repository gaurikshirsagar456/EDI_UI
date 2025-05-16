import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [voterId, setVoterId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedId = voterId.trim();
    const isValid = /^[a-zA-Z]{3}[0-9]{7}$/.test(trimmedId);

    if (isValid) {
      onLogin(trimmedId);
    } else {
      alert("Voter ID must be exactly 10 characters:\nFirst 3 letters, then 7 digits.");
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
          placeholder="e.g. ABC1234567"
          required
          pattern="[a-zA-Z]{3}[0-9]{7}"
          maxLength={10}
          title="First 3 letters followed by 7 digits (e.g., ABC1234567)"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
