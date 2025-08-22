
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './Chart.module.scss';

const cx = classNames.bind(styles);
const BarChartCustom = ({ data }) => {
  return (
    <div className={cx('chart')}>
<ResponsiveContainer 
    width="100%"
    height={500}
    >
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, (max) => max + 100]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" name="Số Lượng Đơn" stackId="a" fill="#1F35F9">
          <LabelList dataKey="uv" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    </div>
    
  );
};

export default BarChartCustom;
