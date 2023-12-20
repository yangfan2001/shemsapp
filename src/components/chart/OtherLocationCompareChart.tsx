import React, { useEffect, useState } from "react";
import { getSimilarLocationEnergy } from "../../services/energy";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, TooltipProps, 
    Tooltip, Legend, ResponsiveContainer } from "recharts";
    import { Paper, Typography } from '@mui/material';

interface Props {
    location_id: number | null;
    start: Date;
    end: Date;
}

interface EnergyData {
    location_id: number;
    cost: number;
    square_feet: number;
    label: string; // "User" or "Other Location"
}

interface CustomTooltipProps extends TooltipProps<number, string> {
    data: EnergyData[];
}



const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, data }) => {
    if (active && payload && payload.length) {
        const currentData = payload[0].payload as EnergyData | undefined;
        if (!currentData) {
            return null;
        }

        const userLocation = data.find(item => item.label.includes("Current Location"));
        if (!userLocation) {
            return null; 
        }

        const isUserLocation = currentData.label.includes("Current Location");
        const info = isUserLocation ? 
            `` : 
            `Cost Ratio: ${(userLocation.cost !== 0 ? (currentData.cost / userLocation.cost).toFixed(2) : 'N/A')}`;

        return (
            <Paper style={{ padding: '10px' }}>
                <Typography color="textSecondary">{`${currentData.label}`}</Typography>
                <Typography color="textSecondary">Square Feet:{currentData.square_feet}</Typography>
                <Typography color="#8884d8">{info}</Typography>
                <Typography color="#8884d8">Cost:{currentData.cost}</Typography>
            </Paper>
        );
    }

    return null;
};


export default function OtherLocationCompareChart(props: Props) {
    const [data, setData] = useState<EnergyData[]>([]);


    useEffect(() => {
        if (props.location_id === null) return;
        const fetchData = async () => {
            try {
                const response = await getSimilarLocationEnergy(props.location_id, props.start, props.end);
                const resData: EnergyData[] = response.data;

                const userData = resData.find(item => item.location_id === props.location_id);
                const otherData = resData.filter(item => item.location_id !== props.location_id);
                console.log(userData, otherData);
                const formattedData = userData ? [userData, ...otherData] : [...otherData];
                setData(formattedData.map(item => ({
                    ...item,
                    label: item.location_id === props.location_id ? `Current Location` : `Other`
                })));
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        console.log(props.location_id, props.start, props.end);
    }, [
        props.location_id, props.start, props.end
    ]);
    return (
        <>
            <ResponsiveContainer width="100%" height={230}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip data={data} />} />
                    <Legend />
                    <Bar dataKey="cost" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}