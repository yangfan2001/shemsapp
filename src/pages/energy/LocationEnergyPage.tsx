import React, { useEffect, useState } from "react";
import {
  $TODAY,
  EnergyInfo,
  EnergyInfoByLocationDate,
  Location,
} from "../../constants";
import { getCustomerEnergyPerLocationPerDay } from "../../services/energy";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { getCustomerLocation } from "../../services/location";
import {
  DateRange,
  DateRangePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EnergyBarChart from "../../components/EnergyBarChart";
import { useNavigate } from "react-router-dom";

function LocationEnergyPage() {
  const navigate = useNavigate();
  const [queryEndDate, setQueryEndDate] = useState($TODAY);
  const [energyLocationDay, setEnergyLocationDay] = useState<
    EnergyInfoByLocationDate[]
  >([]);
  const [displayLocation, setDisplayLocation] = useState<number | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [displayData, setDisplayData] = useState<EnergyInfo[]>([]);
  const [displayEnd, setDisplayEnd] = useState<Date>($TODAY);
  const initStart: Date = new Date($TODAY);
  initStart.setMonth(initStart.getMonth() - 1);
  const [displayStart, setDisplayStart] = useState<Date>(initStart);
  const [displayMode, setDisplayMode] = React.useState<"day" | "month">("day");
  const [displayRange, setValue] = React.useState<DateRange<Dayjs>>([
    dayjs(initStart),
    dayjs($TODAY),
  ]);

  const handleDisplayMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "day") {
      setDisplayMode("day");
    } else {
      setDisplayMode("month");
    }
  };

  const handleSelectLocation = (event: SelectChangeEvent) => {
    setDisplayLocation(Number(event.target.value));
    const filterData = () => {
      energyLocationDay.map((item) => {
        if (item.location_id === displayLocation) {
          setDisplayData(item.energy);
        }
      });
    };
    filterData();
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const queryStartDate = new Date(queryEndDate);
        queryStartDate.setMonth(queryStartDate.getMonth() - 5);
        await getCustomerEnergyPerLocationPerDay(
          queryStartDate,
          queryEndDate,
          token
        )
          .then((res) => {
            setEnergyLocationDay(res.data);
          })
          .catch((err) => {
            alert("Wrong! Error Code: " + err.data);
          });
      }
    };
    fetchData();
  }, [queryEndDate]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getCustomerLocation();
        setLocations(response.data);
        console.log(locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    if (displayRange[0]) {
      setDisplayStart(displayRange[0].toDate());
    }
    if (displayRange[1]) {
      setDisplayEnd(displayRange[1].toDate());
    }
  }, [displayRange]);

  return (
    <>
      <Grid container padding={2} justifyContent="center" alignItems="center">
        <Grid
          padding={2}
          display={"flex"}
          justifyContent="center"
          alignItems="center"
          xs={3}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
            <InputLabel>Location</InputLabel>
            <Select label="Location" onChange={handleSelectLocation}>
              <MenuItem value="">
                <em>Not Selected</em>
              </MenuItem>
              {locations.map((item: Location, index) => (
                <MenuItem key={index} value={item.location_id}>
                  {item.location_street_num +
                    " " +
                    item.location_street_name +
                    " " +
                    item.location_unit_number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={6} alignItems="center" justifyContent="center" display="flex">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              value={displayRange}
              onChange={(newValue: DateRange<Dayjs>) => setValue(newValue)}
              maxDate={dayjs($TODAY)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs={3} alignItems="center" justifyContent="center" display="flex">
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
        <Grid xs={8} justifyContent="center" alignItems="center" display="flex">
          <EnergyBarChart
            data={displayData}
            start={displayStart}
            end={displayEnd}
            groupBy={displayMode}
          />
        </Grid>
        <Grid xs={4} justifyContent="center" alignItems="center" display="flex">
          "Display pie chart here, show proportion of device type"
        </Grid>
      </Grid>
      <Grid xs={3} justifyContent="center" alignItems="center" display="flex">
        <Button
          onClick={() => {
            navigate("/playground");
          }}
          variant="contained"
        >
          Go Back To Energy Overview
        </Button>
      </Grid>
    </>
  );
}

export default LocationEnergyPage;
