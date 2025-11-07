
import React from 'react';
import { Metric } from '../types';

interface ControlsProps {
  startDate: string;
  endDate: string;
  selectedMetric: Metric;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setSelectedMetric: (metric: Metric) => void;
}

const Controls: React.FC<ControlsProps> = ({
  startDate,
  endDate,
  selectedMetric,
  setStartDate,
  setEndDate,
  setSelectedMetric,
}) => {
  const commonInputClass = "bg-solar-blue-900 border border-solar-blue-700 rounded-md p-2 w-full text-gray-200 focus:ring-2 focus:ring-solar-orange focus:border-solar-orange transition";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-400 mb-1">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={commonInputClass}
        />
      </div>
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-400 mb-1">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className={commonInputClass}
        />
      </div>
      <div>
        <label htmlFor="metric" className="block text-sm font-medium text-gray-400 mb-1">
          Metric
        </label>
        <select
          id="metric"
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value as Metric)}
          className={commonInputClass}
        >
          <option value={Metric.SUNSPOTS}>Sunspot Number</option>
          <option value={Metric.FLARES}>Solar Flares</option>
          <option value={Metric.WIND_SPEED}>Solar Wind Speed</option>
        </select>
      </div>
    </div>
  );
};

export default Controls;
