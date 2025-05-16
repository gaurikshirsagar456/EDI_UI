import React, { useEffect, useState } from "react";
import ChartDisplay from "./ChartDisplay";
import "./ChartsPage.css";

const dummyResponses = [
  [5, 3, 4, 4, 7],
  [2, 5, 3, 3, 6],
  [4, 6, 5, 3, 2, 8, 3, 2, 9, 10],
  [7, 2, 5, 4, 3, 9],
  [3, 4, 6, 5, 2],
  [5, 2, 3, 6, 4, 5, 6, 1],
  [6, 5, 4, 3, 2],
  [3, 7, 5, 4, 2],
  [4, 6, 3, 5, 7],
  [5, 3, 6, 7, 2],
  [2, 4, 5, 6, 7],
  [7, 3, 4, 5, 6]
];

const ChartsPage = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => {
        const preparedData = data.map((q, index) => {
          const responses = dummyResponses[index] || [];
          return {
            question: q.question,
            type: index % 2 === 0 ? "pie" : "bar",
            data: q.options.map((opt, i) => ({
              name: opt,
              value: responses[i] || 0
            }))
          };
        });

        setChartData(preparedData);
      })
      .catch((err) => {
        console.error("Failed to fetch questions.json:", err);
      });
  }, []);

  return (
    <div className="charts-container">
      <h2 className="charts-title">📊 Survey Analysis</h2>
      {chartData.length === 0 ? (
        <p style={{ textAlign: "center" }}>Loading charts...</p>
      ) : (
        chartData.map((item, index) => (
          <ChartDisplay
            key={index}
            question={item.question}
            data={item.data}
            type={item.type}
          />
        ))
      )}
    </div>
  );
};

export default ChartsPage;
