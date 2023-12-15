import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: never[];
}

function CustomerEnergyChart(Props: Props) {
  return (
    <>
      <BarChart width={730} height={250} data={Props.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="energy" fill="#8884d8" />
      </BarChart>
    </>
  );
}

export default CustomerEnergyChart;
