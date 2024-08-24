import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { login_service } from '../../../utils';
import './Newsletter.css'; 

const AlphaVantageNewsletter = ({ symbol }) => {
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const token = localStorage.getItem('token')?.replace(/^"|"$/g, '');

  useEffect(() => {
    const fetchNewsletterData = async () => {
      if (!symbol) return;

      try {
        const response = await axios.get(`${login_service}/news/?symbol=${symbol}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Response Data:', response.data); // Debugging

        if (response.status === 200) {
          setResult(response.data);
          setError("");
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch data');
      }
    };

    fetchNewsletterData();
  }, [symbol, token]);

  console.log('Result:', result); // Debugging
  console.log('Error:', error); // Debugging

  if (error) return <div>Error: {error}</div>;

  // Check if result is valid and has expected structure
  if (result && typeof result.Title === 'object') {
    const titles = Object.keys(result.Title).map(key => ({
      title: result.Title[key],
      url: result.Url[key] || '',
      image: result.Image[key] || '',
      time: result.Time[key] || ''
    }));

    return (
      <div className="newsletter-content">
        <h2>Alpha Vantage News</h2>
        <ul>
          {titles.map((item, index) => (
            <li key={index} style={{ marginBottom: '20px' }}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{ width: '100px', height: 'auto' }} 
                  />
                )}
                <h3>{item.title}</h3>
                <p>Date: {item.time}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <div>No news available</div>;
};

export default AlphaVantageNewsletter;
