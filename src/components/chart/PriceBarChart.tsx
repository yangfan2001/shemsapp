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

interface PriceInfo {   
    date: string;
    price: number;
  };

interface Props {
  data: PriceInfo[];
  start: Date;
  end: Date;
  groupBy: "day" | "month";
}

function formatDate(dateString: string, formatType: "day" | "month"): string {
  const parts = dateString.split("/").map((part) => parseInt(part, 10));

  if (formatType === "day") {
    // Expecting format: MM/DD/YYYY
    if (parts.length === 3) {
      const [month, day] = parts;
      return `${month}/${day}`;
    }
  } else {
    // Expecting format: MM/YYYY
    if (parts.length === 2) {
      const [month, year] = parts;
      return `${month}/${year}`;
    }
  }

  return dateString; // Fallback to the original string in case of an unexpected format
}

function groupData(data: PriceInfo[], groupBy: "day" | "month"): PriceInfo[] {
  const grouped = new Map();

  data.forEach((item) => {
    const date = new Date(item.date);
    const key =
      groupBy === "day"
        ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        : `${date.getMonth() + 1}/${date.getFullYear()}`;

    if (!grouped.has(key)) {
      grouped.set(key, { date: key, price: 0 });
    }
    grouped.get(key).price += item.price
  });

  return Array.from(grouped.values());
}

function PriceBarChart({ data, start, end, groupBy }: Props) {
  const filteredData = groupData(
    data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= end;
    }),
    groupBy
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(dateString) => formatDate(dateString, groupBy)}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default PriceBarChart;
