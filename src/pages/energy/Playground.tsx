import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import { getCustomerEnergyPerDay } from "../../services/energy";
import { $TODAY } from "../../constants";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomerEnergyChart from "../../components/CustomerEnergyChart";

export default function Playground() {
  const [energyPerDay, setEnergyPerDay] = useState([]);
  const [endDay, setEndDay] = useState($TODAY);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const startDay: Date = new Date(endDay);
        startDay.setFullYear(endDay.getFullYear() - 1);
        await getCustomerEnergyPerDay(startDay, endDay, token)
          .then((res) => {
            setEnergyPerDay(res.data);
          })
          .catch((err) => {
            alert("Wrong! Error Code: " + err.data);
          });
      }
    };
    fetchData();
  }, [endDay]);

  console.log(energyPerDay);

  return (
    <>
      <CustomerEnergyChart data={energyPerDay} />
    </>
  );
}
