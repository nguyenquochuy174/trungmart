import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import classNames from 'classnames/bind';
import styles from './Chart.module.scss';

const cx = classNames.bind(styles);

// Màu cho từng phần (tự động lặp nếu có nhiều hơn 3 phần)
const COLORS = ['#1F35F9', '#FFBB28', '#FF8042', '#00C49F', '#FF4560'];

 function PieChartCustom({ data }) {
  return (
    <div className={cx('chart')}>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"       // giá trị để vẽ
            nameKey="name"     // tên hiển thị
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={(entry) => `${entry.name}: ${entry.value}%`} // nhãn hiển thị
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
export default PieChartCustom;
