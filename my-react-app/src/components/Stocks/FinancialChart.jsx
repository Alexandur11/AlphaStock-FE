import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import styled from 'styled-components';

// Styled components for FinancialChart
const ChartContainer = styled.canvas`
  width: 100%;
  height: 100%;
`;

const ChartTitle = styled.h3`
  text-align: center;
  color: black; /* You can customize the color or other styles here */
`;

const FinancialChart = ({ data, xField, yField, label }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    Chart.register(...registerables); // Register Chart.js components

    const ctx = chartRef.current.getContext('2d');
    const xValues = data.map(d => d[xField]);
    const yValues = data.map(d => d[yField]);

    // Create the chart
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [
          {
            fill: false,
            lineTension: 0,
            backgroundColor: 'rgba(0,0,255,1.0)',
            borderColor: 'rgba(0,0,255,0.1)',
            data: yValues,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false, // Hide the legend to avoid duplicate labels
          },
        },
        scales: {
          y: { min: Math.min(...yValues) - 1, max: Math.max(...yValues) + 1 },
        },
      },
    });

    // Cleanup chart instance on component unmount
    return () => {
      myChart.destroy();
    };
  }, [data, xField, yField, label]); // Add label to dependencies

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {label && <ChartTitle>{label}</ChartTitle>} {/* Display the label as a title */}
      <ChartContainer ref={chartRef} />
      {/* Add tooltip or other UI elements as needed */}
    </div>
  );
};

export default FinancialChart;
