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
import { getDeviceEvent, updateDevice } from "../services/device";
import { useSnackbar } from "./SnackbarProvier";
import { $TODAY } from "../constants";
import { getEnergyPerDayByDeviceId } from "../services/energy";
import EnergyBarChart from "./EnergyBarChart";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRange, DateRangePicker } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  modelOpen: boolean;
  setModelOpen: (open: boolean) => void;
  deviceId: string;
}

export default function DeviceEventDialog(props: Props) {
  const showSnackbar = useSnackbar();
  const [data, setData] = useState([] as any);
  const [date, setDate] = useState<Date>($TODAY);

  useEffect(() => {
    if (props.deviceId === "") {
      return;
    }
    const fetchData = async () => {
      await getDeviceEvent(Number(props.deviceId), date)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((error) => {
          showSnackbar("Server Error", "error");
        });
    };
    fetchData();
  }, [props.deviceId, date]);

  const handleSet = (newValue: Dayjs | null) => {
    if (newValue) {
      // setDisplayRange(newValue);
      const set_date = newValue.toDate();

      const utc_date = new Date(
        Date.UTC(
          set_date.getFullYear(),
          set_date.getMonth(),
          set_date.getDate(),
          0,
          0,
          0,
          0
        )
      );
      setDate(utc_date);
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
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="EnergyReport"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="Activity" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          <Grid
            xs={12}
            alignItems="center"
            justifyContent="center"
            display="flex"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs($TODAY)}
                onChange={(newValue) => handleSet(newValue)}
              />
            </LocalizationProvider>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
