import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import { getCustomerEnergyPerDay } from "../../services/energy";
import { $TODAY } from "../../constants";
import EnergyBarChart from "../../components/EnergyBarChart";
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
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export default function Playground() {
  const [energyPerDay, setEnergyPerDay] = useState([]);
  const [endDay, setEndDay] = useState($TODAY);
  const [displayEnd, setDisplayEnd] = useState<Date>($TODAY);
  const initStart: Date = new Date($TODAY);
  initStart.setMonth(initStart.getMonth() - 1);
  const [displayStart, setDisplayStart] = useState<Date>(initStart);
  const [displayMode, setDisplayMode] = React.useState<"day" | "month">("day");

  const handleDisplayMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "day") {
      setDisplayMode("day");
    } else {
      setDisplayMode("month");
    }
  };

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
        <Grid xs={8}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              value={displayRange}
              onChange={(newValue: DateRange<Dayjs>) => setValue(newValue)}
              maxDate={dayjs($TODAY)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs={4}>
          <FormControl>
            <FormLabel>Display By</FormLabel>
            <RadioGroup value={displayMode} onChange={handleDisplayMode}>
              <FormControlLabel value="day" control={<Radio />} label="Day" />
              <FormControlLabel
                value="month"
                control={<Radio />}
                label="Month"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <EnergyBarChart
            data={energyPerDay}
            start={displayStart}
            end={displayEnd}
            groupBy={displayMode}
          />
        </Grid>

        <DeviceTypePieChart start={displayStart} end={displayEnd} />
        <LocationEnergyPieChart start={displayStart} end={displayEnd} />
      </Grid>
    </>
  );
}
