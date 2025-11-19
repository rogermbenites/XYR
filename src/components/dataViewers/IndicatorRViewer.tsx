// src/components/dataViewers/IndicatorRViewer.tsx
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

interface IndicatorRViewerProps {
  data: any[];
}

const IndicatorRViewer: React.FC<IndicatorRViewerProps> = ({ data = [] }) => {
  if (data.length === 0) {
    return <div>No data to display</div>;
  }

  const chartData = {
    labels: data.map((d) => d.start_time || ''),
    datasets: [
      {
        label: 'R Value',
        data: data.map((d) => d.r),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
        text: 'R Indicator Over Time',
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
          text: 'R Value',
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

export default IndicatorRViewer;
