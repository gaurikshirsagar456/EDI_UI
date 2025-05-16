import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF", "#FF3366"];

const ChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Read updated survey data from localStorage
    const savedData = JSON.parse(localStorage.getItem("graphData"));
    if (savedData && savedData.length > 0) {
      const allOptions = savedData.flatMap((question) =>
        question.options.map((opt) => ({
          name: opt.label,
          value: opt.count,
        }))
      );
      setData(allOptions);
    }
  }, []);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 style={{ textAlign: "center" }}>📊 Survey Result Pie Chart</h2>
      {data.length === 0 ? (
        <p style={{ textAlign: "center" }}>No data available.</p>
      ) : (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ChartComponent;
