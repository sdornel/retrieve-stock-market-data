const axios = require('axios');
const { app } = require('./server');
require('./websocket/websocket-service'); // required for websocket to open. do not remove unless you know for sure the websocket can open

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
// let symbol = 'AAPL'; // Example stock symbol (Apple Inc.)
// let interval = '1day'; // Interval for candlesticks (e.g., '1min', '1hour', '1day')
// let start_date = '2024-01-01'; // Start date (YYYY-MM-DD)
// let end_date = '2024-01-31'; // End date (YYYY-MM-DD)

app.get('/api/fetchCandlestickData', (req, res) => {
    console.log('req', req.query);
    const symbol = req.query.symbol;
    const interval = req.query.interval;
    const start_date = req.query.startDate;
    const end_date = req.query.endDate;
    fetchCandlestickData(symbol, interval, start_date, end_date)
    .then(data => {
        console.log('Candlestick data:', data.meta);
        res.send(JSON.stringify(data));
    })
    .catch(error => {
        console.error('Error:', error);
        res.send(JSON.stringify(error));
    });
});
