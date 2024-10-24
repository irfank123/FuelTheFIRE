import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Investments() {
  const [wishlistStocks] = useState(['EXP', 'OXY']);  // List of wishlist stocks
  const [wishlistDetails, setWishlistDetails] = useState({});  // Store price for wishlist stocks
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;


  // Fetch current price for wishlist stocks
  useEffect(() => {
    const fetchWishlistData = async () => {
      const wishlistResults = {};
      for (const stock of wishlistStocks) {
        try {
          const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&apikey=${apiKey}`;
          const response = await axios.get(url);

          if (response.data && response.data['Time Series (5min)']) {
            const timeSeries = response.data['Time Series (5min)'];
            const mostRecentTime = Object.keys(timeSeries)[0];  // Get the most recent time
            const lastPrice = parseFloat(timeSeries[mostRecentTime]['4. close']);  // Most recent closing price

            wishlistResults[stock] = {
              price: lastPrice.toFixed(2),  // Save the most recent price
            };
          }
        } catch (error) {
          console.error(`Error fetching data for wishlist stock ${stock}:`, error);
          setError('Failed to fetch stock data for some wishlist stocks.');
        }
      }
      setWishlistDetails(wishlistResults);  // Update state with price for wishlist stocks
    };

    fetchWishlistData();
  }, [wishlistStocks, apiKey]);

  return (
    <div>
      <h2>Wishlist Stocks</h2>
      {error && <p>{error}</p>}
      {/* List of wishlist stocks with current price */}
      <ul>
        {wishlistStocks.map(stock => (
          <li key={stock}>
            {stock} - Current Price: ${wishlistDetails[stock]?.price || 'Loading...'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Investments;
