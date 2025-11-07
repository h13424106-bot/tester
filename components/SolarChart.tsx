
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SolarDataPoint } from '../types';

interface SolarChartProps {
  data: SolarDataPoint[];
  metric: string;
  metricLabel: string;
  metricColor: string;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-solar-blue-900/80 backdrop-blur-sm border border-solar-blue-700 p-3 rounded-md shadow-lg">
        <p className="font-bold text-solar-yellow">{`Date: ${label}`}</p>
        <p style={{ color: payload[0].color }}>{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const SolarChart: React.FC<SolarChartProps> = ({ data, metric, metricLabel, metricColor }) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        <p>No data to display for the selected range.</p>
      </div>
    )
  }

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} domain={['auto', 'auto']} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{paddingTop: '20px'}}/>
          <Line 
            type="monotone" 
            dataKey={metric} 
            name={metricLabel} 
            stroke={metricColor} 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: metricColor, stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SolarChart;
