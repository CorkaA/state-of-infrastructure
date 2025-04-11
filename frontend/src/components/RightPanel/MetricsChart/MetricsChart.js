import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useGetMetricsQuery } from '../../../features/infrastructureAPI';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MetricsChart = () => {
  const selectedNodeId = useSelector(state => state.infrastructure.selectedNodeId);
  const { data: metrics = [] } = useGetMetricsQuery();

  // Фильтрация метрик для выбранной ноды
  const nodeMetrics = selectedNodeId 
    ? metrics.filter(m => m.node_id === selectedNodeId)
    : [];

  const data = {
    labels: nodeMetrics.map(m => m.datetime),
    datasets: [
      {
        label: 'CPU Usage',
        data: nodeMetrics.map(m => m.cpu_utilization),
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Memory Usage',
        data: nodeMetrics.map(m => m.memory_utilization),
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Disk Usage',
        data: nodeMetrics.map(m => m.disk_utilization),
        borderColor: '#ffce56',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Metrics History',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div className="metrics-section">
      {nodeMetrics.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <div className="no-data">
          {selectedNodeId ? 'No metrics data available' : 'Please select a node'}
        </div>
      )}
    </div>
  );
};

export default MetricsChart;