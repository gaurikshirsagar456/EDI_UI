import React, { useState } from 'react';
import './Form.css';

const VoterForm = ({ setVoterId, setSubmitted }) => {
const [input, setInput] = useState('');

const handleSubmit = (e) => {
e.preventDefault();
if (input.trim()) {
setVoterId(input.trim());
setSubmitted(true);
}
};

return (
<div className="form-wrapper">
<h2>Enter Voter ID</h2>
<form onSubmit={handleSubmit}>
<input
type="text"
placeholder="Enter your Voter ID"
value={input}
onChange={(e) => setInput(e.target.value)}
required
/>
<button type="submit">Start Poll</button>
</form>
</div>
);
};

export default VoterForm;