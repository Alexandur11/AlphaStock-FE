import React from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';

const FinancialChart = ({ data, xField, yField, label }) => {
  // Set dimensions and margins for the chart
  const margin = { top: 20, right: 30, bottom: 50, left: 50 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Set scales for the x and y axes
  const xScale = scaleTime({
    domain: [new Date(Math.min(...data.map(d => new Date(d[xField])))), new Date(Math.max(...data.map(d => new Date(d[xField]))))],
    range: [0, width],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(d => d[yField]))],
    range: [height, 0],
  });

  return (
    <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <LinePath
          data={data}
          x={d => xScale(new Date(d[xField]))}
          y={d => yScale(d[yField])}
          stroke="red" // Change the line color to red
          strokeWidth={2}
        />
        <AxisLeft scale={yScale} stroke="red" tickStroke="red" tickLabelProps={{ fill: 'red' }} />
        <AxisBottom scale={xScale} top={height} stroke="red" tickStroke="red" tickLabelProps={{ fill: 'red' }} />
        <text x={width / 2} y={-10} textAnchor="middle" fill="red">
          {label}
        </text>
      </g>
    </svg>
  );
};

export default FinancialChart;
