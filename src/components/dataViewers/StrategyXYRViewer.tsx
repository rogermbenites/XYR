// src/components/dataViewers/StrategyXYRViewer.tsx
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
import { StrategyXYR } from '../../types/ParsedData';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

interface StrategyXYRViewerProps {
  data: StrategyXYR[];
}

const normalize = (values: number[], min: number, max: number) => {
  const valueMin = Math.min(...values);
  const valueMax = Math.max(...values);
  return values.map(value => ((value - valueMin) / (valueMax - valueMin)) * (max - min) + min);
};

const StrategyXYRViewer: React.FC<StrategyXYRViewerProps> = ({ data = [] }) => {
  if (data.length === 0) {
    return <div>No data to display</div>;
  }

  console.debug('StrategyXYRViewer data:', data);

  const closeValues = data.map((d) => Number(d.close));
  const xValues = data.map((d) => Number(d.x));
  const yValues = data.map((d) => Number(d.y));
  const rValues = data.map((d) => Number(d.r));
  const minClose = Math.min(...closeValues);
  const maxClose = Math.max(...closeValues);
  const normalizedX = normalize(xValues, minClose, maxClose);
  const normalizedY = normalize(yValues, minClose, maxClose);
  const normalizedR = normalize(rValues, minClose, maxClose);

  const chartData = {
    labels: data.map((d) => d.timestamp || ''),
    datasets: [
      {
        label: 'Close Price',
        data: closeValues,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
      // {
      //   label: 'X (normalized)',
      //   data: normalizedX,
      //   borderColor: 'rgba(54, 162, 235, 1)',
      //   backgroundColor: 'rgba(54, 162, 235, 0.2)',
      //   fill: false,
      // },
      // {
      //   label: 'Y (normalized)',
      //   data: normalizedY,
      //   borderColor: 'rgba(255, 206, 86, 1)',
      //   backgroundColor: 'rgba(255, 206, 86, 0.2)',
      //   fill: false,
      // },
      {
        label: 'R (normalized)',
        data: normalizedR,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
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
        text: 'Strategy XYR Close Price, X, Y, and R (Normalized) Over Time',
      },
    },
    scales: {
      x: {
        type: 'category' as const,
        title: {
          display: true,
          text: 'Timestamp',
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

  console.debug('chartData:', chartData);

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StrategyXYRViewer;
