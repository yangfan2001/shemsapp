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
import DeviceTypePieChart from "../../components/chart/DeviceTypePieChart";
import LocationEnergyPieChart from "../../components/chart/LocationEnergyPieChart";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import LocationPricePieChart from "../../components/chart/LocationPricePieChart";
import DeviceTypePricePieChart from "../../components/chart/DeviceTypePricePieChart";
import BoltIcon from "@mui/icons-material/Bolt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TabPanel from "../../components/TabPanel";
import DateRangeIcon from '@mui/icons-material/DateRange';
import { getCustomerPricePerDay } from "../../services/price";
import { useSnackbar } from "../../components/SnackbarProvier";
import PriceBarChart from "../../components/chart/PriceBarChart";

export default function Playground() {
  const [energyPerDay, setEnergyPerDay] = useState([]);
  const [pricePerDay, setPricePerDay] = useState([]);
  const [endDay, setEndDay] = useState($TODAY);
  const [displayEnd, setDisplayEnd] = useState<Date>($TODAY);
  const initStart: Date = new Date(
    Date.UTC(
      $TODAY.getFullYear(),
      $TODAY.getMonth(),
      $TODAY.getDate(),
      0,
      0,
      0,
      0
    )
  );
  initStart.setMonth(initStart.getMonth() - 1);
  const initRangeStart: Date = new Date(
    Date.UTC(
      $TODAY.getFullYear(),
      $TODAY.getMonth() - 1,
      $TODAY.getDate() + 1,
      0,
      0,
      0,
      0
    )
  );
  const [displayStart, setDisplayStart] = useState<Date>(initStart);
  const [displayMode, setDisplayMode] = React.useState<"day" | "month">("day");
  const [tabValue, setTabValue] = React.useState('energy');
  const showSnackbar = useSnackbar();

  const handleDisplayMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "day") {
      setDisplayMode("day");
    } else {
      setDisplayMode("month");
    }
  };

  const initRange: DateRange<Dayjs> = [dayjs(initRangeStart), dayjs($TODAY)];

  useEffect(() => {
    console.log(displayStart.toISOString());
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        await getCustomerEnergyPerDay(displayStart, displayEnd, token)
          .then((res) => {
            setEnergyPerDay(res.data);
          })
          .catch((err) => {
            console.log(err);
            showSnackbar("Server Error", "error");
          });
        
        await getCustomerPricePerDay(displayStart, displayEnd)
        .then((res) => {
          setPricePerDay(res.data);
        })
        .catch((err) => {
          console.log(err);
            showSnackbar("Server Error", "error");
        });
      }
    };
    fetchData();
  }, [displayEnd, displayStart]);

  const handleRange = (newValue: DateRange<Dayjs>) => {
    if (newValue[0] && newValue[1]) {
      // setDisplayRange(newValue);
      const start = newValue[0].toDate();
      const end = newValue[1].toDate();

      const utc_start = new Date(
        Date.UTC(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes(),
          start.getSeconds(),
          start.getMilliseconds()
        )
      );
      const utc_end = new Date(
        Date.UTC(
          end.getFullYear(),
          end.getMonth(),
          end.getDate(),
          23,
          59,
          59,
          end.getMilliseconds()
        )
      );

      setDisplayStart(utc_start);
      setDisplayEnd(utc_end);
    }
  };

  return (
    <>
      <Grid
        container
        padding={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          xs={8}
          justifyContent="flex-start"
          alignItems="center"
          display="flex"
        >
          <Tooltip
            title="Select the time range for your graph"
            enterDelay={300}
            leaveDelay={200}
          >
            <Typography
              variant="subtitle1"
              sx={{
                marginRight: 2,
                display: "flex",
                alignItems: "center",
                color: "gray",
              }}
            >
              <DateRangeIcon sx={{ marginRight: 1 }} />
              Select Time Range
            </Typography>
          </Tooltip>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              value={initRange}
              onChange={(newValue: DateRange<Dayjs>) => handleRange(newValue)}
              maxDate={dayjs($TODAY)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs={4} alignItems="center" justifyContent="center" display="flex">
          <FormControl>
            <FormLabel>Display By</FormLabel>
            <RadioGroup value={displayMode} onChange={handleDisplayMode} row>
              <FormControlLabel value="day" control={<Radio />} label="Day" />
              <FormControlLabel
                value="month"
                control={<Radio />}
                label="Month"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Tabs
              value={tabValue}
              onChange={(event, newValue) => {
                setTabValue(newValue);
              }}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="inherit"
            >
              <Tab label="Energy Usage" value="energy" icon={<BoltIcon />} />
              <Tab label="Cost" value="cost" icon={<AttachMoneyIcon />} />
            </Tabs>
          </Grid>

          {/* Energy Usage TabPanel */}
          <TabPanel value={tabValue} index="energy">
            <Grid container spacing={2}>
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <Box textAlign="center">
                  <EnergyBarChart
                    data={energyPerDay}
                    start={displayStart}
                    end={displayEnd}
                    groupBy={displayMode}
                  />
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "gray" }}
                  >
                    Energy Usage Bar Chart (kwh)
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box textAlign="center">
                  <DeviceTypePieChart start={displayStart} end={displayEnd} />
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "gray" }}
                  >
                    Device Type Energy Usage Pie Chart (kwh)
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box textAlign="center">
                  <LocationEnergyPieChart
                    start={displayStart}
                    end={displayEnd}
                  />
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "gray" }}
                  >
                    Location Energy Usage Pie Chart (kwh)
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index="cost">
            <Grid container spacing={1}>


            <Grid item xs={12} justifyContent="center" alignItems="center">
                <Box textAlign="center">
                  <PriceBarChart data={pricePerDay} start={displayStart} end={displayEnd} groupBy={displayMode} />
                  <Typography variant="subtitle1" gutterBottom sx={{ color: 'gray' }}>
                    Energy Price Bar Chart ($)
                  </Typography>
                </Box>
              </Grid>


              <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
                <Box textAlign="center">
                  <LocationPricePieChart
                    start={displayStart}
                    end={displayEnd}
                  />
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "gray" }}
                  >
                    Location Energy Price Pie Chart ($)
                  </Typography>
                </Box>
              </Grid>

              <Grid
                item
                xs={6}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box textAlign="center">
                  <DeviceTypePricePieChart
                    start={displayStart}
                    end={displayEnd}
                  />
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "gray" }}
                  >
                    Device Type Energy Price Pie Chart ($)
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
}
