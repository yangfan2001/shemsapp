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

interface DataItem {
  date: string;
  energy: number;
}

interface Props {
  data: DataItem[];
  start: Date;
  end: Date;
}

function CustomerEnergyChart(Props: Props) {
  const filteredData = Props.data.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= Props.start && itemDate <= Props.end;
  });

  return (
    <>
      <BarChart width={730} height={250} data={filteredData}>
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
