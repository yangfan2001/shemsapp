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
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent, Box, Typography, IconButton
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
import { useLocation, useNavigate } from "react-router-dom";
import LocationDeviceTypeChart from "../../components/chart/LocationDeviceTypePieChart";
import OtherLocationCompareChart from "../../components/chart/OtherLocationCompareChart";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function LocationEnergyPage() {
  const navigate = useNavigate();
  const [energyLocationDay, setEnergyLocationDay] = useState<
    EnergyInfoByLocationDate[]
  >([]);
  const [displayLocation, setDisplayLocation] = useState<number | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [displayData, setDisplayData] = useState<EnergyInfo[]>([]);
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
  const [displayStart, setDisplayStart] = useState<Date>(initStart);
  const [displayMode, setDisplayMode] = React.useState<"day" | "month">("day");
  const initRange: DateRange<Dayjs> = [
    dayjs(initStart.setDate(initStart.getDate() + 1)),
    dayjs($TODAY),
  ];

  const stateLocation = useLocation();
  const locationID = stateLocation.state?.locationID;

  useEffect(() => {
    if (locationID !== undefined) {
      setDisplayLocation(locationID);
    }
  }, [locationID]);

  const handleDisplayMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "day") {
      setDisplayMode("day");
    } else {
      setDisplayMode("month");
    }
  };

  const handleSelectLocation = (event: SelectChangeEvent) => {
    setDisplayLocation(Number(event.target.value));
    navigate("/energy/location", {
      state: { locationID: Number(event.target.value) },
    });
    // console.log(displayLocation);
    const filterData = () => {
      energyLocationDay.map((item) => {
        if (item.location_id === Number(event.target.value)) {
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
        await getCustomerEnergyPerLocationPerDay(
          displayStart,
          displayEnd,
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
  }, [displayStart, displayEnd]);

  const filterData = () => {
    //   console.log(energyLocationDay);
    energyLocationDay.map((item) => {
      if (item.location_id == Number(displayLocation)) {
        setDisplayData(item.energy);
      }
    });
  };

  useEffect(() => {
    // Call filterData in a separate useEffect if displayLocation changes
    filterData();
  }, [displayLocation, energyLocationDay]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getCustomerLocation();
        setLocations(response.data);
        // console.log(locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []); // Empty dependency array means this runs once on mount

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
            <Select
              label="Location"
              onChange={handleSelectLocation}
              value={locationID}
            >
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
              value={initRange}
              onChange={(newValue: DateRange<Dayjs>) => handleRange(newValue)}
              maxDate={dayjs($TODAY)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs={3} alignItems="center" justifyContent="center" display="flex">
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
        <Grid xs={8} justifyContent="center" alignItems="center" display="flex">
          <EnergyBarChart
            data={displayData}
            start={displayStart}
            end={displayEnd}
            groupBy={displayMode}
          />
        </Grid>
        <Grid xs={4} justifyContent="center" alignItems="center" display="flex">
          <LocationDeviceTypeChart
            location_id={displayLocation ? displayLocation : null}
            start={displayStart}
            end={displayEnd}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} padding={2}>
        <Grid item xs={8}  alignItems="center">
          <Box textAlign="center">
            <OtherLocationCompareChart location_id={displayLocation ? displayLocation : null} start={displayStart} end={displayEnd} />

            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: "gray" }}
            >
                Energy Cost Comparison: Current Location vs Similar-sized Locations ($)
            </Typography>
          </Box>
        </Grid>

       <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <IconButton
          onClick={() => navigate("/location")}
          color="primary"
          aria-label="go back"
          size="large"
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 20}}
        >
          <ArrowBackIcon />
          <Typography variant="button" style={{ marginLeft: 8 }}>Go Back To Location Page</Typography>
        </IconButton>
      </Grid>
    </Grid>


    </>
  );
}

export default LocationEnergyPage;
