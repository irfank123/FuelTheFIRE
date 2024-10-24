# **FuelTheFire**

### A React Web Application for Portfolio and Wishlist Stock Tracking

---

## **Overview**
**Financial Tracker** is a web application built using **React** that helps you monitor your **stock portfolio** and track the **wishlist stocks** you're considering investing in. The app fetches real-time stock data from the **Alpha Vantage API** to display key stock metrics, including price changes and historical stock trends.

This project addresses the need for tracking stock portfolios efficiently by providing users with:
- A **portfolio section** where they can view the percentage change in their stocks over the last 14 days and visualize stock trends through a graph.
- A **wishlist section** that allows users to monitor the current price of the stocks they are interested in but haven’t invested in yet.

---

## **Features**
- **Portfolio Stock Tracking**:
  - Fetches the stock price data for a list of stocks in the user's portfolio.
  - Displays the percentage price change for the last 14 days.
  - Provides an interactive chart showing stock price trends for the last 14 days.

- **Wishlist Stock Monitoring**:
  - Fetches and displays the current price for a set of stocks in the user's wishlist.
  - Helps users stay informed on potential future investments.

- **Expense Tracking (Coming Soon)**:
  - A section will be added soon that helps users track their monthly expenses through custom-built API integration.

---

## **How to Set Up the Project**

### 1. Clone the Repository
To get started, clone the project repository from GitHub:
```bash
git clone https://github.com/irfank123/FuelTheFIRE.git.git
cd firetracker
```

### 2. Install Dependencies
Run the following command to install the required dependencies:
```bash
npm install
```

### 3. Create an `.env` File
You will need to set up an `.env` file in the root of the project directory to store your **Alpha Vantage API key**.

Create a file named `.env` and add the following line:
```bash
REACT_APP_ALPHA_VANTAGE_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual API key from **Alpha Vantage**.

### 4. Run the Project
Once the setup is complete, start the project with:
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

---

## **API Integration**

This project uses the **Alpha Vantage API** to fetch real-time stock market data. It integrates two endpoints:

- **TIME_SERIES_DAILY** for portfolio stocks to get the stock prices and percentage change over the last 14 days.
- **TIME_SERIES_INTRADAY** for wishlist stocks to fetch the most recent stock price at 5-minute intervals.

For more information on the API, visit the [Alpha Vantage API Documentation](https://www.alphavantage.co/documentation/).

---

## **Credits**

This project was developed with the help of AI assistance using **ChatGPT** to:

- Provide assistance with code structuring and optimization.
- Help with the integration of the **Alpha Vantage API** for fetching stock data.
- Implement the chart using **Chart.js** to visualize stock trends.

Proper documentation and instructions were crafted with the help of **AI** to ensure clarity and completeness.

---


## **Unique Benefits**

One of the key features of this application is the ability to track the **percentage change** of the stocks you’ve invested in over the **last 14 days**. This feature provides a clear view of how your investments are performing over a shorter, custom time period—something that is not commonly available through most online brokers or financial platforms.

### **Why Is This Important?**
- **Customizable Time Period**: Most financial platforms or broker apps typically provide stock performance data over standard time intervals like 1 day, 1 week, 1 month, or longer. However, there is often no option to easily see how your investments are performing over a **14-day window**.
  
- **Better Short-Term Insights**: For investors who want to understand the short-term performance of their stocks, especially those who track trends or market movements on a **bi-weekly basis**, this feature becomes crucial. It helps investors make more informed decisions about whether to hold, sell, or increase their positions based on recent market trends.

- **Unavailable from Brokers**: Many brokerage platforms do not offer an easily accessible or customizable view of **percentage changes** over non-standard time periods (like 14 days). This app fills that gap by calculating and displaying these changes automatically, so you can quickly see how much your investments have appreciated or depreciated in the last two weeks.

--- 

## **Upcoming Features**
- **Monthly Expense Tracking**: A feature will be added to allow users to monitor their monthly expenses by scraping their transaction data and aggregating totals.
