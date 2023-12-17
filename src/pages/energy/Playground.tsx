import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import { getCustomerEnergyPerDay } from "../../services/energy";
import { $TODAY } from "../../constants";
import EnergyPieChart from "../../components/EnergyPieChart";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateRange,
  DateRangePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers-pro";

export default function Playground() {
  const [energyPerDay, setEnergyPerDay] = useState([]);
  const [endDay, setEndDay] = useState($TODAY);
  const [displayEnd, setDisplayEnd] = useState<Date>($TODAY);
  const initStart: Date = new Date($TODAY);
  initStart.setMonth(initStart.getMonth() - 1);
  const [displayStart, setDisplayStart] = useState<Date>(initStart);

  const [displayRange, setValue] = React.useState<DateRange<Dayjs>>([
    dayjs(initStart),
    dayjs($TODAY),
  ]);

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

  useEffect(() => {
    if (displayRange[0]) {
      setDisplayStart(displayRange[0].toDate());
    }
    if (displayRange[1]) {
      setDisplayEnd(displayRange[1].toDate());
    }
  }, [displayRange]);

  const range: DateRange<Dayjs> = [dayjs("2022-08-01"), dayjs("2022-12-31")];

  return (
    <>
      <Grid container padding={2}>
        <Grid xs={12}>
          <EnergyPieChart
            data={energyPerDay}
            start={displayStart}
            end={displayEnd}
          />
        </Grid>
        <Grid xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              value={displayRange}
              onChange={(newValue: DateRange<Dayjs>) => setValue(newValue)}
              maxDate={dayjs($TODAY)}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>
  );
}
