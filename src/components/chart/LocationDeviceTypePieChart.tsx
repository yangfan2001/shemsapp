import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import {
  getCustomerEnergyDeviceType,
  getCustomerEnergyLocationDeviceType,
} from "../../services/energy";
interface DataItem {
  name: string;
  value: number;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28FD0",
  "#FF6666",
];
interface Props {
  location_id: number | null;
  start: Date;
  end: Date;
}
export default function LocationDeviceTypeChart(props: Props) {
  const [data, setData] = useState<DataItem[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      await getCustomerEnergyLocationDeviceType(
        props.location_id,
        props.start,
        props.end
      )
        .then((res) => {
          const tmp = [] as DataItem[];
          res.data.forEach((item: any) => {
            tmp.push({ name: item.device_type, value: item.energy });
          });
          setData(tmp);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [props.location_id, props.start, props.end]);
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
