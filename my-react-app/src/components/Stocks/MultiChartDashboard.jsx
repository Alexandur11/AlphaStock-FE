import React, { useEffect, useState } from 'react';
import FinancialChart from './FinancialChart';
import { fetchDataAndTransform } from '../../../utils/';
import { transformToChartData } from '../../../utils/';
import { alpha_stock_service } from '../../../utils';

const MultiChartDashboard = ({ symbol }) => {
  const [dataSets, setDataSets] = useState([]);
  const [fetchResponses, setFetchResponses] = useState([]);

  useEffect(() => {
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

    const fetchAllData = async () => {
      const fetchPromises = endpoints.map(({ url }) =>
        fetchDataAndTransform(url, transformToChartData)
      );

      const results = await Promise.all(fetchPromises);
      const datasets = [];
      const responsesData = [];

      results.forEach((result, index) => {
        if (!result.error) {
          datasets[index] = result; // Store valid data
          responsesData[index] = null; // No error message
        } else {
          datasets[index] = null; // No data
          responsesData[index] = `Error fetching data for ${endpoints[index].label}: ${result.error}`;
        }
      });

      setDataSets(datasets);
      setFetchResponses(responsesData);
    };

    fetchAllData();
  }, [symbol]);

  return (
    <div className="stocks-container">
      {dataSets.map((data, index) => (
        <div key={index} className="chart">
          {data ? (
            <FinancialChart
              data={data}
              xField="date" // Adjust based on your actual data structure
              yField="value" // Change this to match your data field for y-axis
              label={`Chart ${index + 1}`}
            />
          ) : (
            <div style={{ width: '100%', height: '400px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>
                <p>No data available</p>
                <p>{fetchResponses[index]}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MultiChartDashboard;
