import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';  // Import Line chart from react-chartjs-2
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

function Portfolio() {
  const [stocks] = useState(['VTI', 'AMZN']);  // List of stocks I own
  const [selectedStock, setSelectedStock] = useState(null);  // The stock that is selected
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stockDetails, setStockDetails] = useState({});  // Store price and percentage change for all stocks

  const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;


  // Fetches percentage change and price for all stocks in the list
  useEffect(() => {
    const fetchAllStockData = async () => {
      const results = {};
      for (const stock of stocks) {
        try {
          const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${apiKey}`;
          const response = await axios.get(url);

          if (response.data && response.data['Time Series (Daily)']) {
            const timeSeries = response.data['Time Series (Daily)'];
            const data = Object.keys(timeSeries).map(date => ({
              date,
              price: parseFloat(timeSeries[date]['4. close']),  // Use the closing price
            }));

            const last7DaysData = data.slice(0, 14);  // Get the last 14 days
            const firstPrice = last7DaysData[13]?.price;  // Oldest price in the last 14 days
            const lastPrice = last7DaysData[0]?.price;   // Most recent price
            const percentageChange = ((lastPrice - firstPrice) / firstPrice) * 100;

            results[stock] = {
              price: lastPrice.toFixed(2),  //saves the most recent price
              percentageChange: percentageChange.toFixed(2),  // saves percentage change
            };
          }
        } catch (error) {
          console.error(`Error fetching data for ${stock}:`, error);
        }
      }
      setStockDetails(results);  // updates state with price and percentage change for all stocks
    };

    fetchAllStockData();
  }, [stocks, apiKey]);

  //fetches and show sthe chart for the selected stock
  const handleStockClick = async (stock) => {
    setLoading(true);
    setError(null);
    setSelectedStock(stock);

    try {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${apiKey}`;
      const response = await axios.get(url);

      if (response.data && response.data['Time Series (Daily)']) {
        const timeSeries = response.data['Time Series (Daily)'];
        const data = Object.keys(timeSeries).map(date => ({
          date,
          price: parseFloat(timeSeries[date]['4. close']),  //uses the closing price
        }));

        setStockData(data.slice(0, 14).reverse());  //limits to last 14 days and reverse to show oldest to newest
      } else {
        setError('No stock data available.');
      }
    } catch (error) {
      setError('Failed to fetch stock data.');
    }
    setLoading(false);
  };

  // Prepare chart data
  const chartData = {
    labels: stockData.map((data) => data.date),  // Dates for x-axis
    datasets: [
      {
        label: `${selectedStock} Stock Price ($)`,
        data: stockData.map((data) => data.price),  // Prices for y-axis
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  // Options for the chart
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${selectedStock} Stock Price Over Last 14 Days`,
      },
    },
  };

  return (
    <div>
      <h2>Portfolio</h2>
      <p>Click on any stock below to see its price graph for the last 14 days. smart boy</p> 
      <ul>
        {stocks.map(stock => (
          <li key={stock} onClick={() => handleStockClick(stock)} style={{ cursor: 'pointer' }}>
            {stock} - Price: ${stockDetails[stock]?.price || 'Loading...'}, 
            Change: {stockDetails[stock]?.percentageChange || 'Loading...'}%
          </li>
        ))}
      </ul>

      {/* Show the chart when a stock is clicked */}
      {selectedStock && (
        <div>
          {loading ? (
            <p>Loading chart for {selectedStock}...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Line data={chartData} options={chartOptions} />
          )}
        </div>
      )}
    </div>
  );
}

export default Portfolio;

