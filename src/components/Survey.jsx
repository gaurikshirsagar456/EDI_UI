import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import

const Survey = ({ onSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate(); // ✅ setup

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
    console.log("User Answers:", answers);

    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.map((q) => {
          if (answers[q.questionId]) {
            const selected = answers[q.questionId];
            return {
              ...q,
              options: q.options.map((opt) =>
                opt.label === selected ? { ...opt, count: opt.count + 1 } : opt
              )
            };
          }
          return q;
        });

        console.log("Updated Data for Graph:", updatedData);
        localStorage.setItem("graphData", JSON.stringify(updatedData));

        // ✅ Navigate to charts page
        navigate("/admin/charts");
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
