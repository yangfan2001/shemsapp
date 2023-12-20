import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, Text } from 'recharts';
import { getCustomerPriceDeviceType } from '../../services/price';
interface DataItem {
    name: string;
    value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0', '#FF6666'];
interface Props {
    start: Date;
    end: Date;
}
export default function DeviceTypePricePieChart(props: Props) {
    const [data, setData] = useState<DataItem[]>([]);
    useEffect(() => {
        const fetchData = async () => {


            await getCustomerPriceDeviceType(props.start, props.end)
                .then((res) => {
                    const tmp = [] as DataItem[];
                    res.data.forEach((item: any) => {
                        tmp.push({ name: item.model_type, value: item.price })
                    });
                    setData(tmp);
                })
                .catch((err) => {
                    console.log(err);
                });

        };
        fetchData();
    }, [props.start,props.end]);
    return (
        <PieChart width={400} height={370}>
            <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data}
                cx={200}
                cy={150}
                outerRadius={100}
                fill="#8884d8"
                label
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            
            <Legend />
        </PieChart>
    );
}
