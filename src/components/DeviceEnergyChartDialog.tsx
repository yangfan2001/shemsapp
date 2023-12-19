import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Paper, TextField, Box } from "@mui/material";
import { updateDevice } from '../services/device';
import { useSnackbar } from './SnackbarProvier';
import { $TODAY } from '../constants';
import { getEnergyPerDayByDeviceId } from '../services/energy';
import EnergyBarChart from './EnergyBarChart';

interface Props {
    modelOpen: boolean;
    setModelOpen: (open: boolean) => void;
    deviceId: string;
}

export default function DeviceEnergyChartDialog(props: Props) {
    const showSnackbar = useSnackbar();
    const [data, setData] = useState([] as any);
    const start = new Date($TODAY);
    start.setMonth(start.getMonth() - 1);
    const end = new Date($TODAY);
    const [displayMode, setDisplayMode] = React.useState<"day" | "month">("day");



    useEffect(() => {
        if (props.deviceId === '') {
            return
        }
        const fetchData = async () => {
            await getEnergyPerDayByDeviceId(props.deviceId, start, end)
                .then((res) => {
                    console.log(res.data);
                    setData(res.data);
                })
                .catch((err) => {
                    showSnackbar('Server Error', 'error')
                });

        }
        fetchData();

    }, [props.deviceId]);

    return (
        <>
            <Dialog open={props.modelOpen} onClose={() => props.setModelOpen(false)} maxWidth={'xl'}>
                <DialogTitle>
                Energy Usage In The Past Month For Device ID:{props.deviceId}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ width: 1000, height: 300, overflow: 'hidden' }}>
                    <EnergyBarChart start={start} end={end} data={data} groupBy={displayMode}/>
                    </Box>
                </DialogContent>

                

            </Dialog>
        </>
    )
}