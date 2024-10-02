import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FinancialChart from './FinancialChart';
import { fetchDataAndTransform } from '../../../utils/';
import { transformToChartData } from '../../../utils/';
import { alpha_stock_service } from '../../../utils';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Set to 5 columns */
  gap: 20px;
  width: 100%;
  height: calc(100vh - 100px); /* Adjust to fit the viewport */
  overflow-y: auto; /* Allow scrolling */
  padding: 20px;
`;

const ChartWrapper = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  height: 400px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ff0000;
`;

const MultiChartDashboard = ({ symbol }) => {
  const [dataSets, setDataSets] = useState([]);
  const [fetchResponses, setFetchResponses] = useState([]);
  const endpoints = [
    { url: `${alpha_stock_service}/yahoo_company/roa?symbol=${symbol}`, label: 'ROA' },
    { url: `${alpha_stock_service}/yahoo_company/roe?symbol=${symbol}`, label: 'ROE' },
    { url: `${alpha_stock_service}/yahoo_company/roic?symbol=${symbol}`, label: 'ROIC' },
    { url: `${alpha_stock_service}/yahoo_company/cash_to_debt?symbol=${symbol}`, label: 'Cash to Debt' },
    { url: `${alpha_stock_service}/yahoo_company/debt_to_equity?symbol=${symbol}`, label: 'Debt to Equity' },
    { url: `${alpha_stock_service}/yahoo_company/interest_coverage_ratio?symbol=${symbol}`, label: 'Interest Coverage Ratio' },
    { url: `${alpha_stock_service}/yahoo_company/current_ratio?symbol=${symbol}`, label: 'Current Ratio' },
    { url: `${alpha_stock_service}/yahoo_company/debt_to_ebitda?symbol=${symbol}`, label: 'Debt to EBITDA' },
    { url: `${alpha_stock_service}/yahoo_company/gross_profit_margin?symbol=${symbol}`, label: 'Gross Profit Margin' },
    { url: `${alpha_stock_service}/yahoo_company/net_profit_margin?symbol=${symbol}`, label: 'Net Profit Margin' }
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      const fetchPromises = endpoints.map(({ url }) =>
        fetchDataAndTransform(url, transformToChartData)
      );

      const results = await Promise.all(fetchPromises);
      const datasets = [];
      const responsesData = [];
      results.forEach((result, index) => {
        if (!result.error) {
          datasets[index] = result;
          responsesData[index] = null;
        } else {
          datasets[index] = null;
          responsesData[index] = `Error fetching data for ${endpoints[index].label}: ${result.error}`;
        }
      });

      setDataSets(datasets);
      setFetchResponses(responsesData);
    };

    fetchAllData();
  }, [symbol]);

  return (
    <DashboardContainer>
      {dataSets.map((data, index) => (
        <ChartWrapper key={index}>
          {data ? (
            <FinancialChart
              data={data}
              xField="date"
              yField="value"
              label={endpoints[index].label} 
            />
          ) : (
            <ErrorMessage>
              <p>No data available</p>
              <p>{fetchResponses[index]}</p>
            </ErrorMessage>
          )}
        </ChartWrapper>
      ))}
    </DashboardContainer>
  );
};

export default MultiChartDashboard;
