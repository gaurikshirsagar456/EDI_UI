import React from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./ChartsPage.css"; // Make sure to include the styles

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF", "#FF3366"];

const ChartDisplay = ({ question, data, type }) => {
  return (
    <div className="chart-box">
      <h3 style={{ textAlign: "center", marginBottom: 20 }}>{question}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {type === "pie" ? (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
            >
              {data.map((_, index) => (
                <Cell key={`pie-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                maxHeight: 80,
              overflowY: "auto",
                fontSize: 12,
                paddingTop: 30,
                whiteSpace: "normal",
                width: "100%"
              }}
            />
          </PieChart>
        ) : (
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 87, right: 5, top: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fontSize: 12 }}
              width={1}
              interval={0}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="value">
              {data.map((_, index) => (
                <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartDisplay;
