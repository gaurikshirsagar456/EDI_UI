import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import

const Survey = ({ voterId, onSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({ voter_id: voterId });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };
  const currentQuestion = questions[current];
  const total = questions.length;
  const progress = ((current + 1) / total) * 100;

  const goNext = () => setCurrent((prev) => prev + 1);
  const goBack = () => setCurrent((prev) => prev - 1);

  const handleFinalSubmit = () => {
    // document.write(JSON.stringify(answers, null, 12));
    fetch("http://localhost:5000/submit-survey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(answers)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Saved:", data);
      })
      .catch(err => {
        console.error("Error saving survey:", err);
      });

    onSubmit(); // optional, if still needed
  };

  return (
    <div className="survey-container">
      <div className="survey-title-box">
        <h2 className="survey-title">📝 Survey Form</h2>
        <span className="question-counter">{current + 1}/{total} Questions</span>
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      {currentQuestion && (
        <div className="question-box">
          <h3 className="question">{currentQuestion.question}</h3>

          {currentQuestion.options ? (
            <select
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              className="dropdown"
            >
              <option value="">Select...</option>
              {currentQuestion.options.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <textarea
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              placeholder="Type your answer..."
              className="textarea"
            />
          )}

          <div className="nav-buttons">
            {current > 0 && <button className="btn" onClick={goBack}>⏮ Prev</button>}
            {current < total - 1 && <button className="btn" onClick={goNext}>Next ⏭</button>}
            {current === total - 1 && (
              <button className="btn submit" onClick={handleFinalSubmit}>✅ Submit</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Survey;
