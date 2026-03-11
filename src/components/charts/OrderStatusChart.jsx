// components/charts/OrderStatusChart.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Color palette for different order statuses
const COLORS = ["#10B981", "#F59E0B", "#3B82F6", "#EF4444"]; // Completed, Processing, Shipped, Cancelled

export default function OrderStatusChart({ data, title = "Orders by Status" }) {
  return (
    <div className="border border-gray-200 rounded-xl bg-white p-4">
      <h3 className="text-base font-bold mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#3B82F6"
            label={(entry) => entry.name}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
            formatter={(value) => `${value} orders`}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}