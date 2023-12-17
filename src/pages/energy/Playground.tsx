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
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateRange,
  DateRangePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers-pro";
import { PieChart } from "recharts";
import DeviceTypePieChart from "../../components/chart/DeviceTypePieChart";
import LocationEnergyPieChart from "../../components/chart/LocationEnergyPieChart";

export default function Playground() {
  const [energyPerDay, setEnergyPerDay] = useState([]);
  const [endDay, setEndDay] = useState($TODAY);
  const displayStart = new Date("2022-12-01T23:59:59");
  const displayEnd = new Date($TODAY);

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

  const [value, setValue] = React.useState<DateRange<Dayjs>>([
    dayjs("2022-04-17"),
    dayjs("2022-04-21"),
  ]);

  const range: DateRange<Dayjs> = [dayjs("2022-08-01"), dayjs("2022-12-31")];

  return (
    <>
      <CustomerEnergyChart
        data={energyPerDay}
        start={displayStart}
        end={displayEnd}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker
          value={range}
          onChange={(newValue: DateRange<Dayjs>) => setValue(newValue)}
        />
      </LocalizationProvider>
      <DeviceTypePieChart start={displayStart} end={displayEnd} />
      <LocationEnergyPieChart start={displayStart} end={displayEnd} />
    </>
  );
}
