import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { getCustomerEnergyLocationType } from '../../services/energy';
// 模拟从后端获取的数据
interface DataItem {
    name: string;
    value: number;
}

// 预定义的颜色数组
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0', '#FF6666'];
interface Props {
    start: Date;
    end: Date;
}
export default function LocationEnergyPieChart(props: Props) {
    const [data, setData] = useState<DataItem[]>([]);
    useEffect(() => {
        const fetchData = async () => {


            await getCustomerEnergyLocationType(props.start, props.end)
                .then((res) => {
                    const tmp = [] as DataItem[];
                    res.data.forEach((item: any) => {
                        tmp.push({ name: item.address, value: item.energy })
                    });
                    setData(tmp);
                })
                .catch((err) => {
                    alert("Wrong! Error Code: " + err.data);
                });

        };
        fetchData();
    }, [props.end]);
    return (
        <PieChart width={400} height={400}>
            <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data}
                cx={200}
                cy={200}
                outerRadius={80}
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
