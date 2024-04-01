const axios = require('axios');
const { app } = require('./server');
require('dotenv').config();

async function fetchCandlestickData(symbol, interval, start_date, end_date) {
    try {
        const apiKey = process.env.TWELVEDATA_API_KEY;
        const apiUrl = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&start_date=${start_date}&end_date=${end_date}&apikey=${apiKey}`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching candlestick data:', error);
        throw error;
    }
}

// Example usage:
const symbol = 'AAPL'; // Example stock symbol (Apple Inc.)
const interval = '1day'; // Interval for candlesticks (e.g., '1min', '1hour', '1day')
const start_date = '2022-01-01'; // Start date (YYYY-MM-DD)
const end_date = '2022-01-31'; // End date (YYYY-MM-DD)

app.get('/api/fetchCandlestickData', (req, res) => {
    fetchCandlestickData(symbol, interval, start_date, end_date)
    .then(data => {
        // console.log('Candlestick data:', data);
        res.send(JSON.stringify(data));
    })
    .catch(error => {
        console.error('Error:', error);
        res.send(JSON.stringify(error));
    });
});
