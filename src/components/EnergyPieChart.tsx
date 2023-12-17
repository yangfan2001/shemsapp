import { CheckBox } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
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

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function EnergyPieChart(Props: Props) {
  const filteredData = Props.data.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= Props.start && itemDate <= Props.end;
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <ResponsiveContainer width="100%" height={250}>
        <BarChart width={730} height={250} data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatDate} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="energy" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default EnergyPieChart;
