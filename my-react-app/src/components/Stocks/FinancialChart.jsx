import React from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import styled from 'styled-components';

// Styled components for FinancialChart
const ChartContainer = styled.svg`
  width: 100%;
  height: 100%;
`;

const ChartError = styled.p`
  color: red; /* Error color for the message */
`;

const ChartLabel = styled.text`
  x: ${(props) => props.x};
  y: -10;
  text-anchor: middle;
  fill: red; /* Change the color as needed */
`;

const FinancialChart = ({ data, xField, yField, label }) => {
  // Validate data
  if (!Array.isArray(data) || data.length === 0) {
    return <ChartError>No data available to render the chart.</ChartError>;
  }

  // Set dimensions and margins for the chart
  const margin = { top: 20, right: 30, bottom: 50, left: 50 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Set scales for the x and y axes
  const xScale = scaleTime({
    domain: [
      new Date(Math.min(...data.map(d => new Date(d[xField])))),
      new Date(Math.max(...data.map(d => new Date(d[xField])))),
    ],
    range: [0, width],
  });

  const yScale = scaleLinear({
    domain: [
      0,
      Math.max(...data.map(d => d[yField] || 0)), // Ensure no NaN if yField is missing
    ],
    range: [height, 0],
  });

  return (
    <ChartContainer width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
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
        <ChartLabel x={width / 2} fill="red">{label}</ChartLabel>
      </g>
    </ChartContainer>
  );
};

export default FinancialChart;
