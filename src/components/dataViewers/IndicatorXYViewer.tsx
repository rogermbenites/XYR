// src/components/dataViewers/IndicatorXYViewer.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

interface IndicatorXYViewerProps {
  data: any[];
}

const IndicatorXYViewer: React.FC<IndicatorXYViewerProps> = ({ data = [] }) => {
  if (data.length === 0) {
    return <div>No data to display</div>;
  }

  const chartData = {
    labels: data.map((d) => d.start_time || ''),
    datasets: [
      {
        label: 'X Value',
        data: data.map((d) => d.x),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
      {
        label: 'Y Value',
        data: data.map((d) => d.y),
        borderColor: 'rgba(192, 75, 75, 1)',
        backgroundColor: 'rgba(192, 75, 75, 0.2)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'XY Indicator Over Time',
      },
    },
    scales: {
      x: {
        type: 'category' as const,
        title: {
          display: true,
          text: 'Start Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default IndicatorXYViewer;
