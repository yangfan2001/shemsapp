import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import { updateDevice } from "../services/device";
import { useSnackbar } from "./SnackbarProvier";
import { $TODAY } from "../constants";
import { getEnergyPerDayByDeviceId } from "../services/energy";
import EnergyBarChart from "./EnergyBarChart";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
    DateRange,
    DateRangePicker,
    LocalizationProvider
  } from "@mui/x-date-pickers-pro";import dayjs, { Dayjs } from "dayjs";

interface Props {
  modelOpen: boolean;
  setModelOpen: (open: boolean) => void;
  deviceId: string;
}

export default function DeviceEnergyChartDialog(props: Props) {
  const showSnackbar = useSnackbar();
  const [data, setData] = useState([] as any);
  const initStart: Date = new Date(
    Date.UTC(
      $TODAY.getFullYear(),
      $TODAY.getMonth() - 1,
      $TODAY.getDate(),
      0,
      0,
      0,
      0
    )
  );
  const [start, setDisplayStart] = useState<Date>(initStart);
  const [end, setDisplayEnd] = useState<Date>($TODAY);
  const [displayMode, setDisplayMode] = React.useState<"day" | "month">("day");
  const initRange: DateRange<Dayjs> = [
    dayjs(initStart.setDate(initStart.getDate() + 1)),
    dayjs($TODAY),
  ];

  useEffect(() => {
    if (props.deviceId === "") {
      return;
    }
    const fetchData = async () => {
      await getEnergyPerDayByDeviceId(props.deviceId, start, end)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          showSnackbar("Server Error", "error");
        });
    };
    fetchData();
  }, [props.deviceId, start, end]);

  const handleDisplayMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "day") {
      setDisplayMode("day");
    } else {
      setDisplayMode("month");
    }
  };

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
      <Dialog
        open={props.modelOpen}
        onClose={() => props.setModelOpen(false)}
        maxWidth={"xl"}
      >
        <DialogTitle>
          Energy Usage In The Past Month For Device ID:{props.deviceId}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: 1000, height: 300, overflow: "hidden" }}>
            <EnergyBarChart
              start={start}
              end={end}
              data={data}
              groupBy={displayMode}
            />
          </Box>
          <Grid
            xs={12}
            alignItems="center"
            justifyContent="center"
            display="flex"
          >
            {" "}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangePicker
                value={initRange}
                onChange={(newValue: DateRange<Dayjs>) => handleRange(newValue)}
                maxDate={dayjs($TODAY)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            xs={4}
            alignItems="center"
            justifyContent="center"
            display="flex"
          >
            <FormControl>
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
        </DialogContent>
      </Dialog>
    </>
  );
}
