import React, { useState } from "react";
import styled from "styled-components";
import back_vid from '/src/assets/back_vid.mp4';
import { alpha_stock_service, prepareTokenForRequest } from '../../../utils'; 

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
  transform: translate(-50%, -50%);
  object-fit: cover;
  opacity: 0.6;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: rgba(245, 245, 245, 0.85);
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const DataBox = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #666;
`;

const Value = styled.span`
  color: #007bff;
  font-weight: bold;
`;

const Error = styled.div`
  color: red;
  margin-top: 20px;
`;

const StockValuation = () => {
  const [data, setData] = useState({ intrinsicValue: null, relativeValue: null, fairValue: null });
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (stockSymbol) => {
    try {
      setIsLoading(true);
      const access_token = await prepareTokenForRequest();

      const intrinsicResponse = await fetch(
        `${alpha_stock_service}/stock_calculator/Intrinsic_value?symbol=${stockSymbol}`,
        { method: 'GET', headers: { Authorization: `Bearer ${access_token}` } }
      );
      const intrinsicResult = await intrinsicResponse.json();
      const intrinsicValue = intrinsicResult.Intrinsic_value;
      const relativeValue = intrinsicResult.Relative_value;

      const fairValueResponse = await fetch(
        `${alpha_stock_service}/stock_calculator/peter_lynch_fair_price?symbol=${stockSymbol}`,
        { method: 'GET', headers: { Authorization: `Bearer ${access_token}` } }
      );
      const fairValue = await fairValueResponse.json();

      setData({ intrinsicValue, relativeValue, fairValue });
      setError(null);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const stockSymbol = searchQuery.trim().toUpperCase();
    if (stockSymbol) {
      fetchData(stockSymbol);
    } else {
      setError("Symbol is required!");
    }
  };

  return (
    <Wrapper>
      <VideoBackground autoPlay loop muted>
        <source src={back_vid} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <Container>
        <Title>Stock Valuation</Title>
        <form onSubmit={handleSearch}>
          <SearchBar
            type="text"
            placeholder="Enter stock symbol (e.g., AAPL)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        {isLoading && <div>Loading...</div>}
        {error && <Error>{error}</Error>}
        {data.intrinsicValue !== null && (
          <>
            <DataBox>
              <Label>Intrinsic Value: </Label>
              <Value>{data.intrinsicValue || "N/A"}</Value>
            </DataBox>
            <DataBox>
              <Label>Relative Value: </Label>
              <Value>{data.relativeValue || "N/A"}</Value>
            </DataBox>
            <DataBox>
              <Label>Fair Value: </Label>
              <Value>{data.fairValue || "N/A"}</Value>
            </DataBox>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default StockValuation;
