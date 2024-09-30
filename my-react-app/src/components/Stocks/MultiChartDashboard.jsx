import React, { useEffect, useState } from 'react';
import FinancialChart from './FinancialChart';
import { alpha_stock_service } from '../../../utils';

const MultiChartDashboard = ({ symbol }) => {
  const [dataSets, setDataSets] = useState([]);
  const [fetchResponses, setFetchResponses] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const fetchPromises = [
        fetch(`${alpha_stock_service}/yahoo_company/roa?symbol=${symbol}`),
        fetch(`${alpha_stock_service}/yahoo_company/roe?symbol=${symbol}`),
        fetch(`${alpha_stock_service}/yahoo_company/roic?symbol=${symbol}`),
        fetch(`${alpha_stock_service}/yahoo_company/cash_to_debt?symbol=${symbol}`),
        fetch(`${alpha_stock_service}/yahoo_company/debt_to_equity?symbol=${symbol}`),
        fetch(`${alpha_stock_service}/yahoo_company/interest_coverage_ratio?symbol=${symbol}`),
        fetch(`${alpha_stock_service}/yahoo_company/current_ratio?symbol=${symbol}`),
        fetch(`${alpha_stock_service}/yahoo_company/debt_to_ebitda?symbol=${symbol}`),
        fetch(`${alpha_stock_service}/yahoo_company/gross_profit_margin?symbol=${symbol}`),
        fetch(`${alpha_stock_service}/yahoo_company/net_profit_margin?symbol=${symbol}`),
      ];

      const responses = await Promise.all(fetchPromises);
      const data = [];
      const responsesData = [];

      responses.forEach((res, index) => {
        if (res.ok) {
          data[index] = res.json();
          responsesData[index] = null; // No error message
        } else {
          data[index] = null; // No data for this chart
          responsesData[index] = `Error fetching data for chart ${index + 1}: ${res.statusText}`; // Store error message
        }
      });

      setDataSets(await Promise.all(data));
      setFetchResponses(responsesData);
    };

    fetchAllData();
  }, [symbol]);

  return (
    <div>
      {dataSets.map((data, index) => (
        <div key={index} style={{ position: 'relative', marginBottom: '20px' }}>
          {data ? (
            <FinancialChart
              data={data}
              xField="date" // Adjust based on your actual data structure
              yField={data.yField || "roa"} // Dynamically set yField based on the dataset
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
